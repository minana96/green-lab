
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"30",
  
  "macros":[{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varPageType"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",1],
      "vtp_defaultValue":["template","Not set - ",["macro",1]],
      "vtp_map":["list",["map","key","List - Model","value","Product"],["map","key","List - Model (no result)","value","Product"],["map","key","Model","value","Product"],["map","key","Supermodel","value","Product"],["map","key","Reviews","value","Product"],["map","key","Cart","value","Product"],["map","key","Advice Homepage","value","Advice"],["map","key","List - Advice_category","value","Advice"],["map","key","Advice","value","Advice"],["map","key","List - Blog_category","value","Blog"],["map","key","Blog","value","Blog"],["map","key","Page","value","Other content"],["map","key","Legal_notice","value","Other content"],["map","key","Homepage","value","Homepage"],["map","key","Group - Search","value","Search"],["map","key","List - Search","value","Search"],["map","key","404","value","Various"],["map","key","Contact","value","Various"],["map","key","Tetris_page","value","Tetris"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varAdviceCategory"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",3],8,16],"[0];return a})();"]
    },{
      "function":"__c",
      "vtp_value":"quechua.fr, quechua.co.uk, quechua.es, quechua.it, quechua.pl, quechua.hu, quechua.be, quechua.de, quechua.nl, quechua.pt, quechua.com.br, quechua.com.ru"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"ecommerce"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"shoppingTools"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var e=",["escape",["macro",6],8,16],";if(void 0!=",["escape",["macro",7],8,16],")if(\"Model\"==",["escape",["macro",1],8,16],")for(var b=",["escape",["macro",7],8,16],".split(\",\"),a=0;a\u003Cb.length;a++){var c=b[a].split(\"\\x3d\"),f=c[0].indexOf(",["escape",["macro",6],8,16],".detail.products[0].id);if(-1!=f){e.detail.products[0].dimension10=c[1];break}}else if(\"Cart\"==",["escape",["macro",1],8,16],")for(b=",["escape",["macro",7],8,16],".split(\",\"),a=0;a\u003Cb.length;a++){c=b[a].split(\"\\x3d\");for(var d=0;d\u003C",["escape",["macro",6],8,16],".checkout.products.length;d++)if(f=c[0].indexOf(",["escape",["macro",6],8,16],".checkout.products[d].id),\n-1!=f){e.checkout.products[d].dimension10=c[1];break}}return e})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"currency"
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=\/^\\\/search\\\/content\\\/(.*)\/;if(a.test(",["escape",["macro",10],8,16],"))return\"\/search\/content?q\\x3d\"+a.exec(",["escape",["macro",10],8,16],")[1];if(\"404\"==",["escape",["macro",1],8,16],")return\"\/page404\/?url\\x3d\"+",["escape",["macro",11],8,16],"+\"\\x26ref\\x3d\"+",["escape",["macro",12],8,16],"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varSort"
    },{
      "function":"__smm",
      "vtp_input":["macro",14],
      "vtp_map":["list",["map","key","field_model_price_discount_amount_decimal_1","value","Prix decroissant"],["map","key","field_model_price_discount_amount_decimal","value","Prix croissant"],["map","key","field_model_note","value","Note decroissant"],["map","key","smartqueue_weight","value","Ordre manuel"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varFacet"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",16],
      "vtp_defaultValue":["macro",16],
      "vtp_map":["list",["map","key","Bénéfice utilisateur : titre","value","Bénéfices utilisateurs"],["map","key","Concept technique : titre","value","Technologies"],["map","key","Concept : titre","value","Technologies"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varPageNumber"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varRichContent"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varCrosselling"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varPanoply"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varLinkedContent"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"varRating"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"contentTools"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varAdviceId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varBlogId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varBasicPageId"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varTetrisPageId"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var clearContent=undefined;if(",["escape",["macro",24],8,16],"!=undefined)if(",["escape",["macro",1],8,16],"==\"Advice\"||\"Blog\"||\"Page\"||\"Tetris_page\"){var table=",["escape",["macro",24],8,16],".split(\",\");for(var i=0;i\u003Ctable.length;i++){var tableSplit=table[i].split(\"\\x3d\");var result=tableSplit[0];if(",["escape",["macro",1],8,16],"==\"Advice\")var source=",["escape",["macro",25],8,16],";else if(",["escape",["macro",1],8,16],"==\"Blog\")var source=",["escape",["macro",26],8,16],";else if(",["escape",["macro",1],8,16],"==\"Page\")var source=",["escape",["macro",27],8,16],";else if(",["escape",["macro",1],8,16],"==\n\"Tetris_page\")var source=",["escape",["macro",28],8,16],";if(result==source){var clearContent=tableSplit[1];break}}}return clearContent})();"]
    },{
      "function":"__c",
      "vtp_value":"UA-18952896-1"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"eventAction"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"eventLabel"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_name":"eventCategory"
    },{
      "function":"__c",
      "vtp_value":"UA-62613805-1"
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",35],
      "vtp_defaultValue":"no",
      "vtp_map":["list",["map","key","www.quechua.com.ru","value","yes"],["map","key","www.quechua.com.tr","value","yes"],["map","key","www.quechua.com.br","value","yes"]]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){if(\"yes\"==",["escape",["macro",36],8,16],")return!0;var a=document.cookie;a=a.indexOf(\"cookie-agreed-\");return-1!=a})();"]
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",35],
      "vtp_defaultValue":"error",
      "vtp_map":["list",["map","key","www.quechua.be","value","YT-000067-1"],["map","key","nl.quechua.be","value","YT-000067-1"],["map","key","www.quechua.com.br","value","YT-000049-1"],["map","key","www.quechua.com.cn","value","YT-000044-1"],["map","key","www.quechua.de","value","YT-000068-1"],["map","key","www.quechua.es","value","YT-000070-1"],["map","key","www.quechua.fr","value","YT-000003-1"],["map","key","www.quechua.hu","value","YT-000055-1"],["map","key","www.quechua.it","value","YT-000071-1"],["map","key","www.quechua.nl","value","YT-000066-1"],["map","key","www.quechua.pl","value","YT-000072-1"],["map","key","www.quechua.ru","value","YT-000073-1"],["map","key","www.quechua.co.uk","value","YT-000069-1"],["map","key","www.quechua.pt","value","YT-000074-1"]]
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",35],
      "vtp_defaultValue":"error",
      "vtp_map":["list",["map","key","www.quechua.be","value","0132"],["map","key","nl.quechua.be","value","0132"],["map","key","www.quechua.com.br","value","0133"],["map","key","www.quechua.com.cn","value","0134"],["map","key","www.quechua.de","value","0135"],["map","key","www.quechua.es","value","0136"],["map","key","www.quechua.fr","value","0137"],["map","key","www.quechua.hu","value","0138"],["map","key","www.quechua.it","value","0139"],["map","key","www.quechua.nl","value","0140"],["map","key","www.quechua.pl","value","0141"],["map","key","www.quechua.ru","value","0143"],["map","key","www.quechua.co.uk","value","0144"],["map","key","www.quechua.pt","value","0142"]]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",6],8,16],".impressions,a=\"\",b=0;b\u003Cc.length;b++){var d=c[b].id;a=\"\"!=a?a+\";\"+d:d}return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",6],8,16],".detail.products[0].id;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",6],8,16],".detail.products[0].name;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",6],8,16],".detail.products[0].price;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",6],8,16],".detail.products[0].category;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",6],8,16],".detail.products[0].variant;return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",6],8,16],".checkout.products,c=0,a=0;a\u003Cb.length;a++){var d=b[a].quantity;c+=d}return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",6],8,16],".checkout.products,a=\"\",b=0;b\u003Cc.length;b++){var d=c[b].id;a=\"\"!=a?a+\";\"+d:d}return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varTetrisUuid"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a;return a=navigator.userAgent.match(\/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)\/gi)?480\u003C=screen.width\u0026\u0026800\u003C=screen.height||800\u003C=screen.width\u0026\u0026480\u003C=screen.height||navigator.userAgent.match(\/ipad\/gi)?\"tablet\":\n\"mobile\":\"desktop\"})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini\/i.test(navigator.userAgent)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"varTetrisType"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",6],8,16],".checkout.products,a=\"\",b=0;b\u003Cc.length;b++){var d=c[b].name;a=\"\"!=a?a+\"|\"+d:d}return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",6],8,16],".checkout.products,a=\"\",b=0;b\u003Cc.length;b++){var d=c[b].price;a=\"\"!=a?a+\"|\"+d:d}return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",6],8,16],".checkout.products,c=0,a=0;a\u003Cb.length;a++){var d=b[a].price,e=b[a].quantity;c+=d*e}return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var c=",["escape",["macro",6],8,16],".checkout.products,a=\"\",b=0;b\u003Cc.length;b++){var d=c[b].quantity;a=\"\"!=a?a+\"|\"+d:d}return a})();"]
    },{
      "function":"__e"
    }],
  "tags":[{
      "function":"__ua",
      "once_per_event":true,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_contentGroup":["list",["map","index","1","group",["macro",2]],["map","index","2","group",["macro",4]]],
      "vtp_autoLinkDomains":["macro",5],
      "vtp_decorateFormsAutoLink":false,
      "vtp_useEcommerceDataLayer":false,
      "vtp_ecommerceMacroData":["macro",8],
      "vtp_setTrackerName":false,
      "vtp_doubleClick":false,
      "vtp_fieldsToSet":["list",["map","fieldName","allowLinker","value","true"],["map","fieldName","anonymizeIp","value","true"],["map","fieldName","cookieDomain","value","auto"],["map","fieldName","currencyCode","value",["macro",9]],["map","fieldName","page","value",["macro",13]]],
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","1","dimension",["macro",1]],["map","index","2","dimension",["macro",15]],["map","index","3","dimension",["macro",17]],["map","index","4","dimension",["macro",18]],["map","index","5","dimension",["macro",19]],["map","index","6","dimension",["macro",20]],["map","index","7","dimension",["macro",21]],["map","index","8","dimension",["macro",22]],["map","index","9","dimension",["macro",23]],["map","index","11","dimension",["macro",29]]],
      "vtp_enableEcommerce":true,
      "vtp_trackingId":["macro",30],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableTransportUrl":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "tag_id":7
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_trackType":"TRACK_SOCIAL",
      "vtp_socialAction":["macro",31],
      "vtp_enableLinkId":false,
      "vtp_socialActionTarget":["macro",32],
      "vtp_socialNetwork":["macro",33],
      "vtp_trackingId":["macro",30],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableTransportUrl":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsSocial":true,
      "tag_id":8
    },{
      "function":"__ua",
      "vtp_nonInteraction":false,
      "vtp_useEcommerceDataLayer":true,
      "vtp_doubleClick":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","currencyCode","value",["macro",9]]],
      "vtp_eventCategory":["macro",33],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_enableLinkId":false,
      "vtp_eventAction":["macro",31],
      "vtp_eventLabel":["macro",32],
      "vtp_enableEcommerce":true,
      "vtp_trackingId":["macro",30],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableTransportUrl":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":9
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_eventCategory":["macro",33],
      "vtp_trackType":"TRACK_EVENT",
      "vtp_enableLinkId":false,
      "vtp_eventAction":["macro",31],
      "vtp_eventLabel":["macro",32],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",30],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableTransportUrl":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":10
    },{
      "function":"__ua",
      "unlimited":true,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_functionName":"webizi",
      "vtp_contentGroup":["list",["map","index","1","group",["macro",2]]],
      "vtp_autoLinkDomains":["macro",5],
      "vtp_decorateFormsAutoLink":false,
      "vtp_setTrackerName":false,
      "vtp_doubleClick":false,
      "vtp_fieldsToSet":["list",["map","fieldName","allowLinker","value","true"],["map","fieldName","anonymizeIp","value","true"],["map","fieldName","cookieDomain","value","auto"],["map","fieldName","page","value",["macro",13]]],
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","1","dimension",["macro",1]],["map","index","2","dimension","Quechua"]],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":["macro",34],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableTransportUrl":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":11
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":16
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar _y_account=\"",["escape",["macro",38],7],"\";\nwindow.ytrackAsyncInit=function(){var a=this._wt1Q||[];window.Ytrack.init({account:_y_account,domain_id:\"",["escape",["macro",39],7],"\",domain_version:\"2\",domain:\"",["escape",["macro",35],7],"\"});a.setTrackAccept(!0);var b=null,c=null;\"\"!==(Ytrack.getParamValue(\"SPMID\")||Ytrack.getParamValue(\"SPMID\",void 0,document.referrer))?(c=Ytrack.getParamValue(\"SPMID\")||Ytrack.getParamValue(\"SPMID\",void 0,document.referrer),b=\"sharedid\"):\"\"!==(Ytrack.getParamValue(\"PMID\")||Ytrack.getParamValue(\"PMID\",void 0,document.referrer))\u0026\u0026\n(c=Ytrack.getParamValue(\"PMID\")||Ytrack.getParamValue(\"PMID\",void 0,document.referrer),b=\"email\");\"undefined\"!=typeof ",["escape",["macro",1],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_env_template\",",["escape",["macro",1],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",15],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_list_sort\",",["escape",["macro",15],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",17],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_varFacet\",",["escape",["macro",17],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",18],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_varPageNumber\",\n",["escape",["macro",18],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",9],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_currency\",",["escape",["macro",9],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",40],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_list_products\",",["escape",["macro",40],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",19],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_varRichContent\",",["escape",["macro",19],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",20],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_varCrosselling\",",["escape",["macro",20],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",21],8,16],"\u0026\u0026\na.push([\"setSessionParam\",\"_varPanoply\",",["escape",["macro",21],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",22],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_varLinkedContent\",",["escape",["macro",22],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",23],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_rating\",",["escape",["macro",23],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",41],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_id_model\",",["escape",["macro",41],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",42],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_name\",",["escape",["macro",42],8,16],"]);\n\"undefined\"!=typeof ",["escape",["macro",43],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_unitprice_ati\",",["escape",["macro",43],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",44],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_nature\",",["escape",["macro",44],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",45],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_product_color\",",["escape",["macro",45],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",46],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_order_products_number\",",["escape",["macro",46],8,16],"]);\"undefined\"==typeof ",["escape",["macro",47],8,16],"\u0026\u0026\na.push([\"setSessionParam\",\"_order_products\",",["escape",["macro",47],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",48],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_advice_id\",",["escape",["macro",48],8,16],"]);\"undefined\"!=typeof ",["escape",["macro",49],8,16],"\u0026\u0026a.push([\"setSessionParam\",\"_device_type\",",["escape",["macro",49],8,16],"]);null!==c\u0026\u0026\"private\"!==c\u0026\u0026(a.push([\"setVisitorParam\",\"_PmId\",c]),a.push([\"setVisitorParam\",\"_PmSrc\",b]));a.push([\"trackPage\",{}])};\n(function(){var a=document.createElement(\"script\");a.id=\"tc_script_553_1\";a.async=!0;a.src=\"\/\/prod-js.aws.y-track.com\/\"+_y_account+\"\/v5\/tracker.min.js\";var b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":12
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003E(function(){var a=document.createElement(\"script\");a.type=\"text\/javascript\";a.async=!0;a.src=(\"https:\"==document.location.protocol?\"https:\/\/\":\"http:\/\/\")+\"bp-1c51.kxcdn.com\/prj\/AS-2314306.js\";var b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)})();\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":14
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cstyle\u003E\n     .bandeau-marques .bandeau-sport:hover {\n         background-color: #0082C3 !important;\n         color: #ffffff;\n         -webkit-transition: all .3s;\n         transition: all .3s;\n     }\n    .bandeau-marques .bandeau-sites .close span{\n        display:block;\n        height:19px;\n        width:20px;\n        float:right;\n        margin:-35px 10px 0 0;\n        background-image:url(\"https:\/\/www.domyos.fr\/sites\/domyos\/files\/archive_0\/close.png\");\n        cursor:pointer;\n    }\n  \na img{\n         padding: 0 0 4px 0;   \n     }\n  \n    .bandeau-marques .owl-item a{\n        text-decoration:none;\n        color:#212121;\n        background-color:#ffffff;\n        padding:5px 5px;\n        height:160px;\n        -moz-box-sizing: initial;\n        -webkit-box-sizing: initial;\n        box-sizing: initial;\n        width:110px;\n        border:2px solid #ffffff;\n        display:block;\n        font-size:11px;\n        font-family:arial;\n        -webkit-transition:border .3s;\n        transition:border .3s;\n    }\n    .bandeau-marques .owl-item a:hover{\n        border:2px solid #EC6607;\n    }\n    .bandeau-marques .owl-item p{\n        margin:0 0 10px 0;\n        line-height:12px;\n        height:24px;\n        text-align:center;\n    }\n    .bandeau-marques .owl-prev,\n    .bandeau-marques .owl-next{\n        position:absolute;\n        background-color:#0082C3;\n        font-size:0;\n        width:30px;\n        height:174px;\n        top:0;\n        left:-40px;\n    }\n    .bandeau-marques .owl-prev:before,\n    .bandeau-marques .owl-next:before{\n        content:\"\";\n        display:block;\n        background-image:url(\"https:\/\/www.domyos.fr\/sites\/domyos\/files\/archive_0\/close.png\");\n        width:10px;\n        height:19px;\n        position:absolute;\n        left:10px;\n        top:77px;\n    }\n    .bandeau-marques .owl-prev:before{\n        -ms-transform:rotate(180deg);\n        -webkit-transform:rotate(180deg);\n        transform:rotate(180deg);\n    }\n    .bandeau-marques .owl-next{\n        right:-40px;\n        left:inherit;\n    }\n\u003C\/style\u003E\n\n\u003Clink rel=\"stylesheet\" href=\"https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/owl-carousel\/1.32\/owl.carousel.min.css\"\u003E\n\n\u003Cdiv class=\"bandeau-marques\" style=\"background-color:#ffffff;\"\u003E\n    \u003Cdiv class=\"content\" style=\"width:940px;margin:auto;font-family:arial;color:#545452;font-size:12px;height:35px;\"\u003E\n        \u003Cdiv class=\"text\" style=\"float:left;line-height:35px;margin-right:10px;\"\u003E\n            \u003Cspan\u003EProduits vendus en exclusivité chez\u003C\/span\u003E\n        \u003C\/div\u003E\n        \u003Cdiv class=\"bandeau-logo\" style=\"float:left;height:29px;width:auto;margin:3px 0 0 0;\"\u003E\n            \u003Ca onclick=\"bandeauEvent(\u0026quot;Decathlon\u0026quot;);\" href=\"https:\/\/www.decathlon.fr?utm_medium=referral_internal\u0026amp;utm_source=pb_quechua\u0026amp;utm_campaign=logo_header\" target=\"_blank\" style=\"display:block;cursor:pointer;\"\u003E\n                \u003Cimg src=\"https:\/\/www.domyos.fr\/sites\/domyos\/files\/decathlon.jpg\" style=\"height:29px;width:auto;border:none;\"\u003E\n            \u003C\/a\u003E\n        \u003C\/div\u003E\n        \u003Cdiv class=\"bandeau-sport\" style=\"position:relative;float:right;padding:0 10px 0 10px;border-radius:5px;top:5px;line-height:25px;background-color:#cccccc;cursor:pointer;\"\u003E\n            \u003Cspan onclick=\"bandeauEvent(\u0026quot;Open brand list\u0026quot;);\"\u003E▼ Découvrez nos autres sports\u003C\/span\u003E\n        \u003C\/div\u003E\n        \u003Cdiv class=\"clear\" style=\"clear:both;\"\u003E\u003C\/div\u003E\n    \u003C\/div\u003E\n    \u003Cdiv class=\"bandeau-sites\" style=\"position:relative;display:none;background-color:#004876;padding:50px 50px 20px 50px;height:172px;-moz-box-sizing:initial;-webkit-box-sizing:initial;box-sizing:initial;\"\u003E\n        \u003Cdiv class=\"close\" style=\"margin:0 auto;height:0px;width:910px;position:relative;\"\u003E\u003Cspan\u003E\u003C\/span\u003E\u003C\/div\u003E\n        \u003Cdiv class=\"slide-sites\" style=\"min-with:940px;\"\u003E\u003C\/div\u003E\n    \u003C\/div\u003E\n\u003C\/div\u003E\n\n\u003Cscript type=\"text\/gtmscript\"\u003Evar html=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Aptonia\\x26quot;);' href\\x3d'https:\/\/www.aptonia.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1323340\/110x0\/1cr1\/aptonia_thumb.png' alt\\x3d'Aptonia'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eAPTONIA\\x3c\/b\\x3e\\x3c\/br\\x3eTriathlon\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Artengo\\x26quot;);' href\\x3d'https:\/\/www.artengo.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1192520\/110x0\/1cr1\/image.png' alt\\x3d'Artengo'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eARTENGO\\x3c\/b\\x3e\\x3c\/br\\x3eSports de raquette\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Caperlan\\x26quot;);' href\\x3d'https:\/\/www.caperlan.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1345123\/110x0\/1cr1\/image.png' alt\\x3d'Artengo'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eCAPERLAN\\x3c\/b\\x3e\\x3c\/br\\x3eP\\u00eache\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Domyos\\x26quot;);' href\\x3d'https:\/\/www.domyos.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1247061\/110x0\/1cr1\/image.png' alt\\x3d'Domyos'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eDOMYOS\\x3c\/b\\x3e\\x3c\/br\\x3eFitness et danse\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Forclaz\\x26quot;);' href\\x3d'https:\/\/www.forclaz.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1287623\/110x0\/1cr1\/image.png' alt\\x3d'Domyos'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eFORCLAZ\\x3c\/b\\x3e\\x3c\/br\\x3eTrekking\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Fouganza\\x26quot;);' href\\x3d'https:\/\/www.fouganza.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1224060\/110x0\/1cr1\/image.png' alt\\x3d'Fouganza'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eFOUGANZA\\x3c\/b\\x3e\\x3c\/br\\x3eEquitation\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Geologic\\x26quot;);' href\\x3d'https:\/\/www.geologic.org' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1211791\/110x0\/1cr1\/image.png' alt\\x3d'Geologic'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eGEOLOGIC\\x3c\/b\\x3e\\x3c\/br\\x3eSports de pr\\u00e9cision\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Geonaute\\x26quot;);' href\\x3d'https:\/\/www.geonaute.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p876442\/110x0\/1cr1\/image.png' alt\\x3d'Geonaute'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eGEONAUTE\\x3c\/b\\x3e\\x3c\/br\\x3eProduits \\u00e9lectroniques\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Inesis\\x26quot;);' href\\x3d'https:\/\/www.inesis.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1202301\/110x0\/1cr1\/inesis_thumb.png' alt\\x3d'Inesis'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eINESIS\\x3c\/b\\x3e\\x3c\/br\\x3eEquipements de golf\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Itiwit\\x26quot;);' href\\x3d'https:\/\/www.itiwit.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1159793\/110x0\/1cr1\/image.png' alt\\x3d'Itiwit'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eITIWIT\\x3c\/b\\x3e\\x3c\/br\\x3eKayak \\x26 StandUp Paddle\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Kalenji\\x26quot;);' href\\x3d'https:\/\/www.kalenji.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1227938\/110x0\/1cr1\/image.png' alt\\x3d'Kalenji'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eKALENJI\\x3c\/b\\x3e\\x3c\/br\\x3eRunning et trail\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Kipsta\\x26quot;);' href\\x3d'https:\/\/www.kipsta.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1422985\/110x0\/1cr1\/image.png' alt\\x3d'Kipsta'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eKIPSTA\\x3c\/b\\x3e\\x3c\/br\\x3eFootball\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Nabaiji\\x26quot;);' href\\x3d'https:\/\/www.nabaiji.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1313928\/110x0\/1cr1\/image.png' alt\\x3d'Nabaiji'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eNABAIJI\\x3c\/b\\x3e\\x3c\/br\\x3eNatation\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Newfeel\\x26quot;);' href\\x3d'https:\/\/www.newfeel.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1421960\/110x0\/1cr1\/image.png' alt\\x3d'Newfeel'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eNEWFEEL\\x3c\/b\\x3e\\x3c\/br\\x3eMarche\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Olaian\\x26quot;);' href\\x3d'https:\/\/www.olaian.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1159939\/110x0\/1cr1\/image.png' alt\\x3d'Olaian'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eOLAIAN\\x3c\/b\\x3e\\x3c\/br\\x3eSports de vague\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Oxelo\\x26quot;);' href\\x3d'https:\/\/www.oxelo.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1264500\/110x0\/1cr1\/image.png' alt\\x3d'Oxelo'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eOXELO\\x3c\/b\\x3e\\x3c\/br\\x3eTrotinette, skateboard et roller\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Quechua\\x26quot;);' href\\x3d'https:\/\/www.quechua.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1423035\/110x0\/1cr1\/image.png' alt\\x3d'Quechua'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eQUECHUA\\x3c\/b\\x3e\\x3c\/br\\x3eRandonn\\u00e9e et camping\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Simond\\x26quot;);' href\\x3d'https:\/\/www.simond.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1151123\/110x0\/1cr1\/image.png' alt\\x3d'Simond'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eSIMOND\\x3c\/b\\x3e\\x3c\/br\\x3eEscalade\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Solognac\\x26quot;);' href\\x3d'https:\/\/www.solognac.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p36726\/110x0\/1cr1\/image.png' alt\\x3d'Solognac'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eSOLOGNAC\\x3c\/b\\x3e\\x3c\/br\\x3eChasse\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Subea\\x26quot;);' href\\x3d'https:\/\/www.subea.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1346435\/110x0\/1cr1\/image.png' alt\\x3d'Subea'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eSUBEA\\x3c\/b\\x3e\\x3c\/br\\x3ePlong\\u00e9e\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nhtml+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Tribord\\x26quot;);' href\\x3d'https:\/\/www.tribord.tm.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p1268137\/110x0\/1cr1\/image.png' alt\\x3d'Tribord'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eTRIBORD\\x3c\/b\\x3e\\x3c\/br\\x3eEquipements nautique\\x3c\/p\\x3e\\x3c\/a\\x3e\";html+=\"\\x3ca onclick\\x3d'bandeauEvent(\\x26quot;Wedze\\x26quot;);' href\\x3d'https:\/\/www.wedze.fr' target\\x3d'_blank'\\x3e\\x3cimg src\\x3d'https:\/\/contents.mediadecathlon.com\/p224392\/110x0\/1cr1\/image.png' alt\\x3d'Wedze'\/\\x3e\\x3c\/br\\x3e\\x3cp\\x3e\\x3cb\\x3eWEDZE\\x3c\/b\\x3e\\x3c\/br\\x3eSki et snowboard\\x3c\/p\\x3e\\x3c\/a\\x3e\";\nvar cpt=0;jQuery(\".bandeau-sport\").click(function(){0==cpt\u0026\u0026(jQuery(\".slide-sites\").append(html),html=\"\");jQuery(\".bandeau-sites\").slideToggle(\"slow\");0==cpt\u0026\u0026jQuery.ajax({url:\"https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/owl-carousel\/1.32\/owl.carousel.min.js\",dataType:\"script\",cache:!0,async:!0,success:function(){jQuery(\".slide-sites\").owlCarousel({pagination:!1,navigation:!0,scrollPerPage:!0,itemsCustom:[[0,6],[1E3,7],[1300,8],[1400,9],[1500,10]]})}});cpt=1});jQuery(\".bandeau-sites .close span\").click(function(){jQuery(\".bandeau-sport\").trigger(\"click\")});\nfunction bandeauEvent(a){dataLayer.push({event:\"BandeauEvent\",eventCategory:\"Bandeau\",eventAction:\"click\",eventLabel:a})}jQuery(\"#section-header\").prepend(jQuery(\".bandeau-marques\"));\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":15
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Evar spconfig={public_key:\"33313037b732b052dfd1cd7fb0fa2593967ca7a150d6c15039f7fb1301\",debug:!1,set_cookie:!0,track_order_enabled:!0};function loadSpreadTracker(){window.domLoadEventFired=!0;var a=document.createElement(\"script\");a.type=\"text\/javascript\";a.async=!0;a.charset=\"UTF-8\";a.id=\"spread-tracker\";a.src=\"\/\/static-sb.com\/js\/sb-tracker.js\";document.body.appendChild(a)}\nwindow.addEventListener?window.addEventListener(\"load\",loadSpreadTracker,!1):window.attachEvent?window.attachEvent(\"onload\",loadSpreadTracker):window.onload=loadSpreadTracker;\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":17
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":" ",
      "vtp_supportDocumentWrite":true,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "vtp_usePostscribe":true,
      "tag_id":18
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"https:\/\/decathlon-ttpx.com\/de\/dequ19\/dequ19p6-home\/home-script.js\"\u003E\u003C\/script\u003E\n\u003Clink type=\"text\/css\" rel=\"stylesheet\" href=\"https:\/\/decathlon-ttpx.com\/de\/dequ19\/dequ19p6-home\/tpx-styles.css\"\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":19
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\u003Cscript async type=\"text\/gtmscript\"\u003E(function(f,c,d,e,a,b){a=c.createElement(d);b=c.getElementsByTagName(d)[0];a.async=1;a.src=e;a.dataset.sumoSiteId=\"cd38b8433c1a71bb5f716b15b4331cdd17ac5e71d276076313cee4b4aa06e555\";b.parentNode.insertBefore(a,b)})(window,document,\"script\",\"\/\/load.sumo.com\/\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":102
    }],
  "predicates":[{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"gtm.js"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"SocialEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"GACommerceEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"ColorEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"GAEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"HotspotEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"NavigationEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"PromotedEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"BannerEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"ProductImageEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"RichContentEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"SearchEvent"
    },{
      "function":"_eq",
      "arg0":["macro",0],
      "arg1":"ReferenceEvent"
    },{
      "function":"_eq",
      "arg0":["macro",35],
      "arg1":"www.quechua.fr"
    },{
      "function":"_cn",
      "arg0":["macro",37],
      "arg1":"true"
    },{
      "function":"_eq",
      "arg0":["macro",50],
      "arg1":"true"
    },{
      "function":"_cn",
      "arg0":["macro",51],
      "arg1":"Homepage"
    }],
  "rules":[
    [["if",0],["add",0,4,7,10,11]],
    [["if",1],["add",1]],
    [["if",2],["add",2]],
    [["if",3],["add",3]],
    [["if",4],["add",3]],
    [["if",5],["add",3]],
    [["if",6],["add",3]],
    [["if",7],["add",3]],
    [["if",8],["add",3]],
    [["if",9],["add",3]],
    [["if",10],["add",3]],
    [["if",11],["add",3]],
    [["if",12],["add",3]],
    [["if",0,13],["add",5,8,12]],
    [["if",0,14],["add",6]],
    [["if",0,16],["add",9]],
    [["if",0,15],["block",8]]]
},
"runtime":[]




};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var aa,ba="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},da;if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={Nf:!0},ha={};try{ha.__proto__=fa;ea=ha.Nf;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}
var ia=da,ja=function(a,b){a.prototype=ba(b.prototype);a.prototype.constructor=a;if(ia)ia(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c]},la=this||self,na=/^[\w+/_-]+[=]{0,2}$/,oa=null,pa=function(a,b){function c(){}c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a},qa=function(a){return a};var sa=function(){},ta=function(a){return"function"==typeof a},g=function(a){return"string"==typeof a},ua=function(a){return"number"==typeof a&&!isNaN(a)},wa=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},xa=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},ya=function(a,b){if(a&&wa(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},za=function(a,b){if(!ua(a)||
!ua(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},Ba=function(a,b){for(var c=new Aa,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},Ca=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},Da=function(a){return Math.round(Number(a))||0},Ea=function(a){return"false"==String(a).toLowerCase()?!1:!!a},Fa=function(a){var b=[];if(wa(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},Ga=function(a){return a?
a.replace(/^\s+|\s+$/g,""):""},Ha=function(){return(new Date).getTime()},Aa=function(){this.prefix="gtm.";this.values={}};Aa.prototype.set=function(a,b){this.values[this.prefix+a]=b};Aa.prototype.get=function(a){return this.values[this.prefix+a]};
var Ia=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ja=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},Ka=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},La=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Ma=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},Na=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c},Oa=function(a){var b=
[];Ca(a,function(c,d){10>c.length&&d&&b.push(c)});return b.join(",")};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Pa=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Qa=function(a){if(null==a)return String(a);var b=Pa.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Ra=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Sa=function(a){if(!a||"object"!=Qa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Ra(a,"constructor")&&!Ra(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Ra(a,b)},m=function(a,b){var c=b||("array"==Qa(a)?[]:{}),d;for(d in a)if(Ra(a,d)){var e=a[d];"array"==Qa(e)?("array"!=Qa(c[d])&&(c[d]=[]),c[d]=m(e,c[d])):Sa(e)?(Sa(c[d])||(c[d]={}),c[d]=m(e,c[d])):c[d]=e}return c};var Ta=function(a){if(void 0==a||wa(a)||Sa(a))return!0;switch(typeof a){case "boolean":case "number":case "string":case "function":return!0}return!1};
var Va=[],Wa={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Xa=function(a){return Wa[a]},Ya=/[\x00\x22\x26\x27\x3c\x3e]/g;var bb=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,cb={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},db=function(a){return cb[a]};Va[7]=function(a){return String(a).replace(bb,db)};
Va[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace(bb,db)+"'"}};var mb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,pb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},qb=function(a){return pb[a]};Va[16]=function(a){return a};var sb;
var tb=[],ub=[],vb=[],wb=[],xb=[],yb={},zb,Ab,Bb,Cb=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=yb[c],e={},f;for(f in a)a.hasOwnProperty(f)&&0===f.indexOf("vtp_")&&(d&&b&&b.de&&b.de(a[f]),e[void 0!==d?f:f.substr(4)]=a[f]);return void 0!==d?d(e):sb(c,e,b)},Gb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=Fb(a[e],b,c));return d},Hb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";
var c=yb[b];return c?c.priorityOverride||0:0},Fb=function(a,b,c){if(wa(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(Fb(a[e],b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=tb[f];if(!h||b.jd(h))return;c[f]=!0;try{var k=Gb(h,b,c);k.vtp_gtmEventId=b.id;d=Cb(k,b);Bb&&(d=Bb.ng(d,k))}catch(y){b.Ae&&b.Ae(y,Number(f)),d=!1}c[f]=!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[Fb(a[l],b,c)]=Fb(a[l+1],b,c);return d;case "template":d=
[];for(var p=!1,n=1;n<a.length;n++){var r=Fb(a[n],b,c);Ab&&(p=p||r===Ab.Ob);d.push(r)}return Ab&&p?Ab.qg(d):d.join("");case "escape":d=Fb(a[1],b,c);if(Ab&&wa(a[1])&&"macro"===a[1][0]&&Ab.Sg(a))return Ab.oh(d);d=String(d);for(var t=2;t<a.length;t++)Va[a[t]]&&(d=Va[a[t]](d));return d;case "tag":var q=a[1];if(!wb[q])throw Error("Unable to resolve tag reference "+q+".");return d={me:a[2],index:q};case "zb":var u={arg0:a[2],arg1:a[3],ignore_case:a[5]};u["function"]=a[1];var v=Ib(u,b,c),w=!!a[4];return w||
2!==v?w!==(1===v):null;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},Ib=function(a,b,c){try{return zb(Gb(a,b,c))}catch(d){JSON.stringify(a)}return 2};var Jb=function(){var a=function(b){return{toString:function(){return b}}};return{cf:a("consent"),Jd:a("convert_case_to"),Kd:a("convert_false_to"),Ld:a("convert_null_to"),Md:a("convert_true_to"),Nd:a("convert_undefined_to"),Lh:a("debug_mode_metadata"),qa:a("function"),lf:a("instance_name"),rf:a("live_only"),tf:a("malware_disabled"),uf:a("metadata"),Nh:a("original_vendor_template_id"),yf:a("once_per_event"),Pd:a("once_per_load"),Td:a("setup_tags"),Ud:a("tag_id"),Vd:a("teardown_tags")}}();var Kb=null,Nb=function(a){function b(r){for(var t=0;t<r.length;t++)d[r[t]]=!0}var c=[],d=[];Kb=Lb(a);for(var e=0;e<ub.length;e++){var f=ub[e],h=Mb(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}for(var p=[],n=0;n<wb.length;n++)c[n]&&!d[n]&&(p[n]=!0);return p},Mb=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=Kb(b[c]);if(0===d)return!1;if(2===d)return null}for(var e=a.unless||[],f=0;f<e.length;f++){var h=Kb(e[f]);if(2===h)return null;
if(1===h)return!1}return!0},Lb=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Ib(vb[c],a));return b[c]}};var Ob={ng:function(a,b){b[Jb.Jd]&&"string"===typeof a&&(a=1==b[Jb.Jd]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(Jb.Ld)&&null===a&&(a=b[Jb.Ld]);b.hasOwnProperty(Jb.Nd)&&void 0===a&&(a=b[Jb.Nd]);b.hasOwnProperty(Jb.Md)&&!0===a&&(a=b[Jb.Md]);b.hasOwnProperty(Jb.Kd)&&!1===a&&(a=b[Jb.Kd]);return a}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var jc,mc=function(){};(function(){function a(k,l){k=k||"";l=l||{};for(var p in b)b.hasOwnProperty(p)&&(l.$f&&(l["fix_"+p]=!0),l.oe=l.oe||l["fix_"+p]);var n={comment:/^\x3c!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},r={comment:function(){var q=k.indexOf("--\x3e");if(0<=q)return{content:k.substr(4,q),length:q+3}},endTag:function(){var q=k.match(d);if(q)return{tagName:q[1],length:q[0].length}},atomicTag:function(){var q=r.startTag();
if(q){var u=k.slice(q.length);if(u.match(new RegExp("</\\s*"+q.tagName+"\\s*>","i"))){var v=u.match(new RegExp("([\\s\\S]*?)</\\s*"+q.tagName+"\\s*>","i"));if(v)return{tagName:q.tagName,S:q.S,content:v[1],length:v[0].length+q.length}}}},startTag:function(){var q=k.match(c);if(q){var u={};q[2].replace(e,function(v,w,y,x,A){var B=y||x||A||f.test(w)&&w||null,z=document.createElement("div");z.innerHTML=B;u[w]=z.textContent||z.innerText||B});return{tagName:q[1],S:u,Gb:!!q[3],length:q[0].length}}},chars:function(){var q=
k.indexOf("<");return{length:0<=q?q:k.length}}},t=function(){for(var q in n)if(n[q].test(k)){var u=r[q]();return u?(u.type=u.type||q,u.text=k.substr(0,u.length),k=k.slice(u.length),u):null}};l.oe&&function(){var q=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,u=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,v=[];v.ye=function(){return this[this.length-1]};v.ld=function(z){var D=this.ye();return D&&D.tagName&&D.tagName.toUpperCase()===z.toUpperCase()};v.mg=
function(z){for(var D=0,F;F=this[D];D++)if(F.tagName===z)return!0;return!1};var w=function(z){z&&"startTag"===z.type&&(z.Gb=q.test(z.tagName)||z.Gb);return z},y=t,x=function(){k="</"+v.pop().tagName+">"+k},A={startTag:function(z){var D=z.tagName;"TR"===D.toUpperCase()&&v.ld("TABLE")?(k="<TBODY>"+k,B()):l.Wh&&u.test(D)&&v.mg(D)?v.ld(D)?x():(k="</"+z.tagName+">"+k,B()):z.Gb||v.push(z)},endTag:function(z){v.ye()?l.Ag&&!v.ld(z.tagName)?x():v.pop():l.Ag&&(y(),B())}},B=function(){var z=k,D=w(y());k=z;if(D&&
A[D.type])A[D.type](D)};t=function(){B();return w(y())}}();return{append:function(q){k+=q},uh:t,ci:function(q){for(var u;(u=t())&&(!q[u.type]||!1!==q[u.type](u)););},clear:function(){var q=k;k="";return q},di:function(){return k},stack:[]}}var b=function(){var k={},l=this.document.createElement("div");l.innerHTML="<P><I></P></I>";k.hi="<P><I></P></I>"!==l.innerHTML;l.innerHTML="<P><i><P></P></i></P>";k.gi=2===l.childNodes.length;return k}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i;a.m=b;a.I=function(k){var l={comment:function(p){return"<--"+p.content+"--\x3e"},endTag:function(p){return"</"+p.tagName+">"},atomicTag:function(p){return l.startTag(p)+p.content+l.endTag(p)},startTag:function(p){var n="<"+p.tagName,r;for(r in p.S){var t=p.S[r];n+=
" "+r+'="'+(t?t.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"'}return n+(p.Gb?"/>":">")},chars:function(p){return p.text}};return l[k.type](k)};a.i=function(k){var l={},p;for(p in k){var n=k[p];l[p]=n&&n.replace(/(^|[^\\])"/g,'$1\\"')}return l};for(var h in b)a.h=a.h||!b[h]&&h;jc=a})();(function(){function a(){}function b(r){return void 0!==r&&null!==r}function c(r,t,q){var u,v=r&&r.length||0;for(u=0;u<v;u++)t.call(q,r[u],u)}function d(r,t,q){for(var u in r)r.hasOwnProperty(u)&&t.call(q,u,r[u])}function e(r,
t){d(t,function(q,u){r[q]=u});return r}function f(r,t){r=r||{};d(t,function(q,u){b(r[q])||(r[q]=u)});return r}function h(r){try{return p.call(r)}catch(q){var t=[];c(r,function(u){t.push(u)});return t}}var k={Sf:a,Tf:a,Uf:a,Vf:a,bg:a,cg:function(r){return r},done:a,error:function(r){throw r;},xh:!1},l=this;if(!l.postscribe){var p=Array.prototype.slice,n=function(){function r(q,u,v){var w="data-ps-"+u;if(2===arguments.length){var y=q.getAttribute(w);return b(y)?String(y):y}b(v)&&""!==v?q.setAttribute(w,
v):q.removeAttribute(w)}function t(q,u){var v=q.ownerDocument;e(this,{root:q,options:u,Hb:v.defaultView||v.parentWindow,Sa:v,cc:jc("",{$f:!0}),Wc:[q],vd:"",wd:v.createElement(q.nodeName),Db:[],Ka:[]});r(this.wd,"proxyof",0)}t.prototype.write=function(){[].push.apply(this.Ka,arguments);for(var q;!this.Wb&&this.Ka.length;)q=this.Ka.shift(),"function"===typeof q?this.hg(q):this.Fd(q)};t.prototype.hg=function(q){var u={type:"function",value:q.name||q.toString()};this.rd(u);q.call(this.Hb,this.Sa);this.Ee(u)};
t.prototype.Fd=function(q){this.cc.append(q);for(var u,v=[],w,y;(u=this.cc.uh())&&!(w=u&&"tagName"in u?!!~u.tagName.toLowerCase().indexOf("script"):!1)&&!(y=u&&"tagName"in u?!!~u.tagName.toLowerCase().indexOf("style"):!1);)v.push(u);this.Jh(v);w&&this.Jg(u);y&&this.Kg(u)};t.prototype.Jh=function(q){var u=this.eg(q);u.ae&&(u.gd=this.vd+u.ae,this.vd+=u.sh,this.wd.innerHTML=u.gd,this.Hh())};t.prototype.eg=function(q){var u=this.Wc.length,v=[],w=[],y=[];c(q,function(x){v.push(x.text);if(x.S){if(!/^noscript$/i.test(x.tagName)){var A=
u++;w.push(x.text.replace(/(\/?>)/," data-ps-id="+A+" $1"));"ps-script"!==x.S.id&&"ps-style"!==x.S.id&&y.push("atomicTag"===x.type?"":"<"+x.tagName+" data-ps-proxyof="+A+(x.Gb?" />":">"))}}else w.push(x.text),y.push("endTag"===x.type?x.text:"")});return{ii:q,raw:v.join(""),ae:w.join(""),sh:y.join("")}};t.prototype.Hh=function(){for(var q,u=[this.wd];b(q=u.shift());){var v=1===q.nodeType;if(!v||!r(q,"proxyof")){v&&(this.Wc[r(q,"id")]=q,r(q,"id",null));var w=q.parentNode&&r(q.parentNode,"proxyof");
w&&this.Wc[w].appendChild(q)}u.unshift.apply(u,h(q.childNodes))}};t.prototype.Jg=function(q){var u=this.cc.clear();u&&this.Ka.unshift(u);q.src=q.S.src||q.S.Ph;q.src&&this.Db.length?this.Wb=q:this.rd(q);var v=this;this.Ih(q,function(){v.Ee(q)})};t.prototype.Kg=function(q){var u=this.cc.clear();u&&this.Ka.unshift(u);q.type=q.S.type||q.S.TYPE||"text/css";this.Kh(q);u&&this.write()};t.prototype.Kh=function(q){var u=this.gg(q);this.Pg(u);q.content&&(u.styleSheet&&!u.sheet?u.styleSheet.cssText=q.content:
u.appendChild(this.Sa.createTextNode(q.content)))};t.prototype.gg=function(q){var u=this.Sa.createElement(q.tagName);u.setAttribute("type",q.type);d(q.S,function(v,w){u.setAttribute(v,w)});return u};t.prototype.Pg=function(q){this.Fd('<span id="ps-style"/>');var u=this.Sa.getElementById("ps-style");u.parentNode.replaceChild(q,u)};t.prototype.rd=function(q){q.kh=this.Ka;this.Ka=[];this.Db.unshift(q)};t.prototype.Ee=function(q){q!==this.Db[0]?this.options.error({message:"Bad script nesting or script finished twice"}):
(this.Db.shift(),this.write.apply(this,q.kh),!this.Db.length&&this.Wb&&(this.rd(this.Wb),this.Wb=null))};t.prototype.Ih=function(q,u){var v=this.fg(q),w=this.Ch(v),y=this.options.Sf;q.src&&(v.src=q.src,this.Ah(v,w?y:function(){u();y()}));try{this.Og(v),q.src&&!w||u()}catch(x){this.options.error(x),u()}};t.prototype.fg=function(q){var u=this.Sa.createElement(q.tagName);d(q.S,function(v,w){u.setAttribute(v,w)});q.content&&(u.text=q.content);return u};t.prototype.Og=function(q){this.Fd('<span id="ps-script"/>');
var u=this.Sa.getElementById("ps-script");u.parentNode.replaceChild(q,u)};t.prototype.Ah=function(q,u){function v(){q=q.onload=q.onreadystatechange=q.onerror=null}var w=this.options.error;e(q,{onload:function(){v();u()},onreadystatechange:function(){/^(loaded|complete)$/.test(q.readyState)&&(v(),u())},onerror:function(){var y={message:"remote script failed "+q.src};v();w(y);u()}})};t.prototype.Ch=function(q){return!/^script$/i.test(q.nodeName)||!!(this.options.xh&&q.src&&q.hasAttribute("async"))};
return t}();l.postscribe=function(){function r(){var w=u.shift(),y;w&&(y=w[w.length-1],y.Tf(),w.stream=t.apply(null,w),y.Uf())}function t(w,y,x){function A(F){F=x.cg(F);v.write(F);x.Vf(F)}v=new n(w,x);v.id=q++;v.name=x.name||v.id;var B=w.ownerDocument,z={close:B.close,open:B.open,write:B.write,writeln:B.writeln};e(B,{close:a,open:a,write:function(){return A(h(arguments).join(""))},writeln:function(){return A(h(arguments).join("")+"\n")}});var D=v.Hb.onerror||a;v.Hb.onerror=function(F,J,O){x.error({$h:F+
" - "+J+":"+O});D.apply(v.Hb,arguments)};v.write(y,function(){e(B,z);v.Hb.onerror=D;x.done();v=null;r()});return v}var q=0,u=[],v=null;return e(function(w,y,x){"function"===typeof x&&(x={done:x});x=f(x,k);w=/^#/.test(w)?l.document.getElementById(w.substr(1)):w.Yh?w[0]:w;var A=[w,y,x];w.nh={cancel:function(){A.stream?A.stream.abort():A[1]=a}};x.bg(A);u.push(A);v||r();return w.nh},{streams:{},bi:u,Rh:n})}();mc=l.postscribe}})();var C={Ya:"_ee",Sc:"_syn",Qh:"_uei",Oh:"_pci",Bc:"event_callback",Nb:"event_timeout",ja:"gtag.config"};C.fa="allow_ad_personalization_signals";C.Qc="restricted_data_processing";C.fb="allow_google_signals";C.ba="cookie_expires";C.yc="cookie_update";C.vb="session_duration";C.ma="user_properties";C.Fa="transport_url";C.N="ads_data_redaction";C.o="ad_storage";
C.L="analytics_storage";C.bf="region";C.df="wait_for_update";C.Ue=[C.fa,C.fb,C.yc];C.Ve=[C.ba,C.Nb,C.vb];var nc={},oc=function(a,b){nc[a]=nc[a]||[];nc[a][b]=!0},pc=function(a){for(var b=[],c=nc[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};var qc=function(a){oc("GTM",a)};function rc(a){if(Error.captureStackTrace)Error.captureStackTrace(this,rc);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}pa(rc,Error);rc.prototype.name="CustomError";var sc=function(a,b){for(var c=a.split("%s"),d="",e=c.length-1,f=0;f<e;f++)d+=c[f]+(f<b.length?b[f]:"%s");rc.call(this,d+c[e])};pa(sc,rc);sc.prototype.name="AssertionError";var tc=function(a,b){throw new sc("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var uc=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d},vc=function(a){var b=a;return function(){if(b){var c=b;b=null;c()}}};var wc;var xc=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var yc;a:{var zc=la.navigator;if(zc){var Ac=zc.userAgent;if(Ac){yc=Ac;break a}}yc=""}var Bc=function(a){return-1!=yc.indexOf(a)};var Dc=function(a,b,c){this.h=c===Cc?a:""};Dc.prototype.toString=function(){return"SafeHtml{"+this.h+"}"};var Ec=function(a){if(a instanceof Dc&&a.constructor===Dc)return a.h;var b=typeof a;tc("expected object of type SafeHtml, got '"+a+"' of type "+("object"!=b?b:a?Array.isArray(a)?"array":b:"null"));return"type_error:SafeHtml"},Cc={},Fc=new Dc(la.trustedTypes&&la.trustedTypes.emptyHTML||"",0,Cc);var Gc={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0},Hc=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){if("undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(!a.firstChild)return!1;var c=a.firstChild.firstChild;a.innerHTML=Ec(Fc);return!c.parentElement}),Jc=function(a,b){if(a.tagName&&Gc[a.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+
a.tagName+".");if(Hc())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=Ec(b)};var Kc=function(a){var b;if(void 0===wc){var c=null,d=la.trustedTypes;if(d&&d.createPolicy){try{c=d.createPolicy("goog#html",{createHTML:qa,createScript:qa,createScriptURL:qa})}catch(f){la.console&&la.console.error(f.message)}wc=c}else wc=c}var e=(b=wc)?b.createHTML(a):a;return new Dc(e,null,Cc)};var E=window,G=document,Lc=navigator,Mc=G.currentScript&&G.currentScript.src,Nc=function(a,b){var c=E[a];E[a]=void 0===c?b:c;return E[a]},Oc=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},Pc=function(a,b,c){var d=G.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;Oc(d,b);c&&(d.onerror=c);var e;if(null===oa)b:{var f=la.document,h=f.querySelector&&f.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&na.test(k)){oa=k;break b}}oa=""}e=oa;e&&d.setAttribute("nonce",e);var l=G.getElementsByTagName("script")[0]||G.body||G.head;l.parentNode.insertBefore(d,l);return d},Qc=function(){if(Mc){var a=Mc.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},Rc=function(a,b){var c=G.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=G.body&&G.body.lastChild||
G.body||G.head;d.parentNode.insertBefore(c,d);Oc(c,b);void 0!==a&&(c.src=a);return c},Sc=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},Tc=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},Uc=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},H=function(a){E.setTimeout(a,0)},Vc=function(a,b){return a&&
b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},Wc=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},Xc=function(a){var b=G.createElement("div");Jc(b,Kc("A<div>"+a+"</div>"));b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},Yc=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var f=a,h=0;f&&h<=c;h++){if(d[String(f.tagName).toLowerCase()])return f;
f=f.parentElement}return null},Zc=function(a){Lc.sendBeacon&&Lc.sendBeacon(a)||Sc(a)},$c=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var ad={},bd=function(a){return void 0==ad[a]?!1:ad[a]};var cd=[];function dd(){var a=Nc("google_tag_data",{});a.ics||(a.ics={entries:{},set:ed,update:fd,addListener:gd,notifyListeners:hd,active:!1});return a.ics}
function ed(a,b,c,d,e,f){var h=dd();h.active=!0;if(void 0!=b){var k=h.entries,l=k[a]||{},p=l.region,n=c&&g(c)?c.toUpperCase():void 0;d=d.toUpperCase();e=e.toUpperCase();if(n===e||(n===d?p!==e:!n&&!p)){var r=!!(f&&0<f&&void 0===l.update),t={region:n,initial:"granted"===b,update:l.update,quiet:r};k[a]=t;r&&E.setTimeout(function(){k[a]===t&&t.quiet&&(t.quiet=!1,id(a),hd(),oc("TAGGING",2))},f)}}}
function fd(a,b){var c=dd();c.active=!0;if(void 0!=b){var d=jd(a),e=c.entries,f=e[a]=e[a]||{};f.update="granted"===b;var h=jd(a);f.quiet?(f.quiet=!1,id(a)):h!==d&&id(a)}}function gd(a,b){cd.push({fe:a,Bg:b})}function id(a){for(var b=0;b<cd.length;++b){var c=cd[b];wa(c.fe)&&-1!==c.fe.indexOf(a)&&(c.Ie=!0)}}function hd(a){for(var b=0;b<cd.length;++b){var c=cd[b];if(c.Ie){c.Ie=!1;try{c.Bg({ee:a})}catch(d){}}}}
var jd=function(a){var b=dd().entries[a]||{};return void 0!==b.update?b.update:void 0!==b.initial?b.initial:void 0},kd=function(a){return!(dd().entries[a]||{}).quiet},ld=function(){return bd("gtag_cs_api")?dd().active:!1},md=function(a,b){dd().addListener(a,b)},nd=function(a,b){function c(){for(var e=0;e<b.length;e++)if(!kd(b[e]))return!0;return!1}if(c()){var d=!1;md(b,function(e){d||c()||(d=!0,a(e))})}else a({})},od=function(a,b){if(!1===jd(b)){var c=!1;md([b],function(d){!c&&jd(b)&&(a(d),c=!0)})}};var pd=[C.o,C.L],qd=function(a){var b=a[C.bf];b&&qc(40);var c=a[C.df];c&&qc(41);for(var d=wa(b)?b:[b],e=0;e<d.length;++e)for(var f=0;f<pd.length;f++){var h=pd[f],k=a[pd[f]],l=d[e];dd().set(h,k,l,"NL","NL-NH",c)}},rd=function(a,b){for(var c=0;c<pd.length;c++){var d=pd[c],e=a[pd[c]];dd().update(d,e)}dd().notifyListeners(b)},sd=function(a){var b=jd(a);return void 0!=b?b:!0},td=function(){for(var a=[],b=0;b<pd.length;b++){var c=jd(pd[b]);a[b]=!0===c?"1":!1===c?"0":"-"}return"G1"+
a.join("")},ud=function(a,b){nd(a,b)};var wd=function(a){return vd?G.querySelectorAll(a):null},xd=function(a,b){if(!vd)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!G.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},yd=!1;if(G.querySelectorAll)try{var zd=G.querySelectorAll(":root");zd&&1==zd.length&&zd[0]==G.documentElement&&(yd=!0)}catch(a){}var vd=yd;var Pd={},I=null,Qd=Math.random();Pd.B="GTM-TXK4SW";Pd.Sb="9g1";Pd.Mh="";var Rd={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0},Sd={__paused:!0,__tg:!0},Td;for(Td in Rd)Rd.hasOwnProperty(Td)&&(Sd[Td]=!0);var Ud="www.googletagmanager.com/gtm.js";
var Vd=Ud,Wd=Ea(""),Xd=null,Yd=null,Zd="//www.googletagmanager.com/a?id="+Pd.B+"&cv=30",$d={},ae={},be=function(){var a=I.sequence||1;I.sequence=a+1;return a};
var ce=function(){return"&tc="+wb.filter(function(a){return a}).length},fe=function(){2022<=de().length&&ee()},he=function(){ge||(ge=E.setTimeout(ee,500))},ee=function(){ge&&(E.clearTimeout(ge),ge=void 0);void 0===ie||je[ie]&&!ke&&!le||(me[ie]||ne.Ug()||0>=oe--?(qc(1),me[ie]=!0):(ne.vh(),Sc(de()),je[ie]=!0,pe=qe=re=le=ke=""))},de=function(){var a=ie;if(void 0===a)return"";var b=pc("GTM"),c=pc("TAGGING");return[se,je[a]?"":"&es=1",te[a],b?"&u="+b:"",c?"&ut="+c:"",ce(),ke,le,re?re:"",qe,pe,"&z=0"].join("")},
ue=function(){return[Zd,"&v=3&t=t","&pid="+za(),"&rv="+Pd.Sb].join("")},ve="0.005000">Math.random(),se=ue(),we=function(){se=ue()},je={},ke="",le="",pe="",qe="",re="",ie=void 0,te={},me={},ge=void 0,ne=function(a,b){var c=0,d=0;return{Ug:function(){if(c<a)return!1;Ha()-d>=b&&(c=0);return c>=a},vh:function(){Ha()-d>=b&&(c=0);c++;d=Ha()}}}(2,1E3),oe=1E3,xe=function(a,b){if(ve&&!me[a]&&ie!==a){ee();ie=a;pe=ke="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):"*";te[a]="&e="+c+"&eid="+
a;he()}},ye=function(a,b,c){if(ve&&!me[a]&&b){a!==ie&&(ee(),ie=a);var d,e=String(b[Jb.qa]||"").replace(/_/g,"");0===e.indexOf("cvt")&&(e="cvt");d=e;var f=c+d;ke=ke?ke+"."+f:"&tr="+f;var h=b["function"];if(!h)throw Error("Error: No function name given for function call.");var k=(yb[h]?"1":"2")+d;pe=pe?pe+"."+k:"&ti="+k;he();fe()}},ze=function(a,b,c){if(ve&&!me[a]){a!==ie&&(ee(),ie=
a);var d=c+b;le=le?le+"."+d:"&epr="+d;he();fe()}},Ae=function(a,b,c){};var Be={},Ce=new Aa,De={},Ee={},He={name:"dataLayer",set:function(a,b){m(Na(a,b),De);Fe()},get:function(a){return Ge(a,2)},reset:function(){Ce=new Aa;De={};Fe()}},Ge=function(a,b){if(2!=b){var c=Ce.get(a);ve&&c!==Ie(a.split("."))&&qc(5);return c}return Ie(a.split("."))},Ie=function(a){for(var b=De,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b},Je=function(a,b){Ee.hasOwnProperty(a)||(Ce.set(a,b),m(Na(a,b),De),Fe())},Fe=function(a){Ca(Ee,function(b,c){Ce.set(b,
c);m(Na(b,void 0),De);m(Na(b,c),De);a&&delete Ee[b]})},Ke=function(a,b,c){Be[a]=Be[a]||{};var d=1!==c?Ie(b.split(".")):Ce.get(b);"array"===Qa(d)||"object"===Qa(d)?Be[a][b]=m(d):Be[a][b]=d},Le=function(a,b){if(Be[a])return Be[a][b]},Me=function(a,b){Be[a]&&delete Be[a][b]};var Pe={},Qe=function(a,b){if(E._gtmexpgrp&&E._gtmexpgrp.hasOwnProperty(a))return E._gtmexpgrp[a];void 0===Pe[a]&&(Pe[a]=Math.floor(Math.random()*b));return Pe[a]};var Re=/:[0-9]+$/,Se=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if(decodeURIComponent(f[0]).replace(/\+/g," ")===b){var h=f.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},Ve=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=Te(a.protocol)||Te(E.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:E.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||E.location.hostname).replace(Re,"").toLowerCase());return Ue(a,b,c,d,e)},Ue=function(a,b,c,d,e){var f,h=Te(a.protocol);b&&(b=String(b).toLowerCase());switch(b){case "url_no_fragment":f=We(a);break;case "protocol":f=h;break;case "host":f=a.hostname.replace(Re,"").toLowerCase();if(c){var k=/^www\d*\./.exec(f);k&&k[0]&&(f=f.substr(k[0].length))}break;case "port":f=String(Number(a.port)||("http"==h?80:"https"==h?443:""));break;case "path":a.pathname||a.hostname||oc("TAGGING",
1);f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var l=f.split("/");0<=xa(d||[],l[l.length-1])&&(l[l.length-1]="");f=l.join("/");break;case "query":f=a.search.replace("?","");e&&(f=Se(f,e,void 0));break;case "extension":var p=a.pathname.split(".");f=1<p.length?p[p.length-1]:"";f=f.split("/")[0];break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},Te=function(a){return a?a.replace(":","").toLowerCase():""},We=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");
b=0>c?a.href:a.href.substr(0,c)}return b},Xe=function(a){var b=G.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||oc("TAGGING",1),c="/"+c);var d=b.hostname.replace(Re,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}},Ye=function(a){function b(p){var n=p.split("=")[0];return 0>d.indexOf(n)?p:n+"=0"}function c(p){return p.split("&").map(b).filter(function(n){return void 0!=n}).join("&")}var d="gclid dclid gclaw gcldc gclgp gclha gclgf _gl".split(" "),
e=Xe(a),f=a.split(/[?#]/)[0],h=e.search,k=e.hash;"?"===h[0]&&(h=h.substring(1));"#"===k[0]&&(k=k.substring(1));h=c(h);k=c(k);""!==h&&(h="?"+h);""!==k&&(k="#"+k);var l=""+f+h+k;"/"===l[l.length-1]&&(l=l.substring(0,l.length-1));return l};function Ze(a,b,c){for(var d=[],e=b.split(";"),f=0;f<e.length;f++){var h=e[f].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d};var af=function(a,b,c,d){return $e(d)?Ze(a,String(b||document.cookie),c):[]},df=function(a,b,c,d,e){if($e(e)){var f=bf(a,d,e);if(1===f.length)return f[0].id;if(0!==f.length){f=cf(f,function(h){return h.Xb},b);if(1===f.length)return f[0].id;f=cf(f,function(h){return h.Ab},c);return f[0]?f[0].id:void 0}}};function ef(a,b,c,d){var e=document.cookie;document.cookie=a;var f=document.cookie;return e!=f||void 0!=c&&0<=af(b,f,!1,d).indexOf(c)}
var jf=function(a,b,c){function d(q,u,v){if(null==v)return delete h[u],q;h[u]=v;return q+"; "+u+"="+v}function e(q,u){if(null==u)return delete h[u],q;h[u]=!0;return q+"; "+u}if(!$e(c.Ha))return 2;var f;void 0==b?f=a+"=deleted; expires="+(new Date(0)).toUTCString():(c.encode&&(b=encodeURIComponent(b)),b=ff(b),f=a+"="+b);var h={};f=d(f,"path",c.path);var k;c.expires instanceof Date?k=c.expires.toUTCString():null!=c.expires&&(k=""+c.expires);f=d(f,"expires",k);f=d(f,"max-age",c.Zh);f=d(f,"samesite",
c.ei);c.fi&&(f=e(f,"secure"));var l=c.domain;if("auto"===l){for(var p=gf(),n=0;n<p.length;++n){var r="none"!==p[n]?p[n]:void 0,t=d(f,"domain",r);t=e(t,c.flags);if(!hf(r,c.path)&&ef(t,a,b,c.Ha))return 0}return 1}l&&"none"!==l&&(f=d(f,"domain",l));f=e(f,c.flags);return hf(l,c.path)?1:ef(f,a,b,c.Ha)?0:1},kf=function(a,b,c){null==c.path&&(c.path="/");c.domain||(c.domain="auto");return jf(a,b,c)};
function cf(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function bf(a,b,c){for(var d=[],e=af(a,void 0,void 0,c),f=0;f<e.length;f++){var h=e[f].split("."),k=h.shift();if(!b||-1!==b.indexOf(k)){var l=h.shift();l&&(l=l.split("-"),d.push({id:h.join("."),Xb:1*l[0]||1,Ab:1*l[1]||1}))}}return d}
var ff=function(a){a&&1200<a.length&&(a=a.substring(0,1200));return a},lf=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,mf=/(^|\.)doubleclick\.net$/i,hf=function(a,b){return mf.test(document.location.hostname)||"/"===b&&lf.test(a)},gf=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;mf.test(e)||lf.test(e)||a.push("none");
return a},$e=function(a){if(!bd("gtag_cs_api")||!a||!ld())return!0;if(!kd(a))return!1;var b=jd(a);return null==b?!0:!!b};var nf=function(){for(var a=Lc.userAgent+(G.cookie||"")+(G.referrer||""),b=a.length,c=E.history.length;0<c;)a+=c--^b++;var d=1,e,f,h;if(a)for(d=0,f=a.length-1;0<=f;f--)h=a.charCodeAt(f),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(Ha()/1E3)].join(".")},qf=function(a,b,c,d,e){var f=of(b);return df(a,f,pf(c),d,e)},rf=function(a,b,c,d){var e=""+of(c),f=pf(d);1<f&&(e+="-"+f);return[b,e,a].join(".")},of=function(a){if(!a)return 1;
a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},pf=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};function sf(a,b,c){var d,e=a.xb;null==e&&(e=7776E3);0!==e&&(d=new Date((b||Ha())+1E3*e));return{path:a.path,domain:a.domain,flags:a.flags,encode:!!c,expires:d}};var tf=["1"],uf={},yf=function(a){var b=vf(a.prefix);uf[b]||wf(b,a.path,a.domain)||(xf(b,nf(),a),wf(b,a.path,a.domain))};function xf(a,b,c){var d=rf(b,"1",c.domain,c.path),e=sf(c);e.Ha="ad_storage";kf(a,d,e)}function wf(a,b,c){var d=qf(a,b,c,tf,"ad_storage");d&&(uf[a]=d);return d}function vf(a){return(a||"_gcl")+"_au"};function zf(){for(var a=Af,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Bf(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}var Af,Cf;function Df(a){Af=Af||Bf();Cf=Cf||zf();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,f=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=f>>2,p=(f&3)<<4|h>>4,n=(h&15)<<2|k>>6,r=k&63;e||(r=64,d||(n=64));b.push(Af[l],Af[p],Af[n],Af[r])}return b.join("")}
function Ef(a){function b(l){for(;d<a.length;){var p=a.charAt(d++),n=Cf[p];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(p))throw Error("Unknown base64 encoding at char: "+p);}return l}Af=Af||Bf();Cf=Cf||zf();for(var c="",d=0;;){var e=b(-1),f=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|f>>4);64!=h&&(c+=String.fromCharCode(f<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Ff;var Jf=function(){var a=Gf,b=Hf,c=If(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){Tc(G,"mousedown",d);Tc(G,"keyup",d);Tc(G,"submit",e);var f=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);f.call(this)};c.init=!0}},Kf=function(a,b,c,d,e){var f={callback:a,domains:b,fragment:2===c,placement:c,forms:d,sameHost:e};If().decorators.push(f)},Lf=function(a,b,c){for(var d=If().decorators,e={},f=0;f<d.length;++f){var h=
d[f],k;if(k=!c||h.forms)a:{var l=h.domains,p=a,n=!!h.sameHost;if(l&&(n||p!==G.location.hostname))for(var r=0;r<l.length;r++)if(l[r]instanceof RegExp){if(l[r].test(p)){k=!0;break a}}else if(0<=p.indexOf(l[r])||n&&0<=l[r].indexOf(p)){k=!0;break a}k=!1}if(k){var t=h.placement;void 0==t&&(t=h.fragment?2:1);t===b&&Ka(e,h.callback())}}return e},If=function(){var a=Nc("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var Mf=/(.*?)\*(.*?)\*(.*)/,Nf=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,Of=/^(?:www\.|m\.|amp\.)+/,Pf=/([^?#]+)(\?[^#]*)?(#.*)?/;function Qf(a){return new RegExp("(.*?)(^|&)"+a+"=([^&]*)&?(.*)")}
var Sf=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(Df(String(d))))}var e=b.join("*");return["1",Rf(e),e].join("*")},Rf=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Ff)){for(var e=Array(256),f=0;256>f;f++){for(var h=f,k=0;8>k;k++)h=
h&1?h>>>1^3988292384:h>>>1;e[f]=h}d=e}Ff=d;for(var l=4294967295,p=0;p<c.length;p++)l=l>>>8^Ff[(l^c.charCodeAt(p))&255];return((l^-1)>>>0).toString(36)},Uf=function(){return function(a){var b=Xe(E.location.href),c=b.search.replace("?",""),d=Se(c,"_gl",!0)||"";a.query=Tf(d)||{};var e=Ve(b,"fragment").match(Qf("_gl"));a.fragment=Tf(e&&e[3]||"")||{}}},Vf=function(a){var b=Uf(),c=If();c.data||(c.data={query:{},fragment:{}},b(c.data));var d={},e=c.data;e&&(Ka(d,e.query),a&&Ka(d,e.fragment));return d},Tf=
function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var f=Mf.exec(d);if(f){c=f;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var p=h[2],n=0;n<b;++n)if(p===Rf(k,n)){l=!0;break a}l=!1}if(l){for(var r={},t=k?k.split("*"):[],q=0;q<t.length;q+=2)r[t[q]]=Ef(t[q+1]);return r}}}}catch(u){}};
function Wf(a,b,c,d){function e(n){var r=n,t=Qf(a).exec(r),q=r;if(t){var u=t[2],v=t[4];q=t[1];v&&(q=q+u+v)}n=q;var w=n.charAt(n.length-1);n&&"&"!==w&&(n+="&");return n+p}d=void 0===d?!1:d;var f=Pf.exec(c);if(!f)return"";var h=f[1],k=f[2]||"",l=f[3]||"",p=a+"="+b;d?l="#"+e(l.substring(1)):k="?"+e(k.substring(1));return""+h+k+l}
function Xf(a,b){var c="FORM"===(a.tagName||"").toUpperCase(),d=Lf(b,1,c),e=Lf(b,2,c),f=Lf(b,3,c);if(La(d)){var h=Sf(d);c?Yf("_gl",h,a):Zf("_gl",h,a,!1)}if(!c&&La(e)){var k=Sf(e);Zf("_gl",k,a,!0)}for(var l in f)if(f.hasOwnProperty(l))a:{var p=l,n=f[l],r=a;if(r.tagName){if("a"===r.tagName.toLowerCase()){Zf(p,n,r,void 0);break a}if("form"===r.tagName.toLowerCase()){Yf(p,n,r);break a}}"string"==typeof r&&Wf(p,n,r,void 0)}}
function Zf(a,b,c,d){if(c.href){var e=Wf(a,b,c.href,void 0===d?!1:d);xc.test(e)&&(c.href=e)}}
function Yf(a,b,c){if(c&&c.action){var d=(c.method||"").toLowerCase();if("get"===d){for(var e=c.childNodes||[],f=!1,h=0;h<e.length;h++){var k=e[h];if(k.name===a){k.setAttribute("value",b);f=!0;break}}if(!f){var l=G.createElement("input");l.setAttribute("type","hidden");l.setAttribute("name",a);l.setAttribute("value",b);c.appendChild(l)}}else if("post"===d){var p=Wf(a,b,c.action);xc.test(p)&&(c.action=p)}}}
var Gf=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var f=e.protocol;"http:"!==f&&"https:"!==f||Xf(e,e.hostname)}}catch(h){}},Hf=function(a){try{if(a.action){var b=Ve(Xe(a.action),"host");Xf(a,b)}}catch(c){}},$f=function(a,b,c,d){Jf();Kf(a,b,"fragment"===c?2:1,!!d,!1)},ag=function(a,b){Jf();Kf(a,[Ue(E.location,"host",!0)],b,!0,!0)},bg=function(){var a=G.location.hostname,b=Nf.exec(G.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var f=c.split("/"),h=f[1];e="s"===h?decodeURIComponent(f[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(Of,""),l=e.replace(Of,""),p;if(!(p=k===l)){var n="."+l;p=k.substring(k.length-n.length,k.length)===n}return p},cg=function(a,b){return!1===a?!1:a||b||bg()};var dg=/^\w+$/,eg=/^[\w-]+$/,fg=/^~?[\w-]+$/,gg={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha",gp:"_gp"},hg=function(){if(!bd("gtag_cs_api")||!ld())return!0;var a=jd("ad_storage");return null==a?!0:!!a},ig=function(a,b){kd("ad_storage")?hg()?a():od(a,"ad_storage"):b?oc("TAGGING",3):nd(function(){ig(a,!0)},["ad_storage"])},lg=function(a){var b=[];if(!G.cookie)return b;var c=af(a,G.cookie,void 0,"ad_storage");if(!c||0==c.length)return b;for(var d=0;d<c.length;d++){var e=jg(c[d]);e&&-1===xa(b,e)&&b.push(e)}return kg(b)};
function mg(a){return a&&"string"==typeof a&&a.match(dg)?a:"_gcl"}
var og=function(){var a=Xe(E.location.href),b=Ve(a,"query",!1,void 0,"gclid"),c=Ve(a,"query",!1,void 0,"gclsrc"),d=Ve(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||Se(e,"gclid",void 0);c=c||Se(e,"gclsrc",void 0)}return ng(b,c,d)},ng=function(a,b,c){var d={},e=function(f,h){d[h]||(d[h]=[]);d[h].push(f)};d.gclid=a;d.gclsrc=b;d.dclid=c;if(void 0!==a&&a.match(eg))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":bd("gtm_3pds")&&
e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha");break;case "gp":e(a,"gp")}c&&e(c,"dc");return d},qg=function(a){var b=og();ig(function(){pg(b,a)})};
function pg(a,b,c){function d(l,p){var n=rg(l,e);n&&kf(n,p,f)}b=b||{};var e=mg(b.prefix);c=c||Ha();var f=sf(b,c,!0);f.Ha="ad_storage";var h=Math.round(c/1E3),k=function(l){return["GCL",h,l].join(".")};a.aw&&(!0===b.ji?d("aw",k("~"+a.aw[0])):d("aw",k(a.aw[0])));a.dc&&d("dc",k(a.dc[0]));a.gf&&d("gf",k(a.gf[0]));a.ha&&d("ha",k(a.ha[0]));a.gp&&d("gp",k(a.gp[0]))}
var tg=function(a,b){var c=Vf(!0);ig(function(){for(var d=mg(b.prefix),e=0;e<a.length;++e){var f=a[e];if(void 0!==gg[f]){var h=rg(f,d),k=c[h];if(k){var l=Math.min(sg(k),Ha()),p;b:{for(var n=l,r=af(h,G.cookie,void 0,"ad_storage"),t=0;t<r.length;++t)if(sg(r[t])>n){p=!0;break b}p=!1}if(!p){var q=sf(b,l,!0);q.Ha="ad_storage";kf(h,k,q)}}}}pg(ng(c.gclid,c.gclsrc),b)})},rg=function(a,b){var c=gg[a];if(void 0!==c)return b+c},sg=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function jg(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var ug=function(a,b,c,d,e){if(wa(b)){var f=mg(e),h=function(){for(var k={},l=0;l<a.length;++l){var p=rg(a[l],f);if(p){var n=af(p,G.cookie,void 0,"ad_storage");n.length&&(k[p]=n.sort()[n.length-1])}}return k};ig(function(){$f(h,b,c,d)})}},kg=function(a){return a.filter(function(b){return fg.test(b)})},vg=function(a,b){for(var c=mg(b.prefix),d={},e=0;e<a.length;e++)gg[a[e]]&&(d[a[e]]=gg[a[e]]);ig(function(){Ca(d,function(f,h){var k=af(c+h,G.cookie,void 0,"ad_storage");if(k.length){var l=k[0],p=sg(l),
n={};n[f]=[jg(l)];pg(n,b,p)}})})};function wg(a,b){for(var c=0;c<b.length;++c)if(a[b[c]])return!0;return!1}
var xg=function(){function a(e,f,h){h&&(e[f]=h)}var b=["aw","dc"];if(ld()){var c=og();if(wg(c,b)){var d={};a(d,"gclid",c.gclid);a(d,"dclid",c.dclid);a(d,"gclsrc",c.gclsrc);ag(function(){return d},3);ag(function(){var e={};return e._up="1",e},1)}}},yg=function(){var a;if(hg()){for(var b=[],c=G.cookie.split(";"),d=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push({Cd:f[1],value:f[2]})}var h={};if(b&&b.length)for(var k=0;k<b.length;k++){var l=b[k].value.split(".");
"1"==l[0]&&3==l.length&&l[1]&&(h[b[k].Cd]||(h[b[k].Cd]=[]),h[b[k].Cd].push({timestamp:l[1],Dg:l[2]}))}a=h}else a={};return a};var zg=/^\d+\.fls\.doubleclick\.net$/;function Ag(a,b){kd(C.o)?sd(C.o)?a():od(a,C.o):b?qc(42):ud(function(){Ag(a,!0)},[C.o])}function Bg(a){var b=Xe(E.location.href),c=Ve(b,"host",!1);if(c&&c.match(zg)){var d=Ve(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Cg(a,b,c){if("aw"==a||"dc"==a){var d=Bg("gcl"+a);if(d)return d.split(".")}var e=mg(b);if("_gcl"==e){c=void 0===c?!0:c;var f=!sd(C.o)&&c,h;h=og()[a]||[];if(0<h.length)return f?["0"]:h}var k=rg(a,e);return k?lg(k):[]}
var Dg=function(a){var b=Bg("gac");if(b)return!sd(C.o)&&a?"0":decodeURIComponent(b);var c=yg(),d=[];Ca(c,function(e,f){for(var h=[],k=0;k<f.length;k++)h.push(f[k].Dg);h=kg(h);h.length&&d.push(e+":"+h.join(","))});return d.join(";")},Eg=function(a,b){var c=og().dc||[];Ag(function(){yf(b);var d=uf[vf(b.prefix)],e=!1;if(d&&0<c.length){var f=I.joined_au=I.joined_au||{},h=b.prefix||"_gcl";if(!f[h])for(var k=0;k<c.length;k++){var l="https://adservice.google.com/ddm/regclk";l=l+"?gclid="+c[k]+"&auiddc="+d;Zc(l);e=f[h]=
!0}}null==a&&(a=e);if(a&&d){var p=vf(b.prefix),n=uf[p];n&&xf(p,n,b)}})};var Fg=/[A-Z]+/,Gg=/\s/,Hg=function(a){if(g(a)&&(a=Ga(a),!Gg.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if(Fg.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],C:d}}}}},Jg=function(a){for(var b={},c=0;c<a.length;++c){var d=Hg(a[c]);d&&(b[d.id]=d)}Ig(b);var e=[];Ca(b,function(f,h){e.push(h)});return e};
function Ig(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.C[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var Kg=function(){var a=!1;return a};var Mg=function(a,b,c,d){return(2===Lg()||d||"http:"!=E.location.protocol?a:b)+c},Lg=function(){var a=Qc(),b;if(1===a)a:{var c=Vd;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,f=1,h=G.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===f&&0===l.indexOf(d)&&(f=2)}}b=f}else b=a;return b};
var ah=function(a){return sd(C.o)?a:a.replace(/&url=([^&#]+)/,function(b,c){var d=Ye(decodeURIComponent(c));return"&url="+encodeURIComponent(d)})},bh=function(){var a;if(!(a=Wd)){var b;if(!0===E._gtmdgs)b=!0;else{var c=Lc&&Lc.userAgent||"";b=0>c.indexOf("Safari")||/Chrome|Coast|Opera|Edg|Silk|Android/.test(c)||11>((/Version\/([\d]+)/.exec(c)||[])[1]||"")?!1:!0}a=!b}if(a)return 0;var d=Da("-1");return Qe(1,100)<=d?Qe(2,2):0};var ch=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),dh={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},eh={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},fh="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var hh=function(a){var b;b||(b=Ge("gtm.whitelist"));b&&qc(9);
var c=b&&Ma(Fa(b),dh),d;d||(d=Ge("gtm.blacklist"));d||(d=Ge("tagTypeBlacklist"))&&qc(3);d?qc(8):d=[];gh()&&(d=Fa(d),d.push("nonGooglePixels","nonGoogleScripts","sandboxedScripts"));0<=xa(Fa(d),"google")&&qc(2);var e=d&&Ma(Fa(d),eh),f={};return function(h){var k=
h&&h[Jb.qa];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==f[k])return f[k];var l=ae[k]||[],p=a(k,l);if(b){var n;if(n=p)a:{if(0>xa(c,k))if(l&&0<l.length)for(var r=0;r<l.length;r++){if(0>xa(c,l[r])){qc(11);n=!1;break a}}else{n=!1;break a}n=!0}p=n}var t=!1;if(d){var q=0<=xa(e,k);if(q)t=q;else{var u=Ba(e,l||[]);u&&qc(10);t=u}}var v=!p||t;v||!(0<=xa(l,"sandboxedScripts"))||c&&-1!==xa(c,"sandboxedScripts")||(v=Ba(e,fh));return f[k]=v}},gh=function(){return ch.test(E.location&&E.location.hostname)};var ih={active:!0,isAllowed:function(){return!0}},jh=function(a){var b=I.zones;return b?b.checkState(Pd.B,a):ih},kh=function(a){var b=I.zones;!b&&a&&(b=I.zones=a());return b};var lh=function(){};var mh=!1,nh=0,oh=[];function ph(a){if(!mh){var b=G.createEventObject,c="complete"==G.readyState,d="interactive"==G.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){mh=!0;for(var e=0;e<oh.length;e++)H(oh[e])}oh.push=function(){for(var f=0;f<arguments.length;f++)H(arguments[f]);return 0}}}function qh(){if(!mh&&140>nh){nh++;try{G.documentElement.doScroll("left"),ph()}catch(a){E.setTimeout(qh,50)}}}var rh=function(a){mh?a():oh.push(a)};var sh={},th={},uh=function(a,b,c,d){if(!th[a]||Sd[b]||"__zone"===b)return-1;var e={};Sa(d)&&(e=m(d,e));e.id=c;e.status="timeout";return th[a].tags.push(e)-1},vh=function(a,b,c,d){if(th[a]){var e=th[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function wh(a){for(var b=sh[a]||[],c=0;c<b.length;c++)b[c]();sh[a]={push:function(d){d(Pd.B,th[a])}}}
var zh=function(a,b,c){th[a]={tags:[]};ta(b)&&xh(a,b);c&&E.setTimeout(function(){return wh(a)},Number(c));return yh(a)},xh=function(a,b){sh[a]=sh[a]||[];sh[a].push(Ja(function(){return H(function(){b(Pd.B,th[a])})}))};function yh(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ja(function(){b++;d&&b>=c&&wh(a)})},Zf:function(){d=!0;b>=c&&wh(a)}}};var Ah=function(){function a(d){return!ua(d)||0>d?0:d}if(!I._li&&E.performance&&E.performance.timing){var b=E.performance.timing.navigationStart,c=ua(He.get("gtm.start"))?He.get("gtm.start"):0;I._li={cst:a(c-b),cbt:a(Yd-b)}}};var Eh={},Fh=function(){return E.GoogleAnalyticsObject&&E[E.GoogleAnalyticsObject]},Gh=!1;
var Hh=function(a){E.GoogleAnalyticsObject||(E.GoogleAnalyticsObject=a||"ga");var b=E.GoogleAnalyticsObject;if(E[b])E.hasOwnProperty(b)||qc(12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);E[b]=c}Ah();return E[b]},Ih=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=Fh();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var Kh=function(a){},Jh=function(){return E.GoogleAnalyticsObject||"ga"},Lh=function(a,b){return function(){var c=Fh(),d=c&&c.getByName&&c.getByName(a);if(d){var e=d.get("sendHitTask");d.set("sendHitTask",function(f){var h=f.get("hitPayload"),k=f.get("hitCallback"),l=0>h.indexOf("&tid="+b);l&&(f.set("hitPayload",h.replace(/&tid=UA-[0-9]+-[0-9]+/,"&tid="+
b),!0),f.set("hitCallback",void 0,!0));e(f);l&&(f.set("hitPayload",h,!0),f.set("hitCallback",k,!0),f.set("_x_19",void 0,!0),e(f))})}}};function Qh(a,b,c,d){var e=wb[a],f=Rh(a,b,c,d);if(!f)return null;var h=Fb(e[Jb.Td],c,[]);if(h&&h.length){var k=h[0];f=Qh(k.index,{H:f,F:1===k.me?b.terminate:f,terminate:b.terminate},c,d)}return f}
function Rh(a,b,c,d){function e(){if(f[Jb.tf])k();else{var w=Gb(f,c,[]);var A=uh(c.id,String(f[Jb.qa]),Number(f[Jb.Ud]),w[Jb.uf]),B=!1;w.vtp_gtmOnSuccess=function(){if(!B){B=!0;var F=Ha()-D;ye(c.id,wb[a],"5");vh(c.id,A,"success",
F);h()}};w.vtp_gtmOnFailure=function(){if(!B){B=!0;var F=Ha()-D;ye(c.id,wb[a],"6");vh(c.id,A,"failure",F);k()}};w.vtp_gtmTagId=f.tag_id;w.vtp_gtmEventId=c.id;ye(c.id,f,"1");var z=function(){var F=Ha()-D;ye(c.id,f,"7");vh(c.id,A,"exception",F);B||(B=!0,k())};var D=Ha();try{Cb(w,c)}catch(F){z(F)}}}var f=wb[a],h=b.H,k=b.F,l=b.terminate;if(c.jd(f))return null;var p=Fb(f[Jb.Vd],c,[]);if(p&&p.length){var n=p[0],r=Qh(n.index,{H:h,F:k,terminate:l},c,d);if(!r)return null;h=r;k=2===n.me?l:r}if(f[Jb.Pd]||f[Jb.yf]){var t=f[Jb.Pd]?xb:c.Dh,q=h,u=k;if(!t[a]){e=Ja(e);
var v=Sh(a,t,e);h=v.H;k=v.F}return function(){t[a](q,u)}}return e}function Sh(a,b,c){var d=[],e=[];b[a]=Th(d,e,c);return{H:function(){b[a]=Uh;for(var f=0;f<d.length;f++)d[f]()},F:function(){b[a]=Vh;for(var f=0;f<e.length;f++)e[f]()}}}function Th(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function Uh(a){a()}function Vh(a,b){b()};var Yh=function(a,b){for(var c=[],d=0;d<wb.length;d++)if(a.ya[d]){var e=wb[d];var f=b.add();try{var h=Qh(d,{H:f,F:f,terminate:f},a,d);h?c.push({Re:d,Je:Hb(e),yg:h}):(Wh(d,a),f())}catch(l){f()}}b.Zf();c.sort(Xh);for(var k=0;k<c.length;k++)c[k].yg();return 0<c.length};function Xh(a,b){var c,d=b.Je,e=a.Je;c=d>e?1:d<e?-1:0;var f;if(0!==c)f=c;else{var h=a.Re,k=b.Re;f=h>k?1:h<k?-1:0}return f}
function Wh(a,b){if(!ve)return;var c=function(d){var e=b.jd(wb[d])?"3":"4",f=Fb(wb[d][Jb.Td],b,[]);f&&f.length&&c(f[0].index);ye(b.id,wb[d],e);var h=Fb(wb[d][Jb.Vd],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var Zh=!1,$h=function(a,b,c,d){if("gtm.js"==b){if(Zh)return!1;Zh=!0}var e=jh(a),f=!1;if(!e.active){var h=!0;if("gtm.js"===b){for(var k=0;k<wb.length;k++)if(Rd[String(wb[k][String(Jb.qa)])]){qc(50);break}}if(h)return!1}xe(a,b);var l=zh(a,c,d);Ke(a,"event",
1);Ke(a,"ecommerce",1);Ke(a,"gtm");var p={id:a,name:b,jd:hh(e.isAllowed),ya:[],Dh:[],Ae:function(){qc(6)},de:function(u){ve&&(Ta(u)||Ae(a,"input",u))}};p.ya=Nb(p);var t=Yh(p,l);"gtm.js"!==b&&"gtm.sync"!==b||Kh(Pd.B);if(!t)return t;for(var q=0;q<p.ya.length;q++)if(p.ya[q]&&wb[q]&&!Sd[String(wb[q][Jb.qa])])return!0;return!1};function ai(a,b){if(a){var c=""+a;0!==c.indexOf("http://")&&0!==c.indexOf("https://")&&(c="https://"+c);"/"===c[c.length-1]&&(c=c.substring(0,c.length-1));return Xe(""+c+b).href}}function bi(a,b){return ci()?ai(a,b):void 0}function ci(){var a=!1;return a};var di=function(){this.eventModel={};this.targetConfig={};this.containerConfig={};this.h={};this.globalConfig={};this.H=function(){};this.F=function(){};this.eventId=void 0},ei=function(a){var b=new di;b.eventModel=a;return b},fi=function(a,b){a.targetConfig=b;return a},gi=function(a,b){a.containerConfig=b;return a},hi=function(a,b){a.h=b;return a},ii=function(a,b){a.globalConfig=b;return a},ji=function(a,b){a.H=b;return a},ki=function(a,b){a.F=b;return a};
di.prototype.getWithConfig=function(a){if(void 0!==this.eventModel[a])return this.eventModel[a];if(void 0!==this.targetConfig[a])return this.targetConfig[a];if(void 0!==this.containerConfig[a])return this.containerConfig[a];if(void 0!==this.h[a])return this.h[a];if(void 0!==this.globalConfig[a])return this.globalConfig[a]};
var li=function(a){function b(e){Ca(e,function(f){c[f]=null})}var c={};b(a.eventModel);b(a.targetConfig);b(a.containerConfig);b(a.globalConfig);var d=[];Ca(c,function(e){d.push(e)});return d};var mi;if(3===Pd.Sb.length)mi="g";else{var ni="G";mi=ni}
var oi={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:mi,OPT:"o"},pi=function(a){var b=Pd.B.split("-"),c=b[0].toUpperCase(),d=oi[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",f;if(3===Pd.Sb.length){var h="w";f="2"+h}else f="";return f+d+Pd.Sb+e};var qi=function(a,b){a.addEventListener&&a.addEventListener("message",b,!1)};var ri=function(){return Bc("iPhone")&&!Bc("iPod")&&!Bc("iPad")};Bc("Opera");Bc("Trident")||Bc("MSIE");Bc("Edge");!Bc("Gecko")||-1!=yc.toLowerCase().indexOf("webkit")&&!Bc("Edge")||Bc("Trident")||Bc("MSIE")||Bc("Edge");-1!=yc.toLowerCase().indexOf("webkit")&&!Bc("Edge")&&Bc("Mobile");Bc("Macintosh");Bc("Windows");Bc("Linux")||Bc("CrOS");var si=la.navigator||null;si&&(si.appVersion||"").indexOf("X11");Bc("Android");ri();Bc("iPad");Bc("iPod");ri()||Bc("iPad")||Bc("iPod");yc.toLowerCase().indexOf("kaios");var ti=function(a,b){for(var c=a,d=0;50>d;++d){var e;try{e=!(!c.frames||!c.frames[b])}catch(k){e=!1}if(e)return c;var f;a:{try{var h=c.parent;if(h&&h!=c){f=h;break a}}catch(k){}f=null}if(!(c=f))break}return null};var ui=function(){};var vi=function(a,b){this.i=a;this.h=null;this.I={};this.da=0;this.ka=void 0===b?500:b;this.m=null};ja(vi,ui);var xi=function(a){return"function"===typeof a.i.__tcfapi||null!=wi(a)};
vi.prototype.addEventListener=function(a){var b={},c=vc(function(){return a(b)}),d=setTimeout(function(){b.tcString="tcunavailable";b.internalErrorState=1;c()},this.ka),e=function(f,h){clearTimeout(d);f?(b=f,b.internalErrorState=void 0!==b.tcString&&"string"!==typeof b.tcString||void 0!==b.gdprApplies&&"boolean"!==typeof b.gdprApplies||void 0!==b.listenerId&&"number"!==typeof b.listenerId||void 0!==b.addtlConsent&&"string"!==typeof b.addtlConsent?2:b.cmpStatus&&"error"!==b.cmpStatus?0:3,h&&0===b.internalErrorState||
(b.tcString="tcunavailable",h||(b.internalErrorState=3))):(b.tcString="tcunavailable",b.internalErrorState=3);a(b)};try{yi(this,"addEventListener",e)}catch(f){b.tcString="tcunavailable",b.internalErrorState=3,d&&(clearTimeout(d),d=0),c()}};vi.prototype.removeEventListener=function(a){a&&a.listenerId&&yi(this,"removeEventListener",null,a.listenerId)};
var Ai=function(a,b,c){if(!a.purpose||!a.vendor)return!1;var d=zi(a.vendor.consents,void 0===c?"755":c);return d&&"1"===b&&a.purposeOneTreatment&&"DE"===a.publisherCC?!0:d&&zi(a.purpose.consents,b)},Bi=function(a,b,c){var d;d=void 0===d?"755":d;var e;a:{if(a.publisher&&a.publisher.restrictions){var f=a.publisher.restrictions[b];if(void 0!==f){e=f[void 0===d?"755":d];break a}}e=void 0}var h=e;if(0===h)return!1;var k=c;2===c?(k=0,2===h&&(k=1)):3===c&&(k=1,1===h&&(k=0));return 0===k?Ai(a,b,d):1===k?
a.purpose&&a.vendor?zi(a.purpose.legitimateInterests,b)&&zi(a.vendor.legitimateInterests,void 0===d?"755":d):!1:!0},zi=function(a,b){return!(!a||!a[b])},yi=function(a,b,c,d){c||(c=function(){});if("function"===typeof a.i.__tcfapi){var e=a.i.__tcfapi;e(b,2,c,d)}else if(wi(a)){Ci(a);var f=++a.da;a.I[f]=c;if(a.h){var h={};a.h.postMessage((h.__tcfapiCall={command:b,version:2,callId:f,parameter:d},h),"*")}}else c({},!1)},wi=function(a){if(a.h)return a.h;a.h=ti(a.i,"__tcfapiLocator");return a.h},Ci=function(a){a.m||
(a.m=function(b){try{var c,d;"string"===typeof b.data?d=JSON.parse(b.data):d=b.data;c=d.__tcfapiReturn;a.I[c.callId](c.returnValue,c.success)}catch(e){}},qi(a.i,a.m))};var Di={1:0,3:0,4:0,7:3,9:3,10:3};function Ei(a,b){if(""===a)return b;var c=Number(a);return isNaN(c)?b:c}var Fi=Ei("",550),Gi=Ei("",500);function Hi(){var a=I.tcf||{};return I.tcf=a}
var Ii=function(a,b){this.m=a;this.h=b;this.i=Ha();},Ji=function(a){},Ki=function(a){},Qi=function(){var a=Hi(),b=new vi(E,3E3),c=new Ii(b,a);if((Li()?!0===E.gtag_enable_tcf_support:!1!==E.gtag_enable_tcf_support)&&!a.active&&("function"===typeof E.__tcfapi||xi(b))){a.active=!0;a.Bb={};Mi();var d=setTimeout(function(){Ni(a);Oi(a);d=null},Gi);try{b.addEventListener(function(e){d&&(clearTimeout(d),d=null);if(0!==e.internalErrorState)Ni(a),Oi(a),Ji(c);else{var f;if(!1===e.gdprApplies)f=Pi(),b.removeEventListener(e);
else if("tcloaded"===e.eventStatus||"useractioncomplete"===e.eventStatus||"cmpuishown"===e.eventStatus){var h={},k;for(k in Di)Di.hasOwnProperty(k)&&("1"===k?h["1"]=!1===e.gdprApplies||"error"===e.cmpStatus||0!==e.internalErrorState||"loaded"===e.cmpStatus&&("tcloaded"===e.eventStatus||"useractioncomplete"===e.eventStatus)?!1===e.gdprApplies||"tcunavailable"===e.tcString?!0:bd("tcf_restrictions")?Bi(e,"1",0):Ai(e,"1"):!1:h[k]=Bi(e,k,Di[k]));f=h}f&&(a.tcString=e.tcString||"tcempty",a.Bb=f,Oi(a),Ji(c))}}),
Ki(c)}catch(e){d&&(clearTimeout(d),d=null),Ni(a),Oi(a)}}};function Ni(a){a.type="e";a.tcString="tcunavailable";a.Bb=Pi()}function Mi(){var a={};qd((a.ad_storage="denied",a.wait_for_update=Fi,a))}var Li=function(){var a=!1;a=!0;return a};function Pi(){var a={},b;for(b in Di)Di.hasOwnProperty(b)&&(a[b]=!0);return a}function Oi(a){var b={};rd((b.ad_storage=a.Bb["1"]?"granted":"denied",b))}
var Ri=function(){var a=Hi();if(a.active&&void 0!==a.loadTime)return Number(a.loadTime)},Si=function(){var a=Hi();return a.active?a.tcString||"":""},Ti=function(a){if(!Di.hasOwnProperty(String(a)))return!0;var b=Hi();return b.active&&b.Bb?!!b.Bb[String(a)]:!0};function Ui(a,b,c){function d(r){var t;I.reported_gclid||(I.reported_gclid={});t=I.reported_gclid;var q=f+(r?"gcu":"gcs");if(!t[q]){t[q]=!0;var u=[],v=function(B,z){z&&u.push(B+"="+encodeURIComponent(z))},w="https://www.google.com";if(ld()){var y=sd(C.o);v("gcs",td());r&&v("gcu","1");v("rnd",n);if((!f||h&&"aw.ds"!==h)&&sd(C.o)){var x=lg("_gcl_aw");v("gclaw",x.join("."))}v("url",String(E.location).split(/[?#]/)[0]);v("dclid",Vi(b,k));!y&&b&&(w="https://pagead2.googlesyndication.com")}
v("gdpr_consent",Si());"1"===Vf(!1)._up&&v("gtm_up","1");v("gclid",Vi(b,f));v("gclsrc",h);v("gtm",pi(!c));var A=w+"/pagead/landing?"+u.join("&");Zc(A)}}var e=og(),f=e.gclid||"",h=e.gclsrc,k=e.dclid||"",l=!a&&(!f||h&&"aw.ds"!==h?!1:!0),p=ld();if(l||p){var n=""+nf();p?ud(function(){d();sd(C.o)||od(function(r){return d(!0,r.ee)},C.o)},[C.o]):d()}}function Vi(a,b){var c=a&&!sd(C.o);return b&&c?"0":b}var Wi=function(a){if(G.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!E.getComputedStyle)return!0;var c=E.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var f=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-1)),f=Math.min(h,f))}if(void 0!==f&&0>=f)return!0;(d=d.parentElement)&&(e=E.getComputedStyle(d,
null))}return!1};var ej=new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i),fj=["SCRIPT","IMG","SVG","PATH"];function gj(a){var b;if(a===G.body)b="body";else{var c;if(a.id)c="#"+a.id;else{var d;if(a.parentElement){var e;a:{var f=a.parentElement;if(f){for(var h=0;h<f.childElementCount;h++)if(f.children[h]===a){e=h+1;break a}e=-1}else e=1}d=gj(a.parentElement)+">:nth-child("+e+")"}else d="";c=d}b=c}return b}
var hj=function(){var a=[],b=G.body;if(b)for(var c=b.querySelectorAll("*"),d=0;d<c.length;d++){var e=c[d];0<=fj.indexOf(e.tagName.toUpperCase())||0===e.childElementCount&&a.push(e)}for(var f=[],h=0;h<a.length;h++){var k=a[h],l=k.textContent;k.value&&(l=k.value);l&&l.match(ej)&&f.push(k)}for(var p=[],n=0;n<f.length;n++){var r=f[n];p.push({querySelector:gj(r),tagName:r.tagName,isVisible:!Wi(r),type:1})}return p};var Qj=function(){var a=!0;Ti(7)&&Ti(9)&&Ti(10)||(a=!1);var b=!0;b&&!Pj()&&(a=!1);return a},Pj=function(){var a=!0;Ti(3)&&Ti(4)||(a=!1);return a};function kk(){var a=I;return a.gcq=a.gcq||new lk}
var mk=function(a,b,c){kk().register(a,b,c)},nk=function(a,b,c,d){kk().push("event",[b,a],c,d)},ok=function(a,b){kk().push("config",[a],b)},pk=function(a,b,c){kk().push("get",[a,b],c)},qk={},rk=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.i={};this.m=null;this.h=!1},sk=function(a,b,c,d,e){this.type=a;this.m=b;this.aa=c||"";this.h=d;this.i=e},lk=function(){this.m={};this.i={};this.h=[]},tk=function(a,b){var c=Hg(b);return a.m[c.containerId]=a.m[c.containerId]||new rk},
uk=function(a,b,c){if(b){var d=Hg(b);if(d&&1===tk(a,b).status){tk(a,b).status=2;var e={};ve&&(e.timeoutId=E.setTimeout(function(){qc(38);he()},3E3));a.push("require",[e],d.containerId);qk[d.containerId]=Ha();if(Kg()){}else{var h="/gtag/js?id="+
encodeURIComponent(d.containerId)+"&l=dataLayer&cx=c",k=("http:"!=E.location.protocol?"https:":"http:")+("//www.googletagmanager.com"+h),l=bi(c,h)||k;Pc(l)}}}},vk=function(a,b,c,d){if(d.aa){var e=tk(a,d.aa),f=e.m;if(f){var h=m(c),k=m(e.targetConfig[d.aa]),l=m(e.containerConfig),p=m(e.i),n=m(a.i),r=Ge("gtm.uniqueEventId"),t=Hg(d.aa).prefix,q=ki(ji(ii(hi(gi(fi(ei(h),k),l),p),n),function(){ze(r,t,"2");}),function(){
ze(r,t,"3");});try{ze(r,t,"1");f(d.aa,b,d.m,q)}catch(u){ze(r,t,"4");}}}};
lk.prototype.register=function(a,b,c){if(3!==tk(this,a).status){tk(this,a).m=b;tk(this,a).status=3;c&&(tk(this,a).i=c);var d=Hg(a),e=qk[d.containerId];if(void 0!==e){var f=I[d.containerId].bootstrap,h=d.prefix.toUpperCase();I[d.containerId]._spx&&(h=h.toLowerCase());var k=Ge("gtm.uniqueEventId"),l=h,p=Ha()-f;if(ve&&!me[k]){k!==ie&&(ee(),ie=k);var n=l+"."+Math.floor(f-e)+"."+Math.floor(p);qe=qe?qe+","+n:"&cl="+n}delete qk[d.containerId]}this.flush()}};
lk.prototype.push=function(a,b,c,d){var e=Math.floor(Ha()/1E3);uk(this,c,b[0][C.Fa]||this.i[C.Fa]);this.h.push(new sk(a,e,c,b,d));d||this.flush()};
lk.prototype.flush=function(a){for(var b=this;this.h.length;){var c=this.h[0];if(c.i)c.i=!1,this.h.push(c);else switch(c.type){case "require":if(3!==tk(this,c.aa).status&&!a)return;ve&&E.clearTimeout(c.h[0].timeoutId);break;case "set":Ca(c.h[0],function(n,r){m(Na(n,r),b.i)});break;case "config":var d=c.h[0],e=!!d[C.Mb];delete d[C.Mb];var f=tk(this,c.aa),h=Hg(c.aa),k=h.containerId===h.id;e||(k?f.containerConfig={}:f.targetConfig[c.aa]={});f.h&&e||vk(this,C.ja,d,c);f.h=!0;delete d[C.Ya];k?m(d,f.containerConfig):
m(d,f.targetConfig[c.aa]);break;case "event":vk(this,c.h[1],c.h[0],c);break;case "get":}this.h.shift()}};var wk=!1,xk=[];function yk(){if(!wk){wk=!0;for(var a=0;a<xk.length;a++)H(xk[a])}}var zk=function(a){wk?H(a):xk.push(a)};var Ak="HA GF G UA AW DC".split(" "),Bk=!1,Ck={},Dk=!1;function Ek(a,b){var c={event:a};b&&(c.eventModel=m(b),b[C.Bc]&&(c.eventCallback=b[C.Bc]),b[C.Nb]&&(c.eventTimeout=b[C.Nb]));return c}function Fk(){return Bk}
var Ik={config:function(a){},event:function(a){var b=a[1];if(g(b)&&!(3<a.length)){var c;if(2<a.length){if(!Sa(a[2])&&
void 0!=a[2])return;c=a[2]}var d=Ek(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return Dk=!0,Fk(),{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(){},set:function(a){var b;2==a.length&&Sa(a[1])?b=m(a[1]):3==a.length&&g(a[1])&&(b={},Sa(a[2])||wa(a[2])?b[a[1]]=m(a[2]):b[a[1]]=a[2]);if(b){
b._clear=!0;return b}},consent:function(a){function b(){Fk()&&m(a[2],{subcommand:a[1]})}if(3===a.length){qc(39);var c=be(),d=a[1];"default"===d?(b(),qd(a[2])):"update"===d&&(b(),rd(a[2],c))}}};var Jk={policy:!0};var Kk=function(a,b){var c=a.hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}},Mk=function(a){var b=Lk(),c=b&&b.hide;c&&c.end&&(c[a]=!0)};var dl=function(a){if(cl(a))return a;this.h=a};dl.prototype.Ig=function(){return this.h};var cl=function(a){return!a||"object"!==Qa(a)||Sa(a)?!1:"getUntrustedUpdateValue"in a};dl.prototype.getUntrustedUpdateValue=dl.prototype.Ig;var el=[],fl=!1,gl=function(a){return E["dataLayer"].push(a)},hl=function(a){var b=I["dataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}};
function il(a){var b=a._clear;Ca(a,function(f,h){"_clear"!==f&&(b&&Je(f,void 0),Je(f,h))});Xd||(Xd=a["gtm.start"]);var c=a.event,d=a["gtm.uniqueEventId"];if(!c)return!1;d||(d=be(),a["gtm.uniqueEventId"]=d,Je("gtm.uniqueEventId",d));var e=$h(a["gtm.uniqueEventId"],a.event,a.eventCallback,a.eventTimeout)?!0:!1;switch(c){case "gtm.init":qc(19),e&&qc(20)}return e}
function jl(){for(var a=!1;!fl&&0<el.length;){fl=!0;delete De.eventModel;Fe();var b=el.shift();if(null!=b){var c=cl(b);if(c){var d=b;b=cl(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.allowlist","gtm.blocklist","gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],f=0;f<e.length;f++){var h=e[f],k=Ge(h,1);if(wa(k)||Sa(k))k=m(k);Ee[h]=k}}try{if(ta(b))try{b.call(He)}catch(w){}else if(wa(b)){var l=
b;if(g(l[0])){var p=l[0].split("."),n=p.pop(),r=l.slice(1),t=Ge(p.join("."),2);if(void 0!==t&&null!==t)try{t[n].apply(t,r)}catch(w){}}}else{var q=b;if(q&&("[object Arguments]"==Object.prototype.toString.call(q)||Object.prototype.hasOwnProperty.call(q,"callee"))){a:{var u=b;if(u.length&&g(u[0])){var v=Ik[u[0]];if(v&&(!c||!Jk[u[0]])){b=v(u);break a}}b=void 0}if(!b){fl=!1;continue}}a=il(b)||a}}finally{c&&Fe(!0)}}fl=!1}
return!a}function kl(){var a=jl();try{Kk(E["dataLayer"],Pd.B)}catch(b){}return a}
var ml=function(){var a=Nc("dataLayer",[]),b=Nc("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};rh(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});zk(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||0)+1;var c=a.push;a.push=function(){var e;if(0<I.SANDBOXED_JS_SEMAPHORE){e=[];for(var f=0;f<arguments.length;f++)e[f]=new dl(arguments[f])}else e=[].slice.call(arguments,0);var h=c.apply(a,e);el.push.apply(el,e);if(300<
this.length)for(qc(4);300<this.length;)this.shift();var k="boolean"!==typeof h||h;return jl()&&k};var d=a.slice(0);el.push.apply(el,d);ll()&&H(kl)},ll=function(){var a=!0;return a};var nl={};nl.Ob=new String("undefined");
var ol=function(a){this.h=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===nl.Ob?b:a[d]);return c.join("")}};ol.prototype.toString=function(){return this.h("undefined")};ol.prototype.valueOf=ol.prototype.toString;nl.Gf=ol;nl.Pc={};nl.qg=function(a){return new ol(a)};var pl={};nl.wh=function(a,b){var c=be();pl[c]=[a,b];return c};nl.he=function(a){var b=a?0:1;return function(c){var d=pl[c];if(d&&"function"===typeof d[b])d[b]();pl[c]=void 0}};nl.Sg=function(a){for(var b=!1,c=!1,d=2;d<a.length;d++)b=
b||8===a[d],c=c||16===a[d];return b&&c};nl.oh=function(a){if(a===nl.Ob)return a;var b=be();nl.Pc[b]=a;return'google_tag_manager["'+Pd.B+'"].macro('+b+")"};nl.fh=function(a,b,c){a instanceof nl.Gf&&(a=a.h(nl.wh(b,c)),b=sa);return{gd:a,H:b}};var ql=function(a,b,c){function d(f,h){var k=f[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||Vc(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},rl=function(a){I.hasOwnProperty("autoEventsSettings")||(I.autoEventsSettings={});var b=I.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},sl=function(a,b,c){rl(a)[b]=c},tl=function(a,b,c,d){var e=rl(a),f=Ia(e,b,d);e[b]=c(f)},ul=function(a,b,c){var d=rl(a);return Ia(d,b,c)};var vl=["input","select","textarea"],wl=["button","hidden","image","reset","submit"],xl=function(a){var b=a.tagName.toLowerCase();return!ya(vl,function(c){return c===b})||"input"===b&&ya(wl,function(c){return c===a.type.toLowerCase()})?!1:!0},yl=function(a){return a.form?a.form.tagName?a.form:G.getElementById(a.form):Yc(a,["form"],100)},zl=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,f=1;e<a.elements.length;e++){var h=a.elements[e];if(xl(h)){if(h.getAttribute(c)===d)return f;
f++}}return 0};var Al=!!E.MutationObserver,Bl=void 0,Cl=function(a){if(!Bl){var b=function(){var c=G.body;if(c)if(Al)(new MutationObserver(function(){for(var e=0;e<Bl.length;e++)H(Bl[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;Tc(c,"DOMNodeInserted",function(){d||(d=!0,H(function(){d=!1;for(var e=0;e<Bl.length;e++)H(Bl[e])}))})}};Bl=[];G.body?b():H(b)}Bl.push(a)};var Ol=E.clearTimeout,Pl=E.setTimeout,K=function(a,b,c){if(Kg()){b&&H(b)}else return Pc(a,b,c)},Ql=function(){return new Date},Rl=function(){return E.location.href},Sl=function(a){return Ve(Xe(a),"fragment")},Tl=function(a){return We(Xe(a))},Ul=function(a,b){return Ge(a,b||2)},Vl=function(a,b,c){var d;b?(a.eventCallback=b,c&&(a.eventTimeout=c),d=gl(a)):d=gl(a);return d},Wl=function(a,b){E[a]=b},P=function(a,b,c){b&&
(void 0===E[a]||c&&!E[a])&&(E[a]=b);return E[a]},Xl=function(a,b,c){return af(a,b,void 0===c?!0:!!c)},Yl=function(a,b,c){return 0===kf(a,b,c)},Zl=function(a,b){if(Kg()){b&&H(b)}else Rc(a,b)},$l=function(a){return!!ul(a,"init",!1)},am=function(a){sl(a,"init",!0)},bm=function(a,b){var c=(void 0===b?0:b)?"www.googletagmanager.com/gtag/js":Vd;c+="?id="+encodeURIComponent(a)+"&l=dataLayer";K(Mg("https://","http://",c))},cm=function(a,
b){var c=a[b];return c},dm=function(a,b,c){ve&&(Ta(a)||Ae(c,b,a))};
var em=nl.fh;function Bm(a,b){a=String(a);b=String(b);var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c}var Cm=new Aa;function Dm(a,b){function c(h){var k=Xe(h),l=Ve(k,"protocol"),p=Ve(k,"host",!0),n=Ve(k,"port"),r=Ve(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==n||"https"==l&&"443"==n)l="web",n="default";return[l,p,n,r]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0}
function Em(a){return Fm(a)?1:0}
function Fm(a){var b=a.arg0,c=a.arg1;if(a.any_of&&wa(c)){for(var d=0;d<c.length;d++){var e=m(a,{});m({arg1:c[d],any_of:void 0},e);if(Em(e))return!0}return!1}switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var f;a:{if(b){var h=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var k=0;k<h.length;k++)if(b[h[k]]){f=b[h[k]](c);break a}}catch(q){}}f=!1}return f;case "_ew":return Bm(b,c);case "_eq":return String(b)==
String(c);case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var l;l=String(b).split(",");return 0<=xa(l,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var p;var n=a.ignore_case?"i":void 0;try{var r=String(c)+n,t=Cm.get(r);t||(t=new RegExp(c,n),Cm.set(r,t));p=t.test(b)}catch(q){p=!1}return p;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return Dm(b,c)}return!1};var Gm={},Hm=encodeURI,Y=encodeURIComponent,Im=Sc;var Jm=function(a,b){if(!a)return!1;var c=Ve(Xe(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var Km=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};Gm.Tg=function(){var a=!1;return a};function ko(){return E.gaGlobal=E.gaGlobal||{}}var lo=function(){var a=ko();a.hid=a.hid||za();return a.hid},mo=function(a,b){var c=ko();if(void 0==c.vid||b&&!c.from_cookie)c.vid=a,c.from_cookie=b};var vo=window,wo=document,xo=function(a){var b=vo._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===vo["ga-disable-"+a])return!0;try{var c=vo.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(f){}for(var d=Ze("AMP_TOKEN",String(wo.cookie),!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return wo.getElementById("__gaOptOutExtension")?!0:!1};function Ao(a){delete a.eventModel[C.Ya];Co(a.eventModel)}
var Co=function(a){Ca(a,function(c){"_"===c.charAt(0)&&delete a[c]});var b=a[C.ma]||{};Ca(b,function(c){"_"===c.charAt(0)&&delete b[c]})};var Fo=function(a,b,c){nk(b,c,a)},Go=function(a,b,c){nk(b,c,a,!0)},Io=function(a,b){};
function Ho(a,b){}var Z={a:{}};

Z.a.jsm=["customScripts"],function(){(function(a){Z.__jsm=a;Z.__jsm.b="jsm";Z.__jsm.g=!0;Z.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=P("google_tag_manager");var d=c&&c.e&&c.e(b);dm(d,"jsm",a.vtp_gtmEventId);return d}catch(e){}}})}();
Z.a.c=["google"],function(){(function(a){Z.__c=a;Z.__c.b="c";Z.__c.g=!0;Z.__c.priorityOverride=0})(function(a){dm(a.vtp_value,"c",a.vtp_gtmEventId);return a.vtp_value})}();
Z.a.e=["google"],function(){(function(a){Z.__e=a;Z.__e.b="e";Z.__e.g=!0;Z.__e.priorityOverride=0})(function(a){return String(Le(a.vtp_gtmEventId,"event"))})}();
Z.a.f=["google"],function(){(function(a){Z.__f=a;Z.__f.b="f";Z.__f.g=!0;Z.__f.priorityOverride=0})(function(a){var b=Ul("gtm.referrer",1)||G.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?Ve(Xe(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):Tl(String(b)):String(b)})}();Z.a.k=["google"],function(){(function(a){Z.__k=a;Z.__k.b="k";Z.__k.g=!0;Z.__k.priorityOverride=0})(function(a){return Xl(a.vtp_name,Ul("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();

Z.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){Z.__u=b;Z.__u.b="u";Z.__u.g=!0;Z.__u.priorityOverride=0})(function(b){var c;b.vtp_customUrlSource?c=b.vtp_customUrlSource:c=Ul("gtm.url",1);c=c||Rl();var d=b[a("vtp_component")];if(!d||"URL"==d)return Tl(String(c));var e=Xe(String(c)),f;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],p;h?wa(k)?p=k:p=String(k).replace(/\s+/g,
"").split(","):p=[String(k)];for(var n=0;n<p.length;n++){var r=Ve(e,"QUERY",void 0,void 0,p[n]);if(void 0!=r&&(!l||""!==r)){f=r;break a}}f=void 0}else f=Ve(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return f})}();
Z.a.v=["google"],function(){(function(a){Z.__v=a;Z.__v.b="v";Z.__v.g=!0;Z.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=Ul(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1),d=void 0!==c?c:a.vtp_defaultValue;dm(d,"v",a.vtp_gtmEventId);return d})}();
Z.a.ua=["google"],function(){function a(n,r){if(ld()&&!d[n]){var t=function(){var q=Fh(),u="gtm"+be(),v=l(r),w={name:u};k(v,w,!0);q("create",n,w);q(function(){q.remove(u)})};od(t,C.L);od(t,C.o);d[n]=!0}}var b,c={},d={},e=function(n){ud(function(){p(n)},[C.L,C.o])},f={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,cookieFlags:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,
storage:!0,useAmpClientId:!0,storeGac:!0,_cd2l:!0},h={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,allowAdFeatures:!0,allowAdPersonalizationSignals:!0,_cd2l:!0},k=function(n,r,t){var q=0;if(n)for(var u in n)if(n.hasOwnProperty(u)&&(t&&f[u]||!t&&void 0===f[u])){var v=h[u]?Ea(n[u]):n[u];"anonymizeIp"!=u||v||(v=void 0);r[u]=v;q++}return q},l=
function(n){var r={};n.vtp_gaSettings&&m(Km(n.vtp_gaSettings.vtp_fieldsToSet,"fieldName","value"),r);m(Km(n.vtp_fieldsToSet,"fieldName","value"),r);sd(C.L)||(r.storage="none");sd(C.o)||(r.allowAdFeatures=!1,r.storeGac=!1);Qj()||(r.allowAdFeatures=!1);Pj()||(r.allowAdPersonalizationSignals=!1);n.vtp_transportUrl&&(r._x_19=n.vtp_transportUrl);return r},p=function(n){function r(ma,
R){void 0!==R&&D("set",ma,R)}var t={},q={},u={},v={};if(n.vtp_gaSettings){var w=n.vtp_gaSettings;m(Km(w.vtp_contentGroup,"index","group"),q);m(Km(w.vtp_dimension,"index","dimension"),u);m(Km(w.vtp_metric,"index","metric"),v);var y=m(w);y.vtp_fieldsToSet=void 0;y.vtp_contentGroup=void 0;y.vtp_dimension=void 0;y.vtp_metric=void 0;n=m(n,y)}m(Km(n.vtp_contentGroup,"index","group"),q);m(Km(n.vtp_dimension,"index","dimension"),u);m(Km(n.vtp_metric,"index","metric"),v);var x=l(n),A=Hh(n.vtp_functionName);
if(ta(A)){var B="",z="";n.vtp_setTrackerName&&"string"==typeof n.vtp_trackerName?""!==n.vtp_trackerName&&(z=n.vtp_trackerName,B=z+"."):(z="gtm"+be(),B=z+".");var D=function(ma){var R=[].slice.call(arguments,0);R[0]=B+R[0];A.apply(window,R)},F=function(ma,R){return void 0===R?R:ma(R)},J=function(ma,R){if(R)for(var Ua in R)R.hasOwnProperty(Ua)&&D("set",ma+Ua,R[Ua])},O=function(){var ma=function(Mo,Qk,No){if(!Sa(Qk))return!1;for(var Bd=
Ia(Object(Qk),No,[]),Wg=0;Bd&&Wg<Bd.length;Wg++)D(Mo,Bd[Wg]);return!!Bd&&0<Bd.length},R;if(n.vtp_useEcommerceDataLayer){var Ua=!1;Ua||(R=Ul("ecommerce",1))}else n.vtp_ecommerceMacroData&&(R=n.vtp_ecommerceMacroData.ecommerce);if(!Sa(R))return;R=Object(R);var Sb=Ia(x,"currencyCode",R.currencyCode);void 0!==Sb&&D("set","&cu",Sb);ma("ec:addImpression",
R,"impressions");if(ma("ec:addPromo",R[R.promoClick?"promoClick":"promoView"],"promotions")&&R.promoClick){D("ec:setAction","promo_click",R.promoClick.actionField);return}for(var Tb="detail checkout checkout_option click add remove purchase refund".split(" "),lc="refund purchase remove checkout checkout_option add click detail".split(" "),gb=0;gb<Tb.length;gb++){var ob=R[Tb[gb]];if(ob){ma("ec:addProduct",ob,"products");D("ec:setAction",Tb[gb],ob.actionField);if(ve)for(var Eb=0;Eb<lc.length;Eb++){var Ic=
R[lc[Eb]];if(Ic){Ic!==ob&&qc(13);break}}break}}},T={name:z};k(x,T,!0);var V=n.vtp_trackingId||t.trackingId;A("create",V,T);D("set","&gtm",pi(!0));ld()&&(D("set","&gcs",td()),a(V,n));x._x_19&&(null==Mc&&delete x._x_19,x._x_20&&!c[z]&&(c[z]=!0,A(Lh(z,String(x._x_20)))));n.vtp_enableRecaptcha&&
D("require","recaptcha","recaptcha.js");(function(ma,R){void 0!==n[R]&&D("set",ma,n[R])})("nonInteraction","vtp_nonInteraction");J("contentGroup",q);J("dimension",u);J("metric",v);var ra={};k(x,ra,!1)&&D("set",ra);var M;n.vtp_enableLinkId&&D("require","linkid","linkid.js");D("set","hitCallback",function(){var ma=x&&x.hitCallback;
ta(ma)&&ma();n.vtp_gtmOnSuccess()});if("TRACK_EVENT"==n.vtp_trackType){n.vtp_enableEcommerce&&(D("require","ec","ec.js"),O());var N={hitType:"event",eventCategory:String(n.vtp_eventCategory||t.category),eventAction:String(n.vtp_eventAction||t.action),eventLabel:F(String,n.vtp_eventLabel||t.label),eventValue:F(Da,n.vtp_eventValue||t.value)};k(M,N,!1);D("send",N);}else if("TRACK_SOCIAL"==
n.vtp_trackType){var L={hitType:"social",socialNetwork:String(n.vtp_socialNetwork),socialAction:String(n.vtp_socialAction),socialTarget:String(n.vtp_socialActionTarget)};k(M,L,!1);D("send",L);}else if("TRACK_TRANSACTION"==n.vtp_trackType){}else if("TRACK_TIMING"==n.vtp_trackType){}else if("DECORATE_LINK"==n.vtp_trackType){}else if("DECORATE_FORM"==n.vtp_trackType){}else if("TRACK_DATA"==n.vtp_trackType){}else{n.vtp_enableEcommerce&&(D("require","ec","ec.js"),O());if(n.vtp_doubleClick||"DISPLAY_FEATURES"==n.vtp_advertisingFeaturesType){var ka="_dc_gtm_"+String(n.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,
"");D("require","displayfeatures",void 0,{cookieName:ka})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==n.vtp_advertisingFeaturesType){var kc="_dc_gtm_"+String(n.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");D("require","adfeatures",{cookieName:kc})}M?D("send","pageview",M):D("send","pageview");n.vtp_autoLinkDomains&&Ih(B,n.vtp_autoLinkDomains,!!n.vtp_useHashAutoLink,!!n.vtp_decorateFormsAutoLink);}if(!b){var Db=
n.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";n.vtp_useInternalVersion&&!n.vtp_useDebugVersion&&(Db="internal/"+Db);b=!0;var Ad=bi(x._x_19,"/analytics.js"),nb=Mg("https:","http:","//www.google-analytics.com/"+Db,x&&!!x.forceSSL);K("analytics.js"===Db&&Ad?Ad:nb,function(){var ma=Fh();ma&&ma.loaded||n.vtp_gtmOnFailure();},n.vtp_gtmOnFailure)}}else H(n.vtp_gtmOnFailure)};Z.__ua=e;Z.__ua.b="ua";Z.__ua.g=!0;Z.__ua.priorityOverride=0}();







Z.a.smm=["google"],function(){(function(a){Z.__smm=a;Z.__smm.b="smm";Z.__smm.g=!0;Z.__smm.priorityOverride=0})(function(a){var b=a.vtp_input,c=Km(a.vtp_map,"key","value")||{},d=c.hasOwnProperty(b)?c[b]:a.vtp_defaultValue;dm(d,"smm",a.vtp_gtmEventId);return d})}();



Z.a.paused=[],function(){(function(a){Z.__paused=a;Z.__paused.b="paused";Z.__paused.g=!0;Z.__paused.priorityOverride=0})(function(a){H(a.vtp_gtmOnFailure)})}();

Z.a.html=["customScripts"],function(){function a(d,e,f,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,f,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var p=G.createElement("script");p.async=!1;p.type="text/javascript";p.id=k.id;p.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(p.charset=k.charset);var n=k.getAttribute("data-gtmsrc");n&&(p.src=n,Oc(p,l));d.insertBefore(p,null);n||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var r=
[];k.firstChild;)r.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,r,l,h)()}else d.insertBefore(k,null),l()}else f()}catch(t){H(h)}}}var b=function(d,e,f){rh(function(){var h,k=I;k.postscribe||(k.postscribe=mc);h=k.postscribe;var l={done:e},p=G.createElement("div");p.style.display="none";p.style.visibility="hidden";G.body.appendChild(p);try{h(p,d,l)}catch(n){H(f)}})};var c=function(d){if(G.body){var e=
d.vtp_gtmOnFailure,f=em(d.vtp_html,d.vtp_gtmOnSuccess,e),h=f.gd,k=f.H;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(G.body,Xc(h),k,e)()}else Pl(function(){c(d)},
200)};Z.__html=c;Z.__html.b="html";Z.__html.g=!0;Z.__html.priorityOverride=0}();








var Jo={};Jo.macro=function(a){if(nl.Pc.hasOwnProperty(a))return nl.Pc[a]},Jo.onHtmlSuccess=nl.he(!0),Jo.onHtmlFailure=nl.he(!1);Jo.dataLayer=He;Jo.callback=function(a){$d.hasOwnProperty(a)&&ta($d[a])&&$d[a]();delete $d[a]};function Ko(){I[Pd.B]=Jo;Ka(ae,Z.a);Ab=Ab||nl;Bb=Ob}
function Lo(){ad.gtm_3pds=!0;ad.gtag_cs_api=!0;I=E.google_tag_manager=E.google_tag_manager||{};Qi();if(I[Pd.B]){var a=I.zones;a&&a.unregisterChild(Pd.B);
}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)tb.push(c[d]);for(var e=b.tags||[],f=0;f<e.length;f++)wb.push(e[f]);for(var h=b.predicates||[],k=0;k<h.length;k++)vb.push(h[k]);for(var l=b.rules||[],p=0;p<l.length;p++){for(var n=l[p],r={},t=0;t<n.length;t++)r[n[t][0]]=Array.prototype.slice.call(n[t],1);ub.push(r)}yb=Z;zb=Em;Ko();ml();mh=!1;nh=0;if("interactive"==G.readyState&&!G.createEventObject||
"complete"==G.readyState)ph();else{Tc(G,"DOMContentLoaded",ph);Tc(G,"readystatechange",ph);if(G.createEventObject&&G.documentElement.doScroll){var q=!0;try{q=!E.frameElement}catch(y){}q&&qh()}Tc(E,"load",ph)}wk=!1;"complete"===G.readyState?yk():Tc(E,"load",yk);a:{
if(!ve)break a;E.setInterval(we,864E5);}Yd=(new Date).getTime();}}
(function(a){a()})(Lo);

})()