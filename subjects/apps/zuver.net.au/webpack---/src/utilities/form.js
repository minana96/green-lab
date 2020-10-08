'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.renderTextarea = exports.renderDropDown = exports.renderField = exports.email = exports.required = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var required = exports.required = function required(value) {
    return value || typeof value === 'number' ? undefined : 'Required';
};
var email = exports.email = function email(value) {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
};

var renderField = exports.renderField = function renderField(_ref) {
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
var renderDropDown = exports.renderDropDown = function renderDropDown(_ref2) {
    var input = _ref2.input,
        options = _ref2.options,
        value = _ref2.value,
        className = _ref2.className,
        _ref2$meta = _ref2.meta,
        touched = _ref2$meta.touched,
        error = _ref2$meta.error,
        warning = _ref2$meta.warning,
        pristine = _ref2$meta.pristine,
        initial = _ref2$meta.initial;

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

var renderTextarea = exports.renderTextarea = function renderTextarea(_ref3) {
    var input = _ref3.input,
        label = _ref3.label,
        className = _ref3.className,
        _ref3$meta = _ref3.meta,
        touched = _ref3$meta.touched,
        error = _ref3$meta.error,
        warning = _ref3$meta.warning;
    return _react2.default.createElement(
        'div',
        { className: 'form__item form__item--textarea clearfix' },
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('textarea', _extends({}, input, { className: className })),
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


//////////////////
// WEBPACK FOOTER
// ./src/utilities/form.js
// module id = 202
// module chunks = 0 1