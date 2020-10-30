'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _QuickSearchDomainArchived = require('../components/shared/QuickSearchDomainArchived');

var _QuickSearchDomainArchived2 = _interopRequireDefault(_QuickSearchDomainArchived);

var _FullSearchDomainArchived = require('../components/shared/FullSearchDomainArchived');

var _FullSearchDomainArchived2 = _interopRequireDefault(_FullSearchDomainArchived);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    init: function init() {
        jQuery('.services').find('.list-content__item').each(function () {
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
        jQuery('.services__list-nav').find('.list-nav__item').each(function () {
            jQuery(this).find('.item__heading').on("click touch", function () {
                var heading = jQuery(this);
                var item = heading.parent();
                var list = item.parent();
                list.find('.list-nav__item').each(function () {
                    if (jQuery(this).hasClass('list-nav__item--selected')) {
                        jQuery(this).removeClass('list-nav__item--selected');
                    }
                });
                if (!item.hasClass('list-nav__item--selected')) {
                    item.addClass('list-nav__item--selected');
                }
                var selectedTab = heading.attr("data-tab");
                jQuery('.' + selectedTab).parent().find('.list-content__item').each(function () {
                    if (jQuery(this).hasClass('list-content__item--selected')) {
                        jQuery(this).removeClass('list-content__item--selected');
                    }
                });
                if (!jQuery('.' + selectedTab).hasClass('list-content__item--selected')) {
                    jQuery('.' + selectedTab).addClass('list-content__item--selected');
                }
            });
        });

        var carousel = jQuery('.features__list--mobile');
        carousel.owlCarousel({
            loop: true,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                }
            }
        });

        _reactDom2.default.render(_react2.default.createElement(_QuickSearchDomainArchived2.default, null), document.getElementById('app-root--QuickSearchDomain'));
        _reactDom2.default.render(_react2.default.createElement(_FullSearchDomainArchived2.default, null), document.getElementById('app-root--FullSearchDomain'));
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-domains.js
// module id = 527
// module chunks = 0