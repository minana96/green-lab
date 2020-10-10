'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/schedule.production.min.js');
} else {
  module.exports = require('./cjs/schedule.development.js');
}



//////////////////
// WEBPACK FOOTER
// ./~/schedule/index.js
// module id = 190
// module chunks = 0 1 2