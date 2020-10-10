$.fn.td_scrollshowheader = function(options) {
	options = $.extend(true, {
		delta : 5,
		starttop : 0,
	}, options);
	return this.each(function() {
		// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var navbarHeight = $(this).outerHeight();
		var showtop = options.starttop;
		var hidetop = showtop - navbarHeight;
		$(this).css({
			"transition" : "top .5s"
		});
		$(window).scroll(function(event) {
			didScroll = true;
		});

		setInterval(function() {
			if (didScroll) {
				hasScrolled();
				didScroll = false;
			}
		}, 250);

		function hasScrolled() {
			var st = $(this).scrollTop();

			// Make sure they scroll more than delta
			if (Math.abs(lastScrollTop - st) <= options.delta)
				return;

			// If they scrolled down and are past the navbar, add class .nav-up.
			// This is necessary so you never see what is "behind" the navbar.
			if (st > lastScrollTop && st > navbarHeight) {
				// Scroll Down
				$(".navbar-fixed-top").css({
					"top" : hidetop
				});
			} else {
				// Scroll Up
				if (st + $(window).height() < $(document).height()) {
					$(".navbar-fixed-top").css({
						"top" : showtop
					});
				}
			}

			lastScrollTop = st;
		}
	});
}