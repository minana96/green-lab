var Location = require("./location");
var Time = require("./time");
var DOM = require("./dom");

// Renders a single form onto the DOM.
//
// form - An Object containing form configuration params.
//
// Returns nothing.
var addClass,
  removeClass,
  mobileThreshold = 850,
  internal = {},
  config = {},
  log = {},
  recordFormEvent,
  Browser;

internal.render = function(form, client, submitForm, euConsentCheckTimezone) {
  // Halt if widget should not be displayed
  if (!widgetAllowed(form)) return;

  // Initialize state
  form.isOpen = false;
  form.triggered = false;
  form.showTeaser = false;
  form.showSuccess = false;
  form.manuallyOpened = false;
  form.isSubmitting = false;
  form.hidden = false;

  // Render the form
  insertWidget(form);

  // Set DOM references
  setWidgetElements(form);

  // Display EU consent checkbox
  showEUConsentField(form, euConsentCheckTimezone);

  // Refresh form attributes
  internal.refresh(form);

  // Ease in the teaser unless form has been submitted
  if (!client["form[" + form.id + "][submit]"]) {
    setTimeout(function() {
      form.showTeaser = true;
      if (!form.hidden) {
        internal.refresh(form);
      }
    }, 200);
  }

  var popupDelay;
  if (form.seconds_before_popup) {
    popupDelay = parseInt(form.seconds_before_popup) * 1000;
  } else {
    popupDelay = 6000;
  }

  // Bind the header click event for tabs
  if (form.category == "tab" && form.el.toggle) {
    form.el.toggle.onclick = function(event) {
      internal.toggleWidget(form, true);
      preventDefault(event);
    };
  }

  // Bind the form submit event
  if (form.el.form) {
    // form.el.form.onsubmit = function(event) {
    //   submitForm(form);
    //   return preventDefault(event);
    // }
    addEvent(form.el.form, "submit", function() {
      submitForm(form);
      return false;
    });
  }

  // Bind the backdrop click event
  if (form.el.backdrop) {
    form.el.backdrop.onclick = function(event) {
      internal.toggleWidget(form, true);
      return preventDefault(event);
    };
  }

  // Bind the close button click event
  if (form.el.close) {
    form.el.close.onclick = function(event) {
      internal.toggleWidget(form, true);
      return preventDefault(event);
    };
  }

  // Bind the close on esc key event
  addEvent(document, "keydown", function(event) {
    if (event.which == 27) {
      form.isOpen = false;
      internal.refresh(form);
      return preventDefault(event);
    }
  });

  if (form.el.hide) {
    form.el.hide.onclick = function(event) {
      form.isOpen = false;
      form.showTeaser = false;
      internal.refresh(form);
      return preventDefault(event);
    };
  }

  var refresh = debounce(internal.refresh, 300, false);

  addEvent(window, "resize", function() {
    refresh(form);
  });

  // Set auto open timeout if allowed
  if (canAutoOpen(form, client)) {
    if (form.trigger_type == "exit_intent") {
      detectExitIntent(form);
    } else if (form.trigger_type == "time_delay") {
      if (form.show_on_trigger) {
        if (form.show_at_percent == 0) {
          detectScrollToId(form);
        } else {
          detectScrollToPosition(form);
        }
      }

      if (form.show_on_time) {
        setTimeout(function() {
          if (form.triggered == false) {
            internal.toggleWidget(form, undefined);
          }
        }, popupDelay);
      }
    }
  }
};

// Refreshes the tab positioning based on the state of the form
// (e.g. open or closed, show teaser).
//
// form - An Object containing form configuration params.
//
// Returns nothing.
internal.refresh = function(form) {
  var el = form.el;
  var maxHeight = window.innerHeight;

  // Disable input when submitting
  if (form.isSubmitting) {
    el.submitButton.disabled = "disabled";
    el.submitButton.value = form.submit_text || "Submitting...";
  } else {
    el.submitButton.disabled = "";
    el.submitButton.value = form.button_text;
  }

  // Show the right content panels
  if (form.showSuccess) {
    el.formPanel.style.display = "none";
    el.successPanel.style.display = "block";
  } else {
    el.formPanel.style.display = "block";
    el.successPanel.style.display = "none";
  }

  // Hide/show the teaser depending on open/closed position
  if (form.region == "bottom" || form.region == "side") {
    if (form.isOpen || !form.showTeaser) {
      addClass(el.header, "drip-hidden");
    } else {
      // Wait for animations to complete before letting the tab pop-up
      setTimeout(function() {
        removeClass(el.header, "drip-hidden");
      }, 200);
    }
  }

  // Calculate the inner content height
  el.content.style.height = "auto";
  var contentHeight = el.content.offsetHeight;

  // Do not allow the container to be taller than the viewport
  if (
    (form.category == "lightbox" || form.region == "bottom") &&
    contentHeight > maxHeight
  ) {
    contentHeight = maxHeight;
    el.content.style.height = maxHeight.toString() + "px";
    addClass(el.container, "drip-scrollable");
  } else {
    removeClass(el.container, "drip-scrollable");
  }

  // Check viewport size, and force to render on bottom if less than the mobile threshold
  if (window.innerWidth < mobileThreshold) {
    refreshMobile(form);
  } else {
    refreshDesktop(form);
  }

  // Toggle the lightbox visibility classes
  if (form.category == "lightbox") {
    // Update the open/closed styles
    if (form.isOpen) {
      removeClass(el.backdrop, "drip-hidden");
      removeClass(el.container, "drip-hidden");

      // If this timeout is absent, animations don't occur
      setTimeout(function() {
        addClass(el.backdrop, "drip-in");
        addClass(el.container, "drip-in");
      }, 0);
    } else {
      removeClass(el.container, "drip-in");
      removeClass(el.backdrop, "drip-in");

      // Wait for transitions to finish up
      setTimeout(function() {
        addClass(el.container, "drip-hidden");
        addClass(el.backdrop, "drip-hidden");
      }, 300);
    }
  }
};

internal.bindShowFormLinks = function() {
  var attributeName = "data-drip-show-form";
  var links = document.querySelectorAll("[" + attributeName + "]");

  var handleClick = function() {
    var id = this.getAttribute(attributeName);
    log("Clicked link to show form #" + id);
    internal.showForm({ id: id });
    return false;
  };

  for (var i = 0; i < links.length; ++i) {
    addEvent(links[i], "click", handleClick);
  }
};

// Toggles the open/closed status of a form.
//
// form     - An Object containing form configuration params.
// isManual - A Boolean indicating whether the form was toggled manually
//            by the visitor (optional; default = false).
//
// Returns nothing.
internal.toggleWidget = function(form, isManual) {
  var action;
  form.triggered = true;
  form.isOpen = !form.isOpen;
  internal.refresh(form);

  if (isManual && form.isOpen) {
    form.manuallyOpened = true;
  }

  if (isManual) {
    action = form.isOpen ? "manual_open" : "manual_close";
  } else {
    action = form.isOpen ? "auto_open" : "auto_close";
  }

  recordFormEvent({
    accountId: form["account_id"],
    formId: form["id"],
    action: action
  });
};

// Opens a specific opt-in form widget.
//
// options - An Object with various options:
//           id  - An Integer form ID.

internal.showForm = function(options) {
  var form = findFormById(options.id);
  if (form == null) return log("Form not found: " + options.id, "warn");
  if (!form.isOpen) internal.toggleWidget(form, true);
};

// Hides a specific opt-in form widget.
//
// options - An Object with various options:
//           id  - An Integer form ID.

internal.hideForm = function(options) {
  var form = findFormById(options.id);
  var showTab = options.showTab !== undefined ? options.showTab : true;
  if (form == null) return log("Form not found: " + options.id, "warn");
  form.showTeaser = showTab;
  form.hidden = true;
  if (!showTab) form.isOpen = true;
  if (form.isOpen) internal.toggleWidget(form, true);
};

var findFormById = function(id) {
  config.forms || (config.forms = []);

  for (var i = 0, l = config.forms.length; i < l; i++) {
    if (config.forms[i]["id"] == id || config.forms[i]["public_id"] == id) {
      return config.forms[i];
    }
  }

  return null;
};

// Determines if a widget is allowed to be displayed on the current page.
//
// form - An Object containing form configuration params.
//
// Returns a Boolean.
var widgetAllowed = function(form) {
  var loc;

  // False if widget is disabled
  if (!form.is_widget_enabled) return false;

  // False if mobile and hide on mobile is enabled
  if (new Browser().isMobile() && form.hide_on_mobile) return false;

  var i, j, l;
  // Handle blacklisted URLs
  if (form.is_blacklist_enabled) {
    for (i = 0, l = form.blacklist.length; i < l; i++) {
      loc = new Location(window.location.href, form.blacklist[i]);
      if (loc.match()) return false;
    }
  }

  // Handle whitelisted URLs
  if (form.is_whitelist_enabled) {
    for (j = 0, l = form.whitelist.length; j < l; j++) {
      loc = new Location(window.location.href, form.whitelist[j]);
      if (loc.match()) return true;
    }

    return false;
  }

  return true;
};

// Inserts form HTML into the DOM.
//
// form - An Object containing form configuration params.
//
// Returns nothing.
var insertWidget = function(form) {
  appendStyles(form.css);
  appendBody(form.html);
};

// Creates a <style> tag and inserts it at the bottom of the <head> tag.
//
// cssText - A String of CSS text.
//
// Returns nothing.
var appendStyles = function(cssText) {
  var head = document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";

  /* eslint quotes: 0 */
  var openingTag = '<style type="text/css" media="screen">';
  var closingTag = "</style>";
  cssText = cssText.replace(openingTag, "").replace(closingTag, "");

  if (style.styleSheet) {
    style.styleSheet.cssText = cssText;
  } else {
    style.appendChild(document.createTextNode(cssText));
  }

  if (head !== undefined) {
    head.appendChild(style);
  } else {
    document.body.appendChild(style);
  }
};

// Inserts a fragment of HTML into the bottom of the <body> tag.
//
// html - A String HTML fragment.
//
// Returns nothing.
var appendBody = function(html) {
  var fragment = document.createDocumentFragment();
  var temp = document.createElement("div");
  temp.innerHTML = html;
  fragment.appendChild(temp.firstChild);
  document.body.appendChild(fragment);
};

// Sets all needed DOM references for a given form widget.
//
// form - An Object containing form configuration params.
//
// Returns nothing,
var setWidgetElements = function(form) {
  form.el = {
    container: document.getElementById("drip-" + form.id),
    form: document.getElementById("drip-form-" + form.id),
    toggle: document.getElementById("drip-toggle-" + form.id),
    close: document.getElementById("drip-close-" + form.id),
    hide: document.getElementById("drip-hide-" + form.id),
    teaser: document.getElementById("drip-teaser-" + form.id),
    content: document.getElementById("drip-content-" + form.id),
    formPanel: document.getElementById("drip-form-panel-" + form.id),
    successPanel: document.getElementById("drip-success-panel-" + form.id),
    submitButton: document.getElementById("drip-submit-" + form.id),
    scroll: document.getElementById("drip-scroll-" + form.id),
    contentHeader: document.getElementById("drip-content-header-" + form.id)
  };

  switch (form.category) {
  case "tab":
    form.el.header = document.getElementById("drip-header-" + form.id);
    break;
  case "lightbox":
    form.el.backdrop = document.getElementById("drip-backdrop-" + form.id);
    break;
  }
};

// Conditionally displays the eu consent checkbox.
//
// form - An Object containing form configuration params.
//
// Returns nothing,
var showEUConsentField = function(form, checkTimezone) {
  if (!checkTimezone || Time.timeZone().startsWith("Europe")) {
    var checkbox = form.el.form.querySelector("[data-container='eu-checkbox']");
    if (checkbox) {
      DOM.removeClass(checkbox, "hidden");
      var fields = checkbox.getElementsByTagName("input");
      for (var i in fields) {
        if (!fields.hasOwnProperty(i)) continue;
        fields[i].disabled = false;
      }
    }
  }
};

// Detects user exit intent to auto open the form
var detectExitIntent = function(form) {
  var _html = document.documentElement;
  var _openDelay = null;
  var startTime = Time.now();

  _html.addEventListener("mouseleave", function(event) {
    if (event.clientY > form.exit_intent_sensitivity) return;
    if (form.triggered == false) {
      _openDelay = setTimeout(function() {
        if (
          !form.exit_intent_time_limit ||
          Time.now() - startTime < form.exit_intent_time_limit * 1000
        ) {
          internal.toggleWidget(form, undefined);
        }
      }, form.exit_intent_open_delay * 1000);
    }
  });

  _html.addEventListener("mouseenter", function() {
    if (_openDelay) {
      clearTimeout(_openDelay);
      _openDelay = null;
    }
  });
};

// Detects if the user has scrolled to 150px before the selected div reaches the top of the viewport and opens the form
var detectScrollToId = function(form) {
  var didScroll = false;

  // verify there is a valid selector set
  if (document.getElementById(form.show_at_anchor) !== null) {
    var triggerPosition =
      document.getElementById(form.show_at_anchor).getBoundingClientRect().top - 150;
  }
  else {
    if (form.triggered === false) {
      setTimeout(function() {
        internal.toggleWidget(form, undefined);
      }, 500);
    }
    return;
  }

  window.onscroll = function() {
    didScroll = true;
  };

  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      var currentPosition = document.body.scrollTop;

      if (currentPosition > triggerPosition) {
        if (form.triggered === false) {
          internal.toggleWidget(form, undefined);
        }
      }
    }
  }, 500);
};

// Detects if the user has scrolled down a given percentage of the entire document length and opens the form
var detectScrollToPosition = function(form) {
  var didScroll = false;
  var triggerPosition =
    document.documentElement.scrollHeight * (form.show_at_percent / 100);

  window.onscroll = function() {
    didScroll = true;
  };

  setInterval(function() {
    if (didScroll) {
      didScroll = false;
      if (window.innerHeight + window.scrollY >= triggerPosition) {
        if (form.triggered == false) {
          internal.toggleWidget(form, undefined);
        }
      }
    }
  }, 500);
};

var refreshDesktop = function(form) {
  var el = form.el;

  // Remove mobile class
  removeClass(el.container, "mobile");
  removeClass(el.scroll, "mobile");

  // Add region + side classes
  if (form.region) addClass(el.container, form.region);
  if (form.side) addClass(el.container, form.side);

  // Update the open/closed position
  switch (form.category) {
  case "tab":
    switch (form.region) {
    case "bottom":
      if (form.isOpen) {
        el.content.style.bottom = "0";
      } else {
        el.content.style.bottom =
              "-" + (el.content.offsetHeight + 250).toString() + "px";
      }
      break;

    case "side":
      // Clean up any bottom-fixed styles that may be left over from the mobile view
      el.content.style.bottom = null;

      // Update header position
      if (form.isOpen || !form.showTeaser) {
        el.header.style[form.side] =
              "-" + (el.header.offsetHeight + 250).toString() + "px";
      } else {
        el.header.style[form.side] =
              (el.header.offsetHeight / 2).toString() + "px";
      }

      // Update content position
      if (form.isOpen) {
        el.content.style[form.side] = "0";
      } else {
        el.content.style[form.side] =
              "-" + (el.content.offsetWidth + 250).toString() + "px";
      }

      break;
    }

    break;

  case "lightbox":
    // Reset the default style settings on desktop view
    el.content.style.left = "";
    el.content.style.bottom = "";

    break;
  }
};

var refreshMobile = function(form) {
  var el = form.el;

  // Remove region + side classes
  removeClass(el.container, "side");
  removeClass(el.container, "bottom");
  removeClass(el.container, "left");
  removeClass(el.container, "right");

  // Add mobile class
  addClass(el.container, "mobile");

  if (form.isOpen) {
    el.content.style.bottom = "0";
  } else {
    el.content.style.bottom =
      "-" + (el.content.offsetHeight + 50).toString() + "px";
  }
};

// Yet another Polyfill for STUPID IE!! This one is for placeholder support
//
//
// HTML5 Placeholder Attribute Polyfill (Simple)
//
// Author: James Brumond <james@jbrumond.me> (http://www.jbrumond.me)
//
/* eslint no-unused-vars: 0*/
var setPlaceHolders = function(el, document, undefined) {
  // Don't run the polyfill if it isn't needed
  if ("placeholder" in document.createElement("input")) {
    document.placeholderPolyfill = function() {
      /*  no-op */
    };
    document.placeholderPolyfill.active = false;
    return;
  }

  // Fetch NodeLists of the needed element types
  var inputs = el.getElementsByTagName("input");
  var textareas = el.getElementsByTagName("textarea");

  //
  // Define the exposed polyfill methods for manual calls
  //
  el.placeholderPolyfill = function(elems) {
    elems = elems ? validElements(elems) : validElements(inputs, textareas);
    each(elems, polyfillElement);
  };

  // Expose whether or not the polyfill is in use (false means native support)
  el.placeholderPolyfill.active = true;

  // Run automatically
  el.placeholderPolyfill();

  // -------------------------------------------------------------

  // Use mutation events for auto-updating
  if (el.addEventListener) {
    el.addEventListener("DOMAttrModified", el.placeholderPolyfill);
    el.addEventListener("DOMNodeInserted", el.placeholderPolyfill);
  }

  // Use onpropertychange for auto-updating
  else if (el.attachEvent && "onpropertychange" in el) {
    el.attachEvent("onpropertychange", el.placeholderPolyfill);
  }

  // No event-based auto-update
  else {
    // pass
  }

  // -------------------------------------------------------------

  // Add some basic default styling for placeholders
  firstStylesheet().addRule(
    '.drip-tab input[type="text"].-placeholder',
    "color: #888 !important;",
    0
  );

  // -------------------------------------------------------------

  //
  // Polyfill a single, specific element
  //
  function polyfillElement(elem) {
    // If the element is already polyfilled, skip it
    if (elem.__placeholder != null) {
      // Make sure that if the placeholder is already shown, that it is at least up-to-date
      if (elem.__placeholder) {
        elem.value = getPlaceholder();
      }
      return;
    }

    // Keep track of placeholder changes so we can fire off updates correctly
    var currentPlaceholder = getPlaceholderFor(elem);
    function getPlaceholder() {
      return (currentPlaceholder = getPlaceholderFor(elem));
    }

    // Is there already a value in the field? If so, don't replace it with the placeholder
    if (elem.value) {
      elem.__placeholder = false;
      if (elem.value === getPlaceholder()) {
        doShowPlaceholder();
      }
    } else {
      showPlaceholder();
    }

    // Define the events that cause these functions to be fired
    addEvent(elem, "keyup", checkPlaceholder);
    addEvent(elem, "keyDown", checkPlaceholder);
    addEvent(elem, "blur", checkPlaceholder);
    addEvent(elem, "focus", hidePlaceholder);
    addEvent(elem, "click", hidePlaceholder);

    // Use mutation events for auto-updating
    if (elem.addEventListener) {
      addEvent(elem, "DOMAttrModified", updatePlaceholder);
    }

    // Use onpropertychange for auto-updating
    else if (elem.attachEvent && "onpropertychange" in elem) {
      addEvent(elem, "propertychange", updatePlaceholder);
    }

    // No event-based auto-update
    else {
      // pass
    }

    function updatePlaceholder() {
      // Run this asynchronously to make sure all needed updates happen before we run checks
      setTimeout(function() {
        var old = currentPlaceholder;
        var current = getPlaceholder();

        // If the placeholder attribute has changed
        if (old !== current) {
          // If the placeholder is currently shown
          if (elem.__placeholder) {
            elem.value = current;
          }
        }

        // Make sure that elem.__placeholder stays acurate, even if the placeholder or value are
        // manually changed via JavaScript
        if (elem.__placeholder && elem.value !== current) {
          elem.__placeholder = false;
        }
      }, 0);
    }

    function checkPlaceholder() {
      if (elem.value) {
        hidePlaceholder();
      } else {
        showPlaceholder();
      }
    }

    function showPlaceholder() {
      if (!elem.__placeholder && !elem.value) {
        doShowPlaceholder();
      }
    }

    function doShowPlaceholder() {
      elem.__placeholder = true;
      elem.value = getPlaceholder();
      addClass(elem, "-placeholder");
    }

    function hidePlaceholder() {
      if (elem.__placeholder) {
        elem.__placeholder = false;
        elem.value = "";
        removeClass(elem, "-placeholder");
      }
    }
  }

  // -------------------------------------------------------------

  //
  // Build a list of valid (can have a placeholder) elements from the given parameters
  //
  function validElements() {
    var result = [];

    each(arguments, function(arg) {
      if (typeof arg.length !== "number") {
        arg = [arg];
      }

      result.push.apply(result, filter(arg, isValidElement));
    });

    return result;
  }

  //
  // Check if a given element supports the placeholder attribute
  //
  function isValidElement(elem) {
    var tag = (elem.nodeName || "").toLowerCase();
    return (
      tag === "textarea" ||
      (tag === "input" && (elem.type === "text" || elem.type === "password"))
    );
  }

  // -------------------------------------------------------------

  function addEvent(obj, event, func) {
    if (obj.addEventListener) {
      obj.addEventListener(event, func, false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + event, func);
    }
  }

  // -------------------------------------------------------------

  function each(arr, func) {
    if (arr.forEach) {
      return arr.forEach(func);
    }

    for (var i = 0, c = arr.length; i < c; i++) {
      func.call(null, arr[i], i, arr);
    }
  }

  function filter(arr, func) {
    if (arr.filter) {
      return arr.filter(func);
    }

    var result = [];
    for (var i = 0, c = arr.length; i < c; i++) {
      if (func.call(null, arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }

    return result;
  }

  // -------------------------------------------------------------

  var regexCache = {};
  function classNameRegex(cn) {
    if (!regexCache[cn]) {
      regexCache[cn] = new RegExp("(^|\\s)+" + cn + "(\\s|$)+", "g");
    }

    return regexCache[cn];
  }

  function addClass(elem, cn) {
    elem.className += " " + cn;
  }

  function removeClass(elem, cn) {
    elem.className = elem.className.replace(classNameRegex(cn), " ");
  }

  // -------------------------------------------------------------

  // Internet Explorer 10 in IE7 mode was giving me the wierest error
  // where e.getAttribute('placeholder') !== e.attributes.placeholder.nodeValue
  function getPlaceholderFor(elem) {
    return (
      elem.getAttribute("placeholder") ||
      (elem.attributes.placeholder && elem.attributes.placeholder.nodeValue)
    );
  }

  // -------------------------------------------------------------

  // Get the first stylesheet in the document, or, if there are none, create/inject
  // one and return it.
  function firstStylesheet() {
    var sheet = document.styleSheets && document.styleSheets[0];
    if (!sheet) {
      var style = document.createElement("style");
      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);
      sheet = style.sheet;
    }
    return sheet;
  }
};

// DOM Utility Methods
// =======================================================================

// Attaches a handler to a particular event on an DOM element.
//
// elem  - The DOM element to bind with.
// event - The String name of the event (without the "on")
// fn    - The Function event handler.
//
// Returns nothing.
var addEvent = function(elem, event, fn) {
  function listenHandler(e) {
    var ret = fn.apply(this, arguments);
    if (ret === false) {
      e.stopPropagation();
      e.preventDefault();
    }
    return ret;
  }

  function attachHandler() {
    var ret = fn.call(elem, window.event);
    if (ret === false) {
      window.event.returnValue = false;
      window.event.cancelBubble = true;
    }
    return ret;
  }

  if (elem.addEventListener) {
    elem.addEventListener(event, listenHandler, false);
  } else {
    elem.attachEvent("on" + event, attachHandler);
  }
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Time.now() - timestamp;
    if (last < wait) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Time.now();
    var callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

// Determines if the form is allowed to auto-open, based on various
// parameters.
//
// form - An Object containing form configuration params.
//
// Returns a Boolean.
var canAutoOpen = function(form, client) {
  // Never popup for subscribers
  if (client["form[" + form.id + "][submit]"]) return false;

  // Never popup on mobile browsers
  if (new Browser().isMobile()) return false;

  // If the user has manually closed the form...
  var closedAt = client["form[" + form.id + "][manual_close]"];
  if (
    closedAt &&
    Time.daysAgo(closedAt) < form.days_between_popup_after_close
  ) {
    return false;
  }

  // If the form has auto opened...
  var openedAt = client["form[" + form.id + "][auto_open]"];
  if (openedAt && Time.daysAgo(openedAt) < form.days_between_popup) {
    return false;
  }

  return true;
};

// Cancels default event action for a given JS event. A call to this
// function should be placed at the end of event handlers.
//
// e - An Event object.
//
// Returns false.
var preventDefault = function(e) {
  var evt = e ? e : window.event;
  if (evt.preventDefault) evt.preventDefault();
  if (evt.stopPropagation) evt.stopPropagation();
  evt.returnValue = false;
  return false;
};

var initializeBrowser = function(navigator) {
  return (function(userAgent) {
    function Browser() {}

    Browser.prototype.isMobile = function() {
      var check = false;
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
          userAgent
        ) ||
        /* eslint no-useless-escape: 0 */
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          userAgent.substr(0, 4)
        )
      ) {
        check = true;
      }
      return check;
    };

    return Browser;
  })(navigator.userAgent || navigator.vendor || window.opera);
};

exports.initialize = function(
  _recordFormEvent,
  _config,
  _log,
  _navigator,
  _dom
) {
  recordFormEvent = _recordFormEvent;
  config = _config;
  log = _log;
  Browser = initializeBrowser(_navigator);
  addClass = _dom.addClass;
  removeClass = _dom.removeClass;
  return internal;
};
