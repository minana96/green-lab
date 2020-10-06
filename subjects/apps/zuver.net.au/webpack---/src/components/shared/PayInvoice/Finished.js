"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Finished = function Finished() {
    if (global_var) {
        var _global_var = global_var,
            site_url = _global_var.site_url,
            theme_url = _global_var.theme_url;

        return _react2.default.createElement(
            "div",
            { className: "PayInvoice__box" },
            _react2.default.createElement(
                "div",
                { className: "PayInvoice__finished" },
                _react2.default.createElement(
                    "div",
                    { className: 'PayInvoice__finished-wrapper' },
                    _react2.default.createElement("img", { className: 'PayInvoice__finished-image', src: theme_url + "/images/order-complete.svg", alt: 'Payment Successful' }),
                    _react2.default.createElement(
                        "div",
                        { className: 'PayInvoice__finished-heading' },
                        "Payment Successful"
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: 'PayInvoice__finished-description' },
                        "We are delighted to inform you that we received your payments. Please click here to ",
                        _react2.default.createElement(
                            "a",
                            { href: site_url },
                            "Continue Shopping"
                        )
                    )
                )
            )
        );
    }
    return _react2.default.createElement(_react.Fragment, null);
};

exports.default = Finished;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/PayInvoice/Finished.js
// module id = 538
// module chunks = 0