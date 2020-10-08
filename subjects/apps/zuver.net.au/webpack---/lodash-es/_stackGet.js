/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

export default stackGet;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_stackGet.js
// module id = 287
// module chunks = 0 1