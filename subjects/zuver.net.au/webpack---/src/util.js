module.exports = {
  // Removes leading and trailing whitespace from Object values

  // data - An Object

  // Returns an Object of data
  trimFields: function(data) {
    for (var key in data) {
      if (
        data.hasOwnProperty(key) &&
        data[key] &&
        typeof data[key].trim == "function"
      ) {
        data[key] = data[key].trim();
      }
    }

    return data;
  },

  // Adds a namespace to the given parameter keys.
  //
  // namespace - A String namespace.
  // params    - An Object of parameters.
  //
  // Example
  //
  //   addNamespace("fields", { "name": "Derrick" });
  //   => { "fields[name]": "Derrick" }
  addNamespace: function(namespace, params) {
    params || (params = {});
    var namespacedParams = {};

    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        namespacedParams[namespace + "[" + key + "]"] = params[key];
      }
    }

    return namespacedParams;
  },

  // Converts a set of parameters to a URI-encoded query string.
  //
  // params - An Object of query string params.
  //
  // Example
  //
  //   toQueryString({ name: "Derrick Reimer", gender: "male" });
  //   #=> "?name=Derrick%20Reimer&gender=male"
  //
  // Returns a String.
  toQueryString: function(params) {
    if (typeof params !== "object") return "";
    var encodedKey,
      encodedValue,
      pairs = [],
      i;

    for (var key in params) {
      if (key == "tags") {
        var tags = params.tags;
        for (i = 0; i < tags.length; i++) {
          encodedValue = encodeURIComponent(tags[i]);
          pairs.push("tag_" + i + "=" + encodedValue);
        }
      }
      if (key == "remove_tags") {
        var remove_tags = params.remove_tags;
        for (i = 0; i < remove_tags.length; i++) {
          encodedValue = encodeURIComponent(remove_tags[i]);
          pairs.push("remove_tag_" + i + "=" + encodedValue);
        }
      }
      if (params.hasOwnProperty(key)) {
        encodedKey = encodeURIComponent(key);

        if (params[key] instanceof Array) {
          for (i = 0; i < params[key].length; i++) {
            encodedValue = encodeURIComponent(params[key][i]);
            if (encodedKey !== "tags" && encodedKey !== "remove_tags") {
              pairs.push(encodedKey + "[]=" + encodedValue);
            }
          }
        } else {
          if (params[key] !== null) {
            encodedValue = encodeURIComponent(params[key]);
          } else {
            encodedValue = "";
          }
          pairs.push(encodedKey + "=" + encodedValue);
        }
      }
    }
    return "?" + pairs.join("&");
  }
};
