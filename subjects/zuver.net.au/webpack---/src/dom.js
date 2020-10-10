module.exports = {
  addClass: function(el, klass) {
    var original = el.className;
    var regex = new RegExp("(?:^|\\s)" + klass + "(?!\\S)");
    if (!original.match(regex)) {
      el.className = original + " " + klass;
    }
  },
  removeClass: function(el, klass) {
    var original = el.className;
    var regex = new RegExp("(?:^|\\s)" + klass + "(?!\\S)", "g");
    el.className = original.replace(regex, "");
  }
};
