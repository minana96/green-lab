module.exports = isPromise;

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}



//////////////////
// WEBPACK FOOTER
// ./~/is-promise/index.js
// module id = 83
// module chunks = 0 1