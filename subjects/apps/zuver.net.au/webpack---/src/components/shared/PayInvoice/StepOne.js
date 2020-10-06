'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

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
        { className: 'form__textfield-wrapper' },
        _react2.default.createElement(
            'label',
            null,
            label
        ),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('input', _extends({}, input, { placeholder: label, type: type, className: className })),
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

var StepOneForm = function (_Component) {
    _inherits(StepOneForm, _Component);

    function StepOneForm() {
        _classCallCheck(this, StepOneForm);

        return _possibleConstructorReturn(this, (StepOneForm.__proto__ || Object.getPrototypeOf(StepOneForm)).apply(this, arguments));
    }

    _createClass(StepOneForm, [{
        key: 'getAllUrlParams',
        value: function getAllUrlParams(url) {

            // get query string from url (optional) or window
            var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

            // we'll store the parameters here
            var obj = {};

            // if query string exists
            if (queryString) {

                // stuff after # is not part of query string, so get rid of it
                queryString = queryString.split('#')[0];

                // split our query string into its component parts
                var arr = queryString.split('&');

                for (var i = 0; i < arr.length; i++) {
                    // separate the keys and the values
                    var a = arr[i].split('=');

                    // set parameter name and value (use 'true' if empty)
                    var paramName = a[0];
                    var paramValue = typeof a[1] === 'undefined' ? true : a[1];

                    // (optional) keep case consistent
                    paramName = paramName.toLowerCase();
                    if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

                    // if the paramName ends with square brackets, e.g. colors[] or colors[2]
                    if (paramName.match(/\[(\d+)?\]$/)) {

                        // create key if it doesn't exist
                        var key = paramName.replace(/\[(\d+)?\]/, '');
                        if (!obj[key]) obj[key] = [];

                        // if it's an indexed array e.g. colors[2]
                        if (paramName.match(/\[\d+\]$/)) {
                            // get the index value and add the entry at the appropriate position
                            var index = /\[(\d+)\]/.exec(paramName)[1];
                            obj[key][index] = paramValue;
                        } else {
                            // otherwise add the value to the end of the array
                            obj[key].push(paramValue);
                        }
                    } else {
                        // we're dealing with a string
                        if (!obj[paramName]) {
                            // if it doesn't exist, create property
                            obj[paramName] = paramValue;
                        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                            // if property does exist and it's a string, convert it to an array
                            obj[paramName] = [obj[paramName]];
                            obj[paramName].push(paramValue);
                        } else {
                            // otherwise add the property
                            obj[paramName].push(paramValue);
                        }
                    }
                }
            }

            return obj;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                dispatch = _props.dispatch,
                form = _props.form;

            var params = this.getAllUrlParams(window.location.href);
            if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length > 0) {
                var invoice = params.invoice,
                    postcode = params.postcode;

                if (invoice && postcode) {
                    dispatch((0, _reduxForm.change)(form, 'invoice', invoice));
                    dispatch((0, _reduxForm.change)(form, 'postcode', postcode));
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                handleSubmit = _props2.handleSubmit,
                pristine = _props2.pristine,
                valid = _props2.valid,
                submitting = _props2.submitting;

            return _react2.default.createElement(
                'form',
                { className: 'StepOne__form clearfix', onSubmit: handleSubmit },
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Invoice Number'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'invoice', component: renderField, type: 'text', className: 'form__textfield clearfix', validate: [required] })
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
                            'Account Postcode'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'postcode', component: renderField, type: 'text', className: 'form__textfield clearfix', validate: [required] })
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
                            { type: 'submit', disabled: pristine || submitting || !valid, className: 'form__button clearfix' + (pristine || submitting || !valid ? ' form__button--disabled' : '') },
                            'Continue'
                        )
                    )
                )
            );
        }
    }]);

    return StepOneForm;
}(_react.Component);

StepOneForm = (0, _reduxForm.reduxForm)({
    form: 'StepOneForm'
})(StepOneForm);

var ErrorMessage = function ErrorMessage(props) {
    var error = props.error;

    if (error) {
        var message = error.message,
            status = error.status;

        if (status === "fail") {
            if (message) {
                return _react2.default.createElement(
                    'div',
                    { className: 'StepOne__ErrorMessage clearfix' },
                    message
                );
            }
        }
        return _react2.default.createElement(
            'div',
            { className: 'StepOne__ErrorMessage clearfix' },
            'We can\'t find your invoice. Please contact our support team'
        );
    } else {
        return '';
    }
};

var StepOne = function (_Component2) {
    _inherits(StepOne, _Component2);

    function StepOne(props) {
        _classCallCheck(this, StepOne);

        var _this2 = _possibleConstructorReturn(this, (StepOne.__proto__ || Object.getPrototypeOf(StepOne)).call(this, props));

        _this2.submitform = _this2.submitform.bind(_this2);
        _this2.state = {
            error: undefined,
            loading: false
        };
        return _this2;
    }

    _createClass(StepOne, [{
        key: 'submitform',
        value: function submitform(values) {
            var _this3 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;

            var payload = _extends({
                action: 'check_invoice'
            }, values);
            var parent = this.props.parent;

            this.setState(_extends({}, this.state, {
                loading: true
            }));
            _axios2.default.post(ajax_url, _qs2.default.stringify(payload)).then(function (response) {
                //console.log(response);
                var data = response.data;
                var status = data.status;

                if (status === 'success') {
                    parent.setState(_extends({}, parent.state, {
                        step: 2,
                        invoiceData: data
                    }));
                } else {
                    _this3.setState(_extends({}, _this3.state, {
                        error: data,
                        loading: false
                    }));
                }
            }, function (error) {
                _this3.setState(_extends({}, _this3.state, {
                    loading: false,
                    error: error
                }));
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var submitform = this.submitform;
            var _state = this.state,
                error = _state.error,
                loading = _state.loading;

            return _react2.default.createElement(
                'div',
                { className: 'PayInvoice__StepOne clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'StepOne__top clearfix' },
                    _react2.default.createElement(ErrorMessage, { error: error })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'StepOne__bottom clearfix' },
                    _react2.default.createElement(StepOneForm, { onSubmit: submitform })
                ),
                loading ? _react2.default.createElement(_Loading2.default, null) : ''
            );
        }
    }]);

    return StepOne;
}(_react.Component);

exports.default = StepOne;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/PayInvoice/StepOne.js
// module id = 540
// module chunks = 0