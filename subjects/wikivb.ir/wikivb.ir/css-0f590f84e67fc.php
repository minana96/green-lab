/*--------------------------------  WikiVB V6.0 Beta --------------------------------*\
/*-----------------------------------------------------------------------------------*\
	            Style Designed By WikiVB Vbulletin Support Team
               All rights reserved with WikiVB.Ir @ http://www.wikivb.ir    
                             Download Best Mods & Styles    
                                      For Free
                              W w W . W i K i V b . I r
=======================================================================================
                                  TABLE OF CONTENTS
=======================================================================================
\*-----------------------------------------------------------------------------------*/
@charset "utf-8";
/* CSS Document */
* {
	box-shadow: 0 0 0 rgba(255,255,255,0.0) !important;
}
@font-face {
	font-family: 'icon';
	src:url('wikivb/wikivb-v6/fonts/icons.eot?7a9cdp');
	src:url('wikivb/wikivb-v6/fonts/icons.eot?#iefix7a9cdp') format('embedded-opentype'),
		url('wikivb/wikivb-v6/fonts/icons.woff?7a9cdp') format('woff'),
		url('wikivb/wikivb-v6/fonts/icons.ttf?7a9cdp') format('truetype'),
		url('wikivb/wikivb-v6/fonts/icons.svg?7a9cdp#icomoon') format('svg');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: Sans;
	font-style: normal;
	font-weight: bold;
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Bold.eot');
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Bold.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Bold.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Bold.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Bold.ttf') format('truetype');
}
@font-face {
	font-family: Sans;
	font-style: normal;
	font-weight: 500;
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Medium.eot');
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Medium.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Medium.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Medium.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Medium.ttf') format('truetype');
}
@font-face {
	font-family: Sans;
	font-style: normal;
	font-weight: 300;
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Light.eot');
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Light.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Light.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_Light.ttf') format('truetype');
}
@font-face {
	font-family: Sans;
	font-style: normal;
	font-weight: 200;
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_UltraLight.eot');
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_UltraLight.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_UltraLight.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_UltraLight.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb_UltraLight.ttf') format('truetype');
}
@font-face {
	font-family: Sans;
	font-style: normal;
	font-weight: normal;
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb.eot');
	src: url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb.eot?#iefix') format('embedded-opentype'),  /* IE6-8 */
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb.woff2') format('woff2'),  /* FF39+,Chrome36+, Opera24+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb.woff') format('woff'),  /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
		 url('wikivb/wikivb-v6/fonts/sans/IRANSansWeb.ttf') format('truetype');
}
body {font-family: Sans;color: #778b9f;}
html a , body a {
	text-decoration: none !important;
	color: #8099d6;
}
h1 , h2 , h3 , h4 , h5 , h6 , ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}
html a , body a , :before , :after ,.social-media a span , .topx-bit,.namestyle b,.thumbstyle,.thumbstyle b , .recomended-market ul li,.namemarket , .all-stats li,.toggle-collapse , .description ,.btn-lg  , .the-avatar{
	-moz-transition: all 0.2s ease-in;
	-webkit-transition: all 0.2s ease-in;
	-o-transition: all 0.2s ease-in;
	-ms-transition: all 0.2s ease-in;
}
input , textarea , select {
	border-color: #d6d6d6 !important;
	border-radius: 2px !important;
}
.fixbox {
	display: block;
	margin: 0 auto;
	width: 1500px;
}
.wikivb-header {
	height: 220px;
	background: #323a45;
	margin: 0 0 -125px 0;
}
.logo {
	color: #e1e5eb;
	font-family: Sans;
	font-size: 26px;
	font-weight: bold;
	margin: 27px 0 0 0;;
	float: right;
}
.logo:hover {color: #e1e5eb;}
.logo:before {
	content: "\e901";
	font: 30px 'Icon';
	color: #262c32;
	float: right;
	margin: 3px 15px 0 9px;
}
.logo:hover:before {color: #d2eb5f;}
.logo span {
	font-weight: normal;
	font-size: 13px;
	color: #7e8a9b;
	margin: 0 10px 0 0;
}
.header-ads {
	float: left;
	padding: 3px;
	margin: 13px 0 0 15px;
	background: rgba(0,0,0,0.2);
}
.icon-userimage img {
        height: 37px;
        position: relative;
        top: 0px;
        box-shadow: 0 0 0 2px rgba(0,0,0,0.1) !important;
}
.toplinks {display: none !important;}
.navbar {
	margin: -11px -11px 48px -11px;
	font-family: Sans;
}
.navtabs {
	background: #dfe2e9;
	height: 45px;
	line-height: 45px;
}
.navtabs li a.navtab {
	background: #d7dbe4;
	font: 13px Sans;
	color: #949ead;
	padding: 0 10px;
	line-height: 40px;
	height: auto;
	margin: 5px 2px 0 3px;
	min-width: auto;
	text-align: right;
	box-shadow: 0 0px #f3f5f8 inset !important;
}
.navtabs li:first-child a.navtab {
	margin-right: 6px;
}
.navtabs li.selected a.navtab {
	background: #f3f5f8;
}
.navtabs li a.navtab:hover {
	box-shadow: 0 -40px #f3f5f8 inset !important;
	background: #d7dbe4;
	color: #8994a4;
}
.navtabs li a.navtab:before {
	content: "\e901";
	font: 16px 'Icon';
	float: right;
	line-height: 38px;
	margin: 0 -2px 0 6px;
}
.navtabs .floatcontainer {
	background: url(wikivb/wikivb-v6/dots.png) repeat-x bottom;
	border-radius: 0px;
	font-family: Sans;
	line-height: 33px;
	top: 45px;
	padding-bottom: 15px;
}
.navtabs li.selected li a {
	color: #9ba2ad !important;
	font: 11px Sans;
	background: #eaecf3 !important;
	padding: 1px 5px 1px 5px; !important;
	margin: 0 2px;
}
.navtabs ul li:first-child {margin-right: 10px;}
.navtabs li.selected li a.popupctrl{padding-left: 10px;}
.navtabs li.selected li a.popupctrl:before {
	content: "+";
	font: 12px 'Sans';
	font-weight: 200;
	margin: 10px -9px 0 0;
	float: left;
	border-radius: 50%;
	background: #d5d9e9;
	line-height: 11px;
	width: 13px;
	text-align: center;
	color: #fff;
	position: relative;
	padding: 2px 0 0 0;
}
.navtabs li.selected li a.popupctrl:hover:before,.navtabs li.selected li:hover a.popupctrl.active:before, .navtabs li.selected li a.popupctrl.active:before {background: #b5c0da;}
.navtabs li.selected li:hover a.popupctrl.active:before, .navtabs li.selected li a.popupctrl.active:before {content: '-';}
.navtabs .popupbody {
	background: #f4f6f9;
	border: 2px solid rgba(0,0,0,0.03);
	border-radius: 0px;
}
.navtabs li.selected .popupbody li a {
	margin: 0;
	font-size: 13px;
	font-weight: 400;
	padding-top: 2px;
	padding-bottom: 2px;
}
.navtabs li.selected .popupbody li a:hover {
	background: #f3f5f8 !important;
	color: #8ea9d2 !important;
}
#navtabs .popupmenu ul, #navtabs .popupmenu ul li a {top: 30px !important;}
.navbar .drop-menu {
	float: left;
	position: relative;
	z-index: 99;
}
.navbar .drop-menu .dm-title {
	cursor: pointer;
}
.navbar .drop-menu .dm-title:before {
	content: "\e111";
	font: 15px 'Icon';	
	line-height: 43px;
	width: 45px;
	text-align: center;
	display: inline-block;
	background: #667890;
	padding-bottom: 2px;
	color: #6e7b8d;
	box-shadow: 0 45px #cdd1dd inset !important;
}
.navbar .drop-menu:hover .dm-title:before , .navbar .drop-menu .active-dmt:before {
	box-shadow: 0 0 #cdd1dd inset !important;
	background: #667890;
	color: #d5ddf4;
}
.navbar .drop-menu .dm-list {
	display: none;
	position: absolute;
	left: 0;
	top: 45px;
	background: #667890;
	z-index: 99999;
	padding: 1px 0 5px 0;
	width: 150px;
}
.navbar .drop-menu .dm-list a {
	display: block;
	color: #d5ddf4;
	line-height: 27px;
	padding: 0 10px 2px 10px;
	background: rgba(0,0,0,0.1);
	margin: 4px 5px 0 5px;
}
.navbar .drop-menu .dm-list a:before {
	content: "\e213";
	font: 13px 'Icon';
	float: right;
	line-height: 27px;
	margin: 0 -3px 0 5px;
}
.navbar .drop-menu .dm-list .one:before {
	content: "\e220";
	color: #cbe35e;
	font-size: 13px;
}
.navbar .drop-menu .dm-list .two:before {
	content: "FA";
	color: #6ac0e4;
	font: bold 11px Sans;
	line-height: 30px;
}
.navbar .drop-menu .dm-list .three:before {
	content: "\e137";
	color: #e4a96a;
	font-size: 12px;
	line-height: 27px;
}
.navbar .drop-menu .dm-list .four:before {
	content: "\e002";
	color: #cbe35e;
	font-size: 12px;
	line-height: 27px;
}
.navbar .drop-menu .dm-list .five:before {
	content: "\e203";
	color: #e0aaf2;
	line-height: 26px;
}
.navbar .drop-menu .dm-list:hover a {opacity: 0.3;}
.dm-list a:hover {opacity: 1 !important;}
.social-media {
	float: left;
	margin: 8px 0 0 7px;
}
.social-media a {
	height: auto !important;
	padding: 0px !important;
}
.social-media a span {
	float: left;
	margin: 0 2px;
}
.social-media a .sm-facebook:before,.social-media a .sm-instagram:before {
	content: "\e907";
	font: 16px 'Icon';
	color: #6e9ef6;
}
.social-media a .sm-instagram:before {
	content: "\e908";
	color: #A87B5A;
	font: 18px 'Icon';
}
.social-media a .sm-telegram {
	background: #2ca5e0;
	font: 11px Arial;
	line-height: 17px;
	padding: 0 4px;
	border-radius: 2px;
	letter-spacing: 1px;
	margin-left: 6px;
}
.social-media a .sm-telegram:before {
	content: "\e90a";
	font: 11px 'Icon';
	margin: 0 3px 0 0;
}
.social-media:hover a .sm-telegram,.social-media:hover a .sm-facebook,.social-media:hover a .sm-instagram {
	opacity: 0.2;
}
.social-media a span:hover {opacity: 1 !important;}
.statisbox {
	height: 250px;
	background: #e7eaf0;
	margin: -22px -10px 0px -10px;
	font-family: Sans;
}
.minifile {
	height: 235px;
	width: 295px;
	float: right;
	background: url(wikivb/wikivb-v6/dots-y.png) repeat-y left;
	margin-top: 15px;
	position: relative;
}
.vietvbox {
	height: 230px;
	padding: 15px 0px 0 0px;
	overflow: hidden;
	position: relative;
}
.minifile-hi {
	display: block;
	color: #919fb4;
	font-size: 14px;
	margin: 15px 20px 20px 0;
}
.minifile-hi b {font-weight: 500;}
.minifile-hi .mhi-wlc {
	color: #a2adbc;
	margin: 0 0 0 4px;
}
.minifile-avatar {
	float: right;
	margin: 0px 15px 0 10px;
	border-radius: 8px;
}
.minifile-details {
	overflow: hidden;
	padding: 0 0 0 10px;
	line-height: 27px;
	margin-top: 25px;
}
.minifile-details dd,.minifile-details dt {
	width: 56%;
	display: inline-block;
	color: #8691a2;
}
.minifile-details dd {
	width: auto;
	float: left;
	background: #b5c0da;
	line-height: 12px;
	font-size: 10px;
	padding: 2px 5px 0 5px;
	color: #e7eaf0;
	border-radius: 15px;
	margin: 6px 0 0 20px;
}
.minifile-details dt:before {
	content: "\e037";
	font: 12px 'Icon';
	color: #8d97a7;
	float: right;
	line-height: 22px;
	margin: 0 0 0 6px;
}
.minifile-details #the-posts:before {content: "\e037";}
.minifile-details #register-number:before {content: "\e007";}
.minifile-details #the-usertitle:before {content: "\e258";}
.minifile-details #the-usertitle {width: 30%;}
.minifile-links {
	position: absolute;
	bottom: 0;
	height: 70px;
	right: 0;
	left: 14px;
	border-top: 1px solid #d6d9e0;
}
.minifile-links li {
	display: inline-block;
	margin: 0 -2px;
	width: 49%;
}
.minifile-links li a {
	line-height: 67px;
	color: #8d97a7;
	padding-bottom: 3px;
	display: block;
}
.minifile-links #two {border-right: 1px solid #d6d9e0;}
.minifile-links li a:before {
	content: "\e265";
	font: 16px 'Icon';
	float: right;
	line-height: 65px;
	margin: 0 15px 0 7px;
}
.minifile-links #two a:before {content: "\e138";font-size: 14px;}
.minifile-links li a:hover {color: #8ea9d2;}
/*VietvBB*/
.right-mainbox {
	width: 100%;
}
.mainbox {
	background: none;
	border: 0px;
}
#vbtopx_content .forumrow {
	background: none !important;
	border: 0px !important;
}
.tabs {
	background: none;
	border-top: 0px;
	margin: 0 -2px 2px -2px;
	padding: 6px 15px 8px 15px;
	height: auto !important;
	border-bottom: 1px solid #d6d9e0;
}
.topx-content {
	overflow: hidden;
	width: auto;
	margin: 0 -2px 0 12px
}
#vietvbb-title {
	float: right !important;
	border: 0px !important;
	background: none !important;
	font-size: 13px !important;
	color: #a2adbc;
	margin: 6px 0 0 0 !important;
}
#vietvbb-title:before {
	content: "\e156";
	font: 14px 'Icon';
	color: #8d97a7;
	margin: 0 0 0 6px;
}
.tabs li {
	float: left;
	background: none !important;
	border: 0px;
	margin-right: 4px;
}
.tabs li span {
	background: #d7dce4 !important;
	margin: 2px 0 0px 0;
	color: #8d97a7;
	font-size: 12px;
	font-weight: normal;
	border-radius: 15px;
	float: left;
	line-height: 21px;
}
.tabs .current span {color: #fff;background: #1abc9c !important;}
.topx-content-scroll .mCSB_scrollTools {
	right: 10px !important;
}
.topx-content-scroll .mCSB_scrollTools .mCSB_draggerRail {
	width: 6px;
	background: none !important;
}
.topx-content-scroll .mCustomScrollBox>.mCSB_scrollTools {
	right: 0px !important;
}
.topx-content-scroll .mCSB_dragger_bar {
	width: 6px !important;
	background: #ced7e5 none !important;
}
.topx-content-scroll .mCSB_dragger_bar:hover {
	background: #9aa6b8 !important;
}
.topx-bit {
	height: auto;
	background: none !important;
	padding: 6px 0px;
	width: auto;
	display: block;
	border-bottom: 1px solid #d6d9e0;
	font: 13px Sans;
	color: #8494ab;
	margin: 0 15px 0 3px;
}
.topx-bit:last-child {border: 0px;}
.topx-bit a {color: #8494ab;}
.topx-bit em {
	font-size: 11px;
	background: #f1f5fc;
	line-height: 13px;
	padding: 3px 7px 0 7px;
	border-radius: 20px;
	margin: 2px 0 0 0;
}
.topx-content-scroll {height: 190px;overflow: hidden;}
/*.topx-content:hover .topx-bit {opacity: 0.3;}*/
.topx-bit:hover {opacity: 1 !important;border-color: rgba(0,0,0,0.03);}
.topx-content a:hover {
	color: #8ea9d2;
}
.topx-content-tab:before {
	content: "\e310";
	font: 12px 'Icon';
	color: #bbc7d9;
	margin: 0 0 0 6px;
}
.tct-new:before {color: #8ea9d2;}
#vietvbb_topstats_t_loading {
	position: absolute;
	top: 50%;
	left: 0 !important;
	right: 0 !important;
	margin: -35px auto 0 auto;
	height: 60px;
	width: 60px;
	z-index: 999;
	background: #f3f5f8 !important;
	border-radius: 50%;
	padding: 5px;
}
#vietvbb_topstats_t_loading img {
	height: 60px;
	width: 60px;
}
.h1hiden {display: none;}
.wikiside {
	width: 280px !important;	
	padding: 0 0px 0 0px !important;
	margin: 0px -10px 0 0;
	position: sticky;
	top: 0px;
}
#content_container {padding: 0;}
.wikiside > ul {
	background: none !important;
	border: 0px !important;
}
.wikiside .underblock {display: none;}
#content_container #content {
	background: url(wikivb/wikivb-v6/dots-y.png) repeat-y right;
	padding-right: 25px;
	margin-right: 270px;
}
.side {
	display: block;
	wisth: auto;
	padding: 0 15px;
	margin-bottom: 15px;
}
.side .side-title {
	color: #8592a7;
	border-bottom: 1px solid #d9dde9;
	margin: 0 -5px 12px -5px;
	line-height: 50px;
	position: relative;
	font-size: 14px;
}
.side .side-title:before {
	content: "\e156";
	font: 14px 'Icon';
	color: #bbc7d9;
	margin: 0 12px 0 12px;
}
.side .side-title:after {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
.recomended-styles .side-title:before {content: "\e013";}
.recomended-styles ul li {
	display: table;
	margin: 8px auto;
}
.recomended-styles ul li .thumbstyle {
	height: 95px;
	width: 250px;
	display: table;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 0px rgba(191,200,222,0.89) inset !important;
	background-size: cover !important;
	background-position: center !important;
}
.recomended-styles ul li .thumbstyle b {
	display: table;
	margin: 0px auto 0px auto;
	font-weight: 500;
	color: #5c657b;
	font-size: 15px;
	opacity: 0;
}
.recomended-styles ul li .thumbstyle b:before {
	content: "\e012";
	font: 30px 'Icon';
	display: table;
	margin: 19px auto 6px auto;
}
.recomended-styles ul li:hover .thumbstyle {
	box-shadow: 0 -100px rgba(191,200,222,0.89) inset !important;
}
.recomended-styles ul li:hover .thumbstyle b {opacity: 1;}
.recomended-styles ul li .namestyle {
	background: #dbdee5;
	display: block;
	line-height: 30px;
	border-radius: 0 0 8px 8px;
	text-align: left;
	padding: 0 10px;
	font-size: 11px;
	color: #8d97a7;
}
.recomended-styles ul li .namestyle b {
	float: right;
	background: #b5c0da;
	line-height: 14px;
	padding: 2px 7px 0 7px;
	border-radius: 20px;
	margin: 7px -3px 0 0;
	color: #eaecf0;
	font-weight: 200;
}
.recomended-styles ul li:hover .namestyle b {background: #7d8eb6;}
.recomended-market ul {
	display: table;
	margin: 0 auto;
}
.recomended-market ul li {
	display: inline-block;
	margin: 0 7px;
	height: 100px;
	width: 100px;
	text-align: center;
	border-radius: 8px;
	box-shadow: 0 0 rgba(91,105,146,0.91) inset !important;
}
.recomended-market ul li:hover {
	box-shadow: 0 50px rgba(91,105,146,0.91) inset,0 -50px rgba(91,105,146,0.91) inset !important;
}
.recomended-market ul li a {
	color: #eaecf0 !important;
	font-size: 14px;
	font-weight: 200;
	display: table;
	margin: 0 auto;
}
.recomended-market ul li a:before {
	content: "\e191";
	font: 18px 'Icon';
	display: block;
	margin: 18px auto 6px auto;
}
.recomended-market ul li a b {
	font-weight: 200;
	margin: 4px auto 0px auto;
	background: rgba(0,0,0,0.3);
	line-height: 16px;
	padding: 2px 7px 0 7px;
	border-radius: 20px;
	color: #eaecf0;
	font-size: 11px;
	display: table;
}
.namemarket {opacity: 0;}
.recomended-market ul li:hover .namemarket {opacity: 1;}
.recomended-market .side-title:before {content: "\e210";}
.important-links ul li {
	color: #8592a7 !important;
	line-height: 24px;
}
.important-links ul li a {
	color: #8592a7 !important;
}
.important-links ul li a:before {
	content: '';
	height: 7px;
	width: 7px;
	background: #b5c0da;
	float: right;
	box-shadow: 0 0 0 2px rgba(0,0,0,0.0) !important;
	border-radius: 50%;
	margin: 8px 5px 0 6px;
}
.important-links ul li a:hover:before {
	box-shadow: 0 0 0 2px #b5c0da !important;
	background: none;
}
.wgo-tabs {
	display: block;
	text-align: center;
	margin-top: 20px;
}
.wgo-tabs li {
	display: inline-block;
	width: 31%;
	margin: 0 -2px;
}
.wgo-tabs li a {
	display: block;
	box-shadow: 0 -1px #d9dde9 inset !important;
}
.wgo-tabs li .active {
	border: 1px solid #d9dde9;
	border-bottom: 0px;
	box-shadow: 0 0px #d9dde9 inset !important;
}
.wgo-tabs li a span:before {
	content: "\e044";
	font: 16px 'Icon';
	line-height: 33px;
	color: #93a9cc;
}
.wgo-tabs .who-online-now-tab a span:before {content: "\e044";}
.wgo-tabs .who-online-tab a span:before {content: "\e042";}
.wgo-tabs .happy-birthday-tab a span:before {content: "\e070";}
.who-boxes {
	display: block;
	clear: both;
	padding: 0 12px;
	color: #8592a7;
}
.wo-title {
	color: #8592a7;
	font-size: 12px;
	display: block;
	line-height: 24px;
	padding: 13px 0;
	font-weight: 500;
}
.wo-title:before {
	content: "\e004";
	font: 12px 'Icon';
	float: right;
	line-height: 20px;
	margin: 0 0 0 5px;
}
.wo-title b {
	float: left;
	font-weight: normal;
	background: #b8c5e2;
	line-height: 17px;
	color: #f3f5f8;
	padding: 0 5px;
	border-radius: 20px;
	margin: 3px 0 0 5px;
}
.user-on-line:before {content: "\e004";}
.who-userlist {
	text-align: left;
	direction: ltr;
}
.who-userlist li {
	font-size: 11px;
	font-weight: 500;
	color: #666666 !important;
}
.who-userlist li a {color: #666666 !important;}
.today-users:before {content: "\e135";}
.last-user:before {display: none;}
.last-user a {font-size: 11px;color: #666666 !important;}
.who-online-now #vsa_vilxh , .who-online .today-users ,.who-online #wgo_wjt_list ,.who-online .disnone {display: none !important;}
#vilxh_users_area a {font-size: 11px;font-weight: 500;}
.online-userx:before {content: "\e080";}
.user-birthday:before {content: "\e279";}
.all-stats {
	display: block;
	text-align: center;
	margin: 10px 0;
}
.all-stats li {
	display: inline-block;
	border: 1px solid #e4e8f3;
	margin: 0 -3px;
	background: #f3f5f8;
	width: 29%;
	padding: 8px 0px 8px 0px;
	color: #8592a7;
}
.all-stats li b {
	display: table;
	font-weight: 200;
	margin: 7px auto 0 auto;
	background: #b5c2d6;
	color: #fff;
	font-size: 12px;
	line-height: 13px;
	padding: 2px 5px 0 5px;
	border-radius: 20px;
}
.all-stats:hover .alls-list {
	opacity: 0.2;
	background: #e4e8f3;
}
.alls-list:hover {
	opacity: 1 !important;
	background: #f3f5f8 !important;
}
.development {
	border: 3px solid #dee4f0;
	display: block;
	padding: 10px 18px 10px 10px;
	text-align: left;
	min-height: 46px;
	margin: 0;
}
.development span,.development b {
	font-weight: 500;
	color: #6a778b;
	font-size: 16px;
	float: right;
	clear: right;
}
.development b {
	font-weight: 500;
	color: #c34b4b;
	font-size: 13px;
	margin-top: 7px;
}
.development ul {margin: 8px 0 0 0;}
.development ul li {
	display: inline-block;
}
.development ul li a {
	background: #7a8ba5;
	display: block;
	color: #f3f5f8;
	font-size: 15px;
	line-height: 26px;
	padding: 0 10px;
	border-radius: 30px;
}
.development ul li a:before {
	content: "\e002";
	font: 12px 'Icon';
	margin: 0 -2px 0 4px;
}
.development ul #order a {background: #2ecc71;color: #fff;}
.development ul #order a:before {content: "\e203";}
.development ul li a:hover {background: #b5c0da !important;}
.clearboth {clear: both;display: table;}
.forumads {
	display: block;
	text-align: center;
	border: 3px solid #dee4f0;
	padding: 10px 0 5px 0;
}
.toggle-cat-coll {clear: both;}
.tcs-open , .coll-colosed .tcs-close {display: none;cursor: pointer;}
.tcs-close , .coll-colosed .tcs-open {display: inline-block;cursor: pointer;}
.forumbit_nopost .toggle-collapse img {height: 24px;width: 24px;}
.forumhead .collapse {margin: 5px 0 0 7px;float: left !important;}
.forumbit_post .forumactionlink {margin: 0px;}
.wikivbfh , .forumhead,.threadlisthead , .blockhead {
	background: #475364;
	display: block;
	border: 0px;
	height: 45px;
	color: #f3f5f8;
	padding: 0;
	border-radius: 0;
	position: relative;
	font-family: Sans;
	font-weight: normal;
}
.blockhead {
	font-size: 16px;
	line-height: 42px;
	padding: 0 10px;
	font-weight: 200;
}
.wikivbfh {margin-top: 0px !important;}
.forumhead {margin-top: 8px;}
#forums .L1 .wikivbfh a,.forumbit_nopost .wikivbfh .forumtitle a {
	color: #f3f5f8;
	font: 13px 'sans',iranian sans,Tahoma;
	line-height: 35px;
	display: inline-block;
	margin-right: 0;
}
.forum-frame {
	display: table;
	width: 100%;
	margin: 8px 0;
}
.wikivbfh .forumthreadpost,.wikivbfh .forumlastpost {display: none !important;}
.wikivbfh:before {
	content: "\e114";
	font: 20px 'Icon';
	float: right;
	margin: 11px 11px 0 10px;
}
.wikivbfh .toggle-collapse {
	height: 45px;
	width: 45px;
	background: #3f4a59;
	padding: 0px !important;
	margin: 0 0 0 -3px;
	opacity: 0;
}
.forum-frame:hover .wikivbfh .toggle-collapse {opacity: 1;}
.wikivbfh .toggle-collapse img {
	margin: 9px 9px 0 0;
}
.forumbit_nopost .subforumdescription {
	clear: both;
	background: #e7eaf0;
	color: #6c7e97;
	font-size: 12px;
	padding: 5px 10px 7px 10px
}
.forumbit_post .forumactionlinks {display: none !important;}
.wikivb-forum-foot {
	border-top: 1px solid #e4e8ef;
	clear: both;
	padding: 7px 0 8px 0;
	display: table;
	width: 100%;
}
.wikivb-forum-foot .lastpostdate,.wikivb-forum-foot .lastposttitle img {display: none !important}
.wikivb-forum-foot .lastposttitle,.wikivb-forum-foot .lastpostby {
	display: inline-table;
}
.wikivb-forum-foot .forumlastpost {
	padding: 0px !important;
	width: auto !important;
	clear: none;
}
.wikivb-forum-foot .forumlastpost span:before {
	content: "\e151";
	font: 15px 'Icon';
	float: right;
	color: #bbc9e2;
	margin: -2px 10px 0 5px;
}
.wikivb-forum-foot .forumstats {
	float: left;
	height: auto !important;
	width: auto !important;
	padding: 0px;
	margin: 0 0 0 10px;
}
.wikivb-forum-foot .forumstats li {
	display: inline-block;
	padding: 0px !important;
	background: #b5c0da;
	color: #f0f2f4;
	padding: 0 5px !important;
	border-radius: 15px;
	margin: 0 2px;
	line-height: 16px;
	font-size: 11px;
}
.forum-frame li:nth-child(even)>.forumrow {background: #f0f2f4;}
.moderators {
	display: table;
	font-size: 12px;
	padding: 10px 0 6px 0;
}
.moderators h4 {font-weight: normal;}
.subforums {margin-top: 10px;}
.subforum .inlineimg {
	float: right;
	margin: 0 0 0 3px;
}
.footer {display: none}
.wikivb-chatbox .blockhead , .forum_info .blockhead , .thread_info h4 {
	background: none;
	border: 0px;
	font: 14px 'sans',iranian sans,Tahoma;
	color: #8592a7 !important;
	border-bottom: 1px solid #d9dde9;
	margin: 0 0 12px 0;
	height: auto !important;
	position: relative;
	padding: 5px 2px 10px 5px;
}
.wikivb-chatbox .blockhead a {color: #8592a7 !important;}
.wikivb-chatbox .blockhead .popupmenu, .wikivb-chatbox .blockhead .popupmenu {
	float: none !important;
	font-weight: normal;
	display: inline-block;
}
.wikivb-chatbox .blockhead:before ,.forum_info .blockhead:before , .thread_info h4:before {
	content: "\e310";
	font: 14px 'Icon';
	color: #bbc7d9;
	margin: 0 12px 0 12px;
}
.wikivb-chatbox .blockhead:after , .forum_info .blockhead:after,.thread_info h4:after {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
.thread_info h4 .collapse {margin: -7px 0 0 -7px;}
.thread_info h4 .collapse img {opacity: 0.2;}
.thread_info h4 .collapse img:hover {opacity: 0.5}
.wikivb-chatbox .blockhead .popupmenu a.popupctrl:before {
	content: "\e191";
	font: 11px 'Icon';
	float: left;
	margin: 7px -15px 0 0;
	color: #a5d26a;
}
.wikivb-chatbox .blockhead .popupmenu a.popupctrl {background: none !important;}
.wikivb-chatbox .blockhead .popupmenu a.active:before {content: "\e193";color: #fb9090;}
.wikivb-chatbox .blockhead .toggle-collapse {margin: 5px 0 0 10px;float: left;opacity: 0.2;}
.wikivb-chatbox .blockhead .toggle-collapse:hover {opacity: 0.8;}
.wikivb-chatbox .blocksubhead {border: 0px !important;background: #e7eaf0;}
.wikivb-chatbox .toggle-cat-coll {
	background: #e7eaf0;
	padding: 5px !important;
}
.wikivb-chatbox .button {font: 12px 'sans',iranian sans,Tahoma;line-height: 16px;}
.wikivb-chatbox .textbox {font: 12px 'sans',iranian sans,Tahoma;line-height: 16px;}
.text-ads {
	background: url(wikivb/wikivb-v6/dots.png) repeat-x top;
	padding: 25px 10px 15px 10px;
	display: block;
	margin: 10px -10px 0 -10px;
        text-align: justify;
}
.text-ads ul li {
	display: inline-block;
	line-height: 22px;
	color: #aeb8cd;
}
.text-ads ul li a {color: #a0abc1;}
.text-ads ul li a:before {
	content: "";
	float: right;
	height: 5px;
	width: 5px;
	background: #badb90;
	border-radius: 50%;
	margin: 8px 7px 0 4px;
}
.text-ads ul li a:hover {color: #4b556b;}
.text-ads ul li a:hover:before {background: #4b556b;}
.wv6-footer {
	min-height: 200px;
	background: #363f4c;
	display: block;
	margin: 10px 0 0 0;
	color: #cfd8e6;
	z-index: 10;
	position: relative;
}
.wv6-footer .top {
	background: #323a45;
	min-height: 50px;
}
.wv6-footer .top .scrollup {
	float: right;
}
.wv6-footer .top .scrollup span:before {
	content: "\e214";
	font: 20px 'Icon';
	color: #a2d114;
	display: table;
	line-height: 50px;
	background: #2d353f;
	width: 50px;
	text-align: center;
}
.wv6-footer .top .scrollup:hover span:before {
	box-shadow: 0 -50px #a2d114 inset !important;
	color: #323a45;
}
.wv6-footer .top .footer-notic {
	color: #8e9aac;
	font-size: 14px;
	line-height: 49px;
	padding: 0 15px;
}
.wv6-footer .top .footer-notic:before {
	content: "\e9ad";
	font: 15px 'Icon';
	color: #59aed7;
	margin: 0 10px 0 -7px;
	line-height: 50px;
	float: right;
}
.wv6-footer .top .footer-notic:hover {color: #59aed7;}
.wv6-footer .middles {
	width: 48%;
	margin: 15px 0 25px 0;
	line-height: 22px;
}
.wv6-footer .middle-right {float: right;}
.wv6-footer .middle-left {float: left;}
.wv6-footer .middles .footer-title {
	color: #f59070;
	font-size: 15px;
	border-bottom: 1px solid rgba(255,255,255,0.05);
	display: block;
	margin: 10px 0 10px 20%;
	padding: 0 0px 10px 0;
	position: relative;
}
.wv6-footer .middles .footer-title:before {
    content: "\e900";
    font: 17px 'Icon';
    margin: 2px 12px 0 12px;
    float: right;
}
.wv6-footer .middles .footer-title:after {
    height: 3px;
    width: 30px;
    content: '';
    background: #f59070;
    position: absolute;
    bottom: -2px;
    right: 5px;
    border-radius: 2px;
}
.wv6-footer .middles:hover .footer-title:after {width: 90px;}
.wv6-footer .middle-left .footer-title {color: #d2eb5f;}
.wv6-footer .middle-left .footer-title:before {content: "\e195";}
.wv6-footer .middle-left .footer-title:after {background: #d2eb5f;}
.wv6-footer .middle-left:hover .footer-title:after {width: 153px;}
.wv6-footer .bottom {
	clear: both;
	display: block;
	border-top: 1px solid #2d353f;
	margin: 0 10px;
	line-height: 50px;
}
.wv6-footer .bottom .copy-right {
	font-size: 11px;
	font-weight: 200;
}
.wv6-footer .bottom .copy-right a {color: #d2eb5f;font-weight: normal;}
.wv6-footer .bottom .foot-link {
	float: left;
	background: #505d6d;
	line-height: 23px;
	font-size: 12px;
	color: #b9c2cf;
	margin: 12px 0px 0 8px;
	border-radius: 25px;
	padding: 0 10px;
	border: 1px solid rgba(0,0,0,0)
}
.wv6-footer .bottom .foot-link:before {
	content: "\e042";
	font: 12px 'Icon';
	float: right;
	line-height: 22px;
	margin: 0 -2px 0 5px;
}
.wv6-footer .bottom .fl-vip {
	background: #fbec00;
	color: #3e4650;
	font-weight: 500;
}
.wv6-footer .bottom .foot-link:hover,.wv6-footer .bottom .fl-vip:hover {
	background: none;
	border: 1px solid;
}
.wv6-footer .bottom .fl-vip:hover {color: #fbec00;}
.topx-tip-info {
	background: #f3f5f8 !important;
	color: #8994a4 !important;
	font: 13px Sans;
	padding: 0px;
}
.topx-tip-info div {
	padding: 7px 15px;
	border-bottom: 1px solid #e4e8ef;
}
.topx-tip-info div a {color: #d5ddf4l !important;}

.topx-tip-info .five {border-bottom: 0px;}
.topx-tip-info div:before {
	content: "\e359";
	font: 15px 'Icon';	
	float: right;
	margin: 3px -5px 0 5px;
}
.topx-tip-info .one:before {content: "\e359";}
.topx-tip-info .two:before {content: "\e004";}
.topx-tip-info .three:before {content: "\e007";}
.topx-tip-info .four:before {content: "\e042";}
.topx-tip-info .five:before {content: "\e151";}
.forumbits .forumhead h2 {
	font-weight: normal;
	font-size: 13px;
	line-height: 30px;
}
.childforum .wikivb-forum-foot .forumlastpost  {border-top: 0px solid #e4e8ef;}
.childforum .wikivb-forum-foot .forumlastpost p,.childforum .wikivb-forum-foot .forumlastpost div {
    float: none !important;
    margin: 0 2px;
}
.shade font {
	color: #829ad2;	
}
.navpopupmenu.popupmenu.nohovermenu a.textcontrol, .navpopupmenu.popupmenu.nohovermenu a.popupctrl,#inlinemod_formctrls .popupctrl , .forum_info_form .options_input_block .button , #tag_edit_link {
	font-family: Sans;
	background: #b5c0da;
	border: 0px;
	border-radius: 20px !important;
	color: #fff;
	font-weight: normal;
	cursor: pointer;
}
.forum_info_form .options_input_block .button {padding: 2px 10px;}
.navpopupmenu.popupmenu.nohovermenu a.textcontrol:hover, .navpopupmenu.popupmenu.nohovermenu a.popupctrl:hover , #inlinemod_formctrls .popupctrl:hover {
	background: #475364 !important;
	color: #fff !important;
}
.forum_info .collapse img {opacity: 0.2}
.forum_info .collapse img:hover {opacity: 0.5}
.breadcrumb {
	background: #e7eaf0;
	margin: -22px -10px 10px -10px;
	padding: 20px 10px 5px 10px;
	color: #8d97a7;
}
.navbithome span:before {
	content: "\e900";
	font: 17px 'Icon';
	float: right;
	margin: -3px 0 0 0;
	color: #8d97a7;
}
.breadcrumb .navbit {
	background: none;
	padding: 0;
}
.breadcrumb .navbit:before {
	content: "\e225";
	font: 11px 'Icon';
	float: left;
	margin: 0px;
	color: #b5c0da;
	line-height: 20px;
}
.breadcrumb .navbit:last-child:before {display: none;}
.breadcrumb a:hover {color: #8d97a7;}
.navbar a { color:#949ead; }
.navbar a:hover { color:#949ead; }
.threadlist .threadlisthead {margin-top: 3px;}
.wikivb-threadstats li {
	display: inline-block;
	text-align: center;
}
.wikivb-threadstats li b {
	display: block;
	font-weight: normal;
}
.threadbit {margin-bottom: -1px;}
.threadlastpost dd {display: table;margin: 1px 0 3px 0;}
.threadlastpost dd:last-child a img {
	display: none
}
.threadlastpost dd:last-child a:before {
	content: "\f007";
	font: 11px 'Icon';
	float: left;
	margin: -1px 2px 0 0;
}
.time {color: #738092;}
.forum_info .forum_information_and_options:before {content: "\eec9" !important;}
.forum_info .thread_display_options:before {content: "\ea04" !important;}
.forum_info .posting_rules:before {content: "\ea03" !important;}
/* Post Codes */
.postbit .postfoot .textcontrols a, .postbitlegacy .postfoot .textcontrols a , .eventbit .eventfoot .eventcontrols a {
	color: #8f94a4;
	font: 11px 'sans',iranian sans,sans,Tahoma;
}
.postbitlegacy .postfoot .textcontrols span.seperator, .postbit .postfoot .textcontrols span.seperator {display: none;}
.postbitlegacy .postfoot .textcontrols a.reputation, .postbit .postfoot .textcontrols a.reputation , .postbitlegacy .postfoot .textcontrols a.editpost,.postbit .postfoot .textcontrols a.editpost,.eventbit .eventfoot .textcontrols a.editevent,.postbitlegacy .postfoot .textcontrols a.quickreply,.postbit .postfoot .textcontrols a.quickreply,.postbitlegacy .postfoot .textcontrols a.forwardpost,.postbit .postfoot .textcontrols a.forwardpost,.postbitlegacy .postfoot .textcontrols a.newreply,.postbit .postfoot .textcontrols a.newreply,.postbitlegacy .postfoot .textcontrols a.multiquote,.postbit .postfoot .textcontrols a.multiquote,.postbitlegacy .postfoot .textcontrols a.promotecms,.postbit .postfoot .textcontrols a.promotecms,.postbitlegacy .postfoot .textcontrols a.blog,.postbit .postfoot .textcontrols a.blog,.postbitlegacy .postfoot .textcontrols a.ip,.postbit .postfoot .textcontrols a.ip,.postbitlegacy .postfoot .textcontrols a.report,.postbit .postfoot .textcontrols a.report,.postbitlegacy .postfoot .textcontrols a.infraction,.postbit .postfoot .textcontrols a.infraction , .postbitlegacy .postfoot .textcontrols a.post_thanks_button, .postbit .postfoot .textcontrols a.post_thanks_button {
    border: 0px solid #e2e2e2 !important;
    padding: 0 !important;
    background: none;
    -moz-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    margin: 0;
    display: inline-table;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    -o-border-radius: 2px;
    -ms-border-radius: 2px;
    line-height: 25px;
    color: #8697af;
}
.postbitlegacy .postfoot .textcontrols a.reputation:hover, .postbit .postfoot .textcontrols a.reputation:hover , .postbitlegacy .postfoot .textcontrols a.post_thanks_button:hover, .postbit .postfoot .textcontrols a.post_thanks_button:hover , .postbitlegacy .postfoot .textcontrols a.editpost:hover,.postbit .postfoot .textcontrols a.editpost:hover,.eventbit .eventfoot .textcontrols a.editevent:hover,.postbitlegacy .postfoot .textcontrols a.quickreply:hover,.postbit .postfoot .textcontrols a.quickreply:hover,.postbitlegacy .postfoot .textcontrols a.forwardpost:hover,.postbit .postfoot .textcontrols a.forwardpost:hover,.postbitlegacy .postfoot .textcontrols a.newreply:hover,.postbit .postfoot .textcontrols a.newreply:hover,.postbitlegacy .postfoot .textcontrols a.multiquote:hover,.postbit .postfoot .textcontrols a.multiquote:hover,.postbitlegacy .postfoot .textcontrols a.promotecms:hover,.postbit .postfoot .textcontrols a.promotecms:hover,.postbitlegacy .postfoot .textcontrols a.blog:hover,.postbit .postfoot .textcontrols a.blog:hover,.postbitlegacy .postfoot .textcontrols a.ip:hover,.postbit .postfoot .textcontrols a.ip:hover,.postbitlegacy .postfoot .textcontrols a.report:hover,.postbit .postfoot .textcontrols a.report:hover,.postbitlegacy .postfoot .textcontrols a.infraction:hover,.postbit .postfoot .textcontrols a.infraction:hover {
    color: #5c6d85;
    background: none;
}
.postbitlegacy .postfoot .textcontrols a.reputation:before , .postbit .postfoot .textcontrols a.reputation:before , .postbitlegacy .postfoot .textcontrols a.post_thanks_button:before, .postbit .postfoot .textcontrols a.post_thanks_button:before , .postbitlegacy .postfoot .textcontrols a.editpost:before,.postbit .postfoot .textcontrols a.editpost:before,.eventbit .eventfoot .textcontrols a.editevent:before,.postbitlegacy .postfoot .textcontrols a.quickreply:before,.postbit .postfoot .textcontrols a.quickreply:before,.postbitlegacy .postfoot .textcontrols a.forwardpost:before,.postbit .postfoot .textcontrols a.forwardpost:before,.postbitlegacy .postfoot .textcontrols a.newreply:before,.postbit .postfoot .textcontrols a.newreply:before,.postbitlegacy .postfoot .textcontrols a.multiquote:before,.postbit .postfoot .textcontrols a.multiquote:before,.postbitlegacy .postfoot .textcontrols a.promotecms:before,.postbit .postfoot .textcontrols a.promotecms:before,.postbitlegacy .postfoot .textcontrols a.blog:before,.postbit .postfoot .textcontrols a.blog:before,.postbitlegacy .postfoot .textcontrols a.ip:before,.postbit .postfoot .textcontrols a.ip:before,.postbitlegacy .postfoot .textcontrols a.report:before,.postbit .postfoot .textcontrols a.report:before,.postbitlegacy .postfoot .textcontrols a.infraction:before,.postbit .postfoot .textcontrols a.infraction:before {
    content: "\e037";
    font: 13px 'Icon';
    float: right;
	margin: 6px 0px 0px 4px;
}
.postbitlegacy .postfoot .textcontrols a.editpost:before, .postbit .postfoot .textcontrols a.editpost:before, .eventbit .eventfoot .textcontrols a.editevent:before {
	content: "\ebb6";
}
.postbitlegacy .postfoot .textcontrols a.quickreply:before, .postbit .postfoot .textcontrols a.quickreply, .postbitlegacy .postfoot .textcontrols a.forwardpost:before, .postbit .postfoot .textcontrols a.forwardpost:before {
	content: "\eaa2";
}
.postbitlegacy .postfoot .textcontrols a.newreply:before, .postbit .postfoot .textcontrols a.newreply:before {
	content: "\eaa3";
}
.postbitlegacy .postfoot .textcontrols a.multiquote:before, .postbit .postfoot .textcontrols a.multiquote:before {
	content: "\eaa5";
}
.postbitlegacy .postfoot .textcontrols a.promotecms:before, .postbit .postfoot .textcontrols a.promotecms:before {
	content: "\f0ea";
}
.postbitlegacy .postfoot .textcontrols a.blog:before, .postbit .postfoot .textcontrols a.blog:before {
	content: "\ef0d";
}
.postbitlegacy .postfoot .textcontrols a.ip:before, .postbit .postfoot .textcontrols a.ip:before {
	content: "\eef3";
}
.postbitlegacy .postfoot .textcontrols a.report:before, .postbit .postfoot .textcontrols a.report:before {
	content: "\ebbf";
}
.postbitlegacy .postfoot .textcontrols a.infraction:before, .postbit .postfoot .textcontrols a.infraction:before {
	content: "\edbf";
}
.postbitlegacy .postfoot .textcontrols a.post_thanks_button:before, .postbit .postfoot .textcontrols a.post_thanks_button:before {
  content: "\e013";  
  color: #e74c3c; 
}
.postbitlegacy .postfoot .textcontrols a.reputation:before, .postbit .postfoot .textcontrols a.reputation:before {
    content: "\edb5";
}
#quickreply_title img {display: none;}
#quickreply_title:before {font: 16px 'Icon';content: '\e152';}
.postbit, .postbitlegacy, .eventbit , .formcontrols {border-color: #e3e3e3;b}
.blockfoot, .blocksubfoot {
	background: #fff;
	border: 1px solid #e3e3e3;
	border-top: 0;
}
.actionbuttons .group .button {
	font: 12px Sans;
	color: #fff;
	background: #1dd4ae;
	border: 0;
	padding: 5px 10px;
	font-size: 13px;
}
.actionbuttons .group .button:hover {
	background: #c8d0dd;
}
#inlinemod_formctrls a.popupctrl span.ctrlcontainer {display: table;}
.popupbody li a, .popupbody li label {font: 11px 'sans',iranian sans,Tahoma;}
.postbitlegacy .postdetails, .eventbit .eventdetails , .postbitlegacy .userinfo {background: #fff;}
.rank img {max-width: 180px;height: auto;}
.avatar_hover img {
	border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    -o-border-radius: 3px;
    -ms-border-radius: 3px;
    max-width: 165px;
}
.userpost_field .users .username strong {
	font: 16px 'sans',iranian sans,sans,Tahoma;
	float: left;
	margin: 3px 0 4px 3px;
}
.userpost_field {
	margin: 4px 0px 5px 0px !important;
	display: table;
	width: 100%;
}
.userpost_field .onanoff {
	float: right !important;
	margin: -2px 1px 0 0 !important;
}
.post_field .avatar_hover {
	border: 1px solid #e3e3e3;
	padding: 5px 0;
	position: relative;
}
.avatar_field {padding-bottom: 0px !important;}
.thanked_field dd {
	float: none;
	display: table;
	margin: 0 auto;
}
.postbitoptions {
	display: block;
	margin: 0px;
	text-align: center;
	border: 1px solid #e3e3e3;
	border-top: 0px;
}
.postbitoptions a {
	width: 23.5%;
	display: inline-block;
	color: #0ca4ca;
	border-left: 1px solid #e3e3e3;
	margin: 0 -1px -2px -1px;
	padding: 3px 0;
}
.visit-profile {border: 0px !important;}
.postbitoptions a:hover {color: #778080;}
.postbitoptions a span:before {
	content: "\e002";
	font: 16px 'Icon';
	line-height: 27px;
	float: right;
	width: 100%;
}
.postbitoptions .send-freind-request span:before {content: "\e007";}
.postbitoptions .send-pm-touser span:before {content: "\e125";}
.postbitoptions .show-topics span:before {content: "\e131";}
.postbitoptions .visit-profile span:before {content: "\e139";}
.blockbody.settings_form_border {
	border-left: 1px solid #ececec;
	border-right: 1px solid #ececec;
	border-bottom: 1px solid #ececec;
}
#pmfolderlist .blockfoot .popupmenu {margin: 6px;}
.postbitlegacy .title, .eventbit .title {
	border-bottom: 0px solid #e9e9e9;
	margin: 5px 0px 8px 0px;
	padding: 8px 10px 12px 10px;
	font: 15px 'sans',iranian sans,sans,Tahoma;
	background: #e9edf3;
	border-radius: 8px;
}
.postbitlegacy .title:before, .eventbit .title:before {
	content: "\f15c";
	font: 16px 'Icon';
	float: right;
	margin: 5px 0 0 6px;
	color: #a0abba;
}
.bbcode_container .bbcode_quote_container {background: none;}
.bbcode_container div.bbcode_quote {
	background: #eaeef3;
	border-radius: 0px;
	border: 0px solid #bfbfbe;
	font-family: Sans;
	font-style: normal !important;
	border-right: 3px solid #c8d0dd;
	padding-top: 7px;
	margin: 0 !important;
	position: relative;
}
.bbcode_container div.bbcode_quote:before {
	content: '';
	height: 0px;
	width: 0px;
	border-style: solid;
	border-color: rgba(0,0,0,0) rgba(0,0,0,0) #c8d0dd #c8d0dd;
	border-width: 7px 7px 7px 7px;
	position: absolute;
	right: -17px;
	top: 13px;
}
.bbcode_postedby {
	font: 13px Sans,sans,Tahoma;
	color: #6f6f6f;
}
.bbcode_postedby:before {
	content: "\eee3";
	font: 17px 'Icon';
	float: right;
	color: #c8d0dd;
	margin: 0 0 0 4px;
}
.bbcode_postedby img {display: none;}
.bbcode_postedby a img {
	display: inline-block;
	float: left;
	margin: 3px 0 0 0;
}
.signature {}
.shade {font: 12px 'sans',iranian sans,Tahoma;font-weight: normal !important;}
.shade b {font-weight: normal !important;}
.pagination span a,.pagination span.selected a {
    background-color: #1dd4ae !important;
    border: 1px solid #1dd4ae;
    font: 12px Sans;
    border-radius: 3px;
    padding: 3px 9px;
    color: #fff;
}
.pagination span a:hover , .pagination span.selected a {
    background-color: #6c7b91 !important;
    border: 1px solid #6c7b91;
    color: #fff;
}
.pagination span.selected a {background-image: none;}
.clear, .cleardiv {display: table;}
.postbitlegacy .signature, .postbitlegacy .lastedited {margin-top: 0;}
.postbitlegacy .signature {
	padding: 1em 10px;
	background: none;
}
.postbitlegacy .userinfo .userinfo_extra {float: none;}
.postbitlegacy .postdetails, .eventbit .eventdetails, .postbitlegacy .userinfo {background: #fafafa;border-radius: 8px;}
.postbitlegacy .postbody, .eventbit .eventdetails .eventbody {border-right: 0pc;}
.postbitlegacy .userinfo {padding: 10px;}
.wikiv6-postbit {
	background: #475364;
	color: #fff;
	border-radius: 9px 9px 8px 8px;
	display: block;
	margin: 0 0 0 -5px;
}
.wikiv6-postbit .the-avatar {
	display: block;
	height: 215px;
	background-repeat: no-repeat !important;
	background-position: center !important;
	background-size: cover !important;
	border-radius: 8px 8px 0 0;
	position: relative;
	z-index: 1;
	box-shadow: 0 0 rgba(71,83,100,0.80) inset !important;
	overflow: hidden;
}
.wikiv6-postbit .username_container {
	text-align: center;
	position: relative;
}
.wikiv6-postbit .username_container .user-status {
	margin: 0px auto 0px auto;
	position: absolute;
	top: -11px;
	left: 0;
	right: 0;
	z-index: 2;
}
.wikiv6-postbit .username_container .username {
	display: table;
	margin: 0 auto;
}
.wikiv6-postbit .username_container .username-postbit {
	color: #fff !important;
	font-weight: normal !important;
	font-size: 18px;
	padding-top: 15px;
	display: block;
}
.wikiv6-postbit .username_container .username-postbit a {color: #fff !important;}
.thisusertag {
	background: #2c3a4c;
	color: #fff;
	font: 14px Sans;
	font-weight: 200;
	padding: 10px 0;
	text-align: center;
}
.wikiv6-postbit .thisusertag {
	background: #2c3a4c;
	font-size: 14px;
	font-weight: 200;
	padding: 0 0 15px 0;
	box-shadow: 0 -58px #2c3a4c,0 -29px #2c3a4c !important;
	border-radius: 0px !important;
}
#sidebar_container.member_summary .thisusertag {
	display: block !important;
	float: none !important;
	width: 100% !important;
	padding: 15px 0;
	font-size: 16px;
}
.admintag {background: #ff5555;}
.wikiv6-postbit .admintag {background: #ff5555;box-shadow: 0 -58px #ff5555,0 -29px #ff5555 !important;}
.simpletag {background: #1f2f43;}
.wikiv6-postbit .simpletag {background: #1f2f43;box-shadow: 0 -58px #1f2f43,0 -29px #1f2f43 !important;}
.moaventag {background: #ee5613;}
.wikiv6-postbit .moaventag {background: #ee5613;box-shadow: 0 -58px #ee5613,0 -29px #ee5613 !important;}
.arshadtag {background: #bf44ff;}
.wikiv6-postbit .arshadtag {background: #bf44ff;box-shadow: 0 -58px #bf44ff,0 -29px #bf44ff !important;}
.rahnamatag {background: #d7189f;}
.wikiv6-postbit .rahnamatag {background: #d7189f;box-shadow: 0 -58px #d7189f,0 -29px #d7189f !important;}
.bakhshtag {background: #295ae6;}
.wikiv6-postbit .bakhshtag {background: #295ae6;box-shadow: 0 -58px #295ae6,0 -29px #295ae6 !important;}
.graphtag {background: #009cff;}
.wikiv6-postbit .graphtag {background: #009cff;box-shadow: 0 -58px #009cff,0 -29px #009cff !important;}
.transtag {background: #b95823;}
.wikiv6-postbit .transtag {background: #b95823;box-shadow: 0 -58px #b95823,0 -29px #b95823 !important;}
.kandidtag {background: #00d1c5;}
.wikiv6-postbit .kandidtag {background: #00d1c5;box-shadow: 0 -58px #00d1c5,0 -29px #00d1c5 !important;}
.viptag {background: #e9c91a;}
.wikiv6-postbit .viptag {background: #e9c91a;box-shadow: 0 -58px #e9c91a,0 -29px #e9c91a !important;}
.mofidtag {background: #8acc0a;}
.wikiv6-postbit .mofidtag {background: #8acc0a;box-shadow: 0 -58px #8acc0a,0 -29px #8acc0a !important;}
.bazneshtag {background: #bc9f17;}
.wikiv6-postbit .bazneshtag {background: #bc9f17;box-shadow: 0 -58px #bc9f17,0 -29px #bc9f17 !important;}
.bannedtag {background: #c5c5c5;}
.wikiv6-postbit .bannedtag {background: #c5c5c5;box-shadow: 0 -58px #c5c5c5,0 -29px #c5c5c5 !important;}
.bartartag {background: #e8da00;}
.wikiv6-postbit .bartartag {background: #e8da00;box-shadow: 0 -58px #e8da00,0 -29px #e8da00 !important;}

.postbit-columns {
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 17px;
	font-weight: 200;
	background: #354151;
	padding: 17px 0;
}
.postbit-columns b {
	display: block;
	font-weight: 200;
	font-size: 14px;
}
.pbc-two {background: #2c3a4c;}
.wikiv6-postbit .userinfo_extra .postbit-field {
	display: block;
	padding: 0 10px 0 15px;
	margin: 0 0 0 -5px;
	cursor: default;
}
.wikiv6-postbit .userinfo_extra .postbit-field:hover {
	background: #2c3a4c;
}
.wikiv6-postbit .userinfo_extra .postbit-field dt,.wikiv6-postbit .userinfo_extra .postbit-field dd {
	font-size: 14px;
	font-weight: 300;
	width: 50% !important;
	display: inline-block;
	float: none !important;
	margin: 0px !important;
}
.wikiv6-postbit .userinfo_extra .postbit-field dd {
	font-size: 12px;
	margin: 0 0px 0 -4px !important;
	text-align: left;
	padding: 10px 0;
}
.wikiv6-postbit .userinfo_extra .postbit-field dt {
	color: #1dd4ae;
}
.wikiv6-postbit .userinfo_extra .postbit-field dt:before {
	content: "\eb2f";
	font: 25px 'Icon';
	float: right;
	margin: -5px 0 0 4px;
}
.wikiv6-postbit .user-forum {
	text-align: center;
	display: block;
	background: #414e60;
	border-radius: 0 0 8px 8px;
	color: #fff;
	font-weight: 200;
	font-size: 11px;
	letter-spacing: 5px;
	padding: 8px 0 5px 0;
}
.wikiv6-postbit:hover .user-forum {
	background: #2c3a4c;
}
.wikiusercontrols {
	position: absolute;
	text-align: center;
	left: 0;
	right: 0;
	margin-top: -170px;
	top: 50%;
}
.wikiv6-postbit:hover .wikiusercontrols {margin-top: -17px;}
.wikiusercontrols li {
	display: inline-block;
	margin: 0 8px;
}
.wikiv6-postbit:hover .the-avatar {box-shadow: 0 -250px rgba(71,83,100,0.80) inset !important;}
.wikiusercontrols li a {
	color: #fff;
	font-size: 14px;
	font-weight: 300;
	display: block;
}
.wikiusercontrols li a:before {
	content: "\ea7c";
	font: 20px 'Icon';
	display: table;
	margin: 0px auto 4px auto;
}
.wikiusercontrols li .showprof:before {content: "\ea7c";}
.wikiusercontrols li .sendpm:before {content: "\eaae";}
.wikiusercontrols li .userblog:before {content: "\f048";}
.wikiusercontrols:hover li a {opacity: 0.4;}
.wikiusercontrols li a:hover {opacity: 1;}
.light-v6-pb {background: #e5e8ed;color: #626f84;}
.light-v6-pb .postbit-columns {background: #d1d7e2;font-weight: 300;}
.light-v6-pb .pbc-two {background: #c8d0dd;}
.light-v6-pb .thisusertag {color: #fff;}
.light-v6-pb .user-forum {background: #d9dee5;color: #626f84;font-weight: normal;}
.light-v6-pb:hover .user-forum {background: #c3cbd7;}
.light-v6-pb .userinfo_extra .postbit-field dt {color: #74869e;}
.light-v6-pb .userinfo_extra .postbit-field dt,.light-v6-pb .userinfo_extra .postbit-field dd {font-weight: normal;}
.light-v6-pb .userinfo_extra .postbit-field:hover {background: #d1d7e2;}
.light-v6-pb .userinfo_extra .postbit-field dd a {color: #626f84 !important;}
.light-v6-pb .the-avatar {box-shadow: 0 0px rgba(200,208,221,0.80) inset !important;}
.light-v6-pb:hover .the-avatar {box-shadow: 0 -250px rgba(200,208,221,0.80) inset !important;}
.light-v6-pb .wikiusercontrols li a {color: #626f84;font-weight: normal;}
.postbit .posthead, .postbitlegacy .posthead, .eventbit .eventhead {
	padding: 15px 1px 17px 1px;
	border-radius: 8px 8px 0 0;
}
.postbit, .postbitlegacy, .eventbit {border-radius: 8px;}
.nodecontrols .ios-ui-select,
.menuColumns .ios-ui-select {
	height: 15px;
	width: 30px;
	background: #293342;
	margin-right: 5px;
}
.nodecontrols .ios-ui-select .inner,
.menuColumns .ios-ui-select .inner {
	height: 13px;
	top: 1px;
	width: 13px;
	background: #475364;
	left: 1px;
}
.menuColumns .ios-ui-select {background: #bdc3c7;float: right;margin: -0.13em 0 0 5px;}
.menuColumns .ios-ui-select .inner {background: #fff;}
.ios-ui-select.checked {
	background: #8cee18;
}
.nodecontrols .ios-ui-select.checked .inner,
.menuColumns .ios-ui-select.checked .inner {
	left: 16px;
	background: #475364;
}
.menuColumns .ios-ui-select.checked .inner {background: #fff;}
.multix_box_container .menuColumns:last-child .column1 {width: 70%;}
.multix_box_container .menuColumns:last-child .column1 label {width: 100%;}
.postbit .posthead .nodecontrols, .postbitlegacy .posthead .nodecontrols, .eventbit .eventhead .nodecontrols {padding-top: 17px;}
.postbit .posthead .nodecontrols a, .postbitlegacy .posthead .nodecontrols a, .eventbit .eventhead .nodecontrols a {top: -4px;letter-spacing: 1px;}
.postbody {
	position: relative;
}
.postbit .postfoot .textcontrols, .postbitlegacy .postfoot .textcontrols, .eventbit .eventfoot .eventcontrols {
	background: #e5e8ed !important;
	width: auto !important;
	margin: 0 -1px -1px -1px;
	padding: 10px 0 5px 0;
	border-radius: 0 0 8px 8px;;
}
.postfoot a {
	margin: 0px 10px !important;
	font-size: 13px !important;
}
.postfoot a:before {
	display: table !important;
	float: none !important;
	margin: 0px auto 5px auto !important;
	font-size: 20px !important;
}
.postbitlegacy .postrow, .eventbit .eventrow, .postbitdeleted .postrow, .postbitignored .postrow {color: #5f718a;}
.postbitlegacy .postbody, .eventbit .eventdetails .eventbody {padding-bottom: 0;}
.postbit .posthead .postdate, .postbitlegacy .posthead .postdate {background-position: right 0.2em !important;}
.postbit.imod_highlight .userinfo_noavatar, .postbit.imod_highlight .userinfo, .postbit.imod_highlight .postbody, .postbitlegacy.imod_highlight .postdetails, .postbitlegacy.imod_highlight .userinfo, .postbitlegacy.imod_highlight .postbody, .postbitdeleted.imod_highlight, .postbitignored.imod_highlight {background: #e9ffce;}
.toolsmenu {border-radius: 7px;margin-bottom: 5px !important;}
.above_postlist, #above_postlist {height: 45px;}
.pagetitle {width: auto;}
.pagination_top {margin-top: 12px;}
.above_postlist .pagination_top .pagination, .above_postlist .pagination_top .postpagestats {font-size: 14px;color: #a5b5cd;}
.thread_info {margin-top: 10px;}
.thread-navlinks {border-bottom: 1px solid #e4e8ef;text-align: center;}
.thread-navlinks:before {display: none;}
.thread_info .wrt_trtitle:before {content: "\f064";}
.thread_info .tags_for_this_thread:before {content: "\e9f9";}
.thread_info .posting_rules:before {content: "\ea03";}
input[type=text],input[type=password],input[type=file] , textarea {
	border-color: #e8e8e8 !important;
	font: 14px Sans;
	border-radius: 5px !important;
	color: #95a1b4;
	padding-right: 10px;
	padding-left: 10px;
	line-height: 22px;
}
input[type=text],input[type=password],input[type=file] {height: auto !important;}
.formcontrols .blockrow .description {
	font-size: 12px;
	color: #95a1b4;
	padding: 10px 20px 10px 10px;
	position: relative;
	margin-right: 30px !important;
}
.formcontrols .blockrow .description:before {
	content: "\ea91";
	font: 15px 'Icon';
	position: absolute;
	right: 0;
	top: 50%;
	margin-top: -8px;
	color: #a3bbd3;
}
.formcontrols .blockrow label {
	font-size: 15px;
	color: #718ba5;
	padding: 4px 10px;
}
.formcontrols {background: #fff;}
.cp_content .blockhead:first-child {margin-top: 0;}
.cp_content .blockhead {margin-top: 8px;}
.cp_content form .blockhead {margin-top: 8px !important;}
#vB_Editor_001 {margin-top: 0px;}
.wysiwyg_block .formcontrols .blockrow {border: 0px !important;margin-top: 0;}
input[type=submit],input[type=button],.groupcontrols .textcontrol {
	font: 14px Sans;
	padding: 0 8px;
	cursor: pointer;
	color: #718ba5;
}
.groupcontrols .textcontrol {border-color: #c8d1df;}
.userprof_border .formcontrols .blockrow {margin: 0px !important;}
.formcontrols .blockrow label.full,.blockhead h2 {font-weight: normal;}
#nrreview #postlist {padding: 10px;}
.blockfoot, .blocksubfoot {padding: 10px;}
input.checkall {z-index: 999;position: relative;}
#showpm .formcontrols .blockrow {border: 0px !important;}
#showpm .formcontrols .blockrow {border: 0px !important;margin: 0;}
.postbitlegacy .lastedited {
	font: 13px Sans;
	color: #a0abba;
	padding: 0 10px 10px 0;
}
.postbitlegacy .lastedited a {color: #a0abba;}
.wikiv6-newpm .rightcol {
	margin-right: 0;
	margin-top: 40px;
}
.wikiv6-newpm .formcontrols-newpm .blockrow {border: 0px !important;}
#forum_icon_legend {background: #fff;}
.options_block_container #forum_icon_legend {background: #e7eaf0;}
.preview-pp-box {
	width: auto !important;
	margin: -10px -5px 10px -5px;
}
.preview-pp {
	height: 300px;
	width: 100%;
	display: block;
	border-radius: 8px 8px 0 0;
	background-size: cover !important;
	background-position: center !important;
}
.avatar-preview img {border-radius: 8px;margin: 10px 15px 15px 0}
.wikiv6-privacy .description {display: none;}
.formcontrols .blockrow .group.checkradio {display: table;}
.formcontrols .blockrow .group.checkradio > li {float: right;clear: right;}
.formcontrols .blockrow .group.checkradio > li label {font-size: 13px;}
.formcontrols .blockrow .group.checkradio > li label input {margin: 0px 0 0 4px;;float: right;} 
/*blog style starts*/
.blog #content_container #content {
    background: none;
    padding-right: 0px;
    margin-right: 0px;
}
.blog #pagetitle {
	background: none;
	border: 0px;
	color: #8592a7 !important;
	border-bottom: 1px solid #d9dde9;
	margin: 0 0 12px 0;
	height: auto !important;
	position: relative;
	padding: 10px 0 0 0;
}
.blog #pagetitle h1,.blog #pagetitle a {color: #8592a7 !important;font-family: Sans;font-weight: normal;font-size: 15px;padding: 5px 20px 0px 5px !important;}
.blog #pagetitle h1:before {
	content: "\ef0d";
	font: 20px 'Icon';
	color: #bbc7d9;
	margin: 5px -7px 0 20px;
}
.blog #pagetitle h1:after {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
.blog #pagetitle .popupgroup {margin: 7px 0 0 0;}
.blog #pagetitle #rssicon {display: none;}
.blog #pagetitle .popupgroup .popupbody a {color: #717171;}
.blogentrybit {
	background: #fff;
	margin: 0 0 5px 0;
	border-radius: 8px;
	padding-top: 0 !important;
	border: 0px;
}
.blogentrybit .wrapper {
	background: #f3f5f8;
	border: 0px !important;
	position: relative;
	padding: 7px 70px 7px 5px;
	margin: 10px;
	border-radius: 8px;
}
.blogentrybit .wrapper .featurepost_img {
	position: absolute;
	right: 10px;
	top: 50%;
	margin-top: -36px;
}
.blogentrybit .wrapper .featurepost_img img {
	border-radius: 8px;
	margin: 4px 0 0 0;
}
dl.stats dt {color: #778b9f !important;}
li.blogentrybit h4, li.blogentrybit div.blogbit, dl.blogcategory {
	margin-right: 15px;
	font-size: 12px;
	color: #778b9f !important;
	padding: 3px 0 0 0;
}
.blogentrybit h4 input[type="checkbox"] {margin: 0 0 0 6px !important;}
.blogentrybit h4 {
	line-height: 22px;
	font-size: 14px !important;
}
.blogentrybit h4 a {font-weight: normal !important;}
.blogentrybit .edit_blog {float: right;}
.blogentrybit .edit_blog:before , dl.blogcategory:before , .blog_date:before, .comment_date:before {
	content: "\ea03";
	font: 15px 'Icon';
	display: inline-block;
	float: right;
	margin: 1px 0 0 4px;
}
.blogentrybit .edit_blog:before {margin-top: 3px;}
.blogentrybit .edit_blog img {display: none;}
dl.blogcategory {margin-bottom: 3px;}
dl.blogcategory:before {content: "\ef0d";margin-right: 2px;}
.blog_date:before, .comment_date:before {
	content: "\ea7c";
	margin-top: -2px;
	font-size: 13px;
}
.blogcontent {
	font: 14px Sans;
	padding: 10px;
}
.blogbody {
	padding: 0 15px;
}
.blogmeta {display: none;}
.below_blogentry {
	background: #f3f5f8 ;
	margin: 0 10px 0 10px;
	display: block;
	width: auto;
	float: none;
	padding: 5px 10px 5px 10px;
	border-radius: 8px;
}
.blog_comments_count {
	float: none !important;
	display: inline-block !important;
	margin: 0px 0 0 -4px;
}
.continuereading {
	position: relative;
	text-align: right;
	margin: 0px !important;
	right: 0;
	display: inline-block !important;
	text-align: left;
}
.blog_comments_count img , .continuereading  img {
	display: none;
}
.blog_comments_count a , .continuereading  a {
	padding: 8px 7px;
	display: inline-block;
	color: #7089a2;
	font-weight: normal;
	text-shadow: 0 0 0 !important;
}
.blog_comments_count a:hover , .continuereading  a:hover {
	color: #1abc9c;
}
.blog_comments_count a:before , .continuereading a:before {
	content: "\ea2b";
	font: 15px 'Icon';
	margin: -2px 0 0 5px;
	float: right;
}
.continuereading a:before {float: left;margin: 0px 5px 0 0;}
.blog_comments_count a:before {content: "\effa";font-size: 13px;margin-top: 1px;}
#pagetitle a.pagetitleinfo.textcontrol, .actionbutton_container a.pagetitleinfo.textcontrol {
	display: block !important;
	border-radius: 4px;
	background: #2ecc71;
	text-align: center;
	padding: 8px 15px 8px 15px;
	font-size: 16px !important; 
	font-family: Sans;
}
#pagetitle a.pagetitleinfo.textcontrol:hover, .actionbutton_container a.pagetitleinfo.textcontrol:hover {background: #95a5a6;}
#pagetitle a.pagetitleinfo.textcontrol:before, .actionbutton_container a.pagetitleinfo.textcontrol:before {
	content: "\ebcc";
	font: 17px 'Icon';
	display: inline-block;
	margin: 0 0 0 3px;
}
#pagetitle a.pagetitleinfo.textcontrol span, .actionbutton_container a.pagetitleinfo.textcontrol span {
	display: none;
}
#blog_user_sidebar, #blog_sidebar_generic {
	background: none !important;
	border: 0px;
}
.blog #sidebar_container .block {
	background: #fff;
	border-radius: 8px;
}
.blog #sidebar_container .avatarcontainer {margin: -6px -6px 0 -6px;width: auto;display: block;}
.blog #sidebar_container .avatarcontainer img {
	width: 100%;
	border-radius: 8px 8px 0 0;
}
#sidebar_container .underblock {background: none;height: 1px;}
#whatsnewsidebar div.blocksubhead.smaller {	height: 33px;}
#whatsnewsidebar .blocksubhead {border: 0px !important;}
#whatsnewsidebar .blocksubhead:after {display: none !important;}
#whatsnewsidebar div.blocksubhead.smaller a, #whatsnewsidebar div.blocksubhead.smaller span {
	display: block;
	font-size: 11px;
	height: auto !important;
	border: 0px !important;
	border-radius: 4px;
	color: #838383;
	margin: 0 1px;
}
.blogitems li {
	width: 33%;
}
#collapse_c_bloglist {display: none !important;}
#vb_bloglatest_rating span , #vb_bloglatest_latest span , #vb_bloglatest_blograting span {background: #34495e;color: #fff !important;}
.blog #sidebar_container .blockbody { border: 0;}
.blog #sidebar_container .blockrow {background: none;border: 0px !important;}
.blog #sidebar_container .blockrow .tagcloudlink {
	font-size: 12px;
	background: #f1c40f;
	color: #fff;
	padding: 0 5px;
	border-radius: 3px;
}
.blog div.smallavatartext {
	font: 13px Sans !important;
    padding: 0 0px 0 0;
	width: auto;
	display: block !important;
	float: none;
	margin: 0px 40px 0 0;
	position: relative;
}
.blog a.blogentrylink {font: 13px Sans !important;}
.blog #sidebar_container .blockrow .meta a {display: none;}
.blog #sidebar_container .avatarcontent {
	position: relative;
}
.blog #sidebar_container .avatarcontent .smallavatar {
	position: absolute;
	top: 50%;
	margin-top: -12px;
}
.blog #sidebar_container .avatarcontent .smallavatar img {
	border-radius: 8px;
}
.blockfoot, .blocksubfoot {border: 0px;}
.blog .blockfoot a:before {
	content: "\eae2";
	font: 14px 'Icon';
	float: right;
	margin: -2px 0 0 4px;
}
.blog #sidebar_container .blocksubhead.smaller ,.blog #sidebar_container .blocksubhead {
	border: 0px;
	font: 14px 'sans',iranian sans,Tahoma;
	color: #8592a7 !important;
	border-bottom: 1px solid #d9dde9;
	margin: 0 0 12px 0;
	padding: 5px 0px 10px 10px;
	font-weight: normal !important;
	position: relative;
}
.blog #sidebar_container .blocksubhead a {color: #8592a7;}
#blog_user_sidebar .mainblock .blocksubhead,#vb_blogcalendar .blockbody .blocksubhead {background: none !important;border: 0px;}
#blog_user_sidebar .mainblock .blocksubhead {
	margin: 0 -6px;
	position: relative;
}
#blog_user_sidebar .mainblock .blocksubhead .username {
	padding: 15px 0 0 0;
	background-position: top center !important;
	margin-top: -11px;
}
#vb_blogcalendar .blockbody .blocksubhead a {color: #8d8d8d !important;}
#whatsnewsidebar .blocksubhead.smaller {
	background: none !important;
	padding: 2px 0 0 0 !important;
	margin: 0px !important;
}
#whatsnewsidebar .blocksubhead.smaller:before {display: none !important;}
.blog #sidebar_container .blocksubhead.smaller img {display: none;}
.blog #sidebar_container .blocksubhead.smaller a img,.blog #sidebar_container .blocksubhead a img {display: block;margin: -2px 0 0 0;height: 15px;width: 15px;margin: 3px  0 0 0;opacity: 0.3;}
.blog #sidebar_container .blocksubhead.smaller:before,
#block_tagcloud_handle:before,
#block_entries_handle:before,
#block_comments_handle:before {
	content: "\f03d";
	font: 12px 'Icon';
	float: right;
	margin: 6px 12px 0 12px;
	color: #bbc7d9;
}
.blog #sidebar_container .block-one .blocksubhead.smaller:before {content: "\f03d";}
.blog #sidebar_container .blogusermenu .blocksubhead.smaller:before {content: "\e9d3";margin-right: 15px;}
.blog #sidebar_container #vb_blogcalendar .blocksubhead.smaller:before {content: "\eac3" !important;font-size: 15px !important;margin: 3px 12px 0 12px !important;}
.blog #sidebar_container .categoryblock .blocksubhead.smaller:before {content: "\f068";}
#block_tagcloud_handle:before {content: "\eed7";}
#block_entries_handle:before {content: "\eefb";}
#block_comments_handle:before {content: "\effc";}
.blog #sidebar_container .blocksubhead.smaller:after,
#block_tagcloud_handle:after,
#block_entries_handle:after,
#block_comments_handle:after  {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
#block_archive_div .smaller:before {content: "\e033" !important;font-size: 20px !important;margin-top: -4px !important;}
.actionbutton_container {margin-bottom: 5px;}
.blog #sidebar_container .formcontrols .blockrow label input {margin: 5px -7px 0 0;}
#c_blog_search label.titleonly {float: right;}
#c_blog_search .controls input {
	background: #fcfcfc;
	font: 13px Sans;
	color: #76726d;
	padding: 0 7px;
	border-radius: 4px !important;
	cursor: pointer;
}
.singleblog {padding-top: 1px !important;}
.singleblog .wrapper {
	padding-right: 85px;
}
.blockrow a,.blogentrybit h4 {color: #778b9f;font-weight: normal;}
.singleblog .wrapper dl.blogcategory {margin: 0px 0px 5px 0;}
.singleblog .wrapper .fly {
	float: right;
}
.singleblog .wrapper .fly a {
	margin: 0 10px;
}
.singleblog .wrapper .popupctrl {margin-right: 0 !important;}
.singleblog .wrapper .fly .popupctrl:before,.singleblog .wrapper .fly .comments:before {
	content: "\ebb6";
	font: 15px 'Icon';
	display: inline-block;
	float: right;
	margin: -3px 0 0 4px;
}
.singleblog .wrapper .blog_date:before {margin-top: -2px !important;}
.singleblog .wrapper .fly .comments:before {content: "\ea07";}
.singleblog .wrapper .fly .popupctrl:before {content: "\ea7a";}
.blog .entrycontrols {
	padding: 5px 10px 10px 10px;
	font-size: 14px;
	margin: 0 -8px -3px -8px;
	border-radius: 8px;
	background: #f3f5f8 !important;
	text-align: right;
}
.blog .entrycontrols .separator {display: none;}
.blog .entrycontrols a {
	color: #65798d;
	display: inline-block;
	padding: 10px 2px 8px 2px;
}
.blog .entrycontrols a:before,.blog #sidebar_container #usermenu li a:before {
	content: "\f111";
	font: 8px 'Icon';
	float: right;
	margin: 3px 10px 0 4px;
}
.blog .entrycontrols a img {display: none;}
.blog .entrycontrols a:hover {color: #e74c3c;}
.blog #navlinks {
	padding: 10px 0;
	border: 0px;
	background: #fff;
	border-radius: 4px;
}
.commentsheader {font-weight: normal;}
.blog .postbit-lite {
	background: #f3f5f8 !important;
	margin: 10px 0;
	border-radius: 8px;
	padding: 10px;
}
.blog .postbit-lite .postbithead {
	background: #fff;
	border: 0px;
	padding: 8px 0;
	color: #698199;
	position: relative;
	border-radius: 8px;
}
.blog .postbit-lite .postbithead .time {color: #698199 !important;}
.blog .postbit-lite .postbithead:before {display: none;}
.blog .postbit-lite .postbithead a,.blog .postbit-lite .postbithead .time {color: #757575;}
.blog .postbit-lite .postbithead label {font-size: 15px;margin-top: 3px;}
.blog #content_inner .list_no_decoration {
	padding: 1px 10px;
	background: #fff;
	border-radius: 8px;
	margin: 0 0 10px 0;
}
.blog .postbit-lite .postbithead:before {
	content: '';
	height: 0;
	width: 0;
	border-width: 20px;
	border-style: solid;
	border-color: rgba(0,0,0,0.0) rgba(0,0,0,0.0) rgba(0,0,0,0.0) #f1f1f1;
	position: absolute;
	right: -40px;
	top: 0;
}
.blog .postbit-lite .avatarlink img {
	border-radius: 8px;
	margin: 10px 10px 0 0;
}
.blog  .postbit-lite .posttext {
	font: 14px Sans;
	border-top: 0px;
	margin-right: 90px;
}
.blog #sidebar_container .mainblock .blocksubhead .username {
	display: block;
	text-align: center;
}
.blog #sidebar_container #usermenu {
	padding: 0;
	margin: 0px 4px 0 4px;
	border: 1px solid rgba(0,0,0,0.08);
	border-radius: 8px;
}
.blog #sidebar_container #usermenu li a {
	font-size: 14px;
	padding: 8px 10px 8px 10px;
	display: block;
}
.blog #sidebar_container #usermenu li a:before {margin-right: 0;}
.blog #sidebar_container #usermenu li a img {display: none;}
.blog #sidebar_container #usermenu li {
	border-top: 1px solid rgba(0,0,0,0.08);
}
.blog #sidebar_container #usermenu li:first-child {
	border-top: 0;
}
.blog #sidebar_container #userstats dl {
	font-size: 14px !important;
	line-height: 25px;
}
.blog #sidebar_container #userstats dl dd {color: #8d8d8d;font-weight: normal;}
.blog #sidebar_container #c_blog_categories ul li img {display: none;}
.blog #sidebar_container #c_blog_categories ul {margin-top: 6px;}
.blog #sidebar_container #c_blog_categories ul li a {
	font-size: 13px;
	line-height: 24px;
}
.blog #sidebar_container #c_blog_categories ul li a:before {
	content: "\f07b";
	font: 14px 'Icon';
	float: right;
	margin: 5px 0 0 5px;
}
.blog .postbit-lite .commenthead {margin-right: 80px;}
/* Blog Style End*/
/* Articles Style Start*/
.article-side {padding-left: 0 !important;}
.main-artic {padding-right: 0 !important;}
.arctop {
    background: #6fc300;
    border-radius: 4px;
    font-weight: normal;
    font-size: 15px;
    margin: 5px 0 5px 0;
    display: none;
}
.arctop a {
    color: #fff !important;
    display: block;
    padding: 12px;
}
.arctop a:hover{background: #00ae9d;border-radius: 4px;}
.arctop a:before {
	content: "\e060";
	font: 20px 'Icon';
	float: right;
	margin: -2px 0 0 5px;
}
.af-pagetitle {
    float: right;
    margin: 0 30px 10px 0;
}
.af-pagetitle:before {
  content: "\e03c";
  font: 20px 'Icon';
  float: right;
  margin: 5px 0 0 5px;
}
.footermain ,  .footerbottom {position: relative;z-index: 9;}
.blockhead a {color: #fff;}
.wikiaf .blockhead {
	font: 14px 'sans',iranian sans,Tahoma;
	color: #8592a7 !important;
	border-bottom: 1px solid #d9dde9;
	margin: 0 0 10px 0;
	padding: 11px 0px 11px 10px;
	font-weight: normal !important;
	position: relative;
	background: none;
	height: auto;
}
.wikiaf .blockhead a {color: #8592a7 !important;}
.wikiaf .blockhead:before {
	content: "\f03d";
    font: 14px 'Icon';
    float: right;
    margin: 5px 11px 0 12px;
    color: #bbc7d9;
}
.wikiaf .blockbody {
 font: 12px Sans; 
 padding: 4px;
 border-radius: 8px;
 border: 0px solid rgba(0,0,0,0.14) !important;
 background: #fff !important;
}
.wikiaf .blockbody a {
    display: block;
    padding: 2px 12px;
    font-size: 13px;
}
.wikiaf .blockbody a:before {
	content: "\f111";
	font: 7px 'Icon';
	float: right;
	margin: 7px 0 0 4px;
}
.wikiaf .blockbody .blockrow {
    padding: 2px 0;
    margin: 0px;
}
.wikiaf .top_authors span {
    background: #fff;
    padding: 2px 15px 4px 15px;
    float: left;
    margin: -23px 0 0 7px;
    border-radius: 15px;
}
.article-foot .readmore a , .article-foot .comments a {
	padding: 8px 7px;
	display: inline-block;
	border-bottom: 3px solid #ecf0f1;
}
.article-foot .readmore a:before , .article-foot .comments a:before {
	content: "\eae2";
	font: 13px 'Icon';
	float: right;
	margin: 0px 0 0 5px;
}
.article-foot .readmore a:hover , .article-foot .comments a:hover {
	border-bottom: 3px solid #e74c3c;
}
.article-foot .comments a:before {content: "\f03d";}
.article-foot .comments {
    float: left;
}
.comments img {display: none;}
.wikiaf .content {
    overflow: hidden;
    padding: 0px 15px;
    min-height: 80px;
    margin-top: 13px;
    font-size: 14px;
}
.wikivbauthor,.wikivbdata {
    display: inline-block;

}
.wikivbdata {margin-right: 20px;}
.wikivbauthorvalue,.wikivbdatavalue {
	display: inline-block;
}
.wikivbauthor:before,.wikivbdata:before {margin-top: -2px !important;}
.contenttitle {
	font-size: 13px;
	padding: 3px 0 0 0;
	font-weight: normal;
}
.contenttitle:before,.wikivbauthor:before,.wikivbdata:before {
	content: "\ea03";
	font: 15px 'Icon';
	display: inline-block;
	float: right;
	margin: 3px 0 0 4px;
}
.wikivbauthor:before {content: "\e9da";}
.wikivbdata:before {
	content: "\edc2";
    margin-top: -1px !important;
    font-size: 13px;
}
.afcr {
    margin: auto;
    padding: 5px 15px;
    text-align: center;
	display: table;
}
.afcr:before {
  content: "\e900";
  font: 20px 'Icon';
  float: right;
  margin: -4px 0 0 5px;
}
.postbit hr
{
	display:block;
}
.hackinfo,.navlist
{
    display: block;
    background: none;
    text-decoration: none;
}
.postbit .moduserinfo {
	clear:both;
	border-bottom:1px solid #e8edf2;
	padding: 0.5em 10px;
}
.postbit .moduserinfo>span {
	width: 32% !important;
	display: inline-block;
}
#afwiki-postbit {
    padding: 0px;
    background: #e9edf3;
    border-radius:8px;
    z-index: 999;
    display: table;
    float: none !important;
    width: 100%;
}
.afwiki-icons {
    margin-top: 5px;
    padding-top: 4px;
}
#afwiki-postbit .post_field {
    margin: 0px -5px 0px -5px;
    padding: 4px 8px;
    border-bottom: 1px solid #eaeaea;
}
.afreport , .afthanks , .afprint , .afpm , .afsubscription {
    margin: 4px -2px;
    display: inline-table;
}
.afwiki-icons {margin: 0px;}
.afreport:before , .afthanks:before , .afprint:before , .afpm:before , .afsubscription:before {
  content: "\e900";
  font: 18px 'Icon';
  color: #9caeca;
  background: #d9dfe7;
  width: 35px;
  line-height: 35px;
  display: table;
  text-align: center;
}
.afwiki-icons a:first-child {margin-right}
.afwiki-icons a:first-child span:before {border-radius: 0 6px 6px 0;}
.afwiki-icons a:last-child span:before {border-radius: 6px 0 0 6px;}
.afreport:before  {content: "\ebbf";}
.afthanks:before  {content: "\eea6";}
.afprint:before {content: "\ed49";}
.afpm:before {content: "\eaae";}
.afsubscription:before {content: "\f03f";}
.afreport:hover:before , .afthanks:hover:before , .afprint:hover:before , .afpm:hover:before , .afsubscription:hover:before {
  background: #e74c3c;
  color: #fff;
}
.afonline {
    text-shadow: 0 0 0 #fff;
}
.afavatar {margin-bottom: 5px;}
.afbottomthanks:before {
  content: "\eea6";
  font: 18px 'Icon';  
  display: inline-block;
  color: #e74c3c;
  margin: 0 3px;
}
.postbit .postbody {
    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 10px;
    border: 0px solid rgba(0,0,0,0.15);
    border-top: 0px;
}
.afpgttl {
	border: 0px;
	font: 14px 'sans',iranian sans,Tahoma;
	color: #8592a7 !important;
	border: 0px !important;
	border-bottom: 1px solid #d9dde9 !important;
	margin: 0 0 12px 0;
	font-weight: normal !important;
	position: relative;
	display: table;
	width: 100%;
}
.afpgttl:after , .wikiaf .blockhead:after {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
.afpgttl h1 {
	margin: 3px 9px 6px 0;
}
.afpgttl h1:before {
	content: '\f0c5' !important;
	margin: 5px -7px 0 15px !important;
	font-size: 15px !important;
	color: #bbc7d9;
}
.article-main-post {
	background: #fff;
	border-radius: 8px;
	display: block;
	margin: 5px 0;
	padding: 10px;
}
.article-main-post .title {
	display: block !important;
	background: #f3f5f8;
	padding: 10px 15px;
	border-radius: 8px;
}
.article-main-post .title h3 {
	margin: 0px 0 10px 0 !important;
	font-family: Sans !important;
}
.article-foot {
    margin: 10px 0 0 0;
    display: block;
    width: auto;
    float: none;
    padding: 5px 10px 5px 10px;
}
.article-side .one .nice-select {margin: 0 20px !important;display: block;}
.article-side .one input[type=submit] {
	background: #e74c3c;
	color: #fff;
	border: 0px;
	border-radius: 4px !important;
	width: 84% !important;
	display: block !important;
	margin: 3px auto 9px auto;
	padding: 6px 0;
}
.article-side .one input[type=submit]:hover {background: #2ecc71;}
.article-side .one {margin-bottom: 5px;}
.article-side .one .blockhead:before {content: "\eefb";}
.article-side .two:before {content: "\eac2";}
.article-side .three .blockhead:before {content: "\efdf";}
.article-side .five:before {content: "\e9f6";}
.article-side .six:before {content: "\ea07";}
.article-side .seven:before {content: "\ea7d";}
.article-side .formcontrols .blockrow {border: 0px !important;}
.article-side .formcontrols input,.article-side .formcontrols select {
	font-family: sans;
}
.article-side #sel_f {
	display: table;
	margin: 0px auto;
}
.article-side .formcontrols .button {
	background: #fcfcfc;
	font-size: 14px;
	font-weight: normal;
	padding: 2px 8px;
	margin: 3px 0 2px 3px;
	cursor: pointer;
}
.article-side .formcontrols .textbox {
	width: 70% !important;
	font-size: 13px;
	height: auto;
}
.article-side .three a:before {display: none;}
.top_authors a:before {content: "\e9da" !important;margin-top: 3px !important;font-size: 12px !important;}
.article-first-post .posttitle {
	border-bottom: 0px solid #e9e9e9;
	margin: 0 0px 8px 0px;
	padding: 8px 10px 12px 10px;
	font: 15px 'sans',iranian sans,sans,Tahoma;
	background: #d5dce6;
	border-radius: 8px;
	color: #5f718a;
}
.article-side .three .formcontrols .blockrow {text-align: center;}
.article-first-post .posttitle:before {
	content: "\f15c";
	font: 16px 'Icon';
	float: right;
	margin: 5px 5px 0 6px;
	color: #a0abba;
}
.article-rightbox {float: right;}
.article-rightbox .afavatar {
	height: 80px;
	width: 80px;
	margin: 5px 10px;
	border-radius: 8px;
}
.article-details {
	margin: 10px 0 0 0;
	color: #70889f;
	font-size: 15px;
}
.article-details b {font-weight: normal;}
.article-details .date {
	float: left;
	font-size: 13px;
	margin: -10px 0 0 15px;
}
.article-headpost {
	background: #e9edf3;
	display: block;
	border-radius: 8px;
	margin: 0 -10px 20px -10px;
	padding: 10px;
}
/* Articles Style End*/
.formcontrols .restore {border: 0px !important;}
/* LoginBox Style Start*/
.modal-body {
	padding: 0 !important;
}
.modal-content {
	border-radius: 8px !important;
	border: 0px !important;
	box-shadow: 0 0 5px 2px rgba(0,0,0,0.2) !important;
}
.modal-body .nav {
	display: table;
	width: 100%;
	background: none;
	text-align: center;
	padding: 0;
	border: 0px;
	border-radius: 8px 8px 0 0;
	overflow: hidden;
}
.modal-body .nav li {
	float: none;
	display: inline-block;
	font-size: 15px;
	background: #fff;
	margin: 0 2px;
	border-radius: 5px;
	border: 1px solid rgba(0,0,0,0.12);
	float: none !important;
}
.modal-body li {
	float: none !important;
}
.modal-body .nav li {
	border: 0px;
	background: #ecf0f1 !important;
	border-radius: 0;
	margin: 0;
	width: 33.333%;
}
.modal-body .nav li a {
	border: 0px !important;
	background: none !important;
	padding: 7px 0px 0px 0px !important;
	color: #90a4b8 !important;
	font-size: 14px;
	font-weight: normal !important;
}
.modal-body .nav li a:before {
	content: "\e901";
	font: 20px 'Icon';
	display: table;
	margin: 10px auto -10px auto;
}
.modal-body .nav #button-login a:before {content: "\ea16";}
.modal-body .nav #button-regi a:before {content: "\ea7e";}
.modal-body .nav #button-lostpw a:before {content: "\f075";}
.modal-body .nav li a:hover {color: #5d7288 !important;}
.modal-body .nav .active {
	background: #fff !important;
}
.modal-body .nav .active a ,.modal-body .nav .active a:hover,.modal-body .nav .active a:before {
	color: #5d7288 !important;
}
.modal-body .blockhead , .modal-body .blocksubhead {display: none !important;}
.modal-body .blockrow .singledescription {
	font-size: 16px;
	display: block;
	margin: 0 15px 15px 15px;
	padding: 15px 0 !important;
	color: #6a7f94;
	line-height: 25px;
	border-bottom: 1px solid #e6e9ea;
}
.modal-body .formcontrols .blockrow {border: 0px;}
.modal-body input , .modal-body .blockbody.formcontrols .blockrow .rightcol .primary ,.modal-body .formcontrols .blockrow .group .textbox ,.modal-body .formcontrols input.textbox {
	display: table;
	width: 96%;
	margin: 4px auto !important;
	font: 13px Sans;
	padding: 10px 10px !important;
	border: 1px solid #d2d8d8;
	height: auto;
	color: #9aacbe !important;
	border-radius: 8px !important;
}
.modal-open {padding-right: 0px !important;}
.modal-body ::-webkit-input-placeholder {color: #9aacbe !important;}
.modal-body ::-moz-placeholder {color: #9aacbe !important;}
.modal-body :-ms-input-placeholder {color: #9aacbe !important;}
.modal-body :-moz-placeholder {color: #9aacbe !important;}
.modal-body .logindetails {
	text-align: center;
	padding: 0 0 20px 0;
}
.modal-body .logindetails div {
	width: 85%;
	display: table;
	margin: 0 auto;
}
.modal-body .logindetails .loginbutton , .modal-body .actionbuttons input {
	float: left;
	width: auto;
	padding: 6px 15px 8px 15px !important;
	border: 0px !important;
	background: #e74c3c;
	color: #fff !important;
	font: 200 14px Sans !important;
	border-radius: 8px !important;
	margin: 5px 5px 0 0 !important;
	cursor: pointer;
}
.modal-body .logindetails .loginbutton:hover , .modal-body .actionbuttons input:hover {
	background: #97c731 !important;
	color: #fff !important;
}
.remember input , .label-input {
	width: auto !important;
}
.remember {
	float: right;
	width: 200px !important;
	margin: 18px 0 0 10px !important;
	font-size: 16px;
	line-height: 20px;
	font-size: 14px;
	text-align: right;
	font-weight: 200;
	color: #9babbb;
}
.remember label,.remember input,.modal-body .formcontrols select {cursor: pointer;}
.remember input {
	float: right;
	margin: 0px 10px 0 6px !important;
	padding: 0px !important;
}
.modal-footer {
	background: none;
	text-align: right !important;
	padding: 0 !important;
	border: 0px !important;
}
.modal-footer .close-modalbut {
	background: none;
	border: none;
	color: #bdc3c7;
	cursor: pointer;
	margin: 0 10px 10px 0;
}
.modal-footer .close-modalbut:hover {color: #ff8787;}
.modal-footer .close-modalbut:before {
	content: "\eb85";
	font: 15px 'Icon';
}
.modal-body form .rightcol {
	width: 100% !important;
	display: table !important;
	margin: 0px;
	text-align: right;
	max-width: 100%; !important;
}
.modal-body .formcontrols .blockrow .description {
	float: right;
	margin: -8px 15px 0 5px !important;
	font-size: 12px;
	position: relative;
	padding-right: 20px;
	opacity: 0.5;
}
.modal-body .formcontrols .blockrow .description:before {color: #a4b4c5;}
.rightcol:hover .description,.blockrow:hover .description {opacity: 1 !important;}
.modal-body .formcontrols {border: 0px;}
.modal-body .formcontrols .blockrow label {
	font-size: 14px;
	margin: 5px 10px 3px 0;
	font-weight: 300;
}
.modal-body .section-disnone {display: none !important;}
.modal-body .full {
	font-size: 17px;
	color: red;
	margin: 0 20px 15px 0;
	display: block;
}
.modal-body .actionbuttons {
	background: none;
	padding: 0;
	margin: 20px 0 0 20px;
}
.modal-body .actionbuttons input {
	width: auto !important;
	display: inline-block !important;
	float: none;
	margin: 0 0 -10px 0 !important;
}
.modal-body .formcontrols .blockrow {padding: 0;border: 0px !important;}
.modal-body .lostpwload .formcontrols input.textbox {
	width: 90% !important;
}
.modal-body .lostpwload .formcontrols .blockrow {padding: 0;}
.modal-body .lostpwload .formcontrols .blockrow .singledescription {
	padding: 20px 10px 15px 10px !important;
	margin: 0 20px 15px 20px;
}
.modal-body .tab-content {
	max-height: 700px;
}
div.multix_font_light {text-shadow: 0 0 0 !important;}
.registerload {
	height: 600px;
	overflow-y: scroll;
	display: block;
}
.registerload input[type=submit] {background: #e74c3c !important;}
.login-avatar {
	height: 100px;
	width: 100px;
	background: url(wikivb/wikivb-v6/misc/default-avatar.svg) no-repeat center;
	display: table;
	background-size: cover;
	border-radius: 50%;
	margin: 30px auto;
}
@media (min-width: 768px) {
  .modal-dialog {width: 650px !important;}
}
.lostpwload .blockrow .singledescription {display: none;}
.lostpwload form {padding-top: 10px;}
#multix-main-panel .btn-lg {
	font: 14px Sans !important;
	background: none;
	border: 0px;
	color: #e1e5eb;
	font-weight: 200 !important;
	margin: 11px 0 0 0;
	cursor: pointer;
}
#multix-main-panel .middleb {
	font: 9px Sans;
	margin: 0 5px 0 4px;
}
#multix-main-panel .btn-lg:before {
	content: "\ea7e";
	font: 13px 'Icon';
	float: right;
	margin: 5px 0 0 5px;
}
#multix-main-panel .btn-lg:hover,#multix-main-panel .btn-lg:hover:before {color: #2ecc71}
#multix-main-panel .login-button {margin-right: 20px;}
#multix-main-panel .login-button:before {content: "\ea16";font-size: 15px;margin-top: 4px;}
#multix-main-panel .login-button:focus {outline: 0px !important;}
#vsacb_search .blocksubhead .blocksubhead,#vsacb_Modiran_boxswitch .blocksubhead .blocksubhead {padding: 0px;}
#vsacb_search .blocksubhead .nice-select,#vsacb_Modiran_boxswitch .blocksubhead .nice-select {margin: 10px 10px 0 0; !important;float: right;}
#vsacb_search .blocksubhead>span,#vsacb_Modiran_boxswitch .blocksubhead>span {margin: 14px 10px 0 0;display: inline-block;}
#vsacb_Modiran_boxswitch form:first-child .blocksubhead>span {margin: 0;}
.modal-box {
	border-radius: 8px !important;
	top: 20px !important;
	border: 0px !important;
	box-shadow: 0 0 5px 2px rgba(0,0,0,0.2) !important;
}
.modal-box #edit_avatar_container .blocksubhead , 
.modal-box #edit_avatar_container .shade ,
.modal-box #edit_avatar_container .description {display: none;}
.modal-box #edit_avatar_container {
	font-family: Sans;
}
.modal-box #edit_avatar_container .formcontrols .blockrow {border: 0px !important;padding: 0;}
.modal-box #edit_avatar_container .section .blockrow .primary {display: table;margin: 0 auto;}
.modal-box #edit_avatar_container .section .blockrow .primary img {
	display: table;
	margin: 20px auto 20px auto;
	border-radius: 8px;
	position: relative;
}
.modal-box #edit_avatar_container label {font-size: 13px;width: 100%;}
.modal-box #edit_avatar_container .section {padding: 0 10px !important;}
.modal-box #edit_avatar_container input[type=file],.modal-box #edit_avatar_container input[type=text] {
	width: 100%;
	padding: 10px;
	font-size: 12px;
}
.modal-box #edit_avatar_container .blockhead {
	background: #fff;
	color: #93a4b5;
	font-weight: normal;
	text-align: center;
	padding: 0px 0 0 0;
	margin: 0 0 -30px 0;
	font-size: 0px;
}
.modal-box #edit_avatar_container .close_popup i {display: none;}
.modal-box #edit_avatar_container .close_popup:before {
	content: "\f06e";
	font: 15px 'Icon';
	color: #bdc3c7;
	position: absolute;
	top: 10px;
	left: 10px;
}
#pagetitle {margin-top: 5px;}
#content .blockhead {font-weight: normal !important;}
.open-search {float: left;display: none;}
.open-search:before {
	content: "\eea2";
	font: 17px 'Icon';
	display: table;
	color: #9caccd;
	background: rgba(0,0,0,0.1);
	line-height: 50px;
	width: 50px;
	text-align: center;
	cursor: pointer;
}
.fixbox {position: relative;}
.navtabs ul {top: 0px;}
.show-navbar {
	float: right;
	background: #cdd1dd;
	padding: 0 0 0 15px;
	cursor: pointer;
	display: none;
}
.show-navbar:before {
	content: "\e114";
	font: 16px 'Icon';
	float: right;
	margin: 13px 13px 0 5px;
}
.thanksinpost {
	margin: 0px !important;
	width: auto !important;
	display: block !important;
	background: none !important;
	border-top: 1px solid #dddddd;
}
.who-boxes .blocksubhead img,#who-online-now .wikivbugcb,#who-online-now #wgo_wjt_users .blocksubhead a,#who-online-now #wgo_wjt_users p,.who-boxes #collapse_wjt_list , #who-online #wgo_wjt_users {display: none;}
.who-boxes .blocksubhead {
    color: #8592a7 !important;
    font-size: 12px !important;
    display: block;
    line-height: 24px;
    padding: 13px 0;
    font-weight: 500;
    font-weight: 500 !important;
}
#who-online-now #wgo_wjt_users .blocksubhead:before , #vsa_vilxh .blocksubhead:before {
    content: "\ea7e";
    font: 12px 'Icon';
    float: right;
    line-height: 20px;
    margin: -1px 0 0 5px;
}
#vsa_vilxh .blocksubhead:before {content: "\ea7d";}
#vsa_vilxh .blocksubhead {padding: 15px 0 10px 0 !important;}
#vsa_vilxh div p,#vsa_vilxh div p span {
	font-size: 11px;
	color: #fff !important;
	text-align: center;
}
#vsa_vilxh div p {
	background: #1abc9c;
	border-radius: 30px;
	display: table;
	padding: 0 10px;
	margin: 0 auto 10px auto;
	float: left;
}
#vsa_vilxh .commalist {display: table;line-height: 17px;float: right;}
#vsa_vilxh .commalist a {margin: 0 3px;opacity: 0.4;}
#vsa_vilxh .commalist:hover a {opacity: 0.1;}
#vsa_vilxh .commalist a:hover {opacity: 1;}
.who-boxes .wikivbugcb {
	display: table;
	border-radius: 8px;
	border: 1px solid rgba(0,0,0,0.06) !important;
	margin: 10px 0 0 0;
	
}
.who-boxes .wikivbugcb span {display: inline-block;margin: 0 5px;}
.who-boxes .wikivbugcb b {font-weight: 500 !important;}
.who-boxes .wikivbugcb:before {
	content: 'راهنمای درجات کاربری';
	display: block;
	padding: 4px 0 7px 0;
}
.postbitlegacy .title img , .eventbit .title img {visibility: hidden;padding-bottom: 8px;}
.thanksinpost .smallfont {float: left !important;margin: 14px 0 0 10px !important;}
.thanksinpost .smallfont a {
    font: 13px 'Sans',sans,Tahoma;
    padding: 0px 9px 2px 9px;
    background: #f67466;
    color: #fff;
    border-radius: 30px;  
}
.thanksinpost .smallfont a:hover {background: #2ecc71;}
.thanksinpost .title {
	font-size: 13px;
	padding-bottom: 10px;
}
.thanksinpost .title:before {
    content: "\eea6";
    color: #e74c3c;
    margin-top: 2px;
}
.postbitdeleted, .postbitignored {
	border: 0px;
	background: #fff;
	border-radius: 8px;
}
.postbitdeleted .posthead, .postbitignored .posthead {display: none;}
.postbitdeleted .nodecontrols, .postbitignored .nodecontrols {background: none;padding-bottom: 10px;}
.postbitdeleted .nodecontrols a , .postbitignored .nodecontrols a {padding: 2px 8px;border-radius: 30px;}
.thread_info .thread_information:before {content: "\e9ef";}
.thanksinpost .content {font-size: 13px;padding: 0 15px;}
.thanksinpost .content b {font-weight: 500}
.username_container .thisusertag:nth-child(2),.username_container .thisusertag:nth-child(3),.username_container .thisusertag:nth-child(4) {box-shadow: 0 0 0 !important;padding-top: 10px;}
.adsinposts .postbody {background: none !important;}
.adsinposts .postrow {
	background: #fff !important;
	border-radius: 8px;
	padding: 0 0 7px 0;
}
.toolsmenu .popupgroup li a font {color: #f3f5f8;}
.article-first-post .tyhelp font {
	font: 16px Sans !important;
	color: #8395a7;
	text-shadow: 0 0 0 rgba(0,0,0,0);
	padding: 10px;
	display: table;
}
.article-first-post .thanksinpost {
	border: 0px !important;
	background: #eef1f4 !important;
	border-radius: 8px !important;
}
.article-first-post .thanksinpost hr {display: none;}
.article-first-post .postrow {padding-bottom: 0 !important;}
.article-first-post .thanksinpost .postbody {background: none !important;}
.thanksinpost .title:before {font-family: icon;}
.article-first-post .thanksinpost .title:before {float: right;margin: 3px -5px 0 5px;}
/*Modcp Style Start */
.mod-postbit {
width:185px; 
float:left; 
margin:0 0 0 -10px; 
padding: 10px; 
background: #eaecf0;
border-radius: 8px;
}
.modtopbar {
background: #fafafa;
font: 13px Sans,sans,Tahoma;
display:block;
font-weight: normal;
padding: 10px;
border-radius: 8px;
}
.modtopbar span b {
    font-weight: normal;
    background: #f3f3f3;
    padding: 0 12px 2px 12px;
    border-radius: 15px;
}
.modmiscinfo {
	display: block;
	padding: 5px 20px 0 35px;
}
.modmiscinfo span {
	float: none !important;
	display: inline-block;
	width: 33% !important;
	margin: 0px !important;
	padding: 0px !important;
}
.mswarning:before , .mscheck:before {
  content: "\ea65";
  font: 12px 'Icon'; 
  float: right;
  margin: 4px 0 0 4px;
  color: #27ae60;
}
.mswarning:before {content: "\ebbf";margin: 3px -1px 0 4px;color: #e74c3c;}
.modpostbottom {
   padding: 10px 140px 10px 10px;
	font: 13px Sans,sans,Tahoma;
    background: #e7eaf0;
    border-radius: 8px;
    position: relative;
	overflow: hidden;
	clear: right;
}
.modbottombigicon:before , .modbottomcr:before , .modbottompw:before , .modbottomlinks:before , .modbottomthnaks:before {
    content: "\e900";
    font: 12px 'Icon';
    float: right;
    margin: 4px 0 0 5px;
    border-radius: 50%;
    width: 12px;
    text-align: center;
}
.modbottombigicon:before {
content: "\ebbd";
font-size: 83px;
position: absolute;
color: #2ecc71;
border: 0px;
top: 50%;
right: 25px;
margin: -42px 0 0 0;
}
.modbottomcr:before {content: "\f15c";}
.modbottompw:before  {content: "\eb97";}
.modbottomlinks:before {content: "\e9d7";}
.modbottomthnaks:before {content: "\ea78";color: #e74c3c;}
.modbottomlinksa:before {
  content: "\f07b";
  font: 10px 'Icon';
  margin: 0 5px 0 0;
}
.modpostbody hr {
	background: none;
	border: 1px solid #ececec;
}
.mswarning , .mscheck {
	clear: right;
}
.modpostbody .posttitle {
	background: none;
	border: 0px;
	font: 14px 'sans',iranian sans,Tahoma;
	color: #8592a7 !important;
	border-bottom: 1px solid #d9dde9;
	margin: 0 0 12px 0;
	height: auto !important;
	position: relative;
	padding: 5px 2px 10px 5px;
}
.modpostbody .posttitle:after {
	height: 3px;
	width: 30px;
	content: '';
	background: #ced7e5;
	position: absolute;
	bottom: -2px;
	right: 5px;
}
.postrow {overflow: hidden;}
.modsuporters:before , .modsupportfoot:before , .modatach:before , .modimgatach:before {
  content: "\e060";
  font: 14px 'Icon';
  float: right;
  margin: 5px 12px 0 13px;
  color: #bbc7d9;
}
.modsuporters:before {content: "\f1cd";}
.modsupportfoot:before {content: "\eea6";color: #e74c3c;}
.modatach:before {content: "\eece";}
.modimgatach:before {content: "\e901";}
.floatcontainer blink {display: none;}
.topx-content-tab blink {display: inline;}
.modpoints{display: table;}
.modpostbody {color: #5f718a !important;}
.wikiv6-modtitle-links {
	float: left;
	margin: -5px 0 0 -5px;
}
.wikiv6-modtitle-links a:before {
	content: "\e901";
	font: 17px 'Icon';
	display: table-row;
	float: none !important;
	background: #c8d0dd;
	color: #fff;
	width: 30px;
	line-height: 30px;
	display: inline-block;
	text-align: center;
	border-radius: 4px;
}
.wikiv6-modtitle-links .wvbv6-infraction:before {content: "\e901";}
.wikiv6-modtitle-links .wvbv6-report:before {content: "\ebbf";}
.wikiv6-modtitle-links .wvbv6-printthread:before {content: "\ed49";}
.wikiv6-modtitle-links .wvbv6-sendmessage:before {content: "\f0e6";}
.wikiv6-modtitle-links .wvbv6-subscription:before {content: "\f09e";}
.wikiv6-modtitle-links .wvbv6-thanks:before {content: "\eea6";background: #e74c3c;}
.wikiv6-modtitle-links a:hover:before {
	background: #34495e;
}
.mod-title {
	background: #eaecf0;
	overflow: hidden;
	margin: 10px -10px 10px 0;
	border-radius: 8px;
	padding: 10px;
}
.mod-title .title-top {margin: 5px 10px 15px 0;}
.mod-title .title-top b {font-weight: normal;}
.navlist .modavatar {margin: 0px 0 10px 0;}
.navlist .modavatar img {
	width: 185px;
	height: 185px;
	border-radius: 8px;
}
.mod-postbit-links {
	background: #fafafa;
	font-size: 13px;
	color: #5f718a;
	padding: 5px 8px;
	border-radius: 8px;
}
.mod-postbit-links a {
	color: #5f718a;
}
.mod-postbit-links a:before {
	content: "\f111";
	font: 7px 'Icon';
	float: right;
	margin: 7px 3px 0 4px;
	color: #cfd6da;
}
.mod-postbit-links a:hover,.mod-postbit-links a:hover:before {color: #1abc9c;}
#mods_install_sidebar a:before {content: "\e9e5";font-size: 15px;margin: 3px -0px 0 5px;color: #1abc9c;}
.modpostbody .restore {overflow: visible;}
.modpostbody .restore span {font-family: Sans !important;color: #6a778b;}
.modpostbody .modulbg {
	background: #e7eaf0;
	border: 0px;
	border-radius: 2px;
	line-height: 21px;
	color: #727f95;
	padding: 10px 15px;
	border-radius: 4px;
}
.modpostbottom  .modsyssepas {
	color: #e74c3c;
	font-weight: 500;
	display: inline-block;
	padding: 0 4px;
}
.modpostbottom  .modsyssepas:before {
	content: "\eea6";
	font: 13px 'Icon';
	float: right;
	margin: 5px 0 0 4px;
}
.modpostbody .thanksinpost {
   padding: 10px 0 !important;
	font: 13px Sans,sans,Tahoma;
	margin: 0 -15px !important;
	border-radius: 0px !important;
}
.modpostbody .thanksinpost hr {display: none;}
.modpostbody .thanksinpost .title:before {float: right;margin: 4px 0 0 4px;}
.modpostbody ,.modpostbody .postrow {padding-bottom: 0 !important;border-radius: 0 0 8px 8px;}
/* Modcp Style End */
.trigger {
    padding: 8px 30px 8px 30px !important;
    margin: 6px 0px 6px 0;
    background: #2ecc71;
    color: #fff !important;
    font: 13px Sans;
    border-radius: 8px !important;
    -moz-transition: all 0.2s ease-in;
    -webkit-transition: all 0.2s ease-in;
    -o-transition: all 0.2s ease-in;
    -ms-transition: all 0.2s ease-in;
    border: 2px solid #f3f3f3;
    cursor: pointer;
    border: 0px;
}

.trigger:hover {
    background: #e74c3c;
    border-color: #fff;
    box-shadow: 0 0 0 2px #f3f3f3;
}

.spoilerbody {
    padding: 10px 6px 17px 6px;
    border-radius: 8px
}

.spoilerbody img {
    max-width: 500px;
    border-radius: 8px;
    -moz-transition: all 0.3s ease-in;
    -webkit-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
}
.spoilerbody img:hover {opacity: 0.8;}
.modulbg img.inlineimg {vertical-align: middle;margin-top: -1px;}
.guidetitle {
color: #ffffff;
font: 13px Sans;
margin-right: 8px;
float: right;
text-shadow: 1px 1px rgba(0,0,0,0.1);
margin-top: 3px;
line-height: 38px;
}
.guidetitle:before {
    content: "\ea14";
    font: 18px 'Icon';
    float: right;
    padding: 4px 7px 4px 7px;
    margin: 6px 0px 0px 3px;
}
.guidefreame {
background: #fff;
padding: 10px 15px 10px 14px;
border-radius: 8px;
font: 14px Sans;
line-height: 30px;
margin-top: 60px;
}
.titledesc:before {
content:"\e020";
font: 24px 'Icon';
float: right;
margin-top:6px;
color: #999999;
}
.proicons:before {
content:"\e02d";
font: 18px 'Icon';
float: right;
margin-top:6px;
margin-left:4px;
color: #999999;
}
#iconmoney:before {
content:"\e043";
font: 22px 'Icon';
float: right;
margin-top:6px;
margin-left:4px;
color: #999999;
}
#Methodicon:before {
content:"\e04d";
font: 22px 'Icon';
float: right;
margin-top:6px;
margin-left:4px;
color: #999999;
}
.guidelinks a {
background: #e6eaf3;
padding: 4px 8px 7px 10px;
display: table;
margin: 5px 15px;
border-radius: 5px;
}
.guidelinks a:before {
	content: "\ea94";
	font: 20px 'Icon';
	float: right;
	margin: 5px 0 0 5px;
}
.guidelinks a:hover {
	background: #2ecc71;
	color: #fff;
}
.icondanger {
height: 15px;
width: 15px;
float: right;
margin-top: 7px;
margin-left: 6px;
}
.guideh3 {
padding: 10px 5px 0 0;
font-size: 20px;
display: block !important;
text-align: right !important;
color: #637082;
font-weight: 500;
}
.forumhead-l-icon {
float: left;
margin-top: 3px;
margin-left: 5px;
}

.ads {
display: table;
margin: 0 auto;
border: 10px solid #979797;
}
.ads td {
border: 1px solid rgba(0,0,0,0.1);
padding: 3px 10px 6px 10px;
}
.ads tr {
-moz-transition: all 0.3s ease-in;
-webkit-transition: all 0.3s ease-in;
-o-transition: all 0.3s ease-in;
-ms-transition: all 0.3s ease-in;
}
.ads tr:hover {
background: #979797;
color: #fff;
}
.ads th {
padding: 0px 0px 12px 0px;
background: #979797;
color: #fff;
text-shadow: 1px 1px 1px rgba(0,0,0,0.4);
font-size: 20px;
text-align: center;
}
.table-caption {
margin: -10px auto 0 auto;
display: table;
margin-bottom: 10px;
font-size: 14px;
width: auto;
min-width: 880px;
}
.table-caption:before {
	content: "\ed4c";
	font: 14px 'Icon';
}
.pagenotif {
	font-size: 16px;
	background: #fde9e9;
	padding: 5px 0;
	box-shadow: -49px 0 #ffa7a7 inset;
	color: #696969;
	display: block;
}
.pagenotif:before {
  content: "\e08b";
  font: 30px 'Icon';
	float: right;
	margin: 13px 10px 0 20px;
	color: #fff;
}
.guidefreame .restore ul li {
	list-style: decimal;
	font: 14px Sans;
	margin: 10px 0;
}
.guidefreame .restore span {font:  14px Sans;}
.forumhead .gt-one:before {content: "\e901";}
.forumhead .gt-two:before {content: "\ed4d";}
.forumhead .gt-three:before {content: "\ea65";}
.forumhead .gt-four:before {content: "\eb22";}
.forumhead .gt-five:before {content: "\edc0";}
.forumhead .gt-six:before {content: "\eb4f";}
.forumhead .gt-seven:before {content: "\f1d7";}
.forumhead .gtad-one:before {content: "\ebc2";}
.forumhead .gtad-two:before {content: "\f342";}
.wikivb-table {	
        display: table;
	width: auto;
	min-width: 900px;
	margin: 10px auto;
	padding: 5px 5px 5px 0;
	border-radius: 3px;
	font: 13px Sans;
	color: #626262;
	letter-spacing: -1px;
}
@media screen and (max-width: 1064px) {.wikivb-table {width: 98%}.wikivb-table .wt-head {width: 99.6%;}}
.wikivb-table ul li {
	width: 33%;
	height: 65px;
	display: inline-table;
	margin: 0 !important;
	float: right;
	border: 1px solid #d3d3d3;
	border-bottom-width: 0px;
	border-left-width: 0px;
}
.wikivb-table ul:nth-child(2) li {height: 80px;background: #ebebeb;border-color: rgba(0,0,0,0.1);}
.wikivb-table ul:nth-child(2) li span {text-align: center !important;}
.wikivb-table ul li:nth-child(1) {width: 40.5%;}
.wikivb-table ul li:nth-child(2) {width: 29%;}
.wikivb-table ul li:last-child {border-left-width: 1px;width: 30%;}
.wikivb-table .wt-list:last-child li {border-bottom-width: 1px;}
.wikivb-table .wt-list:last-child li:first-child {border-radius: 0 0 4px 0;}
.wikivb-table .wt-list:last-child li:last-child {border-radius: 0 0 0 4px;}
.wikivb-table .wt-list:nth-child(2) li:last-child {border-radius: 4px 0 0 0;}
.wikivb-table ul li span {
	display: table-cell;
	vertical-align: middle;
	padding: 0 15px;
	text-align: center;
}
.wikivb-table ul li span .thisusertag {
	width: 200px;
	display: table;
	margin: 0 auto;
	letter-spacing: 0px;
}
.wikivb-table ul li span:before {
    content: "\e9e5";
    font: 17px 'Icon';
    line-height: 46px;
    text-align: center;
    margin: -15px auto -8px auto;;
    color: #2ecc71;
    letter-spacing: 0px;
    display: table;
}
.wikivb-table ul:nth-child(2) li span:before,.wikivb-table ul li:first-child span:before {display: none !important;}
.wikivb-table ul li:first-child span {text-align: right;}
.wikivb-table ul:nth-child(3) li:nth-child(2) span:before ,
.wikivb-table ul:nth-child(4) li:nth-child(2) span:before ,
.wikivb-table ul:nth-child(6) li:nth-child(2) span:before ,
.wikivb-table ul:nth-child(9) li:nth-child(2) span:before {
	content: "\e9e8";
	color: #e74c3c;
}
.wikivb-table ul:nth-child(5) li:nth-child(2) span:before,.wikivb-table ul:nth-child(5) li:nth-child(3) span:before {content: "\f0e6";color: #939393;}
.wikivb-table ul:nth-child(7) li:nth-child(2) span:before,.wikivb-table ul:nth-child(7) li:nth-child(3) span:before {content: "\e9df";color: #939393;}
.wikivb-table ul:nth-child(8) li:nth-child(2) span:before,.wikivb-table ul:nth-child(8) li:nth-child(3) span:before {content: "\ea80";color: #939393;}
.wikivb-table .wt-head {
	line-height: 38px;
	font-size: 16px;
	position: relative;
	padding: 0 44px 0 0;
}
.wikivb-table .wt-head:before {
	content: "";
	position: absolute;
	height: 34px;
	width: 30px;
	right: 0;
	bottom: -6px;
	background: #d3d3d3;
}
.wikivb-table .wt-head:after {
	content: "";
	position: absolute;
	height: 0;
	width: 0;
	border-style: solid;
	border-width: 17px 6px 17px 6px;
	border-color: rgba(0,0,0,0.0) #d3d3d3 #d3d3d3 rgba(0,0,0,0.0);
	right: 30px;
	bottom: -6px;
}
.price-table {min-width: 500px;}
.price-table .wt-price li {
	width: 49% !important;
	height: 40px !important;
}
.price-table .wt-price li span:before {display: none !important;}
.price-table .wt-foot .buy-account {
	background: #acd738;
	color: #fff;
	float: left;
	margin: 15px 0 0 20px;
	font: 15px Sans;
	letter-spacing: 0;
	line-height: 33px;
	padding: 0 10px;
	border-radius: 3px;
}
.price-table .wt-foot .buy-account:hover {background: #666666;}
.last-list li {border-bottom-width: 1px !important;}
.last-list li:first-child {border-radius: 0 0 4px 0;}
.last-list li:last-child {border-radius: 0 0 0 4px;}
@media screen and (max-width: 965px) {
	.wikivb-table ul li:nth-child(1) {width: 40% !important;}
	.wikivb-table ul li span .thisusertag {width: 100% !important;}
	.wikivb-table .wt-head {font-size: 9px !important;}
}
@media screen and (max-width: 647px) {
	.wikivb-table ul li {font-size: 8px;}
	.price-table {width: 100% !important;}
	.price-table ul li:nth-child(1) {width: 49% !important;}
	.wikivb-table ul li span .thisusertag {font-size: 8px;}
	.guidefreame {font-size: 10px !important;}
	.guidefreame ul li {font-size: 8px !important;}
}
.adstable ul li span:before,.planstable ul li span:before {display: none;}
.adstable .wt-list:nth-child(3) li:nth-child(2) span,
.adstable .wt-list:nth-child(3) li:nth-child(3) span,
.adstable .wt-list:nth-child(4) li:nth-child(2) span,
.adstable .wt-list:nth-child(4) li:nth-child(3) span,
.adstable .wt-list:nth-child(5) li:nth-child(2) span,
.adstable .wt-list:nth-child(5) li:nth-child(3) span {
	letter-spacing: 2px;
}
.adstable ul:nth-child(2) li,.planstable ul:nth-child(2) li {height: 50px;}
.wikivb-table li {font-size: 15px;}
.adstable ul:nth-child(2) li,.planstable ul:nth-child(2) li,.vbversions ul:nth-child(2) li {height: 50px;}
.wikivb-table li {font-size: 15px;}
.vbversions {min-width: 700px;}
.vbversions ul li span:before {content: "\e9e5" !important;color: #2ecc71 !important;}
.vbversions ul:nth-child(3) li:nth-child(2) span:before,
.vbversions ul:nth-child(4) li:nth-child(2) span:before {content: "\e9e5" !important;color: #e74c3c !important;}
.navbar .popupbody li a,.navbar .popupbody li label , .toolsmenu .popupbody li a,.toolsmenu .popupbody li label{
	font-size: 13px;
	padding: 5px 10px;
	border-radius: 5px;
	margin: 4px 0;
	color: #93a4b5;
}
.toolsmenu .popupbody li a,.toolsmenu .popupbody li label{margin: 3px;}
.toolsmenu ul ul {margin: 0;}
.popupbody li.formsubmit .submitoptions label, .popupbody li.formsubmit .advancedsearchlink a {padding: 0;color: #72869a;}
.navtabs #tab_mzi2_259 a.navtab:before {content: "\f0ee";}
.navtabs #tab_mzi2_285 a.navtab:before {content: "\f0c5";}
.navtabs #tab_nzu3_419 a.navtab:before {content: "\ecd2";}
.navtabs #tab_otux_111 a.navtab:before {content: "\ea14";}
.navtabs #vbtab_blog a.navtab:before {content: "\ef0d";}
.toolsmenu div li h6 .firstunread {
	color: #fff !important;
	font-size: 12px;
	background: none !important;
	padding: 1px 0 0 5px;
}
.importantperfix {
	background: #f24d59;
	color: #fff;
	padding: 0 5px;
	border-radius: 3px;
	position: relative;
	display: inline-table;
	font-size: 10px;
	margin: 0 -2px 0 0;
}
@media screen and (max-width: 1065px) {.bigads img {width: 97%;height: auto;}}
.subforumlist li {margin: 4px 0;}
.wikimodal {
	top: 50px !important;
}
#project-order .modal-dialog {min-width: 600px !important;}
.wikimodal .modal-body {
	padding: 15px !important;
	font-size: 15px;
	text-shadow: 0 0 0 rgba(0,0,0,0) !important;
	line-height: 24px; !important
}
.wikimodal .modal-body .po-head {
	display: block;
	height: 250px;
	margin: -15px -15px 20px -15px;
	background: url(wikivb/wikivb-v6/orderbg.jpg) no-repeat center;
	background-size: cover;
	border-radius: 8px 8px 0 0;
}
.wikimodal .modal-body .po-title {
	text-align: center;
	display: block;
	font-size: 24px;
	margin: 0 0 20px 0;
	color: #e74c3c;
}
.wikimodal .modal-body .po-subtitles {
	color: #66798c;
	margin: 10px 0;
}
.wikimodal .modal-body .po-subtitles:before {
	content: "\f111";
	font: 8px 'Icon';
	float: right;
	margin: 7px 4px 0 4px;
	color: #e74c3c;
}
.po-how p {
	font-size: 14px;
	margin: 0 20px 0 0;
}
.po-how p:before {
	content: "\f199";
	font: 15px 'Icon';
	float: right;
	margin: 3px 0 0 5px;
}
.po-how p:nth-child(2):before {content: "\ecc3";}
#project-order .button, .offerbutton {
	display: block;
	text-align: center;
	background: #2ecc71;
	border: 0px;
	color: #fff !important;
	font: 17px Sans;
	margin: 30px -15px -15px -15px;
	padding: 15px 0 18px 0;
	font-weight: 300;
	border-radius: 0 0 8px 8px;
}
#project-order .button:hover,.offerbutton:hover {background: #e74c3c;}
#project-order .modal-footer {position: absolute;top: 10px;left: 12px;}
#project-order .modal-footer .close-modalbut:before {color: #e74c3c;}
#smilies ul.smilielist li {
	background: #fff;
	border-radius: 8px;
}
#smilies ul.smilielist li div.smilie {
	background: none;
	border: 0px;
}
#smilies ul.smilielist li div.label {
	background: none;
	border: 0px;
}
#smilies p.description {
	text-align: left;
	color: #949ba5;
	font-size: 13px;
	font-weight: normal;
	margin: 3px 0 0 0;
}
.modal-content {text-shadow: 0 0 0 rgba(0,0,0,0) !important;}
.wikiv6-tops {margin: 10px 0 0 0;}
.wikiv6-tops .blocksubhead {
	background: #475364 !important;
	color: #fff !important;
	font-weight: 200 !important;
}
#vsatopstats_ltitle_area,#vsatopstats_rtitle_area {
   pointer-events: none;
   cursor: default;
   background: none;
   color: #fff;
   font-weight: 200 !important;
}
#vsastats_fdiv,#vsastats_udiv,#vsastats_lpdiv {
	padding: 5px !important;
	line-height: 22px;
}
#vsastats_lpdiv {
	border-right: 0px solid #f3f5f8 !important;
}
#vsastats_fdiv tbody,#vsastats_udiv tbody {
	background: #f3f5f8;
	padding: 10px !important;
	display: block;
	border-radius: 8px;
}
#vsastats_fdiv tbody tr td:nth-child(1),#vsastats_udiv tbody tr td:nth-child(1) {
	padding: 0 0 0 5px !important;
}
#vsastats_fdiv tbody tr td:nth-child(3) a,#vsastats_udiv tbody tr td:nth-child(3) a {
   pointer-events: none;
   cursor: default;
}

#vsastats_lpdiv tr td:nth-child(1) {
	display: none;
}
#vsastats_lpdiv tr td {
	padding: 1px 5px !important;
}
#vsastats_lpdiv tr:nth-child(1) td:nth-child(2) {padding-top: 5px !important;}
#vsastats_lpdiv tr .importantperfix {
	padding: 0 5px !important;
	display: inline-block;
	line-height: 15px;
	margin: 3px 0 0 5px;
	float: right;
	cursor: default;
}
#forum_statusicon_119 , #forum_statusicon_95 {
	height: 42px !important;
	width: 42px !important;
	margin-top: -21px !important;
	right: 10px;
	top: 50% !important;
}
.adminsrating {display: table;margin: 0 auto 5px auto;}
.announcements .announcerow div {background: none;}
.announcements .announcerow {
	background: #e74c3c;
	border-radius: 8px;
	color: #fff !important;
	padding: 10px 0 12px 0;
	font-weight: 200;
	position: relative;
}
.announcements .announcerow:before {
	content: "\ebbd";
	font: 25px 'Icon';
	position: absolute;
	right: 0;
	top: 50%;
	margin: -14px 16px 0 0;
}
.announcement dl {font-size: 16px;margin: 0 60px 4px 0;font-weight: normal !important;}
.announcement .username {margin-right: 60px;}
.announcements .announcerow a {color: #fff !important;}
.announcerow .announceinfo {margin: 6px 0 0 0;}
.navbar .popupmenu a.popupctrl {
	background: none;
	padding: 0 5px;
}
.navbar .popupmenu a.popupctrl:before {
	content: "\ea2a";
	font: 9px 'Icon';
	float: left;
	margin: 11px -3px 0 5px;
}
.wikivb-chatbox .button {
	line-height: 24px;
	border-radius: 3px !important;
}
@media screen and (max-width: 680px) {
.wikivb-header .fixbox {
	display: grid;
	grid-template-areas: 'hlogo'
			     'hads';
}
.wikivb-header .fixbox .header-ads {grid-area: hads;}
.wikivb-header .fixbox .logo {grid-area: hlogo;}
.header-ads {display: table !important;margin: 0 auto !important;}
.wikivb-header {height: 320px !important;}
}
@media screen and (max-width: 480px) {
	.header-ads img {width: 97%;display: table;margin: 0 auto;height: auto;}
	.header-ads {background: none;}
}

/* Cooperation */

#navbar_notice_7 {
	overflow: hidden;
}
#navbar_notice_7 a {
	text-align: center;
	display: block;
	padding: 1px 0 10px 0;
	box-shadow: -70px 0 0 0 inset #dee4f0 !important;
	border-radius: 0 10px 30px 0;
}
#navbar_notice_7 a::before {
	content: '';
	background: url('http://uupload.ir/files/hgdr_cooperation.png') no-repeat scroll center center / cover;
	width: 100%;
	height: 144px;
	display: block;
	max-width: 530px;
	margin: -65px auto;
	position: relative;
	top: -25px;
}
#navbar_notice_7 a > img {
	float: right;
	margin: 0 3px;
	background-color: #f3f5f8;
	border-radius: 50%;
}
#navbar_notice_7 a > h5 {
	position: relative;
	color: #7a8ba5;
	top: -10px;
	font: bold 16px 'sans';
}
#navbar_notice_7 a > p {
	margin: 25px 0 0 0;
	font: normal 14px 'sans';
	color: #7a8ba5;
	line-height: 30px;
}
#navbar_notice_7 a > p > span {
	background: #dee4f0;
	padding: 0 10px;
	border-radius: 30px;
}
#navbar_notice_7 a > p > span:last-child {
	background: #7a8ba5;
	color: #f3f5f8;
}
@media screen and (max-width: 700px) {
	#navbar_notice_7 a {
	box-shadow: none !important;
	border-radius: 0;
	}
	#navbar_notice_7 a > img {
	display: none;
	}
}