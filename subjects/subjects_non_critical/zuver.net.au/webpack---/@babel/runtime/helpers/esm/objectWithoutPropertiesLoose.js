export default function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}


//////////////////
// WEBPACK FOOTER
// ./~/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
// module id = 82
// module chunks = 0 1