'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.computeText = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FullSearchDomain = require('../components/shared/FullSearchDomain');

var _FullSearchDomain2 = _interopRequireDefault(_FullSearchDomain);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var computeText = exports.computeText = function computeText(selector) {
    var long = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (long === null) {
        long = "Start your search or enter a keyword here!";
    }
    var short = "Start your search here!";
    if (jQuery(window).outerWidth() < 768) {
        jQuery(selector).attr("placeholder", short);
    } else {
        jQuery(selector).attr("placeholder", long);
    }
};

exports.default = {
    init: function init() {
        _reactDom2.default.render(_react2.default.createElement(_FullSearchDomain2.default, { mode: 'pricing' }), document.getElementById('app-root--FullSearchDomain'));
    },
    finalize: function finalize() {
        var carousel = jQuery('#domain-pricing-features__list--mobile');
        carousel.owlCarousel({
            loop: true,
            nav: false,
            center: true,
            autoWidth: true,
            margin: 30,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });

        computeText(".domain-pricing-form__textfield");
        jQuery(window).resize(function () {
            computeText(".domain-pricing-form__textfield");
        });

        jQuery("#domain-pricing-form__main").submit(function (e) {
            var val = jQuery(this).find(".domain-pricing-form__textfield").val();
            if (!val) {
                e.preventDefault();
            }
        });
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-domains-pricing.js
// module id = 200
// module chunks = 0