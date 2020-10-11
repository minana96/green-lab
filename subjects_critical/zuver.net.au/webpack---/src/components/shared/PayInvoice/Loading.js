'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
    return _react2.default.createElement(
        'div',
        { className: 'PayInvoice__Loading clearfix' },
        _react2.default.createElement(
            'div',
            { className: 'Loading__text' },
            'Loading...'
        )
    );
};
exports.default = Loading;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/PayInvoice/Loading.js
// module id = 539
// module chunks = 0