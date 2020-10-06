import cloneArrayBuffer from './_cloneArrayBuffer.js';

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

export default cloneTypedArray;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_cloneTypedArray.js
// module id = 241
// module chunks = 0 1