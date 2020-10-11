'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scrollOnTopNoBorder = exports.slideToOnLoad = exports.parse_query_string = exports.setGlobalCookie = exports.getCookie = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
//import EventNotification from '../components/shared/EventNotification';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _FAQQuickLink = require('../components/shared/FAQQuickLink');

var _FAQQuickLink2 = _interopRequireDefault(_FAQQuickLink);

var _FAQMobileSidebar = require('../components/shared/FAQMobileSidebar');

var _FAQMobileSidebar2 = _interopRequireDefault(_FAQMobileSidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCookie = exports.getCookie = function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

var setGlobalCookie = exports.setGlobalCookie = function setGlobalCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=." + location.hostname + ";path=/";
};

var parse_query_string = exports.parse_query_string = function parse_query_string(query) {
    var vars = query.split("&");
    var query_string = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[key] === "undefined") {
            query_string[key] = decodeURIComponent(value);
            // If second entry with this name
        } else if (typeof query_string[key] === "string") {
            var arr = [query_string[key], decodeURIComponent(value)];
            query_string[key] = arr;
            // If third or later entry with this name
        } else {
            query_string[key].push(decodeURIComponent(value));
        }
    }
    return query_string;
};
var slideToOnLoad = exports.slideToOnLoad = function slideToOnLoad(id) {
    var query = window.location.search.substring(1);
    if (query) {
        var qs = parse_query_string(query);
        if (qs && (typeof qs === 'undefined' ? 'undefined' : _typeof(qs)) === 'object' && qs.hasOwnProperty('slideto')) {
            var mainHeaderHeight = jQuery('.main-header').outerHeight();
            jQuery("html, body").animate({ scrollTop: jQuery("#" + id).position().top - mainHeaderHeight }, 1000);
        }
    } else {
        jQuery(window).scroll(function (e) {
            e.preventDefault();
        });
        var hash = window.location.hash;
        if (hash) {
            var mainHeaderHeight = jQuery('.main-header').outerHeight();
            jQuery("html, body").animate({ scrollTop: jQuery(hash).position().top - mainHeaderHeight }, 1000);
        }
    }
};
var scrollOnTopNoBorder = exports.scrollOnTopNoBorder = function scrollOnTopNoBorder() {
    var mainHeader = jQuery('#main-header');
    var checkBorder = function checkBorder() {
        var scrollPosition = jQuery(window).scrollTop();
        if (scrollPosition > 0) {
            if (mainHeader.hasClass('main-header--no-border')) {
                mainHeader.removeClass('main-header--no-border');
            }
        } else {
            if (!mainHeader.hasClass('main-header--no-border')) {
                mainHeader.addClass('main-header--no-border');
            }
        }
    };
    jQuery(document).ready(function () {
        checkBorder();
    });
    jQuery(window).scroll(function () {
        checkBorder();
    });
};

var bindEmbeddedFAQ = function bindEmbeddedFAQ() {
    if (jQuery('.embedded-faq').length) {
        jQuery('.embedded-faq__list .list__item').each(function () {
            var list__item = jQuery(this);
            list__item.find('.item__heading').on("click touch", function () {
                var flagToClose = false;
                if (list__item.hasClass('list__item--open')) {
                    flagToClose = true;
                }
                jQuery('.embedded-faq__list .list__item').each(function () {
                    var item = jQuery(this);
                    if (item.hasClass('list__item--open')) {
                        item.removeClass('list__item--open');
                    }
                });
                if (flagToClose === false) {
                    if (!list__item.hasClass('list__item--open')) {
                        list__item.addClass('list__item--open');
                    }
                }
            });
        });
    }
};
var bindPaymentOptions = function bindPaymentOptions() {
    if (jQuery('.product-section').length) {
        var renderPricing = function renderPricing(type, productsection) {
            productsection.find('.product-section__item').each(function () {
                var product_section__item = jQuery(this);
                var link_monthly = product_section__item.attr('data-link-monthly');
                var link_yearly = product_section__item.attr('data-link-yearly');
                var price_per_month = product_section__item.attr('data-per_month');
                var price_per_month_billed_yearly = product_section__item.attr('data-per_month_billed_yearly');
                var price_per_year = product_section__item.attr('data-per_year');
                var item_button = product_section__item.find('.item__button');
                if (type === 'yearly') {
                    //console.log(parseFloat(price_per_month_billed_yearly).toFixed(2));
                    if (parseFloat(price_per_month_billed_yearly) % 1 === 0) {
                        product_section__item.find('.value').text('$' + price_per_month_billed_yearly);
                    } else {
                        product_section__item.find('.value').text('$' + parseFloat(price_per_month_billed_yearly).toFixed(2));
                    }
                    if (parseFloat(price_per_year) % 1 === 0) {
                        product_section__item.find('.item__yearly-dsc').text('(billed at $' + price_per_year + ' per year)');
                    } else {
                        product_section__item.find('.item__yearly-dsc').text('(billed at $' + parseFloat(price_per_year).toFixed(2) + ' per year)');
                    }
                    product_section__item.find('.old-monthly-price').text('$' + price_per_month);
                    item_button.attr('href', link_yearly);
                } else {
                    //console.log(parseFloat(price_per_month_billed_yearly).toFixed(2));
                    if (parseFloat(price_per_month) % 1 === 0) {
                        product_section__item.find('.value').text('$' + price_per_month);
                    } else {
                        product_section__item.find('.value').text('$' + parseFloat(price_per_month).toFixed(2));
                    }
                    if (parseFloat(price_per_month_billed_yearly) % 1 === 0) {
                        product_section__item.find('.item__yearly-dsc').text('($' + price_per_month_billed_yearly + ' per month if billed yearly)');
                    } else {
                        product_section__item.find('.item__yearly-dsc').text('($' + parseFloat(price_per_month_billed_yearly).toFixed(2) + ' per month if billed yearly)');
                    }
                    product_section__item.find('.old-monthly-price').text('');
                    item_button.attr('href', link_monthly);
                }
            });
        };
        jQuery('.product-section__payment-options').each(function () {
            var paymentOptions = jQuery(this);
            paymentOptions.find('.payment-options__list li a').on('click touch', function (e) {
                e.preventDefault();
                var current = jQuery(this);
                paymentOptions.find('.payment-options__list li').each(function () {
                    var li = jQuery(this);
                    if (li.hasClass('selected')) {
                        li.removeClass('selected');
                    }
                });
                if (!current.parent().hasClass('selected')) {
                    current.parent().addClass('selected');
                }

                var productsection = paymentOptions.parent().parent();
                if (current.find('.text').text() === "Pay Yearly") {
                    renderPricing('yearly', productsection);
                } else {
                    renderPricing('monthly', productsection);
                }
            });
        });
        jQuery('.top__save').on('click touch', function () {
            var productsection = jQuery(this).parent().parent().parent();
            renderPricing('yearly', productsection);
            jQuery('.payment-options__list li').each(function () {
                var li = jQuery(this);
                if (li.hasClass('selected')) {
                    li.removeClass('selected');
                }
            });
            if (!jQuery('#payment-options-yearly').hasClass('selected')) {
                jQuery('#payment-options-yearly').addClass('selected');
            }
        });
    }
};
var bindProductTestimonial = function bindProductTestimonial() {
    jQuery('.product-testimonial__slider-nav .slider-nav__list .item').on("click touch", function () {
        jQuery('.product-testimonial__slider-nav .slider-nav__list .item').each(function () {
            var item = jQuery(this);
            if (item.hasClass('selected')) {
                item.removeClass('selected');
            }
        });
        jQuery('.product-testimonial__slider .slider__list .item').each(function () {
            var item = jQuery(this);
            if (item.hasClass('selected')) {
                item.removeClass('selected');
            }
        });
        var selectedSelector = jQuery(this).find('.item__wrapper').attr("data-testimonial");
        if (!jQuery('.product-testimonial__slider .' + selectedSelector).hasClass('selected')) {
            jQuery('.product-testimonial__slider .' + selectedSelector).addClass('selected');
        }
        if (!jQuery(this).hasClass('selected')) {
            jQuery(this).addClass('selected');
        }
    });
};
var bindProductFeatures = function bindProductFeatures() {
    var carousel = jQuery("#features__list--mobile");
    carousel.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true
    });
};
var bindFooterLinks = function bindFooterLinks() {
    jQuery('.main-footer__column').each(function () {
        var mainFooterColumn = jQuery(this);
        mainFooterColumn.find('.column__heading').on('click touch', function () {
            var heading = jQuery(this);
            var headingParent = heading.parent().parent();
            if (!headingParent.hasClass('main-footer__column--open')) {
                headingParent.addClass('main-footer__column--open');
            } else {
                headingParent.removeClass('main-footer__column--open');
            }
        });
    });
};
var bindPopUpInfo = function bindPopUpInfo() {
    jQuery(".popup-info__trigger").on("click touch", function (e) {
        e.preventDefault();
        e.stopPropagation();
        jQuery(".popup-info").each(function () {
            var popup_info = jQuery(this);
            if (popup_info.hasClass("popup-info--open")) {
                popup_info.removeClass("popup-info--open");
            }
        });
        var popupInfo = jQuery(this).parent();
        if (!popupInfo.hasClass("popup-info--open")) {
            popupInfo.addClass("popup-info--open");
        }
    });
    jQuery(".popup-info__close").on("click touch", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var popupInfo = jQuery(this).parent().parent();
        if (popupInfo.hasClass("popup-info--open")) {
            popupInfo.removeClass("popup-info--open");
        }
    });
    jQuery(document).on('click touch', function () {
        jQuery(".popup-info").each(function () {
            var popup_info = jQuery(this);
            if (popup_info.hasClass("popup-info--open")) {
                popup_info.removeClass("popup-info--open");
            }
        });
    });
    jQuery(".popup-info").on("click touch", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });
};
var bindLazyImageOnLoad = function bindLazyImageOnLoad() {
    jQuery('.lazy-image').each(function () {
        var lazyImage = jQuery(this);
        if (!lazyImage.hasClass("loaded")) {
            var largeImage = lazyImage.attr('data-large-image');
            lazyImage.attr('src', largeImage);
            window.setTimeout(function () {
                lazyImage.addClass("loaded");
            }, 300);
        }
    });
};

exports.default = {
    init: function init() {
        // JavaScript to be fired on all pages

        //call normal js
        bindEmbeddedFAQ();
        bindPaymentOptions();
        bindProductTestimonial();
        bindProductFeatures();
        bindFooterLinks();
        bindPopUpInfo();

        //call react
        //ReactDom.render(<EventNotification/>,document.getElementById('app-root--EventNotification'));
        //ReactDom.render(<MainNavigation/>,document.getElementById('app-root--MainNavigation'));
        if (document.getElementById('app-root--FAQ-Quick-Link') && _typeof(document.getElementById('app-root--FAQ-Quick-Link')) === 'object') {
            _reactDom2.default.render(_react2.default.createElement(_FAQQuickLink2.default, null), document.getElementById('app-root--FAQ-Quick-Link'));
        }
        if (document.getElementById('app-root--FAQMobileSidebar') && _typeof(document.getElementById('app-root--FAQMobileSidebar')) === 'object') {
            _reactDom2.default.render(_react2.default.createElement(_FAQMobileSidebar2.default, null), document.getElementById('app-root--FAQMobileSidebar'));
        }
    },
    finalize: function finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        bindLazyImageOnLoad();
    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/common.js
// module id = 22
// module chunks = 0 1 2