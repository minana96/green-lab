'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//vallidation
var required = function required(value) {
    return value || typeof value === 'number' ? undefined : 'Required';
};
var renderField = function renderField(_ref) {
    var input = _ref.input,
        label = _ref.label,
        type = _ref.type,
        className = _ref.className,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        warning = _ref$meta.warning;
    return _react2.default.createElement(
        'div',
        { className: 'form__item form__item--textfield clearfix' },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', _extends({}, input, { type: type, className: className })),
            touched && (error && _react2.default.createElement(
                'span',
                { className: 'error' },
                error
            ) || warning && _react2.default.createElement(
                'span',
                { className: 'warning' },
                warning
            ))
        )
    );
};
var renderCheckbox = function renderCheckbox(_ref2) {
    var input = _ref2.input,
        className = _ref2.className,
        text = _ref2.text,
        meta = _ref2.meta;
    var touched = meta.touched,
        error = meta.error,
        warning = meta.warning,
        dispatch = meta.dispatch,
        form = meta.form;
    var checked = input.checked,
        name = input.name;

    return _react2.default.createElement(
        'div',
        { className: 'form__item form__item--checkbox clearfix' },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', _extends({}, input, { type: 'checkbox', className: className })),
            _react2.default.createElement(
                'div',
                { className: 'form__checkbox-text', onClick: function onClick() {
                        if (checked) {
                            dispatch((0, _reduxForm.change)(form, name, false));
                        } else {
                            dispatch((0, _reduxForm.change)(form, name, true));
                        }
                    } },
                text ? (0, _reactRenderHtml2.default)(text) : ''
            ),
            touched && (error && _react2.default.createElement(
                'span',
                { className: 'error' },
                error
            ) || warning && _react2.default.createElement(
                'span',
                { className: 'warning' },
                warning
            ))
        )
    );
};

var renderDropDown = function renderDropDown(_ref3) {
    var input = _ref3.input,
        options = _ref3.options,
        value = _ref3.value,
        className = _ref3.className,
        _ref3$meta = _ref3.meta,
        touched = _ref3$meta.touched,
        error = _ref3$meta.error,
        warning = _ref3$meta.warning,
        pristine = _ref3$meta.pristine,
        initial = _ref3$meta.initial;

    var renderOptions = function renderOptions() {
        if (options && options.length > 0) {
            return options.map(function (item, index) {
                return _react2.default.createElement(
                    'option',
                    { key: index, value: item.value },
                    item.label
                );
            });
        }
    };
    return _react2.default.createElement(
        'div',
        { className: 'form__item form__item--dropdown clearfix' },
        _react2.default.createElement(
            'div',
            { className: 'dropdown__inner clearfix' },
            _react2.default.createElement(
                'select',
                _extends({ className: className }, input),
                renderOptions()
            ),
            touched && (error && _react2.default.createElement(
                'span',
                { className: 'error' },
                error
            ) || warning && _react2.default.createElement(
                'span',
                { className: 'warning' },
                warning
            ))
        )
    );
};

var StepTwoForm = function (_Component) {
    _inherits(StepTwoForm, _Component);

    function StepTwoForm() {
        _classCallCheck(this, StepTwoForm);

        return _possibleConstructorReturn(this, (StepTwoForm.__proto__ || Object.getPrototypeOf(StepTwoForm)).apply(this, arguments));
    }

    _createClass(StepTwoForm, [{
        key: 'computeYearOptions',
        value: function computeYearOptions() {
            var currentTime = new Date();
            var currYear = currentTime.getFullYear();
            var date_range = [];
            date_range.push({
                label: 'Select Year',
                value: ''
            });
            for (var i = 0; i <= 30; i++) {
                var option = {
                    label: currYear,
                    value: currYear
                };
                date_range.push(option);
                currYear++;
            }
            return date_range;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                handleSubmit = _props.handleSubmit,
                pristine = _props.pristine,
                valid = _props.valid,
                submitting = _props.submitting;
            var computeYearOptions = this.computeYearOptions;

            var yearOptions = computeYearOptions();
            return _react2.default.createElement(
                'form',
                { className: 'StepTwo__form clearfix', onSubmit: handleSubmit },
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Select Card'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'cctype', component: renderDropDown, options: [{
                                label: 'Select Card',
                                value: ''
                            }, {
                                label: 'Master Card',
                                value: 'MasterCard'
                            }, {
                                label: 'Visa',
                                value: 'Visa'
                            }, {
                                label: 'Amex',
                                value: 'Amex'
                            }], className: 'form__dropdown clearfix', validate: [required] })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Card Number'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'ccnumber', component: renderField, type: 'text',
                            className: 'form__textfield clearfix', validate: [required] })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form__row form__row--half clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column form__column--half clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Expiry Month'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'ccmonth', component: renderDropDown, options: [{
                                label: 'Select Month',
                                value: ''
                            }, {
                                label: 'JAN',
                                value: '01'
                            }, {
                                label: 'FEB',
                                value: '02'
                            }, {
                                label: 'MAR',
                                value: '03'
                            }, {
                                label: 'APR',
                                value: '04'
                            }, {
                                label: 'MAY',
                                value: '05'
                            }, {
                                label: 'JUN',
                                value: '06'
                            }, {
                                label: 'JUL',
                                value: '07'
                            }, {
                                label: 'AUG',
                                value: '08'
                            }, {
                                label: 'SEP',
                                value: '09'
                            }, {
                                label: 'OCT',
                                value: '10'
                            }, {
                                label: 'NOV',
                                value: '11'
                            }, {
                                label: 'DEC',
                                value: '12'
                            }], className: 'form__dropdown clearfix', validate: [required] })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column form__column--half clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Expiry Year'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'ccyear', component: renderDropDown, options: yearOptions,
                            className: 'form__dropdown clearfix', validate: [required] })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'CVV/CVV2'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'ccdigits', component: renderField, type: 'text',
                            className: 'form__textfield clearfix', validate: [required] })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(_reduxForm.Field, {
                            name: 'termsagreement',
                            component: renderCheckbox,
                            className: 'form__checkbox',
                            type: 'checkbox',
                            validate: [required],
                            text: 'I have read and understand the <a href="/company/terms-and-policies/" target="_blank">Documentation</a>'
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'button',
                            { disabled: submitting || pristine || !valid ? true : false,
                                className: 'form__button' + (submitting || pristine || !valid ? ' form__button--disabled' : ''),
                                type: 'submit' },
                            'Pay Invoice'
                        )
                    )
                )
            );
        }
    }]);

    return StepTwoForm;
}(_react.Component);

StepTwoForm = (0, _reduxForm.reduxForm)({
    form: 'StepTwoForm'
})(StepTwoForm);

var StepTwo = function (_Component2) {
    _inherits(StepTwo, _Component2);

    function StepTwo(props) {
        _classCallCheck(this, StepTwo);

        var _this2 = _possibleConstructorReturn(this, (StepTwo.__proto__ || Object.getPrototypeOf(StepTwo)).call(this, props));

        _this2.state = {
            method: 'cc',
            error: undefined,
            isloading: false
        };
        _this2.subbmitform = _this2.subbmitform.bind(_this2);
        return _this2;
    }

    _createClass(StepTwo, [{
        key: 'subbmitform',
        value: function subbmitform(values) {
            var _this3 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;
            var parent = this.props.parent;
            var invoiceData = parent.state.invoiceData;

            if (invoiceData) {
                var invoice = invoiceData.invoice,
                    client = invoiceData.client;
                var postcode = client.postcode;

                this.setState(_extends({}, this.state, {
                    isloading: true
                }));
                _axios2.default.post(ajax_url, _qs2.default.stringify(_extends({}, values, {
                    invoice: invoice,
                    postcode: postcode,
                    action: 'pay_invoice'
                }))).then(function (response) {
                    var data = response.data;
                    var status = data.status;

                    if (status === 'success') {
                        _this3.setState(_extends({}, _this3.state, {
                            isloading: false
                        }));
                        //const {ordering_site} = global_var;
                        parent.setState(_extends({}, parent.state, {
                            step: 3
                        }));

                        //window.location.href = ordering_site+'/completed';
                    } else {
                        _this3.setState(_extends({}, _this3.state, {
                            error: data,
                            isloading: false
                        }));
                    }
                }, function (error) {
                    _this3.setState(_extends({}, _this3.state, {
                        error: error
                    }));
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var parent = this.props.parent;
            var invoiceData = parent.state.invoiceData;
            var invoice = invoiceData.invoice,
                amount = invoiceData.amount;
            var _state = this.state,
                method = _state.method,
                error = _state.error,
                isloading = _state.isloading;

            var renderError = function renderError() {
                if (error) {
                    var message = error.message;

                    return _react2.default.createElement(
                        'div',
                        { className: 'StepTwo__error' },
                        message
                    );
                }
            };
            var renderLoading = function renderLoading() {
                if (isloading && global_var) {
                    var _global_var2 = global_var,
                        theme_url = _global_var2.theme_url;

                    if (theme_url) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'PayInvoice__loading-wrapper clearfix' },
                            _react2.default.createElement('img', { src: theme_url + '/images/zloader.gif', className: 'PayInvoice__loading' })
                        );
                    }
                }
                return _react2.default.createElement(_react.Fragment, null);
            };
            var renderBottom = function renderBottom() {
                if (method === 'cc') {
                    var subbmitform = _this4.subbmitform;

                    return _react2.default.createElement(StepTwoForm, { onSubmit: subbmitform });
                } else if (method === 'paypal') {
                    return _react2.default.createElement(
                        'form',
                        { action: 'https://www.paypal.com/cgi-bin/webscr', method: 'post', target: '_blank' },
                        _react2.default.createElement('input', { type: 'hidden', name: 'cmd', value: '_xclick' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'business', value: 'int-billing@zuver.net.au' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'item_name', value: 'Zuver - Invoice # ' + invoice }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'amount', value: '' + amount }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'custom', value: '' + invoice }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'no_shipping', value: '1' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'no_note', value: '1' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'currency_code', value: 'AUD' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'lc', value: 'AU' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'bn', value: 'PP-BuyNowBF' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'rm', value: '2' }),
                        _react2.default.createElement('input', { type: 'submit', value: 'Pay Invoice', name: 'submit',
                            title: 'PayPal - The safer, easier way to pay online!', className: 'paypal_btn' }),
                        _react2.default.createElement('img', { alt: '', border: '0', src: 'https://www.paypal.com/en_AU/i/scr/pixel.gif', width: '1', height: '1' })
                    );
                }
            };
            if (invoiceData) {
                var _invoice = invoiceData.invoice,
                    _amount = invoiceData.amount;

                return _react2.default.createElement(
                    'div',
                    { className: 'PayInvoice__StepTwo clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'StepTwo__top clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'top__left clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'text' },
                                ' You\'re paying Invoice ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    '#',
                                    _invoice
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'top__right clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'text' },
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'Total Due:'
                                ),
                                ' $',
                                _amount
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'StepTwo__bottom clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__payment-method clearfix' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'payment-method__list clearfix' },
                                _react2.default.createElement(
                                    'li',
                                    { className: 'payment-method__item clearfix' + (method === 'cc' ? ' payment-method__item--active' : '') },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'item__anchor', onClick: function onClick(e) {
                                                e.preventDefault();
                                                _this4.setState({
                                                    method: 'cc'
                                                });
                                            } },
                                        _react2.default.createElement('div', { className: 'item__bullet' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item__name' },
                                            'Credit Card'
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'li',
                                    { className: 'payment-method__item clearfix' + (method === 'paypal' ? ' payment-method__item--active' : '') },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'item__anchor', onClick: function onClick(e) {
                                                e.preventDefault();
                                                _this4.setState({
                                                    method: 'paypal'
                                                });
                                            } },
                                        _react2.default.createElement('div', { className: 'item__bullet' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item__name' },
                                            'PayPal'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('div', { className: 'clear' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__form' },
                            renderError(),
                            renderBottom()
                        )
                    ),
                    renderLoading()
                );
            } else {
                return _react2.default.createElement(_react.Fragment, null);
            }
        }
    }]);

    return StepTwo;
}(_react.Component);

exports.default = StepTwo;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/PayInvoice/StepTwo.js
// module id = 541
// module chunks = 0