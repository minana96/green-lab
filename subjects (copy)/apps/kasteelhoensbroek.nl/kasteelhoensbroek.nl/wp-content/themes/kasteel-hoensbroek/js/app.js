// Menu
// Classie
// shrink header
// cycle
// lightbox
// stellar

jQuery(document).ready(function($){
	//if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
	

	//open/close primary navigation
	$('.cd-primary-nav-trigger').on('click', function(){
		$('.cd-menu-icon').toggleClass('is-clicked'); 
		$('.cd-header').toggleClass('menu-is-open');
		
		//in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		if( $('.cd-primary-nav').hasClass('is-visible') ) {
			$('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').removeClass('overflow-hidden');
			});
		} else {
			$('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('body').addClass('overflow-hidden');
			});	
		}
	});
});

/*!
 * classie v1.0.0
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 10,
                header = document.querySelector("header");
            if (distanceY > shrinkOn) {
                classie.add(header,"smaller");
            } else {
                if (classie.has(header,"smaller")) {
                    classie.remove(header,"smaller");
                }
            }
        });
    }
	
    window.onload = init();

/*!
* jQuery Cycle2; version: 2.1.6 build: 20141007
* http://jquery.malsup.com/cycle2/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
!function(a){"use strict";function b(a){return(a||"").toLowerCase()}var c="2.1.6";a.fn.cycle=function(c){var d;return 0!==this.length||a.isReady?this.each(function(){var d,e,f,g,h=a(this),i=a.fn.cycle.log;if(!h.data("cycle.opts")){(h.data("cycle-log")===!1||c&&c.log===!1||e&&e.log===!1)&&(i=a.noop),i("--c2 init--"),d=h.data();for(var j in d)d.hasOwnProperty(j)&&/^cycle[A-Z]+/.test(j)&&(g=d[j],f=j.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),i(f+":",g,"("+typeof g+")"),d[f]=g);e=a.extend({},a.fn.cycle.defaults,d,c||{}),e.timeoutId=0,e.paused=e.paused||!1,e.container=h,e._maxZ=e.maxZ,e.API=a.extend({_container:h},a.fn.cycle.API),e.API.log=i,e.API.trigger=function(a,b){return e.container.trigger(a,b),e.API},h.data("cycle.opts",e),h.data("cycle.API",e.API),e.API.trigger("cycle-bootstrap",[e,e.API]),e.API.addInitialSlides(),e.API.preInitSlideshow(),e.slides.length&&e.API.initSlideshow()}}):(d={s:this.selector,c:this.context},a.fn.cycle.log("requeuing slideshow (dom not ready)"),a(function(){a(d.s,d.c).cycle(c)}),this)},a.fn.cycle.API={opts:function(){return this._container.data("cycle.opts")},addInitialSlides:function(){var b=this.opts(),c=b.slides;b.slideCount=0,b.slides=a(),c=c.jquery?c:b.container.find(c),b.random&&c.sort(function(){return Math.random()-.5}),b.API.add(c)},preInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-pre-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.preInit)&&c.preInit(b),b._preInitialized=!0},postInitSlideshow:function(){var b=this.opts();b.API.trigger("cycle-post-initialize",[b]);var c=a.fn.cycle.transitions[b.fx];c&&a.isFunction(c.postInit)&&c.postInit(b)},initSlideshow:function(){var b,c=this.opts(),d=c.container;c.API.calcFirstSlide(),"static"==c.container.css("position")&&c.container.css("position","relative"),a(c.slides[c.currSlide]).css({opacity:1,display:"block",visibility:"visible"}),c.API.stackSlides(c.slides[c.currSlide],c.slides[c.nextSlide],!c.reverse),c.pauseOnHover&&(c.pauseOnHover!==!0&&(d=a(c.pauseOnHover)),d.hover(function(){c.API.pause(!0)},function(){c.API.resume(!0)})),c.timeout&&(b=c.API.getSlideOpts(c.currSlide),c.API.queueTransition(b,b.timeout+c.delay)),c._initialized=!0,c.API.updateView(!0),c.API.trigger("cycle-initialized",[c]),c.API.postInitSlideshow()},pause:function(b){var c=this.opts(),d=c.API.getSlideOpts(),e=c.hoverPaused||c.paused;b?c.hoverPaused=!0:c.paused=!0,e||(c.container.addClass("cycle-paused"),c.API.trigger("cycle-paused",[c]).log("cycle-paused"),d.timeout&&(clearTimeout(c.timeoutId),c.timeoutId=0,c._remainingTimeout-=a.now()-c._lastQueue,(c._remainingTimeout<0||isNaN(c._remainingTimeout))&&(c._remainingTimeout=void 0)))},resume:function(a){var b=this.opts(),c=!b.hoverPaused&&!b.paused;a?b.hoverPaused=!1:b.paused=!1,c||(b.container.removeClass("cycle-paused"),0===b.slides.filter(":animated").length&&b.API.queueTransition(b.API.getSlideOpts(),b._remainingTimeout),b.API.trigger("cycle-resumed",[b,b._remainingTimeout]).log("cycle-resumed"))},add:function(b,c){var d,e=this.opts(),f=e.slideCount,g=!1;"string"==a.type(b)&&(b=a.trim(b)),a(b).each(function(){var b,d=a(this);c?e.container.prepend(d):e.container.append(d),e.slideCount++,b=e.API.buildSlideOpts(d),e.slides=c?a(d).add(e.slides):e.slides.add(d),e.API.initSlide(b,d,--e._maxZ),d.data("cycle.opts",b),e.API.trigger("cycle-slide-added",[e,b,d])}),e.API.updateView(!0),g=e._preInitialized&&2>f&&e.slideCount>=1,g&&(e._initialized?e.timeout&&(d=e.slides.length,e.nextSlide=e.reverse?d-1:1,e.timeoutId||e.API.queueTransition(e)):e.API.initSlideshow())},calcFirstSlide:function(){var a,b=this.opts();a=parseInt(b.startingSlide||0,10),(a>=b.slides.length||0>a)&&(a=0),b.currSlide=a,b.reverse?(b.nextSlide=a-1,b.nextSlide<0&&(b.nextSlide=b.slides.length-1)):(b.nextSlide=a+1,b.nextSlide==b.slides.length&&(b.nextSlide=0))},calcNextSlide:function(){var a,b=this.opts();b.reverse?(a=b.nextSlide-1<0,b.nextSlide=a?b.slideCount-1:b.nextSlide-1,b.currSlide=a?0:b.nextSlide+1):(a=b.nextSlide+1==b.slides.length,b.nextSlide=a?0:b.nextSlide+1,b.currSlide=a?b.slides.length-1:b.nextSlide-1)},calcTx:function(b,c){var d,e=b;return e._tempFx?d=a.fn.cycle.transitions[e._tempFx]:c&&e.manualFx&&(d=a.fn.cycle.transitions[e.manualFx]),d||(d=a.fn.cycle.transitions[e.fx]),e._tempFx=null,this.opts()._tempFx=null,d||(d=a.fn.cycle.transitions.fade,e.API.log('Transition "'+e.fx+'" not found.  Using fade.')),d},prepareTx:function(a,b){var c,d,e,f,g,h=this.opts();return h.slideCount<2?void(h.timeoutId=0):(!a||h.busy&&!h.manualTrump||(h.API.stopTransition(),h.busy=!1,clearTimeout(h.timeoutId),h.timeoutId=0),void(h.busy||(0!==h.timeoutId||a)&&(d=h.slides[h.currSlide],e=h.slides[h.nextSlide],f=h.API.getSlideOpts(h.nextSlide),g=h.API.calcTx(f,a),h._tx=g,a&&void 0!==f.manualSpeed&&(f.speed=f.manualSpeed),h.nextSlide!=h.currSlide&&(a||!h.paused&&!h.hoverPaused&&h.timeout)?(h.API.trigger("cycle-before",[f,d,e,b]),g.before&&g.before(f,d,e,b),c=function(){h.busy=!1,h.container.data("cycle.opts")&&(g.after&&g.after(f,d,e,b),h.API.trigger("cycle-after",[f,d,e,b]),h.API.queueTransition(f),h.API.updateView(!0))},h.busy=!0,g.transition?g.transition(f,d,e,b,c):h.API.doTransition(f,d,e,b,c),h.API.calcNextSlide(),h.API.updateView()):h.API.queueTransition(f))))},doTransition:function(b,c,d,e,f){var g=b,h=a(c),i=a(d),j=function(){i.animate(g.animIn||{opacity:1},g.speed,g.easeIn||g.easing,f)};i.css(g.cssBefore||{}),h.animate(g.animOut||{},g.speed,g.easeOut||g.easing,function(){h.css(g.cssAfter||{}),g.sync||j()}),g.sync&&j()},queueTransition:function(b,c){var d=this.opts(),e=void 0!==c?c:b.timeout;return 0===d.nextSlide&&0===--d.loop?(d.API.log("terminating; loop=0"),d.timeout=0,e?setTimeout(function(){d.API.trigger("cycle-finished",[d])},e):d.API.trigger("cycle-finished",[d]),void(d.nextSlide=d.currSlide)):void 0!==d.continueAuto&&(d.continueAuto===!1||a.isFunction(d.continueAuto)&&d.continueAuto()===!1)?(d.API.log("terminating automatic transitions"),d.timeout=0,void(d.timeoutId&&clearTimeout(d.timeoutId))):void(e&&(d._lastQueue=a.now(),void 0===c&&(d._remainingTimeout=b.timeout),d.paused||d.hoverPaused||(d.timeoutId=setTimeout(function(){d.API.prepareTx(!1,!d.reverse)},e))))},stopTransition:function(){var a=this.opts();a.slides.filter(":animated").length&&(a.slides.stop(!1,!0),a.API.trigger("cycle-transition-stopped",[a])),a._tx&&a._tx.stopTransition&&a._tx.stopTransition(a)},advanceSlide:function(a){var b=this.opts();return clearTimeout(b.timeoutId),b.timeoutId=0,b.nextSlide=b.currSlide+a,b.nextSlide<0?b.nextSlide=b.slides.length-1:b.nextSlide>=b.slides.length&&(b.nextSlide=0),b.API.prepareTx(!0,a>=0),!1},buildSlideOpts:function(c){var d,e,f=this.opts(),g=c.data()||{};for(var h in g)g.hasOwnProperty(h)&&/^cycle[A-Z]+/.test(h)&&(d=g[h],e=h.match(/^cycle(.*)/)[1].replace(/^[A-Z]/,b),f.API.log("["+(f.slideCount-1)+"]",e+":",d,"("+typeof d+")"),g[e]=d);g=a.extend({},a.fn.cycle.defaults,f,g),g.slideNum=f.slideCount;try{delete g.API,delete g.slideCount,delete g.currSlide,delete g.nextSlide,delete g.slides}catch(i){}return g},getSlideOpts:function(b){var c=this.opts();void 0===b&&(b=c.currSlide);var d=c.slides[b],e=a(d).data("cycle.opts");return a.extend({},c,e)},initSlide:function(b,c,d){var e=this.opts();c.css(b.slideCss||{}),d>0&&c.css("zIndex",d),isNaN(b.speed)&&(b.speed=a.fx.speeds[b.speed]||a.fx.speeds._default),b.sync||(b.speed=b.speed/2),c.addClass(e.slideClass)},updateView:function(a,b){var c=this.opts();if(c._initialized){var d=c.API.getSlideOpts(),e=c.slides[c.currSlide];!a&&b!==!0&&(c.API.trigger("cycle-update-view-before",[c,d,e]),c.updateView<0)||(c.slideActiveClass&&c.slides.removeClass(c.slideActiveClass).eq(c.currSlide).addClass(c.slideActiveClass),a&&c.hideNonActive&&c.slides.filter(":not(."+c.slideActiveClass+")").css("visibility","hidden"),0===c.updateView&&setTimeout(function(){c.API.trigger("cycle-update-view",[c,d,e,a])},d.speed/(c.sync?2:1)),0!==c.updateView&&c.API.trigger("cycle-update-view",[c,d,e,a]),a&&c.API.trigger("cycle-update-view-after",[c,d,e]))}},getComponent:function(b){var c=this.opts(),d=c[b];return"string"==typeof d?/^\s*[\>|\+|~]/.test(d)?c.container.find(d):a(d):d.jquery?d:a(d)},stackSlides:function(b,c,d){var e=this.opts();b||(b=e.slides[e.currSlide],c=e.slides[e.nextSlide],d=!e.reverse),a(b).css("zIndex",e.maxZ);var f,g=e.maxZ-2,h=e.slideCount;if(d){for(f=e.currSlide+1;h>f;f++)a(e.slides[f]).css("zIndex",g--);for(f=0;f<e.currSlide;f++)a(e.slides[f]).css("zIndex",g--)}else{for(f=e.currSlide-1;f>=0;f--)a(e.slides[f]).css("zIndex",g--);for(f=h-1;f>e.currSlide;f--)a(e.slides[f]).css("zIndex",g--)}a(c).css("zIndex",e.maxZ-1)},getSlideIndex:function(a){return this.opts().slides.index(a)}},a.fn.cycle.log=function(){window.console&&console.log&&console.log("[cycle2] "+Array.prototype.join.call(arguments," "))},a.fn.cycle.version=function(){return"Cycle2: "+c},a.fn.cycle.transitions={custom:{},none:{before:function(a,b,c,d){a.API.stackSlides(c,b,d),a.cssBefore={opacity:1,visibility:"visible",display:"block"}}},fade:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:0,visibility:"visible",display:"block"}),b.animIn={opacity:1},b.animOut={opacity:0}}},fadeout:{before:function(b,c,d,e){var f=b.API.getSlideOpts(b.nextSlide).slideCss||{};b.API.stackSlides(c,d,e),b.cssBefore=a.extend(f,{opacity:1,visibility:"visible",display:"block"}),b.animOut={opacity:0}}},scrollHorz:{before:function(a,b,c,d){a.API.stackSlides(b,c,d);var e=a.container.css("overflow","hidden").width();a.cssBefore={left:d?e:-e,top:0,opacity:1,visibility:"visible",display:"block"},a.cssAfter={zIndex:a._maxZ-2,left:0},a.animIn={left:0},a.animOut={left:d?-e:e}}}},a.fn.cycle.defaults={allowWrap:!0,autoSelector:".cycle-slideshow[data-cycle-auto-init!=false]",delay:0,easing:null,fx:"fade",hideNonActive:!0,loop:0,manualFx:void 0,manualSpeed:void 0,manualTrump:!0,maxZ:100,pauseOnHover:!1,reverse:!1,slideActiveClass:"cycle-slide-active",slideClass:"cycle-slide",slideCss:{position:"absolute",top:0,left:0},slides:"> img",speed:500,startingSlide:0,sync:!0,timeout:4e3,updateView:0},a(document).ready(function(){a(a.fn.cycle.defaults.autoSelector).cycle()})}(jQuery),/*! Cycle2 autoheight plugin; Copyright (c) M.Alsup, 2012; version: 20130913 */
function(a){"use strict";function b(b,d){var e,f,g,h=d.autoHeight;if("container"==h)f=a(d.slides[d.currSlide]).outerHeight(),d.container.height(f);else if(d._autoHeightRatio)d.container.height(d.container.width()/d._autoHeightRatio);else if("calc"===h||"number"==a.type(h)&&h>=0){if(g="calc"===h?c(b,d):h>=d.slides.length?0:h,g==d._sentinelIndex)return;d._sentinelIndex=g,d._sentinel&&d._sentinel.remove(),e=a(d.slides[g].cloneNode(!0)),e.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"),e.css({position:"static",visibility:"hidden",display:"block"}).prependTo(d.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"),e.find("*").css("visibility","hidden"),d._sentinel=e}}function c(b,c){var d=0,e=-1;return c.slides.each(function(b){var c=a(this).height();c>e&&(e=c,d=b)}),d}function d(b,c,d,e){var f=a(e).outerHeight();c.container.animate({height:f},c.autoHeightSpeed,c.autoHeightEasing)}function e(c,f){f._autoHeightOnResize&&(a(window).off("resize orientationchange",f._autoHeightOnResize),f._autoHeightOnResize=null),f.container.off("cycle-slide-added cycle-slide-removed",b),f.container.off("cycle-destroyed",e),f.container.off("cycle-before",d),f._sentinel&&(f._sentinel.remove(),f._sentinel=null)}a.extend(a.fn.cycle.defaults,{autoHeight:0,autoHeightSpeed:250,autoHeightEasing:null}),a(document).on("cycle-initialized",function(c,f){function g(){b(c,f)}var h,i=f.autoHeight,j=a.type(i),k=null;("string"===j||"number"===j)&&(f.container.on("cycle-slide-added cycle-slide-removed",b),f.container.on("cycle-destroyed",e),"container"==i?f.container.on("cycle-before",d):"string"===j&&/\d+\:\d+/.test(i)&&(h=i.match(/(\d+)\:(\d+)/),h=h[1]/h[2],f._autoHeightRatio=h),"number"!==j&&(f._autoHeightOnResize=function(){clearTimeout(k),k=setTimeout(g,50)},a(window).on("resize orientationchange",f._autoHeightOnResize)),setTimeout(g,30))})}(jQuery),/*! caption plugin for Cycle2;  version: 20130306 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{caption:"> .cycle-caption",captionTemplate:"{{slideNum}} / {{slideCount}}",overlay:"> .cycle-overlay",overlayTemplate:"<div>{{title}}</div><div>{{desc}}</div>",captionModule:"caption"}),a(document).on("cycle-update-view",function(b,c,d,e){if("caption"===c.captionModule){a.each(["caption","overlay"],function(){var a=this,b=d[a+"Template"],f=c.API.getComponent(a);f.length&&b?(f.html(c.API.tmpl(b,d,c,e)),f.show()):f.hide()})}}),a(document).on("cycle-destroyed",function(b,c){var d;a.each(["caption","overlay"],function(){var a=this,b=c[a+"Template"];c[a]&&b&&(d=c.API.getComponent("caption"),d.empty())})})}(jQuery),/*! command plugin for Cycle2;  version: 20140415 */
function(a){"use strict";var b=a.fn.cycle;a.fn.cycle=function(c){var d,e,f,g=a.makeArray(arguments);return"number"==a.type(c)?this.cycle("goto",c):"string"==a.type(c)?this.each(function(){var h;return d=c,f=a(this).data("cycle.opts"),void 0===f?void b.log('slideshow must be initialized before sending commands; "'+d+'" ignored'):(d="goto"==d?"jump":d,e=f.API[d],a.isFunction(e)?(h=a.makeArray(g),h.shift(),e.apply(f.API,h)):void b.log("unknown command: ",d))}):b.apply(this,arguments)},a.extend(a.fn.cycle,b),a.extend(b.API,{next:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?-1:1;a.allowWrap===!1&&a.currSlide+b>=a.slideCount||(a.API.advanceSlide(b),a.API.trigger("cycle-next",[a]).log("cycle-next"))}},prev:function(){var a=this.opts();if(!a.busy||a.manualTrump){var b=a.reverse?1:-1;a.allowWrap===!1&&a.currSlide+b<0||(a.API.advanceSlide(b),a.API.trigger("cycle-prev",[a]).log("cycle-prev"))}},destroy:function(){this.stop();var b=this.opts(),c=a.isFunction(a._data)?a._data:a.noop;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stop(),b.API.trigger("cycle-destroyed",[b]).log("cycle-destroyed"),b.container.removeData(),c(b.container[0],"parsedAttrs",!1),b.retainStylesOnDestroy||(b.container.removeAttr("style"),b.slides.removeAttr("style"),b.slides.removeClass(b.slideActiveClass)),b.slides.each(function(){var d=a(this);d.removeData(),d.removeClass(b.slideClass),c(this,"parsedAttrs",!1)})},jump:function(a,b){var c,d=this.opts();if(!d.busy||d.manualTrump){var e=parseInt(a,10);if(isNaN(e)||0>e||e>=d.slides.length)return void d.API.log("goto: invalid slide index: "+e);if(e==d.currSlide)return void d.API.log("goto: skipping, already on slide",e);d.nextSlide=e,clearTimeout(d.timeoutId),d.timeoutId=0,d.API.log("goto: ",e," (zero-index)"),c=d.currSlide<d.nextSlide,d._tempFx=b,d.API.prepareTx(!0,c)}},stop:function(){var b=this.opts(),c=b.container;clearTimeout(b.timeoutId),b.timeoutId=0,b.API.stopTransition(),b.pauseOnHover&&(b.pauseOnHover!==!0&&(c=a(b.pauseOnHover)),c.off("mouseenter mouseleave")),b.API.trigger("cycle-stopped",[b]).log("cycle-stopped")},reinit:function(){var a=this.opts();a.API.destroy(),a.container.cycle()},remove:function(b){for(var c,d,e=this.opts(),f=[],g=1,h=0;h<e.slides.length;h++)c=e.slides[h],h==b?d=c:(f.push(c),a(c).data("cycle.opts").slideNum=g,g++);d&&(e.slides=a(f),e.slideCount--,a(d).remove(),b==e.currSlide?e.API.advanceSlide(1):b<e.currSlide?e.currSlide--:e.currSlide++,e.API.trigger("cycle-slide-removed",[e,b,d]).log("cycle-slide-removed"),e.API.updateView())}}),a(document).on("click.cycle","[data-cycle-cmd]",function(b){b.preventDefault();var c=a(this),d=c.data("cycle-cmd"),e=c.data("cycle-context")||".cycle-slideshow";a(e).cycle(d,c.data("cycle-arg"))})}(jQuery),/*! hash plugin for Cycle2;  version: 20130905 */
function(a){"use strict";function b(b,c){var d;return b._hashFence?void(b._hashFence=!1):(d=window.location.hash.substring(1),void b.slides.each(function(e){if(a(this).data("cycle-hash")==d){if(c===!0)b.startingSlide=e;else{var f=b.currSlide<e;b.nextSlide=e,b.API.prepareTx(!0,f)}return!1}}))}a(document).on("cycle-pre-initialize",function(c,d){b(d,!0),d._onHashChange=function(){b(d,!1)},a(window).on("hashchange",d._onHashChange)}),a(document).on("cycle-update-view",function(a,b,c){c.hash&&"#"+c.hash!=window.location.hash&&(b._hashFence=!0,window.location.hash=c.hash)}),a(document).on("cycle-destroyed",function(b,c){c._onHashChange&&a(window).off("hashchange",c._onHashChange)})}(jQuery),/*! loader plugin for Cycle2;  version: 20131121 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{loader:!1}),a(document).on("cycle-bootstrap",function(b,c){function d(b,d){function f(b){var f;"wait"==c.loader?(h.push(b),0===j&&(h.sort(g),e.apply(c.API,[h,d]),c.container.removeClass("cycle-loading"))):(f=a(c.slides[c.currSlide]),e.apply(c.API,[b,d]),f.show(),c.container.removeClass("cycle-loading"))}function g(a,b){return a.data("index")-b.data("index")}var h=[];if("string"==a.type(b))b=a.trim(b);else if("array"===a.type(b))for(var i=0;i<b.length;i++)b[i]=a(b[i])[0];b=a(b);var j=b.length;j&&(b.css("visibility","hidden").appendTo("body").each(function(b){function g(){0===--i&&(--j,f(k))}var i=0,k=a(this),l=k.is("img")?k:k.find("img");return k.data("index",b),l=l.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'),l.length?(i=l.length,void l.each(function(){this.complete?g():a(this).load(function(){g()}).on("error",function(){0===--i&&(c.API.log("slide skipped; img not loaded:",this.src),0===--j&&"wait"==c.loader&&e.apply(c.API,[h,d]))})})):(--j,void h.push(k))}),j&&c.container.addClass("cycle-loading"))}var e;c.loader&&(e=c.API.add,c.API.add=d)})}(jQuery),/*! pager plugin for Cycle2;  version: 20140415 */
function(a){"use strict";function b(b,c,d){var e,f=b.API.getComponent("pager");f.each(function(){var f=a(this);if(c.pagerTemplate){var g=b.API.tmpl(c.pagerTemplate,c,b,d[0]);e=a(g).appendTo(f)}else e=f.children().eq(b.slideCount-1);e.on(b.pagerEvent,function(a){b.pagerEventBubble||a.preventDefault(),b.API.page(f,a.currentTarget)})})}function c(a,b){var c=this.opts();if(!c.busy||c.manualTrump){var d=a.children().index(b),e=d,f=c.currSlide<e;c.currSlide!=e&&(c.nextSlide=e,c._tempFx=c.pagerFx,c.API.prepareTx(!0,f),c.API.trigger("cycle-pager-activated",[c,a,b]))}}a.extend(a.fn.cycle.defaults,{pager:"> .cycle-pager",pagerActiveClass:"cycle-pager-active",pagerEvent:"click.cycle",pagerEventBubble:void 0,pagerTemplate:"<span>&bull;</span>"}),a(document).on("cycle-bootstrap",function(a,c,d){d.buildPagerLink=b}),a(document).on("cycle-slide-added",function(a,b,d,e){b.pager&&(b.API.buildPagerLink(b,d,e),b.API.page=c)}),a(document).on("cycle-slide-removed",function(b,c,d){if(c.pager){var e=c.API.getComponent("pager");e.each(function(){var b=a(this);a(b.children()[d]).remove()})}}),a(document).on("cycle-update-view",function(b,c){var d;c.pager&&(d=c.API.getComponent("pager"),d.each(function(){a(this).children().removeClass(c.pagerActiveClass).eq(c.currSlide).addClass(c.pagerActiveClass)}))}),a(document).on("cycle-destroyed",function(a,b){var c=b.API.getComponent("pager");c&&(c.children().off(b.pagerEvent),b.pagerTemplate&&c.empty())})}(jQuery),/*! prevnext plugin for Cycle2;  version: 20140408 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{next:"> .cycle-next",nextEvent:"click.cycle",disabledClass:"disabled",prev:"> .cycle-prev",prevEvent:"click.cycle",swipe:!1}),a(document).on("cycle-initialized",function(a,b){if(b.API.getComponent("next").on(b.nextEvent,function(a){a.preventDefault(),b.API.next()}),b.API.getComponent("prev").on(b.prevEvent,function(a){a.preventDefault(),b.API.prev()}),b.swipe){var c=b.swipeVert?"swipeUp.cycle":"swipeLeft.cycle swipeleft.cycle",d=b.swipeVert?"swipeDown.cycle":"swipeRight.cycle swiperight.cycle";b.container.on(c,function(){b._tempFx=b.swipeFx,b.API.next()}),b.container.on(d,function(){b._tempFx=b.swipeFx,b.API.prev()})}}),a(document).on("cycle-update-view",function(a,b){if(!b.allowWrap){var c=b.disabledClass,d=b.API.getComponent("next"),e=b.API.getComponent("prev"),f=b._prevBoundry||0,g=void 0!==b._nextBoundry?b._nextBoundry:b.slideCount-1;b.currSlide==g?d.addClass(c).prop("disabled",!0):d.removeClass(c).prop("disabled",!1),b.currSlide===f?e.addClass(c).prop("disabled",!0):e.removeClass(c).prop("disabled",!1)}}),a(document).on("cycle-destroyed",function(a,b){b.API.getComponent("prev").off(b.nextEvent),b.API.getComponent("next").off(b.prevEvent),b.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")})}(jQuery),/*! progressive loader plugin for Cycle2;  version: 20130315 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{progressive:!1}),a(document).on("cycle-pre-initialize",function(b,c){if(c.progressive){var d,e,f=c.API,g=f.next,h=f.prev,i=f.prepareTx,j=a.type(c.progressive);if("array"==j)d=c.progressive;else if(a.isFunction(c.progressive))d=c.progressive(c);else if("string"==j){if(e=a(c.progressive),d=a.trim(e.html()),!d)return;if(/^(\[)/.test(d))try{d=a.parseJSON(d)}catch(k){return void f.log("error parsing progressive slides",k)}else d=d.split(new RegExp(e.data("cycle-split")||"\n")),d[d.length-1]||d.pop()}i&&(f.prepareTx=function(a,b){var e,f;return a||0===d.length?void i.apply(c.API,[a,b]):void(b&&c.currSlide==c.slideCount-1?(f=d[0],d=d.slice(1),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.API.advanceSlide(1)},50)}),c.API.add(f)):b||0!==c.currSlide?i.apply(c.API,[a,b]):(e=d.length-1,f=d[e],d=d.slice(0,e),c.container.one("cycle-slide-added",function(a,b){setTimeout(function(){b.currSlide=1,b.API.advanceSlide(-1)},50)}),c.API.add(f,!0)))}),g&&(f.next=function(){var a=this.opts();if(d.length&&a.currSlide==a.slideCount-1){var b=d[0];d=d.slice(1),a.container.one("cycle-slide-added",function(a,b){g.apply(b.API),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(b)}else g.apply(a.API)}),h&&(f.prev=function(){var a=this.opts();if(d.length&&0===a.currSlide){var b=d.length-1,c=d[b];d=d.slice(0,b),a.container.one("cycle-slide-added",function(a,b){b.currSlide=1,b.API.advanceSlide(-1),b.container.removeClass("cycle-loading")}),a.container.addClass("cycle-loading"),a.API.add(c,!0)}else h.apply(a.API)})}})}(jQuery),/*! tmpl plugin for Cycle2;  version: 20121227 */
function(a){"use strict";a.extend(a.fn.cycle.defaults,{tmplRegex:"{{((.)?.*?)}}"}),a.extend(a.fn.cycle.API,{tmpl:function(b,c){var d=new RegExp(c.tmplRegex||a.fn.cycle.defaults.tmplRegex,"g"),e=a.makeArray(arguments);return e.shift(),b.replace(d,function(b,c){var d,f,g,h,i=c.split(".");for(d=0;d<e.length;d++)if(g=e[d]){if(i.length>1)for(h=g,f=0;f<i.length;f++)g=h,h=h[i[f]]||c;else h=g[c];if(a.isFunction(h))return h.apply(g,e);if(void 0!==h&&null!==h&&h!=c)return h}return c})}})}(jQuery);
//# sourceMappingURL=jquery.cycle2.js.map

/**
 * Lightbox v2.7.1
 * by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/
 *
 * @license http://creativecommons.org/licenses/by/2.5/
 * - Free for use in both personal and commercial projects
 * - Attribution requires leaving author name, author link, and the license info intact
 */

(function() {
  // Use local alias
  var $ = jQuery;

  var LightboxOptions = (function() {
    function LightboxOptions() {
      this.fadeDuration                = 500;
      this.fitImagesInViewport         = true;
      this.resizeDuration              = 700;
      this.positionFromTop             = 50;
      this.showImageNumberLabel        = false;
      this.alwaysShowNavOnTouchDevices = false;
      this.wrapAround                  = false;
    }
    
    // Change to localize to non-english language
    LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
      return "Image " + curImageNum + " of " + albumSize;
    };

    return LightboxOptions;
  })();


  var Lightbox = (function() {
    function Lightbox(options) {
      this.options           = options;
      this.album             = [];
      this.currentImageIndex = void 0;
      this.init();
    }

    Lightbox.prototype.init = function() {
      this.enable();
      this.build();
    };

    // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
    // that contain 'lightbox'. When these are clicked, start lightbox.
    Lightbox.prototype.enable = function() {
      var self = this;
      $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
        self.start($(event.currentTarget));
        return false;
      });
    };

    // Build html for the lightbox and the overlay.
    // Attach event handlers to the new DOM elements. click click click
    Lightbox.prototype.build = function() {
      var self = this;
      $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($('body'));
      
      // Cache jQuery objects
      this.$lightbox       = $('#lightbox');
      this.$overlay        = $('#lightboxOverlay');
      this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
      this.$container      = this.$lightbox.find('.lb-container');

      // Store css values for future lookup
      this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
      this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
      this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
      this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);
      
      // Attach event handlers to the newly minted DOM elements
      this.$overlay.hide().on('click', function() {
        self.end();
        return false;
      });

      this.$lightbox.hide().on('click', function(event) {
        if ($(event.target).attr('id') === 'lightbox') {
          self.end();
        }
        return false;
      });

      this.$outerContainer.on('click', function(event) {
        if ($(event.target).attr('id') === 'lightbox') {
          self.end();
        }
        return false;
      });

      this.$lightbox.find('.lb-prev').on('click', function() {
        if (self.currentImageIndex === 0) {
          self.changeImage(self.album.length - 1);
        } else {
          self.changeImage(self.currentImageIndex - 1);
        }
        return false;
      });

      this.$lightbox.find('.lb-next').on('click', function() {
        if (self.currentImageIndex === self.album.length - 1) {
          self.changeImage(0);
        } else {
          self.changeImage(self.currentImageIndex + 1);
        }
        return false;
      });

      this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
        self.end();
        return false;
      });
    };

    // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
    Lightbox.prototype.start = function($link) {
      var self    = this;
      var $window = $(window);

      $window.on('resize', $.proxy(this.sizeOverlay, this));

      $('select, object, embed').css({
        visibility: "hidden"
      });

      this.sizeOverlay();

      this.album = [];
      var imageNumber = 0;

      function addToAlbum($link) {
        self.album.push({
          link: $link.attr('href'),
          title: $link.attr('data-title') || $link.attr('title')
        });
      }

      // Support both data-lightbox attribute and rel attribute implementations
      var dataLightboxValue = $link.attr('data-lightbox');
      var $links;

      if (dataLightboxValue) {
        $links = $($link.prop("tagName") + '[data-lightbox="' + dataLightboxValue + '"]');
        for (var i = 0; i < $links.length; i = ++i) {
          addToAlbum($($links[i]));
          if ($links[i] === $link[0]) {
            imageNumber = i;
          }
        }
      } else {
        if ($link.attr('rel') === 'lightbox') {
          // If image is not part of a set
          addToAlbum($link);
        } else {
          // If image is part of a set
          $links = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
          for (var j = 0; j < $links.length; j = ++j) {
            addToAlbum($($links[j]));
            if ($links[j] === $link[0]) {
              imageNumber = j;
            }
          }
        }
      }
      
      // Position Lightbox
      var top  = $window.scrollTop() + this.options.positionFromTop;
      var left = $window.scrollLeft();
      this.$lightbox.css({
        top: top + 'px',
        left: left + 'px'
      }).fadeIn(this.options.fadeDuration);

      this.changeImage(imageNumber);
    };

    // Hide most UI elements in preparation for the animated resizing of the lightbox.
    Lightbox.prototype.changeImage = function(imageNumber) {
      var self = this;

      this.disableKeyboardNav();
      var $image = this.$lightbox.find('.lb-image');

      this.$overlay.fadeIn(this.options.fadeDuration);

      $('.lb-loader').fadeIn('slow');
      this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

      this.$outerContainer.addClass('animating');

      // When image to show is preloaded, we send the width and height to sizeContainer()
      var preloader = new Image();
      preloader.onload = function() {
        var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;
        $image.attr('src', self.album[imageNumber].link);

        $preloader = $(preloader);

        $image.width(preloader.width);
        $image.height(preloader.height);
        
        if (self.options.fitImagesInViewport) {
          // Fit image inside the viewport.
          // Take into account the border around the image and an additional 10px gutter on each side.

          windowWidth    = $(window).width();
          windowHeight   = $(window).height();
          maxImageWidth  = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20;
          maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - 120;

          // Is there a fitting issue?
          if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
            if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
              imageWidth  = maxImageWidth;
              imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            } else {
              imageHeight = maxImageHeight;
              imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            }
          }
        }
        self.sizeContainer($image.width(), $image.height());
      };

      preloader.src          = this.album[imageNumber].link;
      this.currentImageIndex = imageNumber;
    };

    // Stretch overlay to fit the viewport
    Lightbox.prototype.sizeOverlay = function() {
      this.$overlay
        .width($(window).width())
        .height($(document).height());
    };

    // Animate the size of the lightbox to fit the image we are showing
    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
      var self = this;
      
      var oldWidth  = this.$outerContainer.outerWidth();
      var oldHeight = this.$outerContainer.outerHeight();
      var newWidth  = imageWidth + this.containerLeftPadding + this.containerRightPadding;
      var newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;
      
      function postResize() {
        self.$lightbox.find('.lb-dataContainer').width(newWidth);
        self.$lightbox.find('.lb-prevLink').height(newHeight);
        self.$lightbox.find('.lb-nextLink').height(newHeight);
        self.showImage();
      }

      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        this.$outerContainer.animate({
          width: newWidth,
          height: newHeight
        }, this.options.resizeDuration, 'swing', function() {
          postResize();
        });
      } else {
        postResize();
      }
    };

    // Display the image and it's details and begin preload neighboring images.
    Lightbox.prototype.showImage = function() {
      this.$lightbox.find('.lb-loader').hide();
      this.$lightbox.find('.lb-image').fadeIn('slow');
    
      this.updateNav();
      this.updateDetails();
      this.preloadNeighboringImages();
      this.enableKeyboardNav();
    };

    // Display previous and next navigation if appropriate.
    Lightbox.prototype.updateNav = function() {
      // Check to see if the browser supports touch events. If so, we take the conservative approach
      // and assume that mouse hover events are not supported and always show prev/next navigation
      // arrows in image sets.
      var alwaysShowNav = false;
      try {
        document.createEvent("TouchEvent");
        alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices)? true: false;
      } catch (e) {}

      this.$lightbox.find('.lb-nav').show();

      if (this.album.length > 1) {
        if (this.options.wrapAround) {
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
          }
          this.$lightbox.find('.lb-prev, .lb-next').show();
        } else {
          if (this.currentImageIndex > 0) {
            this.$lightbox.find('.lb-prev').show();
            if (alwaysShowNav) {
              this.$lightbox.find('.lb-prev').css('opacity', '1');
            }
          }
          if (this.currentImageIndex < this.album.length - 1) {
            this.$lightbox.find('.lb-next').show();
            if (alwaysShowNav) {
              this.$lightbox.find('.lb-next').css('opacity', '1');
            }
          }
        }
      }
    };

    // Display caption, image number, and closing button.
    Lightbox.prototype.updateDetails = function() {
      var self = this;

      // Enable anchor clicks in the injected caption html.
      // Thanks Nate Wright for the fix. @https://github.com/NateWr
      if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
        this.$lightbox.find('.lb-caption')
          .html(this.album[this.currentImageIndex].title)
          .fadeIn('fast')
          .find('a').on('click', function(event){
            location.href = $(this).attr('href');
          });
      }
    
      if (this.album.length > 1 && this.options.showImageNumberLabel) {
        this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast');
      } else {
        this.$lightbox.find('.lb-number').hide();
      }
    
      this.$outerContainer.removeClass('animating');
    
      this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
        return self.sizeOverlay();
      });
    };

    // Preload previous and next images in set.
    Lightbox.prototype.preloadNeighboringImages = function() {
      if (this.album.length > this.currentImageIndex + 1) {
        var preloadNext = new Image();
        preloadNext.src = this.album[this.currentImageIndex + 1].link;
      }
      if (this.currentImageIndex > 0) {
        var preloadPrev = new Image();
        preloadPrev.src = this.album[this.currentImageIndex - 1].link;
      }
    };

    Lightbox.prototype.enableKeyboardNav = function() {
      $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };

    Lightbox.prototype.disableKeyboardNav = function() {
      $(document).off('.keyboard');
    };

    Lightbox.prototype.keyboardAction = function(event) {
      var KEYCODE_ESC        = 27;
      var KEYCODE_LEFTARROW  = 37;
      var KEYCODE_RIGHTARROW = 39;

      var keycode = event.keyCode;
      var key     = String.fromCharCode(keycode).toLowerCase();
      if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
        this.end();
      } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
        if (this.currentImageIndex !== 0) {
          this.changeImage(this.currentImageIndex - 1);
        } else if (this.options.wrapAround && this.album.length > 1) {
          this.changeImage(this.album.length - 1);
        }
      } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
        if (this.currentImageIndex !== this.album.length - 1) {
          this.changeImage(this.currentImageIndex + 1);
        } else if (this.options.wrapAround && this.album.length > 1) {
          this.changeImage(0);
        }
      }
    };

    // Closing time. :-(
    Lightbox.prototype.end = function() {
      this.disableKeyboardNav();
      $(window).off("resize", this.sizeOverlay);
      this.$lightbox.fadeOut(this.options.fadeDuration);
      this.$overlay.fadeOut(this.options.fadeDuration);
      $('select, object, embed').css({
        visibility: "visible"
      });
    };

    return Lightbox;

  })();

  $(function() {
    var options  = new LightboxOptions();
    var lightbox = new Lightbox(options);
  });

}).call(this);

;(function($,window,document,undefined){var pluginName='stellar',defaults={scrollProperty:'scroll',positionProperty:'position',horizontalScrolling:true,verticalScrolling:true,horizontalOffset:0,verticalOffset:0,responsive:false,parallaxBackgrounds:true,parallaxElements:true,hideDistantElements:true,hideElement:function($elem){$elem.hide();},showElement:function($elem){$elem.show();}},scrollProperty={scroll:{getLeft:function($elem){return $elem.scrollLeft();},setLeft:function($elem,val){$elem.scrollLeft(val);},getTop:function($elem){return $elem.scrollTop();},setTop:function($elem,val){$elem.scrollTop(val);}},position:{getLeft:function($elem){return parseInt($elem.css('left'),10)*-1;},getTop:function($elem){return parseInt($elem.css('top'),10)*-1;}},margin:{getLeft:function($elem){return parseInt($elem.css('margin-left'),10)*-1;},getTop:function($elem){return parseInt($elem.css('margin-top'),10)*-1;}},transform:{getLeft:function($elem){var computedTransform=getComputedStyle($elem[0])[prefixedTransform];return(computedTransform!=='none'?parseInt(computedTransform.match(/(-?[0-9]+)/g)[4],10)*-1:0);},getTop:function($elem){var computedTransform=getComputedStyle($elem[0])[prefixedTransform];return(computedTransform!=='none'?parseInt(computedTransform.match(/(-?[0-9]+)/g)[5],10)*-1:0);}}},positionProperty={position:{setLeft:function($elem,left){$elem.css('left',left);},setTop:function($elem,top){$elem.css('top',top);}},transform:{setPosition:function($elem,left,startingLeft,top,startingTop){$elem[0].style[prefixedTransform]='translate3d('+(left-startingLeft)+'px, '+(top-startingTop)+'px, 0)';}}},vendorPrefix=(function(){var prefixes=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,style=$('script')[0].style,prefix='',prop;for(prop in style){if(prefixes.test(prop)){prefix=prop.match(prefixes)[0];break;}}if('WebkitOpacity'in style){prefix='Webkit';}if('KhtmlOpacity'in style){prefix='Khtml';}return function(property){return prefix+(prefix.length>0?property.charAt(0).toUpperCase()+property.slice(1):property);};}()),prefixedTransform=vendorPrefix('transform'),supportsBackgroundPositionXY=$('<div />',{style:'background:#fff'}).css('background-position-x')!==undefined,setBackgroundPosition=(supportsBackgroundPositionXY?function($elem,x,y){$elem.css({'background-position-x':x,'background-position-y':y});}:function($elem,x,y){$elem.css('background-position',x+' '+y);}),getBackgroundPosition=(supportsBackgroundPositionXY?function($elem){return[$elem.css('background-position-x'),$elem.css('background-position-y')];}:function($elem){return $elem.css('background-position').split(' ');}),requestAnimFrame=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){setTimeout(callback,1000/60);});function Plugin(element,options){this.element=element;this.options=$.extend({},defaults,options);this._defaults=defaults;this._name=pluginName;this.init();}Plugin.prototype={init:function(){this.options.name=pluginName+'_'+Math.floor(Math.random()*1e9);this._defineElements();this._defineGetters();this._defineSetters();this._handleWindowLoadAndResize();this._detectViewport();this.refresh({firstLoad:true});if(this.options.scrollProperty==='scroll'){this._handleScrollEvent();}else{this._startAnimationLoop();}},_defineElements:function(){if(this.element===document.body)this.element=window;this.$scrollElement=$(this.element);this.$element=(this.element===window?$('body'):this.$scrollElement);this.$viewportElement=(this.options.viewportElement!==undefined?$(this.options.viewportElement):(this.$scrollElement[0]===window||this.options.scrollProperty==='scroll'?this.$scrollElement:this.$scrollElement.parent()));},_defineGetters:function(){var self=this,scrollPropertyAdapter=scrollProperty[self.options.scrollProperty];this._getScrollLeft=function(){return scrollPropertyAdapter.getLeft(self.$scrollElement);};this._getScrollTop=function(){return scrollPropertyAdapter.getTop(self.$scrollElement);};},_defineSetters:function(){var self=this,scrollPropertyAdapter=scrollProperty[self.options.scrollProperty],positionPropertyAdapter=positionProperty[self.options.positionProperty],setScrollLeft=scrollPropertyAdapter.setLeft,setScrollTop=scrollPropertyAdapter.setTop;this._setScrollLeft=(typeof setScrollLeft==='function'?function(val){setScrollLeft(self.$scrollElement,val);}:$.noop);this._setScrollTop=(typeof setScrollTop==='function'?function(val){setScrollTop(self.$scrollElement,val);}:$.noop);this._setPosition=positionPropertyAdapter.setPosition||function($elem,left,startingLeft,top,startingTop){if(self.options.horizontalScrolling){positionPropertyAdapter.setLeft($elem,left,startingLeft);}if(self.options.verticalScrolling){positionPropertyAdapter.setTop($elem,top,startingTop);}};},_handleWindowLoadAndResize:function(){var self=this,$window=$(window);if(self.options.responsive){$window.bind('load.'+this.name,function(){self.refresh();});}$window.bind('resize.'+this.name,function(){self._detectViewport();if(self.options.responsive){self.refresh();}});},refresh:function(options){var self=this,oldLeft=self._getScrollLeft(),oldTop=self._getScrollTop();if(!options||!options.firstLoad){this._reset();}this._setScrollLeft(0);this._setScrollTop(0);this._setOffsets();this._findParticles();this._findBackgrounds();if(options&&options.firstLoad&&/WebKit/.test(navigator.userAgent)){$(window).load(function(){var oldLeft=self._getScrollLeft(),oldTop=self._getScrollTop();self._setScrollLeft(oldLeft+1);self._setScrollTop(oldTop+1);self._setScrollLeft(oldLeft);self._setScrollTop(oldTop);});}this._setScrollLeft(oldLeft);this._setScrollTop(oldTop);},_detectViewport:function(){var viewportOffsets=this.$viewportElement.offset(),hasOffsets=viewportOffsets!==null&&viewportOffsets!==undefined;this.viewportWidth=this.$viewportElement.width();this.viewportHeight=this.$viewportElement.height();this.viewportOffsetTop=(hasOffsets?viewportOffsets.top:0);this.viewportOffsetLeft=(hasOffsets?viewportOffsets.left:0);},_findParticles:function(){var self=this,scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop();if(this.particles!==undefined){for(var i=this.particles.length-1;i>=0;i--){this.particles[i].$element.data('stellar-elementIsActive',undefined);}}this.particles=[];if(!this.options.parallaxElements)return;this.$element.find('[data-stellar-ratio]').each(function(i){var $this=$(this),horizontalOffset,verticalOffset,positionLeft,positionTop,marginLeft,marginTop,$offsetParent,offsetLeft,offsetTop,parentOffsetLeft=0,parentOffsetTop=0,tempParentOffsetLeft=0,tempParentOffsetTop=0;if(!$this.data('stellar-elementIsActive')){$this.data('stellar-elementIsActive',this);}else if($this.data('stellar-elementIsActive')!==this){return;}self.options.showElement($this);if(!$this.data('stellar-startingLeft')){$this.data('stellar-startingLeft',$this.css('left'));$this.data('stellar-startingTop',$this.css('top'));}else{$this.css('left',$this.data('stellar-startingLeft'));$this.css('top',$this.data('stellar-startingTop'));}positionLeft=$this.position().left;positionTop=$this.position().top;marginLeft=($this.css('margin-left')==='auto')?0:parseInt($this.css('margin-left'),10);marginTop=($this.css('margin-top')==='auto')?0:parseInt($this.css('margin-top'),10);offsetLeft=$this.offset().left-marginLeft;offsetTop=$this.offset().top-marginTop;$this.parents().each(function(){var $this=$(this);if($this.data('stellar-offset-parent')===true){parentOffsetLeft=tempParentOffsetLeft;parentOffsetTop=tempParentOffsetTop;$offsetParent=$this;return false;}else{tempParentOffsetLeft+=$this.position().left;tempParentOffsetTop+=$this.position().top;}});horizontalOffset=($this.data('stellar-horizontal-offset')!==undefined?$this.data('stellar-horizontal-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-horizontal-offset')!==undefined?$offsetParent.data('stellar-horizontal-offset'):self.horizontalOffset));verticalOffset=($this.data('stellar-vertical-offset')!==undefined?$this.data('stellar-vertical-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-vertical-offset')!==undefined?$offsetParent.data('stellar-vertical-offset'):self.verticalOffset));self.particles.push({$element:$this,$offsetParent:$offsetParent,isFixed:$this.css('position')==='fixed',horizontalOffset:horizontalOffset,verticalOffset:verticalOffset,startingPositionLeft:positionLeft,startingPositionTop:positionTop,startingOffsetLeft:offsetLeft,startingOffsetTop:offsetTop,parentOffsetLeft:parentOffsetLeft,parentOffsetTop:parentOffsetTop,stellarRatio:($this.data('stellar-ratio')!==undefined?$this.data('stellar-ratio'):1),width:$this.outerWidth(true),height:$this.outerHeight(true),isHidden:false});});},_findBackgrounds:function(){var self=this,scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop(),$backgroundElements;this.backgrounds=[];if(!this.options.parallaxBackgrounds)return;$backgroundElements=this.$element.find('[data-stellar-background-ratio]');if(this.$element.data('stellar-background-ratio')){$backgroundElements=$backgroundElements.add(this.$element);}$backgroundElements.each(function(){var $this=$(this),backgroundPosition=getBackgroundPosition($this),horizontalOffset,verticalOffset,positionLeft,positionTop,marginLeft,marginTop,offsetLeft,offsetTop,$offsetParent,parentOffsetLeft=0,parentOffsetTop=0,tempParentOffsetLeft=0,tempParentOffsetTop=0;if(!$this.data('stellar-backgroundIsActive')){$this.data('stellar-backgroundIsActive',this);}else if($this.data('stellar-backgroundIsActive')!==this){return;}if(!$this.data('stellar-backgroundStartingLeft')){$this.data('stellar-backgroundStartingLeft',backgroundPosition[0]);$this.data('stellar-backgroundStartingTop',backgroundPosition[1]);}else{setBackgroundPosition($this,$this.data('stellar-backgroundStartingLeft'),$this.data('stellar-backgroundStartingTop'));}marginLeft=($this.css('margin-left')==='auto')?0:parseInt($this.css('margin-left'),10);marginTop=($this.css('margin-top')==='auto')?0:parseInt($this.css('margin-top'),10);offsetLeft=$this.offset().left-marginLeft-scrollLeft;offsetTop=$this.offset().top-marginTop-scrollTop;$this.parents().each(function(){var $this=$(this);if($this.data('stellar-offset-parent')===true){parentOffsetLeft=tempParentOffsetLeft;parentOffsetTop=tempParentOffsetTop;$offsetParent=$this;return false;}else{tempParentOffsetLeft+=$this.position().left;tempParentOffsetTop+=$this.position().top;}});horizontalOffset=($this.data('stellar-horizontal-offset')!==undefined?$this.data('stellar-horizontal-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-horizontal-offset')!==undefined?$offsetParent.data('stellar-horizontal-offset'):self.horizontalOffset));verticalOffset=($this.data('stellar-vertical-offset')!==undefined?$this.data('stellar-vertical-offset'):($offsetParent!==undefined&&$offsetParent.data('stellar-vertical-offset')!==undefined?$offsetParent.data('stellar-vertical-offset'):self.verticalOffset));self.backgrounds.push({$element:$this,$offsetParent:$offsetParent,isFixed:$this.css('background-attachment')==='fixed',horizontalOffset:horizontalOffset,verticalOffset:verticalOffset,startingValueLeft:backgroundPosition[0],startingValueTop:backgroundPosition[1],startingBackgroundPositionLeft:(isNaN(parseInt(backgroundPosition[0],10))?0:parseInt(backgroundPosition[0],10)),startingBackgroundPositionTop:(isNaN(parseInt(backgroundPosition[1],10))?0:parseInt(backgroundPosition[1],10)),startingPositionLeft:$this.position().left,startingPositionTop:$this.position().top,startingOffsetLeft:offsetLeft,startingOffsetTop:offsetTop,parentOffsetLeft:parentOffsetLeft,parentOffsetTop:parentOffsetTop,stellarRatio:($this.data('stellar-background-ratio')===undefined?1:$this.data('stellar-background-ratio'))});});},_reset:function(){var particle,startingPositionLeft,startingPositionTop,background,i;for(i=this.particles.length-1;i>=0;i--){particle=this.particles[i];startingPositionLeft=particle.$element.data('stellar-startingLeft');startingPositionTop=particle.$element.data('stellar-startingTop');this._setPosition(particle.$element,startingPositionLeft,startingPositionLeft,startingPositionTop,startingPositionTop);this.options.showElement(particle.$element);particle.$element.data('stellar-startingLeft',null).data('stellar-elementIsActive',null).data('stellar-backgroundIsActive',null);}for(i=this.backgrounds.length-1;i>=0;i--){background=this.backgrounds[i];background.$element.data('stellar-backgroundStartingLeft',null).data('stellar-backgroundStartingTop',null);setBackgroundPosition(background.$element,background.startingValueLeft,background.startingValueTop);}},destroy:function(){this._reset();this.$scrollElement.unbind('resize.'+this.name).unbind('scroll.'+this.name);this._animationLoop=$.noop;$(window).unbind('load.'+this.name).unbind('resize.'+this.name);},_setOffsets:function(){var self=this,$window=$(window);$window.unbind('resize.horizontal-'+this.name).unbind('resize.vertical-'+this.name);if(typeof this.options.horizontalOffset==='function'){this.horizontalOffset=this.options.horizontalOffset();$window.bind('resize.horizontal-'+this.name,function(){self.horizontalOffset=self.options.horizontalOffset();});}else{this.horizontalOffset=this.options.horizontalOffset;}if(typeof this.options.verticalOffset==='function'){this.verticalOffset=this.options.verticalOffset();$window.bind('resize.vertical-'+this.name,function(){self.verticalOffset=self.options.verticalOffset();});}else{this.verticalOffset=this.options.verticalOffset;}},_repositionElements:function(){var scrollLeft=this._getScrollLeft(),scrollTop=this._getScrollTop(),horizontalOffset,verticalOffset,particle,fixedRatioOffset,background,bgLeft,bgTop,isVisibleVertical=true,isVisibleHorizontal=true,newPositionLeft,newPositionTop,newOffsetLeft,newOffsetTop,i;if(this.currentScrollLeft===scrollLeft&&this.currentScrollTop===scrollTop&&this.currentWidth===this.viewportWidth&&this.currentHeight===this.viewportHeight){return;}else{this.currentScrollLeft=scrollLeft;this.currentScrollTop=scrollTop;this.currentWidth=this.viewportWidth;this.currentHeight=this.viewportHeight;}for(i=this.particles.length-1;i>=0;i--){particle=this.particles[i];fixedRatioOffset=(particle.isFixed?1:0);if(this.options.horizontalScrolling){newPositionLeft=(scrollLeft+particle.horizontalOffset+this.viewportOffsetLeft+particle.startingPositionLeft-particle.startingOffsetLeft+particle.parentOffsetLeft)*-(particle.stellarRatio+fixedRatioOffset-1)+particle.startingPositionLeft;newOffsetLeft=newPositionLeft-particle.startingPositionLeft+particle.startingOffsetLeft;}else{newPositionLeft=particle.startingPositionLeft;newOffsetLeft=particle.startingOffsetLeft;}if(this.options.verticalScrolling){newPositionTop=(scrollTop+particle.verticalOffset+this.viewportOffsetTop+particle.startingPositionTop-particle.startingOffsetTop+particle.parentOffsetTop)*-(particle.stellarRatio+fixedRatioOffset-1)+particle.startingPositionTop;newOffsetTop=newPositionTop-particle.startingPositionTop+particle.startingOffsetTop;}else{newPositionTop=particle.startingPositionTop;newOffsetTop=particle.startingOffsetTop;}if(this.options.hideDistantElements){isVisibleHorizontal=!this.options.horizontalScrolling||newOffsetLeft+particle.width>(particle.isFixed?0:scrollLeft)&&newOffsetLeft<(particle.isFixed?0:scrollLeft)+this.viewportWidth+this.viewportOffsetLeft;isVisibleVertical=!this.options.verticalScrolling||newOffsetTop+particle.height>(particle.isFixed?0:scrollTop)&&newOffsetTop<(particle.isFixed?0:scrollTop)+this.viewportHeight+this.viewportOffsetTop;}if(isVisibleHorizontal&&isVisibleVertical){if(particle.isHidden){this.options.showElement(particle.$element);particle.isHidden=false;}this._setPosition(particle.$element,newPositionLeft,particle.startingPositionLeft,newPositionTop,particle.startingPositionTop);}else{if(!particle.isHidden){this.options.hideElement(particle.$element);particle.isHidden=true;}}}for(i=this.backgrounds.length-1;i>=0;i--){background=this.backgrounds[i];fixedRatioOffset=(background.isFixed?0:1);bgLeft=(this.options.horizontalScrolling?(scrollLeft+background.horizontalOffset-this.viewportOffsetLeft-background.startingOffsetLeft+background.parentOffsetLeft-background.startingBackgroundPositionLeft)*(fixedRatioOffset-background.stellarRatio)+'px':background.startingValueLeft);bgTop=(this.options.verticalScrolling?(scrollTop+background.verticalOffset-this.viewportOffsetTop-background.startingOffsetTop+background.parentOffsetTop-background.startingBackgroundPositionTop)*(fixedRatioOffset-background.stellarRatio)+'px':background.startingValueTop);setBackgroundPosition(background.$element,bgLeft,bgTop);}},_handleScrollEvent:function(){var self=this,ticking=false;var update=function(){self._repositionElements();ticking=false;};var requestTick=function(){if(!ticking){requestAnimFrame(update);ticking=true;}};this.$scrollElement.bind('scroll.'+this.name,requestTick);requestTick();},_startAnimationLoop:function(){var self=this;this._animationLoop=function(){requestAnimFrame(self._animationLoop);self._repositionElements();};this._animationLoop();}};$.fn[pluginName]=function(options){var args=arguments;if(options===undefined||typeof options==='object'){return this.each(function(){if(!$.data(this,'plugin_'+pluginName)){$.data(this,'plugin_'+pluginName,new Plugin(this,options));}});}else if(typeof options==='string'&&options[0]!=='_'&&options!=='init'){return this.each(function(){var instance=$.data(this,'plugin_'+pluginName);if(instance instanceof Plugin&&typeof instance[options]==='function'){instance[options].apply(instance,Array.prototype.slice.call(args,1));}if(options==='destroy'){$.data(this,'plugin_'+pluginName,null);}});}};$[pluginName]=function(options){var $window=$(window);return $window.stellar.apply($window,Array.prototype.slice.call(arguments,0));};$[pluginName].scrollProperty=scrollProperty;$[pluginName].positionProperty=positionProperty;window.Stellar=Plugin;}(jQuery,this,document));


$(document).ready(function () {
		setTimeout(function(){

		    if(($(window).width()>979) && (!Modernizr.touch)){
			     $.stellar({
				    horizontalScrolling: false,
					horizontalOffset: 0,
            		verticalOffset: 0,
				    responsive: true
				});
	
	
		    }
		},100);
	}); 
	//PRELOADER
$(window).load(function() { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
  	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
})		

/**************************************************************************
*	@name		    Zozo UI Accordion
*	@descripton	    Create awesome accordion
*	@version	    4.0
*   @requires       jQuery v1.7 or later
*	@copyright      Copyright (c) 2013 Zozo UI
*   @author         Zozo UI
*   @URL:           http://www.zozoui.com
**************************************************************************/

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 **/
; (function (a) { (jQuery.browser = jQuery.browser || {}).mobile = /(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)) })(navigator.userAgent || navigator.vendor || window.opera);

; (function ($, window, document, undefined) {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };

    $.fn.extend({
        hasClasses: function (selectors) {
            var _base = this;
            for (i in selectors) {
                if ($(_base).hasClass(selectors[i]))
                    return true;
            }
            return false;
        }
    });

    $.zozo = {};
    $.zozo.core = {};
    $.zozo.core.console = {
        debug: false,
        log: function (message) {
            if ($("#zozo-console").length != 0) {
                $("<div/>")
                .css({ marginTop: -24 })
                .html(message)
                .prependTo("#zozo-console")
                .animate({ marginTop: 0 }, 300)
                .animate({ backgroundColor: "#ffffff" }, 800);
            }
            else {
                if (console && this.debug === true) {
                    console.log(message);
                }
            }
        }
    };


    $.zozo.core.content = {
        debug: false,
        video: function (_content) {
            if (_content) {
                _content.find("iframe").each(function () {
                    var _iframeSrc = $(this).attr('src');
                    var wmode = "wmode=transparent";
                    if (_iframeSrc.indexOf(wmode) === -1) {
                        if (_iframeSrc.indexOf('?') != -1) $(this).attr('src', _iframeSrc + '&' + wmode);
                        else $(this).attr('src', _iframeSrc + '?' + wmode);
                    }
                });
            }
        },
        check: function (_content) {
            this.video(_content);
        }
    };

    $.zozo.core.keyCodes = {
        tab: 9,
        enter: 13,
        esc: 27,

        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,

        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    $.zozo.core.debug = {
        startTime: new Date(),
        log: function (msg) {
            if (console) {
                console.log(msg);
            }
        },
        start: function () {
            this.startTime = +new Date();
            this.log("start: " + this.startTime);
        },
        stop: function () {
            var _end = +new Date();
            var _diff = _end - this.startTime;

            this.log("end: " + _end);
            this.log("diff: " + _diff);

            var Seconds_from_T1_to_T2 = _diff / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

            //this.log("diff s: " + Seconds_Between_Dates);
        }
    };

    $.zozo.core.support = {
        is_mouse_present: function () {
            return (('onmousedown' in window) && ('onmouseup' in window) && ('onmousemove' in window) && ('onclick' in window) && ('ondblclick' in window) && ('onmousemove' in window) && ('onmouseover' in window) && ('onmouseout' in window) && ('oncontextmenu' in window));
        },
        is_touch_device: function () {
            return (('ontouchstart' in window) ||   // html5 browsers
             (navigator.maxTouchPoints > 0) ||      // future IE
             (navigator.msMaxTouchPoints > 0)) &&   // current IE10
             (jQuery.browser.mobile);               // mobile browser
        },
        supportsCss: (function () {
            var div = document.createElement('div'), vendors = 'khtml ms o moz webkit'.split(' '), cssPre = false;
            return function (prop) {
                (prop in div.style) && (cssPre = prop)
                var propUp = prop.replace(/^[a-z]/, function (val) { return val.toUpperCase(); });
                $.each(vendors, function (index, value) {
                    (value + propUp in div.style) && (cssPre = '-' + value + '-' + prop);
                });
                return cssPre;
            };
        })(),
        css: {
            transition: false
        }
    };


    $.zozo.core.utils = {
        toArray: function (_object) {
            return $.map(_object, function (value, key) {
                return value;
            });
        },
        createHeader: function (_t, _c) {
            var _tab = $("<li><a>" + _t + "</a></li>");
            var _content = $("<div>" + _c + "</div>");

            return { tab: _tab, content: _content };
        },
        isEmpty: function (_str) {
            return (!_str || 0 === _str.length);
        },
        isNumber: function (_input) {
            return typeof _input === 'number' && isFinite(_input);
        },
        isEven: function (_number) {
            return _number % 2 === 0;
        },
        isOdd: function (_input) {
            return !(_number % 2 === 0);
        },
        animate: function (_base, _elem, _pre, _prop, _post, _hidePre) {
            var _duration = (_base.settings.animation.effects === "none") ? 0 : _base.settings.animation.duration;
            var _easing = _base.settings.animation.easing;
            var _transition = $.zozo.core.support.css.transition;

            if (_elem && _prop) {
                if (_pre) {
                    _elem.css(_pre);
                }

                /* moz transitions css transition fix*/
                var _prLeft = _elem.css("left");
                var _preTop = _elem.css("top");

                if (_base.settings.animation.type === "css") {
                    //pre animation
                    _prop[_transition] = "all " + _duration + "ms ease-in-out"

                    //animation
                    setTimeout(function () {
                        _elem.css(_prop);
                    });

                    //post animation                   
                    setTimeout(function () {
                        // _base.settings.animating = false;
                        if (_post) {
                            _elem.css(_post);
                        }
                        _elem.css(_transition, "");
                        //_container.removeClass(ANIMATINGCLASS);
                    }, _duration);
                }
                else {
                    //lem.show().animate(_prop, {
                    _elem.animate(_prop, {
                        duration: _duration,
                        easing: _easing,
                        complete: function () {
                            // _base.settings.animating = false;
                            if (_post) {
                                _elem.css(_post);
                            }
                            // _container.removeClass(ANIMATINGCLASS);
                            if (_hidePre) {
                                _elem.hide();
                            }
                        }
                    });
                }
            }

            return _base;
        }

    };

    $.zozo.core.plugins = {
        easing: function (_base) {
            var _exist = false;
            if (_base) {
                if (_base.settings) {
                    //set up a default value for easing
                    var _defEasing = 'swing';

                    // check for the existence of the easing plugin
                    if ($.easing.def) {
                        _exist = true;
                    }
                    else {
                        if (_base.settings.animation.easing != 'swing' && _base.settings.animation.easing != 'linear') {
                            _base.settings.animation.easing = _defEasing;
                        }
                    }
                }
            }
            return _exist;
        }
    };

    $.zozo.core.browser = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
            this.version = this.searchVersion(navigator.userAgent)
                           || this.searchVersion(navigator.appVersion)
                           || "an unknown version";

            $.zozo.core.console.log("init: " + this.browser + " : " + this.version);


            if (this.browser === "Explorer") {

                var _el = $("html");
                var version = parseInt(this.version);

                if (version === 6) {
                    _el.addClass("ie ie7");
                }
                else if (version === 7) {
                    _el.addClass("ie ie7");
                }
                else if (version === 8) {
                    _el.addClass("ie ie8");
                }
                else if (version === 9) {
                    _el.addClass("ie ie9");
                }
            }
        },
        isIE: function (_version) {
            if ($.zozo.core.utils.isNumber(_version)) {
                return (this.browser === "Explorer" && this.version <= _version)
            }
            else {
                return (this.browser === "Explorer")
            }
        },
        isChrome: function (_version) {
            if ($.zozo.core.utils.isNumber(_version)) {
                return (this.browser === "Chrome" && this.version <= _version)
            }
            else {
                return (this.browser === "Chrome")
            }
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) != -1)
                        return data[i].identity;
                }
                else if (dataProp)
                    return data[i].identity;
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index == -1)
                return;
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [
            {
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            }, {
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            }, {
                prop: window.opera,
                identity: "Opera"
            }, {
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            }, {
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "Explorer",
                versionSearch: "MSIE"
            }
        ]
    };

    $.zozo.core.hashHelper = {
        all: function () {
            var hashArray = [];
            var hash = document.location.hash;

            if (!this.hasHash()) {
                return hashArray;
            }

            hash = hash.substring(1).split('&');

            for (var i = 0; i < hash.length; i++) {
                var match = hash[i].split('=');
                //if (match.length != 2 || match[0] in hashArray) return undefined;
                if (match.length != 2 || match[0] in hashArray) {
                    match[1] = "none";
                }
                hashArray[match[0]] = match[1];
            }

            return hashArray;
        },
        get: function (key) {
            var all = this.all();

            if (typeof all === 'undefined' || typeof all.length < 0) {
                //self.log("get: undefined or null all");
                return null;
            }
            else {
                if (typeof all[key] !== 'undefined' && all[key] !== null) {
                    //self.log("get: exist key");
                    return all[key];
                }
                else {
                    //self.log("get: undefined or null key" + key);
                    return null;
                }
            }

        },
        set: function (key, value) {
            var all = this.all();
            var hash = [];

            all[key] = value;
            for (var key in all) {
                hash.push(key + '=' + all[key]);
            }
            document.location.hash = hash.join('&');
        },
        hasHash: function () {
            var hash = document.location.hash;
            if (hash.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    };


    $.zozo.core.support.css.transition = $.zozo.core.support.supportsCss("transition");
    $.zozo.core.browser.init();

})(jQuery, window, document);


; (function ($, window, document, undefined) {
    var ZozoAccordion = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = (this.$elem.data("options")) ? this.$elem.data("options") : {};
        this.attrdata = (this.$elem.data()) ? this.$elem.data() : {};
        this.elemID;
        this.$sections;
        this.sectionCount;
        this.$container;
        this.$contents;
        this.autoplayIntervalId;
        this.resizeWindowIntervalId;
        this.currentsection;
        this.browser = $.zozo.core.browser;
        this.responsive;
        this.lastWindowHeight;
        this.lastWindowWidth;
    };

    if (window.zozo == null) {
        window.zozo = {};
    }
    var zozo = {
        pluginName: "zozoAccordion",
        elementSpacer: "<span class='z-tab-spacer' style='clear: both;display: block;'></span>",
        commaRegExp: /,/g,
        headerTitle: "<span class='z-title'>Illustrations</span>",
        headerArrow: "<span class='z-arrow'><i class='icon-chevron-down'></i></span>",
        space: " ",
        responsive: {
            largeDesktop: 1200,
            desktop: 960,
            tablet: 720,
            phone: "auto"
        },
        animation: {
            effects: {
                fade: "fade",
                none: "none"
            },
            types: {
                css: "css",
                jquery: "jquery"
            }
        },
        expandModes: {
            single: "single",
            multiple: "multiple"
        },
        events: {
            click: "click",
            mousover: "mouseover",
            mouseenter: "mouseenter",
            mouseleave: "mouseleave",
            touchend: "touchend",
            touchstart: "touchstart",
            touchmove: "touchmove"
        },
        classes: {
            prefix: "z-",
            wrapper: "z-accordion",
            section: "z-section",
            first: "z-first",
            last: "z-last",
            active: "z-active",
            link: "z-link",
            focus: "z-focus",
            container: "z-container",
            content: "z-content",
            shadows: "z-shadows",
            bordered: "z-bordered",
            rounded: "z-rounded",
            scrollable: "z-scrollable",
            autoClass: "z-auto-g",
            themes: {
                gray: "gray",
                black: "black",
                blue: "blue",
                white: "white",
                lightblue: "lightblue",
                deepblue: "deepblue",
                crystal: "crystal",
                green: "green",
                yellow: "yellow",
                purple: "purple",
                silver: "silver",
                red: "red",
                orange: "orange",
                clean: "clean2"
            },
            orientations: {
                vertical: "vertical",
                horizontal: "horizontal"
            },
            groups: {
                grouped: "z-grouped",
                ungrouped: "z-ungrouped"
            }
        }
    },
    PX = "px",
    LINK = ".z-link",
    ARROW = ".z-arrow",
    ERROR = "error",
    DOTNAV = ".z-dot-nav",
    SELECT = "select",
    CONTENT = ".z-content",
    EXPAND = "expand",
    ACTIVATE = "activate",
    SECTION = "section",
    CONTENTS = "> " + CONTENT,
    SECTIONS = "> " + SECTION,
    CONTENTURL = "contentUrl",
    CONTENTLOAD = "contentLoad",
    DOTNAVCLASS = "z-dot-nav",
    MOBILECLASS = "z-mobile",
    ACTIVECLASS = "z-active",
     DISABLED = "disabled",
    DISABLEDCLASS = "z-disabled",
    LOADINGCLASS = "z-loading",
    ACTIVESECTION = SECTIONS + "." + ACTIVECLASS,
    DOTNAVITEMCLASS = "z-dot-nav-item",
    SLIDERWRAPPERCLASS = "z-slider-wrapper",
    SUBNAVCLASS = "z-sub-nav",
    SUBNAV = "> ." + SUBNAVCLASS,
    CONTENTNAVCLASS = "z-content-nav",
    DOTNAVITEM = DOTNAV + " span." + DOTNAVITEMCLASS,
    DOTNAVACTIVEITEM = DOTNAV + " ." + ACTIVECLASS;



    ZozoAccordion.prototype = {
        defaults: {
            animation: { duration: 400, effects: "fadeIn", easing: "easeOutQuart", type: zozo.animation.types.jquery },
            autoplay: { interval: 0, smart: true },
            active: false,
            activate: function () { },
            bordered: true,
            cacheAjax: true,
            contentHeight: 0,
            contentLoad: function () { },
            contentSpacing: 0,
            contentUrls: null,
            contentWidth: 715,
            dotNav: false,
            contentNav: false,
            headerFontSize: 1.5,
            event: zozo.events.click,
            error: function () { },
            expand: function () { },
            expandAfter: false,
            expandMode: zozo.expandModes.single,
            grouped: true,
            headerSize: 40,
            height: 320,
            hideHeaders: false,
            keyboard: false,
            minContentWidth: 0,
            minWidth: 480,
            minWindowWidth: 720,
            orientation: zozo.classes.orientations.vertical,
            original: { width: 0, height: 0, headerSize: 0, headerFontSize: 0, sectionSpacing: 0, orientation: null },
            responsive: false,
            responsiveDelay: 100,
            rounded: false,
            scrollable: false,
            shadows: true,
            showIcons: true,
            slider: false,
            sectionSpacing: 0,
            theme: zozo.classes.themes.silver,
            urlBased: false,
            horizontal: {
                headerSize: 40,
                headerFontSize: 1.1,
                sectionSpacing: 8
            },
            vertical: {
                headerSize: 38,
                headerFontSize: 1.1,
                sectionSpacing: 0
            },
            select: function () { },
            width: 960
        },
        init: function () {
            var _base = this;
            _base.settings = $.extend(true, {}, _base.defaults, _base.options, _base.metadata, _base.attrdata);

            _base.currentsection = _base.settings.active;
            _base.settings.original.width = _base.settings.width;
            _base.settings.original.height = _base.settings.height;
            _base.settings.original.headerSize = _base.settings.headerSize;
            _base.settings.original.orientation = _base.settings.orientation
            _base.settings.original.headerFontSize = _base.settings.headerFontSize;
            _base.settings.original.sectionSpacing = _base.settings.sectionSpacing;


            if (_base.settings.original.orientation === zozo.classes.orientations.vertical) {
                _base.settings.vertical.headerSize = _base.settings.original.headerSize;
            }

            if ((_base.settings.animation.type === zozo.animation.types.css && $.zozo.core.support.transition) || jQuery.browser.mobile) {
                //_base.settings.animation.duration = 0;
            }

            if (_base.settings.slider === true) {
                if (!_base.$elem.parent().hasClass(SLIDERWRAPPERCLASS)) {
                    _base.$elem.wrap("<div class='" + SLIDERWRAPPERCLASS + "'></div>");
                }
                if (_base.settings.dotNav === true && _base.settings.slider === true) {
                    _base.$sections = _base.$elem.find(SECTIONS);

                    var _dotNav = $("<div class='" + DOTNAVCLASS + "'></div>");
                    _base.$sections.each(function (index, item) {
                        _dotNav.append($("<span class='" + DOTNAVITEMCLASS + "'></span>"));
                    });

                    _base.$elem.parent().append(_dotNav);
                }
            }

            $.zozo.core.plugins.easing(_base);

            methods.updateClasses(_base);
            methods.bindEvents(_base);

            if (_base.settings.contentUrls != null) {
                _base.$sections.each(function (index, item) {
                    $(item).find("." + zozo.classes.link).data(CONTENTURL, _base.settings.contentUrls[index]);
                });
            }

            if (_base.settings.responsive === true && _base.settings.original.orientation === zozo.classes.orientations.horizontal) {
                methods.checkWidth(_base);

                //methods.showSection(_base, _base.settings.active);
            }
            else {
                if (_base.settings.orientation === zozo.classes.orientations.vertical) {
                    if ($.zozo.core.utils.isNumber(_base.settings.active)) {
                        methods.showSection(_base, _base.settings.active);
                    }
                }
                else {
                    methods.showSection(_base, _base.settings.active);
                }
            }

            methods.initAutoPlay(_base);
            return _base;
        },
        setOptions: function (_option, _refresh) {
            var _base = this;

            // methods.resetClasses(_base);

            _base.settings.active = _base.currentsection;
            _base.settings = $.extend(true, _base.settings, _option);

            methods.updateClasses(_base, true);

            //(_refresh === true) &&
            methods.showSection(_base, _base.settings.active);
            methods.initAutoPlay(_base);
            return _base;
        },
        add: function (_t, _c, _d) {
            var _base = this;
            var _section = methods.create(_t, _c);

            _section.appendTo(_base.$elem);
            methods.updateClasses(_base);

            methods.bindEvent(_base, _section.find("> h3"));

            return _base;
        },
        remove: function (_i) {
            var _base = this;
            var _section = _base.$sections.eq(_i);

            //remove events
            //var _events = $.zozo.core.utils.toArray(zozo.events);                
            //_section.find("> h3").off(_events.join(" "));

            _section.fadeOut(300, function () {
                $(this).remove();
                methods.updateClasses(_base);
            });
            return _base;
        },
        select: function (_i) {
            var _base = this;
            methods.showSection(_base, _i);
            return _base;
        },
        enable: function (_i) {
            var _base = this;
            var _tabToEnable = _base.$sections.eq(_i);

            if (_tabToEnable.length) {
                _tabToEnable.removeClass(DISABLEDCLASS);
                _tabToEnable.data(DISABLED, false);
            }
            return _base;
        },
        disable: function (_i) {
            var _base = this;
            var _tabToDisable = _base.$sections.eq(_i);

            if (_tabToDisable.length) {
                _tabToDisable.addClass(DISABLEDCLASS);
                _tabToDisable.data(DISABLED, true);
            }
            return _base;
        },
        first: function () {
            var _base = this;
            _base.select(methods.getFirst(_base));
            return _base;
        },
        prev: function () {
            var _base = this;
            var _currentIndex = parseInt(_base.currentsection);

            if (_currentIndex <= methods.getFirst(_base)) {
                _base.select(methods.getLast(_base));
            }
            else {
                _base.select(_currentIndex - 1);
            }
            return _base;
        },
        next: function (_base) {
            _base = (_base) ? _base : this;
            var _currentIndex = parseInt(_base.currentsection);
            var _count = methods.getLast(_base);

            if (_currentIndex >= _count) {
                _base.select(methods.getFirst(_base));
            }
            else {
                _base.select(_currentIndex + 1);
            }
            return _base;
        },
        last: function () {
            var _base = this;
            _base.select(methods.getLast(_base));
            return _base;
        },
        play: function (interval) {
            var _base = this;
            if (interval == null || interval < 0) {
                interval = 2000;
            }
            _base.settings.autoplay.interval = interval;
            _base.stop();
            _base.autoplayIntervalId = setInterval(function () { _base.next(_base); }, _base.settings.autoplay.interval);

            return _base;
        },
        stop: function (_base) {
            _base = (_base) ? _base : this;
            clearInterval(_base.autoplayIntervalId);
            return _base;
        },
        expandAll: function (_base) {
            _base = (_base) ? _base : this;
            return _base;
        },
        collapseAll: function (_base) {
            _base = (_base) ? _base : this;
            return _base;
        },
        refresh: function () {
            var _base = this;
            methods.checkWidth(_base);
            return _base;
        }
    };

    var methods = {
        resetClasses: function (_base) {
            // stop all animations
            _base.$elem.find('*').stop(true, true);
            _base.elemID = _base.$elem.attr("id");

            _base.$sections = _base.$elem.find(SECTIONS);
            _base.sectionCount = _base.$sections.length;
            //_base.settings.contentWidth = _base.settings.width - (_base.sectionCount * (_base.settings.headerSize + 1));
            _base.settings.contentWidth = _base.settings.width - (_base.sectionCount * (_base.settings.headerSize + _base.settings.sectionSpacing)); // adding lShift

            _base.$elem
                .attr("role", "tablist")
                //.attr("accesskey", "W")
                //.attr("tabindex", "0")
                .removeClass(zozo.classes.wrapper).addClass(zozo.classes.wrapper)
                .removeClass(zozo.classes.orientations.vertical)
                .removeClass(zozo.classes.orientations.horizontal)
                .removeClass(zozo.classes.groups.grouped)
                .removeClass(zozo.classes.groups.ungrouped)
                .addClass(_base.settings.orientation)
                .removeClass(zozo.classes.rounded)
                .removeClass(zozo.classes.shadows)
                .removeClass(zozo.classes.bordered)
                .parents("." + SLIDERWRAPPERCLASS).css({ 'width': "", padding: "" });

            _base.$elem.css({
                width: "",
                height: ""
            });

            _base.$sections.each(function (index, item) {
                var _section = $(item);

                _section.removeClass(zozo.classes.first)
                    .removeClass(zozo.classes.last)
                    .removeClass(zozo.classes.active)
                    .addClass(zozo.classes.section)
                    .css({ margin: 'none' });

                _section.css({
                    left: "",
                    width: "",
                    margin: ""
                });

                _section.find("> h3").css({
                    width: "",
                    height: "",
                    lineHeight: ""
                }).find("span").css({
                    width: "",
                    height: "",
                    lineHeight: ""
                });

                _section.find("> div").css({
                    height: "",
                    maxHeight: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                }).find("> div").css({
                    height: "",
                    width: "",
                    left: "",
                    display: "",
                    margin: "",
                    padding: ""
                });
            });

            return _base;
        },
        updateClasses: function (_base, _active) {
            methods.resetClasses(_base, _active);

            _base.$sections.each(function (index, item) {
                var _section = $(item);
                var _head = _section.find("> h3");
                var _headText = _head.html();
                var _cont = _section.find("> div");
                var _icon = (_base.settings.showIcons === true) ? "<span class='z-arrow' style='top:none'></span>" : "";

                if (!_head.find("> span.z-title").length) {
                    _head.text("").append("<span class='z-title'>" + $.trim(_headText) + "</span>" + _icon).addClass(zozo.classes.link);
                }

                if (methods.isTabDisabled(_section)) {
                    _base.disable(index);
                }
                _cont.addClass(zozo.classes.content);
            });

            //set content height change css
            methods.setContentSize(_base);

            //update first and last
            _base.$sections.filter(zozo.classes.first + ":not(:first-child)").removeClass(zozo.classes.first);
            _base.$sections.filter(zozo.classes.last + ":not(:last-child)").removeClass(zozo.classes.last);
            _base.$sections.filter(":first-child").addClass(zozo.classes.first).find("h3").attr("tabindex", "0").attr("accesskey", "w");
            _base.$sections.filter(":last-child").addClass(zozo.classes.last);

            var _themes = $.zozo.core.utils.toArray(zozo.classes.themes);
            if (!$.zozo.core.utils.isEmpty(_base.settings.theme)) {
                _base.$elem
                .removeClass(_themes.join().replace(zozo.commaRegExp, zozo.space))
                .addClass(_base.settings.theme);
            }
            else {
                if (!_base.$elem.hasClasses(_themes)) {
                    _base.$elem.addClass(zozo.classes.themes.silver);
                }
            }

            if ((_base.settings.animation.type === "css" && $.zozo.core.support.transition) || jQuery.browser.mobile) {
                //_base.settings.animation.duration = 0;

            }

            _base.$elem.addClass("transition");

            (_base.settings.contentNav === true) && _base.$elem.addClass(CONTENTNAVCLASS);
            (jQuery.browser.mobile === true) && (_base.$elem.addClass(MOBILECLASS));
            //($.zozo.core.support.transition) && _base.$elem.addClass("transition");
            (_base.settings.rounded === true) && _base.$elem.addClass(zozo.classes.rounded).parent("." + SLIDERWRAPPERCLASS).addClass(zozo.classes.rounded);
            (_base.settings.scrollable === true) && _base.$elem.addClass(zozo.classes.scrollable);
            (_base.settings.grouped === true) ? _base.$elem.addClass(zozo.classes.groups.grouped) : _base.$elem.addClass(zozo.classes.groups.ungrouped);
            (_base.settings.bordered === true) && _base.$elem.addClass(zozo.classes.bordered);
            (_base.settings.shadows === true) && _base.$elem.addClass(zozo.classes.shadows).parent("." + SLIDERWRAPPERCLASS).addClass(zozo.classes.shadows);




            //add aria
            methods.addAria(_base, { index: _base.currentsection });
        },
        setContentSize: function (_base) {
            var _slider = _base.settings.slider;
            var _contentNav = _base.settings.contentNav;
            var _orientation = _base.settings.orientation;
            var _spacing = (_orientation === zozo.classes.orientations.vertical && _base.settings.responsive === true) ? _base.settings.vertical.sectionSpacing : _base.settings.sectionSpacing;
            var _headerSize = _orientation === zozo.classes.orientations.vertical ? _base.settings.vertical.headerSize : _base.settings.headerSize;
            var _width = _base.settings.contentWidth - ((_base.settings.contentSpacing * 2));
            var _height = _base.settings.height - (_base.settings.contentSpacing * 2);
            var _sliderWrapper = _base.$elem.parents("." + SLIDERWRAPPERCLASS);
            var _isIe8 = $.zozo.core.browser.isIE(8);
            var _isIe9 = $.zozo.core.browser.isIE(9);

            if (_orientation === zozo.classes.orientations.horizontal) {
                if (_spacing > 0) {
                    _base.settings.contentWidth = parseInt(_base.settings.width - (_base.sectionCount * (_base.settings.headerSize + _spacing - 1)));
                }
                else {
                    _base.settings.contentWidth = _base.settings.width - (_base.sectionCount * (_base.settings.headerSize));
                }

                _base.$elem.css({ width: (_spacing > 0) ? _base.settings.width - 1 : _base.settings.width, height: _base.settings.height });
                _sliderWrapper.css({ width: _base.settings.width });
            }
            else {
                (_spacing > 0) ? _base.settings.grouped = false : _base.settings.grouped = true;
            }


            if (_slider == true && _spacing > 0) {
                _sliderWrapper.css({ padding: _spacing + PX });
                (_orientation === zozo.classes.orientations.horizontal) ? _sliderWrapper.css({ paddingRight: 1, paddingBottom: (_spacing - 1) + PX }) : _sliderWrapper.css({ paddingTop: "1px", paddingBottom: "1px" })
            }

            _base.$sections.each(function (index, item) {
                var _$section = $(item);
                var _head = $(item).find("> h3").css({ outline: "none", 
				//height: (_headerSize + 1) + PX//, lineHeight: (_headerSize + 2) + PX//
				 });//+2 verrsion 4
                var _cont = $(item).find("> div");


                (_isIe8) && (_head.css({ height: (_headerSize + 3) + PX }).find("> span.z-title").css({ height: (_base.settings.height) + PX }));


                //wrap content in inner content div
                if (!_$section.find(">div>." + zozo.classes.autoClass).length) {
                    var _contentContainer = $("<div class='" + zozo.classes.autoClass + "'></div>");
                    var _contentHtml = _cont.html();
                    _cont.html("");
                    _contentContainer.append(_contentHtml);
                    _contentContainer.appendTo(_cont);

                    (_base.settings.contentNav === true) && _contentContainer.find("> ul").addClass(SUBNAVCLASS);
                }

                if (_orientation === zozo.classes.orientations.horizontal) {
                    _head.css({ width: _base.settings.height });
                    if (_slider === true) {
                        _cont.css({ height: "100%", margin: 0 }).find("img").css({ margin: _base.settings.contentSpacing });

                        //_cont.css({ height: "100%", margin: 0 }).find("iframe").css({ width: "100%", height: "100%" });
                    }

                    if (_base.settings.responsive === true && _base.settings.original.headerFontSize > 0) {
                        _head.css({ fontSize: _base.settings.headerFontSize + "em" });
                    }
                }
                else {

                    //(_base.settings.contentHeight > 0) && (_cont.css({ height: _base.settings.contentHeight, overflow: "auto" }));                                            
                    _$section.css({ overflow: "", width: "100%", left: "", display: "block" });
                    if (_base.settings.grouped === false || _spacing > 0) {
                        _$section.css({
                            marginTop: _spacing + PX,
                            marginBottom: _spacing + PX
                        });
                    }

                    if (_base.settings.responsive === true && _base.settings.vertical.headerFontSize > 0) {
                        _head.css({ fontSize: _base.settings.vertical.headerFontSize + "em" });
                    }
                }

                if (_slider === true || _contentNav === true) {
                    if (_orientation === zozo.classes.orientations.horizontal) {
                        _cont.find(">." + zozo.classes.autoClass).css({ paddingLeft: (_spacing - 2) + PX });

                    } else {
                        _cont.find(">." + zozo.classes.autoClass).css({ paddingTop: _spacing + PX });
                    }
                }


                (_contentNav === true) && _cont.find(">." + zozo.classes.autoClass).find(SUBNAV + " > li:not(:first)").css({ marginTop: _spacing + PX });
            });
        },
        bindEvents: function (_base) {
            var _windowFocus = false;

            $(window).blur(function () {
                _windowFocus = false;
                $.zozo.core.console.log("blur: " + _windowFocus);
            }).focus(function () {
                _windowFocus = true;
                $.zozo.core.console.log("focus: " + _windowFocus);
            });

            _base.$elem.focus(function (e) {
                var _this = $(this);
                var _mdown = _this.data('mdown');

                _this.removeData('mdown');

                if (!_mdown) {
                    _this.addClass(zozo.classes.focus);
                }
            }).blur(function (e) {
                $(this).removeClass(zozo.classes.focus);
            });

            _base.$sections.each(function () {
                var $this = $(this);
                var _section = $this.find("> h3");
                var _content = $this.find("> .z-content");

                //css transition end event    
                _content.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
                    _base.settings.animating = false;
                });

                if (_base.settings.hideHeaders === true) {
                    _section = $(this).find(">div>div>img");
                }

                if (!_section.find("a").length) {
                    methods.bindEvent(_base, _section);

                } else {
                    _section.on(_base.settings.event, function (e) {
                        var link = _section.find("a");
                        var target = link.attr("target");
                        if ($.trim(target).length) {
                            window.open(link.attr("href"), target);
                        }
                        else {
                            window.location = link.attr("href");
                        }
                        e.preventDefault();
                    });
                }




            });

            _base.$elem.bind(SELECT, _base.settings.select);
            _base.$elem.bind(EXPAND, _base.settings.expand);
            _base.$elem.bind(ACTIVATE, _base.settings.activate);
            _base.$elem.bind(ERROR, _base.settings.error);
            _base.$elem.bind(CONTENTLOAD, _base.settings.contentLoad);

            if (_base.settings.slider === true && _base.settings.dotNav === true) {
                $(DOTNAVITEM).each(function () {
                    $(this).on("click", function (_event) {
                        _event.preventDefault();
                        methods.showSection(_base, $(this).index());
                    });
                });


                $(".z-nav a.z-next").click(function (_event) {
                    _event.preventDefault();
                    methods.showSection(_base, _base.currentsection + 1);

                });

                $(".z-nav a.z-prev").click(function (_event) {
                    _event.preventDefault();
                    methods.showSection(_base, _base.currentsection - 1);
                });
            }

            if (_base.settings.responsive === true && _base.settings.original.orientation === zozo.classes.orientations.horizontal) {
                //responsive window resize
                $(window).resize(function () {
                    if (_base.lastWindowHeight !== $(window).height() || _base.lastWindowWidth !== $(window).width()) {
                        clearInterval(_base.resizeWindowIntervalId);
                        _base.resizeWindowIntervalId = setTimeout(function () {

                            _base.lastWindowHeight = $(window).height();
                            _base.lastWindowWidth = $(window).width();

                            methods.checkWidth(_base);
                        }, _base.settings.responsiveDelay);
                    }
                });

            }

        },
        bindEvent: function (_base, _section) {
            //jquery 1.5 _section.bind(_base.settings.event, function (_event) {


            if ($.zozo.core.support.is_touch_device()) {
                _section.on(zozo.events.touchstart, function (_event) {
                    $(this).on(zozo.events.touchend, function (_event) {

                        _event.preventDefault();
                        var _index = $(this).parent().index();
                        _base.currentsection = _index;

                        //stop autoplay if smart is true
                        if (_base.settings.autoplay !== false && _base.settings.autoplay != null) {
                            if (_base.settings.autoplay.smart === true) {
                                _base.stop();
                            }
                        }

                        methods.showSection(_base, _index);


                        $(this).off(zozo.events.touchend);
                    });
                    $(this).on(zozo.events.touchmove, function (_event) { $(this).off(zozo.events.touchend); });
                });
            } else {
                _section.on(_base.settings.event, function (_event) {
                    _event.preventDefault();
                    var _index = $(this).parent().index();
                    _base.currentsection = _index;

                    //stop autoplay if smart is true
                    if (_base.settings.autoplay !== false && _base.settings.autoplay != null) {
                        if (_base.settings.autoplay.smart === true) {
                            _base.stop();
                        }
                    }

                    methods.showSection(_base, _index);
                });
            }




            if (_base.settings.keyboard === true) {
                _section.on('keyup', function (e) {
                    e.preventDefault();
                    var _this = $(this);
                    var _keyCode = e.keyCode || e.which;
                    var _indexOriginal = _this.parent().index();
                    var _index = _this.parent().index();
                    var _total = _base.sectionCount;
                    if (_keyCode == $.zozo.core.keyCodes.space || _keyCode == $.zozo.core.keyCodes.enter) {
                        methods.showSection(_base, _index);
                    }
                    else if (_keyCode >= $.zozo.core.keyCodes.end || _keyCode <= $.zozo.core.keyCodes.down) {
                        if (_keyCode === $.zozo.core.keyCodes.home) {
                            _index = 0;
                        }
                        else if (_keyCode === $.zozo.core.keyCodes.end) {
                            _index = _total - 1;
                        }
                        else if (_keyCode === $.zozo.core.keyCodes.up || _keyCode === $.zozo.core.keyCodes.left) {
                            _index--;
                        }
                        else if (_keyCode === $.zozo.core.keyCodes.down || _keyCode === $.zozo.core.keyCodes.right) {
                            _index++;
                        }

                        if (_index != _indexOriginal) {
                            if (_index === -1) {
                                _index = _total - 1;
                            }
                            if (_index === _total && _keyCode != $.zozo.core.keyCodes.end) {
                                _index = 0;
                            }
                            _base.$sections.find("> h3").eq(_index).focus();
                        }
                    }
                }).mousedown(function (_event) {
                    var _this = $(this);
                    if (!_this.is(':focus')) {
                        _this.data('mdown', true);
                    }
                }).focus(function (e) {
                    var _this = $(this);
                    var _mdown = _this.data('mdown');

                    _this.removeData('mdown');

                    if (!_mdown) {
                        _this.addClass(zozo.classes.focus);
                    }
                }).blur(function (e) {
                    $(this).removeClass(zozo.classes.focus);
                });
            }

        },
        checkWidth: function (_base) {
            var _windowSize = $(window).width();
            var _orientation = _base.settings.orientation;
            var _minContentWidth = _base.settings.minContentWidth;
            var _minWidth = _base.settings.minWidth;
            var _minWindowWidth = _base.settings.minWindowWidth;
            var wrapper = _base.$elem.parents("." + SLIDERWRAPPERCLASS);
            var elem = _base.$elem;

            if (wrapper.length)
                elem = wrapper;

            _base.settings.width = elem.hide().parent().outerWidth() - 2;
            if ($(document).height() > $(window).height())
                //_base.settings.width = elem.hide().parent().outerWidth() - 17;


                if (_base.settings.slider === true && _base.settings.sectionSpacing > 0) {
                    _base.settings.width = _base.settings.width - ((_base.settings.width / _base.settings.original.width) * _base.settings.sectionSpacing);
                }

            elem.show();

            if (_base.settings.width > _base.settings.original.width) {
                _base.settings.width = _base.settings.original.width;
                _base.settings.height = _base.settings.original.height;
                _base.settings.headerSize = _base.settings.original.headerSize;
                _base.settings.headerFontSize = _base.settings.original.headerFontSize;
                _base.settings.sectionSpacing = _base.settings.original.sectionSpacing;

            } else {
                var _ratio = (_base.settings.width / _base.settings.original.width);

                _base.settings.height = parseInt(_ratio * _base.settings.original.height);
                _base.settings.headerSize = _ratio * _base.settings.original.headerSize
                _base.settings.headerFontSize = _ratio * _base.settings.original.headerFontSize;
                _base.settings.sectionSpacing = _ratio * _base.settings.original.sectionSpacing;

                //console.log("radio "+  _ratio );
            }

            /* _base.settings.contentWidth < _minContentWidth
            if (_orientation === zozo.classes.orientations.horizontal) {
                var _spacing = _base.settings.sectionSpacing;
                if (_spacing > 0) {
                    _base.settings.contentWidth = parseInt(_base.settings.width - (_base.sectionCount * (_base.settings.headerSize + _spacing - 1)));
                }
                else {
                    _base.settings.contentWidth = _base.settings.width - (_base.sectionCount * (_base.settings.headerSize));
                }
            }
            */
            //console.log("width: " + _base.settings.width + " / " + _minWidth + " _windowSize: " + _windowSize +" / " +_minWindowWidth + " contentWidth " + _base.settings.contentWidth + " / " + _minContentWidth);            
            console.log("accordionWidth: " + _base.settings.width + " / " + _minWidth + " windowWidth: " + _windowSize + " / " + _minWindowWidth);

            if (_windowSize <= _minWindowWidth || _base.settings.width <= _minWidth) {
                _base.settings.width = _base.settings.original.width;
                _base.settings.height = _base.settings.original.height;
                _base.settings.headerSize = _base.settings.original.headerSize;
                _base.settings.headerFontSize = _base.settings.original.headerFontSize;
                _base.settings.sectionSpacing = _base.settings.vertical.sectionSpacing;
                methods.changeOrientation(_base, zozo.classes.orientations.vertical);
            } else {
                methods.changeOrientation(_base, zozo.classes.orientations.horizontal)
            }
        },
        changeOrientation: function (_base, _orientation) {
            methods.setContentSize(_base);
            if (_orientation != _base.settings.orientation) {
                _base.settings.orientation = _orientation;
                _base.setOptions({ orientation: _orientation });
            }
            else {
                methods.showSection(_base, _base.currentsection, true);
            }
        },
        showSection: function (_base, _index, _noAnimation) {
            //_base.$elem.find('*').stop(true, true);
            var _$section = _base.$elem.find(SECTIONS).eq(_index);
            var $item = {
                index: $.zozo.core.utils.isNumber(_index) ? _index : 0,
                section: _$section,
                enabled: methods.isTabDisabled(_$section) === false,
                head: _$section.find("> h3"),
                link: _$section.find(".z-link"),
                content: _$section.find("> .z-content"),
                contentInner: _$section.find("> .z-content > .z-auto-g"),
                contentUrl: _$section.find(".z-link").data(CONTENTURL),
                noAnimation: _noAnimation
            };

            if ($item.enabled) {

                (_base.settings.select && typeof (_base.settings.select) == typeof (Function)) && _base.$elem.trigger(SELECT, { header: $item.link[0], content: $item.contentInner[0], index: $item.index });

                if ($item.contentUrl) {
                    (_base.settings.orientation === zozo.classes.orientations.vertical) ? methods.ajaxRequest(_base, $item, methods.showVertical) : methods.ajaxRequest(_base, $item, methods.showHorizontal);
                } else {
                    (_base.settings.orientation === zozo.classes.orientations.vertical) ? methods.showVertical(_base, $item) : methods.showHorizontal(_base, $item);
                }

                methods.updateDotNav(_base, $item);
                methods.addAria(_base, $item);

                _base.currentsection = $item.index;

                //(_base.settings.expand && typeof (_base.settings.expand) == typeof (Function)) && _base.$elem.trigger(EXPAND, { header: $item.link[0], content: $item.contentInner[0] });

                (_base.settings.activate && typeof (_base.settings.activate) == typeof (Function)) && _base.$elem.trigger(ACTIVATE, { header: $item.link[0], content: $item.contentInner[0], index: $item.index });
            }
            return _base;
        },
        showHorizontal: function (_base, _item) {
            var _spacing = _base.settings.orientation === zozo.classes.orientations.vertical ? _base.settings.vertical.sectionSpacing : _base.settings.sectionSpacing;

            var _headerSize = _base.settings.headerSize;
            var _contentWidth = _base.settings.contentWidth;
            var _sectionSpacing = (_spacing > 0) ? _spacing - 1 : _spacing;
            var _left = 0;
            var _index = _item.index;
            var _isIe8 = $.zozo.core.browser.isIE(8);
            //if (_sectionSpacing === 0)
            //(_headerSize = _headerSize - 1)

            _base.$sections.each(function (index, item) {
                var _currentLeft;
                var _$section = $(item);
                var _$head = _$section.find("> h3");
                var _$cont = _$section.find("> .z-content");

                if (index > 0) {
                    //horizontal grouped _left = _left + _headerSize + _sectionSpacing;
                    //_left = _left + _headerSize
                    _left = _left + _headerSize + _sectionSpacing // _shift added
                }

                _currentLeft = _left;

                if (index === _index) {
                    _left = _left + _contentWidth;
                }

                _base.$elem.find("section.z-active > .z-content").parent().removeClass(zozo.classes.active);
                _base.$elem.find("section > .z-content").eq(_index).parent().toggleClass(zozo.classes.active);

                //removed +1 from height of head
                _$head
                    //.css({ "outline": "none", "height": _headerSize + 1, "line-height": (_headerSize) + PX })
                   // .find("> span.z-title").css({ "height": _headerSize, "line-height": (_headerSize) + PX });
                //.find("> span.z-title").css({ "height": _headerSize, "line-height": (_headerSize - 1) + PX });

                if (_sectionSpacing > 0) {
                    _$head.find("> span.z-title").css({ "height": _headerSize + 2 });
                }

                if (_isIe8) {
                    _$head.find("> span.z-title").css({ height: (_base.settings.height) + PX })
                }


                var _setSectionWidth = _contentWidth + _headerSize + 2;
                var _setContentLeft = (_sectionSpacing === 0) ? _headerSize : _headerSize + 3;//was 2 , 3 for opera

                //ie8 +2    
                if (_isIe8 == true && _sectionSpacing > 0) {
                    _setContentLeft = _setContentLeft + 1;
                }

                if (_isIe8 == true && _sectionSpacing === 0) {
                    _setContentLeft = _setContentLeft + 1;
                }

                if (_item.noAnimation === true) {
                    _$section.stop().css({ "left": _currentLeft, "width": _setSectionWidth });
                    _$cont.css({ "left": _setContentLeft, "width": "auto", "overflow": "", display: "" });
                }
                else {
                    methods.animate(_base, _$section.stop(), null, { "left": _currentLeft, "width": _setSectionWidth });
                    methods.animate(_base, _$cont.stop(), { "left": _setContentLeft, display: "" }, { "width": "auto" }, { "overflow": "" });
                }
                // methods.addAria(_base, _$section, _$head, _$cont, index);
            });

            return _base;
        },
        showVertical: function (_base, _item) {
            if (typeof _item.noAnimation === 'undefined' || _item.noAnimation == null) {

                var _contentHeight = _base.settings.contentHeight;
                var _duration = _base.settings.animation.duration;
                var _transition = $.zozo.core.support.css.transition;

                if (_item.section.hasClass(zozo.classes.active)) {
                    setTimeout(function () { _item.section.removeClass(zozo.classes.active); }, _duration);
                    methods.animate(_base, _item.content, null, { height: "0", overflow: "" });
                }
                else {

                    if (_base.settings.expandMode === zozo.expandModes.single) {
                        _base.$sections.each(function () {
                            methods.animate(_base, $(this).removeClass(zozo.classes.active).find("> .z-content").stop(), null, { height: "0", overflow: "" });
                        });
                    }

                    /*if (_base.settings.expandMode === zozo.expandModes.single) {
                        methods.animate(_base, _base.$elem.find(ACTIVESECTION).removeClass(zozo.classes.active).find(CONTENTS).stop(), null, { height: "0", overflow: "" });
                    } */

                    var _maxHeight = (_contentHeight <= 0) ? methods.getElementSize(_item.content).height : _contentHeight;
                    var _post = { height: "auto" };
                    if (_contentHeight > 0) {
                        setTimeout(function () { _item.content.css({ overflow: "auto" }); }, _duration);
                        _post = null;
                    }

                    methods.animate(_base, _item.content.stop(), null, { height: _maxHeight }, _post);
                    _item.section.addClass(zozo.classes.active);


                }
            }

            return _base;
        },
        updateDotNav: function (_base, _item) {
            if (_base.settings.slider === true) {
                var _parent = _base.$elem.parent();
                _parent.find(DOTNAVACTIVEITEM).removeClass(zozo.classes.active);
                _parent.find(DOTNAVITEM).eq(_item.index).toggleClass(zozo.classes.active);
            }
        },
        addAria: function (_base, _item) {
            _base.$sections.each(function (index, item) {
                var _$section = $(item);
                var _$head = _$section.find("> h3");
                var _$cont = _$section.find("> div");
                var _expanded = (_$section.hasClass(zozo.classes.active));

                $.zozo.core.console.log("currentsection: " + _base.currentsection + " index: " + _item.index + " expanded: " + _expanded);

                _$section.attr({
                    "aria-hidden": (!_expanded).toString(),
                    "aria-expanded": (_expanded).toString(),
                    "aria-selected": (_expanded).toString()
                });

                _$head.attr({
                    "aria-controls": _base.elemID + "-" + (index + 1),
                    "role": "tab",
                    "tabindex": "-1"
                });

                _$cont.attr({
                    "id": _base.elemID + "-" + (index + 1),
                    "role": "tabpanel",
                    "aria-hidden": (!_expanded).toString(),
                    "aria-expanded": (_expanded).toString()
                });
            });

            return _base;
        },
        ajaxRequest: function (_base, _item, _func) {
            if (!_item.section.hasClass(zozo.classes.active)) {
                var loadingIconTimeout = setTimeout(function () {
                    _item.link.find(ARROW).addClass(LOADINGCLASS);
                }, 100);

                var data = {};

                $.ajax({
                    type: "GET",
                    cache: (_base.settings.cacheAjax === true),
                    url: _item.contentUrl,
                    dataType: "html",
                    data: data,
                    beforeSend: function (xhr, settings) {
                        //return fire(element, 'ajax:beforeSend', [xhr, settings]);
                    },
                    error: function (xhr, status, error) {
                        if (xhr.status == 404) {
                            _item.contentInner.html("<h4 style='color:red;'>Sorry, error: 404 - the requested content could not be found.</h4>");
                        }
                        else {
                            _item.contentInner.html("<h4 style='color:red;'>An error occurred: " + status + "\nError: " + xhr + " code: " + xhr.status + "</h4>");
                        }
                        (_base.settings.error && typeof (_base.settings.error) == typeof (Function)) && _base.$elem.trigger(ERROR, xhr);
                    },
                    complete: function (xhr, status) {
                        //_base.$elem.trigger('ajax:complete', [xhr, status]);
                        clearTimeout(loadingIconTimeout);
                        _item.link.find(ARROW).removeClass(LOADINGCLASS);
                        (_func && typeof (_func) == typeof (Function)) && _func(_base, _item);
                    },
                    success: function (data, status, xhr) {
                        _item.contentInner.html(data);
                        (_base.settings.contentLoad && typeof (_base.settings.contentLoad) == typeof (Function)) && _base.$elem.trigger(CONTENTLOAD, { header: _item.link[0], content: _item.contentInner[0], index: _item.index });
                    }
                });
            } else {
                (_func && typeof (_func) == typeof (Function)) && _func(_base, _item);
            }
            return _base;
        },
        getFirst: function (_base) {
            return 0;
        },
        getLast: function (_base) {
            return parseInt(_base.$sections.size()) - 1;
        },
        initAutoPlay: function (_base) {
            if (_base.settings.autoplay !== false && _base.settings.autoplay != null) {
                if (_base.settings.autoplay.interval > 0) {
                    _base.stop();
                    _base.autoplayIntervalId = setInterval(function () { _base.next(_base); }, _base.settings.autoplay.interval);
                } else {
                    _base.stop();
                }
            }
            else {
                _base.stop();
            }
        },
        animate: function (_base, _elem, _pre, _prop, _post, _hidePre) {
            $.zozo.core.utils.animate(_base, _elem, _pre, _prop, _post, _hidePre);
        },
        getElementSize: function (_content) {
            var _size = { width: 0, height: 0 };
            if (_content == null || _content.length == 0) {
                return _size;
            }

            if (_content.css("height") === 0 || _content.css("height") === "0px") {

                _content.css({ "height": "auto" });

                _size.height = _content.innerHeight();
                _size.width = _content.outerWidth();

                _content.css("height", "0px");

            } else {

                var _oHeight = _content.css("height");

                //_content.css({ "height": "auto" });


                _size.height = _content.innerHeight();
                _size.width = _content.outerWidth();

                // _content.css("height", _oHeight);
            }

            return _size;
        },
        isTabDisabled: function (_section) {
            return (_section.hasClass(DISABLEDCLASS) || _section.data(DISABLED) === true);
        },
        create: function (_h, _c) {
            return $("<section><h3>" + _h + "</h3><div>" + _c + "</div></section");
        }
    };

    ZozoAccordion.defaults = ZozoAccordion.prototype.defaults;

    $.fn.zozoAccordion = function (options) {
        return this.each(function () {
            if (undefined == $(this).data(zozo.pluginName)) {
                var zozoAccordion = new ZozoAccordion(this, options).init();
                $(this).data(zozo.pluginName, zozoAccordion);
            }
        });
    };

    window.zozo.accordion = ZozoAccordion;

    $(document).ready(function () {
        $("[data-role='z-accordion']").each(function (index, item) {
            if (!$(item).zozoAccordion())
                $(item).zozoAccordion();

            $(item).find("[data-role='z-accordion']").each(function (index, nested2) {
                if (!$(nested2).zozoAccordion())
                    $(nested2).zozoAccordion();

                $(nested2).find("[data-role='z-accordion']").each(function (index, nested3) {
                    if (!$(nested3).zozoAccordion())
                        $(nested3).zozoAccordion();

                    $(nested3).find("[data-role='z-accordion']").each(function (index, nested4) {
                        if (!$(nested4).zozoAccordion())
                            $(nested4).zozoAccordion();
                    });
                });
            });
        });
    });



})(jQuery, window, document);



(function ($) { 
    $.StoreHours = function () {         
    };

    $.StoreHours.prototype = {
        getCurrentDay: function(){    
            var weekday = new Array(7);
            weekday[0]=  "sun";
            weekday[1] = "mon";
            weekday[2] = "tue";
            weekday[3] = "wed";
            weekday[4] = "thu";
            weekday[5] = "fri";
            weekday[6] = "sat";
            return weekday[new Date().getDay()]; 
        }, 
        getCurrentDayMonth:function(){
            var d = new Date(); 
            var mm = (d.getMonth()+1).toString(); 
            var dd  = d.getDate().toString();

            if(mm.length == 1)
                mm = '0' + mm;
            if(dd.length == 1)
                dd = '0' + dd;
            return mm + '/' + dd;
        },
        getDateByHour: function(hour,gmt){                        
            var dateStr = new Date().toString().substr(0,16) + hour + ":00";
            if(gmt != null)
                dateStr += " GMT" + gmt;
            
            return new Date(dateStr); 
        },
        storeHours: function (arguments) {                                         
            $(".sh-" + this.getCurrentDay()).addClass("status-current");
            $(".sh-" + this.getCurrentDay() + " [data-sh-start]")
                    .each(function(){       
                        
                        var currentDayMonth=$.StoreHours.prototype.getCurrentDayMonth();
                        var closedDays=$("[data-sh-closedays]").attr('data-sh-closedays');
                        
                        if(closedDays.indexOf(currentDayMonth) >= 0){                            
                            if(!$(this).parent().hasClass("status-opened"))
                                $(this).parent().addClass("status-closed");
                            return;
                        }
                                                    
                        var gmt = $(this).attr('data-sh-gmt');
                        var dateStart = $.StoreHours.prototype.getDateByHour($(this).attr('data-sh-start'),gmt);
                        var dateEnd = $.StoreHours.prototype.getDateByHour($(this).attr('data-sh-end'),gmt);
                        if(dateEnd < dateStart){
                            dateEnd.setDate(dateEnd.getDate() + 1);                            
                        }
                        var dt = new Date();                                                
                        
                        if(dt >= dateStart && dt <= dateEnd){                           
                           $(this).parent().removeClass("status-closed");
                           $(this).parent().addClass("status-opened");
                       }
                       else{
                           if(!$(this).parent().hasClass("status-opened"))
                            $(this).parent().addClass("status-closed");
                       }
                        
                    });
            $(".sh-" + this.getCurrentDay())
                    .each(function(){  
                        
                        var status = $("[data-sh-status]",this).attr("data-sh-status");                        
                        if(status !== ""){
                            $(this).addClass("status-" + status);
                        }                       
            });
                    
            
            $(".sh-alert-opened").each(function(){
                if($(".sh-" + $.StoreHours.prototype.getCurrentDay()).hasClass("status-opened"))
                    $(this).addClass("status-shown");
                else
                    $(this).addClass("status-hidden");
            });
            
            $(".sh-alert-closed").each(function(){
                if($(".sh-" + $.StoreHours.prototype.getCurrentDay()).hasClass("status-closed"))
                    $(this).addClass("status-shown");
                else
                    $(this).addClass("status-hidden");
            });
            
        }        
    }; 
    
    $.StoreHours.prototype.storeHours(arguments);    

}(jQuery));





/**
 * CoolClock 2.1.4
 * Copyright 2010, Simon Baird
 * Released under the BSD License.
 *
 * Display an analog clock using canvas.
 * http://randomibis.com/coolclock/
 *
 */

// Constructor for CoolClock objects
window.CoolClock = function(options) {
	return this.init(options);
}

// Config contains some defaults, and clock skins
CoolClock.config = {
	tickDelay: 1000,
	longTickDelay: 15000,
	defaultRadius: 85,
	renderRadius: 100,
	defaultSkin: "chunkySwiss",
	// Should be in skin probably...
	// (TODO: allow skinning of digital display)
	showSecs: true,
	showAmPm: true,

	skins:	{
		// There are more skins in moreskins.js
		// Try making your own skin by copy/pasting one of these and tweaking it
		swissRail: {
			outerBorder: { lineWidth: 2, radius:95, color: "black", alpha: 1 },
			smallIndicator: { lineWidth: 2, startAt: 88, endAt: 92, color: "black", alpha: 1 },
			largeIndicator: { lineWidth: 4, startAt: 79, endAt: 92, color: "black", alpha: 1 },
			hourHand: { lineWidth: 8, startAt: -15, endAt: 50, color: "black", alpha: 1 },
			minuteHand: { lineWidth: 7, startAt: -15, endAt: 75, color: "black", alpha: 1 },
			secondHand: { lineWidth: 1, startAt: -20, endAt: 85, color: "red", alpha: 1 },
			secondDecoration: { lineWidth: 1, startAt: 70, radius: 4, fillColor: "red", color: "red", alpha: 1 }
		},
		chunkySwiss: {
			outerBorder: { lineWidth: 4, radius:97, color: "black", alpha: 1 },
			smallIndicator: { lineWidth: 4, startAt: 89, endAt: 93, color: "black", alpha: 1 },
			largeIndicator: { lineWidth: 8, startAt: 80, endAt: 93, color: "black", alpha: 1 },
			hourHand: { lineWidth: 12, startAt: -15, endAt: 60, color: "black", alpha: 1 },
			minuteHand: { lineWidth: 10, startAt: -15, endAt: 85, color: "black", alpha: 1 },
			secondHand: { lineWidth: 4, startAt: -20, endAt: 85, color: "red", alpha: 1 },
			secondDecoration: { lineWidth: 2, startAt: 70, radius: 8, fillColor: "red", color: "red", alpha: 1 }
		},
		chunkySwissOnBlack: {
			outerBorder: { lineWidth: 4, radius:97, color: "white", alpha: 1 },
			smallIndicator: { lineWidth: 4, startAt: 89, endAt: 93, color: "white", alpha: 1 },
			largeIndicator: { lineWidth: 8, startAt: 80, endAt: 93, color: "white", alpha: 1 },
			hourHand: { lineWidth: 12, startAt: -15, endAt: 60, color: "white", alpha: 1 },
			minuteHand: { lineWidth: 10, startAt: -15, endAt: 85, color: "white", alpha: 1 },
			secondHand: { lineWidth: 4, startAt: -20, endAt: 85, color: "red", alpha: 1 },
			secondDecoration: { lineWidth: 2, startAt: 70, radius: 8, fillColor: "red", color: "red", alpha: 1 }
		}

	},

	// Test for IE so we can nurse excanvas in a couple of places
	isIE: !!document.all,

	// Will store (a reference to) each clock here, indexed by the id of the canvas element
	clockTracker: {},

	// For giving a unique id to coolclock canvases with no id
	noIdCount: 0
};

// Define the CoolClock object's methods
CoolClock.prototype = {

	// Initialise using the parameters parsed from the colon delimited class
	init: function(options) {
		// Parse and store the options
		this.canvasId       = options.canvasId;
		this.skinId         = options.skinId || CoolClock.config.defaultSkin;
		this.displayRadius  = options.displayRadius || CoolClock.config.defaultRadius;
		this.showSecondHand = typeof options.showSecondHand == "boolean" ? options.showSecondHand : true;
		this.gmtOffset      = (options.gmtOffset != null && options.gmtOffset != '') ? parseFloat(options.gmtOffset) : null;
		this.showDigital    = typeof options.showDigital == "boolean" ? options.showDigital : false;
		this.logClock       = typeof options.logClock == "boolean" ? options.logClock : false;
		this.logClockRev    = typeof options.logClock == "boolean" ? options.logClockRev : false;

		this.tickDelay      = CoolClock.config[ this.showSecondHand ? "tickDelay" : "longTickDelay" ];

		// Get the canvas element
		this.canvas = document.getElementById(this.canvasId);

		// Make the canvas the requested size. It's always square.
		this.canvas.setAttribute("width",this.displayRadius*2);
		this.canvas.setAttribute("height",this.displayRadius*2);
		this.canvas.style.width = this.displayRadius*2 + "px";
		this.canvas.style.height = this.displayRadius*2 + "px";

		// Explain me please...?
		this.renderRadius = CoolClock.config.renderRadius;
		this.scale = this.displayRadius / this.renderRadius;

		// Initialise canvas context
		this.ctx = this.canvas.getContext("2d");
		this.ctx.scale(this.scale,this.scale);

		// Keep track of this object
		CoolClock.config.clockTracker[this.canvasId] = this;

		// Start the clock going
		this.tick();

		return this;
	},

	// Draw a circle at point x,y with params as defined in skin
	fullCircleAt: function(x,y,skin) {
		this.ctx.save();
		this.ctx.globalAlpha = skin.alpha;
		this.ctx.lineWidth = skin.lineWidth;

		if (!CoolClock.config.isIE) {
			this.ctx.beginPath();
		}

		if (CoolClock.config.isIE) {
			// excanvas doesn't scale line width so we will do it here
			this.ctx.lineWidth = this.ctx.lineWidth * this.scale;
		}

		this.ctx.arc(x, y, skin.radius, 0, 2*Math.PI, false);

		if (CoolClock.config.isIE) {
			// excanvas doesn't close the circle so let's fill in the tiny gap
			this.ctx.arc(x, y, skin.radius, -0.1, 0.1, false);
		}

		if (skin.fillColor) {
			this.ctx.fillStyle = skin.fillColor
			this.ctx.fill();
		}
		else {
			// XXX why not stroke and fill
			this.ctx.strokeStyle = skin.color;
			this.ctx.stroke();
		}
		this.ctx.restore();
	},

	// Draw some text centered vertically and horizontally
	drawTextAt: function(theText,x,y) {
		this.ctx.save();
		this.ctx.font = '15px sans-serif';
		var tSize = this.ctx.measureText(theText);
		if (!tSize.height) tSize.height = 15; // no height in firefox.. :(
		this.ctx.fillText(theText,x - tSize.width/2,y - tSize.height/2);
		this.ctx.restore();
	},

	lpad2: function(num) {
		return (num < 10 ? '0' : '') + num;
	},

	tickAngle: function(second) {
		// Log algorithm by David Bradshaw
		var tweak = 3; // If it's lower the one second mark looks wrong (?)
		if (this.logClock) {
			return second == 0 ? 0 : (Math.log(second*tweak) / Math.log(60*tweak));
		}
		else if (this.logClockRev) {
			// Flip the seconds then flip the angle (trickiness)
			second = (60 - second) % 60;
			return 1.0 - (second == 0 ? 0 : (Math.log(second*tweak) / Math.log(60*tweak)));
		}
		else {
			return second/60.0;
		}
	},

	timeText: function(hour,min,sec) {
		var c = CoolClock.config;
		return '' +
			(c.showAmPm ? ((hour%12)==0 ? 12 : (hour%12)) : hour) + ':' +
			this.lpad2(min) +
			(c.showSecs ? ':' + this.lpad2(sec) : '') +
			(c.showAmPm ? (hour < 12 ? ' am' : ' pm') : '')
		;
	},

	// Draw a radial line by rotating then drawing a straight line
	// Ha ha, I think I've accidentally used Taus, (see http://tauday.com/)
	radialLineAtAngle: function(angleFraction,skin) {
		this.ctx.save();
		this.ctx.translate(this.renderRadius,this.renderRadius);
		this.ctx.rotate(Math.PI * (2.0 * angleFraction - 0.5));
		this.ctx.globalAlpha = skin.alpha;
		this.ctx.strokeStyle = skin.color;
		this.ctx.lineWidth = skin.lineWidth;

		if (CoolClock.config.isIE)
			// excanvas doesn't scale line width so we will do it here
			this.ctx.lineWidth = this.ctx.lineWidth * this.scale;

		if (skin.radius) {
			this.fullCircleAt(skin.startAt,0,skin)
		}
		else {
			this.ctx.beginPath();
			this.ctx.moveTo(skin.startAt,0)
			this.ctx.lineTo(skin.endAt,0);
			this.ctx.stroke();
		}
		this.ctx.restore();
	},

	render: function(hour,min,sec) {
		// Get the skin
		var skin = CoolClock.config.skins[this.skinId];
		if (!skin) skin = CoolClock.config.skins[CoolClock.config.defaultSkin];

		// Clear
		this.ctx.clearRect(0,0,this.renderRadius*2,this.renderRadius*2);

		// Draw the outer edge of the clock
		if (skin.outerBorder)
			this.fullCircleAt(this.renderRadius,this.renderRadius,skin.outerBorder);

		// Draw the tick marks. Every 5th one is a big one
		for (var i=0;i<60;i++) {
			(i%5)  && skin.smallIndicator && this.radialLineAtAngle(this.tickAngle(i),skin.smallIndicator);
			!(i%5) && skin.largeIndicator && this.radialLineAtAngle(this.tickAngle(i),skin.largeIndicator);
		}

		// Write the time
		if (this.showDigital) {
			this.drawTextAt(
				this.timeText(hour,min,sec),
				this.renderRadius,
				this.renderRadius+this.renderRadius/2
			);
		}

		// Draw the hands
		if (skin.hourHand)
			this.radialLineAtAngle(this.tickAngle(((hour%12)*5 + min/12.0)),skin.hourHand);

		if (skin.minuteHand)
			this.radialLineAtAngle(this.tickAngle((min + sec/60.0)),skin.minuteHand);

		if (this.showSecondHand && skin.secondHand)
			this.radialLineAtAngle(this.tickAngle(sec),skin.secondHand);

		// Second hand decoration doesn't render right in IE so lets turn it off
		if (!CoolClock.config.isIE && this.showSecondHand && skin.secondDecoration)
			this.radialLineAtAngle(this.tickAngle(sec),skin.secondDecoration);
	},

	// Check the time and display the clock
	refreshDisplay: function() {
		var now = new Date();
		if (this.gmtOffset != null) {
			// Use GMT + gmtOffset
			var offsetNow = new Date(now.valueOf() + (this.gmtOffset * 1000 * 60 * 60));
			this.render(offsetNow.getUTCHours(),offsetNow.getUTCMinutes(),offsetNow.getUTCSeconds());
		}
		else {
			// Use local time
			this.render(now.getHours(),now.getMinutes(),now.getSeconds());
		}
	},

	// Set timeout to trigger a tick in the future
	nextTick: function() {
		setTimeout("CoolClock.config.clockTracker['"+this.canvasId+"'].tick()",this.tickDelay);
	},

	// Check the canvas element hasn't been removed
	stillHere: function() {
		return document.getElementById(this.canvasId) != null;
	},

	// Main tick handler. Refresh the clock then setup the next tick
	tick: function() {
		if (this.stillHere()) {
			this.refreshDisplay()
			this.nextTick();
		}
	}
};

// Find all canvas elements that have the CoolClock class and turns them into clocks
CoolClock.findAndCreateClocks = function() {
	// (Let's not use a jQuery selector here so it's easier to use frameworks other than jQuery)
	var canvases = document.getElementsByTagName("canvas");
	for (var i=0;i<canvases.length;i++) {
		// Pull out the fields from the class. Example "CoolClock:chunkySwissOnBlack:1000"
		var fields = canvases[i].className.split(" ")[0].split(":");
		if (fields[0] == "CoolClock") {
			if (!canvases[i].id) {
				// If there's no id on this canvas element then give it one
				canvases[i].id = '_coolclock_auto_id_' + CoolClock.config.noIdCount++;
			}
			// Create a clock object for this element
			new CoolClock({
				canvasId:       canvases[i].id,
				skinId:         fields[1],
				displayRadius:  fields[2],
				showSecondHand: fields[3]!='noSeconds',
				gmtOffset:      fields[4],
				showDigital:    fields[5]=='showDigital',
				logClock:       fields[6]=='logClock',
				logClockRev:    fields[6]=='logClockRev'
			});
		}
	}
};

// If you don't have jQuery then you need a body onload like this: <body onload="CoolClock.findAndCreateClocks()">
// If you do have jQuery and it's loaded already then we can do it right now
if (window.jQuery) jQuery(document).ready(CoolClock.findAndCreateClocks);


CoolClock.config.skins = {

	

	kasteelHoensbroek: {
		outerBorder:      { lineWidth: 8, radius: 97, color: "#fff", alpha: 1 },
		smallIndicator:   { lineWidth: 0, startAt: 89, endAt: 89, color: "#fff", alpha: 0 },
		largeIndicator:   { lineWidth: 0, startAt: 80, endAt: 93, color: "#fff", alpha: 1 },
		hourHand:         { lineWidth: 12, startAt: -15, endAt: 60, color: "#fff", alpha: 1 },
		minuteHand:         { lineWidth: 12, startAt: -15, endAt: 60, color: "#fff", alpha: 1 }
	}

};




