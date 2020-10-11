// The Location class for determining matches.
module.exports = (function() {
  function Location(location, pattern, options) {
    this.location = location;
    this.pattern = pattern;
    this.options = options || {};
  }

  // Extracts the hostname from a location. If a path is provided instead,
  // then returns undefined.
  //
  // location - The String location.
  //
  // Example
  //
  //   extractHost("www.getdrip.com/tour?foo=bar");
  //   #=> "www.getdrip.com"
  //
  //   extractHost("/tour?foo=bar");
  //   #=> undefined
  //
  // Returns a String.
  Location.prototype.extractHost = function(location) {
    if (location[0] == "/") return undefined;

    var start;
    var doubleSlash = location.indexOf("//");

    if (doubleSlash == -1) {
      start = 0;
    } else {
      start = doubleSlash + 2;
    }

    var end = location.indexOf("/", start);
    end = end >= 0 ? end : location.length;
    return location.substring(start, end);
  };

  // Extracts the query string from a location.
  //
  // location - The String location.
  //
  // Example
  //
  //   extractQS("/tour?foo=bar");
  //   #=> "?foo=bar"
  //
  // Returns a String.
  Location.prototype.extractQS = function(location) {
    var parts = location.split("?");
    return parts.length > 1 ? "?" + parts[1].split("#")[0] : "";
  };

  // Extracts the path portion from a location.
  //
  // location - The String location.
  //
  // Example
  //
  //   extractPath("/tour?foo=bar#hash");
  //   #=> "/tour"
  //
  //   extractPath("http://google.com/tour?foo=bar#hash");
  //   #=> "/tour"
  //
  // Returns a String.
  Location.prototype.extractPath = function(location) {
    var hostAndPath = location.split("?")[0].split("#")[0];
    if (hostAndPath[0] == "/") return hostAndPath;

    var doubleSlash = hostAndPath.indexOf("//");
    if (doubleSlash == -1) {
      var singleSlash = hostAndPath.indexOf("/");

      if (singleSlash == -1) {
        return "/" + hostAndPath;
      } else {
        return hostAndPath.substring(singleSlash);
      }
    }

    var start = hostAndPath.indexOf("/", doubleSlash + 2);
    return hostAndPath.substring(start);
  };

  // Parses a hostname into an array.
  //
  // qs - The String hostname.
  //
  // Example
  //
  //   parseHost("mail.google.com");
  //   #=> ["mail", "google", "com"]
  //
  // Returns an Object.
  Location.prototype.parseHost = function(host) {
    if (host === undefined) return undefined;
    return host.split(".");
  };

  // Parses a query string into a JS object.
  //
  // qs - The String query string of the form "?key1=val1&key2=val2"
  //
  // Example
  //
  //   parseQS("?key1=val1&key2=val2");
  //   #=> { "key1" : "val1", "key2" : "val2" }
  //
  // Returns an Object.
  Location.prototype.parseQS = function(qs) {
    var params = {};

    if (qs.length > 1) {
      for (
        var aItKey, nKeyId = 0, aCouples = qs.substr(1).split("&");
        nKeyId < aCouples.length;
        nKeyId++
      ) {
        aItKey = aCouples[nKeyId].split("=");
        params[unescape(aItKey[0])] =
          aItKey.length > 1 ? unescape(aItKey[1]) : "";
      }
    }

    return params;
  };

  // Parses a path into an array of segments.
  //
  // path - The String path of the form "/segment1/segment2.html"
  //
  // Example
  //
  //   parsePath("/segment1/segment2.html");
  //   #=> ["segment1", "segment2.html"]
  //
  // Returns an Object.
  Location.prototype.parsePath = function(path) {
    var segments = path.split("/");

    // Remove blanks
    for (var i = 0; i < segments.length; i++) {
      if (segments[i] == "") {
        segments.splice(i, 1);
        i--;
      }
    }

    return segments;
  };

  // Matches the host component.
  //
  // Returns a Boolean.
  Location.prototype.matchHost = function() {
    var locationHost = this.parseHost(this.extractHost(this.location));
    var patternHost = this.parseHost(this.extractHost(this.pattern));

    if (patternHost) {
      return this.matchParts(locationHost, patternHost);
    } else {
      return true;
    }
  };

  // Matches the query string component.
  //
  // Returns a Boolean.
  Location.prototype.matchQS = function() {
    var locationQS = this.parseQS(this.extractQS(this.location));
    var patternQS = this.parseQS(this.extractQS(this.pattern));

    for (var key in patternQS) {
      if (patternQS.hasOwnProperty(key)) {
        if (locationQS.hasOwnProperty(key)) {
          if (patternQS[key] !== "*" && locationQS[key] !== patternQS[key]) {
            return false;
          }
        } else {
          return false;
        }
      }
    }

    return true;
  };

  // Matches the path component.
  //
  // Returns a Boolean.
  Location.prototype.matchPath = function() {
    var locationPath = this.parsePath(this.extractPath(this.location));
    var patternPath = this.parsePath(this.extractPath(this.pattern));
    return this.matchParts(locationPath, patternPath);
  };

  Location.prototype.matchParts = function(parts, patterns) {
    var part,
      pattern,
      gobbling = false;

    /* eslint no-constant-condition: 0*/
    while (true) {
      // Pop off the next pattern path segment if we aren't gobbling
      if (!gobbling) pattern = patterns.shift();

      // Enter gobbling mode if we hit ** and continue on to the
      // next iteration
      if (pattern == "**") {
        gobbling = true;
        pattern = patterns.shift();
        continue;
      }

      // Pop off the next location path segment
      part = parts.shift();

      // Halt if we've reached the end of the location path
      if (part == undefined) break;

      // If the segments match, exit gobbling mode and continue...
      if (pattern == part || pattern == "*") {
        gobbling = false;
        continue;
        // Or if we are in gobbling mode, just continue...
      } else if (gobbling == true) {
        continue;
        // Otherwise, return false
      } else {
        return false;
      }
    }

    return pattern == undefined && part == undefined;
  };

  Location.prototype.matchRegex = function() {
    var pattern = this.pattern.match(/^\[(.*)\]$/)[1];
    var regex = new RegExp(pattern);
    return regex.test(this.location);
  };

  Location.prototype.isRegexPattern = function() {
    return /^\[.*\]$/.test(this.pattern);
  };

  // Determines if the given location matches the given pattern.
  //
  // Returns a Boolean.
  Location.prototype.match = function() {
    if (this.isRegexPattern()) {
      return this.matchRegex();
    } else {
      return this.matchHost() && this.matchPath() && this.matchQS();
    }
  };

  return Location;
})();
