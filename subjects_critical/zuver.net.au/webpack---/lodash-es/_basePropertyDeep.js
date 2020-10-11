import baseGet from './_baseGet.js';

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

export default basePropertyDeep;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_basePropertyDeep.js
// module id = 232
// module chunks = 0 1