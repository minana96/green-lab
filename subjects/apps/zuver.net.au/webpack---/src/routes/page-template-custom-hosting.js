"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bindEverythingSection = function bindEverythingSection() {
    jQuery(".everything__list--desktop .everything__item").on('click touch', function (e) {
        e.preventDefault();
        var currentItem = jQuery(this);
        var everything__list = currentItem.parent();
        everything__list.find('.everything__item').each(function () {
            var item = jQuery(this);
            if (item.hasClass('everything__item--selected')) {
                item.removeClass('everything__item--selected');
            }
        });
        if (!currentItem.hasClass('everything__item--selected')) {
            currentItem.addClass('everything__item--selected');
        }
        var currentpopup = currentItem.attr('data-popup');
        jQuery('.everything__popup').find('.popup__item').each(function () {
            var popup_item = jQuery(this);
            if (popup_item.hasClass('popup__item--selected')) {
                popup_item.removeClass('popup__item--selected');
            }
        });
        if (!jQuery('#' + currentpopup).hasClass('popup__item--selected')) {
            jQuery('#' + currentpopup).addClass('popup__item--selected');
        }
    });
};
var bindCustomHostingFeaturesMobileSection = function bindCustomHostingFeaturesMobileSection() {
    var carousel = jQuery("#custom-hosting__features--mobile").find('.features__list');
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
};
var bindCustomHostingEverythingMobile = function bindCustomHostingEverythingMobile() {
    jQuery('.everything__column').find('.everything__item').on('click touch', function (e) {
        e.preventDefault();
        jQuery('.everything__column').each(function () {
            var each_column = jQuery(this);
            if (each_column.hasClass('everything__column--open')) {
                each_column.removeClass('everything__column--open');
            }
            if (each_column.find('.everything__item').hasClass('everything__item--selected')) {
                each_column.find('.everything__item').removeClass('everything__item--selected');
            }
        });
        var c = jQuery(this).parent();
        if (!c.hasClass('everything__column--open')) {
            c.addClass('everything__column--open');
        }
        if (!c.find('.everything__item').hasClass('everything__item--selected')) {
            c.find('.everything__item').addClass('everything__item--selected');
        }
    });
};

exports.default = {
    init: function init() {
        bindEverythingSection();
        bindCustomHostingFeaturesMobileSection();
        bindCustomHostingEverythingMobile();
        (0, _common.scrollOnTopNoBorder)();
    },
    finalize: function finalize() {
        jQuery('#banner__button').on('click touch', function (e) {
            e.preventDefault();
            //console.log(1);
            jQuery("html, body").animate({ scrollTop: jQuery("#product-section--custom").position().top }, 1000);
        });
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-custom-hosting.js
// module id = 523
// module chunks = 0