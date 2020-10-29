jQuery(document).ready(function($) {
	var wor_animate = words.animation;
	var new1class = words.newclass;
	if (words.speed=='') {
		words.speed = '1200';
	}
	
	$(".demo .rotate").textrotator({
        animation: words.animation,
        speed: words.speed,
        separator: ",",
    });
	
	
});