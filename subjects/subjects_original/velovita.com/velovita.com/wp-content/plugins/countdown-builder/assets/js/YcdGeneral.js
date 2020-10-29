function YcgGeneral() {

}

YcgGeneral.prototype.getSeconds = function (options) {
	var seconds = 0;
	if(options['ycd-countdown-date-type'] == 'dueDate') {
		var val = options['ycd-date-time-picker']+':00';
		val = val.replace(/-/g, '/');
		var selectedTimezone = options['ycd-time-zone'];
		var seconds = this.setCounterTime(val, selectedTimezone);
	}
	else if(options['ycd-countdown-date-type'] == 'schedule') {
		var seconds = YcdCountdownProFunctionality.schedule(options);
	}
	else if(options['ycd-countdown-date-type'] == 'schedule2') {
		var seconds = YcdCountdownProFunctionality.schedule2(options);
	}
	else if(options['ycd-countdown-date-type'] == 'wooCoupon') {
		var val = options['ycd-woo-coupon-date'];
		val.replace('/', '-')+' 00:00:00';
		var selectedTimezone = options['ycd-woo-time-zone'];
		var seconds = this.setCounterTime(val, selectedTimezone);
	}
	else {

		var seconds = this.countDurationSeconds(options);
		if (options['ycd-countdown-save-duration']) {
			if (options['ycd-countdown-save-duration-each-user']) {
				var id = options['id'];
				seconds = YcdCountdownProFunctionality.durationSeconds(seconds, options, id);
			}
			else {
				seconds = options['ycd-timer-seconds'];
			}
		}

		if (options['ycd-countdown-restart']) {
			if (YcdCountdownProFunctionality.checkRestartDuration(options)) {
				seconds = this.countDurationSeconds(options);
			}
		}
	}

	return seconds;
};

YcgGeneral.prototype.countDurationSeconds = function (options) {
	var days = parseInt(options['ycd-countdown-duration-days']);
	var hours = parseInt(options['ycd-countdown-duration-hours']);
	var minutes = parseInt(options['ycd-countdown-duration-minutes']);
	var secondsSaved = parseInt(options['ycd-countdown-duration-seconds']);

	var seconds = days*86400 + hours*60*60 + minutes*60 + secondsSaved;

	return seconds;
};

YcgGeneral.prototype.endBehavior = function(cd, options) {
	if(YCD_GENERAL_ARGS.isAdmin) {
		return false;
	}
	if (options['ycd-countdown-end-sound']) {
		var soundUrl = options['ycd-countdown-end-sound-url'];
		var song = new Audio (soundUrl);
		song.play();
	}
	var id = parseInt(options['id']);
	var behavior = options['ycd-countdown-expire-behavior'];

	jQuery(window).trigger('YcdExpired', {'id':  id});

	switch (behavior) {
		case 'hideCountdown':
			cd.remove();
			break;
		case 'redirectToURL':
			cd.remove();
			window.location.href = (options['ycd-expire-url']);
			break;
		case 'showText':
			cd.replaceWith(options['ycd-expire-text']);
			break;
	}
};

