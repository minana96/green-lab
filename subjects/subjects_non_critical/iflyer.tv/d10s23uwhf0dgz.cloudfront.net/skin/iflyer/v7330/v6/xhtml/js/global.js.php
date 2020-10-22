/*******************************************************/
/*******************************************************/
/*******************************************************/
/*******************************************************/
/*All text, images, and source code utilized in this application are
copyright 2010 77hz, Ltd, a Japanese Corporation and Malek Nasser. This application may
also contain open source libraries, licensed under MIT and/or apache2
licenses. Unauthorized use of any code, in whole or part is strictly
forbidden. 77hz, Ltd. carefully logs all communication with it's
servers. Violators will be persucuted to the maximum extent afforded
by law.*/
/*******************************************************/
/*******************************************************/
/*******************************************************/
/*******************************************************/
if(typeof($iFLYERXAPI)=='undefined'){var $iFLYERXAPI = "https://x-api.iflyer.tv/v1.0";}
/*!
 * Javascript Cookie v1.5.1
 * https://github.com/js-cookie/js-cookie
 *
 * * * * * * * * * Furkan Mustafa, 2013.03.28, Edited for iFLYER Usage
 ***************** Malek, 2015,10,13, Same as furkans changes but now for js.cookie.js instead of jquery.cookie.js
 * * * * * * * * * - Changes reading order of cookies with same key
 * * * * * * * * * - Sets default domain to $iFLYERCookieDomain if set. 
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    var jQuery;
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        try {
            jQuery = require('jquery');
        } catch(e) {}
        module.exports = factory(jQuery);
    } else {
        // Browser globals
        var _OldCookies = window.Cookies;
        var api = window.Cookies = factory(window.jQuery);
        api.noConflict = function() {
            window.Cookies = _OldCookies;
            return api;
        };
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return api.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return api.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(api.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return api.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = api.raw ? s : parseCookieValue(s);
        return isFunction(converter) ? converter(value) : value;
    }

    function extend() {
        var key, options;
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            options = arguments[ i ];
            for (key in options) {
                result[key] = options[key];
            }
        }
        return result;
    }

    function isFunction(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';
    }

    var api = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !isFunction(value)) {
            options = extend(api.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            if (!options.domain && typeof($iFLYERCookieDomain)!=='undefined')
                options.domain = $iFLYERCookieDomain;

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()".
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    api.get = api.set = api;
    api.defaults = {};

    api.remove = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        api(key, '', extend(options, { expires: -1 }));
        return !api(key);
    };

    if ( $ ) {
        $.cookie = api;
        $.removeCookie = api.remove;
    }

    return api;
}));/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);/*
 * jQuery appear plugin
 *
 * Copyright (c) 2012 Andrey Sidorov
 * licensed under MIT license.
 *
 * https://github.com/morr/jquery.appear/
 *
 * Version: 0.3.3
 */
(function($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  }
  var $window = $(window);

  var $prior_appeared;

  function process() {
    check_lock = false;
    for (var index = 0, selectorsLength = selectors.length; index < selectorsLength; index++) {
      var $appeared = $(selectors[index]).filter(function() {
        return $(this).is(':appeared');
      });

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared) {
        var $disappeared = $prior_appeared.not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared = $appeared;
    }
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  }

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      selectors.push(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      };
      return false;
    }
  });
})(jQuery);/*
 in-viewport v0.4.2 | github.com/vvo/in-viewport#license
 lazyload v2.1.3 | github.com/vvo/lazyload#license
*/
(function(e,g){function h(b,a,c){b.attachEvent?b.attachEvent("on"+a,c):b.addEventListener(a,c,!1)}function s(b){var a;return function(){var c=this,d=arguments;clearTimeout(a);a=setTimeout(function(){a=null;b.apply(c,d)},15)}}function t(b){function a(a,k,e){if(!d(g.documentElement,a)||!d(g.documentElement,b))return e?setTimeout(c(a,k,e),0):!1;var f=a.getBoundingClientRect(),l=b.getBoundingClientRect(),h=f.left,n=f.top,p=k,q=k;b===g.body?(p+=g.documentElement.clientWidth,q+=g.documentElement.clientHeight,
l={bottom:b.scrollHeight,top:0,left:0,right:b.scrollWidth}):(h-=l.left,n-=l.top,p+=b.clientWidth,q+=b.clientHeight);if(!(f.right<l.left||f.left>l.right||f.bottom<l.top||f.top>l.bottom)&&n<=q&&h<=p)if(e)r.splice(m.call(r,a),1),e(a);else return!0;else if(e)setTimeout(c(a,k,e),0);else return!1}function c(b,e,d){-1===m.call(r,b)&&r.push(b);return function(){k.push(function(){a(b,e,d)})}}var k=[],r=[],u=b===g.body?e:b,n=s(function(){for(var a;a=k.shift();)a()});h(u,"scroll",n);u===e&&h(e,"resize",n);"function"===
typeof window.MutationObserver&&f(r,b,n);return{b:b,a:a}}function m(b){for(var a=this.length;a--&&this[a]!==b;);return a}function f(b,a,c){function e(a){return-1!==m.call(b,a)}function d(a){return 0<g.call(a.addedNodes,e).length}var f=new MutationObserver(function(a){!0===a.some(d)&&setTimeout(c,0)}),g=Array.prototype.filter;f.observe(a,{childList:!0,subtree:!0})}var c=[];e.inViewport=function(b,a,e){var d=g.body;if(void 0===a||"function"===typeof a)e=a,a={};d=a.container||d;a=a.offset||0;for(var f=
0;f<c.length;f++)if(c[f].b===d)return c[f].a(b,a,e);return c[c.push(t(d))-1].a(b,a,e)};var d=document.documentElement.compareDocumentPosition?function(b,a){return!!(b.compareDocumentPosition(a)&16)}:document.documentElement.contains?function(b,a){return b!==a&&(b.contains?b.contains(a):!1)}:function(b,a){for(;a=a.parentNode;)if(a===b)return!0;return!1}})(window,document);
(function(e){function g(c){-1===m.call(f,c)&&f.push(c)}function h(c){function d(a){var d;if(d="function"===typeof c.src?c.src(a):a.getAttribute(c.src))a.src=d;a["data-lzled"]=!0;b[m.call(b,a)]=null}if(1<arguments.length)return inViewport.apply(void 0,arguments);c=t(c||{});"string"===typeof c.src&&g(c.src);var b=[];return function(a){a.onload=null;a.removeAttribute("onload");a.onerror=null;a.removeAttribute("onerror");-1===m.call(b,a)&&inViewport(a,c,d)}}function s(c){c="HTML"+c+"Element";if(!1!==
c in e){var d=e[c].prototype.getAttribute;e[c].prototype.getAttribute=function(b){if("src"===b){for(var a,c=0,e=f.length;c<e&&!(a=d.call(this,f[c]));c++);return a||d.call(this,b)}return d.call(this,b)}}}function t(c){var d={offset:333,src:"data-src",container:!1},b;for(b in d)void 0===c[b]&&(c[b]=d[b]);return c}function m(c){for(var d=this.length;d--&&this[d]!==c;);return d}var f=["data-src"];e.lazyload2=h;e.lzld=h();s("Image");s("IFrame")})(window,document);/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.14
 */
;(function(k){'use strict';k(['jquery'],function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:0,limit:!0};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}return j})}(typeof define==='function'&&define.amd?define:function(a,b){if(typeof module!=='undefined'&&module.exports){module.exports=b(require('jquery'))}else{b(jQuery)}}));/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.12
 *
 * Requires: jQuery 1.2.2+
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/*
 * waitForImages 1.4.1
 * -------------------
 * Provides a callback when all images have loaded in your given selector.
 * https://github.com/alexanderdickson/waitForImages
 *
 * Copyright (c) 2012 Alex Dickson
 * Licensed under the MIT license.
 */
(function ($) {
    // Namespace all events.
    var eventNamespace = 'waitForImages';

    // CSS properties which contain references to images. 
    $.waitForImages = {
        hasImageProperties: ['backgroundImage', 'listStyleImage', 'borderImage', 'borderCornerImage']
    };

    // Custom selector to find `img` elements that have a valid `src` attribute and have not already loaded.
    $.expr[':'].uncached = function (obj) {
        // Ensure we are dealing with an `img` element with a valid `src` attribute.
        if (!$(obj).is('img[src!=""]')) {
            return false;
        }

        // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
        // Doing it this way works in Firefox.
        var img = new Image();
        img.src = obj.src;
        return !img.complete;
    };

    $.fn.waitForImages = function (finishedCallback, eachCallback, waitForAll) {

        var allImgsLength = 0;
        var allImgsLoaded = 0;

        // Handle options object.
        if ($.isPlainObject(arguments[0])) {
            finishedCallback = arguments[0].finished;
            eachCallback = arguments[0].each;
            waitForAll = arguments[0].waitForAll;
        }

        // Handle missing callbacks.
        finishedCallback = finishedCallback || $.noop;
        eachCallback = eachCallback || $.noop;

        // Convert waitForAll to Boolean
        waitForAll = !! waitForAll;

        // Ensure callbacks are functions.
        if (!$.isFunction(finishedCallback) || !$.isFunction(eachCallback)) {
            throw new TypeError('An invalid callback was supplied.');
        }

        return this.each(function () {
            // Build a list of all imgs, dependent on what images will be considered.
            var obj = $(this);
            var allImgs = [];
            // CSS properties which may contain an image.
            var hasImgProperties = $.waitForImages.hasImageProperties || [];
            // To match `url()` references.
            // Spec: http://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            var matchUrl = /url\(\s*(['"]?)(.*?)\1\s*\)/g;

            if (waitForAll) {

                // Get all elements (including the original), as any one of them could have a background image.
                obj.find('*').andSelf().each(function () {
                    var element = $(this);

                    // If an `img` element, add it. But keep iterating in case it has a background image too.
                    if (element.is('img:uncached')) {
                        allImgs.push({
                            src: element.attr('src'),
                            element: element[0]
                        });
                    }

                    $.each(hasImgProperties, function (i, property) {
                        var propertyValue = element.css(property);
                        var match;

                        // If it doesn't contain this property, skip.
                        if (!propertyValue) {
                            return true;
                        }

                        // Get all url() of this element.
                        while (match = matchUrl.exec(propertyValue)) {
                            allImgs.push({
                                src: match[2],
                                element: element[0]
                            });
                        }
                    });
                });
            } else {
                // For images only, the task is simpler.
                obj.find('img:uncached')
                    .each(function () {
                    allImgs.push({
                        src: this.src,
                        element: this
                    });
                });
            }

            allImgsLength = allImgs.length;
            allImgsLoaded = 0;

            // If no images found, don't bother.
            if (allImgsLength === 0) {
                finishedCallback.call(obj[0]);
            }

            $.each(allImgs, function (i, img) {

                var image = new Image();

                // Handle the image loading and error with the same callback.
                $(image).bind('load.' + eventNamespace + ' error.' + eventNamespace, function (event) {
                    allImgsLoaded++;

                    // If an error occurred with loading the image, set the third argument accordingly.
                    eachCallback.call(img.element, allImgsLoaded, allImgsLength, event.type == 'load');

                    if (allImgsLoaded == allImgsLength) {
                        finishedCallback.call(obj[0]);
                        return false;
                    }

                });

                image.src = img.src;
            });
        });
    };
}(jQuery));!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);
// Magnific Popup v1.0.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=image+ajax+iframe+gallery
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isIE7=b.indexOf("MSIE 7.")!==-1,n.isIE8=b.indexOf("MSIE 8.")!==-1,n.isLowIE=n.isIE7||n.isIE8,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(a,c){if(c===undefined||c===!1)return!0;e=a.split("_");if(e.length>1){var d=b.find(j+"-"+e[0]);if(d.length>0){var f=e[1];f==="replaceWith"?d[0]!==c[0]&&d.replaceWith(c):f==="img"?d.is("img")?d.attr("src",c):d.replaceWith('<img src="'+c+'" class="'+d.attr("class")+'" />'):d.attr(e[1],c)}}else b.find(j+"-"+a).html(c)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',tClose:"Close (Esc)",tLoading:"Loading..."}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="ajax",D,E=function(){D&&a(document.body).removeClass(D)},F=function(){E(),n.req&&n.req.abort()};a.magnificPopup.registerModule(C,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(C),D=n.st.ajax.cursor,w(b+"."+C,F),w("BeforeChange."+C,F)},getAjax:function(b){D&&a(document.body).addClass(D),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),C),b.finished=!0,E(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){E(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var G,H=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,G&&clearInterval(G),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){G&&clearInterval(G),G=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(G),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:H(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(G&&clearInterval(G),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var I,J=function(){return I===undefined&&(I=document.createElement("p").style.MozTransform!==undefined),I};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return J()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var K="iframe",L="//about:blank",M=function(a){if(n.currTemplate[K]){var b=n.currTemplate[K].find("iframe");b.length&&(a||(b[0].src=L),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(K,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(K),w("BeforeChange",function(a,b,c){b!==c&&(b===K?M():c===K&&M(!0))}),w(b+"."+K,function(){M()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var N=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},O=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery",e=Boolean(a.fn.mfpFastClick);n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=O(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?O(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),f=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m),g=e?"mfpFastClick":"click";d[g](function(){n.prev()}),f[g](function(){n.next()}),n.isIE7&&(x("b",d[0],!1,!0),x("a",d[0],!1,!0),x("b",f[0],!1,!0),x("a",f[0],!1,!0)),n.container.append(d.add(f))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowLeft&&e&&n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=N(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=N(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=N(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}}),A()});(function(){'use strict';var f=[];function g(a){f.push(a);1===f.length&&l()}function m(){for(;f.length;)f[0](),f.shift()}if(window.MutationObserver){var n=document.createElement("div");(new MutationObserver(m)).observe(n,{attributes:!0});var l=function(){n.setAttribute("x",0)}}else l=function(){setTimeout(m)};function p(a){this.a=q;this.b=void 0;this.f=[];var b=this;try{a(function(a){r(b,a)},function(a){t(b,a)})}catch(c){t(b,c)}}var q=2;function u(a){return new p(function(b,c){c(a)})}function v(a){return new p(function(b){b(a)})}
function r(a,b){if(a.a===q){if(b===a)throw new TypeError("Promise settled with itself.");var c=!1;try{var d=b&&b.then;if(null!==b&&"object"===typeof b&&"function"===typeof d){d.call(b,function(b){c||r(a,b);c=!0},function(b){c||t(a,b);c=!0});return}}catch(e){c||t(a,e);return}a.a=0;a.b=b;w(a)}}function t(a,b){if(a.a===q){if(b===a)throw new TypeError("Promise settled with itself.");a.a=1;a.b=b;w(a)}}
function w(a){g(function(){if(a.a!==q)for(;a.f.length;){var b=a.f.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0===a.a?"function"===typeof c?e(c.call(void 0,a.b)):e(a.b):1===a.a&&("function"===typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(h){b(h)}}})}p.prototype.g=function(a){return this.c(void 0,a)};p.prototype.c=function(a,b){var c=this;return new p(function(d,e){c.f.push([a,b,d,e]);w(c)})};
function x(a){return new p(function(b,c){function d(c){return function(d){h[c]=d;e+=1;e===a.length&&b(h)}}var e=0,h=[];0===a.length&&b(h);for(var k=0;k<a.length;k+=1)a[k].c(d(k),c)})}function y(a){return new p(function(b,c){for(var d=0;d<a.length;d+=1)a[d].c(b,c)})};window.Promise||(window.Promise=p,window.Promise.resolve=v,window.Promise.reject=u,window.Promise.race=y,window.Promise.all=x,window.Promise.prototype.then=p.prototype.c,window.Promise.prototype["catch"]=p.prototype.g);}());

(function(){'use strict';function h(a){function b(){document.body?a():setTimeout(b,0)}b()};function v(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.g=document.createElement("span");this.f=-1;this.b.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.g.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;";this.b.appendChild(this.h);this.c.appendChild(this.g);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function w(a,b,c){a.a.style.cssText="min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font-size:100px;font-family:"+b+";"+c}function x(a){var b=a.a.offsetWidth,c=b+100;a.g.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.f!==b?(a.f=b,!0):!1}
function y(a,b){a.b.addEventListener("scroll",function(){x(a)&&null!==a.a.parentNode&&b(a.f)},!1);a.c.addEventListener("scroll",function(){x(a)&&null!==a.a.parentNode&&b(a.f)},!1);x(a)};function z(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.variant=c.variant||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"stretch";this.featureSettings=c.featureSettings||"normal"}var B=null;
z.prototype.a=function(a,b){var c=a||"BESbswy",C=b||3E3,k="font-style:"+this.style+";font-variant:"+this.variant+";font-weight:"+this.weight+";font-stretch:"+this.stretch+";font-feature-settings:"+this.featureSettings+";-moz-font-feature-settings:"+this.featureSettings+";-webkit-font-feature-settings:"+this.featureSettings+";",g=document.createElement("div"),l=new v(c),m=new v(c),n=new v(c),d=-1,e=-1,f=-1,q=-1,r=-1,t=-1,p=this;return new Promise(function(a,b){function c(){null!==g.parentNode&&g.parentNode.removeChild(g)}
function u(){if(-1!==d&&-1!==e||-1!==d&&-1!==f||-1!==e&&-1!==f)if(d===e||d===f||e===f){if(null===B){var b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))}B?d===q&&e===q&&f===q||d===r&&e===r&&f===r||d===t&&e===t&&f===t||(c(),a(p)):(c(),a(p))}}h(function(){function a(){if(Date.now()-D>=C)c(),b(p);else{var A=document.hidden;if(!0===A||void 0===A)d=l.a.offsetWidth,e=m.a.offsetWidth,f=n.a.offsetWidth,
u();setTimeout(a,50)}}var D=Date.now();w(l,"sans-serif",k);w(m,"serif",k);w(n,"monospace",k);g.appendChild(l.a);g.appendChild(m.a);g.appendChild(n.a);document.body.appendChild(g);q=l.a.offsetWidth;r=m.a.offsetWidth;t=n.a.offsetWidth;a();y(l,function(a){d=a;u()});w(l,p.family+",sans-serif",k);y(m,function(a){e=a;u()});w(m,p.family+",serif",k);y(n,function(a){f=a;u()});w(n,p.family+",monospace",k)})})};window.FontFaceObserver=z;window.FontFaceObserver.prototype.check=z.prototype.a;}());
if(typeof imgsrvUrl == 'undefined'){
    imgsrvUrl = 'http://images.iflyer.tv';
}
if(typeof $iFLYERAPEX == 'undefined'){
    var $iFLYERAPEX = "http://admin.iflyer.tv/apex/";
}

var myflyer = {
    data: {},
    storableData: ['stard', 'events', 'stard_ids'],
    unAuthenticatedCallsAllowed: ['user'],
    state: {},
    userDataVersion: 0,
    jobQueue: [],
    dataQueue: {},
    templates: {},
    imageServerURL: imgsrvUrl
};
myflyer.execQueue = function(depth) {   // do the next thing in the queue
    if (myflyer.jobQueue.length==0) return;
    if (!depth) depth = 1;
    var task = myflyer.jobQueue.shift();

    if (typeof(task)==='function') {
        task();
    } else if (typeof(task)==='string') {
        eval(b);
    }
    depth++;
    if (depth>=100) {
        console.log('infinite loop prevention');
        return;
    }

}
myflyer.requeue = function(func) {
    myflyer.jobQueue.unshift(func);
}
myflyer.queue = function(func) {
    myflyer.jobQueue.push(func);
}
myflyer.injectJS = function(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function() {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                if (callback) callback();
                    else myflyer.execQueue();
            }
        };
    } else {
        script.onload = function() {
            if (callback) callback();
                else myflyer.execQueue();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
myflyer.injectCSSCode = function(code) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = code;
    } else {
        // Other browsers
        style.innerHTML = code;
    }

    document.getElementsByTagName("head")[0].appendChild( style );
}

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }
        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }
    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}


myflyer.initialize = function($) {
    if (myflyer.$){
        $ = myflyer.$;
    }
    if (typeof($)==='undefined' || !$) {
        if (typeof(jQuery)==='undefined'){ return; }
        if (versionCompare("1.9.0",jQuery.fn.jquery)!=-1) { 
            myflyer.parentjQuery = jQuery;
            myflyer.requeue(myflyer.initialize);
            myflyer.requeue(function () {
                var url = '//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
                myflyer.injectJS(url, function () {
                    myflyer.$ = jQuery.noConflict(true);
                    myflyer.execQueue();
                });
            });
            myflyer.execQueue();
            return;
        } else {
            myflyer.$ = myflyer.parentjQuery = $ = jQuery;
        }
    }
    
    
    var getKeyPath = function(rootitem, keypath) {
        if (!keypath || keypath=='') return rootitem;
        items = keypath.split('.');
        var key = items.shift();
        var loc = rootitem[key];
        if (items.length>0)
            return getKeyPath(loc, items.join('.'));
        return loc;
    }
    
    /* DATA FUNCTIONS */
    myflyer.getdata = function(identifier, successFunction, forcereload) {
        if (!identifier || typeof(identifier)==='undefined') 
            return false;
        
        if (!myflyer.user && myflyer.unAuthenticatedCallsAllowed.indexOf(identifier) == -1) {
            return false;
        }
        
        var parts = identifier.split('.');
        identifier = parts.shift();
        var keypath = parts.join('.');
        
        if (typeof(myflyer.data[identifier])!=='undefined' && !forcereload) {
            if (successFunction)
                successFunction(getKeyPath(myflyer.data[identifier], keypath));
            return getKeyPath(myflyer.data[identifier], keypath);
        }
        
        var testStore = myflyer.store('data_' + identifier);
        if (testStore) {
            myflyer.data[identifier] = testStore;
            if (successFunction)
                successFunction(getKeyPath(myflyer.data[identifier], keypath));
            return getKeyPath(myflyer.data[identifier], keypath);
        }
        
        if (typeof(myflyer.dataQueue[identifier])!=='undefined' && myflyer.dataQueue[identifier].length > 0) {
            myflyer.dataQueue[identifier].push({
                call: successFunction,
                keypath: keypath
                });
            return;
        }
        myflyer.dataQueue[identifier] = [ { call: successFunction, keypath: keypath } ];
        
        myflyer.datacall(identifier, function(data) {
            myflyer.datahooks(identifier, data);
            while (myflyer.dataQueue[identifier].length > 0) {
                var req = myflyer.dataQueue[identifier].shift();
                if (typeof(req.call)==='function') {
                    req.call(getKeyPath(data, req.keypath));
                }
            }
                
            myflyer.execQueue();
        });
    }
    myflyer.datahooks = function(identifier, data) {
        if (data) {
            myflyer.data[identifier] = data;
            myflyer.userDataVersion++;
        }
        if (identifier=='user') {
            myflyer.user = data;
            if (myflyer.user)
                myflyer.restoreState();
            myflyer.parentjQuery(window).trigger('myflyer_loginStatusChanged');
        }
        if (data && myflyer.storableData.indexOf(identifier) != -1) {
            myflyer.store('data_' + identifier, data);
            if (typeof(myflyer.state.dataRevision)==='undefined' || !myflyer.state.dataRevision)
                myflyer.state.dataRevision = myflyer.dataRevision;
        }
        myflyer.saveState();
    }
    myflyer.datacall = function(identifier, successFunction) {
        $.ajax({
            url: $iFLYERAPEX+"my/api.php?m=" + identifier,
            dataType: 'jsonp',
            success: function(data) {
                if (!data || data.error) {
                    if (successFunction)
                        successFunction(false);
                } else {
                    if (successFunction)
                        successFunction(data);
                }
            }
        });
        
    }
    myflyer.flushData = function(identifiers) {
        if (!identifiers) {
            // Flush all star*d and recommended events data
            delete myflyer.data['stard'];
            myflyer.store('data_stard', null);
            delete myflyer.data['events'];
            myflyer.store('data_events', null);
            myflyer.state.dataRevision = false;
            
            myflyer.dataRevision = myflyer.cookie('datarevision');
            myflyer.saveState();
            return;
        }
        if (!(identifiers instanceof Array)) {
            identifiers = [ identifiers ];
        }
        // Flush only identified datas
        for (i = 0; i < identifiers.length; i++) {
            // remove identifiers[i]
            delete myflyer.data[identifiers[i]];
            
        }
    }
    
    /* API FUNCTIONS */
    myflyer.destroyStore = function() {
        if (typeof(window.localStorage)==='undefined' || !window.localStorage) return;
        $.each(window.localStorage, function( key, value ) {
            if (!key.match(/^myflyer_/)) return;
            myflyer.store(key, null, true);
        });
    }
    myflyer.store = function(path, value, dontPrefixNames) {
        if (typeof(dontPrefixNames)==='undefined' || !dontPrefixNames)
            path = 'myflyer_' + path; // prefix them
        if (typeof(window.localStorage)==='undefined' || !window.localStorage) return null;
        if (typeof(value)!=='undefined') {
            if (value!=null) {
                window.localStorage[path] = JSON.stringify(value);
            } else {
                delete window.localStorage[path];
            }
        }
        var itemStr = window.localStorage[path];
        if (!itemStr)
            return false;
        return JSON.parse(itemStr);
    }
    myflyer.saveState = function () {
        if (!myflyer.user)
            return false;
        
        myflyer.state.dataRevision = myflyer.dataRevision;
        myflyer.state.lastsave = Math.round(new Date().getTime() / 1000);
        myflyer.state.user = myflyer.user;
        myflyer.store('state', myflyer.state);
    }
    myflyer.restoreState = function() {
        if (!myflyer.user)
            return false;
        
        var state = myflyer.store('state');
        if (!state)
            return false;
            
        if (state.user.id != myflyer.user.id) {
            // DESTROY
            myflyer.destroyStore();
            return false;
        }
        //if (typeof(state.dataRevision)==='undefined' || !state.dataRevision || state.dataRevision < myflyer.user['data-revision']) {
            //myflyer.destroyStore();
        //}
        myflyer.destroyStore(); // for now distroy the store every time 
        
        myflyer.state = state;
    }
    myflyer.cookie = function(name, value) {
        name = 'myflyer_' + name;
        cookieCache = {};
        // read
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var _key = decodeURIComponent(parts.shift().replace(/\+/g, ' '));
            var _value = decodeURIComponent(parts.join('=').replace(/\+/g, ' '));
            if (typeof(cookieCache[_key])==='undefined' && _value!='' && _value!='deleted')
                cookieCache[_key] = _value;
        }
        if (value) {
            // .. set cookie // .. be careful
            
        }
        return typeof(name)!=='undefined' && name ? cookieCache[name] : cookieCache;
    }
    myflyer.checkState = function(stamp) {
        if (!myflyer.user) {
            return false;
        }
        var cookieStamp = myflyer.cookie('datarevision');
        if (typeof(cookieStamp)==='undefined' || !cookieStamp || myflyer.user['data-revision'] > cookieStamp) {
            cookieStamp = myflyer.user['data-revision'];
        }
        if (typeof(myflyer.dataRevision)==='undefined') {
            myflyer.dataRevision = cookieStamp;
        }
        // var timeOut = Math.round(new Date().getTime() / 1000) - 1800; // 30 minutes.
        // if (myflyer.dataRevision != cookieStamp || myflyer.dataRevision < timeOut) {
        if (myflyer.dataRevision != cookieStamp) {
            myflyer.flushData();
        }
        myflyer.checkStateTimer = setTimeout("myflyer.checkState();", 500);
    }
    
    myflyer.checkLogin = function() {
        myflyer.getdata('user', false, true);
    };
    myflyer.login = function(iframeDivId) {
        var login_popup_url = $iFLYERAPEX+"mini_login.php?product=myflyer"+'&fallback_login='+encodeURIComponent(location.href)+'&ffsup=1';
        if(iframeDivId){
            $('#'+iframeDivId).html("<iframe src='"+login_popup_url+"'></iframe>");
        }else{
            myflyer.login_popup = window.open(login_popup_url, 'myFLYERLogin', 'scrollbars=1,height=450,width=510');
            if (window.focus) {
                myflyer.login_popup.focus();
            }
        }
    };
    myflyer.logout = function(complete) {
        myflyer.datacall('logout', function() {
            myflyer.user = false;
            myflyer.destroyStore();
            myflyer.parentjQuery(window).trigger('myflyer_loginStatusChanged');
            
            if (complete)
                complete();
        });
    };
    
   

    
    /* EVENT HANDLING : star*d, login, logout */
    
    myflyer.parentjQuery(window).bind('myflyer_loginStatusChanged', function() {
        if (myflyer.user) {
            myflyer.checkState();
        }
        if (!myflyer.user) {
            myflyer.data = [];
        }
       
        //window.parent.postMessage({command: "login"}, '*');
    });
    myflyer.parentjQuery(window).bind('message', function(event) { event = event.originalEvent;
        
        if (event.data.command && event.data.command=='login') {
            myflyer.getdata('user', false, true);
        }
        if (event.data.stardwidget && event.data.stardwidget.stard) {
            var object = event.data.stardwidget.id.split(':');
            var starcount = event.data.stardwidget.hasstars;
            
            myflyer.flushData();
        }
    });
    
    myflyer.execQueue();
};

myflyer.queue( myflyer.initialize );
myflyer.queue( function() { myflyer.getdata('user'); } );

myflyer.execQueue();
var start_share_float, scrolled_to_share,/*start_top_float, scrolled_to_content,*/device_type = null;
var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
var iPodAgent = navigator.userAgent.match(/iPhone/i) != null;
var AndroidAgent = navigator.userAgent.match(/Android/i) != null;
var webOSAgent = navigator.userAgent.match(/webOS/i) != null;
function msieversion() {

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
            return true
        else                 // If another browser, return 0
            return false

   return false;
}
var ieOSAgent =  msieversion();
var is_touch_device = 'ontouchstart' in document.documentElement;
var d = new Date();
var $thisMonth = d.getMonth();
var $thisYear = d.getFullYear();
var $thisToday = d.getDate();
var $thisHour = d.getHours();
var logincallback,failfallback = null;
var putiflyer_location = null;
var triggerCheck = new Object();
if(typeof(iewarning)=='undefined'){
    var iewarning = "Internet Explorer is missing updates required to view this site. Click here to update...";
}
if(typeof(devMode)=='undefined'){
    var devMode = false;
}
if(typeof(_langs)=='undefined'){
    var _langs = new Object();
}

if (iPadAgent) {
    device_type = 'iPad mobile';
} else if (iPodAgent) {
    device_type = 'iPhone mobile';
} else if (AndroidAgent) {
    device_type = 'Android mobile';
} else if(ieOSAgent){
    device_type = 'win_ie';
}

var storage, fail, uid;
try {
    uid = new Date;
    (storage = window.localStorage).setItem(uid, uid);
    fail = storage.getItem(uid) != uid;
    storage.removeItem(uid);
    fail && (storage = false);
} catch (e) {
}

if (typeof $iFLYERURL == "undefined") {
    var $iFLYERURL = 'iflyer.tv';
}
if (typeof $iFLYERCACHE == 'undefined') {
    var $iFLYERCACHE = '';
}
if (typeof $iFLYERAPEX == "undefined") {
    var $iFLYERAPEX;
}
if (typeof $iFLYERWIDGETS == "undefined") {
    var $iFLYERWIDGETS;
}

if(typeof $forceMyflyer == "undefined"){
    var $forceMyflyer;
}

if(typeof $cookieNames == "undefined"){
    var $cookieNames = new Object();
    $cookieNames['authentication'] = "ifadminuser";
    $cookieNames['myflyer'] = "myflyeruser";
    $cookieNames['lang'] = "iflyer_lang";
}




$(function () {

	if(device_type){
		$('body').addClass('device_' + device_type);
	}

    if(ieOSAgent){
        $('body').prepend('<div id="browser_alert"><a href="http://www.google.com/chrome">'+iewarning+'</a></div>').addClass('browseralert');
    }

    if(navigator.geolocation){
        $('body').addClass('geo_enabled');
    }

    $('#myflyernav li.onlogin').on('click',function(e){
        if(!$('body').hasClass('myflyer_mode')){
            e.stopImmediatePropagation();
            return false;
        }
    });

    $('#myflyernav li.onmobile').on('click',function(e){
        if(!$('body').hasClass('mobile')){
            e.stopImmediatePropagation();
            return false;
        }
    });

    $('#myflyernav li.ongeo').on('click',function(e){
        if(!$('body').hasClass('geo_enabled')){
            e.stopImmediatePropagation();
            return false;
        }
    });
    
    // if(detectLanguage.substring(0, 2)!=pageLang){
    //     if($('link[hreflang="'+detectLanguage.substring(0, 2)+'"]').length){
    //         $('body').append(`
    //             <aside id="lang_alert"><a href="`+($('#locale [data-lang="'+detectLanguage.substring(0, 2)+'"] a').attr('href'))+`">
    //             `+$('#locale [data-lang="'+detectLanguage.substring(0, 2)+'"] a').html()+`
    //             </a><div class="close">X</div>
    //             </aside>
    //         `);
    //         // in wrong lang and maybe better lang
    //         $('#lang_alert .close').on('click',function(){$('#lang_alert').remove();});
    //     }
    // }


    if (typeof cookielangCountryUrl == "undefined") {
        cookielangCountryUrl = null;
    }

    // if (cookielangCountryUrl == null) {
    //     // no cookie data set for country, go and get
    //     $.ajax({url:'/snippets/set_cookies.php', async:false, success:function (data) {
    //         langCountryUrl = data;
    //     }});
    // }

    putiflyer_location = $.cookie('iflyer_location_'+$iFLYER_COUNTRY+'');
    putiflyer_location_name  = $.cookie('iflyer_location_name_'+$iFLYER_COUNTRY+'');
    if($('[iflyer-update-location]').length){
        $('[iflyer-update-location] [iflyer-location]').on('click',function(e){
            putiflyer_location = $(this).attr('iflyer-location');
            putiflyer_location_name = $(this).attr('iflyer-location')?$(this).html():'';
            $.cookie('iflyer_location_'+$iFLYER_COUNTRY+'',$(this).attr('iflyer-location'),{ path:'/', expires:30, domain:$iFLYERCookieDomain });
            $.cookie('iflyer_location_name_'+$iFLYER_COUNTRY+'',$(this).attr('iflyer-location')?$(this).html():'',{ path:'/', expires:30, domain:$iFLYERCookieDomain });
        });
    }
    

    //checkLogin(); // disabling this as actually want login to be triggered from myflyer

    /*
    // set the page country based on cookie data
    if (langCountryUrl=='/') { // only do this on country-neutral pages
        var keysToCheck = [ 'href', 'ajaxhref', 'src', 'rel','data-ajax-src' ];
        $('[data-LCU="1"]').each(function () {
            for (var i = 0; i < keysToCheck.length; i++) {
                key = keysToCheck[i];
                if ($(this).attr(key)) {
                    var val = $(this).attr(key);
                    if (langCountryUrl!=null && val.length >= langCountryUrl.length && val.indexOf(langCountryUrl)==0)
                        val = val.substr(langCountryUrl.length);
                    $(this).attr('href', (cookielangCountryUrl + val).replace('//', '/'));
                }
            }
            $(this).removeAttr('data-LCU');
        });
        country = $.cookie('iflyer_country');
        
        langCountryUrl = cookielangCountryUrl;
    }
    */

    $('[contry-shortcode]').html(country?country:$iFLYER_COUNTRY);

    $('[data-hover-text]:NOT(.set)').each( function(){ $(this).attr('data-hover-out',$(this).html()) }).on('mouseover',function(){
        $(this).html($(this).attr('data-hover-text'));
    }).on('mouseout click tap',function(){
        $(this).html($(this).attr('data-hover-out'));
    }).addClass('set');

    //$("img.lazy").lazyload({failure_limit : 10});
    //$("img.lazy").on('appear',function(){$(this).addClass('appear');});
    enhancedHeaderSearch();
    init_myflyer_hightlight();
    init_myflyer_friends();

    var ref = getParameterByName('ref');
    if(ref){
        $('a[href*="/eticket/"][href*="iflyer.tv"]').each(function(){
            $(this).attr('href',$(this).attr('href')+"&l="+ref);
        });
    }
    

   trackCodes();

	$('#navi-links, #navi-search').bind('click',function(e){
		if($('#'+$(this).attr('rel')).hasClass('open')){
            $(this).removeClass('open');
			$('#'+$(this).attr('rel')+', #navContainer').removeClass('open');
		}else{
            close_all();
            $(this).addClass('open');
			$('#'+$(this).attr('rel')+', #navContainer').addClass('open');
		}
		e.stopPropagation();
	});

    $('.locale-shortcode').on('click tap',function(e){
        $('.open .iframe_loader').remove();
        close_all();
        $('#locale').addClass('open');
        $(this).addClass('open');
        e.stopPropagation();        
    });



	$('#subnav').bind('click',function(e){
		if($( window ).width()<=979){
			if($('#subnav').hasClass('open')){
				// do nothing as its open
			}else{
                close_all();
				$('#subnav').addClass('open');
                $('#header_style, #header_style_filter, #header_style_holder').addClass('open');
				e.preventDefault();
			}
		}
		e.stopPropagation();
	});

	$('body').bind('click',function(){
        close_all();
	});

	share_float_resize = share_float_scroll = title_float_resize = title_float_scroll = function(){}
	
	if($('#share_float').length){
		share_float_resize = function(){
			start_share_float = $('#share_float').offset().top;
		}
		share_float_resize();
		share_float_scroll = function(){
			if ($(window).scrollTop() > start_share_float && !scrolled_to_share) {
				$('body').addClass('float_mode');
				scrolled_to_share = true;
			}
			if ($(window).scrollTop() <= start_share_float && scrolled_to_share) {
			    $('body').removeClass('float_mode');
			    scrolled_to_share = false;
			}
		}
	}else{
        share_float_resize = function(){
            start_share_float = $('#header').height();
        }
        share_float_resize();
        share_float_scroll = function(){
            if ($(window).scrollTop() > start_share_float && !scrolled_to_share) {
                $('body').addClass('float_mode');
                scrolled_to_share = true;
            }
            if ($(window).scrollTop() <= start_share_float && scrolled_to_share) {
                $('body').removeClass('float_mode');
                scrolled_to_share = false;
            }
        }
    }

	$(window).on('resize',function () {
		share_float_resize();
        check_responsive_imgs();
        //title_float_resize();
	});

	$(window).on('scroll',function () {
		share_float_scroll();
        //title_float_scroll();
        if(!$('body').hasClass('offtop') && $(window).scrollTop() >= 150){
            $('body').addClass('offtop');
        }else if($('body').hasClass('offtop') && $(window).scrollTop() < 150){
            $('body').removeClass('offtop');
        }
        if ($(window).scrollTop() >= $(document).height() - $(window).height() - 100) {
            $(window).trigger('scrolledtobottom');
        }
	});

    

	if(is_touch_device){
        $('body').bind('touchstart',function(e){
            $('body').trigger('interest');
        });
    }else{
        $('body').bind('mousemove',function(){
            $('body').trigger('interest');
        });
    }

    $('body').bind('interest',function(){
        $(this).unbind('interest');
        setTimeout('iCheck()',2000);
    });


    $('#signin').on('click',function () {
        $('#iframelogin iframe').remove();
        if($(this).hasClass('open')){
            return false;
        }
        if (typeof(myflyer)!=='undefined' && myflyer.logout) {
            if (!myflyer.user){
                popuplogin();
                //myflyer.login("iframelogin");
            }else{
                checkLogin();
            }
            return;
        }
        // OLD WAY
        if ($.cookie($cookieNames['myflyer']+'[id]') == null) {
            popuplogin();
        } else {
            checkLogin();
        }
    });

    $('#logout').on('click',function () {
        if (typeof(myflyer)!=='undefined' && myflyer.logout) {
            myflyer.logout(function() {
                checkLogin();
            });
            close_all();
            return;
        }
        // OLD WAY
        if ($.cookie($cookieNames['myflyer']+'[id]') != null) {
            $connect_url = $iFLYERAPEX + 'myflyer/mini_logout.php?logout=1';
            newwindow = window.open($connect_url, 'myFLYERLogin', 'scrollbars=1,height=450,width=510');
            if (window.focus) {
                newwindow.focus()
            }
        } else {
            checkLogin();
        }
        close_all();
    });

    $('[data-geolocation]').on('click',function(e){
        if(!$('body').attr('data-latitude')){
            $(this).addClass('geoloading');
            getgeolocation($(this));
            e.stopImmediatePropagation();
            return;
        }
    });

    $('a[href="#toppage"]').on('click',function(e){
       $("html, body").animate({ scrollTop: 0 }, "slow");
       e.preventDefault();
    })
  

    setup_mini_preview();

    page_refresh();

    $(window).trigger('mainloaded');
    $('body').addClass('mainisloaded');
    $('[trigger-onmain-loaded]').trigger('mainisloaded');

    $('body').append("<iframe src='"+$iFLYERXAPI+'/../login/fb_check.php'+"' width='1' height='1' style='width:1px; height: 1px;position: fixed; bottom: 0px;border: 0px;opacity: 0;'></iframe>" );

    checkFonts();

    $(window).on('touchstart', function(){ updateLastTouchTime();disableHover(); } );
    $(window).on('mousemove', function(){ enableHover(); } ); 
    enableHover();


});

var observerOpenSans;
var observerNotoSans;

checkFonts = function (){

    $("[data-font-onload]").each(function(){
        if($(this).attr('media')!='all'){
            $(this).attr('media','all');
        }
    });

    if($('[data-font-onload="opensans"]').length){
        if(!$('body.withOpenSans').length){
            observerOpenSans = new FontFaceObserver('Open Sans', {});
            observerOpenSans.check(null, 5000).then(function () {
              $('body').addClass('withOpenSans');
              $.cookie('hasopensans',1,{ path:'/', expires:1, domain:$iFLYERCookieDomain });
            }, function () {
              debug('Open Sans is not available after waiting 5 seconds');
            });
        }
    }
    if($('[data-font-onload="notosansjapanese"]').length){
        if(!$('body.withNotoSans').length){
            observerNotoSans = new FontFaceObserver('Noto Sans Japanese', {});
            observerNotoSans.check(null, 5000).then(function () {
              $('body').addClass('withNotoSans');
              $.cookie('hasnotosans',1,{ path:'/', expires:1, domain:$iFLYERCookieDomain });
            }, function () {
              debug('Noto Sans Japanese is not available after waiting 5 seconds');
            });
        }
    }
}

trackCodes = function(){
    iftvtack = getParameterByName('iftv_track');
    if(iftvtack){
        $('[href*="counter.iflyer.tv"]').each(function(){
            var oldtrackid = getParameterByName('trackid',$(this).attr('href'));
            if(oldtrackid){
                $(this).attr('href',$(this).attr('href').replace('trackid='+oldtrackid,'trackid='+oldtrackid+iftvtack));
            }
        });
    }
}

check_responsive_imgs = function(){
    $('[data-responsive_img]').each(function(){
        var change = $(this).attr('data-responsive_img');
        var thisImg = $(this).attr('data-img');
        if($( window ).width()<=500){
            thisImg = $(this).attr('data-img-fromthinmobile')?$(this).attr('data-img-fromthinmobile'):($(this).attr('data-img-frommobile')?$(this).attr('data-img-frommobile'):($(this).attr('data-img-fromthin')?$(this).attr('data-img-fromthin'):thisImg));
        }else if($( window ).width()<=663){
            thisImg = $(this).attr('data-img-frommobile')?$(this).attr('data-img-frommobile'):($(this).attr('data-img-fromthin')?$(this).attr('data-img-fromthin'):thisImg);
        }else if($( window ).width()<=1450){
            thisImg = $(this).attr('data-img-fromthin')?$(this).attr('data-img-fromthin'):thisImg;
        }
        $(this).css(change,'url('+thisImg+')');
    });
}

popuplogin = function (callback,force){
    if(callback){
        logincallback = callback;
    }
    $connect_url = $iFLYERAPEX + 'mini_login.php?product=myflyer'+'&fallback_login='+encodeURIComponent(location.href)+'&ffsup=1';

    if( $('.mfp-login').length ){
        return;
    }

    $.magnificPopup.open({
      items: {
        src: $connect_url
      },
      disableOn: 0,
      type: 'iframe',
      mainClass: 'mfp-login',
      removalDelay: 160,
      preloader: false,
      
      modal: force?true:false
    });
    /*
    .magnificPopup({
        fixedContentPos: false,
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
    */
    /*
    newwindow = window.open($connect_url, 'myFLYERLogin', 'scrollbars=1,height=450,width=510');
    if (window.focus) {
        newwindow.focus()
    }
    */
}



ajax_loader = function(){
    $('[data-ajax-src]:NOT(.set)').each(function(){
        var bind_with = 'click';
        if($(this).is("[data-ajax-hover]")){
            bind_with = 'mouseover';
        }
        if($(this).is("[data-ajax-triggeron]")){
            bind_with = $(this).attr("data-ajax-triggeron");
        }
        $(this).on(bind_with,function(e){
            var ajax_url = $(this).attr('data-ajax-src');
            if(!$(this).is("[data-ajax-remote]")){
                ajax_url = /*$iFLYERCACHE+*/ajax_url  /*var host = $.browser.msie ? $iFLYERNOCACHE : $iFLYERCACHE; NOTE: MS might have a problem */
            }
            if($(this).is("[data-geolocation-add]")){
                ajax_url += $('body').attr('data-latitude')+':'+$('body').attr('data-longitude')+'/';
            }
            if($(this).is("[data-ajax-src-append]")){
                ajax_url += $(this).attr('data-ajax-src-append')+'/';
            }
            if($(this).hasClass('loading')){
                return true;
            }
            if(!$(this).is("[data-ajax-multi]") && $(this).hasClass('loaded')){
                return true;
            }
            $(this).addClass('loading');
            if($(this).hasClass('load-more')){
                $(this).html('');
                var thisme = $(this);
                var svgtimeout = setTimeout(function() {
                    thisme.html('<svg class="spinner" width="100%" height="100%" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="3" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>');
                }, 500);
            }
            $.ajax({
                type:"GET",
                url:ajax_url,  
                dataType:"html",
                context: $(this),
                success:function (data) {
                    $(this).addClass('loaded').removeClass('loading');
                    if($(this).is('[data-ajax-append]')){
                        $('#'+$(this).attr('data-ajax-append')).append( data ).addClass('loaded').removeClass('loading');
                    }else if($(this).is('[data-ajax-replace]')){
                        $('#'+$(this).attr('data-ajax-replace')).html( data ).addClass('loaded').removeClass('loading');
                    }else{
                        $(this).html(data);
                    }
                    if($(this).is("[data-ajax-removeme]")){
                        $(this).remove();
                    }
                    if($(this).hasClass('load-more')){
                        clearTimeout(svgtimeout);
                        $(this).html('');
                    }
                    page_refresh();
                    if($(this).attr("data-ajax-callback")){
                        window[$(this).attr("data-ajax-callback")]();
                    }
                },
                error:function () {
                    $(this).addClass('error').removeClass('loading');
                },
                statusCode: {
                    404: function() {
                      $(this).addClass('error').removeClass('loading');
                    }
                }
            });
        });
    }).addClass('set');
}

/*
loadLocalObjects = function () {
    $('.local_data').each(function () {
        if (window[$(this).attr('data-reset')]) {
            window[$(this).attr('data-reset')]();
        }
        $(this).html('').addClass('waiting');
        $(this).addClass('waiting');
        localDataReset($(this).attr('data-location') + $.lastcookie('region_name') + '/', $(this), 'reset');
    })
    $('.local_data_reset').each(function () {
        if (window[$(this).attr('data-reset')]) {
            window[$(this).attr('data-reset')]();
        }
        $(this).addClass('waiting');
        localDataReset($(this).attr('data-location') + $.lastcookie('region_name') + '/', $(this), 'replace');
    });
}
*/
/*
localDataReset = function(url, elem, action) {
    $.ajax({
        type:"GET",
        url:url,
        dataType:"html",
        context: elem,
        success:function (data) {
            //return;
            if (action == 'replace') {
                $(this).replaceWith(data);
                if (window[$(this).attr('data-refresh')]) {
                    window[$(this).attr('data-refresh')]();
                }
                $('body').trigger($(this).attr('id')+'_loaded');
                page_refresh(); //MALEKNOTE??
            } else {
                if($(this).attr('quick-load')){
                    $(this).html(data);
                    $(this).removeClass('waiting');
                    if (window[$(this).attr('data-refresh')]) {
                        window[$(this).attr('data-refresh')]();
                    }
                    $('body').trigger($(this).attr('id')+'_loaded');
                }else{
                    $(this).html(data).waitForImages(function () {
                        $(this).removeClass('waiting');
                        if (window[$(this).attr('data-refresh')]) {
                            window[$(this).attr('data-refresh')]();
                        }
                        $('body').trigger($(this).attr('id')+'_loaded');
                    });
                }
                page_refresh(); //MALEKNOTE??
            }

        }
    });
}
*/


ajaxLoadMore = function() {
    $('.ajaxloadmore:NOT(.set)').on('click',function (e) {
        var multi_loader = $(this).hasClass('multi_loader')?true:null;
        if (!$(this).attr('recheck') && !multi_loader) {
            $(this).unbind('click');
        }
        var wipe_html = $(this).hasClass('wipehtml');
        if (wipe_html) {
            $(myloadTo).html('<div class="section_load">LOADING...</div>');
        }
        $(this).addClass('loading');
        var myloadTo = '#' + $(this).attr('rel');
        var myloadSrc = $(this).attr('src');
        var mykey = $(this).attr('key');
        var mytypeid = $(this).attr('typeid');
        var mysubject = $(this).attr('subject');
        var myaction = $(this).attr('action');
        if (myaction) {
            myloadSrc = myloadSrc + 'action-' + myaction + '/';
        }
        if (mykey) {
            myloadSrc = myloadSrc + 'key-' + mykey + '/';
        }
        if (mytypeid) {
            myloadSrc = myloadSrc + 'typeid-' + mytypeid + '/';
        }
        if (mysubject) {
            myloadSrc = myloadSrc + 'subject-' + mysubject + '/';
        }
        /*var host = $.browser.msie ? $iFLYERNOCACHE : $iFLYERCACHE;*/
        var finalurl = /*host +*/ '/';
        if (myloadSrc.indexOf(langCountryUrl)!=0 && myloadSrc.indexOf('/' + pageLang + '/')!=0)
            finalurl = finalurl + langCountryUrl.replace(/^\/+/g,'');
        finalurl = finalurl + myloadSrc.replace(/^\/+/g,'');
        $.ajax({
            type:"GET",
            url:finalurl,
            dataType:"html",
            context: $(this),
            success: function (data) {
                if (data.substr(0, 8) == 'nochange') {
                    // do nothing
                } else if (data.substr(0, 5) != 'error') {
                    var wipe_html = $(this).hasClass('wipehtml');
                    var prepend_html = $(this).hasClass('prependhtml')?true:null;
                    var on_complete = $(this).attr('oncomplete')?$(this).attr('oncomplete'):null;
                    var myloadTo = '#' + $(this).attr('rel');
                    var multi_loader = $(this).hasClass('multi_loader')?true:null;

                    if (wipe_html) {
                        $(myloadTo).html(data);
                    } else if (prepend_html) {
                        $(myloadTo).prepend(data);
                    } else {
                        $(myloadTo).append(data);
                        $('body').trigger(myloadTo+'_append');
                    }
                    page_refresh();
                    if (!multi_loader) {
                        $(this).remove();
                    }
                    if (on_complete) {
                        window[on_complete]();
                    }
                } else {
                    $(this).removeClass('loading');
                    $(this).addClass('error');
                    $(this).html(data);
                }
            }
        });
    }).addClass('set');

    $(window).unbind('scrolledtobottom');
    $(window).bind('scrolledtobottom', function () {
        $(window).unbind('scrolltobottom');
        $('.ajaxloadmore.autoloadmore, .autoload .ajaxloadmore').trigger('click');
    });

}


getgeolocation = function(clickmeafter){
    if (navigator.geolocation) {
    console.log('geo start');
      navigator.geolocation.getCurrentPosition(
        function(position){
            console.log(position)
            $('body').attr('data-latitude',position.coords.latitude).attr('data-longitude',position.coords.longitude);
            if(typeof clickmeafter != 'undefined'){
                clickmeafter.removeClass('geoloading');
                clickmeafter.trigger('click');
            }
        }
        ,
        function(msg){
            $('.geoloading').removeClass('geoloading').addClass('geoerror');
            console.log(msg);
        }
        , {enableHighAccuracy:true, timeout:5000}
        );
    } else {
      $('.geoloading').removeClass('geoloading').addClass('geoerror');
      console.log('not supported');
    }
}


iframe_loader = function(){
    $('[data-iframe-src]:NOT(.set)').each(function(){
        var bind_with = 'click';
        if($(this).is("[data-iframe-hover]")){
            bind_with = 'mouseover';
        }
        $(this).on(bind_with,function(e){
            var iframe_url = $(this).attr('data-iframe-src');
            if(!$(this).attr('data-iframe-target')){
                var target = "#"+$(this).attr('id');
            }else{
                var target = '#'+$(this).attr('data-iframe-target');
            }
            /*if($(this).hasClass('loading')){
                return true;
            }*/

            /*
            if(!$(this).is("[data-iframe-multi]")  && $(this).hasClass('loaded') ){
                return true;
            }
            $(this).addClass('loaded');
            */

            if(!$(this).is("[data-iframe-reload]")  && $(target+" .iframe_loader").length ){
                return true;
            }

            /*if(!$(this).is("[data-iframe-multi]")  && $(target+" .iframe_loader").length ){
                return true;
            }*/

            var data = "<iframe src='"+iframe_url+"' class='iframe_loader loading' "+($(this).is("[data-iframe-distroy-mobile]")?'iframe-distroy-mobile':'')+" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
            $(target).html( data );

            $(target+' iframe').load(function(){
                $(this).show();
                $(this).removeClass('loading');
            });


        });
    }).addClass('set');
}

json_loader = function(){
    $('[data-json-src]:NOT(.set)').each(function(){
        var bind_with = 'click';
        if($(this).attr("data-json-trigger")){
            bind_with = $(this).attr("data-json-trigger");
        }
        $(this).on(bind_with,function(e){
            $(this).trigger('json-loader-start');
            var json_url = $(this).attr('data-json-src');
            var json_callback = function(data){ if(!data.error){$(this).trigger('json-loader-success',data);}else{$(this).trigger('json-loader-error');} };
            $.ajax({
                type:'GET',
                url:json_url,
                dataType:"json",
                success: json_callback,
                context: $(this),
                   xhrFields: {
                      withCredentials: true
                   }
            });
                
        });
    }).addClass('set');
}




button_toggle = function(){

    $('[is-opener-toggle]:NOT(.set)').each(function(){
        var bind_with = 'click';
        if($(this).is("[is-opener-toggle-hover]")){
            bind_with = 'mouseover';
        }
        $(this).on(bind_with,function(e){
            e.preventDefault();

            if($(this).attr('is-opener-toggle')){
                // tab mode
                if($(this).hasClass('open-toggle')){
                    return false;
                }else{
                    $(".open-toggle[is-opener-toggle='"+$(this).attr('is-opener-toggle')+"']").each(function(){
                        $('#'+$(this).attr('also-open')).removeClass('open-toggle');
                        $(this).removeClass('open-toggle');
                    });
                }
            }

            if(!$(this).hasClass('open-toggle')){
                $(this).addClass('open-toggle').trigger('open-toggle');
                if($(this).attr('also-open')){
                    $('#'+$(this).attr('also-open')).addClass('open-toggle').trigger('open-toggle');
                }
            }else{
                $(this).removeClass('open-toggle');
                if($(this).attr('also-open')){
                    $('#'+$(this).attr('also-open')).removeClass('open-toggle');
                }
            }
            e.stopPropagation();
        });
    }).addClass('set');

}

close_all = function(){
    $('.mobile .open .iframe_loader[iframe-distroy-mobile]').remove();
    $('.open').removeClass('open');
}

var mytimers = new Object();

page_refresh = function(){

    $("img.lazy:NOT(.lset), .lazy-div:NOT(.lset)").each(function(){
        if($(this).attr('data-original')){
            if($(this).attr('data-original').indexOf("/.")!==-1){
                $(this).addClass('lset').addClass('noimg'); /// these are broken imgserv urls
            }
        }
    });

    $("img.lazy:NOT(.lset), .lazy-div:NOT(.lset)").lazyload({
        failure_limit : 1000, 
        load : function(){$(this).addClass('is-lazy-loaded')} /*,effect : "fadeIn"*/
    }).addClass('lset');


    $('[data-hover]:NOT(.h1set)').on('mouseover',function(){
        if($(this).attr('data-original')){
            $(this).css("background-image","url("+$(this).attr('data-hover')+")");
        }
    }).addClass('hoverset');

    $('[data-hover]:NOT(.houtset)').on('mouseout',function(){
        if($(this).attr('data-original')){
            $(this).css("background-image","url("+$(this).attr('data-original')+")");
        }
    }).addClass('houtset');
    
    /*$("img.lazy").lazyload({
        container: $("#event_wall")
    });*/

    /*
    $("img.lazy, .lazy-div").lazyload({failure_limit : 1000, placeholder:"",event: 'touchLoad',
                load : function(){$(this).addClass('is-lazy-loaded')} /*,effect : "fadeIn"});
    */
    guestController();
    linkPopout();
    ajax_loader();
    iframe_loader();
    json_loader();
    button_toggle();
    //loadLocalObjects();
    ajaxLoadMore();
   

    /*
    if(putiflyer_location){
        $('a[iflyer-append-location]:NOT(.lset), [iflyer-append-location] a:NOT(.lset)').each(function(){
            $(this).attr('href',$(this).attr('href')+putiflyer_location);
        }).addClass('lset');
        $('[iflyer-append-location-ajax]:NOT(.lset)').each(function(){
            $(this).attr('data-ajax-src',$(this).attr('data-ajax-src')+putiflyer_location);
        }).addClass('lset');
    }
    if(putiflyer_location_name && $("[iflyer-display-location]").length){
        $("[iflyer-display-location]").html(putiflyer_location_name);
    }
    */


    $('.closeme:NOT(.set)').on('click',function(e){
        close_all();
        e.preventDefault();
    });

    $('[is-opener]').on('click',function(e){
        if(!$(this).hasClass('open')){
            close_all();
            $(this).addClass('open');
            if($(this).attr('also-open')){
                $('#'+$(this).attr('also-open')).addClass('open');
            }
        }else{
            close_all();
        }
        e.stopPropagation();
    }).removeAttr('is-opener');

    $('[interest]:NOT(.nnset)').bind('click',function(e){
        $('body').append("<iframe src='"+$iFLYERAPEX + 'plugins/log_nearnow.php?nn='+$(this).attr('interest')+"' width='1' height='1' style='width:1px; height: 1px;'></iframe>" );
    }).addClass('nnset');

    

    $('[stop-propagation]').bind('click',function(e){
        e.stopPropagation();
    }).removeAttr('stop-propagation');

    /*
    $(".rippler:NOT(.rset)").rippler({
        effectClass      :  'rippler-effect'
        ,effectSize      :  16      // Default size (width & height)
        ,addElement      :  'svg'   // e.g. 'svg'(feature)
        ,duration        :  100
    }).addClass('rset');*/
    side_scrollers();

    enable_stard_buttons();

    

    
    update_stard_status();

    image_flickers();

    myflyer_required_setup();

    facebook_required_setup();
    enable_facebook_rsvp();

    if(typeof(enable_stard_suggestions)=='function'){
        setTimeout(function(){enable_stard_suggestions()},2000);
    }

    popup_images();

    data_class_rotates();

    soundcloudpolyfill()

    $('body').trigger('reevaluate_page');

    getads();

}

soundcloudpolyfill = function(){
    $('.scpolyfill:NOT(.scset)').on('click',function(e){
        var sc = $('#'+$(this).attr('rel-id'));
        if($(this).hasClass('loadedok')){return false;}
        if(!sc.attr('src')){return;}
        sc.attr('src',sc.attr('data-src'));
    }).addClass('scset');
}

data_class_rotates = function(){

    $('[data-rotate-class]:NOT(.rset)').each(function(){
        var data = JSON.parse($(this).attr('data-rotate-class'));
        data.id = $(this).attr('id');
        $(this).attr('data-rotate-current',0);
        if(data){
            mytimers[data.class] = setInterval(function (data) {
                var  me = $('#'+data.id);
                current = parseInt(me.attr('data-rotate-current'));
                me.removeClass(data.class+'_'+current);
                current ++;
                if(current>=data.slides){
                    current = 0;
                }
                me.attr('data-rotate-current',current);
                me.addClass(data.class+'_'+current);
            }, data.delay , data);
        }
    }).addClass('rset');

}

myflyer_required_setup = function(){
    $('a[myflyer-required]:NOT(.set),.myflyer-required a:NOT(.set),[myflyer-required-button]:NOT(.set)').on('click',function(e){
        myflyer.checkLogin();
        if(!myflyer.user){
            e.preventDefault();
            e.stopImmediatePropagation();
            var passme = $(this);
            callback = function(){if($('.mfp-login').length){$.magnificPopup.close();}passme.trigger('click');}
            popuplogin(callback);
            /*
            if(e.which==1 && !$('body').hasClass('mobile')){
                popuplogin(callback);
            }else{
                $(window).scrollTop(0);
                logincallback = callback;
                $('#signin').trigger('click');
            }*/
            return false;
        }else{
            if(!$(this).hasClass('popupset') && $(this).attr('href')!='#'){
                location.href=$(this).attr('href');
            }
        }
    }).addClass('set');
}

facebook_required_setup = function(){
    $('a[facebook-required]:NOT(.fbset),.facebook-required a:NOT(.fbset),[facebook-required-button]:NOT(.fbset)').on('click',function(e,options){
        if(options && options.passed_facebook){
            debug('ok');
            return true;
        }
        var passme = $(this);
        myflyer.checkLogin();
        if(!myflyer.user){
            e.preventDefault();
            e.stopImmediatePropagation();
            callback = function(){if($('.mfp-login').length){$.magnificPopup.close();}passme.trigger('click');}
            popuplogin(callback);
            return false;
        }else{
            callback = function(){passme.trigger('click');}
            xapi('me/?fields=facebook,graph.permissions('+($(this).attr('facebook-required-perms')?$(this).attr('facebook-required-perms'):1)+').token_status(1)',null,null,null,$(this));
        }
    }).on('xapi-success',function(x,y){
        var facebook_ok = true;
        if(!y.facebook || !y.graph || y.graph.token_status!=true){
            debug('No facebook or old token');
            facebook_ok = false;
        }else if($(this).attr('facebook-required-perms')){
            if(!y.graph.permissions){
                debug('No perms');
                facebook_ok = false;
            }else{
                for (var key in y.graph.permissions) {
                    if(y.graph.permissions[key]!="granted"){
                        debug('Failed '+key);
                        facebook_ok = false;
                    }
                }
            }
        }
        if(facebook_ok){
            $(this).trigger('click',[{'passed_facebook':true}]);
        }else{
            popoutWIndow($iFLYERAPEX+'includes/facebook_check.php','scrollbars=1,height=450,width=510');
            // load facebook popup...
        }
    }).addClass('fbset')

}

var facebook_rsvp_init = new Object();


update_facebook_rsvp = function(data){
    if(data && data.attending){
        $('[facebook-rsvp-id="'+data.id+'"]').attr('facebook-rsvp-counter',data.attending.total).removeClass('starding').removeClass('unstarding');
        if(data.success || (data.attending.data && data.attending.data.length==1)){
            $('[facebook-rsvp-id="'+data.id+'"]').addClass('isstard');
            if(myflyer.user){
                $.cookie('facebook-rsvp-id-'+data.id+'-'+myflyer.user.id,1,{ path:'/', domain:$iFLYERCookieDomain }); // add a session for this value so loads faster
            }
        }
        if(data.success){
            // need to update event at this point as numbers will have changed
            xapi('event:'+data.id+'/update-graph');
        }
    }
}

enable_facebook_rsvp = function(){
    // grab all the events we should check...
    $('[facebook-rsvp-id]:NOT(.frset)').each(function(){
        if(!facebook_rsvp_init[$(this).attr('facebook-rsvp-id')]){ // dont do twice if a couple of the same events ont he page
            if(myflyer.user){
                if($.cookie('facebook-rsvp-id-'+$(this).attr('facebook-rsvp-id')+'-'+myflyer.user.id)){
                    $('[facebook-rsvp-id="'+$(this).attr('facebook-rsvp-id')+'"]').addClass('isstard');
                }
            }
            xapi('event:'+$(this).attr('facebook-rsvp-id')+'?fields=attending.find(me)',null,null,update_facebook_rsvp);
        }
        facebook_rsvp_init[$(this).attr('facebook-rsvp-id')] = 1;
    }).addClass('frset');
    $('[facebook-rsvp-button]:NOT(.facebook_rsvp_ready)').on('click',function(e){
        if($(this).hasClass('starding') || $(this).hasClass('unstarding') || !$(this).attr('facebook-rsvp-id')){
            return false; // already stard or lacking data
        }
        myflyer.checkLogin();
        if($(this).hasClass('isstard')){
            if(!myflyer.user){
                // not logged in... should not be showing stard
                wipe_myflyer();
                return false;
            }
            return false; // we dont support removing rsvp currently
        }else{
            // if user is not logged in we are going to have to log them in first somehow.... then on success re click this button
            failfallback = logincallback = null;
            $(this).addClass('starding');
            var passme = $(this);
            callback = function(){ if($('.mfp-login').length){$.magnificPopup.close();}passme.trigger('click');}
            if(!myflyer.user){
                // scroll to top of page and ask to login
                popuplogin(callback);
                return false;
            }
            xapi('event:'+$(this).attr('facebook-rsvp-id')+'/attending','POST',null,update_facebook_rsvp);

        }
    }).addClass('facebook_rsvp_ready');
    
}


side_scrollers = function(){
    $(".side_scroller[data-enable-wheel]:NOT(.set)").mousewheel(function(event, delta) {
        var old = this.scrollLeft
        this.scrollLeft -= (delta * ($(this).attr('data-scrollspeed')?$(this).attr('data-scrollspeed'):30));
        if(this.scrollLeft!=old){
            event.preventDefault();
        }
    }).addClass('set');
    $(".side_scroller:NOT(.lazyset)").each(function(){
        var thisscrollset = $(this).attr('id');
        $('#'+thisscrollset+' img.lazy,'+'#'+thisscrollset+' .lazy-div').lazyload({
            container: $('#'+thisscrollset),
            load : function(){$(this).addClass('is-lazy-loaded');}
        });
        if($('#'+thisscrollset+" .lazy-div").length){
            $('#'+thisscrollset+' .lazy-div').lazyload({
                container: $('#'+thisscrollset),
                event: 'touchLoad',
                load : function(){$(this).addClass('is-lazy-loaded');}
            });
            $('#'+thisscrollset).on('scroll',function(){
                $('#'+thisscrollset+" .lazy-div:NOT(.is-lazy-loaded)").each(function(){ 
                    if($(this).is(':appeared')){
                        $(this).trigger('touchLoad');
                    }
                });
                if(!$('#'+thisscrollset+" .lazy-div:NOT(.is-lazy-loaded)").length){
                    $('#'+thisscrollset).off('scroll').addClass('all-lazy-loaded');
                }
            });
        }
        $('#'+thisscrollset).on('scroll',function(){
            $(this).parent().trigger('scroll');
        });
    }).addClass('lazyset');
    $(".side_scroller[data-scroll-nav]:NOT(.naviset)").each(function(){
        if(!$(this).hasHorizontalScrollBar()){
            return;
        }
        $(this).parent().prepend("<nav class='scrollnav'><div class='prev'></div><div class='next'></div></nav>");
        $(this).parent().find('nav div').on('click',function(){
            if($(this).parent().hasClass('scrolling')){
                $(this).parent().parent().find('.side_scroller').stop().trigger('scroll');
            }
            $(this).parent().addClass('scrolling');
            var scrollme = $(this).parent().parent().find('.side_scroller');
            var scrollwidth =  $(this).parent().parent().width();
            if($(this).hasClass('prev')){
                scrollme.animate({scrollLeft: scrollme.scrollLeft()-(scrollwidth)},500,function(){
                    $(this).parent().find('nav').removeClass('scrolling').trigger('scroll');
                });
            }else{
                scrollme.animate({scrollLeft: scrollme.scrollLeft()+(scrollwidth)},500,function(){
                    $(this).parent().find('nav').removeClass('scrolling').trigger('scroll');
                });
            }
            
        });
        $(this).addClass('naviset');
    });
    $(".maybescroll:NOT(.lazyset)").each(function(){
        var thisscrollset = $(this).attr('id');
        $('#'+thisscrollset+' img.lazy,'+'#'+thisscrollset+' .lazy-div').lazyload({
            container: $('#'+thisscrollset),
            load : function(){$(this).addClass('is-lazy-loaded');}
        });
    }).addClass('lazyset');

}


popup_images = function(){
    $('.popup-image:NOT(.popupset):NOT([data-gallery])').magnificPopup({
          type: 'image',
          removalDelay: 500, //delay removal by X to allow out-animation
          /*closeBtnInside: false,*/
          callbacks: {

            imageLoadComplete: function() {
              var self = this;
              setTimeout(function() {
                self.wrap.addClass('mfp-image-loaded');
              }, 16);
            },
            close: function() {
              this.wrap.removeClass('mfp-image-loaded');
            },
       
            
            beforeOpen: function() {
              // just a hack that adds mfp-anim class to markup 
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
               this.st.mainClass = this.st.el.attr('data-effect');
            }
          },
          closeOnContentClick: true,
          midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
          gallery: {
                enabled:false
          }
    }).addClass('popupset');

    $('.popup-image[data-gallery]:NOT(.popupset)').magnificPopup({
          type: 'image',
          removalDelay: 500, //delay removal by X to allow out-animation
          /*closeBtnInside: false,*/
          callbacks: {

            imageLoadComplete: function() {
              var self = this;
              setTimeout(function() {
                self.wrap.addClass('mfp-image-loaded');

              }, 16);
            },
            close: function() {
              this.wrap.removeClass('mfp-image-loaded');
            },
            beforeOpen: function() {
              // just a hack that adds mfp-anim class to markup 
               this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
               this.st.mainClass = this.st.el.attr('data-effect');

            }
          },
          closeOnContentClick: true,
          midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
          gallery: {
                enabled:true
          }
    }).addClass('popupset');

    $('.popup-ajax:NOT(.popupset)').magnificPopup({
        type: 'ajax',
        callbacks:{
            ajaxContentAdded: function(){
                page_refresh();
                this.currItem.el.trigger('popup-ajax-loaded');
            }
        }
    }).addClass('popupset');

     $('.popup-iframe:NOT(.popupset)').bind('click',function(e){
        e.preventDefault();
        $.magnificPopup.open({
          items: {
            src: $(this).attr('href')
          },
          disableOn: 0,
          type: 'iframe',
          mainClass: $(this).attr('popup-class')?$(this).attr('popup-class'):'mfp-login',
          removalDelay: 160,
          preloader: false,
          modal: false
        });
      }).addClass('popupset');

}


receiver = function (event) {

    if (event.origin.search($iFLYERURL) != -1 ) {
        if (event.origin.search('widgets') != -1 ) {
            widget_reciever(event);
        }else if (event.origin.search('admin') != -1) {
            admin_reciever(event);
        }else if (event.origin.search('iflyer') != -1) {
            // 
            if(event.data.command=='yourtickets_event'){
                if(event.data.ticket_counter){
                    $('#yourtickets').attr('tickets',event.data.ticket_counter);
                }else{
                    $('#yourtickets').removeAttr('tickets');
                }
            }

            /*
            if (event.data.command == 'ticketpage') {
                if(event.data.height && event.data.holdid){
                    $('#'+event.data.holdid).height(event.data.height);
                }
            }*/
        }

        if (event.data.command && event.data.command=='loginpage') {
            var myheight = event.data.height;
            if(myheight<620){
                myheight = 620;
            }
            $('.mfp-login .mfp-iframe-holder .mfp-content').css({'height':myheight+"px"});
        }


        if (event.data.command && event.data.command=='social') {
            if (event.data.status=='update' || event.data.status=='linkup'){
                if(typeof loginfb_reaction == 'function'){
                  loginfb_reaction(event.data.status);
                }else{
                  window.location.reload();
                }
            }
        }



        /*
        if(!event.data.handshake){
            event.source.postMessage({handshake: "true" }, '*');
        }*/
    }else if(event.origin.search('soundcloud') != -1){
        //
        scvars = JSON.parse(event.data);
        if(scvars.method=='ready'){
            event.source.postMessage(JSON.stringify({method:'getCurrentSound',value:1}), '*');
        }else if(scvars.method=='getCurrentSound'){
            if(scvars.value && scvars.value.id){
                $('#sc_'+scvars.value.id ).addClass('loadedok');
                $('[rel-id="sc_'+scvars.value.id+'"]').addClass('loadedok');
                if(scvars.value.user_id){
                    $('#sc_u'+scvars.value.user_id).addClass('loadedok');
                    $('[rel-id="sc_u'+scvars.value.user_id+'"]').addClass('loadedok');
                }
            }
        }

    }
}

widget_reciever = function (event) {

    if(event.data.stardwidget){
        starddata = event.data.stardwidget;
        if(starddata.wasstard || starddata.stard){ // is stard or was just stard
            $('[myflyer-stard-id="'+starddata.id+'"]:NOT(.xxxx)').addClass("isstard").removeClass('starding').removeClass('unstarding');
            $('[myflyer-stard-id="'+starddata.id+'"]').trigger('starStatusChange');
            if(typeof(myflyer_interest)=='function'){
                myflyer_interest();
            }
        }else if(starddata.unstard){
            $('[myflyer-stard-id="'+starddata.id+'"]').removeClass("isstard").removeClass('starding').removeClass('unstarding').removeClass('xxxx');
            $('[myflyer-stard-id="'+starddata.id+'"]').trigger('starStatusChange');
            if(typeof(myflyer_interest)=='function'){
                myflyer_interest();
            }
        }
        $('[myflyer-stard-id="'+starddata.id+'"]').attr('star-counter',starddata.hasstars);
        
    }
}

admin_reciever = function (event) {
    if(event.data.command=='login'){
        $(window).trigger('myflyer_loginStatusChanged');
        $.magnificPopup.close();
    }
    if(event.data.command=='logout'){
        $(window).trigger('myflyer_loginStatusChanged');
        $.magnificPopup.close();
        wipe_myflyer();
    }
    if(event.data.command=='closeme'){
        if($('.mfp-login').length){$.magnificPopup.close();}
    }
    if(event.data.ntrsttoken){
        iCheck(event.data.ntrsttoken);
    }
}

image_flickers = function(){

    $('.image_flicker_holder nav dd:NOT(.set)').on('click',function(e){
        e.preventDefault();
        var nav = $(this).hasClass('backimg')?false:true;
        // nav to image
        var unit = $(this).closest('.image_flicker_holder');
        if(unit.find('.current').length){
            var current = unit.find('.current');
            current.html('');
            var jumpto = nav?unit.find('.current').next():unit.find('.current').prev();
            current.removeClass('current');
            if(jumpto.length && jumpto.hasClass('image_flicker')){
                jumpto.addClass('current').addClass('loading');
            }
        }else{
            if(nav){
                unit.find('div').first().addClass('current').addClass('loading');
            }else{
                unit.find('div').last().addClass('current').addClass('loading');
            }
        }
        if(unit.find('.current').length){
            unit.find('img.m-img').addClass('notcurrent');
            var showme = unit.find('.current');
            showme.html('<svg class="spinner" width="100%" height="100%" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="3" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg>');
            var tmpImg = new Image() ;
            tmpImg.src = showme.attr('data-src');
            tmpImg.onload = function() {
                showme.html('<img src="'+showme.attr('data-src')+'">').removeClass('loading');
            }; 
        }else{
            unit.find('img.m-img').removeClass('notcurrent');
        }
    }).addClass('set');

}

setup_mini_preview = function(){
    if($('#mini_preview_holder').length){
        $('#mini_preview_holder').scrollTo("#img_current",0, {offset:-($('#mini_preview_holder').width()/2)+25});
    }

    if($('#header_cal').length){
        $('#header_cal').scrollTo("#date_selected",0, {offset:-($('#header_cal').width()/2)+50});
    }
}


jQuery(window).bind('message', function(event) { receiver(event.originalEvent); });

function iCheck(mytoken){
    if(typeof  $iFLYEROBJECT != "undefined" && typeof  $IFTVIKEY != "undefined" && $iFLYEROBJECT!=null &&  $IFTVIKEY!=null  && storage){
        if(!storage.getItem($iFLYEROBJECT+'_ntrst'+$thisYear+'-'+$thisMonth+'-'+$thisToday)){
            $pg_url = $iFLYERAPEX+'plugins/ntrst.php';
            if(!mytoken){
                $('body').append("<iframe src='"+$pg_url + '?key='+$IFTVIKEY+"&objectid="+$iFLYEROBJECT+"' width='1' height='1' style='width:1px; height: 1px;position: absolute;bottom: 0px;border: 0px;opacity: 0;'></iframe>" );
            }else{
                $('body').append("<iframe src='"+$pg_url + '?key='+$IFTVIKEY+"&objectid="+$iFLYEROBJECT+"&token="+mytoken+"' width='1' height='1' style='width:1px; height: 1px;position: absolute;bottom: 0px;border: 0px;opacity: 0;'></iframe>" );
                storage.setItem($iFLYEROBJECT+'_ntrst'+$thisYear+'-'+$thisMonth+'-'+$thisToday,true);
            }
        }
    }
}

function checkLogin() {
    if(myflyer.user){
        $('#iframelogin iframe').remove();
    }
    if(!triggerCheck['first_checklogin']){
        $(window).trigger('first_checklogin');
        triggerCheck['first_checklogin'] = 1;
    }
    if (typeof(myflyer)!=='undefined' && typeof(myflyer.user)!=='undefined') {
        create_myflyer();
        if(!triggerCheck['first_myflyerlogin']){
            if(!myflyer.user){
                if(!$.cookie('login-attempt')){ // Only do this once per 30 min
                    $.cookie('login-attempt', '1',{ path:'/', expires:(1/48), domain:$iFLYERCookieDomain });
                    $('body').append("<iframe src='"+$iFLYERXAPI+'/../login/fb.php'+"' width='1' height='1' style='width:1px; height: 1px;position: fixed; bottom: 0px;border: 0px;opacity: 0;'></iframe>" );
                }
            }
            triggerCheck['first_myflyerlogin'] = 1;
        }
        return myflyer.user ? true : false;
    }
    // OLD WAY
    if ($.cookie($cookieNames['myflyer']+'[id]') != null) {
        $('body').addClass('myflyer_mode');
        return true;
    } else {
        $('body').removeClass('myflyer_mode');
        return false;
    }

}

function create_myflyer(){
    if (myflyer.user){
        $('body').addClass('myflyer_mode');
        if($('body').attr('myflyer-user-id')!=myflyer.user.id){
            if($('body').attr('myflyer-user-id')){
                wipe_myflyer();
            }
            $('body').attr('myflyer-user-id',myflyer.user.id);
            $('[myflyer-data-item]').each(function(){
                switch($(this).attr('myflyer-data-item')){
                    case 'user.name':
                        $(this).html(myflyer.user.name);
                    break;
                    case 'user.avatarURL':
                        $(this).attr('src',myflyer.user.squareAvatarURL);
                    break;
                }
            });
            
            $('#yourprofiles').html('');
            $('#myflyernav .iframe_loader').remove();
            $('#hold_loginout .islogin').removeClass('lotsofprofiles');
            if(myflyer.user.profiles){
                if(myflyer.user.profiles.length>=3){
                    $('#hold_loginout .islogin').addClass('lotsofprofiles');
                }
                for (var key in myflyer.user.profiles) {
                    var thisprofile = myflyer.user.profiles[key];
                    if(thisprofile.link_status=='approved'){
                        var htmlP = '<dd>';
                        htmlP += '<a href="'+thisprofile.iFLYER_link+'" class="profile_link">';
                        htmlP += '<span class="profile_name">'+thisprofile.name+'</span>';
                        if(thisprofile.img){
                            htmlP += '<img src="'+myflyer.imageServerURL+'/bw_40/bh_40/pf_1/'+thisprofile.img+'.png">';
                        }
                        htmlP += '</a>';
                        htmlP += '<a href="'+$iFLYERAPEX+(thisprofile.realUrl.replace('/apex/',''))+'" class="edit_link">edit</a>';
                        htmlP += '</dd>';
                        $('#yourprofiles').append(htmlP);
                    }
                }
            }
            mark_my_myflyer_data();
            update_stard_status(true);

            triggermyflyerdata();

            if(logincallback){
                logincallback();
            }
        }
        logincallback = failfallback = null;
        if(!$.cookie('update-graph-'+myflyer.user.id)){ 
            $.cookie('update-graph-'+myflyer.user.id, '1',{ path:'/', expires:(1/24), domain:$iFLYERCookieDomain });
            xapi('user:'+myflyer.user.id+'/update-graph');
        }
    }else{
        wipe_myflyer();
    }
}


xapi = function(path,method,vars,callback,mycontext,token){
    if(typeof(method)=='undefined' || method==null){ method = "GET"; }
    var mycontext = typeof mycontext !== 'undefined' ? mycontext : $(this);
    if(typeof(callback)=='undefined' || callback==null){ 
        callback = function(data){mycontext.trigger('xapi-success',data);debug(data)}; 
    }
    if(typeof(vars)=='undefined' || vars==null){ vars = {}; }
    if(method!='GET' && !token){
        // needs sign key
        tokencallback = function(data){
                xapi(path,method,vars,callback,mycontext,data.xtoken);
            };
        $.ajax({
            type:method,
            url:$iFLYERXAPI+'/'+path,
            dataType:"json",
            data: vars,
            success: tokencallback,
            context: mycontext,
               xhrFields: {
                  withCredentials: true
               }
        });
        return;
    }
    addHeaders = null;
    if(token){
        /*addHeaders = function (request) {
            request.setRequestHeader('X-iFLYER-Token', token);
        };*/
        addHeaders = {'X-iFLYER-Token': token};
    } 
    $.ajax({
        type:method,
        url:$iFLYERXAPI+'/'+path,
        dataType:"json",
        data: vars,
        success: callback,
        /*beforeSend: addHeaders,*/
        headers: addHeaders,
        context: mycontext,
           xhrFields: {
              withCredentials: true
           }
    });
}




function triggermyflyerdata(){
    $('.set[myflyer-onlogin]:NOT(.myflyer-onlogin-triggered)').each(function(){
                $(this).trigger($(this).attr('myflyer-onlogin'));
    }).addClass('myflyer-onlogin-triggered');
}

function mark_my_myflyer_data(){
    if(myflyer && myflyer.user){
        if(myflyer.user.profiles){
            for (var key in myflyer.user.profiles) {
                var thisprofile = myflyer.user.profiles[key];
                $('[myflyer-stard-id="'+thisprofile.type+':'+thisprofile.ID+'"]').addClass('youadmin');
                $('[myflyer-page-id="'+thisprofile.type+':'+thisprofile.ID+'"]').addClass('apexadminon');
            }
        }
        $('[myflyer-user-firstname]').html(myflyer.user.firstname);
        triggermyflyerdata();
        $('[myflyer-stard-counter]').each(function(){
            $(this).attr('myflyer-stard-counter',$(this).find('.isstard').length+0);
        });
    }
}

function enable_stard_buttons(){
    $('[myflyer-starbutton]:NOT(.myflyer_sb_ready)').on('click',function(e){
        if($(this).hasClass('starding') || $(this).hasClass('unstarding') || !$(this).attr('myflyer-stard-id')){
            return false; // already stard or lacking data
        }
        myflyer.checkLogin();
        
        if($(this).hasClass('isstard')){
            if(!myflyer.user){
                // not logged in... should not be showing stard
                wipe_myflyer();
                return false;
            }
            $(this).addClass('unstarding').removeClass('isstard').addClass('xxxx');
            var pg_url = $iFLYERWIDGETS+"/stard/"+($(this).attr('myflyer-stard-id').replace(':', '/'))+"/?layout=fill_space&untrigger=1";
            $('.tryunstard[data-ref="'+$(this).attr('myflyer-stard-id')+'"]').remove();
            $('body').prepend("<iframe class='tryunstard' data-ref='"+$(this).attr('myflyer-stard-id')+"' src='"+pg_url+"' width='1' height='1' style='width:1px; height: 1px;position: fixed; bottom: 0px;border: 0px;opacity: 0;'></iframe>" );
            return false; // already stard or lacking data
        }else{
            // if user is not logged in we are going to have to log them in first somehow.... then on success re click this button
            failfallback = logincallback = null;
            $(this).addClass('starding');
            var passme = $(this);
            callback = function(){ if($('.mfp-login').length){$.magnificPopup.close();}passme.trigger('click');}
            if(!myflyer.user){
                // scroll to top of page and ask to login
                popuplogin(callback);
                return false;
            }
            failfallback = callback;
            var pg_url = $iFLYERWIDGETS+"/stard/"+($(this).attr('myflyer-stard-id').replace(':', '/'))+"/?layout=fill_space&trigger=1";
            $('.trystard[data-ref="'+$(this).attr('myflyer-stard-id')+'"]').remove();
            $('body').prepend("<iframe class='trystard' data-ref='"+$(this).attr('myflyer-stard-id')+"' src='"+pg_url+"' width='1' height='1' style='width:1px; height: 1px;position: fixed; bottom: 0px;border: 0px;opacity: 0;'></iframe>" );
        }
    }).addClass('myflyer_sb_ready');
}

function update_stard_status(reset){
    if(reset){
        myflyer.getdata('stard_ids',function(idset){update_stard_status(false)},true);
    }

    if(myflyer.user){
        $('[facebook-rsvp-id]').each(function(){
            if($.cookie('facebook-rsvp-id-'+$(this).attr('facebook-rsvp-id')+'-'+myflyer.user.id)){
                $('[facebook-rsvp-id="'+$(this).attr('facebook-rsvp-id')+'"]').addClass('isstard');
            }
        });
    }

    if(myflyer.data.stard_ids){
        if(myflyer.data.stard_ids.artists){
            $.each(myflyer.data.stard_ids.artists,function(k,v){
                $('[myflyer-stard-id="artist:'+v+'"]').addClass('isstard').addClass('pending');
            });
        }
        if(myflyer.data.stard_ids.venues){
            $.each(myflyer.data.stard_ids.venues,function(k,v){
                $('[myflyer-stard-id="venue:'+v+'"]').addClass('isstard').addClass('pending');
            });
        }
        if(myflyer.data.stard_ids.events){
            $.each(myflyer.data.stard_ids.events,function(k,v){
                $('[myflyer-stard-id="event:'+v+'"]').addClass('isstard').addClass('pending');
            });
        }

        if(myflyer.data.stard_ids.pages){
            $.each(myflyer.data.stard_ids.pages,function(k,v){
                $('[myflyer-stard-id="page:'+v+'"]').addClass('isstard').addClass('pending');
            });
        }

        if(myflyer.data.stard_ids.days){
            $.each(myflyer.data.stard_ids.days,function(k,v){
                $('[myflyer-stard-days="'+k+'"]').addClass('isstard').attr('data-myflyer-counter',v);
            });
        }
    }
    mark_my_myflyer_data();
    $('[myflyer-stard-id]:NOT(.pending)').removeClass('isstard');
    $('[myflyer-stard-id].pending').removeClass('pending');
    $('[myflyer-stard-id]').removeClass('starding').removeClass('unstarding');
    if(typeof(myflyer_interest)=='function'){
        myflyer_interest();
    }
    if(typeof(choose_a_suggestion)=='function'){
        choose_a_suggestion();
    }
}

function wipe_myflyer(){
    $('body').removeClass('myflyer_mode').removeAttr('myflyer-user-id').removeClass('apexadminon');
    $('#yourprofiles').html('');
    $('.trystard').remove();
    $('.tryunstard').remove();
    $('[myflyer-stard-id],[facebook-rsvp-id]').removeClass('isstard').removeClass('starding').removeClass('youadmin').removeClass('unstarding');
    $('[myflyer-stard-days]').removeClass('isstard').attr('data-myflyer-counter',0);
    $('#myflyer_friends').attr('action-code','').removeClass('have_friends no_friends').removeAttr('user-data-friends');
    $('#myflyer_friends .friend_list .friend_text').remove();
    $('#myflyer_friends h1').attr('myflyer-friend-counter','0');
    $('#myflyernav .iframe_loader').remove();
    $('#myflyer_section .stard-item').remove();
    $('[myflyer-user-firstname]').html('');
    $('#hold_loginout .islogin').removeClass('lotsofprofiles');
    $('[myflyer-onlogout-wipe]').html('');
    $('[myflyer-onlogin]').trigger('myflyer-logout');
    $('[myflyer-onlogin]').removeClass('myflyer-onlogin-triggered');
    // need to wipe all myflyer attr
    $('[myflyer-data-item]').each(function(){
        switch($(this).attr('myflyer-data-item')){
            case 'user.name':
                $(this).html('');
            break;
            case 'user.avatarURL':
                $(this).attr('src','');
            break;
        }
    });
    if(failfallback){
        failfallback();
        failfallback = null;
    }
    if($forceMyflyer){
        callback = function(){if($('.mfp-login').length){$.magnificPopup.close();}}
        popuplogin(callback, true);
    }
}

function debug(msg){
    if(!devMode){
        return false;
    }
    console.log(msg);
}


jQuery(window).bind('myflyer_loginStatusChanged', function() {
    checkLogin();
});

var $oldSearch = '';
var $searchTimer;

function enhancedHeaderSearch() {

    $('#search-input').bind('keyup click', function () {
        if (!$(this).hasClass("active")) {
            return;
        }

        if ($(this).val().length >= 2) {
            if ($oldSearch != $(this).val()) {
                clearTimeout($searchTimer);
                $searchForThis = $(this).val();
                $searchTimer = setTimeout(function () {
                    var host = $iFLYERCACHE; // $.browser.msie ? $iFLYERNOCACHE : 
                    $('#super_search').load(/*host +*/ langCountryUrl + 'search/super_search/' + encodeURIComponent($searchForThis) + '/');
                }, 500); //
            }
            $('#super_search').css('display', 'block');
            $oldSearch = $(this).val();
        } else {
            $('#super_search').css('display', 'none');
        }
    });

    $('#search-input').bind('keydown', function (e) {

        if(e.keyCode == 27){
            e.preventDefault();
            $('#super_search li.selected').removeClass('selected');
        }

        if (e.keyCode == 40) {
            e.preventDefault();
            // down
            if ($('#super_search li.selected').next().length) {
                $select = $('#super_search li.selected').next();
                $('#super_search li.selected').removeClass('selected');
                $select.addClass('selected');
            } else {
                $('#super_search li.selected').removeClass('selected');
                $('#super_search li:first').addClass('selected');
            }
        } else if (e.keyCode == 38) {
            e.preventDefault();
            // up
            if ($('#super_search li.selected').prev().length) {
                $select = $('#super_search li.selected').prev();
                $('#super_search li.selected').removeClass('selected');
                $select.addClass('selected');
            } else {
                $('#super_search li.selected').removeClass('selected');
                $('#super_search li:last').addClass('selected');
            }
        }
    });

    $('body').bind('click', function () {
        if (!$('#search-input:focus').length) {
            $('#super_search').css('display', 'none');
        }
    });


    $("#search-input").bind("click",function () {
        if (!$(this).hasClass("active")) {
            $(this).attr("value", "").addClass("active");
        }
    }).bind("keypress", function (e) {
            if (e.keyCode == 13) {
                if ($('#super_search li.selected').length) {
                    window.location.href = $('#super_search li.selected a').attr('href');
                } else {
                    submitSearch();
                }
                return false;
            }
        });
    /*Quick search*/

    $("#search-button").bind("click", function (e) {
        submitSearch();
        e.preventDefault();
    });

    /*$("#header_search_web").bind("click", function (e) {
        window.open("https://www.google.com/search?q=site:iflyer.tv"+encodeURIComponent(" "+$('#search-input').attr("value")), 'google_search');
        e.preventDefault();
    });*/


}

guestController = function(){
    if(!$('[iftv-controller="showall__friends"]').length){
        return;
    }

    $('[iftv-controller="showall__friends"]:NOT(.fset)').on('json-loader-success',function(e,rtndata){
        $(this).removeClass('loading');
        if(rtndata.friends.data){
            if(rtndata.friends.data.length){
                $(this).html('<h3>'+rtndata.friends.data.length+' Friends</h3><div class="list"></div>');
                for (var key in rtndata.friends.data) {
                    var usr = rtndata.friends.data[key];
                    var img = (usr['img']?("<img src='"+usr['img']+"'>"):'');
                    $(this).find('.list').append("<div class='friend__unit "+(img?'':'no_img')+"'>"+img+"<span>"+usr['name']+" "+(usr['lastname']?usr['lastname']:'')+"</span></div>");
                }
            }
        }else{
            $(this).html("<span class='nodata'>"+_lang('No friends found, try inviting some')+"</span>");
            // no data
        }
        page_refresh();
    }).on('open-toggle',function(){
        $(this).addClass('loading');
        $(this).html('');
    }).addClass('fset');

    $('[iftv-controller="invite__friends"]:NOT(.fset)').on('json-loader-success',function(e,rtndata){
        $(this).removeClass('loading');
        if(rtndata.friends.data){
            if(rtndata.friends.data.length){
                $(this).html('<h3>'+rtndata.friends.data.length+' Friends</h3><div class="list"></div>');
                for (var key in rtndata.friends.data) {
                    var usr = rtndata.friends.data[key];
                    var img = (usr['img']?("<img src='"+usr['img']+"'>"):'');
                    var button = null;
                    if(usr['invite_status']=='ready'){
                        button = "<button iftv-controller='invite__button' iftv-api-location='"+$(this).attr('iftv-invite-location')+"' iftv-data='"+usr['id']+"'>"+'<svg viewBox="0 0 24 24"><path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" /></svg>'+_lang('INVITE')+"</button>";
                    }else if(usr['invite_status']=='sent'){
                        button = '<svg viewBox="0 0 24 24"><path d="M22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V8C2,7.25 2.42,6.59 3.03,6.25L12,1.07L20.97,6.25C21.58,6.59 22,7.25 22,8M4,8L12,13L20,8L12,3L4,8Z" /></svg>';
                    }else if(usr['invite_status']=='going'){
                        button = '<svg viewBox="0 0 24 24"><path d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10.08L23,10M1,21H5V9H1V21Z" /></svg>';
                    }
                    $(this).find('.list').append("<div class='friend__unit "+(img?'':'no_img')+" invite_status status_"+usr['invite_status']+"'>"+img+"<span>"+usr['name']+" "+(usr['lastname']?usr['lastname']:'')+"</span>"+button+"</div>");
                }
            }
        }else{
            $(this).html("<span class='nodata'>"+_lang('No one to invite')+"</span>");
            // no data
        }
        page_refresh();
    }).on('open-toggle',function(){
        $(this).addClass('loading');
        $(this).html('');
    }).addClass('fset');

    $('[iftv-controller="invite__button"]:NOT(.fset)').on('click',function(e){
        if($(this).parent().hasClass('loading')){
            return false;
        }
        $(this).parent().addClass('loading');
        xapi($(this).attr('iftv-api-location'),'POST',{'user':$(this).attr('iftv-data')},null,$(this));
    }).on('xapi-success',function(x,y){
        if(y.success){
            $(this).parent().append('<svg viewBox="0 0 24 24"><path d="M22,8V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V8C2,7.25 2.42,6.59 3.03,6.25L12,1.07L20.97,6.25C21.58,6.59 22,7.25 22,8M4,8L12,13L20,8L12,3L4,8Z" /></svg>').addClass('status_sent').removeClass('status_ready');
        }else{
            // error handle
            $(this).parent().append('<svg viewBox="0 0 24 24"><path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" /></svg>').addClass('status_error').removeClass('status_ready');
        }
        $(this).parent().removeClass('loading');
        $(this).remove();
    }).addClass('fset');
}

function linkPopout(){
    $('[link-popout]:NOT(.link-set)').on('click',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        popoutWIndow($(this).attr('href'),$(this).attr('link-popout'));
    }).addClass('link-set');
}

function popoutWIndow(href,options){
    newwindow = window.open(href, 'myFLYERLogin', options);
    if (window.focus) {
        if(!newwindow){
            // popout failed... do lightbox
            $.magnificPopup.open({
              items: {
                src: href
              },
              disableOn: 0,
              type: 'iframe',
              mainClass: 'mfp-login',
              removalDelay: 160,
              preloader: false,
              modal: false
            });
        }else{
            newwindow.focus();
        }
    }
}

function submitSearch() {
    window.location.href = langCountryUrl + "search/" + encodeURI($("#search-input").val()).replace('&', '%26').replace('?', '%3F');
}

var myflyer_hightlight_setup = null;

    init_myflyer_hightlight = function(){
        if(myflyer_hightlight_setup){return;}
        myflyer_hightlight_setup = true;
        if($("#myflyer_section").length){
            $('#myflyer_section').append('<aside><section class="content"><div class="data-set"><h1 myflyer-item-counter="0">'+$("#myflyer_section .setup h1").html()+'</h1><div class="scroller_holder"><dl class="scroll_style side_scroller" data-scroll-nav id="myflyer-scroll-list" data-scrollspeed="100"></dl></div></div><div class="no-data">'+$("#myflyer_section .setup h1").attr('myflyer-data-none')+'</div></section></aside>');
            $('#myflyer_section .setup h1').remove();
        }
    }


    init_myflyer_friends = function(){

        $('#frlist__login a').on('click',function(e){
            e.preventDefault();
        });

        $('#frlist__showall a').on('popup-ajax-loaded',function(){
            $('#friendManager__going').trigger('click');
        });

         $('#frlist__invitefriends a').on('popup-ajax-loaded',function(){
            $('#friendManager__invite').trigger('click');
        });

        

        $('#frlist__refresh a').on('click',function(e){
            e.preventDefault();
            if($('#myflyer_friends').hasClass('loading')){
                return;
            }
            $('#myflyer_friends').addClass('loading');
        });

        $('#yourfriends').on('json-loader-start',function(e){
            $('#myflyer_friends').addClass('loading');
        });


        $('#yourfriends:NOT(.fset)').on('json-loader-success',function(e,rtndata){
            $('#myflyer_friends').removeClass('loading');
            if(!rtndata.facebook){
                $('#myflyer_friends').attr('action-code',2);
            }else{
                if(rtndata.graph && rtndata.graph.permissions){
                    var user_perms = rtndata.graph.permissions;
                    if(!user_perms.rsvp_event || user_perms.rsvp_event!='granted' 
                       || !user_perms.user_friends || user_perms.user_friends!='granted' 
                       || !user_perms.user_events || user_perms.user_events!='granted' 
                     ){
                        $('#myflyer_friends').attr('action-code',3);
                    }
                }
                if(!rtndata.graph || !rtndata.graph.token_status){
                    $('#myflyer_friends').attr('action-code',3);
                }
            }
            if(rtndata.friends.data){
                if(rtndata.friends.data.length){
                    shuffle(rtndata.friends.data);
                    $('#myflyer_friends').addClass('have_friends').removeClass('no_friends');
                    var friendLimit = 10;
                    var fcount = 0;
                    for (var key in rtndata.friends.data) {
                        fcount++;
                        if(fcount>friendLimit){break;}
                        var usr = rtndata.friends.data[key];
                        var img = (usr['img']?("<img src='"+usr['img']+"'>"):'');
                        $('#yourfriends').append("<div class='friend__unit "+(img?'':'no_img')+"'>"+img+"<span>"+usr['name']+" "+(usr['lastname']?usr['lastname']:'')+"</span></div>");
                    }
                    shuffle(rtndata.friends.data);
                    var friendLimit = 3;
                    var fcount = 0;
                    var friendtext = "";
                    for (var key in rtndata.friends.data) {
                        fcount++;
                        if(fcount>friendLimit){break;}
                        var usr = rtndata.friends.data[key];
                        if(fcount>1){
                            friendtext += ",";
                        }
                        friendtext += " <a href>"+usr['name']+"</a>";
                    }
                    if(rtndata.friends.data.length>fcount){
                        friendtext += " "+_lang("and <a href><span data-friend-count>%s</span> other friends</a> are going").replace('%s',(rtndata.friends.data.length-fcount));
                    }else{
                        friendtext += " "+(rtndata.friends.data.length>1?_lang("are going"):_lang("is going"));
                    }
                    $('#myflyer_friends .friend_list').append("<div class='friend_text'>"+friendtext+"</div>");
                    $('#myflyer_friends h1').attr('myflyer-friend-counter',rtndata.friends.data.length);
                }else{
                    $('#myflyer_friends').removeClass('have_friends').addClass('no_friends');
                    $('#yourfriends').html('');
                    $('#myflyer_friends .friend_list .friend_text').remove();
                    $('#myflyer_friends h1').attr('myflyer-friend-counter','0');
                }               
            }else{
                $('#myflyer_friends').removeClass('have_friends').addClass('no_friends');
                $('#yourfriends').html('');
                $('#myflyer_friends .friend_list .friend_text').remove();
                $('#myflyer_friends h1').attr('myflyer-friend-counter','0');
                
            }
            if(rtndata.friends){
                if(rtndata.friends.total){
                    $('#myflyer_friends').attr('user-data-friends',rtndata.friends.total);
                }else{
                    $('#myflyer_friends').removeAttr('user-data-friends');
                }
            }
            $("#myflyer_friends a[href='']").on('click',function(e){e.preventDefault();$('#frlist__showall a').trigger('click');})
        }).addClass('fset');

    }

    function _lang(str){
        mystr = md5(str);
        if(typeof(_langs) != 'undefined'  && typeof(_langs[mystr]) != 'undefined'){
            return _langs[mystr];
        }

        return str;
    }    

    myflyer_interest = function(){
        if(!$('#myflyer_section').length){
            return;
        }

        if(!$('body').hasClass('myflyer_mode')){
            $('#myflyer_section .stard-item').remove();
            return;
        }

        if(pagestardcheck==$('.isstard').length){
            return;
        }

         init_myflyer_hightlight();

        pagestardcheck=$('.isstard').length;
        interest_list = {};

        $('[myflyer-search]').each(function(){
            var searching = $(this).attr('myflyer-search');
            searching = searching.split(",");
            $(this).find('.isstard').each(function(){
                bulid_interest_list(searching,$(this).attr('myflyer-stard-id'),$(this));
            });
        });

        write_interest_list();
        side_scrollers(); 
    }

    var interest_list = {};
    var pagestardcheck = 0;

    bulid_interest_list = function(searching,found,obj){
        if(typeof(searching) == "object"){
            for(var key in searching) {
                var holdme = obj.closest('[myflyer-holder]');
                var youadmin = obj.hasClass('youadmin');
                switch(searching[key]){
                    case 'events':
                        if(found.substr(0,5)=='event'){
                            var passdata = { 
                                'type': 'event',
                                'name': myflyer_get_data(holdme.find('[myflyer-name]'),'myflyer-name',false),
                                'link': myflyer_get_data(holdme.find('[myflyer-link]'),'myflyer-link','href'),
                                'img': myflyer_get_data(holdme.find('[myflyer-img]'),'myflyer-img','src') ,
                            'date': myflyer_get_data(holdme.find('[myflyer-date]'),'myflyer-date',false),
                            'subtitle': myflyer_get_data(holdme.find('[myflyer-subtitle]'),'myflyer-subtitle',false)
                            };
                            add_to_interest_list(found,passdata,'',youadmin?'youadmin':'');
                        }
                    break;
                    case 'artists':
                        if(found.substr(0,6)=='artist'){
                            var passdata = { 
                                'type': 'artist',
                                'name': myflyer_get_data(holdme.find('[myflyer-name]'),'myflyer-name',false),
                                'link': myflyer_get_data(holdme.find('[myflyer-link]'),'myflyer-link','href'),
                                'img': myflyer_get_data(holdme.find('[myflyer-img]'),'myflyer-img','src') 
                            /*,'subtitle': myflyer_get_data(holdme.find('[myflyer-subtitle]'),'myflyer-subtitle',false)*/
                            };
                            add_to_interest_list(found,passdata,'',youadmin?'youadmin':'');
                        }
                    break;
                    case 'venues':
                        if(found.substr(0,5)=='venue'){
                            var passdata = { 
                                'type': 'venue',
                                'name': myflyer_get_data(holdme.find('[myflyer-name]'),'myflyer-name',false),
                                'link': myflyer_get_data(holdme.find('[myflyer-link]'),'myflyer-link','href'),
                                'img': myflyer_get_data(holdme.find('[myflyer-img]'),'myflyer-img','src') 
                            /*,'subtitle': myflyer_get_data(holdme.find('[myflyer-subtitle]'),'myflyer-subtitle',false)*/
                            };
                            add_to_interest_list(found,passdata,'',youadmin?'youadmin':'');
                        }
                    break;
                    case 'reports':
                        var passdata = { 
                            'type': 'report',
                            'name': myflyer_get_data(holdme.find('[myflyer-name]'),'myflyer-name',false),
                            'link': myflyer_get_data(holdme.find('[myflyer-link]'),'myflyer-link','href'),
                            'img': myflyer_get_data(holdme.find('[myflyer-img]'),'myflyer-img','src'),
                            'date': myflyer_get_data(holdme.find('[myflyer-date]'),'myflyer-date',false),
                            'subtitle': myflyer_get_data(holdme.find('[myflyer-subtitle]'),'myflyer-subtitle',false)
                        };
                        add_to_interest_list(found,passdata,'',youadmin?'youadmin':'');
                    break;
                    case 'artistsatevents':
                        if(found.substr(0,6)=='artist'){
                            if(!$('[myflyer-page-id="'+found+'"]').length){
                            var passdata = { 
                                'type': 'event',
                                'name': myflyer_get_data(holdme.find('[myflyer-name]'),'myflyer-name',false),
                                'link': myflyer_get_data(holdme.find('[myflyer-link]'),'myflyer-link','href'),
                                'img': myflyer_get_data(holdme.find('[myflyer-img]'),'myflyer-img','src') ,
                            'date': myflyer_get_data(holdme.find('[myflyer-date]'),'myflyer-date',false),
                            'subtitle': myflyer_get_data(holdme.find('[myflyer-subtitle]'),'myflyer-subtitle',false)
                            };
                            found = holdme.attr('myflyer-holder');
                            add_to_interest_list(found,passdata,obj.attr('myflyer-artist')?obj.attr('myflyer-artist'):obj.html(),youadmin?'youadmin':'');
                            }
                        }
                    break;
                    case 'days':
                        var passdata = { 
                            'type': 'day',
                            'name': holdme.attr('myflyer-name'),
                            'link': holdme.attr('myflyer-link'),
                            'date': holdme.attr('myflyer-date'),
                            'img': null,
                            'subtitle': holdme.attr('myflyer-stard-counter')+" STARS"
                            
                        };
                        found = holdme.attr('myflyer-date');
                        add_to_interest_list(found,passdata,obj.find('a').html()?obj.find('a').html():obj.html(),youadmin?'youadmin':'');
                    break;
                }
            }
        }

    }

    myflyer_get_data = function(obj,findme,alt){
        
        if(obj.attr(findme)){
            return obj.attr(findme);
        }
        if(alt){
            return obj.attr(alt);
        }
        return obj.html();
    }

    write_interest_list = function(){
        var counter = 0;
        $('#myflyer_section .stard-item').remove();
        if(typeof(interest_list) == "object"  ){
            
            for(var key in interest_list) {
                counter ++;
                var unit = '<dd class="stard-item myflyer_'+interest_list[key]['type']+'" myflyer-key="'+key+'">';
                if(interest_list[key]['img']){
                    unit += "<img src='"+imgsrvUrl+"/bw_100/bh_100/pf_1/"+interest_list[key]['img']+".png'/>";
                }
                unit += "<strong>"+interest_list[key]['name']+"</strong>";
                if(interest_list[key]['subtitle']){
                    unit += "<span class='subtitle'>"+interest_list[key]['subtitle']+"</span>";
                }
                unit += "<em class='block_type'>"+interest_list[key]['type']+"</em>";
                if(interest_list[key]['date']){
                    unit += "<span class='date'>"+interest_list[key]['date']+"</span>";
                }
                var holdreason = new Object();
                for(var k in interest_list[key]['reason']){
                    if(!holdreason[interest_list[key]['reason'][k]['text']]){
                        holdreason[interest_list[key]['reason'][k]['text']] = 1;
                        unit += "<span class='reason "+interest_list[key]['reason'][k]['youadmin']+' '+(interest_list[key]['reason'][k]['text']?'':'objectstard')+"'>"+interest_list[key]['reason'][k]['text']+"</span>";
                    }
                }
                if(interest_list[key]['link']){
                    unit += "<a href='"+interest_list[key]['link']+"' class='gotopage'>go<a>";
                }
                unit += "</dd>"
                $('#myflyer-scroll-list').append(unit);
            }
        }
        $('[myflyer-item-counter]').attr('myflyer-item-counter',counter);
        $('#myflyer_section .stard-item').on('click',function(e){
            if(e.target.className=='gotopage'){
                return;
            }
            $('body').scrollTo('[myflyer-holder="'+$(this).attr('myflyer-key')+'"]',500)
        });

    }

    add_to_interest_list = function(key, data, reason, classadd){
        if(typeof(interest_list[key]) != "object"  ){
            interest_list[key] = data;
            interest_list[key]['reason'] = [{'text':reason,'youadmin':classadd}];
        }else{
            interest_list[key]['reason'].push({'text':reason,'youadmin':classadd});
        }
    }

    function getParameterByName(name,searchhere='') {
        if(!searchhere){
            searchhere = location.search;
        }
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(searchhere);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


enable_stard_suggestions = function(){
    if(!$('#myflyer_suggestions').length){
        return;
    }

    $('#myflyer_suggestions li').each(function(){
        if($.cookie('myflyer_suggestions_checker_'+$(this).attr('myflyer-stard-id'))){
            $(this).remove();
        }
    });

    $('#myflyer_suggestions [myflyer-starbutton]:NOT(.sset)').on('click',function(e){
        e.preventDefault();
        $(this).parents('.suggestion_holder').addClass('midstar');
    }).addClass('sset');


    $('#myflyer_suggestions li[myflyer-stard-id]:NOT(.dset)').on('starStatusChange',function(){
        if($(this).hasClass('isstard')){
            $(this).unbind('starStatusChange');
            choose_a_suggestion();
        }
    }).addClass('dset');


    $('#myflyer_suggestions .nope:NOT(.sset)').on('click',function(e){
        e.preventDefault();
        $.cookie('myflyer_suggestions_checker_'+$(this).parents('.suggestion_holder').attr('myflyer-stard-id'),1,{ path:'/', expires:30, domain:$iFLYERCookieDomain });
        $(this).parents('.suggestion_holder').remove();
        choose_a_suggestion();
    }).addClass('sset');

    $('#myflyer_suggestions li a:NOT(.abtest)').on('click',function(e){
        $.get(
            $iFLYERAPEX+'test/abtest.php', 
            { "type": "suggest", "val": $(this).parents('.suggestion_holder').html() }
        );
    }).addClass('abtest');

    $('#myflyer_suggestions li.isstard').remove();
    if($('#myflyer_suggestions li:NOT(.isstard)').length){
        $('#myflyer_suggestions').addClass('enabled');
    }
    choose_a_suggestion();
}


choose_a_suggestion = function(){

    $('#myflyer_suggestions li.isstard').remove();
    if($('#myflyer_suggestions li').length){
        $('#myflyer_suggestions li:NOT(.isstard):nth-of-type(1)').addClass('tryme');
    }else{
        $('#myflyer_suggestions').removeClass('enabled');
    }
}


getads = function(){
    var getads = '';
    $('[iflyer-features-load]:NOT(.aset)').each(function(){
        if(getads){getads+=':';}
        getads +=  $(this).attr('iflyer-features-load');
    }).addClass('aset');

    if(getads){
        $.ajax({
            type:"GET",
            url:$iFLYERADS+'?request='+getads+"&t="+Date.now(),  
            dataType:"json",
            success:function (data) {
                if(data.data){
                    putbanners(data.data);
                }else{
                    debug(data.error);
                }
            }
        });
    }

};

function putbanners(data){
    if(typeof data != 'object'){
        return;
    }
    if(data.pushdown){
        for (var pushdown_id in data.pushdown) {
            var pushdown = data.pushdown[pushdown_id];
            $('body').prepend("<aside id='PushDownFeature' data-responsive_img='background-image' data-img='"+imgsrvUrl+"/bw_1920/bh_480/pf_1/"+pushdown.data.image_code+".png' data-img-frommobile='"+imgsrvUrl+"/bw_640/bh_160/pf_1/"+pushdown.data.image_code+".png' data-img-fromthinmobile='"+imgsrvUrl+"/bw_500/bh_281/pf_1/"+(pushdown.data.mobile_gif?pushdown.data.mobile_gif+'.gif':pushdown.data.image_code_mobile+'.png')+"' class='xbigbucks'><span class='blade' style='background-image: none; background-color: "+(pushdown.data.catch_text_background?pushdown.data.catch_text_background:'#FFF')+"; color: "+(pushdown.data.catch_text_color?pushdown.data.catch_text_color:'#000')+"'>"+pushdown.data.catch_text+"</span><span class='closead'></span><a href='"+$iFLYERADS+'?go='+pushdown_id+"' target='"+pushdown.link.target+"'></a></aside>").addClass('WithPushAd adsloaded');
            $("#PushDownFeature").bind('click',function(e){
                $(this).toggleClass('adopen');
                if($(this).hasClass('adopen')){
                    $.cookie('pulldown_checker_new_'+pushdown_id,0,{ path:'/', expires:30, domain:$iFLYERCookieDomain });
                    if($( window ).width()<=500){
                        $(this).css('background-image','url('+$(this).attr('data-img-fromthinmobile')+')');
                    }else if($( window ).width()<=663){
                        $(this).css('background-image','url('+$(this).attr('data-img-frommobile')+')');
                    }else{
                        $(this).css('background-image','url('+$(this).attr('data-img')+')');
                    }
                }else{
                    $(this).css('background-image','none');
                }
            });
            $("#PushDownFeature .closead").bind('click',function(e){
                e.stopImmediatePropagation();
                $("#PushDownFeature").trigger('click');
                $.cookie('pulldown_checker_new_'+pushdown_id,1,{ path:'/', expires:30, domain:$iFLYERCookieDomain });
            });
            $("#PushDownFeature a").bind('click',function(e){
                e.stopImmediatePropagation();
            });
            pulldownbannercheck = typeof($.cookie('pulldown_checker_new_'+pushdown_id)!='undefined')?$.cookie('pulldown_checker_new_'+pushdown_id):'notset';
            if(/*$('body.ptype_top_index').length*/1){
                if(pulldownbannercheck == "undefined" || pulldownbannercheck == "notset" || pulldownbannercheck == "0" || typeof pulldownbannercheck == "undefined" ){
                    $("#PushDownFeature").trigger('click');
                }
            }
            break;
        }
    }

    if(data.standard){
        for (var standard_id in data.standard) {
            var banner =  $('[iflyer-features-load*="standard"]').first();
            var standard = data.standard[standard_id];
            banner.addClass('hasads');
            if(!banner.find('aside').length){
                banner.html('<aside></aside)>');
            }
            banner.find('aside').append('<a href="'+$iFLYERADS+'?go='+standard_id+'" target="'+standard.link.target+'"><img src="'+imgsrvUrl+'/bw_640/bh_160/pf_1/'+standard.data.image_code+'.'+standard.data.image_type+'"></a>');
            banner.attr('iflyer-features-load',banner.attr('iflyer-features-load').replace('standard',''));
        }
    }

    if(data.video){
        for (var standard_id in data.video) {
            var banner =  $('[iflyer-features-load*="video"]').first();
            var video = data.video[standard_id];
            banner.addClass('hasads');
            if(!banner.find('aside').length){
                banner.html('<aside></aside)>');
            }
            banner.find('aside').append('<a href="'+$iFLYERADS+'?go='+standard_id+'" target="'+video.link.target+'"><img src="'+imgsrvUrl+'/bw_640/bh_360/pf_1/'+video.data.image_code+'.'+video.data.image_type+'"></a>');
            banner.attr('iflyer-features-load',banner.attr('iflyer-features-load').replace('video',''));
        }
    }

}


function shuffle(sourceArray) {
    for (var n = 0; n < sourceArray.length - 1; n++) {
        var k = n + Math.floor(Math.random() * (sourceArray.length - n));

        var temp = sourceArray[k];
        sourceArray[k] = sourceArray[n];
        sourceArray[n] = temp;
    }
}


var hasHoverClass = false;
var lastTouchTime = 0;

function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;

    $('body').addClass('hasHover');
    hasHoverClass = true;
}

function disableHover() {
    if (!hasHoverClass) return;

    $('body').removeClass('hasHover');
    hasHoverClass = false;
}

function updateLastTouchTime() {
    lastTouchTime = new Date();
}



$.fn.bindFirst = function(which, handler) {
      // ensures a handler is run before any other registered handlers, 
      // independent of the order in which they were bound
      var $el = $(this);
      $el.unbind(which, handler);
      $el.bind(which, handler);
 
      var events = $._data($el[0]).events;
      var registered = events[which];
      registered.unshift(registered.pop());
 
      events[which] = registered;
    }

$.fn.hasHorizontalScrollBar = function() {
        return this.get(0) ? this.get(0).scrollWidth > this.innerWidth() : false;
    }

$.fn.hasVerticalScrollBar = function() {
        return this.get(0) ? this.get(0).scrollHeight > this.innerheight() : false;
    }

