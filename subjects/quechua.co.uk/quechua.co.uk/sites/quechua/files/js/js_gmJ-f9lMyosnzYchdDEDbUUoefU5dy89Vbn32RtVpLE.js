(function ($) {

    function is_touch_device() {
        return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
    }

    function scrollToPosition(evt) {
      evt.preventDefault();
      var target = $(evt.currentTarget).attr('href');
      var fixedHeader = $('#section-header').css('position') == 'fixed'
                        || $('#section-header').css('position') == 'relative';
      var headerHeight = fixedHeader ? $('#section-header').height() : 0;
      $('html, body').animate({scrollTop: $(target).offset().top - headerHeight}, 300);
    }

    // Dropdown Menu in the facets area.
    Drupal.behaviors.facetMenuCategory = {
        attach: function () {
            $('div[class*="pane-menu-menu-"] .pane-content > .menu > li').append('<span class="open"></span>');
            $('div[class*="pane-menu-menu-"] .pane-content > .menu > li > .menu > .expanded:not(.active-trail)').append('<span></span>');
            $('div[class*="pane-menu-menu-"] .pane-content > .menu > li > .menu > .expanded.active-trail').append('<span class="open"></span>');
            $('div[class*="pane-menu-menu-"] li > span').each(function() {
                $(this).on('click', function() {
                    $(this).toggleClass('open')
                    $(this).prev('ul').toggle('400');
                });
            });
        }
    }

    Drupal.behaviors.ProdZoom = {
        attach: function () {
            // Click to close the media front in the product page
            $('.btn-zoom, .kameleon-product-media-front-img.active').on("click", function() {
                $('#page').addClass('overlay');
                $('.prod-zoom').addClass('open');

            });
            $('body').on('click', '.prod-zoom .close-zoom', function() {
                $('#page').removeClass('overlay');
                $('.prod-zoom').removeClass('open');
            });

        }
    }

    // Delete Autocomplete -> Scroll page
    Drupal.behaviors.autocomplete = {
        attach: function () {
            $(window).scroll(function() {
                $('.ac_results').hide();
            });
        }
    }

    Drupal.behaviors.goTop = {
        attach: function (context, settings) {
        	// Fonction de retour en haut de page.
        	var link = $('.page > .scrollTop', context);

            if(!$('#remote').length){
                $(window).scroll(function() {
                    // Si la page est descendue de 250px.
                    if ($(window).scrollTop() >= 250) {
                        // On fait un fadeIn pendant 500ms.
                        link.fadeIn(500);
                    }
                    else {
                        // On est au dessus de 250 donc fadeOut pendant 500ms.
                        link.fadeOut(500);
                    }
                });
            }
            $('.scrollTop a').click(function(evt) {
                scrollToPosition(evt);
            });
        }
	}

    Drupal.behaviors.Remote = {
        attach: function (context, settings) {
        	// Fonction de la remote.
        	var link = $('#tetris-brick-remote', context);

            // link.find('li a').click(function(evt) {
            //     console.log('click decath');
            //     scrollToPosition(evt);
            // });
        }
	}

    // Remote - Delete element if not exist
    Drupal.behaviors.deleteRemoteItem = {
        attach: function (context, settings) {
            $('#tetris-brick-remote li').each(function() {
                if(!$($(this).find('a').attr('href')).length){
                    $(this).hide();
                }
            });
        }
    }

    Drupal.behaviors.addToCart = {
        attach: function (context, settings) {
            var selector = $('.page-node.node-type-model form.commerce-add-to-cart');

            if(!$(selector).parents('.field-name-field-product').attr('data-width')){
                $(selector).parents('.field-name-field-product').attr('data-width', $(selector).find('.form-submit').outerWidth());
            }

            if($(selector).find('.form-submit').outerWidth() > $(selector).parents('.field-name-field-product').attr('data-width')){
                $(selector).parents('.field-name-field-product').attr('data-width', $(selector).find('.form-submit').outerWidth());
            }
            $(selector).find('.form-submit').css('width', $(selector).parents('.field-name-field-product').attr('data-width')+'px');

            if($(selector).parents('.field-name-field-product').hasClass('disabled')){
                $(selector).find('.form-submit').attr('disabled', 'disabled');
            }

            $(selector).find('.form-submit').mousedown(function() {
                if($(selector).find('.form-submit').outerWidth() > $(selector).parents('.field-name-field-product').attr('data-width')){
                    $(selector).parents('.field-name-field-product').attr('data-width', $(selector).find('.form-submit').outerWidth());
                }
                $(selector).find('.form-submit').css('width', $(selector).parents('.field-name-field-product').attr('data-width')+'px');
                $(this).parents('.field-name-field-product').addClass('disabled');
                $(this).attr('disabled', 'disabled');
            });
        }
    }

    // Message d'erreur quand on fait une recherche a vide (MDR)
    Drupal.behaviors.searchMessageEmpty = {
        attach: function (context, settings) {
            $('#search-block-form').submit(function() {
                var search_key = $(this).find('input[name="search_block_form"]').val();
                if (!search_key) {
                    return false;
                }
            });
        }
    }

    // Link Menu (Page 404)
    Drupal.behaviors.linkMenu404 = {
        attach: function (context, settings) {
            $('.pane-menu-menu-404 ul.menu li.button').each(function() {
                $(this).prev().append($(this).html());
                $(this).remove();
            });
        }
    }

    // Richcontent Video - Product Page
    Drupal.behaviors.richContentVideo = {
        attach: function (context, settings) {

            $('.richcontent-media-left, .richcontent-media-right, .richcontent-media-full-and-text, .richcontent-media-full').each(function(index_richcontent) {
                if($(this).find('.youtube_id').length){
                    $(this).find('.file').tubeplayer({
                        width: $(this).find('.youtube_width').attr('data-info'),
                        height: $(this).find('.youtube_height').attr('data-info'),
                        initialVideo: $(this).find('.youtube_id').attr('data-info'),
                        autoPlay: false
                    });
                }
                if ($(this).find('.video-js').length){
                    _V_($(this).find('.video-js').attr('id'), {}, function(){});
                }
            });

            $('.richcontent-videos .media').each(function(index_media) {
                if($(this).find('.youtube_id').length){
                    $(this).find('.video').tubeplayer({
                        width: $(this).find('.youtube_width').attr('data-info'),
                        height: $(this).find('.youtube_height').attr('data-info'),
                        initialVideo: $(this).find('.youtube_id').attr('data-info'),
                        autoPlay: false
                    });
                }
                if ($(this).find('.video-js').length){
                    _V_($(this).find('.video-js').attr('id'), {}, function(){});
                }
            });

            $('.richcontent-videos .preview:first-child').addClass('active');

            // Lorsqu'on sélectionne une miniature de vidéo dans la liste de vidéos du Rich content
            $('.richcontent-videos .preview').find('.image').click(function() {
                var index_preview = $(this).parent().index();
                $('.richcontent-videos .media').each(function(index_media) {
                    // Si ce n'est pas la vidéo courante
                    if(index_preview != index_media){
                        $('.richcontent-videos .preview:eq('+parseInt(index_media)+')').removeClass('active');
                        $(this).css('visibility', 'hidden');
                        $(this).css('height', '0');
                        $(this).removeClass('active');
                        // On met en pause les vidéos Youtube
                        if($(this).find('.youtube_id').length) {
                            $(this).find('.video').tubeplayer("pause");
                        }
                        // On met en pause les vidéos-js
                        else if ($(this).find('.video-js').length){
                            _V_($(this).find('.video-js').attr('id')).ready(function(){
                                var myPlayer = this;
                                myPlayer.pause();
                            });
                        }
                        // On recharge l'iframe Brightcove pour reset la vidéo
                        else if($(this).find('.playerPlaceHolder').length){
                            var iframe = $(this).find('.playerPlaceHolder').find('iframe');
                            iframe.attr('src', iframe.attr('src'));
                        }
                    }
                    // Si c'est la vidéo courante
                    else{
                        $('.richcontent-videos .preview:eq('+parseInt(index_preview)+')').addClass('active');
                        $(this).css('visibility', 'visible');
                        $(this).css('height', 'inherit');
                        $(this).addClass('active');
                        if($(this).find('.youtube_id').length) {
                            $(this).find('.video').tubeplayer("play");
                        }
                        else if ($(this).find('.video-js').length){
                            _V_($(this).find('.video-js').attr('id')).ready(function(){
                                var myPlayer = this;
                                myPlayer.play();
                            });
                        }
                    }
                });
            });
        }
    }

    // Technical Card - Product Page (Declinaison)
    Drupal.behaviors.declinaison = {
        attach: function (context, settings) {
            var nb_declinaison_item = $('.technical-card .field-name-field-model-declinaison > .field-items > .field-item').length;
            if( nb_declinaison_item/2 == Math.round(nb_declinaison_item/2)){
                $('.technical-card .field-name-field-model-declinaison').parent().addClass('even');
            }
            else{
                $('.technical-card .field-name-field-model-declinaison').parent().addClass('odd');
            }
        }
    }

    // Update - Cart Page
    Drupal.behaviors.updateCartPage = {
        attach: function (context, settings) {
            $('.page-cart select').change(function() {
                $('#edit-submit').trigger('click');
            });
        }
    }

    // Reduce half for retina img in low mobile screen
    Drupal.behaviors.mobileRetina = {
        attach: function (context, settings) {
            $('.node-type-advice, .node-type-blog, .node-type-page').once(function() {
                $('.field-name-body img[src*="2x."]').each(function() {
                    $(this).load(function() {
                        var imageWidth = $(this).width()/2;
                        $(this).css('width',imageWidth);
                    });
                });
            });
        }
    }

    // Avis - La pagination ne ramène pas en haut de page.
    Drupal.behaviors.reviewPager = {
        attach: function (context, settings) {
            $('.page-node-reviews #pager.pager-bottom a').click(function() {
                if($('#section-header').css('position') == 'fixed'){
                    $('html, body').animate({scrollTop: $("#all-reviews").offset().top - $('#section-header').height()}, 'slow');
                }
                else{
                    $('html, body').animate({scrollTop: $("#all-reviews").offset().top}, 'slow');
                }
            });
        }
    }

    // HP - New content (Direct Access) - Calcul De la Taille du Block
    // HP - highlighted
    Drupal.behaviors.SizeContent = {
        attach: function (context, settings) {
            $('.node-teaser.node-direct-access').each(function() {
                var width_block = $(this).find('.field-name-field-direct-access-picture img').not('.lazyloader-icon').attr('width');
                $(this).css('width', width_block+'px');
            });

            $('.node-banner').each(function() {
                var width_block = $(this).find('.field-name-field-banner-image img').not('.lazyloader-icon').attr('width');
                $(this).css('width', width_block+'px');
            });

            $('.pane-homepage-panel-highlighted .node-highlighted, .pane-advice-hp-panel-highlighted .node-highlighted').each(function() {
                var width_block = $(this).find('.field-name-field-highlighted-picture img').not('.lazyloader-icon').attr('width');
                $(this).css('width', width_block+'px');
            });
        }
    }

    // Super Model - Product Teaser
    Drupal.behaviors.superModel = {
        attach: function (context, settings) {
            var pager_model = "";
            $('.node-model.node-teaser, .node-model.upselling').each(function() {
                var html = '';
                if($(this).hasClass('upselling')){
                    var limit = 7;
                }
                else{
                    var limit = 3;
                }
                $(this).find('.list-images-modeles > li').each(function(index) {
                    $(this).attr('data-index', index);
                    if($(this).find('.field-name-field-model-image').length){
                        if(index == 0){
                        html += '<li class="active" data-index="'+index+'">'+$(this).find('.field-name-field-model-image .field-item').html()+'</li>';
                        }
                        else if (index > limit){
                            html += '<li data-index="'+index+'" class="hidden">'+$(this).find('.field-name-field-model-image .field-item').html()+'</li>';
                        }
                        else {
                            html += '<li data-index="'+index+'">'+$(this).find('.field-name-field-model-image .field-item').html()+'</li>';
                        }
                    }
                });
                if(html == ''){
                    $(this).find('.models').addClass('empty');
                }
                $(this).find('.models-list').append(html);
                if($(this).find('.models-list > li.hidden').length > 0){
                    $(this).find('.models-list > li:eq('+limit+')').addClass('hidden');
                    pager_model = '<li class="pager-model">+'+$(this).find('.models-list > li.hidden').length+'</li>';
                    $(this).find('.models-list > li:eq('+(limit - 1)+')').after(pager_model);
                }
                if(pager_model != ''){
                    $(this).find('.models-list').append('<li class="close-model off"></li>');
                }
            });

            $('.models-list').on('click', 'li.pager-model', function() {
                $(this).parent().find('.close-model').removeClass('off');
                $(this).parent().find('.close-model').addClass('on');
                $(this).closest('.node-model .teaser-infos').addClass('active');
                $(this).parent().find('li.hidden').slideToggle(300);
                $(this).parent().find('.close-model').slideToggle(300);
                $(this).parent().parent().append($(this).clone());
                $(this).parent().parent().find('> li').css('display', 'none');
                $(this).remove();
            });

            $('.models-list').on('click', 'li.close-model', function() {
                $(this).removeClass('on');
                $(this).addClass('off');
                $(this).parent().find('li.hidden').slideToggle(300);
                $(this).slideToggle(300, function() {
                    $(this).parent().find('.hidden').first().before($(this).parent().parent().find('> li').clone());
                    $(this).parent().find('.pager-model').css('display', 'block');
                    $(this).parent().parent().find('> li').remove();
                    $(this).closest('.node-model .teaser-infos').attr('data-css', '0');
                    $(this).closest('.node-model .teaser-infos').removeClass('active');
                });
            });

            $('.models-list').on('mouseenter', 'li', function() {
                var control = 1;
                var upselling = 0;
                if($(this).closest('.node-model').hasClass('upselling')){
                    control = 0;
                    upselling = 1;
                    if($(this).closest('.node-model').hasClass('upselling-default')){
                        control = 1;
                    }

                }
                if(control){
                    if(!$(this).hasClass('active') && !$(this).hasClass('pager-model') && !$(this).hasClass('close-model')){
                        $(this).parent().find('li').removeClass('active');
                        $(this).addClass('active');
                        var index = $(this).attr('data-index');
                        var super_model = $(this).closest('.node-model');
                        var model = super_model.find('.list-images-modeles > li[data-index="'+index+'"]');
                        var link = $(model).find('.field-name-field-model-image a').attr('href');

                        super_model.find('.view-more a, .about-link').attr('href', link);

                        var model_image = $(model).find('.field-name-field-model-image .field-item').html();
                        var model_sticker = $(model).find('.field-name-field-model-sticker').html();
                        var model_sticker_secondary = $(model).find('.field-name-field-model-sticker-secondary').html();
                        var model_sticker_secondary2 = $(model).find('.sticker-secondary-hidden').html();

                        super_model.find('> .field-name-field-model-image > .field-items > .field-item').fadeOut(300, function(){
                            if($(this).find('.field-name-field-model-sticker-secondary').length){
                                $(this).empty().append(model_image).fadeIn(300);
                                $(this).append(model_sticker_secondary2).fadeIn(300);
                            }
                            else{
                                $(this).empty().append(model_image).fadeIn(300);
                            }
                        });

                        super_model.find('> .field-name-field-model-sticker').fadeOut(300, function(){
                            $(this).empty().append(model_sticker).hide().fadeIn(300);
                        });

                        super_model.find('> .field-name-field-model-sticker-secondary').fadeOut(300, function(){
                            $(this).empty().append(model_sticker_secondary).hide().fadeIn(300);
                        });

                        var model_title = $(model).attr('data-title');
                        if(upselling){
                            super_model.find('> .teaser-infos .field-name-title-field .field-item').fadeOut(300, function(){
                                $(this).empty().append(model_title).fadeIn(300);
                            });
                            super_model.find('> .teaser-infos .field-name-field-model-upselling-title .field-item').fadeOut(300, function(){
                                $(this).empty().append(model_title).fadeIn(300);
                            });
                        }
                        else{
                            super_model.find('> .teaser-infos .field-name-title-field h3').fadeOut(300, function(){
                                $(this).empty().append(model_title).fadeIn(300);
                            });
                        }

                        var model_price = $(model).find('.price-hidden .field-name-field-model-price .price').html();
                        super_model.find('> .teaser-infos .product-price .field-name-field-model-price .price').fadeOut(300, function(){
                            $(this).empty().append(model_price).fadeIn(300);
                        });
                    }
                }
            });

            $('.node-model.node-teaser, .node-model.upselling').on('mouseleave', function() {
                if($(this).find('.close-model').hasClass('on')){
                    $(this).find('.close-model').trigger("click");
                }
            });
        }
    }

    // Animation des liens See Review & Technical Infos
    Drupal.behaviors.anchorSeeReview = {
        attach: function () {
            $('a[href^="#header-reviews"], a[href^="#technical-infos"]').click(function(evt) {
                scrollToPosition(evt);
            });
        }
    }

    // Animate Social Networks
    Drupal.behaviors.animateSocialNetworks = {
        attach: function (context, settings) {
            if(!$('#kameleon-share-banner .open-close').length) {
                $('#kameleon-share-banner').append('<li class="open-close"></li>');
            }
            if($('#kameleon-share-banner').attr('data-time') == '0') {
                $('#kameleon-share-banner').removeClass('open');
                $('#kameleon-share-banner').addClass('close');
            }
            else if($('#kameleon-share-banner').attr('data-time') == '-1') {
                $('#kameleon-share-banner').removeClass('close');
                $('#kameleon-share-banner').addClass('open');
            }
            else {
                $('#kameleon-share-banner').removeClass('open');
                $('#kameleon-share-banner').addClass('open');
                setTimeout(function() {
                    $('#kameleon-share-banner').removeClass('open');
                    $('#kameleon-share-banner').addClass('close');
                }, $('#kameleon-share-banner').attr('data-time')*1000);

            }

             $('#kameleon-share-banner .qrcode').click(function() {
                if($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    $(this).addClass('no-active');
                }
                else {
                    $(this).removeClass('no-active');
                    $(this).addClass('active');
                }
            });

            $('#kameleon-share-banner .open-close').click(function() {
                if($(this).parent().hasClass('close')) {
                    $(this).parent().removeClass('close');
                    $(this).parent().addClass('open');
                }
                else {
                    $(this).parent().removeClass('open');
                    $(this).parent().addClass('close');
                }
            });
        }
    }

    // Repositionner les contenus de hotspots
    Drupal.behaviors.repositionHotspots = {
        attach: function() {
            $('.field-collection-item-field-brick-media-hotspot').each(function() {
                var top = 0;
                var left = 0;

                if ($(this).attr('data-left')) {
                    top = 50;
                    left = $(this).attr('data-left');
                }
                else {
                    var last_char_left = this.style.left.substr(this.style.left.length - 1);
                    var last_char_top = this.style.top.substr(this.style.top.length - 1);

                    if (this.style.left) {
                        if (last_char_left != '%') {
                            left = Math.round(100 / $(this).parents('.hotspot').width() * parseInt(this.style.left));
                        }
                        else {
                            left = parseInt(this.style.left);
                        }
                    }

                    if (this.style.top) {
                        if (last_char_top != '%') {
                            top = Math.round(100 / $(this).parents('.hotspot').prev('.container-media').height() * parseInt(this.style.top));
                        }
                        else {
                            top = parseInt(this.style.top);
                        }
                    }
                }

                if (left > 50) {
                    $(this).find('.hotspot-content').addClass('right');
                }
                if (top < 25) {
                    $(this).find('.hotspot-content').addClass('top');
                }
                else if (top > 75) {
                    $(this).find('.hotspot-content').addClass('bottom');
                }
            });
        }
    }

    $(document).ready(function() {

        $('.section-header .zone-menu-wrapper #region-menu > .region-inner nav .block .block-inner > .content > ul.menu > li').each(function () {
            var submenu_without_children = true;
            $(this).find('> .entity-menu-fields > .content > .field_menu_top > ul > li').each(function () {
                if ($(this).find('.menu').length > 0) {
                    submenu_without_children = false;
                }
            });
            if (!submenu_without_children) {
                $(this).addClass('children-level2-exists');
            }
        });

        $('body').addClass('notouch');
        if (is_touch_device()) {
            $('body').toggleClass('notouch touch');
            $('#region-menu .content > .menu > .expanded > a, #region-menu .content > .menu > .expanded > span').each(function() {
                $(this).click(function() {
                    if($(this).parent().hasClass('open')) {
                        $('#region-menu .content > .menu > .expanded').removeClass('open');
                    } else {
                        $('#region-menu .content > .menu > .expanded').removeClass('open');
                        $(this).parent().addClass('open');
                    }
                    event.preventDefault();
                });
            });

            $('.block-kameleon-language-switcher .content').on('click touch', function() {
                $(this).find('ul.flags-toggler').toggleClass('open');
            });
        }
    });

    // Add touch accessibility for rangeSlider & menu
    !function(a){function f(a,b){if(!(a.originalEvent.touches.length>1) && a.ui == undefined ){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch && a.ui != undefined){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

})(jQuery);
;
/************************************************************************
*************************************************************************
@Name :       	Selectyze - jQuery Plugin
@Revison :    	1.2
@Date : 		25/01/2011
@Author:     	Mickael SURREL - ALPIXEL Agency - (www.myjqueryplugins.com - www.alpixel.fr) 
@Contributor on github :     	CSÉCSY László (www.kybest.hu)
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php
 
**************************************************************************
*************************************************************************/
(function($) {
	$.fn.Selectyze = function(opt) {
		var defaults = {
			theme:'css3',
			effectOpen : 'slide',
			effectClose : 'slide',
			preventClose : false
		}; 


		if(this.length)
		return this.each(function() {

			/** vars **/
			var 
				opts = $.extend(defaults, opt),
				$this = $(this),
				optionselected = $this.find('option').filter(':selected'),
				DivSelect = $('<div>', {'class' : 'DivSelectyze '+opts.theme+''}),
				UlSelect = $('<ul>',{'class':'UlSelectize'}),
				liHtml = '';

			zIndex = 9999;

			/** DOM construction && manipulation **/
			constructList($this);
			$this.hide();
			$this.after(DivSelect);
			DivSelect.html('<a href="#" rel="'+optionselected.val()+'" class="selectyzeValue">'+optionselected.text()+'</a>');

			UlSelect.appendTo(DivSelect).html(liHtml);
			$('.DivSelectyze').each(function(i,el){
				$(this).css('z-index',zIndex);
				zIndex -= 10;
			});

			/** Actions **/
			n=false;
			DivSelect.mouseenter(function() {n =false;}).mouseleave(function() {n = true;});

			DivSelect.find('a.selectyzeValue').click(function(e){
				e.preventDefault();
				closeList($('ul.UlSelectize').not($(this).next()));
				openList($(this).next('ul.UlSelectize'));
			});

			UlSelect.find('a').click(function(e){
				e.preventDefault();
				DivSelect.find('a.selectyzeValue').text($(this).text());
				$this.val($(this).attr('rel'));           
				$this.trigger('change');         
				if (!opts.preventClose) {
					closeList($this.next().find('.UlSelectize'));
				}
			});

			$(document).click(function(e){if(n) closeList($('.UlSelectize').not(':hidden'));});

			/** Construct HTML list ul/li **/
			function constructList(el){
				/** Creat list content **/
				if(el.has('optgroup').length)
				{
					el.find('optgroup').each(function(i,el){
						liHtml += '<li><span class="optgroupTitle">'+$(this).attr('label')+'</span><ul>';
						$(this).children().each(function(i,el){
							liHtml += '<li><a rel="'+$(this).val()+'" href="#">'+$(this).text()+'</a></li>';
						});
						liHtml += '</ul></li>';
					});
				}
				else
				{
					el.find('option').each(function(i,el){
						liHtml += '<li><a rel="'+$(this).val()+'" href="#">'+$(this).text()+'</a></li>';
					});
				}
			}

			/** Effect Open list **/
			function openList(el) {
				switch (opts.effectOpen) {
					case 'slide' :
						if(!el.is(':hidden')) el.stop(true,true).slideUp('fast');	
						else el.stop(true,true).slideDown('fast');	
					break;
					case 'fade':
						if(!el.is(':hidden')) el.stop(true,true).fadeOut('fast');	
						else el.stop(true,true).fadeIn('fast');	
					break;
					default :
						if(!el.is(':hidden')) el.stop(true,true).hide();	
						else el.stop(true,true).show();	
				}
			}

			/** Effect Close list **/
			function closeList(el) {
				switch (opts.effectClose) {
					case 'slide' :
						el.stop(true,true).slideUp('fast');
					break;
					case 'fade':
						el.stop(true,true).fadeOut('fast');
					break;
					default :
						el.hide();	
				}
			}

		});
	}
})(jQuery);;
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});;
jQuery(function($) {
    var reviewPageElement, reviewPageNumber, reviews, panel, displayNumberReview = 4, slider, currentPage, currentPageIndex = 1;

    /**
     * Permet de scroller a un index defini
     * @param evt
     */
    function scrollToPosition(evt) {
        evt.preventDefault();
        var target = $(evt.currentTarget).attr('href');
        var wrapper = $('#zone-menu-wrapper');
        var fixedHeader = wrapper.css('position') === 'fixed';
        var headerHeight = fixedHeader ? wrapper.height() : 0;
        $('html, body').animate({scrollTop: $(target).offset().top - headerHeight - 20}, 600);
    }

    /**
     * Gère le clique sur les boutons de menu
     * @param e les evenements à prevenir
     * @param linkToHighLight le lien à activer
     * @param selectorToFadeIn le selecteur du conteneur à afficher
     * @param selectorToFadeOut le selecteur du conteneur à cacher
     * @returns {boolean}
     */
    function tpLinkClick(e, linkToHighLight, selectorToFadeIn, selectorToFadeOut) {
        e.preventDefault();
        $('main.training-plan .link-list a').removeClass('active');
        $(linkToHighLight).addClass('active');
        $(selectorToFadeOut).stop().fadeOut(300, function() {
            $(selectorToFadeIn).stop().fadeIn(300, function () {
                slider.slick('setPosition');
            });
        });
        return false;
    }

    /**
     * Permet d'aller a l'index de page sélectionné pour les reviews
     * @param index
     */
    function tpPaginationReviewGoToIndex(index) {
        currentPage = $('main.training-plan .container-reviews > .pagination > ul > li.active');
        currentPageIndex = index;
        if(index >= 0 && index < reviewPageNumber) {
            currentPage.removeClass('active');
            $('main.training-plan .container-reviews > .pagination > ul > li').eq(index).addClass('active');
            displayReviewPage(index);
        }
    }

    /**
     * Permet d'afficher ou de cacher les index de pages si leur nombre est trop important
     */
    function hideReviewsPagination(){
        if (reviewPageNumber > 10) {
            $('main.training-plan .container-reviews > .pagination > ul > li').each(function (index) {
                $(this).removeClass("dotted");
                $(this).addClass("hidden");

                //Si on est a la 4ème page ou plus, on affiche les points après le 1
                if (index === 0 && currentPageIndex > 2) {
                    $(this).addClass("dotted after");
                }

                //Si on est pas dans les 3 dernières page, on affiche les points avant la dernière page
                if (index === reviewPageNumber - 1 && currentPageIndex < reviewPageNumber - 3) {
                    $(this).addClass("dotted before");
                }

                if (currentPageIndex < 3 && index < 5) {
                    $(this).removeClass("hidden");
                }
                else if (currentPageIndex > reviewPageNumber - 4 && index > reviewPageNumber - 6) {
                    $(this).removeClass("hidden");
                }
                else if (index === 0
                    || (index >= currentPageIndex - 2 && index <= currentPageIndex + 2)
                    || index === reviewPageNumber - 1) {
                    $(this).removeClass("hidden");
                }
            });

            if (currentPageIndex === 0) {
                $('main.training-plan .container-reviews > .pagination > .previous').hide();
            }
            else {
                $('main.training-plan .container-reviews > .pagination > .previous').show();
            }

            if (currentPageIndex === reviewPageNumber - 1) {
                $('main.training-plan .container-reviews > .pagination > .next').hide();
            }
            else {
                $('main.training-plan .container-reviews > .pagination > .next').show();
            }
        }
    }

    /**
     * Permet d'afficher une page review en particulier
     * @param page (l'index de la page)
     */
    function displayReviewPage(page){
        reviews.hide();
        delay = 100;
        reviews.slice(page*displayNumberReview, page*displayNumberReview + displayNumberReview).each(function(){
            //Affichage de l'element a afficher avec une opacité 0
            $(this).css({'display':'block', 'opacity':'0'});
            //Passage à une opacité 1 avec un temps d'affichage (400) et un delay pour décaller l'affichage des review
            $(this).delay(delay).animate({opacity: '1'}, 400);
            delay += 100;
        });
        //Mise à jour de la pagination
        hideReviewsPagination();
    }

    $(document).ready(function() {
        if($('main.training-plan').length > 0) {
            //Clique sur un menu semaine
            $('main.training-plan .menu-week-tp a, main.training-plan #tp-user-reviews-link').on('click', function(evt) {
                scrollToPosition(evt);
            });

            //Clique sur une semaine (accordéon)
            $('main.training-plan .accordion').on('click', function (evt) {
                panel = $(evt.currentTarget).next();
                if(panel.length > 0) {
                    if (panel.is(':hidden')) {
                        panel.slideDown('0.3s');
                        panel.parent().addClass('active');
                    } else {
                        panel.slideUp('0.3s');
                        panel.parent().removeClass('active');
                    }
                }
            });

            //Clique sur le bouton program
            $('main.training-plan #program-link').on('click', function(e){
                return tpLinkClick(e, '#program-link', '.container-program', '.container-advice');
            });

            //Clique sur le bouton conseil
            $('main.training-plan #conseil-link').on('click', function(e) {
                return tpLinkClick(e, '#conseil-link', '.container-advice', '.container-program');
            });

            //Initialisation des reviews
            reviews = $('main.training-plan .container-reviews > .container-review');
            if(reviews.length > 0) {
                reviews.each(function () {
                    if ($(this).index() >= displayNumberReview) {
                        $(this).hide();
                    }
                });
            }

            //Ajout de la pagination au DOM
            reviewPageNumber = Math.ceil(reviews.length / displayNumberReview);
            if(reviewPageNumber > 1) {
                $('.container-reviews > .pagination').addClass("visible");
                for(var j = 1; j <= reviewPageNumber; j++){
                    $('.container-reviews > .pagination > ul').append("<li>"+ j +"</li>");
                }
            }

            //Init Pagination Review
            hideReviewsPagination();
            $('main.training-plan .container-reviews > .pagination > .previous').hide();
            reviewPageElement = $('main.training-plan .container-reviews > .pagination > ul > li');
            reviewPageElement.first().addClass('active');

            //[Pagination Review] Click element pagination
            reviewPageElement.on('click', function () {
                if(!$(this).hasClass('active')) {
                    tpPaginationReviewGoToIndex($(this).index());
                }
            });

            //[Pagination Review] Click button previous
            $('main.training-plan .container-reviews > .pagination > .previous').on('click', function () {
                tpPaginationReviewGoToIndex($('.container-reviews > .pagination > ul > li.active').index()-1);
            });

            //[Pagination Review] Click button next
            $('main.training-plan .container-reviews > .pagination > .next').on('click', function () {
                tpPaginationReviewGoToIndex($('.container-reviews > .pagination > ul > li.active').index()+1);
            });


            //Slider advice
            slider = $('main.training-plan .container-advice .teaser-list');
            if(slider.length > 0) {
                slider.slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 2000,
                });
            }
        }
    });
});;
(function ($) {

    // Replace elements of comment form in the pages-comments... Thx drup
    Drupal.behaviors.formCommentAdvice = {
        attach: function () {
            $('body.page-comment #comment-form').wrap('<div id="comments" class="comment-wrapper"></div>');
            $('body.page-comment-reply .user-rating').after($('body.page-comment-reply #comments'));
        }
    }

    Drupal.behaviors.nabaiji = {
        attach: function () {

            //Custom Handler to manage listing header en footer
            function manageDisplay() {
                if($('.view-smartqueue-regroupement .view-header').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-smartqueue-regroupement .view-header').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-smartqueue-regroupement .view-header').css('width', headerWidth+'px');
                    $('.view-smartqueue-regroupement .view-header').wrapInner("<div class='view-header-wrapper'></div>");
                    $('.view-smartqueue-regroupement .view-header').css({visibility: 'visible'});
                }

                if($('.view-family .header').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-family .header').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-family .header').css('width', headerWidth+'px');
                    $('.view-family .header').wrapInner("<div class='view-header-wrapper'></div>");
                    $('.view-family .header').css({visibility: 'visible'});
                }

                if($('.family .category-reference').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.block-system-main').position();
                    $('.family .category-reference').css('width', windowWidth+'px');
                    $('.family .category-reference').css('left', '-'+headerPosition.left+'px');
                    $('.family .category-reference').wrapInner("<div class='category-referencer-wrapper'></div>");
                    $('.family .category-reference').css({visibility: 'visible'});
                }

                if ($('.view-advice-listing .header').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-advice-listing .header').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-advice-listing .header').css('width', headerWidth+'px');
                    $('.view-advice-listing .header').wrapInner("<div class='view-header-wrapper'></div>");
                    $('.view-advice-listing .header').css({visibility: 'visible'});
                }

                if ($('.view-blog-listing .header').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-blog-listing .header').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-blog-listing .header').css('width', headerWidth+'px');
                    $('.view-blog-listing .header').wrapInner("<div class='view-header-wrapper'></div>");
                    $('.view-blog-listing .header').wrapInner("<div class='views-header-center'></div>");
                    $('.view-blog-listing .header').css({visibility: 'visible'});
                }

                if ($('.view-advice-listing .footer-pager').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-advice-listing .footer-pager').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-advice-listing .footer-pager').css('width', headerWidth+'px');
                    $('.view-advice-listing .footer-pager').wrapInner("<div class='view-footer-pager-wrapperinner'></div>");
                    $('.view-advice-listing .footer-pager').wrapInner("<div class='view-footer-pager-wrapper'></div>");
                    $('.view-advice-listing .footer-pager').css({visibility: 'visible'});
                }

                if ($('.view-blog-listing .footer-pager').length) {
                    var windowWidth = $(window).width();
                    var headerPosition = $('.view-blog-listing .footer-pager').position();
                    var headerWidth = windowWidth - headerPosition.left;
                    $('.view-blog-listing .footer-pager').css('width', headerWidth+'px');
                    $('.view-blog-listing .footer-pager').wrapInner("<div class='view-footer-pager-wrapperinner'></div>");
                    $('.view-blog-listing .footer-pager').wrapInner("<div class='view-footer-pager-wrapper'></div>");
                    $('.view-blog-listing .footer-pager').css({visibility: 'visible'});
                }


                if ($('.page-search .pager-top').length) {
                    $('.page-search .pager-top').wrapInner("<div class='view-header-wrapper'></div>");
                    $('.page-search .pager-top').wrapInner("<div class='views-header-center'></div>");
                    $('.page-search .pager-top').css({visibility: 'visible'});
                }

                if($('.panels-flexible-region-family-banner').length) {
                    var windowWidth = $(window).width();
                    $('.panels-flexible-region-family-banner').css('width', windowWidth+'px');
                    var imagePosition = $('.block-system-main').offset();
                    $('.panels-flexible-region-family-banner').css('left', '-'+imagePosition.left+'px');
                    $('.panels-flexible-region-family-banner .content-family-banner').wrapInner("<div class='banner-picture-wrapper'></div>");
                }


                if($('.field-name-field-contact-banner img').length) {
                    var windowWidth = $(window).width();
                    var imagePosition = $('.block-system-main').offset();
                    $('.field-name-field-contact-banner').css('width', windowWidth+'px');
                    $('.field-name-field-contact-banner').css('left', '-'+imagePosition.left+'px');
                }
            }

            //Manage header listing display
            $(document).ready(manageDisplay);

            //Manage header listing display on windows resoze
            $(window).on('resize', function(e) {

                clearTimeout(window.resizedFinished);
                window.resizedFinished = setTimeout(function () {

                    manageDisplay();

                }, 250);
            });

            if($('.page-search-content .group-result .result').length) {
                $('.page-search-content .group-result .result').each(function() {
                    $(this).wrapInner('<div class="result-wrapper"></div>');
                });
            }

            //Custom handler to convert hxa to rgba
            function hex2rgba(x,a) {
                var r=x.replace('#','').match(/../g),g=[],i;
                for(i in r){g.push(parseInt(r[i],16));}g.push(a);
                return 'rgba('+g.join()+')';
            }


            //Custom global header behavior
            $(document).on('scroll', function() {
                var documentTop = $(this).scrollTop();
                var header = $('#zone-menu-wrapper');

                //Initial step
                if(documentTop == 0 && documentTop < 190) {
                    $(header).removeClass('second-step');
                    $(header).removeClass('first-step');
                    $(header).removeClass('fixed-step');
                    $('body').removeClass('fixed-menu');
                    $('#breadcrumb').removeClass('fixed-step');
                    $('#breadcrumb').removeClass('first-step');
                    $('#breadcrumb').removeClass('second-step');
                }

                //Middle step, use for position
                if(documentTop > 180 && documentTop < 200) {
                    if(!$(header).hasClass('first-step')) {
                        $(header).removeClass('second-step');
                        $(header).removeClass('final-step');
                        $('#breadcrumb').removeClass('second-step');
                        $('#breadcrumb').removeClass('final-step');
                        $(header).addClass('first-step');
                        $(header).addClass('fixed-step');
                        $('#breadcrumb').addClass('fixed-step');
                        $('#breadcrumb').addClass('first-step');
                    }
                    if(!$(header).hasClass('second-step')) {
                        $(header).removeClass('second-step');
                        $(header).removeClass('first-step');
                        $(header).removeClass('fixed-step');
                        $('body').removeClass('fixed-menu');
                        $('#breadcrumb').removeClass('fixed-step');
                        $('#breadcrumb').removeClass('first-step');
                        $('#breadcrumb').removeClass('second-step');
                    }

                }

                //Final step, use for animation
                if(documentTop > 200) {
                    if(!$(header).hasClass('second-step')) {
                        $(header).removeClass('first-step');
                        $('#breadcrumb').removeClass('first-step');
                        $(header).addClass('second-step');
                        $(header).addClass('fixed-step');
                        $('body').addClass('fixed-menu');
                        $('#breadcrumb').addClass('fixed-step');
                        $('#breadcrumb').addClass('second-step');
                    }
                }


                //Search behavior on mini header
                if($('#zone-menu-wrapper').hasClass('second-step')) {

                    $('#block-search-form .form-actions').click(function() {
                        $('#block-search-form').addClass('show');
                        $('#block-search-form .form-item input').addClass('show');
                        $('#block-search-form .form-item input').focus();
                    });


                    //Hide search input when click outside search block
                    $(document).click(function(event) {
                        if(!$(event.target).closest('.block-search-form').length) {
                            if(!$(event.target).closest('.slider_next').length) {
                                if($('.block-search-form').hasClass('show')) {
                                    $('#block-search-form .form-item input').removeClass('show');
                                    $('.block-search-form').removeClass('show');

                                    //Remove autocomplet
                                    if($('#ac_results').length) {
                                        $(this).remove;
                                    }
                                }
                            }

                        }
                    });
                }
            });


            //Manage richcontent wrapper on product page
            $('#rich-content > .field-name-field-rich-content > .field-items > .field-item').each(function() {
                if($(this).find('.richcontent-media-full').length) {
                    $(this).addClass('richcontentmediafull');
                }
            });

            $('#rich-content > .field-name-field-rich-content > .field-items > .field-item').each(function() {
                if($(this).find('.richcontent-videos').length) {
                    $(this).addClass('richcontentvideos');
                }
            });
        }
    }

    $(window).load(function(){

        // Selectyze
        $('.reviews-users-form .DivSelectyze, .reviews-collaborators-form .DivSelectyze, .filter-products .DivSelectyze').addClass('quechua');

        $('#kameleon-contact-form select, #edit-sort-reviews, #edit-sort-by, .commerce-add-to-cart select, .view-commerce-cart-form-custom-kameleon select').once().Selectyze({
           theme : 'quechua'
        });

        $(document).ajaxStart(function(){
            $('.UlSelectize').hide();
        });

        $(document).ajaxComplete(function(){
            $('#edit-sort-reviews, #edit-sort-by, .commerce-add-to-cart select, .view-commerce-cart-form-custom-kameleon select').once().Selectyze({
                theme : 'quechua'
            });
        });

        if(typeof dataLayer != 'undefined') {
            var testValue = 0 in dataLayer;

            var locUrl =  $(location).attr('href');
            if (testValue) {
                var testValue2 = 'varCategoryUrl' in dataLayer[0];
                if (testValue2 && dataLayer[0]['varCategoryUrl'] != "")
                    locUrl = dataLayer[0]['varCategoryUrl'];
            }

            $("ul.menu li a").removeClass('active-trail');
            $("ul.menu li a").removeClass('active');
            $("ul.menu li").removeClass('active-trail');
            $("ul.menu li").removeClass('active');

            $("ul.menu li a[href$='"+ locUrl +"']").addClass("active-trail active");
            $("ul.menu li a[href$='"+ locUrl +"']").parents('li').each(function(){

                $(this).addClass("active-trail active");

            });
        }

    });

}(jQuery));
;
