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

var _questCpanelers = require('./images/quest-cpanelers.png');

var _questCpanelers2 = _interopRequireDefault(_questCpanelers);

var _questPleskamites = require('./images/quest-pleskamites.png');

var _questPleskamites2 = _interopRequireDefault(_questPleskamites);

var _common = require('../../routes/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quest = function (_Component) {
    _inherits(Quest, _Component);

    function Quest() {
        _classCallCheck(this, Quest);

        var _this = _possibleConstructorReturn(this, (Quest.__proto__ || Object.getPrototypeOf(Quest)).call(this));

        _this.state = {
            fadeout: false
        };
        return _this;
    }

    _createClass(Quest, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var parent = this.props.parent;
            var _global_var = global_var,
                theme_url = _global_var.theme_url;
            var _parent$state = parent.state,
                getPageDataData = _parent$state.getPageDataData,
                getPageDataStatus = _parent$state.getPageDataStatus,
                selectedCharacter = _parent$state.selectedCharacter;

            if (getPageDataStatus === 'success') {
                var quest_heading = getPageDataData.quest_heading,
                    quest_option = getPageDataData.quest_option,
                    quest_terms_description = getPageDataData.quest_terms_description,
                    quest_terms_heading = getPageDataData.quest_terms_heading;
                var fadeout = this.state.fadeout;

                var renderNavList = function renderNavList() {
                    if (quest_option && quest_option.length > 0) {
                        return quest_option.map(function (item, index) {
                            var option_name = item.option_name;

                            return _react2.default.createElement(
                                'li',
                                { key: index, className: selectedCharacter === index ? 'selected' : '' },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            parent.setState(_extends({}, parent.state, {
                                                selectedCharacter: index
                                            }));
                                        } },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'text' },
                                        option_name
                                    ),
                                    index === 0 ? _react2.default.createElement('span', { className: 'icon icon-flame' }) : index === 1 ? _react2.default.createElement('span', { className: 'icon icon-ice' }) : ''
                                )
                            );
                        });
                    }
                };
                var getSelectedCharacter = function getSelectedCharacter() {
                    if (quest_option && quest_option.length > 0) {
                        var selected = null;
                        quest_option.forEach(function (item, index) {
                            if (index === selectedCharacter) {
                                selected = item;
                            }
                        });
                        return selected;
                    }
                };
                var selectedCharacterOption = getSelectedCharacter();
                if (selectedCharacterOption) {
                    var character_image = selectedCharacterOption.character_image,
                        character_name = selectedCharacterOption.character_name,
                        heading = selectedCharacterOption.heading,
                        description = selectedCharacterOption.description,
                        featured_heading = selectedCharacterOption.featured_heading,
                        featured_description = selectedCharacterOption.featured_description,
                        more_info_heading = selectedCharacterOption.more_info_heading,
                        more_info_list = selectedCharacterOption.more_info_list,
                        rewards_heading = selectedCharacterOption.rewards_heading,
                        rewards_text = selectedCharacterOption.rewards_text,
                        rewards_description = selectedCharacterOption.rewards_description,
                        rewards_image = selectedCharacterOption.rewards_image,
                        cost_per_year = selectedCharacterOption.cost_per_year,
                        gift_card_pid = selectedCharacterOption.gift_card_pid,
                        order_link = selectedCharacterOption.order_link;

                    var renderDescriptionList = function renderDescriptionList() {
                        if (more_info_list && more_info_list.length > 0) {
                            return more_info_list.map(function (item, index) {
                                var text = item.text;

                                return _react2.default.createElement(
                                    'li',
                                    { key: index },
                                    _react2.default.createElement('span', { className: 'icon ' + (selectedCharacter === 0 ? ' icon-flame' : 'icon-ice') }),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'text' },
                                        text
                                    )
                                );
                            });
                        }
                    };
                    return _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'wow-quest wow-box clearfix' + (fadeout ? ' fadeout' : ''), id: 'wow-quest' },
                            _react2.default.createElement(
                                'div',
                                { className: 'wow-box__canvas wow-quest__canvas' },
                                _react2.default.createElement('div', { className: 'wow-box__canvas-image wow-quest__canvas-image' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'wow-box__content wow-quest__content' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wow-quest-dialog clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wow-quest-dialog__header' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wow-quest-dialog__header-logo clearfix' },
                                                _react2.default.createElement('img', { key: selectedCharacter, src: selectedCharacter === 1 ? theme_url + '/build/' + _questPleskamites2.default : theme_url + '/build/' + _questCpanelers2.default, alt: 'Quest', className: 'wow-quest-dialog__header-logo-image' })
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wow-quest-dialog__header-title' },
                                                'Quest Log'
                                            ),
                                            _react2.default.createElement(
                                                'a',
                                                { onClick: function onClick(e) {
                                                        _this2.setState({
                                                            fadeout: true
                                                        });
                                                        jQuery("html, body").animate({ scrollTop: jQuery("#wow-select-side").position().top }, 1000);
                                                        if (_this2.timeout) {
                                                            window.clearTimeout(_this2.timeout);
                                                        }
                                                        _this2.timeout = window.setTimeout(function () {
                                                            parent.setState(_extends({}, parent.state, {
                                                                selectedCharacter: null
                                                            }));
                                                        }, 1000);
                                                        e.preventDefault();
                                                    }, className: 'wow-quest-dialog__header-close' },
                                                _react2.default.createElement('span', { className: 'icon icon-close' })
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wow-quest-dialog__content clearfix' },
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wow-quest-dialog__content-left clearfix' },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'wow-quest-dialog__nav clearfix' },
                                                    _react2.default.createElement(
                                                        'a',
                                                        { className: 'wow-quest-dialog__nav-anchor' },
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'wow-quest-dialog__nav-toggle' },
                                                            _react2.default.createElement('div', { className: 'wow-quest-dialog__nav-toggle-icon' })
                                                        ),
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'wow-quest-dialog__nav-text' },
                                                            quest_heading
                                                        )
                                                    ),
                                                    _react2.default.createElement(
                                                        'ul',
                                                        { className: 'wow-quest-dialog__nav-list clearfix' },
                                                        renderNavList()
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'wow-quest-dialog__character-wrapper clearfix' },
                                                    _react2.default.createElement('img', { className: 'wow-quest-dialog__character-imp clearfix', src: theme_url + '/src/promotion/wow/images/imp.svg' }),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__character-name clearfix' },
                                                        character_name
                                                    ),
                                                    _react2.default.createElement('img', { key: character_name, src: character_image.url, alt: character_name, className: 'wow-quest-dialog__character-image clearfix wow-quest-dialog__character-image--' + selectedCharacter })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'wow-quest-dialog__content-right clearfix', key: heading },
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'wow-quest-dialog__content-main clearfix' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__heading clearfix' },
                                                        heading
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__description clearfix' },
                                                        description
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__sub-heading clearfix' },
                                                        featured_heading
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__sub-description clearfix' },
                                                        featured_description
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__sub-heading clearfix' },
                                                        more_info_heading
                                                    ),
                                                    _react2.default.createElement('div', { className: 'clear' }),
                                                    _react2.default.createElement(
                                                        'ul',
                                                        { className: 'wow-quest-dialog__description-list clearfix' },
                                                        renderDescriptionList()
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__sub-heading clearfix' },
                                                        rewards_heading
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__sub-description wow-quest-dialog__sub-description--rewards clearfix' },
                                                        rewards_description
                                                    ),
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__reward clearfix' },
                                                        _react2.default.createElement('img', { src: rewards_image.url, className: 'wow-quest-dialog__reward-image', alt: 'gift card' }),
                                                        _react2.default.createElement(
                                                            'div',
                                                            { className: 'wow-quest-dialog__reward-text-wrapper' },
                                                            _react2.default.createElement(
                                                                'div',
                                                                { className: 'wow-quest-dialog__reward-text' },
                                                                rewards_text
                                                            )
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    'div',
                                                    { className: 'wow-quest-dialog__content-cta clearfix' },
                                                    _react2.default.createElement(
                                                        'div',
                                                        { className: 'wow-quest-dialog__content-cta-text' },
                                                        cost_per_year
                                                    ),
                                                    _react2.default.createElement(
                                                        'a',
                                                        { onClick: function onClick(e) {
                                                                e.preventDefault();

                                                                (0, _common.setGlobalCookie)('bgc', gift_card_pid, 1);

                                                                window.location = order_link;
                                                            }, className: 'wow-quest-dialog__content-cta-button', target: '_blank' },
                                                        'Accept Quest'
                                                    )
                                                )
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wow-quest-dialog__character-wrapper wow-quest-dialog__character-wrapper--mobile clearfix' },
                                        _react2.default.createElement('img', { className: 'wow-quest-dialog__character-imp clearfix', src: theme_url + '/src/promotion/wow/images/imp.svg' }),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wow-quest-dialog__character-name clearfix' },
                                            character_name
                                        ),
                                        _react2.default.createElement('img', { key: character_name, src: character_image.url, alt: character_name, className: 'wow-quest-dialog__character-image clearfix wow-quest-dialog__character-image--' + selectedCharacter })
                                    )
                                ),
                                _react2.default.createElement(
                                    'section',
                                    { className: 'wow-terms wow-terms--embedded clearfix wow-box' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'wow-terms__wrapper clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wow-terms__heading clearfix' },
                                            quest_terms_heading
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'wow-terms__description clearfix' },
                                            (0, _reactRenderHtml2.default)(quest_terms_description)
                                        )
                                    )
                                )
                            )
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

    return Quest;
}(_react.Component);

exports.default = Quest;


//////////////////
// WEBPACK FOOTER
// ./src/promotion/wow/Quest.js
// module id = 546
// module chunks = 2