"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = require("./common");

exports.default = {
    init: function init() {
        $(document).ready(function () {
            $('#carousel_mob').owlCarousel({
                loop: true,

                nav: false,
                autoWidth: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 5
                    }
                }
            });
        });
        (0, _common.scrollOnTopNoBorder)();
    },
    finalize: function finalize() {}
};


//////////////////
// WEBPACK FOOTER
// ./src/routes/page-template-plesk.js
// module id = 529
// module chunks = 0