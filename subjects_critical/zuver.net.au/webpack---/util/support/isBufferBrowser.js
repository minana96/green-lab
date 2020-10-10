module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}


//////////////////
// WEBPACK FOOTER
// ./~/util/support/isBufferBrowser.js
// module id = 195
// module chunks = 0 1 2