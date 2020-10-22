/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
'use strict';var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};
function ba(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var ca=ba(this);function da(a,b){if(b)a:{var c=ca;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
da("String.prototype.matchAll",function(a){return a?a:function(b){if(b instanceof RegExp&&!b.global)throw new TypeError("RegExp passed into String.prototype.matchAll() must have global tag.");var c=new RegExp(b,b instanceof RegExp?void 0:"g"),d=this,e=!1,f={next:function(){var g={},h=c.lastIndex;if(e)return{value:void 0,done:!0};var k=c.exec(d);if(!k)return e=!0,{value:void 0,done:!0};c.lastIndex===h&&(c.lastIndex+=1);g.value=k;g.done=!1;return g}};
f[Symbol.iterator]=function(){return f};
return f}});
var l=this||self;function m(a){a=a.split(".");for(var b=l,c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}
function n(){}
function q(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function r(a,b){a=a.split(".");var c=l;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
function t(a,b){function c(){}
c.prototype=b.prototype;a.s=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.F=function(d,e,f){for(var g=Array(arguments.length-2),h=2;h<arguments.length;h++)g[h-2]=arguments[h];return b.prototype[e].apply(d,g)}}
;function ea(a,b){b=Array.prototype.indexOf.call(a,b,void 0);var c;(c=0<=b)&&Array.prototype.splice.call(a,b,1);return c}
;var fa="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ha(a,b){let c,d;for(let e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(let f=0;f<fa.length;f++)c=fa[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;var ia=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function u(a,b){return a<b?-1:a>b?1:0}
;var w;a:{var ja=l.navigator;if(ja){var ka=ja.userAgent;if(ka){w=ka;break a}}w=""};function x(a){x[" "](a);return a}
x[" "]=n;var la=-1!=w.indexOf("Opera"),y=-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"),ma=-1!=w.indexOf("Edge"),na=-1!=w.indexOf("Gecko")&&!(-1!=w.toLowerCase().indexOf("webkit")&&-1==w.indexOf("Edge"))&&!(-1!=w.indexOf("Trident")||-1!=w.indexOf("MSIE"))&&-1==w.indexOf("Edge"),oa=-1!=w.toLowerCase().indexOf("webkit")&&-1==w.indexOf("Edge");function pa(){var a=l.document;return a?a.documentMode:void 0}
var z;a:{var A="",B=function(){var a=w;if(na)return/rv:([^\);]+)(\)|;)/.exec(a);if(ma)return/Edge\/([\d\.]+)/.exec(a);if(y)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(oa)return/WebKit\/(\S+)/.exec(a);if(la)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
B&&(A=B?B[1]:"");if(y){var D=pa();if(null!=D&&D>parseFloat(A)){z=String(D);break a}}z=A}var qa=z,E={},F;if(l.document&&y){var ra=pa();F=ra?ra:parseInt(qa,10)||void 0}else F=void 0;var sa=F;var ta={},G=null;function ua(a,b){var c=void 0;return new (c||(c=Promise))(function(d,e){function f(k){try{h(b.next(k))}catch(p){e(p)}}
function g(k){try{h(b["throw"](k))}catch(p){e(p)}}
function h(k){k.done?d(k.value):(new c(function(p){p(k.value)})).then(f,g)}
h((b=b.apply(a,void 0)).next())})}
;function H(){this.h=this.h;this.l=this.l}
H.prototype.h=!1;H.prototype.dispose=function(){this.h||(this.h=!0,this.f())};
H.prototype.f=function(){if(this.l)for(;this.l.length;)this.l.shift()()};var I={};var va=class{},wa=class extends va{constructor(a,b){super();if(b!==I)throw Error("Bad secret");this.c=a}toString(){return this.c}};new wa("about:blank",I);new wa("about:invalid#zTSz",I);var J;(J=!y)||(J=9<=Number(sa));var xa=J,L;
if(L=y){var ya=function(){{var a=0;const d=ia(String(qa)).split("."),e=ia("9").split("."),f=Math.max(d.length,e.length);for(let g=0;0==a&&g<f;g++){var b=d[g]||"",c=e[g]||"";do{b=/(\d*)(\D*)(.*)/.exec(b)||["","","",""];c=/(\d*)(\D*)(.*)/.exec(c)||["","","",""];if(0==b[0].length&&0==c[0].length)break;a=u(0==b[1].length?0:parseInt(b[1],10),0==c[1].length?0:parseInt(c[1],10))||u(0==b[2].length,0==c[2].length)||u(b[2],c[2]);b=b[3];c=c[3]}while(0==a)}}return 0<=a};
L=!(Object.prototype.hasOwnProperty.call(E,"9")?E["9"]:E["9"]=ya())}var za=L,Aa=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});
try{l.addEventListener("test",n,b),l.removeEventListener("test",n,b)}catch(c){}return a}();function M(a,b){this.type=a;this.c=this.target=b;this.defaultPrevented=!1}
M.prototype.f=function(){this.defaultPrevented=!0};function N(a,b){M.call(this,a?a.type:"");this.relatedTarget=this.c=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.keyCode=0;this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.state=null;this.pointerId=0;this.pointerType="";this.h=null;a&&this.init(a,b)}
t(N,M);var Ba={2:"touch",3:"pen",4:"mouse"};
N.prototype.init=function(a,b){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.c=b;if(b=a.relatedTarget){if(na){a:{try{x(b.nodeName);var e=!0;break a}catch(f){}e=!1}e||(b=null)}}else"mouseover"==c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||
0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.keyCode=a.keyCode||0;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.pointerId=a.pointerId||0;this.pointerType="string"===typeof a.pointerType?a.pointerType:Ba[a.pointerType]||"";this.state=a.state;this.h=a;a.defaultPrevented&&this.f()};
N.prototype.f=function(){N.s.f.call(this);var a=this.h;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,za)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var O="closure_listenable_"+(1E6*Math.random()|0),Ca=0;function Da(a,b,c,d,e){this.listener=a;this.c=null;this.src=b;this.type=c;this.capture=!!d;this.m=e;this.key=++Ca;this.i=this.j=!1}
function P(a){a.i=!0;a.listener=null;a.c=null;a.src=null;a.m=null}
;function Q(a){this.src=a;this.listeners={};this.c=0}
Q.prototype.add=function(a,b,c,d,e){var f=a.toString();a=this.listeners[f];a||(a=this.listeners[f]=[],this.c++);var g=R(a,b,d,e);-1<g?(b=a[g],c||(b.j=!1)):(b=new Da(b,this.src,f,!!d,e),b.j=c,a.push(b));return b};
Q.prototype.remove=function(a,b,c,d){a=a.toString();if(!(a in this.listeners))return!1;var e=this.listeners[a];b=R(e,b,c,d);return-1<b?(P(e[b]),Array.prototype.splice.call(e,b,1),0==e.length&&(delete this.listeners[a],this.c--),!0):!1};
function S(a,b){var c=b.type;c in a.listeners&&ea(a.listeners[c],b)&&(P(b),0==a.listeners[c].length&&(delete a.listeners[c],a.c--))}
function R(a,b,c,d){for(var e=0;e<a.length;++e){var f=a[e];if(!f.i&&f.listener==b&&f.capture==!!c&&f.m==d)return e}return-1}
;var Ea="closure_lm_"+(1E6*Math.random()|0),Fa={},Ga=0;function Ha(a,b,c,d,e){if(d&&d.once)Ia(a,b,c,d,e);else if(Array.isArray(b))for(var f=0;f<b.length;f++)Ha(a,b[f],c,d,e);else c=Ja(c),a&&a[O]?a.c.add(String(b),c,!1,q(d)?!!d.capture:!!d,e):Ka(a,b,c,!1,d,e)}
function Ka(a,b,c,d,e,f){if(!b)throw Error("Invalid event type");var g=q(e)?!!e.capture:!!e,h=T(a);h||(a[Ea]=h=new Q(a));c=h.add(b,c,d,g,f);if(!c.c){d=La();c.c=d;d.src=a;d.listener=c;if(a.addEventListener)Aa||(e=g),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(Ma(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");Ga++}}
function La(){var a=Na,b=xa?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);
if(!c)return c};
return b}
function Ia(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Ia(a,b[f],c,d,e);else c=Ja(c),a&&a[O]?a.c.add(String(b),c,!0,q(d)?!!d.capture:!!d,e):Ka(a,b,c,!0,d,e)}
function Oa(a,b,c,d,e){if(Array.isArray(b))for(var f=0;f<b.length;f++)Oa(a,b[f],c,d,e);else(d=q(d)?!!d.capture:!!d,c=Ja(c),a&&a[O])?a.c.remove(String(b),c,d,e):a&&(a=T(a))&&(b=a.listeners[b.toString()],a=-1,b&&(a=R(b,c,d,e)),(c=-1<a?b[a]:null)&&Pa(c))}
function Pa(a){if("number"!==typeof a&&a&&!a.i){var b=a.src;if(b&&b[O])S(b.c,a);else{var c=a.type,d=a.c;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(Ma(c),d):b.addListener&&b.removeListener&&b.removeListener(d);Ga--;(c=T(b))?(S(c,a),0==c.c&&(c.src=null,b[Ea]=null)):P(a)}}}
function Ma(a){return a in Fa?Fa[a]:Fa[a]="on"+a}
function Qa(a,b,c,d){var e=!0;if(a=T(a))if(b=a.listeners[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var f=b[a];f&&f.capture==c&&!f.i&&(f=Ra(f,d),e=e&&!1!==f)}return e}
function Ra(a,b){var c=a.listener,d=a.m||a.src;a.j&&Pa(a);return c.call(d,b)}
function Na(a,b){if(a.i)return!0;if(!xa){var c=b||m("window.event");b=new N(c,this);var d=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var e=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(g){e=!0}if(e||void 0==c.returnValue)c.returnValue=!0}c=[];for(e=b.c;e;e=e.parentNode)c.push(e);a=a.type;for(e=c.length-1;0<=e;e--){b.c=c[e];var f=Qa(c[e],a,!0,b);d=d&&f}for(e=0;e<c.length;e++)b.c=c[e],f=Qa(c[e],a,!1,b),d=d&&f}return d}return Ra(a,new N(b,this))}
function T(a){a=a[Ea];return a instanceof Q?a:null}
var Sa="__closure_events_fn_"+(1E9*Math.random()>>>0);function Ja(a){if("function"===typeof a)return a;a[Sa]||(a[Sa]=function(b){return a.handleEvent(b)});
return a[Sa]}
;function U(){H.call(this);this.c=new Q(this);this.o=this;this.g=null}
t(U,H);U.prototype[O]=!0;U.prototype.addEventListener=function(a,b,c,d){Ha(this,a,b,c,d)};
U.prototype.removeEventListener=function(a,b,c,d){Oa(this,a,b,c,d)};
U.prototype.dispatchEvent=function(a){var b=this.g;if(b){var c=[];for(var d=1;b;b=b.g)c.push(b),++d}b=this.o;d=a.type||a;if("string"===typeof a)a=new M(a,b);else if(a instanceof M)a.target=a.target||b;else{var e=a;a=new M(d,b);ha(a,e)}e=!0;if(c)for(var f=c.length-1;0<=f;f--){var g=a.c=c[f];e=V(g,d,!0,a)&&e}g=a.c=b;e=V(g,d,!0,a)&&e;e=V(g,d,!1,a)&&e;if(c)for(f=0;f<c.length;f++)g=a.c=c[f],e=V(g,d,!1,a)&&e;return e};
U.prototype.f=function(){U.s.f.call(this);if(this.c){var a=this.c,b=0,c;for(c in a.listeners){for(var d=a.listeners[c],e=0;e<d.length;e++)++b,P(d[e]);delete a.listeners[c];a.c--}}this.g=null};
function V(a,b,c,d){b=a.c.listeners[String(b)];if(!b)return!0;b=b.concat();for(var e=!0,f=0;f<b.length;++f){var g=b[f];if(g&&!g.i&&g.capture==c){var h=g.listener,k=g.m||g.src;g.j&&S(a.c,g);e=!1!==h.call(k,d)&&e}}return e&&!d.defaultPrevented}
;function W(){H.call(this);this.o=[];this.c=[];this.g={}}
t(W,H);W.prototype.D=function(a){var b=this.c[a];if(b){var c=this.g[b];c&&ea(c,a);delete this.c[a];delete this.c[a+1];delete this.c[a+2]}return!!b};
W.prototype.clear=function(a){if(a){var b=this.g[a];b&&(Array.prototype.forEach.call(b,this.D,this),delete this.g[a])}else this.c.length=0,this.g={}};
W.prototype.f=function(){W.s.f.call(this);this.clear();this.o.length=0};/*

Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
var Ta=a=>new Promise((b,c)=>{let d=a.length,e=null;if(d){var f=(g,h)=>{g||e||(e=h);d--;d||(e?c(e):b())};
for(const g of a)g.then(f.bind(null,!0),f.bind(null,!1))}else b()}),Ua=a=>self.btoa(String.fromCharCode.apply(null,new Uint8Array(a))).replace(/\+/g,"-").replace(/\//g,"_");var Va=class extends Error{constructor(a,...b){super(a);this.args=[...b]}};let X=null;function Y(a,b){const c={};c.key=a;c.value=b;return Wa().then(d=>new Promise((e,f)=>{try{const g=d.transaction("swpushnotificationsstore","readwrite").objectStore("swpushnotificationsstore").put(c);g.onsuccess=()=>{e()};
g.onerror=()=>{f()}}catch(g){f(g)}}))}
function Xa(){return Y("IndexedDBCheck","testing IndexedDB").then(()=>Z("IndexedDBCheck")).then(a=>"testing IndexedDB"===a?Promise.resolve():Promise.reject()).then(()=>!0).catch(()=>!1)}
function Z(a){const b=new Va("Error accessing DB");return Wa().then(c=>new Promise((d,e)=>{try{const f=c.transaction("swpushnotificationsstore").objectStore("swpushnotificationsstore").get(a);f.onsuccess=()=>{const g=f.result;d(g?g.value:null)};
f.onerror=()=>{b.params={key:a,source:"onerror"};e(b)}}catch(f){b.params={key:a,
thrownError:String(f)},e(b)}}),()=>null)}
function Wa(){return X?Promise.resolve(X):new Promise((a,b)=>{const c=self.indexedDB.open("swpushnotificationsdb");c.onerror=b;c.onsuccess=()=>{const d=c.result;if(d.objectStoreNames.contains("swpushnotificationsstore"))X=d,a(X);else return self.indexedDB.deleteDatabase("swpushnotificationsdb"),Wa()};
c.onupgradeneeded=Ya})}
function Ya(a){a=a.target.result;a.objectStoreNames.contains("swpushnotificationsstore")&&a.deleteObjectStore("swpushnotificationsstore");a.createObjectStore("swpushnotificationsstore",{keyPath:"key"})}
;r("yt.config_",window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{});let Za=0;r("ytDomDomGetNextId",m("ytDomDomGetNextId")||(()=>++Za));r("ytEventsEventsListeners",l.ytEventsEventsListeners||{});r("ytEventsEventsCounter",l.ytEventsEventsCounter||{count:0});class $a{constructor(){}};class ab extends $a{start(){const a=m("yt.scheduler.instance.start");a&&a()}}(function(){var a=ab;a.u=void 0;a.C=function(){a.u||(a.u=new a)}})();
ab.C();l.ytPubsubPubsubInstance||new W;new U;new W;r("ytglobal.prefsUserPrefsPrefs_",m("ytglobal.prefsUserPrefsPrefs_")||{});const bb=Date.now().toString();if(!l.ytLoggingDocDocumentNonce_){{var cb;a:{if(window.crypto&&window.crypto.getRandomValues)try{{const c=Array(16),d=new Uint8Array(16);window.crypto.getRandomValues(d);for(let e=0;e<c.length;e++)c[e]=d[e];cb=c}break a}catch(c){}{const c=Array(16);for(let d=0;16>d;d++){const e=Date.now();for(let f=0;f<e%23;f++)c[d]=Math.random();c[d]=Math.floor(256*Math.random())}if(bb){let d=1;for(let e=0;e<bb.length;e++)c[d%16]=c[d%16]^c[(d-1)%16]/4^bb.charCodeAt(e),d++}cb=c}}const a=cb,b=[];for(let c=0;c<a.length;c++)b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(a[c]&
63))}};function db(){return self.clients.matchAll({type:"window",includeUncontrolled:!0}).then(a=>{if(a)for(const b of a)b.postMessage({type:"update_unseen_notifications_count_signal"})})}
function eb(a){return ua(this,function*(){if(!(a.payload&&a.payload.chrome&&a.payload.chrome.endpoint))return Promise.resolve();const b=new FormData;b.append("json_navigation_endpoints",JSON.stringify([a.payload.chrome.endpoint]));let c="[]";a.payload.chrome.extraUrlParams&&(c=JSON.stringify(a.payload.chrome.extraUrlParams));b.append("extra_url_params",c);b.append("hashed_identifier",a.hashedIdentifier||"");b.append("identifier_salt",a.identifierSalt||"");return fetch("/notifications_ajax?action_convert_endpoint_to_url=1",
{credentials:"include",method:"POST",body:b}).then(d=>d.ok?d.json().then(e=>{if(!e.successful_conversion)return Promise.resolve();a.payload.chrome.postedEndpoint&&fb(a.payload.chrome.postedEndpoint);return gb(a,e.url)}).catch(()=>Promise.resolve()):Promise.resolve())})}
function gb(a,b){a.deviceId&&Y("DeviceId",a.deviceId);a.timestampSec&&hb(a.timestampSec);const c=a.payload.chrome;return self.registration.showNotification(c.title,{body:c.body,icon:c.iconUrl,data:{nav:b,id:c.notificationId,attributionTag:c.attributionTag,clickEndpoint:c.clickEndpoint},tag:c.title+c.body+c.iconUrl,requireInteraction:!0}).then(()=>{ib(a.displayCap)}).catch(()=>{})}
function fb(a){{const b=new FormData;b.append("record_notification_interactions_endpoint",JSON.stringify(a));return fetch("/notifications_ajax?action_record_notification_interactions=1",{credentials:"include",method:"POST",body:b})}}
function jb(){return Promise.all([Z("TimestampLowerBound"),kb(),Z("DeviceId")]).then(([a,b,c])=>{if(!a)return Promise.reject(null);a={credentials:"include",method:"POST",body:lb({endpoint:b,deviceId:c,ts:a})};return fetch("/notifications_ajax?action_get_notifications=1",a).then(mb)})}
function mb(a){return a.ok?a.json().then(nb).catch(()=>{}):Promise.resolve()}
function nb(a){if(a.errors)return Promise.reject(a.errors);a.device_id&&Y("DeviceId",a.device_id);a.ts&&hb(a.ts);if(a.notifications){const b=[];a.notifications.forEach(c=>{b.push(self.registration.showNotification(c.title,{body:c.message,icon:c.iconUrl,data:{nav:c.nav,id:c.id,attributionTag:c.attributionTag,clickEndpoint:{}},tag:c.title+c.message+c.iconUrl,requireInteraction:c.requireInteraction}))});
return Ta(b).then(()=>{ib(a.display_cap)})}return Promise.resolve()}
function ib(a){-1!==a&&self.registration.getNotifications().then(b=>{for(let c=0;c<b.length-a;c++)b[c].close()})}
function ob(a){const b=[pb(a),Z("RegistrationTimestamp").then(qb),rb(),sb(),tb()];Promise.all(b).catch(()=>{Y("IDToken",a);ub();return Promise.resolve()})}
function qb(a){return 9E7>=Date.now()-(a||0)?Promise.resolve():Promise.reject()}
function pb(a){return Z("IDToken").then(b=>a===b?Promise.resolve():Promise.reject())}
function rb(){return Z("Permission").then(a=>Notification.permission===a?Promise.resolve():Promise.reject())}
function sb(){return Z("Endpoint").then(a=>kb().then(b=>a===b?Promise.resolve():Promise.reject()))}
function tb(){return Z("application_server_key").then(a=>vb().then(b=>a===b?Promise.resolve():Promise.reject()))}
function ub(){Y("RegistrationTimestamp",0);Promise.all([kb(),wb(),xb(),vb()]).then(([a,b,c,d])=>{b=b?Ua(b):null;c=c?Ua(c):null;if(d){d=new Uint8Array(d);var e=4;void 0===e&&(e=0);if(!G){G={};for(var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),g=["+/=","+/","-_=","-_.","-_"],h=0;5>h;h++){var k=f.concat(g[h].split(""));ta[h]=k;for(var p=0;p<k.length;p++){var v=k[p];void 0===G[v]&&(G[v]=p)}}}e=ta[e];f=[];for(g=0;g<d.length;g+=3){var K=d[g],C=(h=g+1<d.length)?d[g+1]:0;
v=(k=g+2<d.length)?d[g+2]:0;p=K>>2;K=(K&3)<<4|C>>4;C=(C&15)<<2|v>>6;v&=63;k||(v=64,h||(C=64));f.push(e[p],e[K],e[C]||"",e[v]||"")}d=f.join("")}else d=null;yb(a,b,c,d)}).catch(()=>{yb()})}
function yb(a=null,b=null,c=null,d=null){Xa().then(e=>{e&&(Y("Endpoint",a),Y("P256dhKey",b),Y("AuthKey",c),Y("application_server_key",d),Y("Permission",Notification.permission),Promise.all([Z("DeviceId"),Z("NotificationsDisabled"),zb()]).then(([f,g,h])=>{Ab(a,f,b,c,d,g,h)}))})}
function Ab(a,b,c,d,e,f,g){a={credentials:"include",method:"POST",body:lb({endpoint:a,deviceId:b,A:f,p256dhKey:c,authKey:d,applicationServerKey:e,B:g})};l.fetch("/notifications_ajax?action_register_device=1",a).then(Bb).catch(()=>{})}
function lb(a){const b=new FormData;a.endpoint&&b.append("endpoint",a.endpoint);a.deviceId&&b.append("device_id",a.deviceId);a.ts&&b.append("timestamp_lower_bound",a.ts);a.v&&(b.append("notification_id",a.v.id),b.append("attribution_tag",a.v.attributionTag));a.A&&b.append("notifications_disabled",(!!a.A).toString());a.p256dhKey&&b.append("p256dh_key",a.p256dhKey);a.authKey&&b.append("auth_key",a.authKey);a.applicationServerKey&&b.append("application_server_key",a.applicationServerKey);a.B&&b.append("registration_token",
a.B);b.append("permission",Notification.permission);return b}
function Bb(a){Y("RegistrationTimestamp",Date.now());a.ok&&a.json().then(b=>{b.ts&&hb(b.ts);b.device_id&&Y("DeviceId",b.device_id)}).catch(()=>{})}
function kb(){return self.registration.pushManager.getSubscription().then(a=>a?Promise.resolve(a.endpoint):Promise.resolve(null))}
function wb(){return self.registration.pushManager.getSubscription().then(a=>a&&a.getKey?Promise.resolve(a.getKey("p256dh")):Promise.resolve(null))}
function xb(){return self.registration.pushManager.getSubscription().then(a=>a&&a.getKey?Promise.resolve(a.getKey("auth")):Promise.resolve(null))}
function vb(){return self.registration.pushManager.getSubscription().then(a=>a?Promise.resolve(a.options.applicationServerKey):Promise.resolve(null))}
function zb(){return fetch("/notifications_ajax?action_get_registration_token=1",{credentials:"include",method:"POST"}).then(a=>{if(a.ok)return a.json().then(b=>b.registration_token).catch(()=>{})})}
function hb(a){Y("TimestampLowerBound",a)}
;self.onmessage=function(a){var b=a.data;a=b.type;b=b.data;"notifications_register"===a?(Y("IDToken",b),ub()):"notifications_check_registration"===a&&ob(b)};
self.onnotificationclick=function(a){a.notification.close();const b=a.notification.data,c=self.clients.matchAll({type:"window",includeUncontrolled:!0});c.then(d=>{a:{var e=b.nav;for(const f of d)if(f.url===e){f.focus();break a}self.clients.openWindow(e)}});
a.waitUntil(c);a.waitUntil(fb(b.clickEndpoint))};
self.onpush=function(a){a.waitUntil(Z("NotificationsDisabled").then(b=>{if(b)return Promise.resolve();if(a.data&&a.data.text().length)try{return eb(a.data.json())}catch(c){return Promise.resolve(c.message)}return jb()}));
a.waitUntil(db())};
self.onpushsubscriptionchange=function(){ub()};
self.oninstall=function(a){a.waitUntil(self.skipWaiting())};
self.onactivate=function(a){a.waitUntil(self.clients.claim())};
