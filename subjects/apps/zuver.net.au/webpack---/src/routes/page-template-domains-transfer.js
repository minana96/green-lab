'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pageTemplateDomainsPricing = require('./page-template-domains-pricing');

exports.default = {
    init: function init() {},
    finalize: function finalize() {

        jQuery('.domain-transfer-how .content__list .content__item').each(function () {
            var content__item = jQuery(this);
            content__item.find('.item__heading').on("click touch", function () {
                jQuery('.domain-transfer-how .content__list .content__item').each(function () {
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

        var carousel = jQuery('#domain-transfer-features__list--mobile');
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
        (0, _pageTemplateDomainsPricing.computeText)(".domain-transfer-search__field", "Enter your domain name here!");
        jQuery(window).resize(function () {
            (0, _pageTemplateDomainsPricing.computeText)(".domain-transfer-search__field", "Enter your domain name here!");
        });

        jQuery("#domain-transfer-search__form-wrapper").submit(function (e) {
            var val = jQuery(this).find(".domain-transfer-search__field").val();
            if (!val) {
                e.preventDefault();
            }
        });

        jQuery("#domain-transfer-ride__link").on("click touch", function (e) {
            if (jQuery(this).attr("href") === "#") {
                e.preventDefault();
                jQuery("html, body").animate({ scrollTop: jQuery("#domain-transfer-features").position().top - 100 }, 1000);
            }
        });
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-domains-transfer.js
// module id = 526
// module chunks = 0