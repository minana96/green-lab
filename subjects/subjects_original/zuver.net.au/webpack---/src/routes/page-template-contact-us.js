'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ContactForm = require('../components/shared/ContactForm');

var _ContactForm2 = _interopRequireDefault(_ContactForm);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: function init() {
        _reactDom2.default.render(_react2.default.createElement(_ContactForm2.default, null), document.getElementById('app-root--ContactForm'));
        (0, _common.slideToOnLoad)('app-root--ContactForm');
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-contact-us.js
// module id = 522
// module chunks = 0