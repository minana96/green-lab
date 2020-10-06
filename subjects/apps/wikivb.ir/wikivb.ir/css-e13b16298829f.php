@charset "UTF-8";
/* CSS Document */

/* Don't use left and right stylevar here */

#content_container {
	width:100%;
	float:left;
	margin-right: -270px;
	padding: 10px 0;
}
#content_container.contentright {
	float:right;
	margin-right:0;
	margin-left:-270px;
}

#content_container #content {
	margin-right:270px;
}
#content_container.contentright #content {
	margin-right:0;
	margin-left:270px;
}

/*-----------------------------------*/
/* SIDEBAR */
/* Don't use left and right stylevar here */
#sidebar_container {
	float:right;
	width:250px;
	padding: 17px 0;
	margin-bottom:3em;
}

#sidebar_container.sidebarleft {
	float:left;
}

#sidebar_container a {
	color: #417394;
}

#sidebar_container a:hover {
	color: #417394;
}

#sidebar_button {
	display:block;
	margin-top: 40px;
	float:left;
	margin-left:-28px;
	_margin: 40px 0 0 0;
	_display: inline-block;
}
#sidebar_button {
	_display: inline;
}
#sidebar_container.sidebarleft #sidebar_button {
	float:left;
	margin-left:-28px;
}

#sidebar_container .block {
	margin-bottom:4px;
	padding:6px;
	border-top-left: 5px;
	border-top-right: 5px;
	border-top-left: 5px;
	border-top-right: 5px;
}

#sidebar_container .blockbody {
	padding: 0;
	color: #000000;
	border:1px solid #DADADA;
	-moz-border-radius:5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background:rgb(255, 255, 255);
}

#sidebar_container .blockrow {
	border-top: 1px solid rgb(255, 255, 255);
	-moz-border-radius:5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background:rgb(255, 255, 255) url(images/gradients/gradient-black-down.png) repeat-x  ;
	padding:10px 6px 10px 6px;
}

#sidebar_container .underblock {
	height:9px;
	background:transparent url(images/gradients/bottom-shadow.png) repeat-x left bottom;
}

#sidebar_container .blocksubhead {
	padding:10px 6px 10px 6px;
}

#sidebar_container .blocksubhead {
	background:transparent none;
	font-size:13px;
	height:16.76px;
	color: #000000;
	padding: 5px 6px;
	border:none;
	outline:none;
	font-weight:bold;
}

#sidebar_container .blocksubhead span.blocktitle {
	width: auto;
	display:block;
	white-space:nowrap;
	float:right;
	overflow:hidden;
	padding-right:3px;
}

#sidebar_container .blocksubhead img {
	vertical-align:middle;
	float: right;
}

#sidebar_container .blocksubhead img.inlineimg {
	float: none;
	position: relative;
	top: -2px;
}

#sidebar_container .blocksubhead a.username {
	padding-left:20px;
}

#sidebar_container .formcontrols .blockrow label {
	width:auto;
}

#sidebar_container .advanced.blockfoot {
	padding:6px;
	border-bottom:none;
	font-size:88%;
	font-weight:bold;
	background: transparent;
}
#sidebar_container .searchblock .advanced a {
	line-height:2;
}

#sidebar_container .searchblock .advanced .button {
	float:left;
}


#sidebar_container > ul {
	background:#fff;
	border:0px solid #c1c1c1;
	border-radius: 8px;
	float:right;
	width:99%;
}
#sidebar_container a.collapse {
	position:static;
}

#sidebar_container.sidebar_closed {
	width:0px;
}

#sidebar.sidebar_hidden {
	display:none;
}

#content_container.sidebar_nomargin_left, #content_container #content.sidebar_nomargin_left {
	margin-left:0px;
}

#content_container.sidebar_nomargin_right, #content_container #content.sidebar_nomargin_right {
	margin-right:0px;
}


#sidebar_button {
	float:right;
	margin-right:-28px;
}
.sidebarleft #sidebar_button {
	float:left;
	margin-left:-28px;
	margin-right:0;
}



/* CSS Document */

/*widget*/

.widget_content {
	color: #000000;
	-moz-border-radius:5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	background:rgb(255, 255, 255) url(images/gradients/gradient-black-down.png) repeat-x  ;
	border:1px solid #DADADA;
	_background-image: none;
	padding:10px 6px 10px 6px;
}

.widget_content a {
	color: #417394;
}

.widget_content a:hover {
	color: #417394;
}

.widget_content .meta {
	font-size:11px;
}

.widget_content .meta.activitystream {
	word-wrap: break-word;
}

.widget_post_bit {
	border-top: 1px dotted #C9C9C9;
	clear:both;
	padding-bottom: 2px;
}

.cms_widget.activitystream .widget_post_bit,
ul.activitystream .widget_post_bit {
	min-height: 35px;
}

.widget_post_bit:first-child {
	border-top: 0;
}

.widget_post_header {
	font:  bold 12px Tahoma,Calibri,Verdana,Geneva,sans-serif;
	padding: 5px 0;
	margin: 0;
}

.widget_post_header a {
	word-wrap: break-word;
	width: 100%;
	display: block;
}

.widget_post_content {
	padding: 1px 0;
	margin: 0;
	font-size: 12px;
	color: #000000;
}

.widget_post_userinfo {
	padding: 1px 0;
	margin: 0;
	position: relative;
}

.widget_post_useravatar {
	position: absolute;
	top: 5px;
	right:0;
}

.cms_widget .widget_post_useravatar img,
.block .widget_post_useravatar img {
	width: 30px;
	max-width: 30px !important;
	height: auto;
}

.widget_post_comment {
	margin-right: 40px;
	font-size: 11px;
}

.widget_post_comment_noavatar {
	margin-right: 0;
	font-size: 12px;
}

.widget_post_comment .widget_post_content {
	overflow: hidden;
}

.widget_views {
	padding: 1px 0;
	margin: 0;
	text-align: left;
}

a.tagcloudlink:link, a.tagcloudlink:visited {
	text-decoration:none;
}

a.tagcloudlink:hover,
a.tagcloudlink:active {
	text-decoration:underline;
}

a.level1 {
	font-size: 9px;
}

a.level2 {
	font-size: 12px;
}

a.level3 {
	font-size: 15px;
}

a.level4 {
	font-size: 18px;
}

a.level5 {
	font-size: 21px;
}

#tag_searchbox {
	text-align: center; padding: 6px;
}

#tag_search {
	margin-top:10px;
}