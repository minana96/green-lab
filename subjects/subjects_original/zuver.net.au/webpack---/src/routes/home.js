'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bindTestimonial = function bindTestimonial() {
    jQuery('.testimonial-nav__item').on("click touch", function () {
        jQuery('.testimonial-list__item').each(function () {
            var item = jQuery(this);
            if (item.hasClass('testimonial-list__item--selected')) {
                item.removeClass('testimonial-list__item--selected');
            }
        });
        jQuery('.testimonial-nav__item').each(function () {
            var item = jQuery(this);
            if (item.hasClass('testimonial-nav__item--selected')) {
                item.removeClass('testimonial-nav__item--selected');
            }
        });
        var selectedSelector = jQuery(this).attr("data-testimonial");
        if (!jQuery('#' + selectedSelector).hasClass('testimonial-list__item--selected')) {
            jQuery('#' + selectedSelector).addClass('testimonial-list__item--selected');
        }
        if (!jQuery(this).hasClass('testimonial-nav__item--selected')) {
            jQuery(this).addClass('testimonial-nav__item--selected');
        }
    });
};
var bindMoreBenfits = function bindMoreBenfits() {
    jQuery('.more-benefits .content__list .content__item').each(function () {
        var content__item = jQuery(this);
        content__item.find('.item__heading').on("click touch", function () {
            jQuery('.more-benefits .content__list .content__item').each(function () {
                var item = jQuery(this);
                if (item.hasClass('content__item--open')) {
                    item.removeClass('content__item--open');
                }
            });
            if (!content__item.hasClass('content__item--open')) {
                content__item.addClass('content__item--open');
            }
        });
    });
};
var bindHostingTabs = function bindHostingTabs() {
    jQuery('.hostings__nav li a').on('click touch', function (e) {
        e.preventDefault();
        jQuery('.hostings__nav li').each(function () {
            var li = jQuery(this);
            if (li.hasClass('selected')) {
                li.removeClass('selected');
            }
        });
        var current = jQuery(this).parent();
        if (!current.hasClass('selected')) {
            current.addClass('selected');
        }
        var current_datatab = jQuery(this).attr('data-tab');
        jQuery(".hostings__tab").each(function () {
            var hosting_tab = jQuery(this);
            if (hosting_tab.hasClass('hostings__tab--open')) {
                hosting_tab.removeClass('hostings__tab--open');
            }
        });
        if (!jQuery('.' + current_datatab).hasClass('hostings__tab--open')) {
            jQuery('.' + current_datatab).addClass('hostings__tab--open');
        }
    });
};
var bindIncludedBenefits = function bindIncludedBenefits() {
    var carousel = jQuery("#included-benefits--mobile").find('.included-benefits__list');
    carousel.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true
    });
};

exports.default = {
    init: function init() {
        bindTestimonial();
        bindMoreBenfits();
        bindHostingTabs();
        bindIncludedBenefits();
    },
    finalize: function finalize() {
        // JavaScript to be fired on the home page, after the init JS

    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/home.js
// module id = 521
// module chunks = 0