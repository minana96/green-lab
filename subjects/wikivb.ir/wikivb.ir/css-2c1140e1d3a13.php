@charset "UTF-8";
/* CSS Document */

#forums {
	clear:both;
}

.forumhead {
	background: #75787D none   ;
	_background-image: none;
	padding: 0;
	font:  bold 12px Arial, Tahoma,Calibri,Verdana,Geneva,sans-serif;
	color:#ffffff;
	clear:both;
	margin-top: 8px;
	float: right;
	border: 1px solid #5a7f97;
	width: 100%;
	-moz-border-radius-topleft: 5px;
	-moz-border-radius-topright: 5px;
	-webkit-border-top-left-radius: 5px;
	-webkit-border-top-right-radius: 5px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

#forums .L1 .forumhead a {
	font:   bold 12px Arial, Tahoma,Calibri,Verdana,Geneva,sans-serif;
}

#forums .L1 .forumhead .forumdescription {
	display:none;
}

#forums .L1 .L2 {
	display:block;
	clear: both;
}

#forums a.username {
	color: #B0B0B0;
}

#forums a.username:hover {
	color: #B0B0B0;
}

.forumbit_post .forumrow, .forumbit_nopost .forumhead, .forumbit_nopost .forumrow, .forumbit_post .forumhead, .forumbits .forumhead {

	-moz-box-shadow: 0px 0px 0px #000000;
	-webkit-box-shadow: 0px 0px 0px #000000;
	box-shadow: 0px 0px 0px #000000;

}

.forumbit_nopost .forumbit_nopost .forumrow, .forumbit_post .forumrow {
	color: #738092;
	background: #f3f5f8;
	display:block;
	width: 100%;
	float: right;
	min-height: 58px; 
	position:relative;
	box-shadow: 0 0 0 1px #e4e8ef inset !important;
	margin-top: -1px;
}

.forumbit_nopost .forumbit_nopost .forumrow .forumicon {
	position: absolute;
	right: 10px;
	top: 5px;
}

.forumbit_nopost .forumbit_nopost .forumrow .forumdata {
	display: inline-block;
	width:100%;
}

.forumbit_nopost .forumbit_nopost .forumrow .forumdata .datacontainer {
	margin-right: 68px;
}

.forumbit_nopost .forumbit_post .forumrow .forumdata .datacontainer {
	margin-right: 0;
}

/* forumbit nopost */
.forumbit_post .foruminfo .forumdata {
	padding: 4px 0;
	font-size: 12px;
}

.forumbit_nopost .forumhead .forumtitle {
	font-size: 13px;
	min-width: 64%;
}

.forumbit_nopost .forumhead .forumtitle a {
	color: #ffffff;
	margin-right: 10px;
}

.forumbit_nopost .forumhead span, .forumbit_post .forumhead span {
	font-size: 12px;
}

.forumbit_nopost .forumhead span.forumlastpost, .forumbit_post .forumhead span.forumlastpost {
	width: 21%;
}

.forumbit_nopost .forumhead a.collapse img {
/* values are based on the image */
	position:absolute;
	top: -15px;
	left: -6px;
	display:block;
	width:13px;
	height:13px;
	overflow:hidden;
	float: left;
	clear: right;
}

.forumbit_nopost:hover .forumhead  a.collapsegadget {
	visibility:visible;
}

.forumbit_nopost .forumbit_nopost .forumrow .forumdata, .forumbit_post .forumrow .forumdata  {
	padding: 5px 10px;
	padding-right: 0;
	font-size: 11px;
}

/* Removed for VBIV-14010
.forumbit_nopost .forumbit_nopost .foruminfo .subforums {
	margin-right: 10px;
	position: relative;
	top: -10px;
}
*/

/* forumbit post */
.forumbit_post {
	float: right;
	position:relative;
	width: 100%;
	display:block;
}

.forumbit_post .forumhead span {
	padding: 0;
}

.forumbit_post .forumhead .forumlastpost {
	top: 0;
	margin-top: 0;
}

.forumbit_post .foruminfo, .forumbit_post .forumlastpost, .forumbit_post .forumactionlinks, .forumbit_post .forumstats, .forumbit_post .forumstats_2{
	padding: 5px 0;
}

.forumbit_post .forumhead .forumtitle {
	font-size: 13px;
	min-width: 64%;
}

.forumbit_post .forumhead .forumtitle span {
padding: 0;
padding-right: 10px;
}

.forumbit_post .foruminfo {
	width: 100%;
	min-width: 30%;
	float: right;
	clear: left;
	min-height: 48px; 
}

.forumbit_post .foruminfo .forumicon{
	position: absolute;
	right: 15px;
	top: 50%;
	margin-top: -31px;
}

.forumbit_post .foruminfo .forumdata, .forumbit_post .foruminfo .forumtitle, .forumbit_post .foruminfo .viewing {
	float: right;
	clear: left;
}

.forumbit_post .foruminfo .viewing {
        white-space:nowrap;
}

.forumbit_post .foruminfo .forumdata {
	padding: 0;
	width: 100%;
	_width: 99%;
}

.forumbit_post .foruminfo .forumdata .datacontainer {
	float: right;
	width: 88%;
	padding-right: 60px;
}

.forumbit_post .foruminfo .forumdata .forumtitle, .forumbit_nopost .forumbit_nopost .forumrow .forumtitle {

font-size: 13px;
	margin-left: 10px;
	margin-top: 7px;
}

.forumbit_post .foruminfo .forumdata .forumtitle a, .forumbit_nopost .forumbit_nopost .forumrow .forumtitle a {
	color: #738092;
	font-size: 14px;
}

.childsubforum .forumbit_post .foruminfo .forumdata .datacontainer .forumtitle a {
        padding-right:1.8em;
        background:url('wikivb/wikivb-v6/misc/child_forum.png') top right no-repeat;
}

.forumbit_post .foruminfo .forumdata .viewing {
	font-style: italic;
	margin-left:10px;
	margin-top: 3px;
	font-size: 11px;
}

.forumbit_post .forumactionlinks {
	width: 5%;
	display:block;
	float:right;
	clear:left;
}

.forumbit_post .forumactionlinks li {
	display: inline;
}

.forumbit_post .forumactionlink {
/* values based on icon size */
	display:block;
	width:18px;
	height:12px;
	overflow:hidden;
	float: left;
	clear: right;
	background:transparent none no-repeat;
	position: relative;
	margin: 3px 10px 0 0;
}

.forumactionlink a {
/* values based on icon size */
	display:block;
	padding-right:18px;
}

.forumactionlinks .rsslink {
	background-image:url(wikivb/wikivb-v6/misc/rss_40b.png);
}

.forumactionlinks .subslink {
	background-image:url(wikivb/wikivb-v6/misc/subscribed_40b.png);
}
.forumactionlinks .unsubslink {
	background-image:url(wikivb/wikivb-v6/misc/unsubscribed_40b.png);
}
.forumbit_post .forumdescription {
	display:block;
	clear:both;
	padding-left: 10px;
	padding-top: 3px;
	font-weight: 500;
}

.forumbit_post .unsubscribe {
	display:block;
	left: 0;
	top: 2px;
}
.forumbit_post .forumstats, .forumbit_post .forumstats_2 {
	display: block;
	float: left;
	clear: left;
	width: auto;	
	padding-left: 10px;
	margin-bottom: -29px;
	margin-top: 3px;
}

.forumbit_post .forumstats li, .forumbit_post .forumstats_2 li{
	display: inline-block;
	padding: 0px !important;
	background: #b5c0da;
	color: #f0f2f4;
	padding: 0 5px !important;
	border-radius: 15px;
	margin: 0 2px;
	line-height: 16px;
	font-size: 11px;
	float: left;
}
.forumbit_post .forumlastpost {
	display:block;
	float: right;
	clear: left;
}

.forumbit_post .forumrow .forumlastpost {
	width: 100%;
	font-size: 12px;
	padding-top: 5px;
	float: right;
	border-top: 1px solid #e4e8ef;
	padding: 8px 0 10px 0;
}
.forumbit_post .forumrow .forumlastpost p , .forumbit_post .forumrow .forumlastpost div {
	float: right !important;
	margin: 0 8px;
}
.forumbit_post .forumrow .forumlastpost div>div {
	float: left !important;
	margin-right: 3px;
}
.forumbit_post .forumrow .forumlastpost div img {display: none;}
.forumbit_post .forumlastpost .lastpostdate {display: none !important;}
.forumbit_post .forumlastpost .lastpostdate {
	font-size: 11px;
}

.lastpostlabel { 
	display: none; 
}

.forumlastpost .lastposttitle .postimg {
	vertical-align:middle;
	margin-top:-2px;
}

.forumlastpost p.lastposttitle {
	overflow: hidden;
}

.moderators, .subforums {
	display: block;
	clear:both;
}

.moderators h4, .subforums h4 {
	font-weight: bold;
	padding-left: 5px;
}

.moderators h4, .moderators .commalist, .subforums h4, .subforums .commalist {
	float:right;
	clear:left;
}

h2 span.forumthreadpost {
	width: 12%;
	text-align: center;
}


/* CSS Document */

#forums {
width: 100%;
}

#welcomemessage {
	color:#3e3e3e;
	font-size:100%;
}

.forumhead + .childforum .L2:first-child .forumrow, .forumhead + .L2 .forumrow {
	background: rgb(255, 255, 255) url(images/gradients/grey-up.png) repeat-x left bottom;
	_background-image: none;
	border-top: 0;
}

/* forumbit nopost */
/* forumbit nopost -> forumhead */
.forumbit_nopost .forumhead .forumtitle, .forumbit_nopost .forumhead span, .forumbit_nopost .forumhead .collapse, .forumbit_post .forumhead h2 span {
	display:block;
	float: right;
	clear: left;
	font:   bold 12px Arial, Tahoma,Calibri,Verdana,Geneva,sans-serif;
	padding: 4px 0;
	color: #ffffff;
}

.forumbit_nopost .forumhead h2, .forumbit_post .forumhead h2 {
	margin-right: 3px;
	margin-left: 3px;
}
.forumbit_nopost {
	clear:right;
}
.forumbit_nopost .forumrowdata {
	clear:both;
	display:block;
	width: 100%;
}

.forumbit_nopost .subforumdescription {
	padding: 5px 10px;
	font-weight: normal;
	color: #3e3e3e;
	background: #e9e9e9 none repeat-x  ;
}

#collapse_wgo_members_list {
	top: 12px;
}


/* CSS Document */
/* this might need to get renamed */
/* wgo */
.wgo_block {
	display:block;
	margin-top: 15px;
	-moz-border-radius-topleft: 5px;
	-moz-border-radius-topright: 5px;
	-webkit-border-top-left-radius: 5px;
	-webkit-border-top-right-radius: 5px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	-moz-box-shadow: -2px 2px 2px #000000;
	-webkit-box-shadow: -2px 2px 2px #000000;
	box-shadow: -2px 2px 2px #000000;
	margin-bottom: 10px;
}

.wgo_block .blockbody {
	border: 1px solid #c4c4c4;
	background: rgb(255, 255, 255) url(images/gradients/gradient-greytowhite.png) repeat-x  ;
	_background-image: none;
}

.wgo_block .blockhead {
	font-size:12px;
	font-weight:bold;
	color: rgb(255, 255, 255);
	background: #75787D url(images/buttons/newbtn_middle.png) repeat-x  ;
	_background-image: none;
	border: 1px solid #606060;
}

.wgo_block .time {
	color: #3e3e3e;
}

.wgo_block .section {
	display:block;
	padding: 0 0 0.5em;
	font:    12px ;
	color: #3e3e3e;
	clear:both;
	width: 100%;
}

.wgo_block .blocksubhead {
	padding-right: 10px;
	font: 13px;
	color: #3e3e3e;
	background: transparent;
	padding-bottom: 5px;
}

.wgo_block .section:first-child .blocksubhead {
	border-top: 0;
}

.wgo_block .section .blocksubhead img {
	padding-left: 5px;
}

.wgo_block .section div, .wgo_block .section ol {
	padding-right: 20px;
}

.wgo_block .section div p {
	padding-bottom: 5px;
}

.wgo_block .section div ol {
	padding-right: 0;
}

.wgo_block .section dl dt {
	display:inline;
}

.wgo_block .section dl dt:after {
	content:":";
}

.wgo_block .section dl dd {
	display: inline;
	margin-left:5px;
}

.wgo_block .section dl.icon_legends dt {
	float: right;
	clear: left;
	margin-left: 5px;
}

.wgo_block .section dl.icon_legends dt:after {
	content: "";
}

.wgo_block .section dl.icon_legends dd {
	margin-bottom: 5px;
	display:block;
}

#wgo_onlineusers .commalist li {
	margin-right: 1px; 
}

#wgo_birthdays .commalist li { 
	margin-right: 1px; 
}

.forum_info {
	margin-bottom: 5px;
	float: right;
	width: 100%;
	clear:both;
	position: relative;
	top: -10px;
	color: #3e3e3e;
	font:    12px ;
}

.forum_info .blockhead {
	margin-top: 10px !important;
}
.forum_info .blockhead:before {
	content: '\e195' !important;
}
.forum_info a.collapse {
	position: absolute;
	top: 6.88px;
z-index: 1;
}

.forum_info .blockbody {
	background: #e7eaf0;
	border: 0px;
	border-radius: 2px;
	line-height: 21px;
	color: #727f95
}

.forum_info_subblock, .info_subblock {
	padding: 5px 10px;
}

.forum_info_form .options_input_wrapper {
	float: left;
	display: inline-block;
}

.forum_info_form .options_input_block {
	float: right;
	display:inline-block;
	padding: 10px 10px;
}

.forum_info_form .options_input_block .description {
	display: none;
}

.forum_info_form .options_input_block label {
	display:block;
}

.forum_info_form .options_input_block .checkradio li {
	display:inline-block;
	margin-left: 10px;
}

.forum_info_form .options_input_block .button {
	position: relative;
	margin-top: 15.99px;
}

.forum_info .options_block_container, .thread_info .options_block_container {
	width: 100%;
	float: right;
	display:block;
	position: relative;
	top: 0;
	padding-top:0;
	margin-top: 0;
}

.forum_info .options_block, .thread_info .options_block, .forum_info .options_block2, .thread_info .options_block2 {
	width: 49%;
	padding-right: 0.5%;
	float: right;
	clear: left;
	position: relative;
}


.forum_info .options_block .options_correct, .thread_info .options_block .options_correct, 
.forum_info .options_block2 .options_correct, .thread_info .options_block2 .options_correct {
margin-right:-1.1%;
}

.forum_info .options_block2 {
	margin-right: 1%;
}

.thread_info .options_block2 {
	margin-left: 1%;
}

dl.icon_legends dt {
	float: right;
	clear: left;
	margin-left: 5px;
}

dl.icon_legends dt:after {
	content: "";
}

dl.icon_legends dd {
	margin-bottom: 5px;
	display:block;
}

.info_subblock ul li {
	margin-bottom: 2px;
}

.bbcodeblock ul li a, .rules_link a {
	font-weight:bold;
}


.thread_info {
	margin-bottom: 5px;
	float: right;
	width: 100%;
	clear:both;
	position: relative;
	top: -10px;
	margin-bottom: 0;
	color: #3e3e3e;
	font:    12px ;
}

.thread_info a {
	font-weight:;
}

.thread_info h4 {
	margin-top: 10px !important;
}

.thread_info h5 {
	display: none;
}

.thread_info .blockbody {
	background: #e7eaf0;
	border: 0px;
	border-radius: 2px;
	line-height: 21px;
	color: #727f95;
	padding: 6px 0;
}

.thread_info .inner_block, .info_subblock {
	padding: 4px 10px;
}

ul.icon_list li {
	display:block;
	width: 100%;
	margin-bottom: 5px;
}

.inner_block .commalist {
	margin-top: 5px;
}

#thread_info_block_1 {
	width:34.9%;
	float:right;
}

#thread_info_block_1 > * {
	margin-left:2px;
}

#thread_info_block_2 {
	width:65%;
	float:left;
}

#forumrules {
	border: 0;
	background: transparent;
}

/* Similar Threads */
.similar_threads {
	clear:both;
}

.similar_threads li {
	padding:5px 10px 5px 10px;
}

ol.similar_threads li h6 a {
	font:    12px ;
}

.similar_threads .starter_forum {
	font-size:11px;
}

.similar_threads .titleblock {float:right}
.similar_threads .dateblock {float:left; text-align:left}


.wgo_block, .forum_info .blockbody, .thread_info .blockbody, .thread_info h4
{
	-moz-box-shadow: 0px 0px 0px #000000;
	-webkit-box-shadow: 0px 0px 0px #000000;
	box-shadow: 0px 0px 0px #000000;
}

.forum_info .blockhead {
	-moz-box-shadow: 2px 0 2px #000000;
	-webkit-box-shadow: 2px 0 2px #000000;
	box-shadow: 2px 0 2px #000000;
}
