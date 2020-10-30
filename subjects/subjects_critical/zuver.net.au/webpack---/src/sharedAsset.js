'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('jquery');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MainNavigation = require('./components/shared/MainNavigation');

var _MainNavigation2 = _interopRequireDefault(_MainNavigation);

var _ShoppingCart = require('./components/shared/ShoppingCart');

var _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);

var _EventNotification = require('./components/shared/EventNotification');

var _EventNotification2 = _interopRequireDefault(_EventNotification);

var _ContactForm = require('./components/shared/ContactForm');

var _ContactForm2 = _interopRequireDefault(_ContactForm);

require('./styles/shared/main-header.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Load Events */
jQuery(document).ready(function () {
    _reactDom2.default.render(_react2.default.createElement(_MainNavigation2.default, null), document.getElementById('app-root--MainNavigation'));
    _reactDom2.default.render(_react2.default.createElement(_EventNotification2.default, null), document.getElementById('app-root--EventNotification'));
    if (document.getElementById('app-root--ShoppingCart') && _typeof(document.getElementById('app-root--ShoppingCart'))) {
        _reactDom2.default.render(_react2.default.createElement(_ShoppingCart2.default, null), document.getElementById('app-root--ShoppingCart'));
    }
    if (document.getElementById('back-to-business')) {
        _reactDom2.default.render(_react2.default.createElement(_ContactForm2.default, null), document.getElementById('app-root--ContactForm'));
    }
});


//////////////////
// WEBPACK FOOTER
// ./src/sharedAsset.js
// module id = 548
// module chunks = 1