import Hash from './_Hash.js';
import ListCache from './_ListCache.js';
import Map from './_Map.js';

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

export default mapCacheClear;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_mapCacheClear.js
// module id = 268
// module chunks = 0 1