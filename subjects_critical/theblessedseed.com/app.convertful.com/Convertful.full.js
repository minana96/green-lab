if (window.Convertful !== undefined) throw 'Canceled reinitialization!';
window.Convertful = {};

/**
 * cQuery, Internal JavaScript Library
 */
!function(){
	"use strict";
	if (window.cQuery) return false;
	// @link https://github.com/jquery/jquery/blob/master/src/core/init.js
	var $ = window.cQuery = function(a, b){
		if (a instanceof $) return a;
		// New elements creation
		if (typeof a === 'string' && a[0] === '<' && a.substr(-1) === '>' && a.length >= 3) return $.$tmp.html(a).children().detach();
		if (typeof a === 'function'){
			a = a.bind(window, $);
			return $.isReady ? a() : readyList.push(a);
		}
		if (!(this instanceof $)) return new $(a, b);
		this.elms = [];
		if (a === undefined) return this;
		if (a instanceof Node || a === window) this.elms.push(a);
		if (typeof a === 'string'){
			b = (b === undefined) ? document : b;
			var findIn = function(c){
				if (c.querySelectorAll && a) for (var r = c.querySelectorAll(a), i = 0; i < r.length; i++) this.elms.push(r[i]);
			}.bind(this);
			if (b instanceof $) b.each(findIn);
			else findIn(b);
		}
		return this;
	};
	$.fn = $.prototype;
	/**
	 * Iterators
	 */
	$.fn.each = function(fn){
		this.elms.forEach(function(elm, index){
			fn.call(elm, elm, index);
		});
		return this;
	};
	$.each = function(elms, fn){
		var _fn = function(v, k){
			fn(k, v);
		};
		if (elms instanceof Array) elms.forEach(_fn);
		else if (elms instanceof $) elms.each(_fn);
		else for (var k in elms) if (elms.hasOwnProperty(k)) fn(k, elms[k]);
	};
	$.eachCSS = function(css, fn){
		if (css instanceof Array) css.forEach(function(kv){
			fn.apply(undefined, kv);
		});
		else $.each(css, fn);
	};
	$.fn.map = function(fn){
		return this.elms.map(function(index, elm, elms){
			return fn.call(elm, index, elms);
		});
	};
	/**
	 * Working with classes
	 */
	$.fn.hasClass = function(cls){
		var pcre = new RegExp('(^| )' + cls + '((?= )|$)', 'g');
		for (var i = 0; i < this.elms.length; i++){
			if (this.elms[i].className.match(pcre)) return true;
		}
		return false;
	};
	$.fn.addClass = function(cls){
		var pcre = new RegExp('(^| )' + cls + '((?= )|$)', 'g');
		return this.each(function(){
			if (!this.className.match(pcre)) this.className += ' ' + cls;
		});
	};
	$.fn.removeClass = function(cls){
		var pcre = new RegExp('(^| )' + cls + '((?= )|$)', 'g');
		return this.each(function(){
			this.className = this.className.replace(pcre, '$1$2').trim();
		});
	};
	$.fn.mod = function(mod, value){
		if (this.elms.length === 0) return this;
		var pcre = new RegExp('(^| )' + mod + '\_([a-zA-Z0-9\_\-]+)((?= )|$)', 'g');
		// Remove class modificator
		if (value === false) return this.each(function(){
			this.className = this.className.replace(pcre, '$3');
		});
		// Retreive modificator
		var arr;
		if (value === undefined) return (arr = pcre.exec(this.elms[0].className)) ? arr[2] : false;
		// Set modificator
		return this.each(function(){
			if (this.className.match(pcre)){
				this.className = this.className.replace(pcre, '$1' + mod + '_' + value + '$3');
			} else {
				this.className += ' ' + mod + '_' + value;
			}
		});
	};
	var elmMatches = function(elm, s){
		if (s === undefined) return true;
		return (elm.matches || elm.matchesSelector || elm.msMatchesSelector || elm.oMatchesSelector).call(elm, s);
	};
	$.fn.is = function(s){
		for (var i = 0; i < this.elms.length; i++){
			if (elmMatches(this.elms[i], s)) return true;
		}
		return false;
	};
	/**
	 * Traversing
	 */
	$.fn.find = function(s){
		return $(s, this);
	};
	$.fn.filter = function(s){
		var n = $();
		this.each(function(){
			if (elmMatches(this, s)) n.elms.push(this);
		});
		return n;
	};
	$.fn.first = function(){
		return $(this.elms[0]);
	};
	$.fn.closest = function(s){
		var n = $();
		this.each(function(e){
			for (; e.parentNode; e = e.parentNode) if (elmMatches(e, s)){
				n.elms.push(e);
				break;
			}
		});
		return n;
	};
	$.fn.parent = function(s){
		var n = $();
		this.each(function(){
			if (elmMatches(this.parentNode, s)) n.elms.push(this.parentNode);
		});
		return n;
	};
	$.fn.children = function(s){
		var n = $();
		this.each(function(){
			for (var i = 0; i < this.children.length; i++) if (elmMatches(this.children[i], s)) n.elms.push(this.children[i]);
		});
		return n;
	};
	/**
	 * Working with elements properties including style and data
	 */
	$.fn.attr = function(k, v){
		if (v === undefined) return this.elms.length ? this.elms[0].getAttribute(k) : null;
		return this.each(function(){
			this.setAttribute(k, v);
		});
	};
	$.fn.css = function(css){
		if (arguments.length === 2) css = [arguments];
		// Getter behavior: retrieving first element's css value
		if (typeof css === 'string') return this.elms.length ? this.elms[0].style[css] : null;
		// Setter behavior: setting all elements' css values
		return this.each(function(elm){
			var cssString = '';
			$.eachCSS(css, function(k, v){
				k = k.replace(/[A-Z][a-z]*/g, str => '-' + str.toLowerCase())// Convert words to lower case and add hyphens around it (for stuff like "&")
					.replace('--', '-') // remove double hyphens
					.replace(/(^-)|(-$)/g, ''); // remove hyphens at the beginning and the end
				// Adding 'px' after pure numbers
				if (Number(v) == v)
					v = v + 'px';
				cssString += k + ':' + v + ';';
			});

			elm.style.cssText += ';' + cssString;
		});
	};
	$.fn.eraseCSS = function(atts){
		return this.each(function(){
			for (var i = 0; i < atts.length; i++) this.style[atts[i]] = null;
		});
	};
	$.fn.data = function(k, v){
		// Getter behavior
		if (v === undefined){
			if (!this.elms.length) return;
			if (k === undefined){
				if (!!this.elms[0].$$oqData) return this.elms[0].$$oqData;
				this.elms[0].$$oqData = {};
				if (!this.elms[0].hasAttributes()) return {};
				var attr;
				for (var attr_i in this.elms[0].attributes){
					if (this.elms[0].attributes.hasOwnProperty(attr_i)){
						attr = this.elms[0].attributes[attr_i];
						if (attr.name.slice(0, 5) !== 'data-') continue;
						var value;
						try {
							value = JSON.parse(attr.value);

						} catch (err) {
							value = attr.value;
						}
						this.elms[0].$$oqData[attr.name.substr(5)] = value;
					}
				}
				return this.elms[0].$$oqData;
			}
			return this.elms[0].$$oqData ? (this.elms[0].$$oqData[k] || this.attr('data-' + k)) : this.attr('data-' + k);
		}
		// Setter/deleter behavior
		return this.each(function(){
			if (!this.$$oqData) this.$$oqData = {};
			if (v === null) delete this.$$oqData[k];
			else this.$$oqData[k] = v;
		});
	};
	$.fn.val = function(value){
		if (value === undefined) return this.elms.length ? this.elms[0].value : null;
		return this.each(function(){
			this.value = value;
		});
	};
	$.fn.height = function(value){
		if (value === undefined) return this.elms.length ? this.elms[0].offsetHeight : 0;
		return this.css({height: value});
	};
	/**
	 * Manipulations
	 */
	$.fn.html = function(html){
		if (html === undefined) return this.elms.length ? this.elms[0].innerHTML : null;
		return this.each(function(elm){
			elm.innerHTML = html;
		});
	};
	$.fn.text = function(){
		var text = '';
		this.each(function(elm){
			text += elm.textContent || elm.innerText || '';
		});
		return text;
	};
	$.fn.detach = function(){
		return this.each(function(){
			if (this.parentNode) this.parentNode.removeChild(this);
		});
	};
	$.fn.remove = function(){
		this.find('*').each(function(){
			delete this.$$oqEvents;
		});
		this.html('').each(function(){
			delete this.$$oqEvents;
		}).detach();
		this.elms = [];
	};
	// Iterate over both this and a given collection with a function
	$.fn.eachEach = function($elms, fn){
		return this.each(function(self){
			$elms.each(function(elm){
				fn(self, elm);
			});
		});
	};
	var oppositeTo = function(fn){
		return function(parents){
			$(parents)[fn](this);
			return this;
		};
	};
	// Iterate over the given collection using own first element
	$.fn.append = function(elms){
		return this.eachEach($(elms), function(parent, elm){
			parent.appendChild(elm);
		});
	};
	$.fn.appendTo = oppositeTo('append');
	$.fn.prepend = function(elms){
		return this.eachEach($(elms), function(parent, elm){
			parent.insertBefore(elm, parent.firstChild);
		});
	};
	$.fn.prependTo = oppositeTo('prepend');
	$.fn.before = function(elms){
		return this.eachEach($(elms), function(rel, elm){
			rel.parentNode.insertBefore(elm, rel);
		});
	};
	$.fn.insertBefore = oppositeTo('before');
	$.fn.after = function(elms){
		return this.eachEach($(elms), function(rel, elm){
			rel.parentNode.insertBefore(elm, rel);
			rel.parentNode.insertBefore(rel, elm);
		});
	};
	$.fn.insertAfter = oppositeTo('after');
	$.fn.replace = function(elms){
		$(elms).before(this).remove();
	};
	/**
	 * Events
	 */
	$.fn.on = function(events, fn){
		// Second argument may be a selector for delegated events
		var selector = (arguments.length === 3 && typeof fn === 'string') ? fn : null;
		if (selector) fn = arguments[2];
		return this.each(function(elm){
			var fnWrap = selector ? function(e){
				for (var target = e.target; target.parentNode; target = target.parentNode){
					if (elmMatches(target, selector)) return fn.call(target, e);
				}
			} : fn.bind(elm);
			$.each(events.split(' '), function(_, e){
				var key = (selector ? (selector + ':') : '') + e;
				if (!elm.$$oqEvents) elm.$$oqEvents = {};
				if (!elm.$$oqEvents[key]) elm.$$oqEvents[key] = [];
				elm.$$oqEvents[key].push([fn, fnWrap]);
				elm.addEventListener(e, fnWrap);
			});
		});
	};
	$.fn.off = function(es, fn){
		// Second argument may be a selector for delegated events
		var selector = (arguments.length === 3 && typeof fn === 'string') ? fn : null;
		if (selector) fn = arguments[2];
		return this.each(function(elm){
			$.each(es.split(' '), function(_, e){
				var key = (selector ? (selector + ':') : '') + e;
				if (!elm.$$oqEvents || !elm.$$oqEvents[key]) return;
				elm.$$oqEvents[key] = elm.$$oqEvents[key].filter(function(ff){
					if (ff[0] === fn) return elm.removeEventListener(e, ff[1]) && false;
					return true;
				});
				if (!elm.$$oqEvents[key].length) delete elm.$$oqEvents[key];
			});
		});
	};
	$.fn.one = function(es, fn){
		var fnWrap = function(e){
			fn.call(this, e);
			this.off(es, fnWrap);
		}.bind(this);
		return this.on(es, fnWrap);
	};
	$.fn.trigger = function(e){
		return this.each(function(){
			this.dispatchEvent(new Event(e));
		});
	};
	var readyList = [];
	// DomReady Event
	$.ready = function(){
		$.isReady = true;
		readyList.forEach(function(fn){
			fn();
		});
	};
	if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)){
		setTimeout($.ready);
	} else {
		var _domready = function(){
			document.removeEventListener('DOMContentLoaded', _domready);
			window.removeEventListener('load', _domready);
			$.ready();
		};
		document.addEventListener('DOMContentLoaded', _domready);
		window.addEventListener('load', _domready);
	}

	// Monkey patching window.history
	(function(history) {
		var pushState = history.pushState;
		history.pushState = function(state) {
			if (typeof history.onpushstate == "function" && window.Convertful)
				window.Convertful.requestAnimationFrame(function(){
					history.onpushstate({ state: state });
				});

			return pushState.apply(history, arguments);
		}
	})(window.history);

	/**
	 * Animations
	 */
	$.fn.animate = function(css, duration, easing, complete, delay){
		duration = duration || 250;
		easing = easing || 'ease-in-out';
		delay = delay || 25;
		var trans = '';
		$.eachCSS(css, function(k){
			trans += (trans ? ', ' : '') + (k + ' ' + duration + 'ms ' + easing);
		});
		return this
			.stop()
			.css({
				transition: trans,
				'-webkit-transition': trans
			})
			.data('$animationStart', setTimeout(function(){
				this.css(css);
			}.bind(this), delay))
			.data('$animationEnd', setTimeout(function(){
				this.stop();
				if (complete instanceof Function) complete.call(this);
			}.bind(this), delay + duration));
	};
	$.fn.stop = function(){
		return this.each(function(){
			var $this = $(this);
			['$animationStart', '$animationStop'].forEach(function(k){
				clearTimeout($this.data(k));
				$this.data(k, null);
			});
		}).eraseCSS(['transition', '-webkit-transition']);
	};
	$.fn.scrollTo = $.scrollTo = function(to, duration, complete){
		if (duration <= 0){
			if (complete instanceof Function) complete.call(this);
			return;
		}
		var elm = this.hasOwnProperty('elms') ? this.elms[0] : window;
		setTimeout(function(){
			elm.scroll(0, elm.pageYOffset + (to - elm.pageYOffset) / duration * 10);
			$.scrollTo(to, duration - 10, complete);
		}, 10);
	};
	/**
	 * Ajax Requests
	 */
	var objToUri = function(obj, prefix){
		var str = [];
		$.each(obj, function(k, v){
			k = prefix ? (prefix + '[' + k + ']') : k;
			str.push((v !== null && typeof v === 'object') ? objToUri(v, k) : (encodeURIComponent(k) + '=' + encodeURIComponent(v)));
		});
		return str.join('&');
	};
	$.etag = {};
	$.ajax = function(url, s){
		// Supporting .ajax(s) syntax
		if (typeof url !== 'string') url = (s = url || {}).url;
		var dataType = s.dataType || 'json',
			x = new XMLHttpRequest;
		x.onload = x.onerror = x.ontimeout = function(e){
			var isSuccess = x.status >= 200 && x.status < 300 || x.status === 304;
			var fn = s[isSuccess ? 'success' : 'error'];
			if (fn instanceof Function){
				var response = x.response || e.target.response;
				if (dataType === 'json' && typeof response === 'string'){
					try {
						response = JSON.parse(response);
					} catch (e) {
						return;
					}
				}
				fn(response);
			}
			if (isSuccess && s.ifModified){
				var etag = x.getResponseHeader("etag");
				if (etag)
					$.etag[url] = etag;
			}
		};
		var data = s.data || {},
			isPost = (s.type === 'POST');
		if (!isPost && s.cache !== undefined && !s.cache) data._ = Date.now();
		data = objToUri(data);
		if (isPost){
			x.open('POST', url, true);
			x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		} else /*if (s.type == 'GET')*/ {
			x.open('GET', url + (data.length ? ((url.indexOf('?') === -1) ? '?' : '&') : '') + data, true);
		}
		x.withCredentials = true;
		//x.setRequestHeader('If-None-Match', '123');
		if (s.ifModified && $.etag[url])
			x.setRequestHeader("If-None-Match", $.etag[url]);
		// Has to be after open (IE 10-11)
		x.responseType = dataType;
		x.timeout = s.timeout || 20000;
		x.send.apply(x, isPost ? [data] : []);

		return x;
	};
	$.get = function(url, data, success, dataType){
		return $.ajax((typeof url !== 'string') ? url : {
			type: 'GET',
			url: url,
			data: data,
			success: success,
			dataType: dataType
		});
	};
	$.post = function(url, data, success, dataType){
		return $.ajax((typeof url !== 'string') ? url : {
			type: 'POST',
			url: url,
			data: data,
			success: success,
			dataType: dataType
		});
	};
	/**
	 * Global Storage
	 */
	var sDrivers = [];
	$.storagePrefix = 'conv_';
	// Storage driver: Browser HTML5 Storage
	!function(){
		if (! document.cookie || window.localStorage === undefined) return;
		var drv = {
			store: function(key, value){
				try {
					localStorage[(value !== null && value !== undefined) ? 'setItem' : 'removeItem'](key, value);
				} catch (e) {
				}
			},
			retrieve: function(key){
				return localStorage.getItem(key);
			}
		};
		try {
			// Checking first if localStorage is available
			drv.store('', 1);
			drv.store('', null);
			sDrivers.push(drv);
		} catch (e) {
		}
	}();
	// Storage driver: Browser cookie
	sDrivers.push({
		store: function(key, value){
			// TODO Maybe check: if a value is too large, don't store it to cookie?
			// Cookies will live for two years by default
			var expires = new Date(Date.now() + ((value === null) ? -1 : 63072000000));
			$.setCookie(key, value, expires);
		},
		retrieve: function(key){
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + key.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : null;
		}
	});
	$.store = function(key, value){
		if (value !== null) value = $.stringify(value);
		for (var i = 0; i < sDrivers.length; i++){
			sDrivers[i].store($.storagePrefix + key, value);
		}
	};
	$.retrieve = function(key, def){
		var result = null;
		for (var i = 0; i < sDrivers.length && !result; i++){
			try {
				result = JSON.parse(sDrivers[i].retrieve($.storagePrefix + key));
			} catch (e) {
			}
		}
		if (result === null && def !== undefined) result = def;
		return result;
	};
	$.getCookie = function(key, def){
		var result = null;
		for (var i = 0; i < sDrivers.length && !result; i++){
			try {
				result = sDrivers[i].retrieve(key);
			} catch (e) {
			}
		}
		if (result === null && def !== undefined) result = def;
		return result;
	};
	/**
	 * @param {*} key
	 * @param {*} value
	 * @param {Date} expires
	 */
	$.setCookie = function(key, value, expires){
		var cookie = key + '=' + value;
		if (expires){
			cookie = cookie + '; expires=' + expires.toGMTString();
		}
		document.cookie = cookie + '; path=/; secure; samesite=none';
	};
	/**
	 * Other methods
	 */
	$.safeEval = function(code){
		try {
			window.eval(code);
		} catch (e) {
			console.error(e);
		}
	};
	/**
	 * Merge two or more objects together.
	 * first params {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
	 * next params {Object}   objects  The objects to merge together
	 *
	 * @returns {Object}          Merged values of defaults and options
	 */
	$.extend = function(){
		// Variables
		var extended = {};
		var deep = false;
		var i = 0;
		var length = arguments.length;

		// Check if a deep merge
		if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]'){
			deep = arguments[0];
			i++;
		}

		// Merge the object into the extended object
		var merge = function(obj){
			for (var prop in obj){
				if (Object.prototype.hasOwnProperty.call(obj, prop)){
					// If deep merge and property is an object, merge properties
					if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]'){
						extended[prop] = $.extend(true, extended[prop], obj[prop]);
					} else {
						extended[prop] = obj[prop];
					}
				}
			}
		};

		// Loop through each object and conduct a merge
		for (; i < length; i++){
			var obj = arguments[i];
			merge(obj);
		}

		return extended;
	};

	/**
	 * Returns array without an item
	 * @param {Array} arr
	 * @param {*} item
	 * @returns {Array}
	 */
	$.removeItem = function(arr, item){
		return arr.filter(function(val){
			// noinspection EqualityComparisonWithCoercionJS
			return val != item;
		});
	};

	// Prototype-safe JSON.stringify
	$.stringify = function(o){
		if (Array.prototype.toJSON){
			console.warn("Overriding Array.prototype.toJSON");
			var result;
			var tmp = Array.prototype.toJSON;
			delete Array.prototype.toJSON;
			result = JSON.stringify(o);
			Array.prototype.toJSON = tmp;
			return result;
		}
		return JSON.stringify(o);
	};

	// Fire several events once
	$.debounce = function(func){
		var wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

		var timeout = void 0;
		return function(){
			var _this = this;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++){
				args[_key] = arguments[_key];
			}

			clearTimeout(timeout);
			timeout = setTimeout(function(){
				func.apply(_this, args);
			}, wait);
		};
	};

	// Get element coords according to page
	$.getCoords = function getCoords(elem) {
		// (1)
		var box = elem.getBoundingClientRect();

		var body = document.body;
		var docEl = document.documentElement;

		// (2)
		var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
		var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

		// (3)
		var clientTop = docEl.clientTop || body.clientTop || 0;
		var clientLeft = docEl.clientLeft || body.clientLeft || 0;

		// (4)
		var top = box.top + scrollTop - clientTop;
		var left = box.left + scrollLeft - clientLeft;

		return {
			top: top,
			left: left,
			height: elem.offsetHeight
		};
	}

	// Commonly used elements
	var initDom = function(){
		$.$document = $(document);
		$.$window = $(window);
		$.$head = $(document.head);
		$.$html = $(document.documentElement);
		$.$body = $(document.body);
		$.$tmp = $(document.createElement('div'));
	};
	$.isReady ? initDom() : readyList.push(initDom);
}();
/**
 * Convertful.js Main Code
 */
window.Convertful = function($){
	var now = function(){
		return Math.floor(Date.now() / 1000);
	};
	var cn = {
		/**
		 * Detect Platform
		 * @return String
		 */
		getPlatform: function(){
			var userAgent = navigator.userAgent;
			if (window.orientation !== undefined || (userAgent.indexOf('IEMobile') !== -1)){
				if (/Android/i.test(userAgent)){
					return (/Mobile/i.test(userAgent)) ? 'mobile' : 'tablet';
				}
				return (/ipad|playbook|silk/i.test(userAgent)) ? 'tablet' : 'mobile';
			}
			if (/Nintendo|PLAYSTATION|Xbox/i.test(userAgent)) return 'console';
			if (!window.orientation && !('ontouchstart' in window || 'onmsgesturechange' in window)) return 'desktop';
			if (userAgent.indexOf('Edge') !== -1) return 'desktop';
			return 'unknown';
		},
		/**
		 * Get the URL parameters
		 * @param  {String|undefined} url The URL
		 * @return {Object}     The URL parameters
		 */
		getUrlQueries: function (url) {
			if (!url)
				url = window.location;
			var params = {};
			var parser = document.createElement('a');
			parser.href = url;
			var query = parser.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				params[pair[0]] = decodeURIComponent(pair[1]);
			}
			return params;
		},
		/**
		 * Detect URL Get Parameter
		 * @param key string urlGet:param
		 * @param url string
		 * @return String
		 */
		getUrlQuery: function(key, url){
			var re = /[?&]?([^=]+)=([^&]*)/g,
				pairs, qIndex;

			if (!url)
				url = location.search;

			qIndex = url.indexOf('?');
			if (qIndex)
				url = url.substring(qIndex + 1);

			while ((pairs = re.exec(url))) {
				if (key === decodeURIComponent(pairs[1]))
					return decodeURIComponent(pairs[2].replace(/\+/g, ' '));
			}
			return '';
		},
		/**
		 * Detect source type by referrer URL
		 * @param r string Referral
		 * @return Array
		 */
		getRef: function(r){
			if (r === '') return ['direct'];
			var domain = r.split('/')[2].replace(/^www\./, ''),
				host = location.host.replace(/^www\./, '');
			if (domain === host) return ['internal'];
			var ppc = ['utm_source=bing', 'gclid=', 'utm_medium=cpc', 'utm_medium=paid-media', 'utm_medium=ppc', 'aclk?', 'cid='];
			if (r.search(/\bgoogle\..*\?.*adurl=http/) !== -1) return ['ppc'];
			for (var i = 0; i < ppc.length; i++){
				if (r.split('?').slice(1).join('?').indexOf(ppc[i]) !== -1 || location.search.indexOf(ppc[i]) !== -1) return ['ppc'];
			}
			if (r.split('?').slice(1).join('?').indexOf('utm_medium=email') !== -1 || location.search.indexOf('utm_medium=email') !== -1){
				return ['email'];
			}
			var socialNetworks = {
				'facebook': ['facebook.com', 'fb.me'],
				'pinterest': ['pinterest.com'],
				'twitter': ['twitter.com', 't.co'],
				'linkedin': ['linkedin.com'],
				'googleplus': ['plus.google.com', 'plus.url.google.com']
			};
			for (var sn in socialNetworks){
				if (socialNetworks.hasOwnProperty(sn)){
					for (i = 0; i < socialNetworks[sn].length; i++){
						if (domain.replace(socialNetworks[sn][i], '#').split('.').indexOf('#') !== -1) return ['social', sn];
					}
				}
			}
			var searchEngines = {
				'google': [['google']],
				'bing': [['bing'], ['q']],
				'yahoo': [['search.yahoo', 'm.yahoo', 'm2.yahoo']],
				'baidu': [['baidu'], ['wd', 'word']],
				'yandex': [['yandex', 'ya.ru'], ['text']],
				'socom': [['so.com'], ['q']],
				'360cn': [['360.cn'], ['q']],
				'360sou': [['360sou'], ['q']],
				'aol': [['aol'], ['query', 'q']],
				'duckduckgo': [['duckduckgo']],
				'askcom': [['ask.com'], ['q', 'QUERYT']],
				'mailru': [['mail.ru'], ['words']],
				'sogou': [['sogou'], ['q', 'query']]
			};
			for (var se in searchEngines){
				if (searchEngines.hasOwnProperty(se)){
					var domainMatch = (new RegExp('(\\\.|^)(' + searchEngines[se][0].join('|').replace(/\./g, '\\\.') + ')(\\\.|$)')).test(domain),
						queryMatch = (searchEngines[se].length < 2 || (new RegExp('(\\\?|&)(' + searchEngines[se][1].join('|') + ')\=')).test(r));
					if (domainMatch && queryMatch) return ['organic', se];
				}
			}
			return ['external'];
		},

		/**
		 * Reorder and prepare lastEvents for checkRule
		 * @return Object
		 */
		getWidgetEvents: function(ev){
			var lastEvents = $.retrieve('lastEvents', {}),
				result = {};
			$.each(lastEvents, function(k, v){
				if (v[ev]) result[k] = true;
			});
			return result;
		},
		/**
		 * Stores latest events moments as id: [impression, close, conversion]
		 * @param id
		 * @param type
		 * @param value
		 */
		storeWidgetEvent: function(id, type, value){
			var index = (type === 'close') ? 1 : ((type === 'conversion') ? 2 : 0),
				lastEvents = $.retrieve('lastEvents', {});
			id = +id;
			if (typeof lastEvents[id] === 'string'){
				lastEvents[id] = JSON.parse(lastEvents[id]) || []
			}
			lastEvents[id] = lastEvents[id] || [];
			for (var i = 0; i <= index; i++) lastEvents[id][i] = lastEvents[id][i] || 0;
			lastEvents[id][index] = value;
			$.store('lastEvents', lastEvents);

			if (type === 'conversion')
				cn.trigger('conversion', [id])
		}
	};

	// Convertful Events API
	var events = {};
	cn.on = function(event, fn){
		if (events[event] === undefined) events[event] = [];
		events[event].push(fn);
		return this;
	};
	cn.off = function(event, fn){
		if (events[event] instanceof Array && fn !== undefined){
			var pos = events[event].indexOf(fn);
			if (pos !== -1) events[event].splice(pos, 1);
		} else delete events[event];
		return cn;
	};
	cn.one = function(event, fn){
		var fnWrapper = function(){
			fn.apply(cn, arguments);
			cn.off(event, fnWrapper);
		};
		return cn.on(event, fnWrapper);
	};
	cn.trigger = function(h, params){
		if (events[h] instanceof Array){
			var index = events[h].length - 1;

			// DO not use forEach loop because events[h] can be changed in events[h][index].apply and it will drop some indexes
			while (index >= 0) {
				if (events[h][index] && typeof events[h][index] === "function"){
					events[h][index].apply(cn, params);
				}
				index -= 1;
			}
		}
		return cn;
	};
	cn.getElmType = function(id){
		return id.match(/([a-z_]+)(\d?)/)[1];
	};
	cn.requestAnimationFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(callback){
				window.setTimeout(callback, 1000 / 60, true);
			};
	})().bind(window);

	var showIfLogic = {
		values: {},
		// Which rules may affect which widgets ruleId => widgetId
		affects: {},
		// Storing events functions (fn.bind()) so we could unbind them in future
		_bound: {},
		// List of widgets ids that cannot be detached
		permanent: [],
		attach: function(id, rule){
			// Complex and / or statement
			if (rule[0] instanceof Array){
				for (var i = 0; i < rule.length; i += 2)
					this.attach(id, rule[i]);
				return;
			}
			// Simple statement
			var key = rule[0],
				isFirst = (this.affects[key] === undefined),
				loadTime = now(),
				// To execute regular expressions
				matches;
			if (typeof key !== 'string')
				return;
			if (isFirst)
				this.affects[key] = [];

			if (this.affects[key].indexOf(id) === -1)
				this.affects[key].push(id);

			if (isFirst){
				// showIf: Time on Page
				if (key === 'timeOnPage'){
					this.pageTimer = setInterval(function(){
						this.set(key, now() - loadTime);
					}.bind(this), 1000);
					// Initial call to show instantly when time on page is "at least 0 seconds"
					this.set(key, 0);
				}
				// showIf: inactivity Time
				else if (key === 'inactivityTime'){
					var inactivity = 0,
						inactivityFn = function(){
							inactivity++;
							this.set(key, inactivity);
						}.bind(this);
					this.pageInactivityTimer = setInterval(inactivityFn, 1000);

					$.$window.on('mousemove scroll orientationchange keydown', this._bound.inactivity = function(){
						clearInterval(this.pageInactivityTimer);
						inactivity = 0;
						this.pageInactivityTimer = setInterval(inactivityFn, 1000);
					}.bind(this));
					// Initial call to show instantly when inactivity on page is "0 seconds"
					this.set(key, inactivity);
				}
				// showIf: Time on Site
				else if (key === 'timeOnSite'){
					this.siteTimer = setInterval(function(){
						this.set(key, (now() - cn.session().start));
					}.bind(this), 1000);
					this.set(key, (now() - cn.session().start));
				} else if (key === 'wasShown'){
					this.set(key, cn.getWidgetEvents(0));
					cn.on('afterShow', function(){
						this.set(key, cn.getWidgetEvents(0));
					}.bind(this));
				} else if (key === 'wasClosed'){
					this.set(key, cn.getWidgetEvents(1));
					cn.on('close', function(){
						this.set(key, cn.getWidgetEvents(1));
					}.bind(this));
				} else if (key === 'wasSubmitted'){
					this.set(key, cn.getWidgetEvents(2));
					cn.on('submit', function(){
						this.set(key, cn.getWidgetEvents(2));
					}.bind(this));
				}
				// TODO Rename to wasConverted
				else if (key === 'wasConvertedBeforeReload'){
					this.set(key, []);
					cn.on('conversion', function(id){
						var conversions = this.values['wasConvertedBeforeReload'] || [];
						conversions.push('' + id);
						this.set(key, conversions);
					}.bind(this));
				}
				// showIf: User Intents to Leave
				else if (key === 'leaveIntent'){
					var prevY = 0,
						aboutToLeave = false;
					$.$body.on('mousemove', this._bound.bodymove = function(e){
						// "<=" is needed for the proper Safari support
						aboutToLeave = (e.screenY < 200 && e.screenY <= prevY);
						prevY = e.screenY;
					}.bind(this));
					$.$body.on('mouseleave', this._bound.bodyleave = function(){
						if (aboutToLeave) this.setEvent(key);
					}.bind(this));
				}
				// showIf: Clicked an Element
				else if (key.substr(0, 8) === 'clicked:'){
					var selector = key.substr(8),
						clickFn = function(e){
							// prevent adding hashes or navigating away another way except form submitting
							if (e.target.type !== 'submit')
								e.preventDefault();

							if (!this.affects[key])
								return $.$body.off('click', selector, clickFn);
							this.setEvent(key);
						}.bind(this);
					$.$body.on('click', selector, clickFn);
					if (this.permanent.indexOf(key) === -1)
						this.permanent.push(key);
				}
				// showIf: triggered function
				else if (key.substr(0, 10) === 'triggered:'){
					var customEvents = $.retrieve('customEvents', {});
					this.set(key, customEvents[key] || false);

					cn.on(rule[3], function(){
						cevents.setEvent(key);
					}.bind(this));

					if (this.permanent.indexOf(key) === -1)
						this.permanent.push(key);
				}
				// showIf: Scroll in Percents
				else if (key === 'scrollPc'){
					this._bound.scrollPc = function(){
						this.set(key,
							(window.pageYOffset || document.body.scrollTop)
							/ ((document.body.scrollHeight || document.body.offsetHeight) - window.innerHeight)
							* 100
						);
					}.bind(this);

					$.$window.on('scroll', this._bound.scrollPc);
					$.$window.on('touchmove', this._bound.scrollPc);

					this._bound.scrollPc();
				}
				// showIf: Scroll Absolute Value
				else if (key === 'scrollPx'){
					this._bound.scrollPx = function(){
						this.set(key, window.pageYOffset || document.body.scrollTop);
					}.bind(this);
					$.$window.on('scroll', this._bound.scrollPx);
					$.$window.on('touchmove', this._bound.scrollPx);
					this._bound.scrollPx();
				}
				// showIf: Current or session start relative/absolute url
				else if (key === 'relativeUrl' || key === 'absoluteUrl' || key === 'relativeStartUrl' || key === 'absoluteStartUrl'){
					var isStartKey = (key.substr(-8, 5) === 'Start'),
						onHistoryChange = function (isStartKey) {
							var url = (isStartKey ? cn.session().startUrl : location.href);
							if (key[0] === 'r')
								url = url.replace(/^(?:\/\/|[^\/]+)*/, '');
							url = url.replace(/#$/, '');

							// decodeURI is required for unicode URL parts
							this.set(key, decodeURI(url));
						}.bind(this, isStartKey);

					// For start keys set var only once
					// for mutable URLs add callback for state
					if (! isStartKey)
						window.onpopstate = history.onpushstate = onHistoryChange;

					onHistoryChange();
				}
				// showIf: Widgets shown in session / on page
				else if (key === 'sessionImpressions' || key === 'pageImpressions'){
					var pageImpressions = [],
						updateImpressions = function(id){
							if (id && pageImpressions.indexOf(id) === -1 && (cn.widgets[id] || {}).isObstacle === 1)
								pageImpressions.push(id);
							this.set('sessionImpressions', cn.session().shown);
							this.set('pageImpressions', pageImpressions);
						}.bind(this);
					cn.on('afterShow', updateImpressions);
					cn.on('widgetAffected', updateImpressions);
					updateImpressions();
				} else if (key === 'firstRefUrl'){
					this.set(key, cn.session().referrer);
				} else if (key === 'lastRefUrl'){
					this.set(key, document.referrer);
				} else if (key === 'ref'){
					this.set(key, cn.getRef(cn.session().referrer));
				} else if (key === 'pageViews'){
					this.set(key, cn.session().pageViews);
				} else if (key === 'visitNum'){
					this.set(key, cn.personGet('$visitNum'));
				} else if (key === 'timeFromFv'){
					this.set(key, (now() - cn.personGet('$fvDate')));
				} else if (key === 'timeFromLv' && cn.personGet('$lvDate')){
					this.set(key, (now() - cn.personGet('$lvDate')));
				} else if (key === 'lvDate' && cn.personGet('$lvDate')){
					this.set(key, new Date(1000 * cn.personGet('$lvDate')).toISOString().substr(0, 10));
				} else if (key.indexOf('urlGet') === 0){
					this.set(key, cn.getUrlQuery(key.split(':')[1]));
				}
				// showIf: Current date
				else if (key === 'date'){
					this.set(key, new Date(new Date().getTime() + rule[3] * 3600 * 1000).toISOString().substr(0, 10));
				} else if (key.indexOf('cookie') === 0){
					this.cookieTimer = setInterval(function(){
						this.set(key, $.getCookie(key.split(':')[1]));
					}.bind(this), 1000);
					this.set(key, $.getCookie(key.split(':')[1]));
				}
				// showIf: screenWidth
				else if (key === 'screenWidth'){
					$.$window.on('resize', function(){
						this.set(key, window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
					}.bind(this));
					this.set(key, window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
				} else if (key === 'platform'){
					this.set(key, cn.getPlatform());
				} else if (key.indexOf('platformVar:') === 0){
					var platformVarName = key.split(':')[1];
					// window.convPlatformVars - stored in WP plugin
					this.set(key, (window.convPlatformVars || [])[platformVarName] || []);
				}
					// Don't show if rules
				// timeFromImpression:<id> / timeFromClose:<id> / timeFromConversion:<id>
				else if (matches = /^timeFrom(Impression|Close|Conversion):([0-9]+)$/.exec(key)){
					// At the moment storing true/false permanently without binding to a timer
					var eventsTimes = $.retrieve('lastEvents', {})[matches[2]] || [],
						eventCode = ['impression', 'close', 'conversion'].indexOf(matches[1].toLowerCase());
					//fix for overloaded functions
					if (typeof eventsTimes === 'string'){
						eventsTimes = JSON.parse(eventsTimes) || []
					}
					// If event hasn't happened at all, for simplicity we're counting time from zero-timestamp, which fits the condition
					this.set(key, now() - (eventsTimes[eventCode] || 0));

					if (matches[1] === 'Close'){
						cn.on('close', function(id){
							// if close widget set time from close one second
							this.set('timeFromClose:' + id, 1);
						}.bind(this));
					}
				} else if (key.indexOf('personParam') === 0){
					this.set(key, cn.personGet(key.split(':')[1]));
				} else if (key.indexOf('countdownTime') === 0){
					var endActionEndTime,
						widgetID = rule[4] || id,
						countdown = cn.personGet('$countdowns', {})[widgetID];
					if (rule[3] < 1000000000){
						// countdown relative time
						if (!countdown)
							endActionEndTime = rule[3];
						else if ((countdown.end + countdown.reset) < now())
							endActionEndTime = rule[3];
						else
							endActionEndTime = countdown.end - now();
					} else {
						// countdown absolute time
						endActionEndTime = parseInt(rule[3]) - now();
					}
					this.set(key, endActionEndTime);
				} else if (key === 'obstacleShown'){
					var updateObstacleShown = function(){
						this.set(key, cn.shownObstacles.length > 0);
					}.bind(this);
					cn.on('beforeShow', updateObstacleShown);
					cn.on('afterHide', updateObstacleShown);
					cn.on('widgetAffected', updateObstacleShown);
					updateObstacleShown();
				} else if (key === 'countryID' || key === 'regionID' || key === 'cityID'){
					var geoCookie = $.getCookie('conv_geoip'), // ip,country,region,city
						geoIndex = (key === 'countryID') ? 1 : ((key === 'regionID') ? 2 : 3);

					if (geoCookie)
						this.set(key, geoCookie.split(',')[geoIndex]);
					else
						this.set(key, 0);
				} else if (key.substr(0, 4) === 'fab:'){
					this.set(key, false);
					if (this.permanent.indexOf(key) === -1)
						this.permanent.push(key);
					cn.on('afterHide', this._bound.fab = function(id){
						if (si.checkFabRules(id))
							cn.showFab(id);
					});
				}
			}
		},
		detach: function(id, force){
			$.each(this.affects, function(key, affects){
				if (affects.indexOf(id) === -1)
					return;
				if (!force && (this.permanent.indexOf(key) !== -1))
					return true; // don't remove permanent events, return true - don't stop the loop

				affects.splice(affects.indexOf(id), 1);
				if (affects.length === 0){
					delete this.affects[key];
					// Unbinding events
					if (key === 'timeOnPage') clearInterval(this.pageTimer);
					else if (key === 'inactivityTime'){
						clearInterval(this.pageInactivityTimer);
						$.$window.off('mousemove scroll orientationchange keydown', this._bound.inactivity);
					} else if (key === 'timeOnSite') clearInterval(this._bound.siteTimer);
					else if (key.indexOf('cookie') === 0) clearInterval(this.cookieTimer);
					else if (key === 'leaveIntent') $.$body.off('mousemove', this._bound.bodymove).off('mouseleave', this._bound.bodyleave);
					else if (key === 'scrollPc' || key === 'scrollPx') $.$window.off('scroll', this._bound[key]);
				}
			}.bind(this));
		},
		/**
		 * Set showIf value
		 * @param key string
		 * @param value mixed
		 * @param onShow function Callback function to execute if a widget is shown
		 */
		set: function(key, value, onShow){
			if (value === this.values[key])
				return;
			this.values[key] = value;
			cn.requestAnimationFrame(this._render.bind(this, key, value, onShow));
		},
		_render: function(key, value, onShow){
		},
		/**
		 * Trigger showIf event value
		 * @param key string
		 */
		setEvent: function(key){
			this.set(key, true, function(shownId){
				var matches = /^clicked:a\[href\*="(#[^"\]]+)"]$/.exec(key);
				if (!matches) return;
				var newHash = matches[1],
					oldHash = location.hash;
				if (oldHash === newHash) oldHash = '';
				location = newHash;
				var beforeHideFn = function(hiddenId){
					if (hiddenId != shownId) return;
					history.replaceState(null, '', location.pathname + location.search + oldHash);
					cn.off('beforeHide', beforeHideFn);
				};
				cn.on('beforeHide', beforeHideFn);
			});
			setTimeout(this.set.bind(this, key, false), 100);
		},
		checkRule: function(rule){
			var result = this._checkRule(rule);
			// TODO Use debug with a special panel
			if (cn.debug)
				console.debug(rule, result);
			return result;
		},
		_checkRule: function(rule){
			if (rule[0] instanceof Array){
				// Complex or / and statement
				var result = this.checkRule(rule[0]);
				for (var i = 2; i < rule.length; i += 2){
					var subResult = this.checkRule(rule[i]);
					switch (rule[i - 1]) {
						case 'and':
							result = result && subResult;
							break;
						case 'and_not':
							result = result && !subResult;
							break;
						case 'or':
							result = result || subResult;
					}
				}
				return result;
			}

			// IF we pass just boolean value (need for and_not values)
			if (typeof rule[0] === 'boolean'){
				return rule[0];
			}
			// Simple statements
			var value = this.values[rule[0]];
			if (value === undefined)
				return false;
			switch (rule[1]) {
				case '=':
					// Check without type comparison if value is not null
					// noinspection EqualityComparisonWithCoercionJS
					return rule[2] === ""
						? value === null || (typeof value !== 'string' && value.length === 0)
						: value == rule[2];
				case '!=':
					// Check without type comparison if value is not null
					// noinspection EqualityComparisonWithCoercionJS
					return rule[2] === ""
						? value !== null || (typeof value !== 'string' && value.length !== 0)
						: value != rule[2];
				case '<':
					return (value < rule[2]);
				case '<=':
					return (value <= rule[2]);
				case '>':
					return (value > rule[2]);
				case '>=':
					return (value >= rule[2]);
				case '!~=':
					return (!value) ||
						(value.indexOf && value.indexOf(rule[2]) === -1)
						|| (typeof value === 'object' && !Array.isArray(value) && value[rule[2]] === undefined);// fix for typeof [] === 'object'
				case '~=':
					return value && (
						(value.indexOf && value.indexOf(rule[2]) !== -1)
						|| (typeof value === 'object' && value[rule[2]] !== undefined)
					);
				default:
					return false;
			}
		}
	};

	// Convertful.js showIf rules handler
	var si = cn.si = {
		_render: function(key, value, onShow){
			var affected = this.affects[key];
			if (!affected) return;
			for (var i = 0; i < affected.length; i++){
				var id = affected[i],
					widget = cn.widgets[id];

				if (this.checkWidgetRules(id)){
					if (cn.show(id)){
						cn.hideFab(id);

						if (!widget.isInstant)
							this.detach(id);
						if (onShow instanceof Function)
							onShow(id);
						cn.trigger('widgetAffected', [id]);
					}
				} else if (widget.isInstant && cn.$widgets[id] && key !== 'personParam:$UID'){
					// if is instant widget, and it already show, and changed param not a widget UID then
					cn.hide(id);
				}
				// Float action button rules
				else if (this.checkFabRules(id)){
					cn.showFab(id);
				} else {
					cn.hideFab(id);
				}
			}
		},
		checkWidgetRules: function(widgetID){
			var widget = cn.widgets[widgetID];
			return !!(widget && (!widget.showIf.length || this.checkRule(widget.showIf)));
		},
		checkFabRules: function(widgetID){
			var widget = cn.widgets[widgetID];
			var rules = widget.fabShowIf || [];
			return !!(widget && (!rules.length || this.checkRule(rules)));
		},
		// Leave this functions for backward compatibility with clients sites
		getPlatform: cn.getPlatform,
		getRef: cn.getRef,
		getUrlQuery: cn.getUrlQuery,
		getWidgetEvents: cn.getWidgetEvents,

	};
	cn.si.__proto__ = showIfLogic;

	// Convertful.js
	var cevents = cn.cevents = {
		rules: {},
		affects: [], // Which rules may affect which widgets ruleId => widgetId
		set: function(key, value, quite){
			if (!isNaN(key)) // if key is number
				key = 'triggered:' + key;
			this.values[key] = value;
			var customEvents = $.retrieve('customEvents', {});
			var affected = this.affects[key] || [];

			for (var i = 0; i < affected.length; i++){
				var id = affected[i],
					rules = this.rules[id],
					eventName;

				if (this.checkRule(rules)){
					eventName = 'triggered:' + id;
					si.values[eventName] = true;
					si._render(eventName, true);

					if (value && !customEvents[eventName]){
						customEvents[eventName] = true;
						$.store('customEvents', customEvents);

						if (!quite)
							this._trackEvent(id);
					}
				}
			}
		},

		/**
		 * Send track API query to server
		 * @private
		 */
		_trackEvent: function(id){
			var subscriber_uid = cn.personGet('$UID');

			if (subscriber_uid){
				// send query and finish
				$.post(cn.ajaxUrl + '/api/custom_event/track/' + id, {
					site_id: cn.siteId,
					subscriber_uid: subscriber_uid
				});

				return;
			}

			// if we are here, then store data until next datapost
			var prevEvents = $.retrieve('prevEvents', []);
			// remove already stored events with same ids
			prevEvents = prevEvents.filter(function(event){
				return event.site_event_id !== id;
			});
			prevEvents.push({
				site_event_id: id,
				date: now()
			});
			$.store('prevEvents', prevEvents);
		},

		/**
		 * Trigger showIf event value
		 * @param key string
		 * @param quite boolean
		 */
		setEvent: function(key, quite){
			this.set(key, true, quite);
		}
	};
	cn.cevents.__proto__ = showIfLogic;

	// Convertful.js AB Tests handler
	var ab = cn.ab = {
		/**
		 * IDs of the widgets that can be shown in the current session
		 */
		ids: [],
		/**
		 * id => array of all variations
		 */
		vars: {},
		/**
		 * @param widgets Array /api/widget/export data
		 */
		init: function(widgets){
			var ids = [];
			widgets.forEach(function(widget){
				var id = +widget.id,
					pid = +widget.varOf;
				if (!!pid) (ab.vars[id] = ab.vars[pid] = ab.vars[pid] || [pid]).push(id);
				ids.push(id);
			});

			// Getting choices for all variations group
			// Choices cannot contain inactive widgets to prevent collisions
			var session = cn.session(),
				choices = session.ab = (session.ab || []).filter(function(v){
					return ids.indexOf(v) !== -1;
				});
			// Choosing variations to show and keeping them within a session
			$.each(ab.vars, function(id, vars){
				if (ids.indexOf(+id) === -1) return;
				for (var i = 0; i < vars.length; i++){
					if (ids.indexOf(vars[i]) === -1) vars.splice(i, 1);
					if (choices.indexOf(vars[i]) !== -1) return;
				}
				choices.push(vars[Math.floor(Math.random() * vars.length)]);
			});
			if (choices.length > 0) cn.session(session);
			ab.ids = ids.filter(function(v){
				return (!ab.vars[v] || choices.indexOf(v) !== -1);
			});
		},
		/**
		 * Check if the widget can be shown in the current session
		 * @param id Number
		 * @return Boolean
		 */
		canBeShown: function(id){
			return ab.ids.indexOf(id) !== -1;
		},
		/**
		 * Get other widget variations
		 * @param id Number
		 */
		getVarsOf: function(id){
			return ab.vars[id] || [id];
		}
	};

	// Convertful.js Core Methods
	cn.activeWidgets = [];
	cn.$widgets = {};
	cn.$containers = {};
	cn.$overlays = {};
	cn.$styles = {};
	cn._loadedFonts = {};
	cn.$scripts = {};
	// Flag about finishing loading external js
	cn._externalJsLoaded = true;
	cn.shownObstacles = [];
	cn.socsignEvents = {};
	cn.waypoints = [];
	cn.currentState = 'desktop';
	cn.lastClickedElement = null;
	cn.countdownAnimations = [];
	cn.activeFabs = [];
	cn.$fabs = {};
	// Detect iOS for custom bugfixes
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	cn.isIOS = (ua.match(/iphone|ipod|ipad/i));
	cn.isFB = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
	cn.isReady = false;

	/**
	 * Handler for widget elements clicks
	 *
	 * @private
	 */
	cn._clickFunctions = {
		formSubmit: function(e){
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			if (!$currentTarget.is('.conv-btn.conv_action_submit')){
				// When submitting by Enter key, we need to make sure that the proper submit button is used for automations
				$currentTarget = $currentTarget.closest('.conv-screen').find('.conv-btn.conv_action_submit').first();
			}
			var widgetId = $currentTarget.closest('.conv-widget').attr('id').replace('conv', '');
			cn._maybeSubmitData(widgetId, $currentTarget.mod('conv_id'), cn._getWidgetActiveScreenData(widgetId));
		},

		btnClick: function(e){
			// not prevent event here, it needed for _blank hrefs
			var $item = $(e.currentTarget),
				action = $item.mod('conv_action'),
				id;

			cn.trackEvent($item);
			if (action === 'close'){
				id = +$item.closest('.conv-widget').attr('id').replace('conv', '');
				cn.storeWidgetEvent(id, 'close', now());
			} else if (action === 'link'){
				var link = $item.attr('href'),
					is_js = (link && link.indexOf('javascript:') === 0),
					inNewTab = ($item.attr('target') === '_blank');

				if (is_js){
					// execute js from link href
					$.safeEval(link.substr(11));
				} else if (!inNewTab){
					// delay for track_event connection
					e.preventDefault();
					setTimeout(function(){
						location = link;
					}, 500);
				}
			}
		},

		shareClick: function(e){
			e.preventDefault();
			var elm = cn.lastClickedElement = $(e.currentTarget).closest('.conv-share').elms[0];
			var widgetId = $(e.currentTarget).closest('.conv-widget').attr('id').replace('conv', '');
			var widget = cn.widgets[widgetId];
			if (cn.shareWindow !== undefined){
				widget.shareTimer = setInterval(function(){
					if (cn.shareWindow.window === null || cn.shareWindow.window.closed){
						clearInterval(widget.shareTimer);
						cn.lastClickedElement = elm;
						cn._shareCallback(e);
					}
				}.bind(this), 250);
			} else {
				cn._shareCallback(e);
			}
		},

		socsignClick: function(e){
			e.preventDefault();
			var $el = $(e.currentTarget),
				url = $el.attr('href');

			if (cn.isIOS && cn.isFB){
				url += '&prevUrl=' + location.href;
				$.store('convStoredData', cn._getWidgetActiveScreenData(id));
				$.store('convScroll', window.pageYOffset);
			}
			cn._openDialog(url, 'toolbar=no, width=600, height=600');
		},

		scratchClick: function(e){
			e.preventDefault();
			var $currentTarget = $(e.currentTarget);
			var widgetId = $currentTarget.closest('.conv-widget').attr('id').replace('conv', '');
			if (!$currentTarget.closest('.conv-scratch').hasClass('conv_active'))
				cn._maybeSubmitData(widgetId, $currentTarget.mod('conv_id'), cn._getWidgetActiveScreenData(widgetId));
		},
		close: function(id){
			cn.close(id);
		}
	};

	/**
	 * Initialize Floating action Button
	 *
	 * @param id
	 * @return {*|cQuery|HTMLElement}
	 * @private
	 */
	cn.showFab = function(id){
		var widget = cn.widgets[id];
		if (!widget['fab'] || cn.activeFabs.indexOf(id) !== -1 || cn.activeWidgets.indexOf(id) !== -1)
			return;

		var $container = cn.$containers[id] = cn.$containers[id] || $('<div class="conv-container"></div>');
		if (!cn.activeWidgets.length && !cn.activeFabs.length){
			$.$head.append(cn.$styles.general);
			$.$window.on('resize', cn._resize);
		}

		var $fab = $(widget['fab']);
		$container.append($fab);
		$container.appendTo($.$body);
		cn.activeFabs.push(id);

		cn.$fabs[id] = $fab;

		// Add widget styles to page
		$.each(widget.externalCss || [], function(_, href){
			cn._addStyle(href, id, 'fab');
		});

		$fab.one('click', function(){
			si.setEvent('fab:' + id);
		});

		return $fab;
	};

	/**
	 * Remove Floating Action Button
	 *
	 * @param id
	 * @private
	 */
	cn.hideFab = function(id){
		if (cn.activeFabs.indexOf(id) === -1)
			return;

		cn.activeFabs = $.removeItem(cn.activeFabs, id);
		if (cn.$fabs[id] !== undefined)
			cn.$fabs[id].remove();

		if (!cn.activeWidgets.length && !cn.activeFabs.length){
			cn.$styles.general.detach();
			$.$window.off('resize', cn._resize);
		}
		cn._removeStyle(id, 'fab');
	};

	/**
	 * Add  widget style to DOM
	 *
	 * @param css
	 * @param id
	 * @param postfix
	 * @private
	 */
	cn._addStyle = function(css, id, postfix){
		if (!css || !id)
			return;

		if (!postfix)
			postfix = '';

		var styles = [],
			$styles = cn.$styles[id] = cn.$styles[id] || new cQuery;

		if (/^https?:\//.test(css)){
			if (!cn._loadedFonts.hasOwnProperty(css)){
				// if font not yet loaded, add it to head
				var $elm = $('<link rel="stylesheet" class="conv-css-external conv_id_' + id + postfix + '" href="' + css + '" />');
				styles.push($elm);
				cn._loadedFonts[css] = $elm;
			} else {
				// if font already loaded, add conv_id_XXXX class to it
				styles.push(
					cn._loadedFonts[css].addClass('conv_id_' + id + postfix)
				);
			}
		} else {
			styles.push(
				$('<style type="text/css" class="conv-css conv_id_' + id + postfix + '">' + css + '</style>')
			);
		}

		// merging styles to one object
		$.each(styles, function(_, elm){
			if (elm.elms[0].parentElement === null) // IF style doesn't appended
				// then appending styles to head
				$.$head.append(elm.elms[0]);

			$styles.elms.push(elm.elms[0]);
		});
	};

	/**
	 * Remove widget style from DOM if it unused
	 * @param id
	 * @param postfix
	 * @private
	 */
	cn._removeStyle = function(id, postfix){
		(cn.$styles[id] || new cQuery).each(function(elm){
			var $elm = $(elm);
			if (!postfix)
				elm.className = elm.className.replace(/\bconv_id_.*?\b/g, '');
			else
				$elm.removeClass('conv_id_' + id + postfix);
			if (!/conv_id_/.test(elm.className)) // no other elements need this style
				$elm.remove();
		});
	};

	/**
	 *
	 * @param id
	 * @private
	 */
	cn._initWidget = function(id){
		var widget = cn.widgets[id];

		if (!cn.activeWidgets.length || !$.$head.find('link.conv_id_general').elms.length){
			$.$head.append(cn.$styles.general);
			$.$window.on('resize', cn._resize);
			if (cn.isIOS)
				$.$window.on('orientationchange', cn._orientationchange);
		}

		// Add widget styles to page
		$.each(widget.externalCss || [], function(_, href){
			cn._addStyle(href, id);
		});
		cn._addStyle(widget.css, id);

		// Add widget external scripts
		// NOTE: Adding SCRIPT to DOM through cQuery does not force the browser to connect it correctly.
		var countExternalJs = (widget.externalJs || []).length,
			countLoadedExternalJs = 0;
		if (cn.$scripts[id] === undefined){
			cn.$scripts[id] = new cQuery;
			var _scriptLoaded = function(){
				countLoadedExternalJs++;
				if (countLoadedExternalJs >= countExternalJs){
					cn.trigger('externalJsLoaded', [id]);
					cn._externalJsLoaded = true;
				}
			};
			$.each(widget.externalJs || [], function(_, src){
				var script = document.createElement('script');
				if (script.readyState && !script.onload){
					// IE, Opera
					script.onreadystatechange = function(){
						if (script.readyState === 'loaded' || script.readyState === 'complete'){
							script.onreadystatechange = null;
							_scriptLoaded();
						}
					}
				} else {
					script.onload = _scriptLoaded;
				}
				cn._externalJsLoaded = false;
				script.src = src;
				script.type = 'text/javascript';
				cn.$scripts[id].elms.push(document.body.appendChild(script));
			});
		}

		// Fix resize bug
		if (cn.isIOS)
			widget.iosH = window.innerHeight;
	};

	cn.show = function(id){
		if (!cn.isReady || cn.widgets === undefined){
			//wait until Convertful is loaded and then show the widget
			cn.one('afterInit', function(id){
				cn.show(id);
			}.bind(this, id));
			return false;
		}

		if (cn.activeWidgets.indexOf(id) !== -1 || !cn.widgets[id] || cn.$widgets[id] !== undefined)
			return false;

		var widget = cn.widgets[id];
		var $container = cn.$containers[id] = $('<div class="conv-container"></div>');

		cn.hideFab(id);

		// Placing widget to its proper location
		var $place;
		if (widget.place && widget.place[1]){
			// if place selector filled
			// then place widgets to this selector
			$place = $(widget.place[1]).first();
			var appendAction = widget.place[0];
			if (!$place.elms.length && appendAction === 'replace'){
				// try to find already inserted widget
				// this happened if the user uses a visual builder and this builder work with pure HTML
				// in this case page already contains rendered widget
				$place = $.$body.find('.conv-widget[id="conv' + widget.id + '"]').parent();
			}
		} else {
			appendAction = 'appendTo';
			$place = $.$body;
		}

		// if we can not find place for appending widget then we should stop handle this widget
		if (!$place || !$place.elms.length)
			return false;

		// appending widget to HTML
		$container[appendAction]($place);
		cn._initWidget(id);

		// Mark widget as active
		cn.activeWidgets.push(id);
		if (widget.isObstacle){
			cn.shownObstacles.push(id);
		}

		// Preventing css glitches after appending styles
		// We should wait a little bit while fonts will be loaded
		setTimeout(function(){
			$container.mod('conv_state', cn.currentState).append($(widget.html));

			var $widget = cn.$widgets[id] = $container.find('.conv-widget'),
				$overlay = cn.$overlays[id] = $container.find('.conv-overlay'),
				$form = $widget.find('form'),
				$socsign = $widget.find('.conv-socsign-link'),
				$fbFollow = $widget.find('.conv-follow-item > div.fb-like'),
				$countdowns = $widget.find('.conv-countdown'),
				$scratchCards = $widget.find('.conv-scratch_card'),
				$spintowins = $widget.find('.conv-spintowin');

			// Closing rules for widgets
			$container.on('click', '.conv-closer, .conv-wrap-closer, .conv-btn.conv_action_close', function(e){
				e.preventDefault();
				cn.close(id);
			});
			if ($overlay.elms.length)
				$container.find('.conv-wrap').on('click', function(e){
					if ($(e.target).is('.conv-wrap')) cn.close(id);
				});

			// Save last clicked element
			$widget.on('click', function(e){
				cn.lastClickedElement = e.target;
			});

			// Handle clicks on elements
			$form
				.on('submit', cn._clickFunctions.formSubmit);
			$widget.find('.conv-btn.conv_action_submit')
				.on('click', cn._clickFunctions.formSubmit);
			$widget.find('.conv-btn:not(.conv_action_submit)')
				.on('click', cn._clickFunctions.btnClick);
			$widget.find('.conv-share-item')
				.on('click', cn._clickFunctions.shareClick);
			$socsign
				.on('click', cn._clickFunctions.socsignClick);
			$scratchCards
				.on('click', cn._clickFunctions.scratchClick);

			// remove errors on focus
			$form.find('.conv-form-field input, .conv-form-field select')
				.on('focus change', function(e){
					// Hiding errors on focus
					$(e.target).closest('.conv-form-field')
						.removeClass('conv_error')
						.find('.conv-form-field-message')
						.html('').css({display: 'none'});
				});

			// Auto increase size for multilines text
			$widget.find('textarea')
				.on('input change', function(){
					var el = this;
					el.style.height = 'auto';
					el.style.height = el.scrollHeight + 'px';
				});

			// disable contenteditable attr in shortcodes
			$widget.find('.conv_shortcode_value').each(function(item){
				$(item).attr('contenteditable', false);
			});

			// Add follow callbacks for facebook Like button
			if ($fbFollow.elms.length){
				// fix for what??
				if (window.FB && !$fbFollow.hasClass('fb_iframe_widget'))
					window.FB.XFBML.parse();
				widget.facebookTimer = setInterval(function(){
					var iframe = document.activeElement;
					if (iframe && iframe.tagName === 'IFRAME' && $(iframe).closest('div.fb-like').elms.length){
						clearInterval(widget.facebookTimer);
						setTimeout(function(){
							cn.lastClickedElement = $(iframe).closest('.conv-follow').elms[0];
							cn._followCallback();
						}, 5000);
					}
				}, 250);
			}

			// Add callbacks for socsign
			if ($socsign.elms.length){
				$.$window.on('message', cn.socsignEvents[id] = cn._socsignCallback);
			}

			// Replace shortcodes on main screen
			cn._maybeReplaceSubscriberVars($widget.find('.conv-screen.conv_active'), id);

			// Initialize External elements
			var _initGameElements = function(){
				// Countdown here
				if ($countdowns.elms.length){
					cn._initCountdowns($countdowns);
				}

				// Scratch Card element init
				if ($scratchCards.elms.length){
					cn._initScratchCards($scratchCards);
				}

				// SpinToWin element init
				if ($spintowins){
					cn._initSpinToWins($spintowins);
				}
			};

			if (!cn._externalJsLoaded)
				cn.on('externalJsLoaded', _initGameElements);
			else
				_initGameElements();

			cn.trigger('beforeShow', [id]);

			if (widget.isObstacle){
				// Handling floating widgets
				// animation frame need for widget's show animation
				// But animation frame can be executed before DOM node will be added
				//cn.requestAnimationFrame(function(){
				setTimeout(function(){
					$overlay.addClass('conv_active');
					$widget.addClass('conv_active');
					cn.addImpression(id);
				}, 100);
			} else {
				// Handling static widgets
				cn.addWaypoint($container, function(){
					$widget.addClass('conv_active');
					cn.addImpression(id);
				}.bind(cn, id));
			}

			if (widget.onshow_js)
				$.safeEval(widget.onshow_js);

			// Add class to body. It will help us to understand which widgets opened and how we should move body
			$.$body.addClass('conv_opened_' + id);

			if (widget.type === 'welcome'){
				widget.isScrollable = $widget.hasClass('conv_scrollable');
				widget._restoreScrollValue = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
				window.scroll(0, 0);

				if (widget.isScrollable){
					if (widget.isObstacle)
						cn.addWaypoint($container.find('.conv-widget-h'), cn.hide.bind(cn, id), 'onHide');
				} else {
					if (cn.isIOS){
						$.$body.addClass('conv_ios_fix');
						$.$html.addClass('conv_ios_fix');
					} else {
						$.$body.addClass('conv_welcome_fix');
					}

					if ($widget.find('.conv-widget-h').height() > window.innerHeight)
						$widget.addClass('conv_inner_scrolling');
				}
			}
			// For a large widget height, we implement an internal scroll
			else if (cn.getPlatform() === 'mobile' && widget.type !== 'inline' && $widget.find('.conv-widget-h').height() > window.innerHeight){
				widget._restoreScrollValue = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
				cn._addStyle('body.conv_opened_' + id + '{overflow-y:hidden!important; position: fixed!important;}', id, 'scroll_fix')
				cn.on('beforeHide', function(){
					// Reset body style and scroll
					if (widget._restoreScrollValue)
						$.scrollTo(widget._restoreScrollValue, 0);
					widget._restoreScrollValue = null;
				});
			} else if (widget.type === 'inline' && $widget.hasClass('conv_is_content_locker')){
				$container.attr('id', 'conv' + id + '_container');
			}
			// Setting utm_referrer parameter properly
			var $refLink = $widget.find('.conv-ref a'),
				refLink = $refLink.attr('href');
			if (refLink && refLink.indexOf('utm_') !== -1 && refLink.indexOf('utm_referrer') === -1)
				$refLink.attr('href', refLink + '&utm_referrer=' + encodeURIComponent(window.location));

			cn.trigger('show', [id]);
			cn.requestAnimationFrame(function(){
				// Fill widget with person data from URL
				$.each(cn.getUrlQueries(), function(key, value){
					if (! /^conv_/.test(key))
						return 0;

					key = key.replace(/^conv_/, '');
					var $input = $form.find('[name="'+key+'"]');
					if ( $input.elms[0] === undefined)
						return 0;

					switch ($input.attr('type') || $input.elms[0].tagName.toLowerCase()) {
						case 'radio':
							var checkedElm = $input.filter('[value="'+value+'"]');
							if (checkedElm.elms[0] !== undefined){
								checkedElm.elms[0].checked = true;
								break;
							}

							// we didn't find anu option by value, lets check it by label texts
							var labels = $form.elms[0].getElementsByTagName('LABEL');
							for (var i = 0; i < labels.length; i++) {
								if (labels[i].innerText === value){
									$input.filter('#'+labels[i].htmlFor).elms[0].checked = true;
									break;
								}
							}
							break;
						case 'checkbox':
							$input.elms[0].checked = true;
							break;
						case 'select':
							var $checkedOption = $input.find('[value="'+value+'"]');
							if ($checkedOption.elms[0] !== undefined){
								$input.val($checkedOption.val());
								break;
							}

							// we didn't find anu option by value, lets check it by option text
							$input.find('option').each(function(option){
								if (option.innerText !== value)
									return ;
								option.selected = true;
								return true;
							});
							break;
						case 'date':
							var ts = new Date(value);
							$input.val( ts.getFullYear() + "-" + (("0" + (ts.getMonth() + 1)).slice(-2)) + "-" + (("0" + ts.getDate()).slice(-2)) );
							break;
						default:
							$input.val(value);
					}
				});

				// Calling resize event to provide compatibility with 3-rd party scripts that depend on content position (scrollSpy ...)
				$.$window.trigger('resize');
				cn._resize();
			});
		}, 150);

		return true;
	};
	cn.addImpression = function(id){
		cn.sendStat(id);
		var session = cn.session();
		if (session.shown.indexOf(id) === -1)
			session.shown.push(id);
		cn.session(session);
		cn.trigger('afterShow', [id]);
	};
	cn.sendStat = function(id){
		var data = {
			widget_id: id,
			type: 'impression'
		};

		if (cn.personGet('$UID'))
			data.subscriber_uid = cn.personGet('$UID');

		cn.storeWidgetEvent(id, 'impression', now());
		return $.post(cn.ajaxUrl + '/api/widget/track_event', data);
	};
	cn.hide = function(id){
		var widget = cn.widgets[id];
		if (!id || !widget || !cn.$containers[id])
			return;
		cn.trigger('beforeHide', [id]);

		var afterHide = this._afterHide.bind(this, id);
		if (widget.type === 'welcome'){
			// Using first inner element with own height
			var widgetH = cn.$containers[id].find('.conv-widget-h').elms[0],
				bottom = widgetH.offsetTop + widgetH.offsetHeight;
			if (widget.isScrollable && bottom <= window.pageYOffset){
				// Instant hide
				var scrollPos = widget._restoreScrollValue  || window.pageYOffset - bottom;
				afterHide();
				$.scrollTo(scrollPos, 300);
			} else if (widget.isScrollable){
				// Animated hide, duration is based on a constant scroll speed
				$.scrollTo(widgetH.offsetHeight, parseInt((bottom - window.pageYOffset) / 4), function(){
					afterHide();
					window.scroll(0, 0);
				});
			} else {
				var $widgetH = cn.$containers[id].find('.conv-widget-h');
				$widgetH.css({position: 'fixed', transform: 'translateY(0%)'});
				if (widget._restoreScrollValue)
					$.scrollTo(widget._restoreScrollValue, 300);
				$widgetH.animate({transform: 'translateY(-100%)'}, parseInt((bottom - window.pageYOffset) / 4), 'ease', function(){
					afterHide();
				});
			}
			widget._restoreScrollValue = null;
		} else {
			// Animated hide with css-defined constant duration
			setTimeout(afterHide, 300);
		}

		if (cn.$widgets.hasOwnProperty(id)){
			cn.$widgets[id].removeClass('conv_active');
			cn.$overlays[id].removeClass('conv_active');
		}
		cn.activeWidgets = $.removeItem(cn.activeWidgets, id);
		cn.shownObstacles = $.removeItem(cn.shownObstacles, id);
	};

	/**
	 * Remove html and css staff after widget hide
	 * @param id
	 * @private
	 */
	cn._afterHide = function(id){
		var widget = cn.widgets[id];
		if (!id || !cn.$containers[id] || !widget)
			return;
		cn.$containers[id].remove();
		cn._removeStyle(id);

		if (cn.$scripts[id])
			cn.$scripts[id].remove();
		delete cn.$widgets[id];
		delete cn.$containers[id];
		delete cn.$overlays[id];
		delete cn.$scripts[id];

		if (cn.socsignEvents[id]){
			$.$window.off('message', cn.socsignEvents[id]);
			delete cn.socsignEvents[id];
		}
		if (!cn.activeWidgets.length && !cn.activeFabs.length){
			cn.$styles.general.detach();
			$.$window.off('resize', cn._resize);
			if (cn.isIOS) $.$window.on('orientationchange', cn._orientationchange);
		}
		// Calling resize event to provide compatibility with 3-rd party scripts that depend on content position (scrollSpy ...)
		if (widget.isInstant)
			$.$window.trigger('resize');
		if (widget.facebookTimer)
			clearInterval(widget.facebookTimer);
		if (widget.shareTimer)
			clearInterval(widget.shareTimer);
		if (cn.countdownAnimations.length && !$('.conv-countdown').elms.length){
			for (var animation_id in cn.countdownAnimations)
				if (cn.countdownAnimations.hasOwnProperty(animation_id))
					cancelAnimationFrame(cn.countdownAnimations[animation_id]);
		}
		cn.trigger('afterHide', [id]);
		$.$body.removeClass('conv_opened_' + id);
		$.$body.removeClass('conv_ios_fix');
		$.$html.removeClass('conv_ios_fix');
		$.$body.removeClass('conv_welcome_fix');
	};

	/**
	 * Add waypoint: a task to call function when an element is shown/hidden
	 * @param elm DOMElement
	 * @param fn Function Handler
	 * @param mode string 'onShow' / 'onHide'
	 */
	cn.addWaypoint = function(elm, fn, mode){
		cn.waypoints.push({
			elm: (elm instanceof cQuery) ? elm.elms[0] : elm,
			fn: fn,
			mode: mode || 'onShow'
		});
		if (cn.waypoints.length === 1) $.$window.on('scroll', cn._scroll);
		cn._resize();
	};

	/**
	 * Open dialog for Follow element
	 * @param elm
	 * @param uri
	 */
	cn.followDialog = function(elm, uri){
		var $btn = $(elm);
		cn._openDialog(uri, 'toolbar=no, width=650, height=600', function(){
			cn.lastClickedElement = $btn.closest('.conv-follow').elms[0];
			cn._followCallback()
		});
	};

	cn._openDialog = function(uri, options, closeCallback){
		var win = window.open(uri, null, options);
		if (closeCallback){
			var interval = window.setInterval(function(){
				try {
					if (win == null || win.closed){
						window.clearInterval(interval);
						closeCallback();
					}
				} catch (e) {
				}
			}, 500);
		}
		return win;
	};

	// TODO: move countdown to external library (like spin to win, or scratch_card)
	cn._initCountdowns = function($countdowns){
		var endsOn,
			id = $countdowns.closest('.conv-widget').attr('id').replace(/[^0-9]/g, ''),
			$countdownDays = $countdowns.find('.conv-countdown-time.conv_for_days > .conv-countdown-time-h'),
			$countdownHours = $countdowns.find('.conv-countdown-time.conv_for_hours > .conv-countdown-time-h'),
			$countdownMinutes = $countdowns.find('.conv-countdown-time.conv_for_minutes > .conv-countdown-time-h'),
			$countdownSeconds = $countdowns.find('.conv-countdown-time.conv_for_seconds > .conv-countdown-time-h'),
			prev,
			countdowns = cn.personGet('$countdowns', {}),
			updateClock = function(){
				if (prev === undefined || now() - prev >= 1){
					prev = now();
					var t = endsOn - now();
					var seconds = Math.floor(t % 60);
					var minutes = Math.floor((t / 60) % 60);
					var hours = Math.floor((t / (60 * 60)) % 24);
					var days = Math.floor(t / (60 * 60 * 24));
					if (t < 0){
						// the countdown has finished counting
						if (cn.countdownAnimations.length)
							cancelAnimationFrame(cn.countdownAnimations[id]);
						$countdowns.each(function(countdown){
							cn._countdownCallback($(countdown), id);
						});
						return;
					}

					$countdownDays.html(((days < 10) ? '0' : '') + days);
					$countdownHours.html(('0' + hours).slice(-2));
					$countdownMinutes.html(('0' + minutes).slice(-2));
					$countdownSeconds.html(('0' + seconds).slice(-2));
				}
				cn.countdownAnimations[id] = cn.requestAnimationFrame(updateClock)
			};

		if ($countdowns.data('ends_on')){
			endsOn = +$countdowns.data('ends_on');
			countdowns[id] = {};
		} else if ($countdowns.data('ends_after')){
			var parent = +$countdowns.data('parent'),
				endsAfter = +$countdowns.data('ends_after'),
				endsReset = +$countdowns.data('ends_reset'),
				sharedId = parent || id,
				resetCountdown = function(){
					endsOn = endsAfter + now();
					countdowns[sharedId] = {end: endsOn, orig: endsAfter, reset: endsReset};
				};
			if (countdowns[sharedId]){
				endsOn = countdowns[sharedId].end;
				if ((+countdowns[sharedId].orig !== endsAfter) || (endsReset + endsOn) <= now()){
					resetCountdown();
				}
			} else {
				resetCountdown();
			}
		}
		cn.personSet('$countdowns', countdowns);
		cn.countdownAnimations[id] = cn.requestAnimationFrame(updateClock);
	};

	cn._initScratchCards = function($scratchCards){
		$scratchCards.each(function(elm){
			$(elm).scratch_card();
		});
	};

	cn._initSpinToWins = function($spinToWins){
		$spinToWins.each(function(spinToWin){
			$(spinToWin)
				.find('.conv-spintowin-container')
				.spinToWin();
		});
	};

	/**
	 * Iterate over all active widgets
	 * @param fn function(id, widget, $widget)
	 * @param complete function
	 * @private
	 */
	var _eachActiveWidget = function(fn, complete){
		cn.requestAnimationFrame(function(){
			for (var i = 0; i < cn.activeWidgets.length; i++){
				var id = cn.activeWidgets[i];
				// Widget dom may be not rendered yet
				if (cn.$widgets[id])
					fn(id, cn.widgets[id], cn.$widgets[id]);
			}
			if (complete instanceof Function)
				complete();
		});
	};
	cn._orientationchange = function(){
		_eachActiveWidget(function(id, widget){
			if (widget.type === 'welcome' && widget.isScrollable){
				// Changing the cn.widgets[id] object, to which "widget" variable is linked
				widget.iosH = window.innerHeight;
			}
		}, cn._resize);
	};
	// Resize event
	cn._resize = function(){
		$.each(cn.$containers, function(id, $container){
			$container.mod('conv_state', cn.currentState);
		});

		_eachActiveWidget(function(id, widget, $widget){
			var wHeight = $widget.find('.conv-widget-h').height(), // widget inner height
				positionSelector = cn.currentState === 'desktop' ? 'place' : 'mobilePlace';
			widget.overlap = $widget.hasClass('conv_overlap');

			switch (widget.type) {
				case 'bar':
					// does widget height changed?
					if (widget.overlap || widget.height === wHeight)
						break;

					// check px/vh/etc
					if (Number(wHeight) == wHeight)
						wHeight = wHeight + 'px';
					widget.height = wHeight;
					cn._removeStyle(id, 'body_padding');
					if ($widget.mod('conv_' + positionSelector) !== 'top')
						cn._addStyle('body.conv_opened_' + id + '{padding-bottom: ' + widget.height + '!important;}', id, 'body_padding');
					else
						cn._addStyle('body.conv_opened_' + id + '{padding-top: ' + widget.height + '!important;}', id, 'body_padding');
					break;
				case 'welcome':
					// Adjusting body for welcome widget
					var winHeight = '100vh';
					if (widget.isScrollable){
						var $widgetH = $widget.find('.conv-widget-h').css({bottom: 'auto', 'min-height': ''}),
							widgetHHeight = $widgetH.height();

						if (cn.isIOS)
							winHeight = widget.iosH;
						else if (widgetHHeight > window.innerHeight)
							winHeight = widgetHHeight;
						else
							$widgetH.css({bottom: 0})

						$widgetH.css({'min-height': winHeight, 'max-height': winHeight});
					}

					// check current widget height, if it more when body then add class for scrolling
					if ($widget.find('.conv-widget-h').height() > window.innerHeight){
						$widget.addClass('conv_inner_scrolling');
						winHeight = $widget.find('.conv-widget-h').height();
					}

					cn._removeStyle(id, 'body_padding');
					// check px/vh/etc
					if (Number(winHeight) == winHeight)
						winHeight = winHeight + 'px';
					// set padding same as window height
					cn._addStyle('body.conv_opened_' + id + '{padding-top: ' + winHeight + '!important;}', id, 'body_padding');
					break;
			}

			// remove scroll for small widgets
			if (widget.type !== 'welcome' && widget.type !== 'inline' && wHeight <= $widget.height())
				$widget.css('overflow-y', 'unset');
		});

		// If element is detached or removed removing waypoint
		cn.waypoints = cn.waypoints.filter(function(wp){
			return wp.elm && wp.elm.offsetHeight;
		});
		cn.waypoints.forEach(function(wp){
			var rect = $.getCoords(wp.elm),
				top = rect.top,
				height = rect.height;
			if (wp.mode === 'onShow'){
				wp.min = (wp.max = top + height / 2) - window.innerHeight;
			} else/* if (wp.mode == 'onHide')*/{
				wp.min = top + height;
			}
		});
		cn._scroll();
	};
	cn._scroll = function(){
		// Handling waypoints
		for (var i = 0; i < cn.waypoints.length; i++){
			var wp = cn.waypoints[i];
			if ((wp.min === undefined || window.pageYOffset > wp.min) && (wp.max === undefined || window.pageYOffset < wp.max)){
				wp.fn();
				cn.waypoints.splice(i--, 1);
			}
		}
		if (!cn.waypoints.length) $.$window.off('scroll', cn._scroll);
	};
	cn.close = function(id){
		id = +id;
		if (!id || cn.activeWidgets.indexOf(id) === -1 || !cn.widgets[id]) return;
		cn.storeWidgetEvent(id, 'close', now());
		cn.hide(id);
		cn.trigger('close', [id]);
	};

	/**
	 * Success callback after social signup
	 * @private
	 */
	cn._socsignCallback = function(e){
		if (e.origin === window.location.origin)
			return;

		var $socsign = $(cn.lastClickedElement).closest(".conv-socsign");
		if (!$socsign.elms.length)
			return;

		var data = e.data.data || {};
		var widgetId = data.widgetId || +$socsign.closest('.conv-widget').attr('id').replace('conv', '');
		var widgetData = cn._getWidgetActiveScreenData(widgetId);

		Object.keys(widgetData).forEach(function(key){
			if (!widgetData[key].length) delete widgetData[key];
		});

		cn._maybeSubmitData(widgetId, $socsign.mod('conv_id'), $.extend(true, data, widgetData, {email: data.email}));
	};

	/**
	 * Success callback after following widget
	 * @private
	 */
	cn._followCallback = function(){
		cn.trackEvent($(cn.lastClickedElement));
	};

	/**
	 * Success callback after sharing
	 * @private
	 */
	cn._shareCallback = function(){
		cn.trackEvent($(cn.lastClickedElement));
	};

	/**
	 * Handler for countdown finish
	 * @param $countdown
	 * @param widgetId
	 * @private
	 */
	cn._countdownCallback = function($countdown, widgetId){
		if ($countdown.data('close') === '1'){
			cn.close(widgetId);
		}
		var redirect = $countdown.data('redirect');
		if (redirect && redirect.length > 0)
			location.assign(redirect.replace(/&amp;/g, '&'));
	};

	/**
	 * Handler for scratch click
	 * @param widgetId
	 */
	cn._scratchCardCallback = function(widgetId){
		var $widget = cn.$widgets[widgetId],
			$curScreen = $widget.find('.conv-screen.conv_active'),
			$scratch_card = $curScreen.find('.conv-scratch_card');

		cn._maybeReplaceSubscriberVars($curScreen.elms[0], widgetId);
		$scratch_card.find('.conv-scratch').addClass('conv_active');
	};

	/**
	 * Handler for spintowin finish
	 *
	 * @param widgetId
	 * @param data
	 * @param callback
	 */
	cn._spintowinCallback = function(widgetId, data, callback){
		if (!data.hasOwnProperty(data.$fields.prize))
			return;
		var value = data[data.$fields.prize],
			$widget = cn.$containers[widgetId],
			$spintowin = $('.conv-screen.conv_active .conv-spintowin-container', $widget),
			spintowinRect = $spintowin.elms[0].getBoundingClientRect();

		if (cn.getPlatform() === 'mobile' && spintowinRect.y){
			if (cn.widgets[widgetId].type === 'welcome')
				window.scrollTo(0, spintowinRect.y);
			else
				$widget.find('.conv-widget').elms[0].scrollTo(0, spintowinRect.y);
		}

		$spintowin.spinToWin('finishSpin', value, callback);
	};

	/**
	 * Track click on widget element
	 * Send request to server and get item automations
	 * @param $widgetItem cQuery object - item that was clicked
	 */
	cn.trackEvent = function($widgetItem){
		var id = +$widgetItem.closest('.conv-widget').attr('id').replace('conv', ''),
			session = cn.session(),
			$widget, data;

		if (!id || cn.activeWidgets.indexOf(id) === -1)
			return;

		$widget = cn.$widgets[id];
		data = {
			site_id: cn.siteId,
			widget_id: id,
			type: 'click',
			element_id: $widgetItem.mod('conv_id'),
			subscriber_uid: cn.personGet('$UID', ''),
			extra_data: {
				url: location.href,
				first_pageview_moment: now(),
				landing_page_url: session.startUrl,
				page_title: document.title,
				timezone_offset: (new Date()).getTimezoneOffset(),
				referral_url: session.referrer,
				visit_number: cn.personGet('$visitNum'),
			}
		};

		// check conversions for cta buttons
		var lastEvents = $.retrieve('lastEvents', []);
		if (lastEvents[id][2])
			data.was_converted = true;

		$.post(cn.ajaxUrl + '/api/widget/track_event', data, function(r){
			$widgetItem.removeClass('conv-preloader');
			if (!r.success)
				return cn._displayErrors(r.errors, $widget);
			cn._handleEventSuccess(r.data, data);
		});
	};

	var submitting = false;
	/**
	 * Submit widget form and send data to server
	 * @param widgetId int
	 * @param elmId string
	 * @param data object with additional data to query
	 * @private
	 */
	cn._maybeSubmitData = function(widgetId, elmId, data){
		if (!widgetId || cn.activeWidgets.indexOf(+widgetId) === -1 || submitting)
			return;

		var $widget = cn.$widgets[widgetId],
			$btn = $widget.find('.conv_id_' + elmId);

		$btn.addClass('conv-preloader');
		submitting = true; // Prevent double-send

		cn.requestAnimationFrame(function(){
			cn._createDatapost('widget', data, widgetId, elmId, function(r/*, reqData*/){
				submitting = false;
				$btn.removeClass('conv-preloader');

				if (!r.success)
					return cn._displayErrors(r.errors, $widget);

				var isConverted = $widget.find('input[name=email]').elms.length === 0;
				$.each(data, function(key){
					isConverted = isConverted || /^email/.test(key);
				});
				if (isConverted)
					cn.storeWidgetEvent(widgetId, 'conversion', now());

				var $activeScreen = $widget.find('.conv-screen.conv_active');

				// Upon successful receipt of the coupon code, blocked re-sending the request
				if ($activeScreen.find('.conv-scratch_card').elms.length){
					submitting = true;
					cn._scratchCardCallback(widgetId);
				}

				if ($activeScreen.find('.conv-spintowin').elms.length){
					submitting = true;
					cn._spintowinCallback(widgetId, r.data.prize);
				}

				cn.trigger('submit', [widgetId]);
			});
		});
	};

	/**
	 * Send query to server to create datapost
	 * @param source string widget|get_parametr
	 * @param data object with data to send
	 * @param widget_id int
	 * @param elm_id string
	 * @param callback
	 */
	cn._createDatapost = function(source, data, widget_id, elm_id, callback){
		var session = cn.session();
		data = {
			site_id: cn.siteId,
			widget_id: widget_id,
			element_id: elm_id,
			source: source,
			data: data,
			extra_data: {
				url: location.href,
				first_pageview_moment: now(),
				landing_page_url: session.startUrl,
				page_title: document.title,
				timezone_offset: (new Date()).getTimezoneOffset(),
				referral_url: session.referrer,
				visit_number: cn.personGet('$visitNum'),
			},
			subscriber_uid: cn.personGet('$UID', ''),
			prev_events: $.retrieve('prevEvents', [])
		};

		// https://convertful.docs.apiary.io/#reference/0/dataposts/create-a-datapost-from-a-site-visitor
		$.post(cn.ajaxUrl + '/api/datapost/create', data, function(r){
			if (r.success) cn._handleEventSuccess(r.data, data);
			if (callback) callback(r, data);
		});
	};

	/**
	 * Get data from widget's ACTIVE screen
	 * @param widgetId
	 * @param withLabels set labels text as value for checkbox,radio fields
	 * @return object with keys as fields names
	 */
	cn._getWidgetActiveScreenData = function(widgetId, withLabels){
		var $widget = cn.$widgets[widgetId] || new cQuery,
			data = {},
			$activeScreen = $widget.find('.conv-screen.conv_active');
		// Fields must be handled in a natural form's way: as they are ordered in the form HTML
		$.each($activeScreen.find('input[name], textarea[name], select[name]'), function(_, field){
			var $field = $(field),
				field_name = $field.attr('name'),
				field_id = $field.attr('id'),
				value = $field.val();

			if ($field.is('[type="checkbox"], [type="radio"]')){
				if (withLabels){
					value = $field.closest('.conv-form-field').find('label[for="' + field_id + '"]').text() || value;
				}
				if ($field.is(':checked'))
					data[field_name] = value;
				// if field not checked and no other checked field with same name (radio buttons)
				else if (data[field_name] === undefined)
					data[field_name] = ''; // fill with empty data
			} else {
				data[field_name] = value;
			}
		});

		return data;
	};

	/**
	 * Replace subscriber vars in widget
	 * @param screen element
	 */
	cn._maybeReplaceSubscriberVars = function(screen){
		var $texts = $(screen).find('.conv-btn-text, ' +
			'.conv-text .conv-text-h, ' +
			'.conv-btn-subtext, ' +
			'.conv-screen.conv_active .conv-scratch-value .conv-scratch-label, ' +
			'.conv-screen.conv_active .conv-scratch-value .conv-scratch-code'
		);

		var vars = cn.personGet();

		// Trying to find {{var}} template in text blocks
		$texts.elms.forEach(function(text_el){
			var $text_el = $(text_el), text;

			text = $text_el.html();
			text = text.replace(/"?{([a-z0-9_,-]+)}"?/gi, function(varPattern, varName){
				// replace shortcode like "{shortcode}" to shortcode value
				if (/"+{([a-z0-9_,-]+)}"+/.test(varPattern))
					return '{' + varName + '}';

				var defaultValue;
				var varTmp = varName.split(',');
				varName = varTmp[0];
				defaultValue = varTmp[1];
				var value = vars[varName] || defaultValue || '';
				// Do not remove shortcodes values for scratchcard!
				if (value === '' && ($text_el.hasClass('conv-scratch-label') || $text_el.hasClass('conv-scratch-code'))){
					value = varPattern;
				}
				return value;
			});
			$text_el.html(text);
		})
	};

	/**
	 * Go to widgets screen
	 * @param widgetId
	 * @param screenId
	 */
	cn.goToScreen = function(widgetId, screenId){
		var $widget = cn.$widgets[widgetId],
			gamificationDelay = 0;

		if (!$widget)
			return false;

		var $screens = $widget.find('.conv-screen'),
			$curScreen = $screens.filter('.conv_active'),
			nextScreen;

		// Choose delay before change screen
		var scratchCardExist = $curScreen.find('.conv-scratch').elms.length > 0,
			spinToWinExist = $curScreen.find('.conv-spintowin').elms.length > 0;

		if (scratchCardExist)
			gamificationDelay = Math.max(gamificationDelay, 1000 * 3);
		if (spinToWinExist)
			gamificationDelay = Math.max(gamificationDelay, 1000 * 10); // NOTE: The time that is specified in the spintowin library settings (8 sec rotate + 2 sec delay)

		if (screenId){
			nextScreen = $screens.filter('.conv_id_' + screenId).elms[0];
		} else if ($curScreen.elms[0] !== undefined && $curScreen.elms[0].nextSibling && $curScreen.elms[0].nextSibling.classList && $curScreen.elms[0].nextSibling.classList.contains('conv-screen')){
			// if isset next screen go to it
			nextScreen = $curScreen.elms[0].nextSibling;
		}

		setTimeout(function(){
			// Open next screen if it exist
			if (nextScreen){
				cn._maybeReplaceSubscriberVars(nextScreen, widgetId);
				$curScreen.removeClass('conv_active');
				nextScreen.classList.add('conv_active');

				var $nextScreen = $(nextScreen);
				$nextScreen
					.find('.conv-spintowin-container, .conv-scratch_card')
					.each(function(item){
						if (item.className.indexOf('spintowin') !== -1){
							$.$window.trigger('resize.' + $(item).data('instance-uid'));
						} else if (item.className.indexOf('scratch_card') !== -1){
							item.convScratchCard.resize();
						}
					});
			} else if (!scratchCardExist){
				cn.hide(widgetId);
			}
			submitting = false;

			// fix for stop playback video on current screen
			var curVideos = $curScreen.find('.conv-video iframe');
			curVideos.each(function(video){
				var new_video = video.cloneNode(false);
				video.parentNode.insertBefore(new_video, video);
			});
			curVideos.remove();
		}, gamificationDelay);
	};

	/**
	 * Go to next screen
	 * @param widgetId
	 */
	cn.nextScreen = function(widgetId){
		cn.goToScreen(widgetId/*, next screen*/);
	};

	/**
	 * Make get request with redirect to url
	 * @param url
	 */
	cn.makeGetRedirect = function(url){
		setTimeout(function() {
			location.assign(url);
		}, 100); // small delay for XHR requests from other handlers
	};

	/**
	 * Make post request with redirect to url
	 * @param url
	 * @param postData
	 */
	cn.makePostRedirect = function(url, postData){
		var $form = $('<form method="post">');
		$form
			.css('display', 'none')
			.attr('action', url)
			//.attr('target', '_blank')
			.attr('method', 'POST');
		$.each(postData, function(fieldName, fieldVal){
			// create field
			var $field = $('<input type="hidden">');
			$field.attr('name', fieldName)
				.val(fieldVal);
			$form.append($field);
		});
		$.$body.append($form);
		setTimeout(function() {
			$form.elms[0].submit();
			$form.remove();
		}, 100); // small delay for XHR requests from other handlers
	};

	/**
	 * Check ajax response data and do some actions (eval, set UID, save events) based on request
	 * @param data
	 * @param sentData
	 * @private
	 */
	cn._handleEventSuccess = function(data, sentData){
		// If not defined subscriber_uid, then store events
		// If subscriber_uid defined, but set to null it mean that we can't store subscriber data
		if (data.subscriber_uid === undefined){
			// store sentData for next submit
			var prevEvents = $.retrieve('prevEvents', []);
			prevEvents.push({
				widget_id: sentData.widget_id,
				element_id: sentData.element_id,
				data: sentData.data,
				date: now()
			});
			$.store('prevEvents', prevEvents);
		} else {
			cn.personSet('$UID', data.subscriber_uid);
			// clear saved Events
			$.store('prevEvents', null);

			// start sync new subscriber
			if (data.need_sync)
				cn._syncSubscriber();
		}

		if (data.converted)
			cn.storeWidgetEvent(sentData.widget_id, 'conversion', now());

		if (data.completed_events){
			$.each(data.completed_events || [], function(_, eventName){
				cevents.setEvent('triggered:' + eventName, true);
				cn.trigger('triggered:' + eventName);
			}.bind(this));
		}
		// Save person data from response
		var dataWithLabels = cn._getWidgetActiveScreenData(sentData.widget_id, true);
		$.each($.extend(true, sentData.data, sentData.extra_data, data.extra_data, dataWithLabels) || [], function(varName, varValue){
			cn.personSet(varName, varValue);
		});

		// Save person data from response
		$.each(data.prize || {}, function(varName, varValue){
			cn.personSet(varName, varValue);
		});

		// exec custom js code
		// !! All Automations exec here
		if (data.js){
			cn.requestAnimationFrame(function(){
				if (data.js instanceof Array)
					$.each(data.js, function(_, js){
						$.safeEval(js);
					});
				else
					$.safeEval(data.js);
			});
		}
	};

	/**
	 * Count subscribers synchronizations
	 * @type {number}
	 * @private
	 */
	cn._subscriberSyncCount = 0;
	/**
	 * Sync new subscriber data
	 * @private
	 */
	cn._syncSubscriber = function(){
		var subscriber_uid = cn.personGet('$UID', undefined);
		if (!subscriber_uid)
			return;

		cn._subscriberSyncCount++;
		$.get(cn.ajaxUrl + '/api/subscriber/get_integrations_data', {
			subscriber_uid: subscriber_uid,
			site_id: cn.siteId,
		}, function(r){
			if (r.data.sync_finished === false){

				// Sync not finished
				if (cn._subscriberSyncCount < 5)
					setTimeout(cn._syncSubscriber, Math.pow(2, cn._subscriberSyncCount) * 1000);
				else
					cn._subscriberSyncCount = 0;
				return false;
			}

			cn._subscriberSyncCount = 0;
			$.each(r.data.personParam, function(key, item){
				cn.personSet(key, item);
			});
		})
	};

	/**
	 * Show errors for fields from current screen
	 * @param errors object {field_key => error}
	 * @param $widget
	 * @return {*}
	 * @private
	 */
	cn._displayErrors = function(errors, $widget){
		$.each(errors, function(key, error){
			var $field = $widget.find('.conv-screen.conv_active .conv-form-field.conv_for_' + key).addClass('conv_error');
			// Showing text error only for the first fields, so they don't overlap each other
			if (Object.keys(errors)[0] === key) $field.find('.conv-form-field-message').html(error).css({display: 'block'});
		});

		return void (0);
	};
	cn._utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

	/**
	 * Session object getter / setter
	 * @return {Object}
	 */
	cn.session = function(){
		if (arguments.length)
			return $.store('session', arguments[0]);

		var session = $.retrieve('session'),
			isNew = !session || !session.expires || session.expires < now();
		if (isNew){
			cn.personSet({
				$visitNum: cn.personGet('$visitNum', 0) + 1,
				$fvDate: cn.personGet('$fvDate', now()),
				$lvDate: (session && session.expires) ? (session.expires - 1800) : null
			});
			session = {
				start: now(),
				shown: [],
				startUrl: document.URL,
				referrer: document.referrer
			};

			for (var i = 0; i < this._utmParams.length; i++){
				var param = this._utmParams[i];
				var param_value = cn.getUrlQuery(param);
				if (param_value !== "" && param_value !== undefined){
					session[param] = param_value;
				}
			}
		}
		session.expires = now() + 1800;
		cn.session(session);
		session.isNew = isNew;
		if (typeof session.shown === 'string'){
			session.shown = JSON.parse(session.shown || '[]') || [];
		}

		return session;
	};
	/**
	 * Person object getter / setter
	 * @return {Object}
	 */
	cn.personSet = function(name, value){
		// A group of values is passed
		if (value === undefined && name) return $.each(name, cn.personSet);
		var person = cn.personGet();
		if (value !== null) person[name] = value;
		else delete person[name];
		$.store('person', person);
		name = 'personParam:' + name;
		si.set(name, value);
	};
	cn.personSetOnce = function(name, value){
		// A group of values is passed
		if (value === undefined && name) return $.each(name, cn.personSetOnce);
		if (cn.personGet(name) === null) cn.personSet(name, value);
	};
	cn.personGet = function(name, def){
		var result = $.retrieve('person', {});
		if (name === undefined) return result;
		def = (def === undefined) ? null : def;
		result = (result[name] !== undefined) ? result[name] : def;
		return result;
	};
	// Erases all storage data used by Convertful. Used for testing purposes
	cn.reset = function(){
		$.store('person', null);
		$.store('session', null);
		$.store('lastEvents', null);
		$.store('prevEvents', null);
		$.store('customEvents', {});
	};
	// Reinit inline widgets for ajax site
	// This should be triggerd after ajax call which modificate DOM
	cn.reinit = function(){
		var onHideEvent = function(widgetId){
			if (si.checkWidgetRules(widgetId))
				cn.show(widgetId);
			cn.off('afterHide', onHideEvent);
		};

		$.each(cn.widgets, function(key, widget){
			var widgetId = +widget.id;
			if (widget.isInstant && ab.canBeShown(widgetId)){
				if (cn.$widgets[widgetId]){
					cn.on('afterHide', onHideEvent.bind(this, widgetId));
					cn.hide(widgetId);
				} else {
					if (si.checkWidgetRules(widgetId))
						cn.show(widgetId);
				}
			}
		}.bind(this));
	};
	// Init function
	cn.init = function(data){
		cn.ver = '1.3';
		cn.siteId = +data.site_id;
		cn.widgets = {};

		if (data.cookies)
			$.each(data.cookies, function(key, item){
				$.setCookie(key, item);
			});

		if (data.personParam)
			$.each(data.personParam, function(key, item){
				cn.personSet(key, item);
			});

		// A/B Testing functions
		ab.init(data.widgets);

		// Get conv_ params from URL
		$.each(cn.getUrlQueries(), function(key, value){
			if (! /^conv_/.test(key))
				return 0;

			key = key.replace(/^conv_/, '');
			cn.personSet(key, value);

			// If a URL has a query param 'conv_email', send this email to server and receive events and other stuff
			if (key === 'email')
				cn._createDatapost('get_parameter', {email: value});
		});

		// after window ready
		cQuery(function($){
			// check is it mobile or desktop
			cn.currentState = (document.documentElement.clientWidth < 600) ? 'mobile' : 'desktop';
			$.$window.on('resize', function(){
				cn.currentState = (document.documentElement.clientWidth < 600) ? 'mobile' : 'desktop';
			});

			// Add shared styles for all widgets
			if (data.widgets.length)
				cn.$styles.general = $('<style type="text/css" class="conv-css conv_id_general">' + (data.css || '') + '</style>');

			// Initialize all widgets
			data.widgets.forEach(function(widget){
				var id = +widget.id;
				cn.widgets[id] = widget;

				if (!ab.canBeShown(id))
					return;

				// Attach Display rules events on page
				si.attach(id, widget.showIf);
				// Atttach display rules for float action button
				if (widget.fab)
					si.attach(id, widget.fabShowIf);

				// After full init check display rules and show needed widgets
				cn.one('afterInit', function(id){
					if (cn.widgets[id].isInstant && si.checkWidgetRules(id) && cn.show(id)){
						if (!cn.widgets[id].isInstant)
							si.detach(id);
						cn.trigger('widgetAffected', [id]);
					}
				}.bind(this, id));
			});

			// Initialize all widgets
			cevents.rules = data.custom_events || {};
			$.each(cevents.rules, function(id, eventRules){
				cevents.attach(id, eventRules);

				if (cevents.checkRule(eventRules)){
					var customEvents = $.retrieve('customEvents', {});
					var eventName = 'triggered:' + id;
					si.values[eventName] = true;
					si._render(eventName, true);

					customEvents[eventName] = true;
					$.store('customEvents', customEvents);
					cevents._trackEvent(id);
				}
			});

			if (data.js)
				$.safeEval(data.js);

			// hack for socsign in FB application
			if (cn.isIOS && cn.isFB && cn.getUrlQuery('convFBLogin') === '1'){
				window.scroll(0, +$.retrieve('convScroll'));

				var authData = {
						data: $.retrieve('convStoredData') || {}
					},
					convData = JSON.parse(cn.getUrlQuery('convData')),
					fbWidgetId = +convData.widgetId;

				// append user's data
				$.each(convData.data, function(key, value){
					authData['data'][key] = value;
				});

				cn.one('afterShow', function(id){
					if (id === fbWidgetId){
						// TODO: pass elmID through convData
						var elmId = cn.$widgets[id].find('.conv-socsign').mod('conv_id');
						cn._maybeSubmitData(id, elmId, authData);
					}
				});

				cn.show(fbWidgetId);
			}

			// If a URL has a hash that matches some link-clicked rule, showing it, so visitors could reload page with widget
			// or give a direct link to it
			if (location.hash)
				si.setEvent('clicked:a[href*="' + location.hash + '"]');

			cn.isReady = true;
			cn.trigger('afterInit');
		});
	};

	cn.load = function(){
		// Some users still use optin.guru script, so providing the fallback compatibility
		// Some platforms may change ID of embedded scripts, so providing fallback by script filename as well
		var script = document.getElementById('convertful-api') || document.getElementById('optinguru-api') || document.getElementById('optin-api');
		if (!script){
			var scripts = document.getElementsByTagName('script');
			scripts = Array.prototype.slice.call(scripts);
			for (var k in scripts){
				var script_src = scripts[k].getAttribute('src');
				if (/(Convertful|optin)(.*?).js/gi.test(script_src)){
					script = scripts[k];
					break;
				}
			}
		}
		var cn = window.Convertful,
			src = script.getAttribute('src'),
			ajaxUrl = src.split('/').slice(0, -1).join('/'),
			owner = +(script.getAttribute('data-owner') || cn.getUrlQuery('owner', src));

		if (!owner) return;

		cn.ajaxUrl = ajaxUrl;
		cn.owner = owner;
		window.Convertful = cn;

		// Loading widgets
		$.ajax({
			url: ajaxUrl + '/api/widget/export',
			ifModified: true,
			data: {
				owner: owner,
				domain: location.host || window.parent.location.host,
				subscriber_uid: cn.personGet('$UID', undefined)
			},
			success: function(r){
				if (!r.success || !r.data.site_id || !(r.data.widgets instanceof Array))
					return;

				cn.init(r.data);
			}
		});

		// Temporarily marking new session right after the call, so on glitches and quick reloads it won't be tracked
		// as new session each time
		var session = cn.session();
		session.pageViews = (session.pageViews || 0) + 1;
		cn.session(session);

		if (session.isNew){
			document.cookie = 'session_id=1;expires=' + (new Date(session.expires * 1000)).toGMTString() + ';domain=' + ajaxUrl.split('/')[2] + ';path=/; secure; samesite=none';
		}
	}

	return cn;
}(cQuery);

!function($, window){
	// Disabling Convertful execution (may be required when a site owner got no consent to use visitors' cookies)
	if (!window.Convertful || window['disable_convertful'])
		return;

	window.Convertful.load();
}(cQuery, window);
