/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

export default baseProperty;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_baseProperty.js
// module id = 231
// module chunks = 0 1