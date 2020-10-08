'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* ========================================================================
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DOM-based Routing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Based on http://goo.gl/EUTi53 by Paul Irish
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Only fires on body classes that match. If a body class contains a dash,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * replace the dash with an underscore when adding it to the object below.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ======================================================================== */

var _camelCase = require('./camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var Router = function () {
  function Router(routes) {
    _classCallCheck(this, Router);

    this.routes = routes;
  }

  _createClass(Router, [{
    key: 'fire',
    value: function fire(route) {
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'init';
      var args = arguments[2];

      var fire = route !== '' && this.routes[route] && typeof this.routes[route][fn] === 'function';
      if (fire) {
        this.routes[route][fn](args);
      }
    }
  }, {
    key: 'loadEvents',
    value: function loadEvents() {
      var _this = this;

      // Fire common init JS
      this.fire('common');

      // Fire page-specific init JS, and then finalize JS
      document.body.className.toLowerCase().replace(/-/g, '_').split(/\s+/).map(_camelCase2.default).forEach(function (className) {
        _this.fire(className);
        _this.fire(className, 'finalize');
      });

      // Fire common finalize JS
      this.fire('common', 'finalize');
    }
  }]);

  return Router;
}();

exports.default = Router;


//////////////////
// WEBPACK FOOTER
// ./src/util/Router.js
// module id = 533
// module chunks = 0