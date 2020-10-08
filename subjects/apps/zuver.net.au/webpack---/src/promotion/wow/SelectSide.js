'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//console.log(background);

var Timer = function (_Component) {
    _inherits(Timer, _Component);

    function Timer() {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

        _this.getPromotionStartedDate = _this.getPromotionStartedDate.bind(_this);
        _this.state = {
            promotionStartDate: undefined,
            currentDate: undefined,
            differ: undefined
        };
        return _this;
    }

    _createClass(Timer, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timerInterval) {
                window.clearInterval(this.timerInterval);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                current_UTC = _global_var.current_UTC;
            var date = current_UTC.date;

            var promotionStartDate = this.getPromotionStartedDate();
            var currentDate = _momentTimezone2.default.tz(date, "Australia/Sydney");
            var differ = promotionStartDate.diff(currentDate);
            this.setState({
                promotionStartDate: promotionStartDate,
                currentDate: currentDate,
                differ: differ
            });
            if (this.timerInterval) {
                window.clearInterval(this.timerInterval);
            }
            this.timerInterval = window.setInterval(function () {
                var _state = _this2.state,
                    currentDate = _state.currentDate,
                    promotionStartDate = _state.promotionStartDate;

                var newDate = currentDate.add(1, 'seconds');
                var differ = promotionStartDate.diff(currentDate);
                _this2.setState(_extends({}, _this2.state, {
                    currentDate: (0, _momentTimezone2.default)(newDate),
                    differ: differ
                }));
            }, 1000);
        }
    }, {
        key: 'getPromotionStartedDate',
        value: function getPromotionStartedDate() {
            var getPageDataData = this.props.getPageDataData;
            var start_time = getPageDataData.start_time;

            return _momentTimezone2.default.tz(start_time || "2019-04-01 12:00", "Australia/Sydney");
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _state2 = this.state,
                currentDate = _state2.currentDate,
                differ = _state2.differ;

            if (prevState.currentDate !== currentDate) {
                if (differ < 0) {
                    var parent = this.props.parent;

                    parent.setState(_extends({}, parent.state, {
                        promotionStarted: true
                    }));
                }
            }
        }
    }, {
        key: 'pad',
        value: function pad(num) {
            var s = num + "";
            while (s.length < 2) {
                s = "0" + s;
            }return s;
        }
    }, {
        key: 'render',
        value: function render() {
            var differ = this.state.differ;
            var pad = this.pad;

            var duration = _momentTimezone2.default.duration(differ);
            var hours = pad(duration.get("hours"));
            var mins = pad(duration.get("minutes"));
            var seconds = pad(duration.get("seconds"));
            var days = pad(duration.get("days"));
            var isDayNeeded = function isDayNeeded() {
                if (duration.get("days") && duration.get("days") > 0) {
                    return true;
                } else {
                    return false;
                }
            };
            if (differ && differ > 0) {
                return _react2.default.createElement(
                    'div',
                    { className: 'wow-timer clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wow-timer__heading' },
                        'The game starts in...'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'wow-timer__countdown' },
                        isDayNeeded() ? _react2.default.createElement(
                            'div',
                            { className: 'wow-timer__digits' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__number' },
                                days
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__text' },
                                'Days'
                            )
                        ) : '',
                        _react2.default.createElement(
                            'div',
                            { className: 'wow-timer__digits' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__number' },
                                hours
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__text' },
                                'Hours'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wow-timer__digits' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__number' },
                                mins
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__text' },
                                'Minutes'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wow-timer__digits' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__number' },
                                seconds
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-timer__text' },
                                'Seconds'
                            )
                        )
                    )
                );
            } else {
                return '';
            }
        }
    }]);

    return Timer;
}(_react.Component);

var SelectSide = function (_Component2) {
    _inherits(SelectSide, _Component2);

    function SelectSide() {
        _classCallCheck(this, SelectSide);

        return _possibleConstructorReturn(this, (SelectSide.__proto__ || Object.getPrototypeOf(SelectSide)).apply(this, arguments));
    }

    _createClass(SelectSide, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var parent = this.props.parent;
            var _parent$state = parent.state,
                getPageDataStatus = _parent$state.getPageDataStatus,
                getPageDataData = _parent$state.getPageDataData,
                promotionStarted = _parent$state.promotionStarted,
                selectedCharacter = _parent$state.selectedCharacter;

            if (getPageDataStatus === 'success') {
                var choose_side_heading = getPageDataData.choose_side_heading,
                    choose_side_description = getPageDataData.choose_side_description,
                    choose_side_options = getPageDataData.choose_side_options;

                var renderCharacters = function renderCharacters() {
                    if (choose_side_options && choose_side_options.length > 0) {
                        return choose_side_options.map(function (item, index) {
                            var title = item.title,
                                character_background_image = item.character_background_image,
                                button_label = item.button_label,
                                character_image = item.character_image,
                                description = item.description;

                            return _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        if (promotionStarted) {
                                            e.preventDefault();
                                            parent.setState(_extends({}, parent.state, {
                                                selectedCharacter: index
                                            }));
                                            if (_this4.timeout) {
                                                window.clearTimeout(_this4.timeout);
                                            }
                                            _this4.timeout = window.setTimeout(function () {
                                                jQuery("html, body").animate({ scrollTop: jQuery("#wow-quest").position().top }, 1000);
                                            }, 300);
                                        }
                                    }, key: index, className: 'wow-character-select clearfix' + (index === selectedCharacter ? ' selected' : '') + (promotionStarted === false ? ' wow-character-select--not-started' : '') },
                                _react2.default.createElement('div', { className: 'wow-character-select__background', style: { backgroundImage: 'url(' + character_background_image.url + ')' } }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wow-character-select__details clearfix' + (promotionStarted ? ' wow-character-select__details--started' : '') },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wow-character-select__details-heading clearfix' },
                                        title
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wow-character-select__details-description clearfix' },
                                        description
                                    ),
                                    promotionStarted ? _react2.default.createElement(
                                        'div',
                                        { className: 'wow-character-select__details-button clearfix' },
                                        button_label
                                    ) : ''
                                ),
                                _react2.default.createElement('div', { className: 'wow-character-select__avatar clearfix', style: {
                                        backgroundImage: 'url(' + character_image.url
                                    } })
                            );
                        });
                    }
                };
                var renderTopSection = function renderTopSection() {
                    if (promotionStarted) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'wow-select-side__top clearfix' },
                            _react2.default.createElement(
                                'h2',
                                { className: 'wow-select-side__heading clearfix' },
                                choose_side_heading
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-select-side__description clearfix' },
                                (0, _reactRenderHtml2.default)(choose_side_description)
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            'div',
                            { className: 'wow-select-side__top wow-select-side__top--pre-launch clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-select-side__top-left clearfix' },
                                _react2.default.createElement(
                                    'h2',
                                    { className: 'wow-select-side__heading clearfix' },
                                    choose_side_heading
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wow-select-side__description clearfix' },
                                    (0, _reactRenderHtml2.default)(choose_side_description)
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-select-side__top-right clearfix' },
                                _react2.default.createElement(Timer, { parent: parent, getPageDataData: getPageDataData })
                            )
                        );
                    }
                };
                return _react2.default.createElement(
                    'div',
                    { className: 'wow-select-side clearfix wow-box' },
                    _react2.default.createElement(
                        'div',
                        { className: 'wow-box__canvas' },
                        _react2.default.createElement('div', { className: 'wow-box__canvas-image wow-select-side__canvas-image' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'wow-box__content wow-select-side__content' },
                            renderTopSection(),
                            _react2.default.createElement('div', { className: 'clear' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-select-side__options' },
                                renderCharacters()
                            )
                        )
                    )
                );
            } else {
                return '';
            }
        }
    }]);

    return SelectSide;
}(_react.Component);

exports.default = SelectSide;


//////////////////
// WEBPACK FOOTER
// ./src/promotion/wow/SelectSide.js
// module id = 547
// module chunks = 2