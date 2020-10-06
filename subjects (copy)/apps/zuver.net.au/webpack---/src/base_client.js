/* =====================================================================
 * Drip Client Library
 * https://www.getdrip.com/
 * Copyright (c) 2013-2019 Drip
 * ===================================================================== */


module.exports = {
  make_dc: function (
    window,
    document,
    $,
    navigator,
    jsonp,
    getQueryVariable,
    Location,
    Widget,
    Dom,
    Util,
    Time,
    Criteria,
    Integrations
  ) {
    // Default settings
    var defaults = {
      hostname: "https://api.getdrip.com",
      debug: false,
    };

    // This should contain user-defined settings. This object should be
    // populated in the #initialize method with data from the window._drip
    // object.
    //
    // The following attributes are acceptable:
    //   account  - A String Drip account ID (required).
    //   debug    - A Boolean flag to turn on debug statements
    //              (optional; default = false).
    //   hostname - A String hostname for API requests
    //              (optional; default = 'https://api.getdrip.com').
    var settings = {};

    // This should contain all configuration data from Drip. Fetch this data
    // with the #getConfig() function.
    var config = {};

    // This should be populated with client data to be stored as a cookie.
    // Fetch this data with the #getClientData() function and set it with
    // #setClientData(data).
    var client = {};

    // This object caches custom field data set via the #identify method.
    // If the #subscribe method is called, this data is used by default.
    var customFieldData = {};

    // A cache of all rendered embedded forms
    var embeddedForms = [];

    var widget;
    var refreshWidget;
    var bindShowFormLinks;

    // Polyfill for STUPID IE!!
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement, fromIndex) {
        if (this === undefined || this === null) {
          /* eslint quotes: 0 */
          throw new TypeError('"this" is null or not defined');
        }

        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

        fromIndex = +fromIndex || 0;

        if (Math.abs(fromIndex) === Infinity) {
          fromIndex = 0;
        }

        if (fromIndex < 0) {
          fromIndex += length;
          if (fromIndex < 0) {
            fromIndex = 0;
          }
        }

        for (; fromIndex < length; fromIndex++) {
          if (this[fromIndex] === searchElement) {
            return fromIndex;
          }
        }

        return -1;
      };
    }

    // Custom Deferred object that will allow to control async flow
    // until we actually get a response from an async call.
    //
    // Found at StackOverflow: http://stackoverflow.com/a/18097040
    //
    // Returns a Deferred object that responds to .resolve() to deliver
    // a promise. Responds to .done() in order to await the delivery of
    // a response from an async call.
    var Deferred = function (options) {
      this._done = [];
      this._fail = [];
      this._always = [];
      this.options = options || {};
    };

    Deferred.prototype = {
      execute: function (list, args) {
        var i = list.length;

        // convert arguments to an array
        // so they can be sent to the
        // callbacks via the apply method
        args = Array.prototype.slice.call(args);

        while (i--) list[i].apply(null, args);
      },
      resolve: function () {
        this.execute(this._done, arguments);
        this.execute(this._always, arguments);
        this.options.resolved = true;
      },
      reject: function () {
        this.execute(this._fail, arguments);
        this.execute(this._always, arguments);
        this.options.rejected = true;
      },
      done: function (callback) {
        if (this.options.resolved) {
          callback.apply(null);
        } else {
          this._done.push(callback);
        }
        return this;
      },
      fail: function (callback) {
        if (this.options.rejected) {
          callback.apply(null);
        } else {
          this._fail.push(callback);
        }
        return this;
      },
      always: function (callback) {
        if (this.options.resolved) {
          callback.apply(null);
        } else if (this.options.rejected) {
          callback.apply(null);
        } else {
          this._always.push(callback);
        }
        return this;
      }
    };

    var queue = (function () {
      var deferredQueue = [];
      var initialDeferred = new Deferred({resolved: true});
      deferredQueue.push(initialDeferred);

      // Asynchronously performs a tracking action.
      //
      // action - An Array of arguments describing the action to take.
      //
      // Returns nothing.
      var perform = function (action) {
        var nextDeferred = new Deferred();
        deferredQueue.push(nextDeferred);
        deferredQueue[deferredQueue.length - 2].always(function () {
          var nextCall = window._dc[action.shift()].apply(null, action);
          if (nextCall && nextCall.done) {
            nextCall.always(function () {
              nextDeferred.resolve();
            });
          } else {
            nextDeferred.resolve();
          }
        });
      };

      // Public Interface
      // =======================================================================

      return {
        // Initializes the queue with events pushed before this object
        // was initialized.
        //
        // q - The Array of initial actions to track.
        //
        // Returns nothing.
        initialize: function (q) {
          if (q) {
            for (var i = 0; i < q.length; i++) {
              perform(q[i]);
            }
          }
        },

        // Asynchronously performs a tracking action.
        //
        // action - An Array of arguments describing the action to take.
        //
        // Returns nothing.
        push: function (action) {
          perform(action);
        }
      };
    })();

    var Browser = (function (userAgent) {
      function Browser() {
      }

      Browser.prototype.isMobile = function () {
        var check = false;
        /* eslint no-useless-escape: 0 */
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
            userAgent
          ) ||
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

    /*!
     * JavaScript Cookie v2.1.2
     * https://github.com/js-cookie/js-cookie
     *
     * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
     * Released under the MIT license
     */

    var Cookies = (function () {
      function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
          var attributes = arguments[i];
          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }
        return result;
      }

      function init(converter) {
        function api(key, value, attributes) {
          var result;
          if (typeof document === "undefined") {
            return;
          }

          // Write

          if (arguments.length > 1) {
            attributes = extend(
              {
                path: "/"
              },
              api.defaults,
              attributes
            );

            if (typeof attributes.expires === "number") {
              var expires = new Date();
              expires.setMilliseconds(
                expires.getMilliseconds() + attributes.expires * 864e5
              );
              attributes.expires = expires;
            }

            try {
              result = JSON.stringify(value);
              if (/^[\{\[]/.test(result)) {
                value = result;
              }
            } catch (e) {
            }

            if (!converter.write) {
              value = encodeURIComponent(String(value)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              );
            } else {
              value = converter.write(value, key);
            }

            key = encodeURIComponent(String(key));
            key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
            key = key.replace(/[\(\)]/g, escape);

            return (document.cookie = [
              key,
              "=",
              value,
              attributes.expires &&
              "; expires=" + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
              attributes.path && "; path=" + attributes.path,
              attributes.domain && "; domain=" + attributes.domain,
              attributes.secure ? "; secure" : ""
            ].join(""));
          }

          // Read

          if (!key) {
            /* eslint no-empty: 0 */
            result = {};
          }

          // To prevent the for loop in the first place assign an empty array
          // in case there are no cookies at all. Also prevents odd result when
          // calling "get()"
          var cookies = document.cookie ? document.cookie.split("; ") : [];
          var rdecode = /(%[0-9A-Z]{2})+/g;
          var i = 0;

          for (; i < cookies.length; i++) {
            var parts = cookies[i].split("=");
            var cookie = parts.slice(1).join("=");

            if (cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }

            try {
              var name = parts[0].replace(rdecode, decodeURIComponent);
              cookie = converter.read
                ? converter.read(cookie, name)
                : converter(cookie, name) ||
                cookie.replace(rdecode, decodeURIComponent);

              if (this.json) {
                try {
                  cookie = JSON.parse(cookie);
                } catch (e) {
                }
              }

              if (key === name) {
                result = cookie;
                break;
              }

              if (!key) {
                result[name] = cookie;
              }
            } catch (e) {
            }
          }

          return result;
        }

        api.set = api;
        api.get = function (key) {
          return api(key);
        };
        api.getJSON = function () {
          return api.apply(
            {
              json: true
            },
            [].slice.call(arguments)
          );
        };

        /* eslint no-empty: 0 */
        api.defaults = {};

        api.remove = function (key, attributes) {
          api(
            key,
            "",
            extend(attributes, {
              expires: -1
            })
          );
        };

        api.withConverter = init;

        return api;
      }

      /* eslint no-empty: 0 */
      return init(function () {
      });
    })();

    // Logging
    // =======================================================================

    // Create a no-op console if it's not present
    if (!window.console) window.console = {};

    // Logs a message to console for debugging purposes if debug mode
    // is enabled.
    //
    // message - A String message to print to the log.
    // level   - A String indicating the log level (default: 'info').
    // ensure  - A Boolean that ensures the message is outputted, even if we
    //           are not in debug mode (optional).
    //
    // Returns nothing.
    var log = function (message, level, ensure) {
      if (settings.debug || ensure) {
        level || (level = "info");
        if (!window.console[level]) {
          level = "log";
        }
        window.console[level]("DC: " + message);
      }
    };

    // Utility Methods
    // =======================================================================

    var merge = function (obj, defaults) {
      for (var key in defaults) {
        if (defaults.hasOwnProperty(key) && !obj.hasOwnProperty(key)) {
          obj[key] = defaults[key];
        }
      }
    };

    var endsWith = function (string, searchString, position) {
      position = position || string.length;
      position = position - searchString.length;
      return string.lastIndexOf(searchString) === position;
    };

    var addNamespace = Util.addNamespace;

    // Triggers an event via jQuery (if available).
    //
    // target - The DOM node on which to trigger the event.
    // name   - A String event name.
    // data   - An Object of event data.
    //
    // Returns true if event is triggerable; otherwise, returns false.
    var triggerEvent = function (target, name, data) {
      if (!$) return false;
      $(target).trigger(name, data);
    };

    // Scrubs the query string of given keys from the current url.
    //
    // keys - An Array of query string keys.
    //
    // Returns the scrubbed url.
    var scrubQueryString = function (keys) {
      var queryPairs = window.location.search.substr(1).split("&");
      var filteredQueryPairs = [];
      var filteredQueryString = "";

      for (var i = 0; i < queryPairs.length; i++) {
        var key = queryPairs[i].split("=")[0];

        if (keys.indexOf(key) == -1) {
          filteredQueryPairs.push(queryPairs[i]);
        }
      }

      if (filteredQueryPairs.length > 0) {
        filteredQueryString = "?" + filteredQueryPairs.join("&");
      }

      var url =
        window.location.origin +
        window.location.pathname +
        filteredQueryString +
        window.location.hash;

      return url;
    };

    // API Methods
    // =======================================================================

    // Builds a endpoint URL.
    //
    // path - A String path.
    //
    // Example
    //
    //   buildEndpoint("events/subscribe")
    //   => "https://www.getdrip.com/client/events/subscribe"
    var buildEndpoint = function (path) {
      return settings.hostname + "/client/" + path;
    };

    // Client Data
    // =======================================================================

    // Reads the cookie with the given name, parses it into a JSON object, and
    // returns it.
    //
    // Returns an Object.
    var getClientData = function () {
      var result;
      var key = "_drip_client_" + settings.account;

      var decode = function (s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
      };

      var parseCookie = function (s) {
        var result = {};
        var parts = s.split("&");

        for (var i = 0, l = parts.length; i < l; i++) {
          var kv = parts[i].split("=");
          result[kv[0]] = kv[1];
        }

        return result;
      };

      var serializedValue = Cookies.get(key);

      if (serializedValue !== null && serializedValue !== undefined) {
        result = parseCookie(decode(serializedValue));
      } else {
        result = {};
      }

      return result;
    };

    // Saves data to the local data cookie.
    //
    // data - An Object containing data to store.
    //
    // Returns nothing.
    var setClientData = function (data) {
      var key = "_drip_client_" + settings.account;

      var encode = function (s) {
        return encodeURIComponent(s);
      };

      var serializeCookie = function (data) {
        var pairs = [];

        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            pairs.push(key + "=" + data[key]);
          }
        }

        return pairs.join("&");
      };

      var domain = config.domain;
      domain =
        domain && endsWith(window.location.hostname, domain)
          ? "." + domain
          : undefined;

      Cookies.set(key, encode(serializeCookie(data)), {
        expires: 730,
        path: "/",
        domain: domain
      });
    };

    // Fetches the configuration data for a given account.
    //
    // options - A Object with various options:
    //           success - A success callback function.
    //           error   - An error callback function (optional).
    //
    // Returns nothing.
    var getConfig = function (options) {
      options || (options = {});

      jsonp({
        url: buildEndpoint("config"),
        data: {
          drip_account_id: settings.account
        },
        success: function (resp) {
          log("Config data received");
          config = resp;
          if (typeof options.success == "function") options.success(resp);
        },
        error: function () {
          log("An error occurred receiving config data", "warn");
          if (typeof options.error == "function") options.error();
        }
      });
    };

    // Lookup Methods
    // =======================================================================

    var findCampaignById = function (id) {
      config.campaigns || (config.campaigns = []);

      for (var i = 0, l = config.campaigns.length; i < l; i++) {
        if (
          config.campaigns[i]["id"] == id ||
          config.campaigns[i]["public_id"] == id
        ) {
          return config.campaigns[i];
        }
      }

      return null;
    };

    var findGoalById = function (id) {
      config.goals || (config.goals = []);

      for (var i = 0, l = config.goals.length; i < l; i++) {
        if (config.goals[i]["id"] == id || config.goals[i]["public_id"] == id) {
          return config.goals[i];
        }
      }

      return null;
    };

    // Event Detection Methods
    // =======================================================================

    // Detects all conversions based on the current page URL.
    //
    // Returns nothing.
    var detectConversions = function () {
      var goal, loc;
      config.goals || (config.goals = []);

      for (var i = 0, l = config.goals.length; i < l; i++) {
        goal = config.goals[i];
        loc = new Location(window.location.href, goal.url);
        if (loc.match()) {
          recordConversion({goal_id: goal.public_id});
        }
      }
    };

    var detectUrlTriggers = function () {
      var trigger, loc;
      config.url_triggers || (config.url_triggers = []);

      for (var i = 0, l = config.url_triggers.length; i < l; i++) {
        trigger = config.url_triggers[i];
        loc = new Location(window.location.href, trigger.properties.url);
        if (loc.match()) {
          recordTrack({
            _action: trigger.action,
            url: trigger.properties.url,
            actual_url: window.location.href,
            source: "drip"
          });
        }
      }
    };

    var identifyTriggerLinks = function () {
      var pattern = /^http:\/\/drip.la/;
      var links = document.getElementsByTagName("a"),
        href;

      for (var i = 0, l = links.length; i < l; i++) {
        href = links[i].getAttribute("href");
        if (pattern.test(href)) {
          links[i].setAttribute("href", href + "?v=" + client.vid);
        }
      }
    };

    var triggerLeadEvents = function () {
      var settings = config.lead_settings || [];
      var location;

      if (settings.product_benefits_path) {
        location = new Location(
          window.location.href,
          settings.product_benefits_path
        );

        if (location.match()) {
          recordTrack({
            _action: "Viewed tour page",
            url: settings.product_benefits_path,
            actual_url: window.location.href,
            source: "drip"
          });
        }
      }

      if (settings.pricing_path) {
        location = new Location(window.location.href, settings.pricing_path);

        if (location.match()) {
          recordTrack({
            _action: "Viewed pricing page",
            url: settings.pricing_path,
            actual_url: window.location.href,
            source: "drip"
          });
        }
      }

      if (settings.careers_path) {
        location = new Location(window.location.href, settings.careers_path);

        if (location.match()) {
          recordTrack({
            _action: "Viewed careers page",
            url: settings.careers_path,
            actual_url: window.location.href,
            source: "drip"
          });
        }
      }
    };

    // Serializes a subscription form.
    //
    // formEl - A DOM form element.
    //
    // Returns an Object of data.
    var serializeForm = function (formEl) {
      var name,
        value,
        element,
        data = {};

      // Loop over field elements and collect up the data
      for (var i = 0, l = formEl.length; i < l; i++) {
        element = formEl[i];
        if (
          !element.disabled &&
          (element.type !== "checkbox" || element.checked)
        ) {
          name = element.name;
          value = element.value;
          data[name] = value;
        }
      }
      return data;
    };


    // Event Recording Methods
    // =======================================================================

    // Submits an "identify" call.
    //
    // options - A Object with various options:
    //           email   - A String email address (optional).
    //           tags    - An Array of tags (optional).
    //           [[ Various custom fields ]]
    //           success - A success callback function (optional).
    //           failure   - An failure callback function (optional).
    //
    // Returns nothing.
    var recordIdentify = function (options) {
      options || (options = {});
      var dfd = new Deferred();
      var data = {
        time_zone: Time.timeZone()
      };

      if (client.vid) {
        data["visitor_uuid"] = client.vid;
      }

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          if (key != "success" && key != "failure") {
            data[key] = options[key];
          }
        }
      }
      data = trimFields(data);

      if (options.success) {
        data["success_callback"] = true;
      }

      // Ensure that drip_account_id is not overwritten
      data.drip_account_id = settings.account;

      jsonp({
        url: buildEndpoint("identify"),
        data: data,
        success: function (resp) {
          log("Identify recorded");

          if (resp.success && resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred recording identify", "warn");
          if (typeof options.failure == "function") options.failure();
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });

      return dfd;
    };

    // Records a track call.
    //
    // options - A Object with various options:
    //           _action - A String action name.
    //           [[ Various custom properties ]]
    //           success   - A success callback (optional).
    //           error     - An error callback (optional).
    //
    // Returns nothing.
    var recordTrack = function (options) {
      options || (options = {});
      var dfd = new Deferred();

      var data = {
        url: window.location.href
      };

      if (client.vid) {
        data["visitor_uuid"] = client.vid;
      }

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          if (key != "success" && key != "failure") {
            data[key] = options[key];
          }
        }
      }
      data = trimFields(data);

      // Ensure that drip_account_id is not overwritten
      data.drip_account_id = settings.account;

      jsonp({
        url: buildEndpoint("track"),
        data: data,
        success: function (resp) {
          log("Track event recorded");

          if (resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred tracking event", "warn");
          if (typeof options.failure == "function") options.failure(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });

      return dfd;
    };

    // Records a conversion.
    //
    // options - A Object with various options:
    //           goal_id - public_id for a conversion.
    //           [[ Various custom properties ]]
    //           success   - A success callback (optional).
    //           error     - An error callback (optional).
    //
    // Returns nothing.
    var recordConversion = function (options) {
      options || (options = {});
      var dfd = new Deferred();

      var data = {
        url: window.location.href
      };

      if (client.vid) {
        data["visitor_uuid"] = client.vid;
      }

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          if (key != "success" && key != "failure") {
            data[key] = options[key];
          }
        }
      }

      data = trimFields(data);

      // Ensure that drip_account_id is not overwritten
      data.drip_account_id = settings.account;

      jsonp({
        url: buildEndpoint("conversion"),
        data: data,
        success: function (resp) {
          log("Conversion recorded");

          if (resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred tracking conversion", "warn");
          if (typeof options.failure == "function") options.failure(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });

      return dfd;
    };

    // Records a visit event.
    //
    // options - A Object with various options:
    //           success - A success callback function (optional).
    //           failure   - An failure callback function (optional).
    //
    // Returns nothing.
    var recordVisit = function (options) {
      options || (options = {});

      var data = {
        drip_account_id: settings.account,
        referrer: document.referrer,
        url: window.location.href,
        domain: window.location.hostname,
        time_zone: Time.timeZone(),
        enable_third_party_cookies: config.enable_third_party_cookies
          ? "t"
          : "f"
      };

      jsonp({
        url: buildEndpoint("events/visit"),
        data: data,
        success: function (resp) {
          log("Visit event recorded");

          if (resp.success && resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
        },
        error: function (resp) {
          log("An error occurred recording visit", "warn");
          if (typeof options.failure == "function") options.failure();
          if (typeof options.ensure == "function") options.ensure(resp);
        }
      });
    };

    // Records a form-related event.
    //
    // options - A Object with various options:
    //           accountId   - A String/Integer account ID.
    //           formId      - A String/Integer form ID.
    //           action      - A String representing the event action
    //                         ("auto_open", "auto_close", "submit", etc.).
    //           sendGaEvent - A Boolean indicating whether we should notify
    //                         Google Analytics (optional, defaults to false).
    //           success     - A success callback (optional).
    //           failure       - An failure callback (optional).
    //           ensure      - A callback that gets called whether the recording
    //                         succeeds or fails (optional).
    //
    // Returns nothing.
    var recordFormEvent = function (options) {
      options || (options = {});

      if (options.accountId == undefined) return;
      if (options.formId == undefined) return;
      if (options.action == undefined) return;

      var data = {};

      if (client.vid) data["visitor_uuid"] = client.vid;
      data["drip_account_id"] = options.accountId;
      data["form_id"] = options.formId;
      data["_action"] = options.action;
      data["url"] = window.location.href;

      client[
      "form[" + options.formId + "][" + options.action + "]"
        ] = Time.timestamp();
      setClientData(client);

      // Skip sending submit events, as we record these server-side now
      if (options.action != "submit") {
        jsonp({
          url: buildEndpoint("events/form"),
          data: data,
          success: function (resp) {
            log("Form action '" + options.action + "' recorded");

            if (resp.visitor_uuid) {
              client.vid = resp.visitor_uuid;
              setClientData(client);
            }

            if (typeof options.success == "function") options.success(resp);
            if (typeof options.ensure == "function") options.ensure(resp);
          },
          error: function (resp) {
            log("An error occurred recording form event", "warn");
            if (typeof options.failure == "function") options.failure(resp);
            if (typeof options.ensure == "function") options.ensure(resp);
          }
        });
      }

      if (options.action == "submit" && options.sendGaEvent) {
        // Send ga.js-style events
        // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
        if (window._gaq) {
          window._gaq.push([
            "_trackEvent",
            "Drip Opt-in Form",
            "Submit",
            String(options.formId)
          ]);
        }

        // Send analytics.js-style events
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        if (typeof window.ga == "function") {
          window.ga(
            "send",
            "event",
            "Drip Opt-in Form",
            "Submit",
            String(options.formId)
          );
        }
      }
    };

    // Records a subscription.
    //
    // options - A Object with various options:
    //           accountId  - A String/Integer account ID.
    //           campaignId - A String/Integer campaign ID.
    //           fields     - An Object of fields (including email address).
    //           namespaced - A Boolean indicating whether fields are already
    //                        namespaced (optional, defaults to false).
    //           success    - A success callback (optional).
    //           failure      - An failure callback (optional).
    //
    // Returns nothing.
    var recordSubscribe = function (options) {
      options || (options = {});
      var dfd = new Deferred();

      if (options.accountId == undefined) return;
      if (options.campaignId == undefined) return;

      var defaults = addNamespace(customFieldData);
      var data = options.fields || {};
      data = trimFields(data);
      if (!options.namespaced) data = addNamespace("fields", data);

      // merge custom field data from global cache
      // set via the #identify method
      merge(data, defaults);

      if (client.vid) data["visitor_uuid"] = client.vid;
      data["drip_account_id"] = options.accountId;
      data["campaign_id"] = options.campaignId;
      data["time_zone"] = Time.timeZone();
      data["url"] = window.location.href;
      data["page_title"] = document.title;
      if (options.double_optin != undefined) {
        data["double_optin"] = options.double_optin;
      }

      jsonp({
        url: buildEndpoint("events/subscribe"),
        data: data,
        success: function (resp) {
          log("Subscription recorded");

          if (resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred recording subscription", "warn");
          if (typeof options.failure == "function") options.failure(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });

      return dfd;
    };

    // Records an unsubscribe.
    //
    // options - A Object with various options:
    //           accountId - A String/Integer account ID.
    //           campaignId - A String/Integer campaign ID.
    //           email     - A String email address.
    //           success   - A success callback (optional).
    //           failure     - An failure callback (optional).
    //
    // Returns nothing.
    var recordUnsubscribe = function (options) {
      options || (options = {});
      var dfd = new Deferred();

      if (options.accountId == undefined) return;
      if (options.email == undefined) return;

      var data = {};
      data["drip_account_id"] = options.accountId;
      data["email"] = options.email;
      if (options.campaignId != undefined) {
        data["campaign_id"] = options.campaignId;
      }

      jsonp({
        url: buildEndpoint("events/unsubscribe"),
        data: data,
        success: function (resp) {
          log("Unsubscribe recorded");

          if (resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred recording unsubscribe", "warn");
          if (typeof options.failure == "function") options.failure();
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });
      return dfd;
    };

    // Submits an "beacon" call.
    //
    // options - A Object with various options:
    //           [[ Various custom fields ]]
    //           success - A success callback function (optional).
    //           failure   - An failure callback function (optional).
    //
    // Returns nothing.
    var recordBeacon = function (options) {
      options || (options = {});
      var dfd = new Deferred();

      var data = {
        drip_account_id: settings.account
      };

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          if (key != "success" && key != "failure") {
            data[key] = options[key];
          }
        }
      }

      jsonp({
        url: buildEndpoint("beacon"),
        data: data,
        success: function (resp) {
          log("Beacon recorded");
          if (typeof options.success == "function") options.success(resp);
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.resolve();
        },
        error: function (resp) {
          log("An error occurred recording beacon", "warn");
          if (typeof options.failure == "function") options.failure();
          if (typeof options.ensure == "function") options.ensure(resp);
          dfd.reject();
        }
      });

      return dfd;
    };

    // Opt-in Form Methods
    // =======================================================================

    var setCustomField = function (key, value) {
      log("Identifying " + key + "=" + value);

      // store in the global cache
      customFieldData[key] = value;

      // iterate over all the widgets
      var i, l;
      config.forms || (config.forms = []);
      for (i = 0, l = config.forms.length; i < l; i++) {
        var form = config.forms[i];

        if (form.el && form.el.form) {
          var el = form.el.form;

          // iterate over all the fields
          for (i = 0, l = el.length; i < l; i++) {
            if (el[i].name == "fields[" + key + "]") {
              el[i].value = value;
            }
          }
        }
      }

      // iterate over all the embedded forms (if jQuery is handy)
      if ($) {
        $(function () {
          for (var i = 0, l = embeddedForms.length; i < l; i++) {
            embeddedForms[i].find("[name='fields[" + key + "]']").val(value);
          }
        });
      }
    };

    // Submits a subscribe form via JSONP. If successful, show the success
    // notification; otherwise, parse the error object and display any
    // validation errors.
    //
    // form - An Object containing form configuration params.
    //
    // Returns a Boolean.
    var submitForm = function (form) {
      // Abort if submission is in progress
      if (form.isSubmitting) return log("Form submission cancelled");

      var data = serializeForm(document.forms["drip-form-" + form.id]);
      data = Util.trimFields(data);

      var defaults = Util.addNamespace(customFieldData);

      // merge custom field data from global cache
      // set via the #identify method
      merge(data, defaults);

      if (client.vid) data["visitor_uuid"] = client.vid;
      data["account_id"] = form["account_id"];
      data["drip_account_id"] = form["account_id"];
      data["form_id"] = form["id"];
      data["time_zone"] = Time.timeZone();
      data["url"] = window.location.href;
      data["page_title"] = document.title;

      // Flag as submitting
      form.isSubmitting = true;
      refreshWidget(form);
      clearErrors(form);

      // propagate submitting.drip event if jQuery is available
      triggerEvent(document, "submitting.drip", data);

      log("Submitting: " + JSON.stringify(data));

      jsonp({
        url: buildEndpoint("forms/submit"),
        data: data,
        success: function (resp) {
          log("Subscription recorded");

          if (resp.visitor_uuid) {
            client.vid = resp.visitor_uuid;
            setClientData(client);
          }

          form.isSubmitting = false;

          if (!resp.errors && !resp.error) {
            // propagate submitted.drip event if jQuery is available
            triggerEvent(document, "submitted.drip", data);

            recordFormEvent({
              accountId: form["account_id"],
              formId: form["id"],
              sendGaEvent: form["send_ga_event"],
              action: "submit"
            });

            form.showTeaser = false;

            if (resp["send_to_confirmation_page"]) {
              form.isOpen = false;
              clearForm(form);
              window.location = resp["confirmation_url"];
            } else {
              form.showSuccess = true;
              clearForm(form);
              refreshWidget(form);
            }
          } else {
            var errors = resp.errors || resp.error;
            if (errors["blacklisted"]) {
              var redirectURL =
                "https://getdrip.com/forms/" +
                form.public_id +
                "/submissions/new?client_redirect=true";
              window.location = redirectURL;
            }
            displayErrors(form, errors);
            log("Errors: " + JSON.stringify(resp));
            // propagate submitFailed.drip event if jQuery is available
            triggerEvent(document, "submitFailed.drip", data);
          }
        },
        error: function () {
          log("An error occurred recording subscription", "warn");

          form.isSubmitting = false;
          refreshWidget(form);
          // propagate submitFailed.drip event if jQuery is available
          triggerEvent(document, "submitFailed.drip", data);
        }
      });
    };

    var trimFields = Util.trimFields;

    // Embeddable Form Rendering
    // =======================================================================

    var renderEmbeddables = function () {
      if (!config.forms) return;

      // Halt if jQuery is not defined
      if ($ == undefined) {
        return log(
          "Unable to render embedded forms because jQuery is not installed",
          "warn"
        );
      }

      // When the DOM is ready...
      $(function () {
        var $containers = $("[data-drip-embedded-form]");

        for (var i = 0, l = config.forms.length; i < l; i++) {
          $containers.each(function (j, el) {
            renderEmbeddable(config.forms[i], $(el));
          });
        }
      });
    };

    var renderEmbeddable = function (form, $el) {
      // Stop if the form has already been rendered
      if ($el.attr("data-drip-id") !== undefined) return;

      // Stop if a specific ID is set and the current form does not match
      var id = $el.attr("data-drip-embedded-form");
      if (id !== "" && id !== String(form.id) && id !== String(form.public_id))
        return;

      log("Rendering embeddable form #" + id);

      // Set the ID (to flag as rendered)
      $el.attr("data-drip-id", id);

      // Make sure the form attributes are correct
      $el.attr("method", "post");

      // Set attributes
      $el.find("[data-drip-attribute='headline']").html(form.headline);
      $el.find("[data-drip-attribute='teaser']").html(form.teaser);
      $el.find("[data-drip-attribute='description']").html(form.description);
      $el.find("[data-drip-attribute='sign-up-button']").val(form.button_text);

      // Set the timezone, url, and page title
      $el.append(
        $("<input type='hidden' name='time_zone' />").val(Time.timeZone())
      );
      $el.append(
        $("<input type='hidden' name='url' />").val(window.location.href)
      );
      $el.append(
        $("<input type='hidden' name='page_title' />").val(document.title)
      );

      // Add visitor UUID upon submit
      $el.submit(function () {
        var $this = $(this);
        $this.append(
          $("<input type='hidden' name='visitor_uuid' />").val(client.vid)
        );
        return true;
      });

      // Cache a copy of the form
      embeddedForms.push($el);
    };

    // Widget Rendering
    // =======================================================================

    // Loops over the forms in the config objects and renders each one.
    //
    // Returns nothing.
    var renderWidgets = function () {
      if (config.forms) {
        for (var i = 0, l = config.forms.length; i < l; i++) {
          widget.render(
            config.forms[i],
            client,
            submitForm,
            config.eu_consent_check_timezone
          );
        }
      }
    };

    // Inserts attribute error messages on a form.
    //
    // form    - An Object containing form configuration params.
    // errors  - An Object containing attribute errors.
    // options - An Object containing options:
    //           prefix - A Boolean determining whether the message
    //                    should be prefixed with "This "
    //                    (optional, default: true).
    //
    // Returns nothing.
    var displayErrors = function (form, errors, options) {
      var selector, el, message;
      if (typeof errors !== "object") return;

      options || (options = {});
      merge(options, {prefix: true});

      for (var identifier in errors) {
        if (errors.hasOwnProperty(identifier)) {
          selector = identifier.replace(/\.|_/gi, "-");
          selector = "drip-errors-for-" + selector + "-" + form.id;
          el = document.getElementById(selector);

          if (el) {
            message = errors[identifier];
            if (options.prefix) {
              el.innerHTML = "This " + message;
            } else {
              el.innerHTML = message;
            }
          }
        }
      }

      refreshWidget(form, false);
    };

    // Clears all form errors.
    //
    // form - An Object containing form configuration params.
    //
    // Returns nothing.
    var clearErrors = function (form) {
      var errorEls = form.el.content.querySelectorAll("div.drip-errors");

      for (var i = 0, l = errorEls.length; i < l; i++) {
        errorEls[i].innerHTML = "";
      }

      refreshWidget(form);
    };

    // Clears all text fields on a form.
    //
    // formEl - A DOM form element.
    //
    // Returns nothing.
    var clearForm = function (form) {
      var formEl = document.forms["drip-form-" + form.id];
      if (formEl == undefined) return;

      for (var i = 0, l = formEl.length; i < l; i++) {
        if (formEl[i].tagName == "input" && formEl[i].type == "text") {
          formEl[i].value = "";
        }
      }

      refreshWidget(form);
    };

    var recordActivity = function () {
      var hour = 3600000,
        week = 604800000,
        pageViews = parseInt(client.pageViews || 0),
        sessionPageCount = parseInt(client.sessionPageCount || 0),
        weeklySessionCount = parseInt(client.weeklySessionCount || 0),
        lastVisitedAt = parseInt(client.lastVisitedAt || 0),
        lastSessionAt = parseInt(client.lastSessionAt || 0);

      // is this is a new session?
      if (now() - lastVisitedAt > hour) {
        if (config.enable_session_tracking) {
          recordTrack({
            _action: "Started a new session",
            source: "drip"
          });
        }
        // is the new session in a new week?
        if (now() - lastSessionAt > week) {
          weeklySessionCount = 1;
        } else {
          weeklySessionCount += 1;

          // intentionally hardcoded - used for customers scanning through activity timelines
          if (weeklySessionCount == 2) {
            recordTrack({
              _action: "Visited twice in one week",
              source: "drip"
            });
          }
        }

        lastSessionAt = now();
        sessionPageCount = 1;
      } else {
        sessionPageCount += 1;
      }

      pageViews += 1;

      // intentionally hardcoded - used for customers scanning through activity timelines
      if (sessionPageCount == 8) {
        recordTrack({
          _action: "Viewed eight pages in one visit",
          source: "drip"
        });
      }

      // Persist the state
      client.pageViews = pageViews;
      client.sessionPageCount = sessionPageCount;
      client.lastVisitedAt = now();
      client.weeklySessionCount = weeklySessionCount;
      client.lastSessionAt = lastSessionAt;
      setClientData(client);
    };

    var afterConfiguration = function (initialQueue) {
      widget = Widget.initialize(recordFormEvent, config, log, navigator, Dom);
      refreshWidget = widget.refresh;
      bindShowFormLinks = widget.bindShowFormLinks;
      api.showForm = widget.showForm;
      api.hideForm = widget.hideForm;

      var vid = getQueryVariable("__vid");

      if (vid && vid.length == 32) {
        if (client.vid != vid) {
          client.vid = vid;
          setClientData(client);
        }
      }

      if (client.vid) {
        return afterInitialize(initialQueue);
      }

      recordVisit({
        success: function () {
          afterInitialize(initialQueue);
        }
      });
    };

    var afterInitialize = function (initialQueue) {
      var subscriberId =
        getQueryVariable("__s") || getQueryVariable("drip_subscriber_id");
      var sourceTag = getQueryVariable("dst");

      api.vid = client.vid;

      if (subscriberId || sourceTag) {
        var identifyData = {};

        if (subscriberId) identifyData.subscriber_id = subscriberId;
        if (sourceTag) identifyData.tags = [sourceTag];

        initialQueue.unshift(["identify", identifyData]);

        if (window.history.replaceState) {
          var originalHref = window.location.href;
          var newHref = scrubQueryString(["__s", "dst"]);

          // replace state if scrubbing produced a different URL
          if (newHref !== originalHref) {
            window.history.replaceState(history.state, "", newHref);

            recordBeacon({
              type: "scrub_url",
              original_href: originalHref,
              new_href: newHref
            });
          }
        }
      }

      renderWidgets();
      renderEmbeddables();
      detectConversions();
      detectUrlTriggers();
      identifyTriggerLinks();
      triggerLeadEvents();
      recordActivity();
      bindShowFormLinks();

      window._dcq = queue;
      window._dcq.initialize(initialQueue);

      Integrations.identify();
    };

    var now = Time.now;

    // Public Interface
    // =======================================================================

    var api = {};

    // Fetches the site configuration data, dispatches the rendering
    // of opt-in forms, and sends analytics data back to Drip. If the account
    // is not defined, then we do nothing.
    //
    // options  - An Object containing various options:
    //            account  - A String Drip account ID (required).
    //            debug    - A Boolean flag to turn on debug statements
    //                       (optional; defualt = false).
    //            hostname - A String hostname for API requests
    //                       (optional; default = 'www.getdrip.com').
    // callback - An optional callback to run after configuration has been
    //            received.
    //
    // Returns nothing.
    api.initialize = function (options, initialQueue) {
      settings = options || {};
      merge(settings, defaults);

      // Exit if the account is not specified
      if (!settings.account) return log("No account specified", "warn");

      // Load client data
      client = getClientData();

      // Load the configuration data
      if (window._dcfg) {
        config = window._dcfg;
        log("Config data eager loaded");
        afterConfiguration(initialQueue);
      } else {
        getConfig({
          success: function (resp) {
            if (resp.success) {
              afterConfiguration(initialQueue);
            }
          }
        });
      }
    };

    // Prepopulates custom field data for current user.
    //
    // options - An Object containing custom field data.
    //
    // Returns nothing.
    api.identify = function (options) {
      options || (options = {});

      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          setCustomField(key, options[key]);
        }
      }

      return recordIdentify(options);
    };

    // Tracks an event.
    //
    // OLD STYLE (Deprecated):
    //
    // action - An Object with various options:
    //           id      - An Integer event ID (optional).
    //           action  - The String event action name (optional).
    //           value   - The Integer value in cents (optional).
    //           success - A success callback (optional).
    //           error   - An error callback (optional).
    //
    // NEW STYLE:
    //
    // action     - A String action name.
    // properties - An Object with event properties (optional).
    //              success - A success callback (optional).
    //              failure   - An failure callback (optional).
    //
    // Returns nothing.
    api.track = function (action, properties) {
      var data;

      if (typeof action == "string") {
        data = properties || {};
        data["_action"] = action;
      } else {
        data = action || {};
        var goal;

        if (data.id && !data.action) {
          goal = findGoalById(data.id);
          if (!goal) {
            return log("Goal not found", "warn");
          } else {
            data["goal_id"] = goal.public_id;
            return recordConversion(data);
          }
        } else if (data.action) {
          data["_action"] = data.action;
          delete data.action;
          delete data.id;
        } else {
          return log("Action is required", "warn");
        }
      }

      return recordTrack(data);
    };

    // Tracks a conversion event (alias to #track).
    api.trackConversion = function (action, properties) {
      return api.track(action, properties);
    };

    // Subscribes a visitor to given campaign.
    //
    // options - An Object with various options:
    //           id      - An Integer campaign ID.
    //           fields  - An Object containing the email and
    //                     custom fields.
    //           success - A success callback (optional).
    //           error   - An error callback (optional).
    api.subscribe = function (options) {
      var campaign_id = options.campaign_id || options.id;
      var campaign = findCampaignById(campaign_id);
      if (!campaign) return log("Campaign not found", "warn");

      return recordSubscribe({
        accountId: settings.account,
        campaignId: campaign["public_id"],
        double_optin: options.double_optin,
        fields: options.fields,
        namespaced: false,
        success: options.success,
        failure: options.failure
      });

    };

    // Unsubscribes a subscriber from given campaign.
    //
    // options - An Object with various options:
    //           email             - A String email address.
    //           id or campaing_id - An Integer campaign ID
    //           success           - A success callback (optional).
    //           error             - An error callback (optional).
    api.unsubscribe = function (options) {
      var campaign_id = options.campaign_id || options.id;

      // Only attempt to look up campaign public id if one was passed in
      if (campaign_id != undefined) {
        var campaign = findCampaignById(campaign_id);
        if (!campaign) return log("Campaign not found", "warn");
        campaign_id = campaign["public_id"];
      }

      return recordUnsubscribe({
        accountId: settings.account,
        email: options.email,
        campaignId: campaign_id,
        success: options.success,
        failure: options.failure
      });
    };

    api.recordProductView = function (product, collections, currency, url) {
      if (typeof product === "undefined" || !product) {
        return false;
      }

      // Match the protocol of the page to add to image url
      var matched =
        window &&
        window.location.href &&
        window.location.href.match(/(http[s]*:)/);
      var protocol = matched && matched[0];

      var payload = {
        _action: "Viewed a product",
        source: "shopify",
        title: product.title,
        collection: collections && collections.join(","),
        product_type: product.type,
        // Cannot use `tags` as utils.toQueryString treats that key in a special way
        product_tags: product.tags && product.tags.join(","),
        vendor: product.vendor,
        price: product.price,
        compare_at_price: product.compare_at_price,
        currency: currency,
        product_page_url: url,
        product_image_url:
          product.featured_image && product.featured_image.indexOf("http") !== 0
            ? protocol + product.featured_image
            : product.featured_image,
        product_id: product.id,
        sku:
          product.variants &&
          product.variants
            .map(function (variant) {
              return variant.sku;
            })
            .join(","),
        // option:, // TODO: Support coming soon. See: https://docs.google.com/spreadsheets/d/1r3OvpoCGY8-uZzN8he55n1bOXoGmNFDl71apzRh3DHI/edit#gid=0
        variant_id:
          product.variants &&
          product.variants
            .map(function (variant) {
              return variant.id;
            })
            .join(",")
      };

      var canSend = Criteria.canSend(
        config && config.product_triggers,
        payload
      );

      if (canSend) {
        recordTrack(payload);
        return true;
      }
      return false;
    };

    api.Location = Location;
    api.Browser = Browser;
    return api;
  }
};
