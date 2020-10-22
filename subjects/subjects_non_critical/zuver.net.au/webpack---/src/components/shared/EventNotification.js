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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventNotification = function (_Component) {
    _inherits(EventNotification, _Component);

    function EventNotification() {
        _classCallCheck(this, EventNotification);

        var _this = _possibleConstructorReturn(this, (EventNotification.__proto__ || Object.getPrototypeOf(EventNotification)).call(this));

        _this.state = {
            notification_enabled: undefined,
            notification_description: undefined,
            promotion_toggle: undefined
        };
        _this.main_content = document.getElementById("main-wrapper");
        if (!_this.main_content) {
            _this.main_content = document.body;
            if (_this.main_content && !_this.main_content.classList.contains('main-wrapper')) {
                _this.main_content.classList.add("main-wrapper");
            }
            if (_this.main_content && !_this.main_content.classList.contains('main-wrapper--custom')) {
                _this.main_content.classList.add("main-wrapper--custom");
            }
        }
        return _this;
    }

    _createClass(EventNotification, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'get_event_notification'
            })).then(function (response) {
                var data = response.data;
                //console.log(response)

                var notification_enabled = data.notification_enabled,
                    notification_description = data.notification_description,
                    promotion_toggle = data.promotion_toggle;

                _this2.setState({
                    notification_enabled: notification_enabled,
                    notification_description: notification_description,
                    promotion_toggle: promotion_toggle
                });
                //console.log(this.getCookie('notification_disabled'))
                if (_this2.getCookie('notification_disabled') || !notification_enabled || promotion_toggle) {
                    if (_this2.main_content && _this2.main_content.classList.contains('main-wrapper--has-notification')) {
                        _this2.main_content.classList.remove("main-wrapper--has-notification");
                    }
                } else {
                    if (_this2.main_content && !_this2.main_content.classList.contains('main-wrapper--has-notification')) {
                        _this2.main_content.classList.add("main-wrapper--has-notification");
                    }
                }
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevstate, prevprops) {
            var _state = this.state,
                notification_enabled = _state.notification_enabled,
                promotion_toggle = _state.promotion_toggle;

            if (prevstate.notification_enabled !== notification_enabled && notification_enabled === false) {
                if (this.main_content && this.main_content.classList.contains('main-wrapper--has-notification')) {
                    this.main_content.classList.remove('main-wrapper--has-notification');
                }
            }
            if (prevstate.promotion_toggle !== promotion_toggle && promotion_toggle === true) {
                if (this.main_content && this.main_content.classList.contains('main-wrapper--has-notification')) {
                    this.main_content.classList.remove('main-wrapper--has-notification');
                }
            }
        }
    }, {
        key: 'setCookie',
        value: function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            var parts = location.hostname.split('.');
            if (parts && parts.length > 2) {
                parts.shift();
            }
            var upperleveldomain = parts.join('.');
            document.cookie = cname + "=" + cvalue + ";domain=." + upperleveldomain + ";path=/";
        }
    }, {
        key: 'getCookie',
        value: function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        /*    deleteCookie(name) {
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }*/

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state2 = this.state,
                notification_enabled = _state2.notification_enabled,
                notification_description = _state2.notification_description,
                promotion_toggle = _state2.promotion_toggle;

            if (notification_enabled !== undefined && notification_description !== undefined && promotion_toggle !== undefined) {
                var cookie = this.getCookie('notification_disabled');
                if (notification_enabled === true && !cookie && promotion_toggle === false) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'EventNotification clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'EventNotification__content clearfix' },
                            (0, _reactRenderHtml2.default)(notification_description)
                        ),
                        _react2.default.createElement(
                            'a',
                            { className: 'EventNotification__close clearfix', onClick: function onClick(e) {
                                    e.preventDefault();
                                    _this3.setState(_extends({}, _this3.state, {
                                        notification_enabled: false
                                    }));
                                    _this3.setCookie('notification_disabled', 'true');
                                    if (_this3.getCookie('notification_disabled')) {
                                        if (_this3.main_content && _this3.main_content.classList.contains('main-wrapper--has-notification')) {
                                            _this3.main_content.classList.remove("main-wrapper--has-notification");
                                        }
                                    }
                                } },
                            _react2.default.createElement('i', { className: 'icon icon-close' })
                        )
                    );
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }
    }]);

    return EventNotification;
}(_react.Component);

exports.default = EventNotification;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/EventNotification.js
// module id = 517
// module chunks = 1