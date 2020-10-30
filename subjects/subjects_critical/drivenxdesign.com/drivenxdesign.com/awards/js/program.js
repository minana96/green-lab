$(function () {
    // var eViewportDimensions = $('<div class="test" style="position:fixed;top:10px;left:10px;width:300px;z-index:1000;background-color:rgba(200, 200, 200, 0.8);">' + 'bod: ' + $('body').width() + '</div>');
    // $('body').prepend(eViewportDimensions);

});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");

    // case insensitive
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"), 
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function dateToYyyyMmmDdHhNnSs(dtValue) {
    if (dtValue && dtValue.getFullYear) {
        dtValue = padNumber(dtValue.getFullYear(), 4) + '-' + months[dtValue.getMonth()].substring(0, 3) + '-' + padNumber(dtValue.getDate(), 2) + ' ' + padNumber(dtValue.getHours(), 2) + ':' + padNumber(dtValue.getMinutes(), 2) + ':' + padNumber(dtValue.getSeconds(), 2) + ':' + padNumber(dtValue.getMilliseconds(), 3);
    }
    return dtValue
}
function dateToYyyyMmDdHhNnSs(dtValue) {
    if (dtValue && dtValue.getFullYear) {
        dtValue = padNumber(dtValue.getFullYear(), 4) + '-' + padNumber((1 + dtValue.getMonth()), 2) + '-' + padNumber(dtValue.getDate(), 2) + ' ' + padNumber(dtValue.getHours(), 2) + ':' + padNumber(dtValue.getMinutes(), 2) + ':' + padNumber(dtValue.getSeconds(), 2) + ':' + padNumber(dtValue.getMilliseconds(), 3);
    }
    return dtValue;
}

function dateToYyyyMmDdHhNn(dtValue) {
    if (dtValue && dtValue.getFullYear) {
        dtValue = padNumber(dtValue.getFullYear(), 4) + '-' + padNumber((1 + dtValue.getMonth()), 2) + '-' + padNumber(dtValue.getDate(), 2) + ' ' + padNumber(dtValue.getHours(), 2) + ':' + padNumber(dtValue.getMinutes(), 2) + ':' + padNumber(dtValue.getSeconds(), 2) + ':' + padNumber(dtValue.getMilliseconds(), 3);
        dtValue = dtValue.substring(0, 16);
    }
    return dtValue;
}

// from angular.js
function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
        neg = '-';
        num = -num;
    }
    num = '' + num;
    while (num.length < digits) num = '0' + num;
    if (trim) {
        num = num.substr(num.length - digits);
    }
    return neg + num;
}
// move <H1> from #contentleft to #content
$(function () {
    if ($('#contentleft > :first-child()').is('h1')) {
        // $('#contentleft > :first-child()').prependTo('#content');
    }
});

// program home slider - documentation - \awards\js\slick-master.js
$(document).ready(function () {
    $('.slider.autoplay').slick({
        lazyLoad: 'ondemand',
        dots: true,
        arrow: false,
        nextArrow: '',
        prevArrow: '',
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        responsive: [{
            breakpoint: 1000,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 850,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 700,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 525,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false
            }
        }, {
            breakpoint: 350,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
            }
        }]
    });
});

// program desktop nav
$(document).ready(function () {
    function megaHoverOver() {
        $(this).find(".sub").stop().fadeTo('fast', 1).show();
        //Calculate width of all ul's
        (function ($) {
            jQuery.fn.calcSubWidth = function () {
                rowWidth = 0;
                //Calculate row
                $(this).find("ul").each(function () {
                    rowWidth += $(this).width();
                });
            };
        })(jQuery);
        if ($(this).find(".row").length > 0) { //If row exists...
            var biggestRow = 0;
            //Calculate each row
            $(this).find(".row").each(function () {
                $(this).calcSubWidth();
                //Find biggest row
                if (rowWidth > biggestRow) {
                    biggestRow = rowWidth;
                }
            });
            //Set width
            $(this).find(".sub").css({ 'width': biggestRow });
            $(this).find(".row:last").css({ 'margin': '0' });
        } else { //If row does not exist...
            $(this).calcSubWidth();
            //Set Width
            $(this).find(".sub").css({ 'width': rowWidth });
        }
    }
    function megaHoverOut() {
        $(this).find(".sub").stop().fadeTo('fast', 0, function () {
            $(this).hide();
        });
    }
    var config = {
        sensitivity: 2, // number = sensitivity threshold (must be 1 or higher)    
        interval: 100, // number = milliseconds for onMouseOver polling interval    
        over: megaHoverOver, // function = onMouseOver callback (REQUIRED)    
        timeout: 500, // number = milliseconds delay before onMouseOut    
        out: megaHoverOut // function = onMouseOut callback (REQUIRED)    
    };

    $("ul#topnav li .sub").css({ 'opacity': '0' });
    $("ul#topnav li").hoverIntent(config);

    // ul.topnav
    $("ul.topnav li .sub").css({ 'opacity': '0' });
    $("ul.topnav li").hoverIntent(config);
});

$(function () {
    $('#cookie-container').click(function () {
        $(this).remove();
    });
});
//# sourceURL=program.js

