var multix_displayed = false;
var multix_box_displayed = null;
var multix_position = 0;
jQuery(document).ready(function() {
	jQuery(".multix_box_container").css("max-width", jQuery(window).width()-20);
	jQuery("#multix_exact_link_input").val(window.location.href);
	
	$(document).click(function(e) {
		multix_close_displayed(true);
		multix_displayed = false;
	});
	
	jQuery(".multix_box_container").click(function(e) {
		e.stopPropagation();
	});
	
	var multix_currenturl = window.location.href;
	if (multix_currenturl.indexOf("#pos") != -1) {
		var multix_tmp = multix_currenturl.substr(multix_currenturl.indexOf("#pos")+4);
		var intRegex = /^\d+$/;
		if(intRegex.test(multix_tmp)) {
			multix_position = parseInt(parseFloat("0."+multix_tmp)*jQuery('html, body').height());
			jQuery('html, body').stop().animate({scrollTop: multix_position}, 500);
		}
	}
	jQuery(window).scroll(function() {
		multix_position = jQuery(window).scrollTop();
		var multix_height = jQuery('html, body').height();
		if (multix_position != 0 && multix_position <= multix_height) {
			var multix_url = window.location.href;
			var multix_tmp = multix_position/multix_height;
			var multix_index = multix_tmp.toFixed(4).toString().substr(2,4);
			if (multix_url.indexOf("#") != -1) {
				multix_url = multix_url.substr(0, multix_url.indexOf("#"))+"#pos"+multix_index;
			} else multix_url = multix_url+"#pos"+multix_index;
			jQuery("#multix_exact_link_input").val(multix_url);
		} else jQuery("#multix_exact_link_input").val(window.location.href);
		if (multix_displayed == true) {
			if (multix_position < multix_offset) {
				jQuery("#multix").fadeOut(300);
				multix_displayed = false;
				if (multix_box_displayed) {
					var multix_box_id = jQuery(multix_box_displayed).data("cid").substr(1);
					jQuery("#"+multix_box_id).fadeOut(300);
				}
			}
		} else {
			if (multix_position >= multix_offset) {
				jQuery("#multix").fadeIn(300);
				multix_displayed = true;
				if (multix_box_displayed) {
					var multix_box_id = jQuery(multix_box_displayed).data("cid").substr(1);
					jQuery("#"+multix_box_id).fadeIn(300);
				}
			}
		}
	});
	
	jQuery(".multix_boxedlink").click(function(e) {
		jQuery("#menuOrder").hide();
		multix_close_displayed(false);
		if (multix_box_displayed != this) {
			
			if(!ajaxRequestSent && jQuery(this).attr('id').indexOf("livenotifications") != -1) {
				ln_fetchnotifications(this, jQuery(this).data('type'), jQuery(this).data('cid').substr(1));
			}
			
			multix_box_displayed = this;
			var multix_box_right = jQuery(window).width() - jQuery(this).offset().left - jQuery(this).outerWidth();
			var multix_box_id = jQuery(this).data("cid").substr(1);
			jQuery(this).addClass("multix_hovered");
			if (jQuery("#"+multix_box_id).outerWidth() + multix_box_right > jQuery(window).width() - jQuery("#multix").offset().left) {
				multix_box_right = jQuery(window).width() - jQuery("#multix").offset().left - jQuery("#"+multix_box_id).outerWidth();
			}
			jQuery("#"+multix_box_id).css("right", multix_box_right);
			var multix_height = jQuery("#multix").height();
			if (multix_height < multix_height_value) multix_height = multix_height_value;
			jQuery("#"+multix_box_id).css('display', 'block');
			jQuery("#"+multix_box_id).stop().animate({top: multix_height}, 300);
		} else multix_box_displayed = null;
		return false;
	});
	
	/*jQuery("#multix_userinfo_link").mouseover(function(e) {
			if (multix_box_displayed == this) {
				return;
			}
			
			multix_close_displayed(false);
			if (multix_box_displayed != this) {
				multix_box_displayed = this;
				var multix_box_right = jQuery(window).width() - jQuery(this).offset().left - jQuery(this).outerWidth();
				var multix_box_id = jQuery(this).data("cid").substr(1);
				jQuery(this).addClass("multix_hovered");
				if (jQuery("#"+multix_box_id).outerWidth() + multix_box_right > jQuery(window).width() - jQuery("#multix").offset().left) {
					multix_box_right = jQuery(window).width() - jQuery("#multix").offset().left - jQuery("#"+multix_box_id).outerWidth();
				}
				jQuery("#"+multix_box_id).css("right", multix_box_right);
				var multix_height = jQuery("#multix").height();
				if (multix_height < multix_height_value) multix_height = multix_height_value;
				jQuery("#"+multix_box_id).css('display', 'block');
				jQuery("#"+multix_box_id).stop().animate({top: multix_height}, 300);
			} else multix_box_displayed = null;
			return false;
	});
	*/
	jQuery(".multix_menubar a").hover(function() {
		multix_close_displayed(true);
	});
	jQuery(".multix_box_close").click(function() {
		multix_close_displayed(true);
	});
	jQuery(window).resize(function() {
		jQuery(".multix_box_container").css("max-width", jQuery(window).width()-20);
	//	multix_close_displayed(true);
	});
	jQuery("#multix_scrollup").click(function() {
		multix_close_displayed(true);
		jQuery('html, body').stop().animate({scrollTop: 0}, 500);
	});
});

function multix_close_displayed(setnull) {
	$('#ln_pm_new').hide();
	if (multix_box_displayed) {
		jQuery(".multix_redborder").removeClass("multix_redborder");
		jQuery(multix_box_displayed).removeClass("multix_hovered selected");
		var multix_box_id = jQuery(multix_box_displayed).data("cid").substr(1);
		var multix_height = jQuery("#"+multix_box_id).height();
		if (multix_height < 10) multix_height = 640;
		jQuery("#"+multix_box_id).animate(
			{top: -multix_height-40}, 
			300,
			function(multix_box_id) {
				jQuery(this).css('display', 'none');
			}
		);
		if (setnull) multix_box_displayed = null;
		jQuery(".multix_infobox").slideUp(300);
	}
}