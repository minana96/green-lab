'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: function init() {},
    finalize: function finalize() {
        jQuery('.domain-rego-services').find('.list-content__item').each(function () {
            var listContentItem = jQuery(this);
            listContentItem.find('.item__list').find('.list-item').each(function () {
                var listItem = jQuery(this);
                var itemList = listItem.parent();
                listItem.find('.list-item__top').on('click touch', function (e) {
                    e.preventDefault();
                    itemList.find('.list-item').each(function () {
                        var listItem = jQuery(this);
                        if (listItem.hasClass('list-item--selected')) {
                            listItem.removeClass('list-item--selected');
                        }
                    });
                    var listItemTop = jQuery(this);
                    var curentListItem = listItemTop.parent();
                    if (!curentListItem.hasClass('list-item--selected')) {
                        curentListItem.addClass('list-item--selected');
                    }
                });
            });
        });
        var carousel = jQuery('.domain-rego-testimonials__list');
        carousel.owlCarousel({
            loop: true,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                    mouseDrag: true,
                    touchDrag: true

                },
                768: {
                    items: 3,
                    mouseDrag: false,
                    touchDrag: false,
                    nav: false,
                    dots: false
                }
            }
        });
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-domains-rego.js
// module id = 525
// module chunks = 0