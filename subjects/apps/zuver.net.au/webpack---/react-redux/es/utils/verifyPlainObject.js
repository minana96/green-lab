import isPlainObject from './isPlainObject';
import warning from './warning';
export default function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}


//////////////////
// WEBPACK FOOTER
// ./~/react-redux/es/utils/verifyPlainObject.js
// module id = 166
// module chunks = 0 1