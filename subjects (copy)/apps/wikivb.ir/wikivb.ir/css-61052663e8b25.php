#multix {
	display: block;
	z-index: 899999;
	position: absolute;
	top: 0px;
	left: 0px; 
	right: 0px;
	margin: 0 auto;
	width: 100%;
	max-width: 100%;
	min-width: 100%;
	background: #292f36;
	border: 0px solid !important;
	height: 50px;
}
#multix-main-panel {
	width: 100%;
	margin: 0 auto;
}

.multix {margin-left: 40px;}
#multix-menumobile {display: none;}

#multix_home {margin-left: 5px;}
#multix a.multix_iconlink {display: inline-block !important; overflow: hidden; padding: 0; text-align: center;}
#multix a.multix_iconlink i {display: inline-block; vertical-align: middle;}
#multix a.multix_boxedlink {display: inline-block !important; text-align: center;}
#multix a.multix_boxedlink i {display: inline-block; vertical-align: middle; margin-top: -2px;}

a.multix_iconlink.multix_boxedlink  i{ margin-top:0px !important;margin-right: 0px !important;}

#multix a.multix_logo {
	display: inline-block; 
	float: left; 
	margin: 3px 15px 0px 4px;
	padding: 0 !important;
	vertical-align: middle;
	text-decoration: none !important;
	overflow: hidden;
}
#multix a.multix_logo img {
	background: transparent !important;
	border: none !important;
	box-shadow: none !important;
	-o-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-webkit-box-shadow: none !important;
	-ms-box-shadow: none !important;
	border-radius: none !important;
	-o-border-radius: none !important;
	-webkit-border-radius: none !important;
	-moz-border-radius: none !important;
	-ms-border-radius: none !important;
	padding: 0 !important;
	margin: 0 !important;
	vertical-align: middle;
}


.multix_right {float: right;}
.multix_left {float: left;}

div.multix_box_container {
	z-index: 899998;
	position: absolute;
	top: -640px;
	display: block;
	right: 0px;
	width: 320px;
	height: auto;
	padding: 5px 10px;
	height: auto;
	font-size: 13px !important;
	
	line-height: normal !important;
	box-shadow: 0px 2px 2px rgba(0,0,0,0.2);
	-moz-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);
	-webkit-box-shadow: 0px 2px 2px rgba(0,0,0,0.2);
}

input.multix_input,
textarea.multix_textarea,
#multix_loginform input[type="text"], 
#multix_loginform input[type="password"], 
div.multix_widget input[type="text"], 
div.multix_widget input[type="password"], 
div.multix_widget input[type="email"], 
div.multix_widget input[type="url"], 
div.multix_widget input[type="number"], 
div.multix_widget textarea,
div.multix_widget #s {
	font-size: 13px !important;
	
	width: 100%;
	border: 1px solid transparent;
	margin: 0px;
	padding: 6px 6px;
	color: #333;
	background: #FFF;
	background: rgba(255, 255, 255, 0.9);
	outline: none;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
	line-height: normal !important;
	max-width: 100%;
}
input.multix_input,
div.multix_widget input[type="text"], 
div.multix_widget input[type="password"], 
div.multix_widget input[type="email"], 
div.multix_widget input[type="url"], 
div.multix_widget input[type="number"], 
div.multix_widget textarea,
div.multix_widget #s {
	height: auto !important;
}
textarea.multix_textarea {
	height: 80px;
}

a.multix_button,input.multix_button,
div.multix_widget input[type="button"],
div.multix_widget input[type="submit"], 
div.multix_widget input[type="reset"],
#multix_loginform input[type="submit"],
#multix_loginform input[type="button"],
div.multix_widget #searchsubmit {
	color: #fff;
	text-shadow: 0 -1px 1px rgba(0,0,0,.25);
	background-color: #019ad2;
	background-repeat: repeat-x;
	background-image: -moz-linear-gradient(#33bcef,#019ad2);
	background-image: -ms-linear-gradient(#33bcef,#019ad2);
	background-image: -webkit-linear-gradient(#33bcef,#019ad2);
	background-image: -o-linear-gradient(#33bcef,#019ad2);
	background-image: linear-gradient(#33bcef,#019ad2);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#33bcef',endColorstr='#019ad2',GradientType=0);
	border: 0px solid #33bcef;
	width: auto;
	white-space: nowrap;
	height: auto;
	position: relative;
	display: inline-block;
	padding: 6px 15px;
	font-size: 13px;
	font-weight: bold;
	line-height: 18px;
	cursor: pointer;
	border-radius: 2px;
	margin: 0;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}
a.multix_button:hover, a.multix_button:active, input.multix_button:hover,
input.multix_button:active,
div.multix_widget input[type="button"]:hover, 
div.multix_widget input[type="submit"]:hover, 
div.multix_widget input[type="reset"]:hover
#multix_loginform input[type="submit"]:hover,
#multix_loginform input[type="button"]:hover,
div.multix_widget #searchsubmit:hover {
	color:#fff;
	background-color:#0271bf;
	background-repeat:repeat-x;
	background-image:-moz-linear-gradient(#2daddc,#0271bf);
	background-image:-ms-linear-gradient(#2daddc,#0271bf);
	background-image:-webkit-linear-gradient(#2daddc,#0271bf);
	background-image:-o-linear-gradient(#2daddc,#0271bf);
	background-image:linear-gradient(#2daddc,#0271bf);
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#2daddc',endColorstr='#0271bf',GradientType=0);
	border: 0px solid #33bcef;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}
input.multix_button:active,
div.multix_widget input[type="button"]:active, 
div.multix_widget input[type="submit"]:active, 
div.multix_widget input[type="reset"]:active,
#multix_loginform input[type="submit"]:active,
#multix_loginform input[type="button"]:active,
div.multix_widget #searchsubmit:active {
	color: #fff;
	background: #0271bf;
	border: 0px solid #096eb3;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}

#multix_loginform label {
	font-size: 13px !important;
	
	line-height: normal !important;
	display: block;
	margin: 5px 0px;
	padding: 0 !important;
	height: auto;
	width: auto;
	vertical-align: top;
}
#multix_loginform p {
	margin: 0 !important;
	padding: 0 !important;
}

#multix_accountinfo {
	margin-top: 5px;
}
#multix_accountinfo table {
	border-collapse: collapse;
	border-spacing: 0;
	border: none !important;
	padding: 0 !important;
	margin: 0 !important;
	background: transparent;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}
#multix_accountinfo table tr {
	border: none !important;
	padding: 0 !important;
	margin: 0 !important;
	background: transparent;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}
#multix_accountinfo table td {
	vertical-align: top;
	border: none !important;
	padding: 0 8px 0 0 !important;
	margin: 0 !important;
	background: transparent;
	-webkit-box-shadow: none;
	-moz-box-shadow: none;
	-o-box-shadow: none;
	-ms-box-shadow: none;
	box-shadow: none;
}
#multix_accountinfo ul {
	text-align: left;
	display: block;
	list-style: none;
	padding: 0;
	margin: 20px 0 0 0;
}
#multix_accountinfo ul li {
	margin: 0;
	padding: 0;
	display: block;
	line-height: 1.7;
	height: auto;
	list-style: none;
}
#multix_accountinfo ul li a {
	margin: 0;
	padding: 0;
	height: auto;
	text-transform: capitalize;
	text-decoration: none;
	font-weight: normal;
}
#multix_accountinfo ul li a:hover, 
#multix_accountinfo ul li a:visited {
	text-decoration: underline;
}
#multix_accountinfo img {
	background: transparent !important;
	border: 1px solid #888; !important;
	box-shadow: none !important;
	-o-box-shadow: none !important;
	-moz-box-shadow: none !important;
	-webkit-box-shadow: none !important;
	-ms-box-shadow: none !important;
	border-radius: none !important;
	-o-border-radius: none !important;
	-webkit-border-radius: none !important;
	-moz-border-radius: none !important;
	-ms-border-radius: none !important;
	padding: 0 !important;
	margin: 0 !important;
	vertical-align: middle;
}

span.multix_box_close {
	width: 16px;
	height: 16px;
	line-height: 16px;
	position: absolute;
	right: 5px;
	bottom: 2px;
	text-decoration: none;
	text-align: right;
	opacity: 0.65;
	color: #fff;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	
	cursor: pointer;
}
span.multix_box_close:hover {
	opacity: 0.95;
}
span.multix_spinner {
	background: transparent url(vbsocial/images/loading.gif) 4px 4px no-repeat;
	width: 24px;
	height: 24px;
	display: inline-block;
	line-height: 24px;
	visibility: hidden;
}
.multix_redborder {
	border: 1px solid red !important;
}

div.multix_infobox {
	font-size: 13px !important;
	
	display: none;
	margin: 10px 0px 10px 0px;
	padding-top: 10px;
	text-align: center;
}
#multix_search {float: left; margin: 0px 5px !important; padding: 0px !important;}
#multix_search .multix-input {
	font-size: 13px;
	
	height: 24px;
	background-image: url(vbsocial/images/sprite.png);
	background-position: 3px 2px;
	background-repeat: no-repeat;
	width: 150px;
	border: none;
	margin: 3px 3px 0 0;
	color: #333;
	background-color: rgba(255, 255, 255, 0.9);
	padding: 0px 0px 0px 24px;
	outline: none;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	box-shadow: none;
}
#multix_search .multix-button,
#multix_search a {
	display: none !important;
}

div.multix_widget {
	font-size: 13px !important;
	
	line-height: normal !important;
	margin-bottom: 20px;
	word-wrap: break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	hyphens: auto;
	clear: both;
}
h2.multix_widget_title {
	font-size: 13px !important;
	
	line-height: normal !important;
	font-weight: bold;
	margin: 0px 0px 5px 0px;
	padding: 0px;
	text-transform: uppercase;
}
div.multix_widget form {
	margin-right: 10px;
}
div.multix_widget #s {
	width: 100%;
	margin-bottom: 10px;
}
div.multix_widget ul {
	margin: 0;
}
div.multix_widget ul ul {
	margin-left: 1em;
}
div.multix_widget ul li {
	margin-left: 1.5em;
	list-style: square;
}
div.multix_widget a {
	text-decoration: none;
}
div.multix_widget a:hover,
div.multix_widget a:focus,
div.multix_widget a:active {
	text-decoration: underline;
}
div.multix_widget .widget_search form {
}
div.multix_widget .widget_image img {
	border: 0;
	padding: 0;
	height: auto;
	max-width: 100%;
}
div.multix_widget #wp-calendar {
	width: 100%;
	text-align: center;
}
div.multix_widget #wp-calendar caption,
div.multix_widget #wp-calendar td {
	font-size: 13px;
	
	line-height: normal;
	text-align: center;
	padding: 0px;
}
div.multix_widget #wp-calendar caption {
	text-align: center;
	padding: 5px 0 3px 0;
	text-transform: uppercase;
}
div.multix_widget #wp-calendar th {
	font-size: 13px;
	
	line-height: normal;
	text-align: center;
	background: transparent;
	border-top-width: 1px;
	border-top-style: solid;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	font-weight: bold;
	padding: 0px;
}
div.multix_widget #wp-calendar tfoot td {
	background: transparent;
	border-top-width: 1px;
	border-top-style: solid;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	padding: 0px;
}
#multix ul {
	list-style: none;
	margin: 0px;
	font-size: 13px !important;
	
}
#multix li {
	float: left;
	position: relative;
	list-style: none !important;
	margin-left: 0px !important;
	margin-bottom: 0px !important;
	padding: 0px !important;
	background: transparent;
}
#multix a {
	display: block;
	padding: 0px 11px;
	text-decoration: none;
}
#multix ul ul {
	box-shadow: 0px 2px 2px rgba(0,0,0,0.7);
	-moz-box-shadow: 0px 2px 2px rgba(0,0,0,0.7);
	-webkit-box-shadow: 0px 2px 2px rgba(0,0,0,0.7);
	display: none;
	position: absolute;
	left: 0;
	float: left;
	width: 180px;
	z-index: 899999;
	padding-left: 0px;
	padding-right: 0px;
}
#multix ul ul li {
	min-width: 180px;
}
#multix ul ul ul {
	left: 100%;
	top: 0;
}
#multix ul ul a {
	line-height: 1em;
	padding: 10px;
	height: auto;
}
#multix ul li:hover > ul {
	display: block;
}


/* Dark Grey Color Scheme */
.multix_dark_gray {
	border-color: black;
	background: #212121;
	background: -webkit-gradient(linear, left top, left bottom, from(#3D3D3D), to(#212121));
	background: -webkit-linear-gradient(top, #3D3D3D, #212121);
	background: -moz-linear-gradient(top, #3D3D3D, #212121);
	background: -ms-linear-gradient(top, #3D3D3D, #212121);
	background: -o-linear-gradient(top, #3D3D3D, #212121);
	text-shadow: 0 1px 1px rgba(0,0,0,.8);
}

.multix_dark_gray a.multix_boxedlink:hover,
.multix_dark_gray a.multix_iconlink:hover,
.multix_dark_gray a.multix_boxedlink:active,
.multix_dark_gray a.multix_iconlink:active,
.multix_dark_gray a.multix_hovered {
	background-color: rgba(0,0,0,0.2) !important;
}

div.multix_dark_gray_container {
	background: #212121;
	background-color: rgba(24,24,24,0.95);
}
.multix_dark_gray ul ul a {
	background-color: #303030;
	background-color: rgba(48,48,48,0.9);
}
.multix_dark_gray li:hover > a,
.multix_dark_gray ul ul :hover > a {
	background-color: #282828;
	background-color: rgba(40,40,40,0.9);
}

/* White Font Scheme */
.multix_font_light a.multix_boxedlink:hover,
.multix_font_light a.multix_iconlink:hover,
.multix_font_light a.multix_boxedlink:active,
.multix_font_light a.multix_iconlink:active,
.multix_font_light a.multix_hovered {color: #FFF !important;}

div.multix_font_light {
	color: #CCC !important;
	text-shadow: 0 1px 1px rgba(0,0,0,.8);
}
.multix_font_light div.multix_infobox {
	color: #CFA !important;
}
.multix_font_light div.multix_widget {
	color: #CCC !important;
}
.multix_font_light h2.multix_widget_title {
	color: #CCC !important;
}
.multix_font_light div.multix_widget a {
	color: #FFF !important;
}
.multix_font_light div.multix_widget #wp-calendar {
	color: #CCC !important;
}
.multix_font_light div.multix_widget #wp-calendar caption,
.multix_font_light div.multix_widget #wp-calendar td {
	color: #AAA !important;
}
.multix_font_light div.multix_widget #wp-calendar th {
	color: #CCC !important;
	border-color: #CCC;
}
.multix_font_light div.multix_widget #wp-calendar tfoot td {
	border-color: #CCC;
}
.multix_font_light a {
	color: #CCC !important;
}
.multix_font_light li:hover > a,
.multix_font_light ul ul :hover > a {
	color: #FFF !important;
}
.multix_font_light ul li.current_page_item > a,
.multix_font_light ul li.current-menu-ancestor > a,
.multix_font_light ul li.current-menu-item > a,
.multix_font_light ul li.current-menu-parent > a {
	color: #FFF !important;
}
* html .multix_font_light ul li.current_page_item a,
* html .multix_font_light ul li.current-menu-ancestor a,
* html .multix_font_light ul li.current-menu-item a,
* html .multix_font_light ul li.current-menu-parent a,
* html .multix_font_light ul li a:hover {
	color: #FFF !important;
}

@media screen and (max-width: 300px) {  
	#multix {display: none !important;}
	div.multix_box_container {display: none !important;}
}

div.multix_box_container a.multix_button {
	color: #fff !important;
}
html#vbulletin_html {margin-top: 50px !important;}

#multix a.multix_boxedlink {
	font-family: Sans;
	color: #8796b3 !important;
	font-size: 12px;
}
#multix a.multix_boxedlink i {
	float: right;
	margin-top: 7px;
	display: inline-block;
}
#multix #multix_userinfo_link i {margin-top: 7px !important;}
#multix a.multix_boxedlink span {
	float: left;
	text-align: right;
	margin: 12px 6px 8px 0;
	text-shadow: 0 0 0;
}
#multix a.multix_boxedlink b {
	font-weight: normal !important;
	font-size: 11px;
	display: block;
	line-height: 15px;
}
#multix a.multix_boxedlink .wlc {font-size: 10px;font-weight: 300 !important;}
#multix_userinfo_link {
	padding: 0 0 0 10px !important;
	margin-right: 17px
}
#multix a.multix_iconlink {
	text-align: center !important;
	text-shadow: 0 0 0;
}
#multix a.multix_iconlink i {float: none;}
#multix a.multix_iconlink i:before {
	content: "\e901";
	font-family: 'Icon';
	font-size: 22px;
	color: #9caccd;
	width: 50px;
}
#multix a#livenotifications i:before {content: "\e334";font-size: 18px;}
#multix a#livenotifications_pm i:before {content: "\e245";}
#multix a#livenotifications_friend i:before {content: "\e044";font-size: 16px;}
#multix a#livenotifications_moderation i:before {content: "\e078";font-size: 18px;}
#livenotifications_moderation {margin-right: 0;}
#multix a#livenotifications_friend,#multix a#livenotifications {
	background: rgba(0,0,0,0.1);
}
#multix a.multix_boxedlink:hover {
	background: rgba(0,0,0,0.20) !important;
}
#multix a#livenotifications_friend:hover,#multix a#livenotifications:hover {
	background: rgba(0,0,0,0.20) !important;
}
#multix_search {
	background: #323a45;
	line-height: 30px;
	margin: 9px -15px 0 45px !important;
	padding: 0 10px 0 30px !important;
	border-radius: 2px;
	width: 160px;
	position: relative;
}
#multix_search input {
	background: none;
	border: 0px;
	font: 12px 'sans',iranian sans,Tahoma;
	color: #667086;
}
#multix_search .textbox {
	margin: 0px !important;
	line-height: 26px;
	padding: 0 0 4px 0;
	width: 100%;
}
#multix_search .textbox::-webkit-input-placeholder {color: #667086;}
#multix_search .textbox:-moz-placeholder {color: #667086;}
#multix_search .textbox::-moz-placeholder {color: #667086;}
#multix_search .textbox:-ms-input-placeholder {color: #667086;}
#multix_search .searchbutton {
	border: 0px !important;
	position: absolute;
	left: 0px;
	top: 0px;
	background: none;
	cursor: pointer;
}
#multix_search .searchbutton:before {
	content: "\e028";
	font: 16px 'Icon';
	line-height: 30px;
	width: 30px;
	text-align: center;
	display: table;
	color: #20272e;
}
#multix_search:hover .searchbutton:before {color: #d2eb5f;}
.modal-box {
	left: 0px !important;
	right: 0px !important;
	margin: 0 auto;
}
.cover-special {
	height: 90px;
	display: block;
	margin: -5px -10px 10px -10px;
}
.cs-link {
	float: right;
	margin: 64px 4px 0 0;
	color: #e0e9f7;
	background: rgba(0,0,0,0.25);
	padding: 0 4px;
	line-height: 22px;
	border-radius: 2px;
}
.cs-link:hover {
	background: #475364;
	color: #e0e9f7;
}
.multix_box_container .secondaryContent:last-child , .livenotifications_link , li#ln_settings_window {border: 0px !important;}
.multix_box_container .secondaryContent:last-child label {
	font-size: 12px;
	line-height: 12px;
	margin: 5px 0 10px 0;
}
.multix_box_container .secondaryContent:last-child label:hover {background: none;}
.multix_box_container .secondaryContent:last-child .blockLinksList:last-child {
	float: left
}
.multix_box_container .secondaryContent:last-child .blockLinksList:last-child a {
	float: left !important;
	text-align: left;
	width: auto;
	background: #1abc9c !important;
	color: #fff;
	line-height: 16px;
	padding: 0 5px 3px 5px;
	border-radius: 4px;
	margin: 6px 0 0 8px;
}
.multix_box_container .secondaryContent:last-child .blockLinksList:last-child a:before {
	content: "\e208";
	font: 10px 'Icon';
	height: 0;
	width:0;
	background: none;
	float: right;
	margin: 4px -1px 0 13px;
}
.multix_box_container .secondaryContent:last-child .blockLinksList:last-child a:hover {
	background: #34495e !important;
	color: #fff;
}
.ln_title .send_to_friend, .ln_title .setting_link {
	font-size: 12px;
	background: #b5c0da;
	color: #fff;
	line-height: 17px;
	padding: 0 5px;
	border-radius: 20px;
	margin: 2px 0 0 -5px;
	-moz-transition: all 0.2s ease-in;
	-webkit-transition: all 0.2s ease-in;
	-o-transition: all 0.2s ease-in;
	-ms-transition: all 0.2s ease-in;
}
.ln_title .send_to_friend:hover, .ln_title .setting_link:hover {
	background: #7a8ba5;
}
.lnpmbit.red, .livenotificationbit.red {
	margin: 5px;
	border: 0px;
	border-radius: 8px;
	background: #eff2f7 !important;
}
.lnpmbit.red:hover, .livenotificationbit.red:hover {
	background: #eff2f7 !important;
}
.lnpmbit.red>div, .livenotificationbit.red>div {
	width: 233px !important;
}
.notificationContent {
	color: #838d9c;
}
li.livenotificationbit {font-size: 12px;}
.ln_sender_name a, .ln_sender_name a:hover {
	color: #838d9c;
	font-weight: 600;
}
.ln_sender_name a {
	border-bottom: 1px solid #d6d9e0;
	display: block;
	margin: 1px -17px 3px 0;
	padding: 0px 8px 2px 0;
	position: relative;
}
.ln_sender_name a:after {
	content: "\e004";
	font: 12px 'Icon';
	float: right;
	margin: 2px 0 0 4px;
}
.ln_sender_name a:before {
	content: '';
	height: 5px;
	width: 5px;
	position: absolute;
	left: 0px;
	bottom: -5px;
	border: 2px solid #d6d9e0;
	border-radius: 50%;
	background: #e7eaf0;
}
.lnpmbit.red>div:hover .ln_sender_name a:before, .livenotificationbit.red>div:hover .ln_sender_name a:before {
	border-color: #8ed01c;
}
.hideNotification,.replyIcon {
	float: right !important;
	margin-top: 6px;
}
.hideNotification {margin-right: 11px;}
.mCustomScrollBox>.mCSB_scrollTools {
	right: -4px !important;
	width: 10px !important;
}
.mCS-dark-thick>.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
	background: #a4b2c7 !important;
	border-radius: 0px !important;
}
li.livenotifications_link {				
	text-decoration: none !important;
	font-size: 13px;
	font-weight: normal;
	padding: 10px 0 12px 0;
	background: none;
	color: #738092 !important;
	border-top: 1px solid #e9eef6 !important;
	margin-top: 3px;
}
.ln_title {
	background: url(wikivb/wikivb-v6/dots.png) repeat-x bottom;
	border: 0;
	padding-bottom: 21px !important;
}
.ln_time {font-size: 11px;}
#livenotifications_list_pm .ln_time {float: left}
#livenotifications_list_friend .hideNotification {margin-right: 20px;}
.livenotificationbit .actions {
	text-align: center;
}
.livenotificationbit .actions .multix_button {
	border-radius: 30px !important;
	font: 13px Sans;
	line-height: 21px;
	padding: 0;
	width: 44%;
	margin: 0 3px;
	background: #99d41b;
	text-shadow: 0 0;
	font-weight: normal !important;
	color: #597320;
	border: 1px solid rgba(0,0,0,0.0) !important;
	-moz-transition: all 0.2s ease-in;
	-webkit-transition: all 0.2s ease-in;
	-o-transition: all 0.2s ease-in;
	-ms-transition: all 0.2s ease-in;
}
.livenotificationbit .actions #reject {
	background: #f68a8a;
	color: #973030;
}
.livenotificationbit .actions .multix_button:hover {
	background: none !important;
	border: 1px solid #99d41b !important;
	color: #99d41b;
}
.livenotificationbit .actions #reject:hover {
	background: none !important;
	border: 1px solid #f68a8a !important;
	color: #f68a8a;
}
#ln_settings_window>div,#ln_settings_window>div {width: auto !important;}
#ln_settings_window #ln_notification_back {
	font-size: 14px;
	text-align: center;
	color: #738092;
	text-decoration: none !important;
}
#ln_settings_window #ln_notification_back:before {
	content: "\e223";
	font: 13px 'Icon';
	margin: 0 0 0 3px;
}