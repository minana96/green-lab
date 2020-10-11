'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// the most terrible camelizer on the internet, guaranteed!
exports.default = function (str) {
  return '' + str.charAt(0).toLowerCase() + str.replace(/[\W_]/g, '|').split('|').map(function (part) {
    return '' + part.charAt(0).toUpperCase() + part.slice(1);
  }).join('').slice(1);
};


//////////////////
// WEBPACK FOOTER
// ./src/util/camelCase.js
// module id = 549
// module chunks = 0