// JavaScript Document

//Nav
//      $(".menutoggel").click(function(){ $("#respMenu").toggle();});
//
//      $(document).ready(function(){
//          $(".menu-item-has-children").on('click touch', function (e){
//            $(this).children(".sub-menu").toggle();
//          }).on('click','.sub-menu',function(e) {
//              e.stopPropagation();
//         });
//      });

//Navigation
!function(e,n){var i={init:function(n,i){var u=this;u.options=e.extend({},e.fn.nav.options,n),u.$body=e("body"),u.$nav=e(i),u.$menuButton=e(u.options.navButton),u.$subMenu=e(u.options.subMenu),u.subMenu=u.options.subMenu,u.mobileMode=u.isCurrentlyMobile(u),u.mouseOver=u.options.mouseOver,u.disableSubMenuLink=u.options.disableSubMenuLink,u.slideSpeed=u.options.slideSpeed,e("html").removeClass("nav-no-js"),u.collapseSubMenus(u),u.bindEvents(u)},bindEvents:function(i){i.$menuButton.on("click",function(e){i.toggleNav(i),e.preventDefault()}),i.$nav.on("click",i.subMenu+" > a",function(n){var u=e(this);i.isSubMenuLinkDisabled(i,u)&&(i.toggleSubMenu(i,u.parent()),n.preventDefault())}),1==i.mouseOver&&(i.$nav.on("mouseenter",i.subMenu,function(){0==i.mobileMode&&i.openSubMenu(i,e(this))}),i.$nav.on("mouseleave",i.subMenu,function(){0==i.mobileMode&&i.closeSubMenu(i,e(this))})),e(n).on("resize",function(){i.resetNav(i)})},isSubMenuLinkDisabled:function(e,n){return"always"==e.disableSubMenuLink||"#"==n.attr("href")||"mobile"==e.disableSubMenuLink&&1==e.mobileMode||"desktop"==e.disableSubMenuLink&&0==e.mobileMode},toggleNav:function(n){n.$nav.stop().clearQueue().slideToggle(n.slideSpeed,function(){var i=e(this);i.is(":hidden")?(n.collapseSubMenus(n),e(this).attr("style","display: none;")):e(this).attr("style","display: block;")}),n.$body.toggleClass("nav-lock-scroll")},toggleSubMenu:function(e,n){n.hasClass("nav-active")?e.closeSubMenu(e,n):e.openSubMenu(e,n)},openSubMenu:function(n,i){i.addClass("nav-active").children("ul").stop().clearQueue().slideDown(n.slideSpeed,function(){e(this).attr("style","display: block;")}),i.siblings(n.subMenu).removeClass("nav-active").children("ul").slideUp(n.slideSpeed,function(){e(this).clearQueue()}).find(".nav-active").removeClass("nav-active").children("ul").slideUp(n.slideSpeed,function(){e(this).clearQueue()})},closeSubMenu:function(n,i){i.removeClass("nav-active").children("ul").stop().clearQueue().slideUp(n.slideSpeed,function(){e(this).attr("style","display: none;")}).find(".nav-active").removeClass("nav-active").children("ul").slideUp(n.slideSpeed,function(){e(this).clearQueue()})},resetNav:function(e){var n=e.isCurrentlyMobile(e);e.mobileMode!==n&&(e.$nav.removeAttr("style").find("ul").removeAttr("style"),e.$body.removeClass("nav-lock-scroll"),e.collapseSubMenus(e),e.mobileMode=n)},collapseSubMenus:function(e){e.$subMenu.removeClass("nav-active").children("ul").hide()},isCurrentlyMobile:function(e){return e.$menuButton.is(":visible")}};e.fn.nav=function(e){return this.each(function(){var n=Object.create(i);n.init(e,this)})},e.fn.nav.options={navButton:".nav-button",subMenu:".menu-item-has-children",mouseOver:!0,disableSubMenuLink:"always",slideSpeed:300}}(jQuery,window,document),"function"!=typeof Object.create&&(Object.create=function(e){function n(){}return n.prototype=e,new n});

$('#nav-main').nav();

//nav close icon by me
$(document).ready(function(){
  $("#navi").click(function(){
    $("#navi").toggleClass("close");
  });
});

//nav close when click menu items
$(document).ready(function(){	
  $(".menu-item").click(function(){
	  if ($(window).width() <= 1200) {
    $("#nav-main").hide();
	$("#navi").toggleClass("close");}
  });
});



//banner
$('#banner-slider').slick({
autoplay:true,
    autoplaySpeed:6000,
    slidesToShow:1,
	rtl:true,
	dots:false,
    fade:false, 
	customPaging : function() { },
	prevArrow:'<button class="slick-prev"> <i class="icon-right-open"></i></button>',
    nextArrow:'<button class="slick-next"> <i class="icon-left-open"></i></button>', 
	});

//testimonials
$('.testimonials').slick({
autoplay:true,
    autoplaySpeed:4000,
    slidesToShow:1,
	rtl:true,
	dots:true,
    fade:false, 
	customPaging : function() { },
	prevArrow:false,
    nextArrow:false, 
	});

// Header Script
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("header").className = "shrink";
  } else {
    document.getElementById("header").className = "";
  }
}

// Stop Video
    $(function() {
		var videoURL = $('iframe').prop('src');
		videoURL = videoURL.replace("autoplay=1", "");		
          $('.lightbox-close').click(function() { 
                $('#video').find('iframe').attr('src',''); 
          });			   
		 $('.lightbox').click(function() { 
                $('#video').find('iframe').attr('src',videoURL); 
          });
    });


/* Accordion
================================================== */
$(function() {
  $('.acc__title').click(function(j) {
    
    var dropDown = $(this).closest('.acc__card').find('.acc__panel');
    $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();
    
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).closest('.acc').find('.acc__title.active').removeClass('active');
      $(this).addClass('active');
    }
    
    dropDown.stop(false, true).slideToggle();
    j.preventDefault();
  });
});



	
  




