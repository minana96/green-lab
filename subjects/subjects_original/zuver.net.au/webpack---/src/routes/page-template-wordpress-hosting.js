'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('./common');

var bindMoreBenfits = function bindMoreBenfits() {
    jQuery('.common-questions').each(function () {
        var content__item = jQuery(this);
        content__item.find('.common-questions__heading').on("click touch", function () {
            jQuery('.common-questions').each(function () {
                var item = jQuery(this);
                if (item.hasClass('common-questions--open')) {
                    item.removeClass('common-questions--open');
                }
            });
            if (!content__item.hasClass('common-questions--open')) {
                content__item.addClass('common-questions--open');
            }
        });
    });
};
exports.default = {
    init: function init() {
        var carousel = jQuery("#featured-benefit__list");
        carousel.owlCarousel({
            items: 1,
            loop: true,
            nav: false
        });
        jQuery("#featured-benefit__list .dot").on("click touch", function (e) {
            e.preventDefault();
            var slide = jQuery(this).attr("data-dot");
            carousel.trigger('to.owl.carousel', [parseInt(slide), 300]);
        });
        jQuery(".featured-benefit__arrow--right").on("click touch", function (e) {
            e.preventDefault();
            carousel.trigger('next.owl.carousel');
        });
        jQuery(".featured-benefit__arrow--left").on("click touch", function (e) {
            e.preventDefault();
            carousel.trigger('prev.owl.carousel');
        });
        bindMoreBenfits();
        jQuery('#banner__button').on('click touch', function (e) {
            e.preventDefault();
            var mainHeaderHeight = jQuery('.main-header').outerHeight();
            jQuery("html, body").animate({ scrollTop: jQuery("#product").position().top - mainHeaderHeight }, 1000);
        });
        (0, _common.slideToOnLoad)('product');
        (0, _common.scrollOnTopNoBorder)();
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-wordpress-hosting.js
// module id = 531
// module chunks = 0