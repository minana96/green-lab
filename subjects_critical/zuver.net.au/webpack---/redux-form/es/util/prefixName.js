

var formatName = function formatName(_ref, name) {
  var sectionPrefix = _ref._reduxForm.sectionPrefix;
  return sectionPrefix ? sectionPrefix + '.' + name : name;
};


export default formatName;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/util/prefixName.js
// module id = 41
// module chunks = 0 1