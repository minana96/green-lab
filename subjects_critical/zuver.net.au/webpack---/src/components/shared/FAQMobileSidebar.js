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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FAQMobileSidebar = function (_Component) {
    _inherits(FAQMobileSidebar, _Component);

    function FAQMobileSidebar() {
        _classCallCheck(this, FAQMobileSidebar);

        var _this = _possibleConstructorReturn(this, (FAQMobileSidebar.__proto__ || Object.getPrototypeOf(FAQMobileSidebar)).call(this));

        _this.state = {
            response: undefined,
            subcat_response: undefined,
            selected: ''
        };
        _this.onSelectChange = _this.onSelectChange.bind(_this);
        _this.loadSubCategories = _this.loadSubCategories.bind(_this);
        return _this;
    }

    _createClass(FAQMobileSidebar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'get_parent_categories'
            })).then(function (response) {
                _this2.setState(_extends({}, _this2.state, {
                    response: response
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevprops, prevstate) {
            var _this3 = this;

            var response = this.state.response;
            var loadSubCategories = this.loadSubCategories;

            if (response !== prevstate.response) {
                if (response) {
                    var data = response.data;
                    var parent_categories = data.parent_categories;

                    var currentURL = window.location.href;
                    parent_categories.forEach(function (item) {
                        if (currentURL.indexOf(item.link) !== -1) {
                            _this3.setState(_extends({}, _this3.state, {
                                selected: item.term_id
                            }));
                            loadSubCategories(item.term_id);
                        }
                    });
                }
            }
        }
    }, {
        key: 'loadSubCategories',
        value: function loadSubCategories(term_id) {
            var _this4 = this;

            var _global_var2 = global_var,
                ajax_url = _global_var2.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'get_sub_categories',
                term_id: term_id
            })).then(function (response) {
                _this4.setState(_extends({}, _this4.state, {
                    subcat_response: response,
                    selected: term_id
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'onSelectChange',
        value: function onSelectChange(e) {
            var loadSubCategories = this.loadSubCategories;

            var val = e.currentTarget.value;
            loadSubCategories(val);
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                response = _state.response,
                subcat_response = _state.subcat_response,
                selected = _state.selected;
            var onSelectChange = this.onSelectChange;

            if (response) {
                var data = response.data;
                var parent_categories = data.parent_categories;

                var renderParentCategories = function renderParentCategories() {
                    if (parent_categories && parent_categories.length > 0) {
                        return parent_categories.map(function (item, index) {
                            var term_id = item.term_id,
                                name = item.name;

                            return _react2.default.createElement(
                                'option',
                                { key: index, value: term_id },
                                name
                            );
                        });
                    }
                };
                var renderSubCategories = function renderSubCategories() {
                    if (subcat_response) {
                        var _data = subcat_response.data;
                        var sub_categories = _data.sub_categories;

                        var current_url = window.location.href;
                        //console.log(current_url);
                        var renderSubCatLi = function renderSubCatLi() {
                            return sub_categories.map(function (item, index) {
                                var name = item.name,
                                    link = item.link;

                                return _react2.default.createElement(
                                    'li',
                                    { className: '' + (current_url === link ? ' selected' : ''), key: index },
                                    _react2.default.createElement(
                                        'a',
                                        { href: link },
                                        name
                                    )
                                );
                            });
                        };
                        if (sub_categories && sub_categories.length > 0) {
                            return _react2.default.createElement(
                                'ul',
                                { className: 'FAQMobileSidebar__list' },
                                renderSubCatLi()
                            );
                        }
                    }
                };
                var _global_var3 = global_var,
                    support_page = _global_var3.support_page;

                return _react2.default.createElement(
                    'div',
                    { className: 'FAQMobileSidebar clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'container FAQMobileSidebar__container clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'FAQMobileSidebar__form-wrapper clearfix' },
                            _react2.default.createElement(
                                'form',
                                { className: 'form', method: 'get', action: support_page },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'inner' },
                                    _react2.default.createElement('input', { onFocus: function onFocus(e) {
                                            e.currentTarget.placeholder = "";
                                        }, onBlur: function onBlur(e) {
                                            e.currentTarget.placeholder = "What do you need help with?";
                                        },
                                        placeholder: 'What do you need help with?', name: 'query', type: 'text', className: 'textfield' }),
                                    _react2.default.createElement(
                                        'button',
                                        { type: 'submit', className: 'button' },
                                        _react2.default.createElement('span', { className: 'icon icon-search' })
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'FAQMobileSidebar__top clearfix' },
                            _react2.default.createElement(
                                'select',
                                { value: selected, onChange: onSelectChange, className: 'FAQMobileSidebar__select clearfix' },
                                _react2.default.createElement(
                                    'option',
                                    { value: '' },
                                    'Select a support category'
                                ),
                                renderParentCategories()
                            )
                        ),
                        _react2.default.createElement('div', { className: 'clear' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'FAQMobileSidebar__bottom clearfix' },
                            renderSubCategories()
                        )
                    )
                );
            } else {
                return '';
            }
        }
    }]);

    return FAQMobileSidebar;
}(_react.Component);

exports.default = FAQMobileSidebar;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/FAQMobileSidebar.js
// module id = 117
// module chunks = 0 1 2