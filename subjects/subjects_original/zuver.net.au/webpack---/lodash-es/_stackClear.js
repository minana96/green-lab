import ListCache from './_ListCache.js';

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

export default stackClear;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_stackClear.js
// module id = 285
// module chunks = 0 1