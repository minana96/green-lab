// Fetchs a query string value by key. If not found,
// returns null.
//
// variable - The String key.
//
// Returns a String or null.
module.exports = function(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return null;
};
