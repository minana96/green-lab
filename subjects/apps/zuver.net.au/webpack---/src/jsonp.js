var Util = require("./util");
// Initiates a new JSONP request to a given url with given query
// string parameters. Technique is borrowed from http://bit.ly/WN2JtB.
//
// options - An Object containing various options.
//
// Returns nothing.
//
// COMPATIBILITY NOTE:
//   The delete operator raises an exception unexpectedly in IE 8:
//   http://stackoverflow.com/questions/1073414/deleting-a-window-property-in-ie
//
//   Normally we would clean up the callback function by deleting it from the window
//   object, like so:
//
//      delete window[callback];
//
//   To get around this, we just set it to undefined.
module.exports = function(options) {
  if (typeof options !== "object") return null;
  options.data || (options.data = {});

  // Name the temporary callback function
  var rnd = Math.floor(Math.random() * 1000000000).toString();
  var callback = "Drip_" + rnd;
  options.data.callback = callback;

  // Attach the temporary callback to the window object
  window[callback] = function(data) {
    // see incompatilibty note
    window[callback] = undefined;
    options.success(data);
  };

  // Execute the request
  var tag = document.createElement("script");
  var src = options.url + Util.toQueryString(options.data);
  tag.type = "text/javascript";
  tag.src = src;
  var head = document.getElementsByTagName("head")[0];
  head.insertBefore(tag, head.firstChild);

  // Timeout after a set amount of time
  window.setTimeout(function() {
    if (typeof window[callback] == "function") {
      // Replace with no-op in case the request is very latent
      window[callback] = function() {
        // see incompatilibty note
        window[callback] = undefined;
      };

      // Call the error callback if it is defined
      if (typeof options.error == "function") {
        options.error({ reason: "timeout" });
      }

      // Set a longer timeout to safely clean up the unused callback
      window.setTimeout(function() {
        if (typeof window[callback] == "function") {
          // see incompatilibty note
          window[callback] = undefined;
        }
      }, 60000);
    }
  }, options.timeout || 10000);
};
