/* ## Responsive Menu
---------------------------------------------------------------------------------------------------- */

jQuery(function( $ ){
	// * Main Navigation
	$("header .genesis-nav-menu, .nav-primary .genesis-nav-menu").addClass("responsive-menu").before('<div class="responsive-menu-icon"></div>');
 
	$(".responsive-menu-icon").click(function(){
		$(this).next("header .genesis-nav-menu, .nav-primary .genesis-nav-menu").slideToggle();
	});
 
	$(window).resize(function(){
		if(window.innerWidth > 768) {
			$("header .genesis-nav-menu, .nav-primary .genesis-nav-menu, nav .sub-menu").removeAttr("style");
			$(".responsive-menu > .menu-item").removeClass("menu-open");
		}
	});
 
	$(".responsive-menu > .menu-item").click(function(event){
		if (event.target !== this)
		return;
			$(this).find(".sub-menu:first").slideToggle(function() {
			$(this).parent().toggleClass("menu-open");
		});
	});
 
});

jQuery(document).ready(function($){
	/* ## Scroll to Top
	---------------------------------------------------------------------------------------------------- */
	// Scroll (in pixels) after which the "To Top" link is shown
	var offset = 300,
		//Scroll (in pixels) after which the "back to top" link opacity is reduced
		offset_opacity = 1200,
		//Duration of the top scrolling animation (in ms)
		scroll_top_duration = 700,
		//Get the "To Top" link
		$back_to_top = $('.to-top');

	//Visible or not "To Top" link
	$(window).scroll(function(){
		( $(this).scrollTop() > offset ) ? $back_to_top.addClass('top-is-visible') : $back_to_top.removeClass('top-is-visible top-fade-out');
		if( $(this).scrollTop() > offset_opacity ) { 
			$back_to_top.addClass('top-fade-out');
		}
	});

	//Smoothy scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		$('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});

	/* ## Smooth Scrolling
	---------------------------------------------------------------------------------------------------- */

    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
	});
	
	/* ## Testimonial Carousel Block
	---------------------------------------------------------------------------------------------------- */
	$('.testimonial-slider .owl-carousel').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			dots: true,
			lazyLoad:true,
			autoplay: true,
			autoplayTimeout: 9000,
			autoplayHoverPause: true,
			slideSpeed : 9000,
			mouseDrag: true,
			responsiveClass:true
	});
	$('.play').on('click', function() {
		$('.testimonial-slider .owl-carousel').trigger('play.owl.autoplay', [6000])
	})
	$('.stop').on('click', function() {
		$('.testimonial-slider .owl-carousel').trigger('stop.owl.autoplay')
	})

	/* ## Resource Archive
	---------------------------------------------------------------------------------------------------- */
	$(".select-nav").on("click", function () {
        $(".select-nav").not(this).removeClass("select-nav--active");
        $(this).toggleClass("select-nav--active");
    });
    $(document).on("click", function (e) {
        if ( $(e.target).closest(".select-nav").length < 1 ) {
            $(".select-nav").removeClass("select-nav--active");
        }
    })
});
