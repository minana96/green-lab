'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PayInvoice = require('../components/shared/PayInvoice');

var _PayInvoice2 = _interopRequireDefault(_PayInvoice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: function init() {
        _reactDom2.default.render(_react2.default.createElement(_PayInvoice2.default, null), document.getElementById('app-root--PayInvoice'));
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-pay-invoice.js
// module id = 528
// module chunks = 0