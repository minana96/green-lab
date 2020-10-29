jQuery(document).ready(function(){
	if (dataLayer[0].varTetrisType == 'Homepage') {

		// CONSTRUCTION BLOC
		jQuery('head').append('<link rel="stylesheet" id="tpx_style" href="https://decathlon-ttpx.com/de/dequ19/dequ19p6/dist/css/style.css">');
		var wallBloc = '<div id="TPX" style="max-width: 940px;margin:50px auto;overflow:inherit;"><div class="insta-headline"><div class="insta-logo"><img src="https://www.quechua.fr/sites/quechua/files/dequ19p6_wall-instagram_v1_03.jpg" alt="Logo Quechua" width="74" height="74" />Partagez vos randonnées avec #Quechua</div><div class="insta-tag"><a href="https://www.instagram.com/quechua/" target="_blank">Instagram</a></div></div><div class="insta-grid" id="insta-grid"> </div><div class="insta-overlay"><div class="insta-picture"><script async src="https://www.instagram.com/embed.js"/></div><div class="insta-controls"><button class="insta-prev">Précédent</button><button class="insta-next">Suivant</button><button class="insta-close">Fermer</button></div></div></div>';
		jQuery(wallBloc).insertAfter('#block-system-main');

		// SCRIPT MUR INSTAGRAM
		jQuery('#insta-grid').empty();
		jQuery('.insta-prev').click(function(){
			if (!jQuery('.insta-item.current').is(jQuery('.insta-item:first'))) {
				jQuery('.insta-item.current').removeClass('current').prev().find('a').trigger('click');
			}
			itemPos();
		});

		jQuery('.insta-more').click(function(){
			getLastPosts();
		});
		jQuery('.insta-next').click(function(){
			if (!jQuery('.insta-item.current').is(jQuery('.insta-item:last'))) {
				jQuery('.insta-item.current').removeClass('current').next().find('a').trigger('click');
			}
			itemPos();
		});
		function createImg(idInsta) {
			jQuery('.insta-picture blockquote').remove();
			jQuery('.insta-picture iframe').remove();
			var quote = '<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/'+idInsta+'/?utm_source=ig_embed&amp;utm_medium=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:calc(100% - 60px); padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/'+idInsta+'/?utm_source=ig_embed&amp;utm_medium=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div><div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> Voir cette publication sur Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div></a></div></blockquote>';
			jQuery('.insta-picture').prepend(quote);
			window.instgrm.Embeds.process();
		}

		function showOverlayInsta() {
			jQuery('.insta-overlay').addClass('reveal').on('click', function(e){
				if ((jQuery(e.target).hasClass('insta-overlay'))||(jQuery(e.target).hasClass('insta-close'))) {
					hideOverlayInsta();
				}
			});
		}

		function hideOverlayInsta() {
			jQuery('.insta-picture iframe').remove();
			jQuery('.insta-overlay').removeClass('reveal').off('click');
			jQuery('.insta-item.current').removeClass('current');
		}

		function itemPos() {
			if (jQuery('.insta-item.current').is(jQuery('.insta-item:first'))) {
				jQuery('.insta-prev').hide();
			} else {
				jQuery('.insta-prev').show();
			}
			if (jQuery('.insta-item.current').is(jQuery('.insta-item:last'))) {
				jQuery('.insta-next').hide();
			} else {
				jQuery('.insta-next').show();
			}
		}


		// Loading
		jQuery('.insta-bt').click(function(){
			jQuery(this).closest('.insta-more').addClass('insta-loading');
		});


		jQuery(function(){

			jQuery('#insta-grid').on('click','.insta-item a',function(e){
				e.preventDefault();
				var idInsta = jQuery(this).attr('data-ref');
				createImg(idInsta);
				showOverlayInsta();
				jQuery(this).parent().addClass('current');
				itemPos();
			});
			
			getLastPosts();
		})

		function getLastPosts(){
			jQuery.ajax({
				url : 'https://www.decathlon-ttpx.com/de/dequ19/dequ19p6/ajax/post.php',
				type : 'POST',
				dataType : 'json',
				data : { "action":"get_posts", "cursor_end": jQuery('#cursor_end').val() },
				success : function(retour){
					if(retour && retour.result){
						jQuery(retour.datas.posts).each(function(a,b){
							renderPost(b);
						});
						
						if(retour.datas.has_next_page){
							jQuery('#cursor_end').val(retour.datas.cursor_end);
							jQuery('.insta-more').removeClass('insta-loading').show();
						}else{
							jQuery('.insta-more').hide();
						}
					}
				}
			});
		}

		function renderPost(val){
			jQuery('#insta-grid').append(jQuery('<div class="insta-item"><a href="https://www.instagram.com/p/'+val.hashtag+'/" data-ref="'+val.hashtag+'" style="background-image:url('+val.img_src+');"></a></div>'));
			instaHeight();
		}

		function instaHeight() {
			var instaWidth = jQuery('.insta-item:first').width();
			jQuery('.insta-item').each(function(){
				jQuery(this).find('a').css({'height':instaWidth});
			});
		}

		jQuery(window).resize(function(){
			instaHeight();
		});
		

		// TRADUCTION ANGLAISE
		if (window.location.hostname == 'www.quechua.co.uk') {
			
			if (jQuery('.insta-logo').length > 0) {
				var instaLogo = jQuery('.insta-logo');
				var htmlTitle = instaLogo.html();
				var frText = instaLogo.text();
				htmlTitle = htmlTitle.replace(frText,'Share your hikes with #Quechua');
				instaLogo.html(htmlTitle);
			}
			
		}

	}

	// Shortcode liens tetris page
	// ex : [lien href="" text="" target="" color=""]
	jQuery('.field-name-field-tetris-bricks p').each(function(){
		var lien = jQuery(this).text().split('[lien ');
		if (lien.length > 1) {
			for (var i=1;i<lien.length;i++) {
				var shortCode = lien[i].split(']')[0];
				var datas = shortCode.split('"');
				var url, text, target,color = '';
				for (var j=0;j<datas.length;j++) {
					datas[j].trim();
					if ((datas[j].includes('href='))&&(datas[j+1])) {
						url = datas[j+1];
					}
					if ((datas[j].includes('text='))&&(datas[j+1])) {
						text = datas[j+1];
					}
					if ((datas[j].includes('target='))&&(datas[j+1])) {
						target = datas[j+1];
					}
					if ((datas[j].includes('color='))&&(datas[j+1])) {
						color = datas[j+1];
					}
				}
				if ((url!='')&&(text!='')) {
					var link = '<a href="'+url+'" target="'+target+'" style="color:'+color+';">'+text+'</a>';
					var newText = jQuery(this).html().replace('[lien '+shortCode+']',link);
					jQuery(this).html(newText);
				}
			}
		}
		var oblique = jQuery(this).text().split('[oblique ');
		if (oblique.length > 1) {
			for (var i=1;i<oblique.length;i++) {
				var shortCode = oblique[i].split(']')[0];
				var datas = shortCode.split('"');
				var color = '';
				for (var j=0;j<datas.length;j++) {
					datas[j].trim();
					if ((datas[j].includes('color='))&&(datas[j+1])) {
						color = datas[j+1];
					}
				}
				if (color!='') {
					var oblique = '<span class="span-oblique" style="background-color: '+color+';">&nbsp;</span>';
					jQuery(this).closest('.node-brick').addClass('bg-oblique').prepend(oblique);
					var removeShortCode = jQuery(this).html().replace('[oblique '+shortCode+']','');
					jQuery(this).html(removeShortCode);
				}
			}
		}
	});


	jQuery('.field-links a').each(function(){
		var link = jQuery(this)
		var text = link.text();
		if (text[0] === '[') {
			var list = link.closest('.field-links');
			var blocClass = text.replace('[','').replace(']','');
			link.closest('.node-brick').addClass(blocClass);
			link.parent('.field-item').remove();
			if (jQuery('.field-item',list).length < 1) {
				list.parent('.links').remove();
			}
		}
	});

});