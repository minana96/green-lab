import baseCreate from './_baseCreate.js';
import getPrototype from './_getPrototype.js';
import isPrototype from './_isPrototype.js';

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

export default initCloneObject;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_initCloneObject.js
// module id = 259
// module chunks = 0 1