'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/schedule-tracing.production.min.js');
} else {
  module.exports = require('./cjs/schedule-tracing.development.js');
}



//////////////////
// WEBPACK FOOTER
// ./~/schedule/tracing.js
// module id = 191
// module chunks = 0 1 2