'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _reactRenderHtml = require('react-render-html');

var _reactRenderHtml2 = _interopRequireDefault(_reactRenderHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TablePopup = function (_Component) {
    _inherits(TablePopup, _Component);

    function TablePopup(props) {
        _classCallCheck(this, TablePopup);

        var _this = _possibleConstructorReturn(this, (TablePopup.__proto__ || Object.getPrototypeOf(TablePopup)).call(this, props));

        _this.state = {
            open: false
        };
        _this.isActive = _this.isActive.bind(_this);
        _this.renderContent = _this.renderContent.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.clickOutside = _this.clickOutside.bind(_this);
        _this.onToggleOpen = _this.onToggleOpen.bind(_this);
        _this.onToggleClose = _this.onToggleClose.bind(_this);
        _this.popupRef = (0, _react.createRef)();
        return _this;
    }

    _createClass(TablePopup, [{
        key: 'isActive',
        value: function isActive() {
            var _props = this.props,
                item = _props.item,
                type = _props.type;
            var eligible_requirement = item.eligible_requirement,
                eligible_requirement_link = item.eligible_requirement_link,
                id_protection = item.id_protection;

            if (type === "id_protection") {
                if (id_protection) {
                    return true;
                }
                return false;
            } else {
                if (eligible_requirement && eligible_requirement_link) {
                    return true;
                }
                return false;
            }
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var _props2 = this.props,
                type = _props2.type,
                item = _props2.item;
            var eligible_requirement_link = item.eligible_requirement_link;

            var getLink = function getLink() {
                if (eligible_requirement_link && eligible_requirement_link.length > 0) {
                    var _eligible_requirement = eligible_requirement_link[0],
                        link_type = _eligible_requirement.link_type,
                        internal_link = _eligible_requirement.internal_link,
                        external_link = _eligible_requirement.external_link;

                    return _react2.default.createElement(
                        'a',
                        { className: 'table-popup__link clearfix',
                            target: link_type === 'external' ? '_blank' : '_self',
                            href: link_type === 'external' ? external_link : internal_link },
                        'View Eligibility Requirements'
                    );
                }
                return '';
            };
            var link = getLink();

            var isActive = this.isActive;

            if (type === "id_protection") {
                return _react2.default.createElement(
                    'div',
                    { className: 'table-popup__wrapper' },
                    _react2.default.createElement('a', { className: 'table-popup__close icon-close icon', href: null, onClick: function onClick(e) {
                            e.preventDefault();
                            _this2.setState({ open: false });
                        } }),
                    _react2.default.createElement(
                        'div',
                        { className: 'table-popup__description clearfix' },
                        isActive() ? 'ID Protection will hide your personal details from the public. This domain is eligible for FREE ID Protection.' : 'Unfortunately due to registry policies, ID protection is unavailable for this domain name.'
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'table-popup__wrapper clearfix' },
                    _react2.default.createElement('a', { className: 'table-popup__close icon-close icon', href: null, onClick: function onClick(e) {
                            e.preventDefault();
                            _this2.setState({ open: false });
                        } }),
                    _react2.default.createElement(
                        'div',
                        { className: 'table-popup__description clearfix' },
                        isActive() ? 'There are eligibility requirements that you may need to know about before registering this domain name.' : 'This domain name does not have strict eligibility requirements'
                    ),
                    _react2.default.createElement('div', { className: 'clear' }),
                    isActive() ? link : ''
                );
            }
        }
    }, {
        key: 'clickOutside',
        value: function clickOutside(e) {
            if (e.target !== this.popupRef.current && !this.popupRef.current.contains(e.target)) {
                this.setState({
                    open: false
                });
            }
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            var open = this.state.open;

            this.setState({
                open: !open
            });
            document.addEventListener("click", this.clickOutside);
            document.addEventListener("touchstart", this.clickOutside);
        }
    }, {
        key: 'onToggleOpen',
        value: function onToggleOpen(e) {
            this.setState({
                open: true
            });
        }
    }, {
        key: 'onToggleClose',
        value: function onToggleClose(e) {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var open = this.state.open;

            if (prevState.open !== open && open === false) {
                document.removeEventListener("click", this.clickOutside);
                document.removeEventListener("touchstart", this.clickOutside);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener("click", this.clickOutside);
            document.removeEventListener("touchstart", this.clickOutside);
        }
    }, {
        key: 'render',
        value: function render() {
            var isActive = this.isActive,
                renderContent = this.renderContent,
                popupRef = this.popupRef,
                onToggleOpen = this.onToggleOpen,
                onToggleClose = this.onToggleClose;
            var type = this.props.type;
            var open = this.state.open;

            return _react2.default.createElement(
                'div',
                { ref: popupRef, className: 'table-popup clearfix' },
                _react2.default.createElement('a', { onMouseOver: onToggleOpen, onMouseOut: onToggleClose, href: null,
                    className: 'table-popup__icon icon ' + (type === "id_protection" ? ' icon-wp-security-advisor' : ' icon-files-databases') + (isActive() ? ' active' : '') }),
                open ? renderContent() : ''
            );
        }
    }]);

    return TablePopup;
}(_react.Component);

var FullSearchDomain = function (_Component2) {
    _inherits(FullSearchDomain, _Component2);

    function FullSearchDomain() {
        _classCallCheck(this, FullSearchDomain);

        var _this3 = _possibleConstructorReturn(this, (FullSearchDomain.__proto__ || Object.getPrototypeOf(FullSearchDomain)).call(this));

        _this3.state = {
            domainname_list_by_category: [],
            category: 'popular',
            tab: 'register',
            domainname_subcategory_list: [],
            added_tld: [],
            open_dropdown: false,
            viewport: undefined,
            minHeight: undefined,
            show: false,
            fetching: true
        };
        _this3.loadDomainNameBasedOnCategory = _this3.loadDomainNameBasedOnCategory.bind(_this3);
        _this3.loadAllDomainNames = _this3.loadAllDomainNames.bind(_this3);
        _this3.loadDomainNameOnSale = _this3.loadDomainNameOnSale.bind(_this3);
        _this3.loadDomainNameSubCategory = _this3.loadDomainNameSubCategory.bind(_this3);
        _this3.loadDomainNamesOnSearch = _this3.loadDomainNamesOnSearch.bind(_this3);
        _this3.isTLDAdded = _this3.isTLDAdded.bind(_this3);
        _this3.addTLD = _this3.addTLD.bind(_this3);
        _this3.removeTLD = _this3.removeTLD.bind(_this3);
        _this3.renderHeadTablePricing = _this3.renderHeadTablePricing.bind(_this3);
        _this3.clearSearch = _this3.clearSearch.bind(_this3);
        _this3.renderPriceValue = _this3.renderPriceValue.bind(_this3);
        _this3.fancyFormOnSubmit = _this3.fancyFormOnSubmit.bind(_this3);
        _this3.cancelTokenSource = null;
        _this3.searchDomainField = (0, _react.createRef)();
        return _this3;
    }

    _createClass(FullSearchDomain, [{
        key: 'clearSearch',
        value: function clearSearch() {
            this.setState({
                added_tld: [],
                show: false
            });
        }
    }, {
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
            var _this4 = this;

            var category = this.state.category;
            var loadDomainNameBasedOnCategory = this.loadDomainNameBasedOnCategory,
                loadDomainNameSubCategory = this.loadDomainNameSubCategory;
            var computeViewport = this.computeViewport;

            var window_width = window.innerWidth;
            var viewport = computeViewport(window_width);
            this.setState(_extends({}, this.state, {
                viewport: viewport
            }));
            window.addEventListener('resize', function () {
                var window_width = window.innerWidth;
                var viewport = computeViewport(window_width);
                _this4.setState(_extends({}, _this4.state, {
                    viewport: viewport
                }));
            });
            loadDomainNameBasedOnCategory(category);
            loadDomainNameSubCategory();
        }
    }, {
        key: 'loadDomainNamesOnSearch',
        value: function loadDomainNamesOnSearch(input) {
            var _this5 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url;

            if (this.cancelTokenSource) {
                this.cancelTokenSource.cancel('cancel');
            }
            this.cancelTokenSource = _axios2.default.CancelToken.source();
            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getDomainNameByKeywordAjax',
                input: input
            }), {
                cancelToken: this.cancelTokenSource.token
            }).then(function (response) {
                var data = response.data;
                var domainname_list = data.domainname_list;

                _this5.setState(_extends({}, _this5.state, {
                    domainname_list_by_category: domainname_list,
                    category: 'search'
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevpops, prevstate) {
            var _state = this.state,
                viewport = _state.viewport,
                domainname_list_by_category = _state.domainname_list_by_category,
                category = _state.category;

            if (domainname_list_by_category !== prevstate.domainname_list_by_category || category !== prevstate.category) {
                if (viewport !== 'xs' && viewport !== 'sm') {
                    var sidebarH = jQuery('.FullSearchDomain__sidebar .sidebar__list').height() + jQuery('.FullSearchDomain__sidebar .sidebar__search-tld').height();
                    if (sidebarH > jQuery('.FullSearchDomain__content').height()) {
                        this.setState(_extends({}, this.state, {
                            minHeight: sidebarH
                        }));
                    }
                }
            }
        }
    }, {
        key: 'loadAllDomainNames',
        value: function loadAllDomainNames() {
            var _this6 = this;

            var _global_var2 = global_var,
                ajax_url = _global_var2.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getAllDomainNameAjax'
            })).then(function (response) {
                var data = response.data;
                var domainname_list = data.domainname_list;

                _this6.setState(_extends({}, _this6.state, {
                    domainname_list_by_category: domainname_list,
                    category: 'all'
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'loadDomainNameBasedOnCategory',
        value: function loadDomainNameBasedOnCategory(category) {
            var _this7 = this;

            var _global_var3 = global_var,
                ajax_url = _global_var3.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getDomainNameByCategoryAjax',
                category: category
            })).then(function (response) {
                var data = response.data;
                var domainname_list_by_category = data.domainname_list_by_category;
                var fetching = _this7.state.fetching;

                if (fetching) {
                    _this7.setState(_extends({}, _this7.state, {
                        domainname_list_by_category: domainname_list_by_category,
                        category: category,
                        fetching: false
                    }));
                } else {
                    _this7.setState(_extends({}, _this7.state, {
                        domainname_list_by_category: domainname_list_by_category,
                        category: category
                    }));
                }
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'loadDomainNameOnSale',
        value: function loadDomainNameOnSale() {
            var _this8 = this;

            var _global_var4 = global_var,
                ajax_url = _global_var4.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getDomainnameOnSaleAjax'
            })).then(function (response) {
                var data = response.data;
                var domainname_list_on_sale = data.domainname_list_on_sale;

                _this8.setState(_extends({}, _this8.state, {
                    domainname_list_by_category: domainname_list_on_sale,
                    category: 'onsale'
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'loadDomainNameSubCategory',
        value: function loadDomainNameSubCategory() {
            var _this9 = this;

            var _global_var5 = global_var,
                ajax_url = _global_var5.ajax_url;

            _axios2.default.post(ajax_url, _qs2.default.stringify({
                action: 'getDomainNameSubategoriesAjax'
            })).then(function (response) {
                var data = response.data;
                var domainname_subcategory_list = data.domainname_subcategory_list;

                _this9.setState(_extends({}, _this9.state, {
                    domainname_subcategory_list: domainname_subcategory_list
                }));
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'isTLDAdded',
        value: function isTLDAdded(tld) {
            var isadded = false;
            var added_tld = this.state.added_tld;

            if (added_tld && added_tld.length > 0) {
                added_tld.forEach(function (i) {
                    if (i === tld) {
                        isadded = true;
                    }
                });
            }
            return isadded;
        }
    }, {
        key: 'addTLD',
        value: function addTLD(tld) {
            var added_tld = this.state.added_tld;

            var added_tld_temp = Object.assign([], added_tld);
            added_tld_temp.push(tld);
            this.setState(_extends({}, this.state, {
                added_tld: added_tld_temp,
                show: true
            }));
        }
    }, {
        key: 'removeTLD',
        value: function removeTLD(tld) {
            var added_tld = this.state.added_tld;

            var added_tld_temp = Object.assign([], added_tld);
            for (var key in added_tld_temp) {
                if (added_tld_temp[key] === tld) {
                    added_tld_temp.splice(key, 1);
                }
            }
            this.setState(_extends({}, this.state, {
                added_tld: added_tld_temp
            }));
        }
    }, {
        key: 'renderHeadTablePricing',
        value: function renderHeadTablePricing() {
            return _react2.default.createElement(
                'div',
                { key: 'table__row--pricing',
                    className: 'table__row clearfix table__row--pricing table__row--pricing-head' },
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--name table__column--name-label clearfix' },
                    'EXTENSION'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__label' },
                            '1 Year'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__label' },
                            '2 Years'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__label' },
                            '3 Years'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__label' },
                            'Transfer'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__label' },
                            'Renew'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'table__column table__column--price table__column--label table__column--info clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'price__wrapper' },
                        _react2.default.createElement('div', { className: 'price__label' })
                    )
                )
            );
        }
    }, {
        key: 'renderPriceValue',
        value: function renderPriceValue(value) {
            if (value === "Free") {
                return _react2.default.createElement(
                    'div',
                    { className: 'price__value price__value--free' },
                    value
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'price__value' },
                '$',
                value
            );
        }
    }, {
        key: 'fancyFormOnSubmit',
        value: function fancyFormOnSubmit(e) {
            if (this.searchDomainField && this.searchDomainField.current && !this.searchDomainField.current.value) {
                e.preventDefault();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            var _global_var6 = global_var,
                ordering_site = _global_var6.ordering_site,
                theme_url = _global_var6.theme_url;
            var _state2 = this.state,
                domainname_list_by_category = _state2.domainname_list_by_category,
                category = _state2.category,
                tab = _state2.tab,
                domainname_subcategory_list = _state2.domainname_subcategory_list,
                added_tld = _state2.added_tld,
                open_dropdown = _state2.open_dropdown,
                viewport = _state2.viewport,
                minHeight = _state2.minHeight,
                show = _state2.show;
            var mode = this.props.mode;
            var fancyFormOnSubmit = this.fancyFormOnSubmit,
                renderPriceValue = this.renderPriceValue,
                renderHeadTablePricing = this.renderHeadTablePricing,
                loadDomainNameBasedOnCategory = this.loadDomainNameBasedOnCategory,
                loadAllDomainNames = this.loadAllDomainNames,
                loadDomainNameOnSale = this.loadDomainNameOnSale,
                loadDomainNamesOnSearch = this.loadDomainNamesOnSearch,
                isTLDAdded = this.isTLDAdded,
                addTLD = this.addTLD,
                removeTLD = this.removeTLD;

            var renderPrice = function renderPrice(item) {
                var register_price = item.register_price,
                    transfer_price = item.transfer_price,
                    renewal_price = item.renewal_price,
                    on_sale = item.on_sale,
                    old_price = item.old_price;

                if (tab === 'register') {
                    if (on_sale) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'table__column table__column--price table__column--sale clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'price__wrapper price__wrapper--new' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__value' },
                                    '$',
                                    register_price
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__period' },
                                    '/yr'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'price__wrapper price__wrapper--old' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__value' },
                                    '$',
                                    old_price
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__period' },
                                    '/yr'
                                )
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            'div',
                            { className: 'table__column table__column--price clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'price__wrapper' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__value' },
                                    '$',
                                    register_price
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price__period' },
                                    '/yr'
                                )
                            )
                        );
                    }
                } else if (tab === "transfer") {
                    return _react2.default.createElement(
                        'div',
                        { className: 'table__column table__column--price clearfix' },
                        transfer_price === 'Free' ? _react2.default.createElement(
                            'div',
                            { className: 'price__wrapper price__wrapper--free' },
                            _react2.default.createElement(
                                'div',
                                { className: 'price__value' },
                                transfer_price
                            )
                        ) : _react2.default.createElement(
                            'div',
                            { className: 'price__wrapper' },
                            _react2.default.createElement(
                                'div',
                                { className: 'price__value' },
                                '$',
                                transfer_price
                            )
                        )
                    );
                } else {
                    return _react2.default.createElement(
                        'div',
                        { className: 'table__column table__column--price clearfix' },
                        _react2.default.createElement(
                            'div',
                            { className: 'price__wrapper' },
                            _react2.default.createElement(
                                'div',
                                { className: 'price__value' },
                                '$',
                                renewal_price
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'price__period' },
                                '/yr'
                            )
                        )
                    );
                }
            };
            var renderName = function renderName(item) {
                var individual_page = item.individual_page,
                    link = item.link,
                    name = item.name;

                if (individual_page) {
                    return _react2.default.createElement(
                        'a',
                        { className: 'name__link', href: link },
                        name
                    );
                } else {
                    return name;
                }
            };
            var renderTableRows = function renderTableRows() {
                if (domainname_list_by_category && domainname_list_by_category.length > 0) {
                    if (_this10.state.category != 'popular') {
                        var collator = new Intl.Collator(undefined, { sensitivity: 'base' });
                        domainname_list_by_category.sort(function (a, b) {
                            return collator.compare(a.name, b.name);
                        });
                    }
                    return domainname_list_by_category.map(function (item, index) {
                        var name = item.name,
                            on_sale = item.on_sale;

                        var isAdded = isTLDAdded(name);
                        if (mode === "pricing" && viewport !== "xs") {
                            var register_price = item.register_price,
                                transfer_price = item.transfer_price,
                                renewal_price = item.renewal_price,
                                _on_sale = item.on_sale;

                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'table__row clearfix table__row--pricing' },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'table__column table__column--name table__column--name-pricing clearfix' },
                                    renderName(item),
                                    _on_sale ? _react2.default.createElement(
                                        'span',
                                        { className: 'name__onsale-tag' },
                                        'On Sale'
                                    ) : ''
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'table__column table__column--price table__column--pricing clearfix' + (_on_sale ? ' table__column--onsaleprice' : '') },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'price__wrapper' },
                                        renderPriceValue(register_price)
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'table__column table__column--price table__column--pricing clearfix' + (_on_sale ? ' table__column--onsaleprice' : '') },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'price__wrapper' },
                                        renderPriceValue((register_price * 2).toFixed(2))
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'table__column table__column--price table__column--pricing clearfix' + (_on_sale ? ' table__column--onsaleprice' : '') },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'price__wrapper' },
                                        renderPriceValue((register_price * 3).toFixed(2))
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'table__column table__column--price table__column--pricing clearfix' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'price__wrapper' },
                                        renderPriceValue(transfer_price)
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'table__column table__column--price table__column--pricing clearfix' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'price__wrapper' },
                                        renderPriceValue(renewal_price)
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'table__column table__column--price table__column--pricing table__column--info clearfix' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'icon__wrapper' },
                                        _react2.default.createElement(TablePopup, { type: 'eligibility', item: item }),
                                        _react2.default.createElement(TablePopup, { type: 'id_protection', item: item })
                                    )
                                )
                            );
                        }
                        return _react2.default.createElement(
                            'div',
                            { key: index,
                                className: 'table__row clearfix' + (isAdded && tab === 'register' ? ' table__row--added' : '') },
                            _react2.default.createElement(
                                'div',
                                { className: 'table__column table__column--name clearfix' },
                                renderName(item),
                                on_sale && tab === 'register' ? _react2.default.createElement(
                                    'span',
                                    { className: 'name__onsale-tag' },
                                    'On Sale'
                                ) : ''
                            ),
                            renderPrice(item),
                            tab === 'register' && viewport !== 'xs' ? _react2.default.createElement(
                                'div',
                                { className: 'table__column table__column--action clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'action__button' + (isAdded && tab === 'register' ? ' action__button--added' : ''),
                                        onClick: function onClick() {
                                            if (isAdded && tab === 'register') {
                                                removeTLD(name);
                                            } else {
                                                addTLD(name);
                                            }
                                        } },
                                    isAdded ? _react2.default.createElement(
                                        _react.Fragment,
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text text--remove' },
                                            'Remove'
                                        ),
                                        _react2.default.createElement('span', { className: 'icon-remove1 icon' })
                                    ) : _react2.default.createElement(
                                        _react.Fragment,
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'text text--add' },
                                            'Add To Search'
                                        ),
                                        _react2.default.createElement('span', { className: 'icon-add icon' })
                                    )
                                )
                            ) : ''
                        );
                    });
                } else {
                    var fetching = _this10.state.fetching;

                    if (fetching) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'table__row table__row--loading' },
                            _react2.default.createElement('img', { className: 'spinner z-spinner--css', src: theme_url + '/images/zLogo.png', alt: 'zuver loading' })
                        );
                    }
                    return _react2.default.createElement(
                        'div',
                        { className: 'table__row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'table__column table__column--noitem' },
                            'Sorry. We did not find any results from your search. Try again.'
                        )
                    );
                }
            };
            var renderSubcategoryItem = function renderSubcategoryItem() {
                if (domainname_subcategory_list && domainname_subcategory_list.length > 0) {
                    return domainname_subcategory_list.map(function (item, index) {
                        var name = item.name,
                            slug = item.slug;

                        return _react2.default.createElement(
                            'li',
                            { key: index,
                                className: 'subcategories__item clearfix' + (category === slug ? ' subcategories__item--active' : '') },
                            _react2.default.createElement(
                                'a',
                                { onClick: function onClick(e) {
                                        e.preventDefault();
                                        loadDomainNameBasedOnCategory(slug);
                                    }, className: 'item__wrapper clearfix' },
                                (0, _reactRenderHtml2.default)(name)
                            )
                        );
                    });
                }
            };
            var renderSelectedTlds = function renderSelectedTlds() {
                var renderTLDItem = function renderTLDItem() {
                    return added_tld.map(function (item, index) {
                        return _react2.default.createElement(
                            'div',
                            { onClick: function onClick() {
                                    removeTLD(item);
                                }, key: index, className: 'tlds__item' },
                            _react2.default.createElement(
                                'span',
                                { className: 'item__text' },
                                item
                            ),
                            _react2.default.createElement('span', { className: 'item__close icon-close' })
                        );
                    });
                };
                var renderFirstTwoTLDItem = function renderFirstTwoTLDItem() {
                    return added_tld.map(function (item, index) {
                        if (index < 2) {
                            return _react2.default.createElement(
                                'div',
                                { key: index, className: 'tlds__item' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'item__text' },
                                    item
                                ),
                                _react2.default.createElement('span', { onClick: function onClick() {
                                        removeTLD(item);
                                    }, className: 'item__close icon-close' })
                            );
                        }
                    });
                };
                var renderTLDDropdown = function renderTLDDropdown() {
                    var open_dropdown = _this10.state.open_dropdown;

                    var no_dropdown_items = added_tld.length - 2;

                    var TLDDropdownList = function (_Component3) {
                        _inherits(TLDDropdownList, _Component3);

                        function TLDDropdownList() {
                            _classCallCheck(this, TLDDropdownList);

                            var _this11 = _possibleConstructorReturn(this, (TLDDropdownList.__proto__ || Object.getPrototypeOf(TLDDropdownList)).call(this));

                            _this11.onClickAwayDropdown = _this11.onClickAwayDropdown.bind(_this11);
                            _this11.dropdownRef = null;
                            return _this11;
                        }

                        _createClass(TLDDropdownList, [{
                            key: 'onClickAwayDropdown',
                            value: function onClickAwayDropdown(e) {
                                var parent = this.props.parent;

                                if (this.dropdownRef && e.target != this.dropdownRef && !this.dropdownRef.contains(e.target)) {
                                    parent.setState(_extends({}, parent.state, {
                                        open_dropdown: false
                                    }));
                                }
                            }
                        }, {
                            key: 'componentDidMount',
                            value: function componentDidMount() {
                                document.addEventListener('click', this.onClickAwayDropdown);
                            }
                        }, {
                            key: 'componentWillUnmount',
                            value: function componentWillUnmount() {
                                document.removeEventListener('click', this.onClickAwayDropdown);
                            }
                        }, {
                            key: 'render',
                            value: function render() {
                                var _this12 = this;

                                var renderDropdownItem = function renderDropdownItem() {
                                    return added_tld.map(function (item, index) {
                                        if (index > 1) {
                                            return _react2.default.createElement(
                                                'div',
                                                { key: index, onClick: function onClick() {
                                                        //const {removeTLD} = parent;
                                                        removeTLD(item);
                                                    }, className: 'dropdown__item' },
                                                _react2.default.createElement(
                                                    'span',
                                                    { className: 'item__text' },
                                                    item
                                                ),
                                                _react2.default.createElement('span', { className: 'item__close icon-close' })
                                            );
                                        }
                                    });
                                };
                                return _react2.default.createElement(
                                    'div',
                                    { ref: function ref(el) {
                                            _this12.dropdownRef = el;
                                        }, className: 'dropdown__list clearfix' },
                                    renderDropdownItem()
                                );
                            }
                        }]);

                        return TLDDropdownList;
                    }(_react.Component);

                    return _react2.default.createElement(
                        'div',
                        { className: 'tlds__dropdown clearfix' },
                        _react2.default.createElement(
                            'div',
                            { onClick: function onClick() {
                                    _this10.setState(_extends({}, _this10.state, {
                                        open_dropdown: !open_dropdown
                                    }));
                                }, className: 'dropdown__top clearfix' },
                            no_dropdown_items,
                            ' more',
                            _react2.default.createElement(
                                'div',
                                { className: 'tlds__arrow-wrapper clearfix' },
                                _react2.default.createElement('span', { className: 'icon icon-arrow tlds__arrow' })
                            )
                        ),
                        open_dropdown ? _react2.default.createElement(TLDDropdownList, { parent: _this10 }) : ''
                    );
                };

                if (added_tld && added_tld.length > 0) {
                    if (added_tld.length < 4) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'tlds__wrapper clearfix' },
                            renderTLDItem()
                        );
                    } else {
                        return _react2.default.createElement(
                            'div',
                            { className: 'tlds__wrapper clearfix' },
                            renderFirstTwoTLDItem(),
                            renderTLDDropdown()
                        );
                    }
                } else {
                    return '';
                }
            };
            var renderTLDSInput = function renderTLDSInput() {
                if (added_tld && added_tld.length > 0) {
                    return added_tld.map(function (item, index) {
                        return _react2.default.createElement('input', { key: index, type: 'hidden', name: 'tlds[]', value: item });
                    });
                }
            };
            var renderSidebarMobile = function renderSidebarMobile(classname) {
                var renderList = function renderList() {
                    if (domainname_subcategory_list && domainname_subcategory_list.length > 0) {
                        return domainname_subcategory_list.map(function (item, index) {
                            var name = item.name,
                                slug = item.slug;

                            return _react2.default.createElement(
                                'option',
                                { key: index, value: '' + slug },
                                (0, _reactRenderHtml2.default)(name)
                            );
                        });
                    }
                };
                return _react2.default.createElement(
                    'select',
                    { className: 'FullSearchDomain__sidebar-dropdown FullSearchDomain__sidebar-dropdown-' + classname,
                        onChange: function onChange(e) {
                            e.preventDefault();
                            var cat = e.currentTarget.value;
                            if (cat === 'all') {
                                loadAllDomainNames();
                            } else if (cat === 'onsale') {
                                loadDomainNameOnSale();
                            } else {
                                loadDomainNameBasedOnCategory(e.currentTarget.value);
                            }
                        } },
                    _react2.default.createElement(
                        'option',
                        { key: 'popular', value: 'popular' },
                        'Popular'
                    ),
                    _react2.default.createElement(
                        'option',
                        { key: 'global', value: 'global' },
                        'Global'
                    ),
                    _react2.default.createElement(
                        'option',
                        { key: 'aus-and-nz', value: 'aus-and-nz' },
                        'AUS and NZ'
                    ),
                    renderList(),
                    _react2.default.createElement(
                        'option',
                        { key: 'all', value: 'all' },
                        'All'
                    ),
                    _react2.default.createElement(
                        'option',
                        { key: 'onsale', value: 'onsale' },
                        'On Sale'
                    )
                );
            };
            var renderSearchTLDMobile = function renderSearchTLDMobile() {
                return _react2.default.createElement(
                    'form',
                    { className: 'search-tld-mobile clearfix', onSubmit: function onSubmit(e) {
                            e.preventDefault();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'search-tld-mobile__wrapper clearfix' },
                        _react2.default.createElement('input', { onKeyUp: function onKeyUp(e) {
                                e.preventDefault();
                                loadDomainNamesOnSearch(e.currentTarget.value);
                            }, onFocus: function onFocus(e) {
                                e.currentTarget.placeholder = "";
                            }, onBlur: function onBlur(e) {
                                e.currentTarget.placeholder = "Search Extensions";
                            }, className: 'search-tld-mobile__textfield', type: 'text', placeholder: 'Search Extensions' }),
                        _react2.default.createElement(
                            'button',
                            { className: 'search-tld-mobile__button' },
                            _react2.default.createElement('span', { className: 'icon icon-search' })
                        )
                    )
                );
            };
            var renderFancyForm = function renderFancyForm() {
                if (tab === 'register' && viewport !== 'xs' && show) {
                    var clearSearch = _this10.clearSearch;

                    return _react2.default.createElement(
                        'form',
                        { onSubmit: fancyFormOnSubmit, method: 'get', className: 'FullSearchDomainFancyForm content__form clearfix', action: ordering_site + '/cart.php' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container FullSearchDomainFancyForm__container clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'FullSearchDomainFancyForm__wrapper clearfix' },
                                _react2.default.createElement('input', { ref: _this10.searchDomainField, placeholder: 'Start your search here', name: 'query', type: 'text', className: 'FullSearchDomainFancyForm__textfield', onFocus: function onFocus(e) {
                                        e.currentTarget.placeholder = "";
                                    }, onBlur: function onBlur(e) {
                                        e.currentTarget.placeholder = "Start your search here";
                                    } }),
                                tab === 'register' ? _react2.default.createElement(
                                    'div',
                                    { className: 'FullSearchDomainFancyForm__tlds clearfix' },
                                    renderSelectedTlds()
                                ) : '',
                                renderTLDSInput(),
                                _react2.default.createElement(
                                    'button',
                                    { className: 'FullSearchDomainFancyForm__button', type: 'submit' },
                                    _react2.default.createElement('span', { className: 'icon icon-search' })
                                )
                            ),
                            _react2.default.createElement(
                                'a',
                                { className: 'FullSearchDomainFancyForm__close clearfix', onClick: function onClick(e) {
                                        e.preventDefault();
                                        clearSearch();
                                    } },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'text' },
                                    'Clear Search'
                                ),
                                _react2.default.createElement('span', { className: 'icon icon-close' })
                            )
                        ),
                        _react2.default.createElement('input', { type: 'hidden', name: 'a', value: 'add' }),
                        _react2.default.createElement('input', { type: 'hidden', name: 'domain', value: 'register' })
                    );
                }
                return '';
            };
            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'FullSearchDomain FullSearchDomainMore clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'FullSearchDomain__sidebar clearfix' },
                        viewport === "lg" ? _react2.default.createElement(
                            'div',
                            { className: 'FullSearchDomainMore__sidebar-heading' },
                            'Domains and Pricing'
                        ) : '',
                        _react2.default.createElement(
                            'ul',
                            { className: 'sidebar__list clearfix' },
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item clearfix' + (category === 'popular' ? ' list__item--active' : '') },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            loadDomainNameBasedOnCategory('popular');
                                        }, className: 'item__wrapper' },
                                    'Popular'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item clearfix' + (category === 'global' ? ' list__item--active' : '') },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            loadDomainNameBasedOnCategory('global');
                                        }, className: 'item__wrapper' },
                                    'Global'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item clearfix' + (category === 'aus-and-nz' ? ' list__item--active' : '') },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            loadDomainNameBasedOnCategory('aus-and-nz');
                                        }, className: 'item__wrapper' },
                                    'AUS and NZ'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item clearfix' + (category !== 'popular' && category !== 'global' && category !== 'aus-and-nz' && category !== 'all' && category !== 'onsale' && category !== 'search' ? ' list__item--active' : '') },
                                domainname_subcategory_list && domainname_subcategory_list.length > 0 ? _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            var slug = domainname_subcategory_list[0].slug;

                                            loadDomainNameBasedOnCategory(slug);
                                        }, className: 'item__wrapper clearfix' },
                                    'Categories'
                                ) : '',
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'item__subcategories clearfix' },
                                    renderSubcategoryItem()
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item clearfix' + (category === 'all' ? ' list__item--active' : '') },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            loadAllDomainNames();
                                        }, className: 'item__wrapper' },
                                    'All Domain Names'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'list__item list__item--on-sale clearfix' + (category === 'onsale' ? ' list__item--active' : '') },
                                _react2.default.createElement(
                                    'a',
                                    { onClick: function onClick(e) {
                                            e.preventDefault();
                                            loadDomainNameOnSale();
                                        }, className: 'item__wrapper item__wrapper--onsale' },
                                    'On Sale'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'sidebar__search-tld clearfix' },
                            _react2.default.createElement(
                                'form',
                                { className: 'search-tld__form clearfix', onSubmit: function onSubmit(e) {
                                        e.preventDefault();
                                    } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'search-tld__wrapper clearfix' },
                                    _react2.default.createElement('input', { onKeyUp: function onKeyUp(e) {
                                            e.preventDefault();
                                            loadDomainNamesOnSearch(e.currentTarget.value);
                                        }, onFocus: function onFocus(e) {
                                            e.currentTarget.placeholder = "";
                                        }, onBlur: function onBlur(e) {
                                            e.currentTarget.placeholder = "Search Extensions";
                                        }, className: 'search-tld__textfield', type: 'text', placeholder: 'Search Extensions'

                                    }),
                                    _react2.default.createElement(
                                        'button',
                                        { className: 'search-tld__button' },
                                        _react2.default.createElement('span', { className: 'icon icon-search' })
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'FullSearchDomain__content clearfix', style: {
                                minHeight: minHeight
                            } },
                        _react2.default.createElement(
                            'div',
                            { className: 'content__wrapper FullSearchDomainMore__content-wrapper clearfix' },
                            _react2.default.createElement(
                                'div',
                                { className: 'content__header clearfix' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'FullSearchDomainMore__heading clearfix' },
                                    'Domains and Pricing'
                                ),
                                mode !== "pricing" || viewport === "xs" ? _react2.default.createElement(
                                    'div',
                                    { className: 'header__nav' },
                                    _react2.default.createElement(
                                        'ul',
                                        { className: 'nav__list' },
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'list__item' },
                                            _react2.default.createElement(
                                                'a',
                                                { onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        _this10.setState(_extends({}, _this10.state, {
                                                            tab: 'register'
                                                        }));
                                                    },
                                                    className: 'item__wrapper' + (tab === 'register' ? ' item__wrapper--active' : '') },
                                                viewport === 'xs' ? 'Register' : 'Registration Prices'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'list__item' },
                                            _react2.default.createElement(
                                                'a',
                                                { onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        _this10.setState(_extends({}, _this10.state, {
                                                            tab: 'transfer'
                                                        }));
                                                    },
                                                    className: 'item__wrapper' + (tab === 'transfer' ? ' item__wrapper--active' : '') },
                                                'Transfer'
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'li',
                                            { className: 'list__item' },
                                            _react2.default.createElement(
                                                'a',
                                                { onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        _this10.setState(_extends({}, _this10.state, {
                                                            tab: 'renewal'
                                                        }));
                                                    },
                                                    className: 'item__wrapper' + (tab === 'renewal' ? ' item__wrapper--active' : '') },
                                                'Renew'
                                            )
                                        )
                                    )
                                ) : '',
                                viewport === 'xs' ? renderSidebarMobile('xs') : ''
                            ),
                            _react2.default.createElement('div', { className: 'clear' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'FullSearchDomainMore__ipad-sidebar' },
                                viewport === 'sm' || viewport === 'md' ? renderSidebarMobile('sm') : '',
                                viewport === 'sm' || viewport === 'md' ? renderSearchTLDMobile('sm') : ''
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'content__table clearfix' },
                                mode === "pricing" && viewport !== "xs" ? renderHeadTablePricing() : '',
                                renderTableRows()
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'FullSearchDomainMore__terms' },
                                'All prices are shown in Australian currency (AUD).'
                            )
                        )
                    )
                ),
                renderFancyForm()
            );
        }
    }]);

    return FullSearchDomain;
}(_react.Component);

exports.default = FullSearchDomain;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/FullSearchDomain.js
// module id = 536
// module chunks = 0