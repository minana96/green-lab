import constant from './constant.js';
import defineProperty from './_defineProperty.js';
import identity from './identity.js';

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

export default baseSetToString;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_baseSetToString.js
// module id = 234
// module chunks = 0 1