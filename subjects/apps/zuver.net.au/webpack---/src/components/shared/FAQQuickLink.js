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

var FAQQuickLink = function (_Component) {
    _inherits(FAQQuickLink, _Component);

    function FAQQuickLink() {
        _classCallCheck(this, FAQQuickLink);

        var _this = _possibleConstructorReturn(this, (FAQQuickLink.__proto__ || Object.getPrototypeOf(FAQQuickLink)).call(this));

        _this.state = {
            response: undefined,
            is_open: false,
            viewport: undefined
        };
        _this.clickaway = _this.clickaway.bind(_this);
        return _this;
    }

    _createClass(FAQQuickLink, [{
        key: 'computeViewport',
        value: function computeViewport(width) {
            if (width < 768) {
                return 'xs';
            } else if (width > 767 && width < 992) {
                return 'sm';
            } else if (width > 991 && width < 1200) {
                return 'md';
            } else if (width > 1199) {
                return 'lg';
            }
        }
    }, {
        key: 'clickaway',
        value: function clickaway(e) {
            if (this.currentRef && this.currentRef !== e.target && !this.currentRef.contains(e.target)) {
                this.setState(_extends({}, this.state, {
                    is_open: false
                }));
                if (jQuery('.main-wrapper').hasClass('open-FAQQuickLink')) {
                    jQuery('.main-wrapper').removeClass('open-FAQQuickLink');
                }
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;
            var clickaway = this.clickaway;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'get_faq_quick_links'
            })).then(function (response) {
                _this2.setState(_extends({}, _this2.state, {
                    response: response
                }));
            }, function (error) {
                console.log(error);
            });
            document.addEventListener('click', clickaway);
            var computeViewport = this.computeViewport;

            var window_width = window.innerWidth;
            var viewport = computeViewport(window_width);
            this.setState(_extends({}, this.state, {
                viewport: viewport
            }));
            window.addEventListener('resize', function () {
                var window_width = window.innerWidth;
                var viewport = computeViewport(window_width);
                _this2.setState(_extends({}, _this2.state, {
                    viewport: viewport
                }));
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var clickaway = this.clickaway;

            document.removeEventListener('click', clickaway);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                response = _state.response,
                is_open = _state.is_open,
                viewport = _state.viewport;

            var renderListLink = function renderListLink() {
                if (response) {
                    var data = response.data;
                    var faq_quick_links = data.faq_quick_links;

                    var renderList = function renderList() {
                        if (faq_quick_links && faq_quick_links.length > 0) {
                            return faq_quick_links.map(function (item, index) {
                                var icon = item.icon,
                                    heading = item.heading,
                                    description = item.description,
                                    link = item.link;

                                return _react2.default.createElement(
                                    'li',
                                    { key: index, className: 'FAQQuickLink__list-item clearfix' },
                                    _react2.default.createElement(
                                        'a',
                                        { className: 'FAQQuickLink__list-link', href: link, target: '_blank' },
                                        _react2.default.createElement('span', { className: 'FAQQuickLink__icon clearfix icon-' + icon }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'FAQQuickLink__list-wrapper clearfix' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'FAQQuickLink__title' },
                                                heading
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'FAQQuickLink__description' },
                                                description
                                            )
                                        )
                                    )
                                );
                            });
                        }
                    };
                    return _react2.default.createElement(
                        'ul',
                        { className: 'FAQQuickLink__list clearfix' },
                        renderList()
                    );
                } else {
                    return '';
                }
            };
            var renderContactTextIcon = function renderContactTextIcon() {
                if (viewport === 'xs') {
                    if (is_open === true) {
                        return _react2.default.createElement('span', { className: 'icon icon-close help-centre__mobile-links-icon' });
                    } else {
                        return _react2.default.createElement('span', { className: 'icon icon-help help-centre__mobile-links-icon' });
                    }
                } else {
                    return 'Contact';
                }
            };
            return _react2.default.createElement(
                'div',
                { className: 'FAQQuickLink clearfix', ref: function ref(el) {
                        _this3.currentRef = el;
                    } },
                _react2.default.createElement(
                    'a',
                    { className: 'FAQQuickLink__main-anchor clearfix', onClick: function onClick(e) {
                            e.preventDefault();
                            if (is_open === false) {
                                _this3.setState(_extends({}, _this3.state, {
                                    is_open: true
                                }));
                                if (!jQuery('.main-wrapper').hasClass('open-FAQQuickLink')) {
                                    jQuery('.main-wrapper').addClass('open-FAQQuickLink');
                                }
                            } else {
                                _this3.setState(_extends({}, _this3.state, {
                                    is_open: false
                                }));
                                if (jQuery('.main-wrapper').hasClass('open-FAQQuickLink')) {
                                    jQuery('.main-wrapper').removeClass('open-FAQQuickLink');
                                }
                            }
                        } },
                    renderContactTextIcon()
                ),
                is_open ? _react2.default.createElement(
                    'div',
                    { className: 'FAQQuickLink__container clearfix' },
                    _react2.default.createElement('div', { className: 'clear' }),
                    renderListLink()
                ) : ''
            );
        }
    }]);

    return FAQQuickLink;
}(_react.Component);

exports.default = FAQQuickLink;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/FAQQuickLink.js
// module id = 118
// module chunks = 0 1 2