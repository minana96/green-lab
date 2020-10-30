"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pageTemplateDomainsPricing = require("./page-template-domains-pricing");

exports.default = {
    init: function init() {},
    finalize: function finalize() {
        var carousel = jQuery('#domain-names-features__list--mobile');
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
        (0, _pageTemplateDomainsPricing.computeText)(".domain-names-banner-form__field");
        jQuery(window).resize(function () {
            (0, _pageTemplateDomainsPricing.computeText)(".domain-names-banner-form__field");
        });

        jQuery("#domain-names-banner-form").submit(function (e) {
            var val = jQuery(this).find(".domain-names-banner-form__field").val();
            if (!val) {
                e.preventDefault();
            }
        });
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-domains-names.js
// module id = 524
// module chunks = 0