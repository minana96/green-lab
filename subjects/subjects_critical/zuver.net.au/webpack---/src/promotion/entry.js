'use strict';

require('jquery');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./wow/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectSideDOM = document.getElementById("wow-select-side");
if (selectSideDOM) {
    _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById("wow-select-side"));
}

function getBgUrl(el) {
    var bg = "";
    if (el.currentStyle) {
        // IE
        bg = el.currentStyle.backgroundImage;
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        // Firefox
        bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
    } else {
        // try and get inline style
        bg = el.style.backgroundImage;
    }
    return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
}

jQuery(document).ready(function () {
    if (jQuery("#wow-start__cta-description-link").length) {
        jQuery("#wow-start__cta-description-link").on('click touch', function () {
            jQuery("html, body").animate({ scrollTop: jQuery("#wow-select-side").position().top }, 1000);
        });
    }
    var image = document.createElement('img');
    if (document.getElementById('wow-start__canvas-image')) {
        image.src = getBgUrl(document.getElementById('wow-start__canvas-image'));
        image.onload = function () {
            if (jQuery("#wow-start__canvas-image").length) {
                if (!jQuery("#wow-start__canvas-image").hasClass('ready')) {
                    jQuery("#wow-start__canvas-image").addClass('ready');
                }
            }
        };
    }
});


//////////////////
// WEBPACK FOOTER
// ./src/promotion/entry.js
// module id = 545
// module chunks = 2