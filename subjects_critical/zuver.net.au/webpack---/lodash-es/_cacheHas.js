/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

export default cacheHas;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_cacheHas.js
// module id = 238
// module chunks = 0 1