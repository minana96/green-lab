'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    init: function init() {
        // JavaScript to be fired on all pages
        jQuery('.single-domainname-searchdomain__form').submit(function (e) {
            var form = jQuery(this);
            var textfield = form.find('#current_query');
            var query = textfield.val();
            if (query) {
                query = query.split('.');
                query = query[0];
            }
            var endQuery = form.find('#end_query');
            endQuery.val(query + form.find('#current_tld').val());
        });
        jQuery('.single-domainname-navigation__anchor').on('click touch', function (e) {
            e.preventDefault();
            jQuery('.single-domainname-navigation__anchor').each(function () {
                var current = jQuery(this);
                if (current.hasClass('single-domainname-navigation__anchor--selected')) {
                    current.removeClass('single-domainname-navigation__anchor--selected');
                }
            });

            var navigationItem = jQuery(this);
            if (!navigationItem.hasClass('single-domainname-navigation__anchor--selected')) {
                navigationItem.addClass('single-domainname-navigation__anchor--selected');
            }
            var currentAction = navigationItem.attr('data-action');
            jQuery('#current_action').val(currentAction);
        });

        var placeholder = jQuery('#current_query').attr('placeholder');
        jQuery('#current_query').focus(function (e) {
            e.currentTarget.placeholder = '';
        });
        jQuery('#current_query').blur(function (e) {
            e.currentTarget.placeholder = placeholder;
        });
        jQuery('.single-domainname-searchdomain__form-wrapper').on('click touch', function () {
            jQuery('#current_query').focus();
        });
        jQuery('.single-domainname-searchdomain__tld').on('click touch', function (e) {
            e.stopPropagation();
        });
    },
    finalize: function finalize() {
        // JavaScript to be fired on all pages, after page specific JS is fired

    }
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/single-domainname.js
// module id = 532
// module chunks = 0