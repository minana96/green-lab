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

var ShoppingCart = function (_Component) {
    _inherits(ShoppingCart, _Component);

    function ShoppingCart(props) {
        _classCallCheck(this, ShoppingCart);

        var _this = _possibleConstructorReturn(this, (ShoppingCart.__proto__ || Object.getPrototypeOf(ShoppingCart)).call(this, props));

        _this.state = {
            items: undefined
        };
        return _this;
    }

    _createClass(ShoppingCart, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (global_var) {
                var _global_var = global_var,
                    ajax_url = _global_var.ajax_url;

                _axios2.default.post(ajax_url, _qs2.default.stringify({
                    action: "get_main_navigation"
                })).then(function (response) {
                    var data = response.data;

                    _this2.setState(_extends({}, _this2.state, {
                        data: data
                    }));
                }, function (error) {
                    console.log(error);
                });
            }

            var sharedAcrossCookie = (0, _common.getCookie)('shared_across');
            var sharedAcross = sharedAcrossCookie ? JSON.parse(sharedAcrossCookie) : { total_cart_items: 0 };
            var total_cart_items = sharedAcross.total_cart_items;

            this.setState(_extends({}, this.state, {
                items: total_cart_items
            }));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var items = this.state.items;

            var eligibility_input = jQuery('.domain-block__row').find('.domain-block__label:contains(Eligibility Number), .domain-block__label:contains(Eligibility ID)').parent().find('.input-250');
            if (items !== prevState.items) {
                if (items > 0) {
                    if (!jQuery("#app-root--ShoppingCart").hasClass('show') || !eligibility_input) {
                        jQuery("#app-root--ShoppingCart").addClass('show');
                    }
                } else {
                    if (jQuery("#app-root--ShoppingCart").hasClass('show') || eligibility_input) {
                        jQuery("#app-root--ShoppingCart").removeClass('show');
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _global_var2 = global_var,
                ordering_site = _global_var2.ordering_site;
            var items = this.state.items;

            if (items > 0) {
                return _react2.default.createElement(
                    'a',
                    { href: ordering_site + '/cart.php?a=checkout' },
                    _react2.default.createElement('span', { className: 'icon icon-cart-icon' }),
                    _react2.default.createElement(
                        'span',
                        { className: 'cart-badge' },
                        items
                    )
                );
            } else {
                return '';
            }
        }
    }]);

    return ShoppingCart;
}(_react.Component);

exports.default = ShoppingCart;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/ShoppingCart.js
// module id = 519
// module chunks = 1