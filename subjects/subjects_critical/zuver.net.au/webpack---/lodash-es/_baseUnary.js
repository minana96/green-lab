/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

export default baseUnary;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_baseUnary.js
// module id = 237
// module chunks = 0 1