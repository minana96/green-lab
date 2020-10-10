'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react-is.production.min.js');
} else {
  module.exports = require('./cjs/react-is.development.js');
}



//////////////////
// WEBPACK FOOTER
// ./~/react-is/index.js
// module id = 162
// module chunks = 0 1