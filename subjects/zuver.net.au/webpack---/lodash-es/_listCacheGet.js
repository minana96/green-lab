import assocIndexOf from './_assocIndexOf.js';

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

export default listCacheGet;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_listCacheGet.js
// module id = 265
// module chunks = 0 1