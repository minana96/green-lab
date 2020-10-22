/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

export default listCacheClear;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_listCacheClear.js
// module id = 263
// module chunks = 0 1