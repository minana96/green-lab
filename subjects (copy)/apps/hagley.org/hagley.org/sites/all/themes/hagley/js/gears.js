/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery('#block-nice-menus-1').on('load', function() {
 // jQuery(this).addClass('downshow');
 // jQuery('.l-header').addClass('downtop');
//  jQuery('.gears-inner').addClass('downtop');
//  jQuery('.gear1').addClass('gearIn');
//  jQuery('.gear2').addClass('gearIn');
//  jQuery('.gear3').addClass('gearIn');
//  jQuery('.gear1').removeClass('gearOut');
//  jQuery('.gear2').removeClass('gearOut');
//  jQuery('.gear3').removeClass('gearOut');
 // jQuery('.navarrow').addClass('arrowdown');
});

if(jQuery('body').hasClass('front')) {
    //jQuery('#block-nice-menus-1').on('mouseleave', function() {
   //   jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
   //   jQuery("#block-nice-menus-1").removeClass('downshow');
   //   jQuery('.l-header').removeClass('downtop');
   //   jQuery('.gears-inner').removeClass('downtop');
   //   jQuery('.gear1').addClass('gearOut');
   //   jQuery('.gear2').addClass('gearOut');
   //   jQuery('.gear3').addClass('gearOut');
   //   jQuery('.gear1').removeClass('gearIn');
   //   jQuery('.gear2').removeClass('gearIn');
   //   jQuery('.gear3').removeClass('gearIn');
   //   jQuery('.navarrow').removeClass('arrowdown');        
   //   jQuery('.navarrow').removeClass('arrowmore');
   //   jQuery('.l-header').removeClass('downtopMore');
   //   jQuery('.l-header').removeClass('downtopMore2');
   //   jQuery('.nice-menu li').removeClass('butOn');
   //   jQuery('.nice-menu li').removeClass('topNavMove');
   //   jQuery('.nice-menu li').removeClass('topNavMove2');
  //  });
}
//VISIT button...
jQuery('.menu-517').hover(function() {
//jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
jQuery('.nice-menu li').removeClass('butOn');
jQuery(this).addClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "visible"}).animate({opacity: 1}, 100);
},
function(){
jQuery('.menu-517').removeClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "hidden"}).animate({opacity: 0}, 100)
});

//RESEARCH button...
jQuery('.menu-536').hover(function() {
//jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
jQuery('.nice-menu li').removeClass('butOn');
jQuery(this).addClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "visible"}).animate({opacity: 1}, 100);
jQuery(this).addClass('butOn');
},
function(){
jQuery(this).removeClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
});

//SUPPORT button...
jQuery('.menu-549').hover(function() {
//jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
jQuery('.nice-menu li').removeClass('butOn');
jQuery(this).addClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "visible"}).animate({opacity: 1}, 100);
},
function(){
jQuery(this).removeClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
});

//ABOUT button...
jQuery('.menu-564').hover(function() {
//jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
jQuery('.nice-menu li').removeClass('butOn');
jQuery(this).addClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "visible"}).animate({opacity: 1}, 100);
},
function(){
jQuery(this).removeClass('butOn');
jQuery(this).closest('li').find('ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
});
//Rollover Down arrow on tier pages...
jQuery('.navarrow').on('hover', function() {
    
    if($(this).hasClass('arrowdown')) {
//      jQuery('.nice-menu li ul').css({visibility: "hidden"}).animate({opacity: 0}, 100);
//      jQuery("#block-nice-menus-1").removeClass('downshow');
//      jQuery('.l-header').removeClass('downtop');
//      jQuery('.gears-inner').removeClass('downtop');
//      jQuery('.gear1').addClass('gearOut');
//      jQuery('.gear2').addClass('gearOut');
//      jQuery('.gear3').addClass('gearOut');
//      jQuery('.gear1').removeClass('gearIn');
//      jQuery('.gear2').removeClass('gearIn');
//      jQuery('.gear3').removeClass('gearIn');
//      jQuery('.navarrow').removeClass('arrowdown');        
//      jQuery('.navarrow').removeClass('arrowmore');
//      jQuery('.l-header').removeClass('downtopMore');
//      jQuery('.l-header').removeClass('downtopMore2');
//      jQuery('.nice-menu li').removeClass('butOn');
//      jQuery('.nice-menu li').removeClass('topNavMove');
//      jQuery('.nice-menu li').removeClass('topNavMove2');
    } else {    
//      jQuery("#block-nice-menus-1").addClass('downshow');
//      jQuery('.l-header').addClass('downtop');
//      jQuery('.gears-inner').addClass('downtop');
//      jQuery('.gear1').addClass('gearIn');
//      jQuery('.gear2').addClass('gearIn');
//      jQuery('.gear3').addClass('gearIn');
//      jQuery('.gear1').removeClass('gearOut');
//      jQuery('.gear2').removeClass('gearOut');
//      jQuery('.gear3').removeClass('gearOut');
//      jQuery('.navarrow').addClass('arrowdown');
  }
});