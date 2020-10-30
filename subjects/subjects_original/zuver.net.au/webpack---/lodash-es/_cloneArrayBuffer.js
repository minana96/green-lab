import Uint8Array from './_Uint8Array.js';

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

export default cloneArrayBuffer;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_cloneArrayBuffer.js
// module id = 239
// module chunks = 0 1