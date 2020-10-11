/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

export default baseHasIn;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_baseHasIn.js
// module id = 219
// module chunks = 0 1