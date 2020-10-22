'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _form = require('../../utilities/form');

var _common = require('../../routes/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form() {
        _classCallCheck(this, Form);

        return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
    }

    _createClass(Form, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                handleSubmit = _props.handleSubmit,
                pristine = _props.pristine,
                valid = _props.valid,
                submitting = _props.submitting;

            var getDepartmentOptions = function getDepartmentOptions() {
                var parent = _this2.props.parent;
                var contact_data = parent.state.contact_data;

                if (contact_data) {
                    var contact_sales = contact_data.contact_sales,
                        contact_customer_care = contact_data.contact_customer_care;

                    return [{
                        label: 'Please Select',
                        value: ''
                    }, {
                        label: 'Sales',
                        value: contact_sales
                    }, {
                        label: 'Customer Care',
                        value: contact_customer_care
                    }];
                } else {
                    return null;
                }
            };
            var departmentOptions = getDepartmentOptions();
            return _react2.default.createElement(
                'form',
                { onSubmit: handleSubmit, className: 'ContactForm__form' },
                _react2.default.createElement(
                    'div',
                    { className: 'form__row clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'form__column clearfix' },
                        _react2.default.createElement(
                            'label',
                            { className: 'form__label clearfix' },
                            'Name'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'name', component: _form.renderField, type: 'text', className: 'form__textfield clearfix', validate: [_form.required] })
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
                            'Email Address'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'email', component: _form.renderField, type: 'email', className: 'form__textfield clearfix', validate: [_form.required, _form.email] })
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
                            'Phone Number'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'phone', component: _form.renderField, type: 'text', className: 'form__textfield clearfix' })
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
                            'Select Department'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'departments', component: _form.renderDropDown, options: departmentOptions, className: 'form__dropdown clearfix', validate: [_form.required] })
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
                            'Message'
                        ),
                        _react2.default.createElement(_reduxForm.Field, { name: 'message', component: _form.renderTextarea, className: 'form__textarea clearfix', validate: [_form.required] })
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
                            'Send us a message'
                        )
                    )
                )
            );
        }
    }]);

    return Form;
}(_react.Component);

Form = (0, _reduxForm.reduxForm)({
    form: 'ContactForm'
})(Form);

var ContactForm = function (_Component2) {
    _inherits(ContactForm, _Component2);

    function ContactForm() {
        _classCallCheck(this, ContactForm);

        var _this3 = _possibleConstructorReturn(this, (ContactForm.__proto__ || Object.getPrototypeOf(ContactForm)).call(this));

        _this3.state = {
            open_popup: false,
            contact_data: undefined,
            sending_status: undefined
        };
        _this3.submitForm = _this3.submitForm.bind(_this3);
        return _this3;
    }

    _createClass(ContactForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;

            var query = window.location.search.substring(1);
            var params = (0, _common.parse_query_string)(query);
            if (params && params.hasOwnProperty('slideto')) {
                var slideto = params.slideto;

                if (slideto === 'app-root--ContactForm') {
                    this.setState({
                        open_popup: true
                    });
                }
            }
            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'get_contact'
            })).then(function (response) {
                var data = response.data;

                _this4.setState(_extends({}, _this4.state, {
                    contact_data: data
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'submitForm',
        value: function submitForm(values) {
            var _this5 = this;

            //console.log(values);
            var _global_var2 = global_var,
                ajax_url = _global_var2.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify(_extends({}, values, {
                action: 'send_contact_enquiry'
            }))).then(function (response) {
                var data = response.data;

                if (data) {
                    var email_status = data.email_status;

                    if (email_status === 'success') {
                        _this5.setState(_extends({}, _this5.state, {
                            sending_status: 'success'
                        }));
                    } else {
                        _this5.setState(_extends({}, _this5.state, {
                            sending_status: 'fail'
                        }));
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var submitForm = this.submitForm;
            var _state = this.state,
                contact_data = _state.contact_data,
                open_popup = _state.open_popup;

            if (contact_data) {
                var contact_heading = contact_data.contact_heading,
                    contact_description = contact_data.contact_description,
                    contact_image = contact_data.contact_image;

                var renderImage = function renderImage() {
                    if (contact_image) {
                        var url = contact_image.url,
                            alt = contact_image.alt;

                        return _react2.default.createElement('img', { className: 'ContactForm__image', src: url, alt: alt });
                    } else {
                        return '';
                    }
                };
                var renderBottom = function renderBottom() {
                    if (open_popup) {
                        return _react2.default.createElement(Form, { parent: _this6, onSubmit: submitForm });
                    } else {
                        return _react2.default.createElement(
                            'a',
                            { onClick: function onClick(e) {
                                    e.preventDefault();
                                    _this6.setState(_extends({}, _this6.state, {
                                        open_popup: true
                                    }));
                                }, className: 'ContactForm__button' },
                            'Send us a message'
                        );
                    }
                };
                var renderContent = function renderContent() {
                    var sending_status = _this6.state.sending_status;

                    if (sending_status === undefined || sending_status === 'fail') {
                        return _react2.default.createElement(
                            'div',
                            { className: 'ContactForm__container container clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'ContactForm__heading clearfix' },
                                contact_heading
                            ),
                            _react2.default.createElement('div', { className: 'clear' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'ContactForm__description clearfix' },
                                (0, _reactRenderHtml2.default)(contact_description)
                            ),
                            _react2.default.createElement('div', { className: 'clear' }),
                            sending_status === 'fail' ? _react2.default.createElement(
                                'div',
                                { className: 'ContactForm__error' },
                                'Failed to send your enquiry. Please contact our support team.'
                            ) : '',
                            renderBottom()
                        );
                    } else {
                        return _react2.default.createElement(
                            'div',
                            { className: 'ContactForm__container container clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'ContactForm__success clearfix' },
                                'Thanks for sending us a message! We will get back to you as soon as we can!'
                            )
                        );
                    }
                };
                return _react2.default.createElement(
                    'div',
                    { className: 'ContactForm clearfix' + (open_popup === true ? ' ContactForm--open' : '') },
                    _react2.default.createElement(
                        'div',
                        { className: 'ContactForm__main clearfix' },
                        _react2.default.createElement('div', { className: 'ContactForm__curve ContactForm__curve--top clearfix' }),
                        _react2.default.createElement('div', { className: 'ContactForm__curve ContactForm__curve--bottom clearfix' }),
                        renderImage(),
                        renderContent()
                    )
                );
            } else {
                return '';
            }
        }
    }]);

    return ContactForm;
}(_react.Component);

var ContactFormProvider = function (_Component3) {
    _inherits(ContactFormProvider, _Component3);

    function ContactFormProvider() {
        _classCallCheck(this, ContactFormProvider);

        return _possibleConstructorReturn(this, (ContactFormProvider.__proto__ || Object.getPrototypeOf(ContactFormProvider)).apply(this, arguments));
    }

    _createClass(ContactFormProvider, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: _store2.default },
                _react2.default.createElement(ContactForm, null)
            );
        }
    }]);

    return ContactFormProvider;
}(_react.Component);

exports.default = ContactFormProvider;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/ContactForm.js
// module id = 199
// module chunks = 0 1