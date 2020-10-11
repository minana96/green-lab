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

var _common = require('../../routes/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainNavigationColumn = function (_Component) {
    _inherits(MainNavigationColumn, _Component);

    function MainNavigationColumn(props) {
        _classCallCheck(this, MainNavigationColumn);

        var _this = _possibleConstructorReturn(this, (MainNavigationColumn.__proto__ || Object.getPrototypeOf(MainNavigationColumn)).call(this, props));

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(MainNavigationColumn, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                id = _props.id,
                heading = _props.heading,
                menus = _props.menus,
                renderList = _props.renderList;
            var isOpen = this.state.isOpen;

            return _react2.default.createElement(
                'div',
                { className: 'bottom__column bottom__column--column' + id + (isOpen ? ' bottom__column--open' : '') + ' clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'column__heading', onClick: function onClick() {
                            if (isOpen) {
                                _this2.setState(_extends({}, _this2.state, {
                                    isOpen: false
                                }));
                            } else {
                                _this2.setState(_extends({}, _this2.state, {
                                    isOpen: true
                                }));
                            }
                        } },
                    heading
                ),
                _react2.default.createElement('div', { className: 'clear' }),
                _react2.default.createElement(
                    'ul',
                    { className: 'column__menu clearfix' },
                    renderList(menus)
                )
            );
        }
    }]);

    return MainNavigationColumn;
}(_react.Component);

var MainNavigation = function (_Component2) {
    _inherits(MainNavigation, _Component2);

    function MainNavigation(props) {
        _classCallCheck(this, MainNavigation);

        var _this3 = _possibleConstructorReturn(this, (MainNavigation.__proto__ || Object.getPrototypeOf(MainNavigation)).call(this, props));

        _this3.state = {
            // isOpen : false,
            data: undefined,
            open: false,
            fadeOut: undefined
        };
        _this3.handleEscape = _this3.handleEscape.bind(_this3);
        return _this3;
    }

    _createClass(MainNavigation, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this4 = this;

            if (global_var) {
                var _global_var = global_var,
                    ajax_url = _global_var.ajax_url;

                _axios2.default.post(ajax_url, _qs2.default.stringify({
                    action: "get_main_navigation"
                })).then(function (response) {
                    var data = response.data;

                    _this4.setState(_extends({}, _this4.state, {
                        data: data
                    }));
                }, function (error) {
                    console.log(error);
                });
            }
            document.addEventListener("keydown", this.handleEscape, false);
        }
    }, {
        key: 'renderList',
        value: function renderList(data) {
            if (data && data.length > 0) {
                return data.map(function (item, index) {
                    var menu_label = item.menu_label,
                        menu_external_link = item.menu_external_link,
                        menu_type = item.menu_type,
                        menu_internal_link = item.menu_internal_link;

                    if (menu_type === 'internal') {
                        return _react2.default.createElement(
                            'li',
                            { key: index },
                            _react2.default.createElement(
                                'a',
                                { href: menu_type === "internal" && menu_internal_link ? menu_internal_link : '' },
                                menu_label
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            'li',
                            { key: index },
                            _react2.default.createElement(
                                'a',
                                { target: '_blank', href: menu_type === "external" && menu_external_link ? menu_external_link : '' },
                                menu_label
                            )
                        );
                    }
                });
            }
        }
    }, {
        key: 'closeMainNavigation',
        value: function closeMainNavigation(e) {
            var _this5 = this;

            this.setState(_extends({}, this.state, {
                fadeOut: true
            }));
            window.setTimeout(function () {
                _this5.setState(_extends({}, _this5.state, {
                    open: false,
                    fadeOut: undefined
                }));
            }, 500);
        }
    }, {
        key: 'handleEscape',
        value: function handleEscape(e) {
            var _this6 = this;

            if (e.keyCode === 27) {
                this.setState(_extends({}, this.state, {
                    fadeOut: true
                }));
                window.setTimeout(function () {
                    _this6.setState(_extends({}, _this6.state, {
                        open: false,
                        fadeOut: undefined
                    }));
                }, 500);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var _state = this.state,
                data = _state.data,
                open = _state.open,
                fadeOut = _state.fadeOut;
            var renderList = this.renderList;

            var sharedAcrossCookie = (0, _common.getCookie)('shared_across');
            var sharedAccross = {};
            if (sharedAcrossCookie) {
                sharedAccross = JSON.parse(sharedAcrossCookie) || {};
            }
            var _sharedAccross = sharedAccross,
                total_cart_items = _sharedAccross.total_cart_items,
                loggedin = _sharedAccross.loggedin;


            if (data && global_var) {
                var _global_var2 = global_var,
                    ordering_site = _global_var2.ordering_site;
                var header_column_1_heading = data.header_column_1_heading,
                    header_column_2_heading = data.header_column_2_heading,
                    header_column_3_heading = data.header_column_3_heading,
                    header_column_1_menus = data.header_column_1_menus,
                    header_column_2_menus = data.header_column_2_menus,
                    header_column_3_menus = data.header_column_3_menus,
                    main_account_page = data.main_account_page,
                    main_logo = data.main_logo;


                return _react2.default.createElement(
                    'nav',
                    { onKeyPress: this.handleEscape, className: 'MainNavigation clearfix' + (fadeOut === true ? ' MainNavigation--fadeout' : '') },
                    open ? _react2.default.createElement('div', { onClick: function onClick() {
                            _this7.setState(_extends({}, _this7.state, {
                                fadeOut: true
                            }));
                            window.setTimeout(function () {
                                _this7.setState(_extends({}, _this7.state, {
                                    open: false,
                                    fadeOut: undefined
                                }));
                            }, 500);
                        }, className: 'MainNavigation__backdrop backdrop clearfix' }) : '',
                    _react2.default.createElement(
                        'a',
                        { className: 'MainNavigation__burger-toggle', onClick: function onClick(e) {
                                e.preventDefault();
                                _this7.setState(_extends({}, _this7.state, {
                                    open: true
                                }));
                            } },
                        _react2.default.createElement('div', { className: 'icon icon-hamburger' })
                    ),
                    open ? _react2.default.createElement(
                        'div',
                        { className: 'MainNavigation__content clearfix' },
                        _react2.default.createElement('div', { className: 'MainNavigation__curve clearfix MainNavigation__curve--bottom' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'content__top clearfix' },
                            _react2.default.createElement(
                                'a',
                                { className: 'top__logo', href: '/' },
                                _react2.default.createElement('img', { className: 'MainNavigation__logo', src: main_logo.url, alt: main_logo.alt })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'container MainNavigation__container MainNavigation__container--top clearfix' },
                                _react2.default.createElement(
                                    'form',
                                    { className: 'MainNavigation__form clearfix', method: 'get', action: ordering_site + '/cart.php' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'form__wrapper clearfix' },
                                        _react2.default.createElement('input', { name: 'a', type: 'hidden', value: 'add' }),
                                        _react2.default.createElement('input', { name: 'domain', type: 'hidden', value: 'register' }),
                                        _react2.default.createElement('input', { name: 'query', placeholder: 'Looking for a domain name?', type: 'text', className: 'textfield',
                                            onFocus: function onFocus(e) {
                                                e.currentTarget.placeholder = "";
                                            }, onBlur: function onBlur(e) {
                                                e.currentTarget.placeholder = "Looking for a domain name?";
                                            } }),
                                        _react2.default.createElement(
                                            'button',
                                            { className: 'button' },
                                            _react2.default.createElement('span', { className: 'icon icon-search' })
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'MainNavigation__close', onClick: function onClick(e) {
                                        e.preventDefault();
                                        _this7.setState(_extends({}, _this7.state, {
                                            fadeOut: true
                                        }));
                                        window.setTimeout(function () {
                                            _this7.setState(_extends({}, _this7.state, {
                                                open: false,
                                                fadeOut: undefined
                                            }));
                                        }, 500);
                                    } },
                                _react2.default.createElement('span', { className: 'icon icon-menu-close' })
                            )
                        ),
                        _react2.default.createElement('div', { className: 'clear' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'content__bottom clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'container MainNavigation__container MainNavigation__container--bottom clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'bottom__row bottom__row--ipad-row  clearfix' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'bottom__column clearfix' },
                                        _react2.default.createElement(
                                            'form',
                                            { className: 'MainNavigation__form clearfix' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'form__wrapper clearfix' },
                                                _react2.default.createElement('input', { onFocus: function onFocus(e) {
                                                        e.currentTarget.placeholder = "";
                                                    }, onBlur: function onBlur(e) {
                                                        e.currentTarget.placeholder = "Looking for a domain name?";
                                                    },
                                                    placeholder: 'Looking for a domain name?', type: 'text', className: 'textfield' }),
                                                _react2.default.createElement(
                                                    'button',
                                                    { className: 'button' },
                                                    _react2.default.createElement('span', { className: 'icon icon-search' })
                                                )
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'bottom__row clearfix' },
                                    _react2.default.createElement(MainNavigationColumn, { id: 1, heading: header_column_1_heading, menus: header_column_1_menus, renderList: renderList }),
                                    _react2.default.createElement(MainNavigationColumn, { id: 2, heading: header_column_2_heading, menus: header_column_2_menus, renderList: renderList }),
                                    _react2.default.createElement(MainNavigationColumn, { id: 3, heading: header_column_3_heading, menus: header_column_3_menus, renderList: renderList }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'bottom__column bottom__column--column4  clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'column__cta clearfix' },
                                            _react2.default.createElement(
                                                'a',
                                                { href: '/wordpress-hosting/?slideto=product', className: 'column__button column__button--getstarted', onClick: this.closeMainNavigation.bind(this) },
                                                'Get Started'
                                            ),
                                            _react2.default.createElement('div', { className: 'clear' }),
                                            _react2.default.createElement(
                                                'a',
                                                { href: main_account_page, className: 'column__button column__button--login' },
                                                loggedin && parseInt(loggedin) > 0 ? 'MyZuver' : 'Log In'
                                            )
                                        ),
                                        _react2.default.createElement('div', { className: 'clear clear--checkout-link' }),
                                        total_cart_items && parseInt(total_cart_items) > 0 ? _react2.default.createElement(
                                            'a',
                                            { href: ordering_site + '/cart.php?a=checkout', className: 'MainNavigation__checkout-button' },
                                            _react2.default.createElement('span', { className: 'icon icon-cart-icon' }),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'text' },
                                                'Go To Checkout'
                                            )
                                        ) : ''
                                    )
                                )
                            )
                        )
                    ) : ''
                );
            } else {
                return _react2.default.createElement(
                    'nav',
                    { className: 'MainNavigation clearfix' },
                    _react2.default.createElement(
                        'a',
                        { className: 'MainNavigation__burger-toggle' },
                        _react2.default.createElement('div', { className: 'icon icon-hamburger' })
                    )
                );
            }
        }
    }]);

    return MainNavigation;
}(_react.Component);

exports.default = MainNavigation;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/MainNavigation.js
// module id = 518
// module chunks = 1