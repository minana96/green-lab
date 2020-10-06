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

var QuickSearchDomain = function (_Component) {
    _inherits(QuickSearchDomain, _Component);

    function QuickSearchDomain(props) {
        _classCallCheck(this, QuickSearchDomain);

        var _this = _possibleConstructorReturn(this, (QuickSearchDomain.__proto__ || Object.getPrototypeOf(QuickSearchDomain)).call(this, props));

        _this.state = {
            featured_domains: null,
            added_featured_domains: [],
            domainname_list: null,
            open_dropdown: false,
            search_type: 'register',
            viewport: undefined
        };
        _this.removeSelectedTLD = _this.removeSelectedTLD.bind(_this);
        return _this;
    }

    _createClass(QuickSearchDomain, [{
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
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url,
                pageID = _global_var.pageID;
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
            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getFeaturedDomainsAjax',
                pageID: pageID
            })).then(function (response) {
                var data = response.data;
                var featured_domains = data.featured_domains;

                _this2.setState(_extends({}, _this2.state, {
                    featured_domains: featured_domains
                }));
            }, function (error) {
                console.log(error);
            });
            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getAllDomainNameAjax',
                pageID: pageID
            })).then(function (response) {
                var data = response.data;
                var domainname_list = data.domainname_list;

                _this2.setState(_extends({}, _this2.state, {
                    domainname_list: domainname_list
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'removeSelectedTLD',
        value: function removeSelectedTLD(tldname) {
            var added_featured_domains = this.state.added_featured_domains;

            var added_featured_domains_temp = Object.assign([], added_featured_domains);
            for (var key in added_featured_domains_temp) {
                if (added_featured_domains_temp[key] === tldname) {
                    added_featured_domains_temp.splice(key, 1);
                }
            }
            if (added_featured_domains_temp && added_featured_domains_temp.length > 0) {
                this.setState(_extends({}, this.state, {
                    added_featured_domains: added_featured_domains_temp
                }));
            } else {
                this.setState(_extends({}, this.state, {
                    added_featured_domains: [],
                    open_dropdown: false
                }));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                domainname_list = _state.domainname_list,
                featured_domains = _state.featured_domains,
                added_featured_domains = _state.added_featured_domains,
                open_dropdown = _state.open_dropdown,
                search_type = _state.search_type,
                viewport = _state.viewport;

            //console.log(added_featured_domains);

            var removeSelectedTLD = this.removeSelectedTLD;
            var _global_var2 = global_var,
                ordering_site = _global_var2.ordering_site;

            var domainCount = function domainCount() {
                if (domainname_list && domainname_list.length) {
                    return _react2.default.createElement(
                        'p',
                        { className: 'more-info__domain-desc' },
                        _react2.default.createElement(
                            'strong',
                            { className: 'more-info__domain-count' },
                            domainname_list.length
                        ),
                        ' different domain name options for your business, ',
                        _react2.default.createElement(
                            'i',
                            null,
                            'and counting!'
                        )
                    );
                }
            };
            var renderFeaturedDomain = function renderFeaturedDomain() {
                if (featured_domains && featured_domains.length) {
                    return featured_domains.map(function (item, index) {
                        var logo = item.logo,
                            register_price = item.register_price,
                            on_sale = item.on_sale,
                            old_price = item.old_price,
                            name = item.name,
                            transfer_price = item.transfer_price;

                        var isTLDAddded = function isTLDAddded() {
                            var isadded = false;
                            if (added_featured_domains && added_featured_domains.length > 0) {
                                added_featured_domains.forEach(function (i) {
                                    if (i === name) {
                                        isadded = true;
                                    }
                                });
                            }
                            return isadded;
                        };
                        var is_tld_added = isTLDAddded();
                        return _react2.default.createElement(
                            'a',
                            { key: index, className: 'table__column clearfix table__column--' + index + (is_tld_added && search_type === 'register' ? ' table__column--added' : '') + (search_type === 'transfer' ? ' table__column--transfer' : ''), onClick: function onClick(e) {
                                    e.preventDefault();
                                    if (search_type === 'register') {
                                        var added_featured_domains_temp = Object.assign([], added_featured_domains);
                                        if (is_tld_added === false) {
                                            added_featured_domains_temp.push(name);
                                        } else {
                                            for (var key in added_featured_domains_temp) {
                                                if (added_featured_domains_temp[key] === name) {
                                                    added_featured_domains_temp.splice(key, 1);
                                                }
                                            }
                                        }
                                        _this3.setState(_extends({}, _this3.state, {
                                            added_featured_domains: added_featured_domains_temp
                                        }));
                                    }
                                } },
                            _react2.default.createElement('img', { className: 'column__logo', src: logo }),
                            _react2.default.createElement(
                                'div',
                                { className: 'column__right' },
                                on_sale && search_type === 'register' ? _react2.default.createElement(
                                    'div',
                                    { className: 'column__price-wrapper' + (on_sale ? ' column__price-wrapper--onsale' : '') },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'column__price column__price--current' },
                                        '$',
                                        register_price,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'price__period' },
                                            '/yr'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'column__price column__price--old' },
                                        '$',
                                        old_price,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'price__period' },
                                            '/yr'
                                        )
                                    )
                                ) : _react2.default.createElement(
                                    'div',
                                    { className: 'column__price-wrapper column__price--current' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'column__price' + (transfer_price === 'Free' & search_type === 'transfer' ? ' column__price--free' : '') },
                                        search_type === 'transfer' && transfer_price === 'Free' ? '' : '$',
                                        search_type === 'register' ? register_price : transfer_price,
                                        search_type === 'transfer' && transfer_price === 'Free' ? '' : _react2.default.createElement(
                                            'span',
                                            { className: 'price__period' },
                                            '/yr'
                                        )
                                    )
                                ),
                                search_type === 'register' && viewport !== 'xs' ? _react2.default.createElement(
                                    'div',
                                    { className: 'column__action' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'action__button' + (is_tld_added ? ' action__button--added' : '') },
                                        is_tld_added ? _react2.default.createElement('span', { className: 'icon-remove1' }) : _react2.default.createElement('span', { className: 'icon-add' })
                                    )
                                ) : ''
                            )
                        );
                    });
                }
            };
            var renderTLDs = function renderTLDs() {
                //console.log(added_featured_domains);
                if (added_featured_domains && added_featured_domains.length > 0) {
                    if (added_featured_domains.length > 3) {
                        var no_dropdown_items = added_featured_domains.length - 2;
                        var renderFirstTwoTLDS = function renderFirstTwoTLDS() {
                            return added_featured_domains.map(function (item, index) {
                                if (index < 2) {
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'tld clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'tld__name' },
                                            item
                                        ),
                                        _react2.default.createElement(
                                            'a',
                                            { onClick: function onClick() {
                                                    removeSelectedTLD(item);
                                                }, className: 'tld__close' },
                                            _react2.default.createElement('span', { className: 'icon icon-close' })
                                        )
                                    );
                                }
                            });
                        };
                        var renderDropdown = function renderDropdown() {
                            return added_featured_domains.map(function (item, index) {
                                if (index >= 2) {
                                    return _react2.default.createElement(
                                        'div',
                                        { key: index, className: 'dropdown__item clearfix' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'item__name' },
                                            item
                                        ),
                                        _react2.default.createElement(
                                            'a',
                                            { onClick: function onClick() {
                                                    removeSelectedTLD(item);
                                                }, className: 'item__close' },
                                            _react2.default.createElement('span', { className: 'icon icon-close' })
                                        )
                                    );
                                }
                            });
                        };

                        var DropdownButton = function (_Component2) {
                            _inherits(DropdownButton, _Component2);

                            function DropdownButton(props) {
                                _classCallCheck(this, DropdownButton);

                                var _this4 = _possibleConstructorReturn(this, (DropdownButton.__proto__ || Object.getPrototypeOf(DropdownButton)).call(this, props));

                                _this4.bindClickAway = _this4.bindClickAway.bind(_this4);
                                _this4.currentRef = null;
                                return _this4;
                            }

                            _createClass(DropdownButton, [{
                                key: 'bindClickAway',
                                value: function bindClickAway(e) {
                                    var currentRef = this.currentRef;
                                    var parent = this.props.parent;


                                    if (currentRef && currentRef !== e.target && !currentRef.contains(e.target)) {

                                        parent.setState(_extends({}, parent.state, {
                                            open_dropdown: false
                                        }));
                                    }
                                }
                            }, {
                                key: 'componentDidMount',
                                value: function componentDidMount() {
                                    var bindClickAway = this.bindClickAway;

                                    document.addEventListener('click', bindClickAway);
                                }
                            }, {
                                key: 'componentWillUnmount',
                                value: function componentWillUnmount() {
                                    var bindClickAway = this.bindClickAway;
                                    var parent = this.props.parent;
                                    var added_featured_domains = parent.state.added_featured_domains;

                                    document.removeEventListener('click', bindClickAway);
                                    if (added_featured_domains.length < 4) {
                                        parent.setState(_extends({}, parent.state, {
                                            open_dropdown: false
                                        }));
                                    }
                                }
                            }, {
                                key: 'render',
                                value: function render() {
                                    var _this5 = this;

                                    return _react2.default.createElement(
                                        'div',
                                        { ref: function ref(el) {
                                                _this5.currentRef = el;
                                            }, className: 'dropdown__bottom' },
                                        renderDropdown()
                                    );
                                }
                            }]);

                            return DropdownButton;
                        }(_react.Component);

                        return _react2.default.createElement(
                            'div',
                            { className: 'tlds__wrapper' },
                            _react2.default.createElement(
                                'div',
                                { className: 'tlds__list clearfix' },
                                renderFirstTwoTLDS()
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'tlds__dropdown clearfix' },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            if (open_dropdown) {
                                                _this3.setState(_extends({}, _this3.state, {
                                                    open_dropdown: false
                                                }));
                                            } else {
                                                _this3.setState(_extends({}, _this3.state, {
                                                    open_dropdown: true
                                                }));
                                            }
                                        }, className: 'dropdown__top' },
                                    no_dropdown_items,
                                    ' more'
                                ),
                                open_dropdown ? _react2.default.createElement(DropdownButton, { parent: _this3 }) : ''
                            )
                        );
                    } else {
                        return added_featured_domains.map(function (item, index) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'tld clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'tld__name' },
                                    item
                                ),
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick() {
                                            removeSelectedTLD(item);
                                        }, className: 'tld__close' },
                                    _react2.default.createElement('span', { className: 'icon icon-close' })
                                )
                            );
                        });
                    }
                }
            };
            var renderTLDSInput = function renderTLDSInput() {
                if (added_featured_domains && added_featured_domains.length > 0) {
                    return added_featured_domains.map(function (item, index) {
                        return _react2.default.createElement('input', { key: index, type: 'hidden', name: 'tlds[]', value: item });
                    });
                }
            };
            var renderPlaceholder = function renderPlaceholder() {
                if (search_type === 'register') {
                    return 'Start your search here!';
                } else {
                    if (viewport === 'xs') {
                        return 'Enter the domain name to transfer';
                    } else {
                        return 'Enter the domain name you want to transfer';
                    }
                }
            };
            return _react2.default.createElement(
                'div',
                { className: 'QuickSearchDomainOld clearfix' },
                _react2.default.createElement(
                    'div',
                    { className: 'QuickSearchDomainOld__top clearfix' + (open_dropdown ? ' QuickSearchDomainOld__top--open-dropdown' : '') },
                    _react2.default.createElement(
                        'div',
                        { className: 'top__main clearfix' },
                        _react2.default.createElement('div', { className: 'top__curve top__curve--bottom' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'top__wide-container wide-container' },
                            _react2.default.createElement(
                                'div',
                                { className: 'top__nav clearfix' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'nav__list' },
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'nav__item' + (search_type === 'register' ? ' nav__item--active' : '') },
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'item__wrapper clearfix', onClick: function onClick() {
                                                    _this3.setState(_extends({}, _this3.state, {
                                                        search_type: 'register'
                                                    }));
                                                } },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'item__text' },
                                                'Register'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        { className: 'nav__item' + (search_type === 'transfer' ? ' nav__item--active' : '') },
                                        _react2.default.createElement(
                                            'a',
                                            { className: 'item__wrapper clearfix', onClick: function onClick() {
                                                    _this3.setState(_extends({}, _this3.state, {
                                                        search_type: 'transfer'
                                                    }));
                                                } },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'item__text' },
                                                'Transfer'
                                            )
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'top__body clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'container clearfix' },
                                    _react2.default.createElement(
                                        'form',
                                        { method: 'get', className: 'body__form clearfix', action: ordering_site + '/cart.php' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'form__wrapper clearfix' },
                                            _react2.default.createElement('input', { name: 'query', className: 'form__text', type: 'text', placeholder: renderPlaceholder(), onFocus: function onFocus(e) {
                                                    e.currentTarget.placeholder = "";
                                                }, onBlur: function onBlur(e) {
                                                    e.currentTarget.placeholder = renderPlaceholder();
                                                } }),
                                            _react2.default.createElement('input', { name: 'a', type: 'hidden', value: 'add' }),
                                            search_type === 'register' ? _react2.default.createElement('input', { name: 'domain', type: 'hidden', value: 'register' }) : _react2.default.createElement('input', { name: 'domain', type: 'hidden', value: 'transfer' }),
                                            search_type === 'register' ? renderTLDSInput() : '',
                                            viewport !== 'xs' ? _react2.default.createElement(
                                                'div',
                                                { className: 'form__tlds clearfix' },
                                                search_type === 'register' ? renderTLDs() : ''
                                            ) : '',
                                            viewport !== 'xs' ? _react2.default.createElement(
                                                'button',
                                                { type: 'submit', className: 'form__button' },
                                                _react2.default.createElement('span', { className: 'icon icon-search' })
                                            ) : ''
                                        ),
                                        viewport === 'xs' ? _react2.default.createElement(
                                            'button',
                                            { type: 'submit', className: 'form__button form__button--mobile' },
                                            _react2.default.createElement('span', { className: 'icon icon-search' })
                                        ) : ''
                                    ),
                                    _react2.default.createElement('div', { className: 'clear' })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'QuickSearchDomainOld__bottom clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'bottom__more-info' },
                        domainCount()
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'bottom__container clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__table clearfix' },
                            renderFeaturedDomain()
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'bottom__more-info clearfix' },
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        e.preventDefault();
                                        jQuery("html, body").animate({ scrollTop: jQuery("#app-root--FullSearchDomain").position().top }, 1000);
                                    }, className: 'more-info__left clearfix' },
                                'See all pricing'
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'more-info__right clearfix' },
                                'All prices are shown in Australian currency\xA0(AUD).'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return QuickSearchDomain;
}(_react.Component);

exports.default = QuickSearchDomain;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/QuickSearchDomainArchived.js
// module id = 543
// module chunks = 0