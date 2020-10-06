'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _StepOne = require('./StepOne');

var _StepOne2 = _interopRequireDefault(_StepOne);

var _StepTwo = require('./StepTwo');

var _StepTwo2 = _interopRequireDefault(_StepTwo);

var _Finished = require('./Finished');

var _Finished2 = _interopRequireDefault(_Finished);

var _reactRedux = require('react-redux');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PayInvoice = function (_Component) {
    _inherits(PayInvoice, _Component);

    function PayInvoice() {
        _classCallCheck(this, PayInvoice);

        /* this.state = {
             step: 1,
             invoiceData: {"invoice":"5943","amount":"26.00","client":{"id":"79","firstname":"Jones","lastname":"Japriady","email":"jjapriady+test4@staff.ventraip.com","postcode":"3805","credit":"0.00","status":"Active"},"status":"success"}
         }*/
        var _this = _possibleConstructorReturn(this, (PayInvoice.__proto__ || Object.getPrototypeOf(PayInvoice)).call(this));

        _this.state = {
            step: 1,
            invoiceData: undefined
        };
        return _this;
    }

    _createClass(PayInvoice, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var step = this.state.step;
            var _global_var = global_var,
                client_ip = _global_var.client_ip;

            var renderStep = function renderStep() {
                if (step === 1) {
                    return _react2.default.createElement(_StepOne2.default, { parent: _this2 });
                } else if (step === 2) {
                    return _react2.default.createElement(_StepTwo2.default, { parent: _this2 });
                } else if (step === 3) {
                    return _react2.default.createElement(_Finished2.default, { parnet: _this2 });
                }
                return _react2.default.createElement(_react.Fragment, null);
            };
            var renderBottom = function renderBottom() {
                if (step === 1) {
                    var _global_var2 = global_var,
                        account_site = _global_var2.account_site;

                    return _react2.default.createElement(
                        'div',
                        { className: 'PayInvoice__bottom clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__already-text clearfix' },
                            'Already a customer?'
                        ),
                        _react2.default.createElement('div', { className: 'clear' }),
                        _react2.default.createElement(
                            'a',
                            { href: account_site, target: '_blank', className: 'bottom__my-zuver-acc clearfix' },
                            'Login To MyZuver and Pay'
                        )
                    );
                } else if (step === 2) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'PayInvoice__bottom clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__notes' },
                            'This order form is provided in a secure environment and to help protect against fraud. Your current IP address (',
                            client_ip,
                            ') is being logged.'
                        )
                    );
                }
            };
            return _react2.default.createElement(
                'div',
                { className: 'PayInvoice clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'PayInvoice__container container clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'PayInvoice__box clearfix' },
                        renderStep()
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'PayInvoice__bottom clearfix' },
                        renderBottom()
                    )
                )
            );
        }
    }]);

    return PayInvoice;
}(_react.Component);

var PayInvoiceProvider = function (_Component2) {
    _inherits(PayInvoiceProvider, _Component2);

    function PayInvoiceProvider() {
        _classCallCheck(this, PayInvoiceProvider);

        return _possibleConstructorReturn(this, (PayInvoiceProvider.__proto__ || Object.getPrototypeOf(PayInvoiceProvider)).apply(this, arguments));
    }

    _createClass(PayInvoiceProvider, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: _store2.default },
                _react2.default.createElement(PayInvoice, null)
            );
        }
    }]);

    return PayInvoiceProvider;
}(_react.Component);

exports.default = PayInvoiceProvider;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/PayInvoice/index.js
// module id = 542
// module chunks = 0