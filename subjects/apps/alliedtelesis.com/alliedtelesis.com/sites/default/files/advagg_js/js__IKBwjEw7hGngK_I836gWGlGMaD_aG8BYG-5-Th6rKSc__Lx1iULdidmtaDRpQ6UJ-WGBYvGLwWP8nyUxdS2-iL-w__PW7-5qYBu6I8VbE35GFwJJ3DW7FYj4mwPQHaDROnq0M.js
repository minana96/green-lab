jQuery('document').ready(function(){
	var nowTs = Date.now();
	jQuery('.view-display-id-featured_posts .view-content > div').each(function(k,o){ 
		var updatedTs = jQuery('.timestamp',o).html(); 
		var daysSince = (Date.now() -  Date.parse(updatedTs)) / (1000 * 3600 * 24);
		if (daysSince < 14) {
			jQuery(o).addClass('new-post');
		}
	});
});

;/*})'"*/
;/*})'"*/
