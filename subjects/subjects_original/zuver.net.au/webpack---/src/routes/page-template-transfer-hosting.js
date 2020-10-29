'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require('./common');

exports.default = {
    init: function init() {
        jQuery('.page-template-transfer-hosting .step__item').on('click', function () {
            var _this = jQuery(this);
            if (_this.hasClass('step__item--active')) {
                _this.removeClass('step__item--active');
            } else {
                _this.addClass('step__item--active');
            }
        });
        (0, _common.scrollOnTopNoBorder)();
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-transfer-hosting.js
// module id = 530
// module chunks = 0