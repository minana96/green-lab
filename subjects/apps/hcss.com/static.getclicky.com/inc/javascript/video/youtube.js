
// we're storing each youtube object (video) in an array, and passing the array key into the class, so the class instance can refer to itself externally
// this is necessary for two reasons
// first, the event listener function we pass to Youtube has to be globally accessible, so passing "this.blah" doesn't work
// it has to be passed as a string also, so putting "this" in quotes makes it lose its special meaning
// second, when we create timeout functions, the meaning of "this" inside that function loses its scope, so we have to refer to the class externally from there too.


// _yt is the global youtube array that stores each youtube object. yti is the array key, incremented automatically for each new object created
// 2012-02-13 can't use non alphanumeric characters anymore so we need to choose a new unique name without underscores
// used to be _yt, we'll change to yoobtoob
var yoobtoob = [], _yti = 0;

// this is the function the youtube player calls once it's loaded. 
// each time it's called, it creates a new object in the global array, and passes the array key into the class so the class can refer to itself externally
function onYouTubePlayerReady( id ) {
	_yti++;
	yoobtoob[ 'yt'+_yti ] = new _yto( id, _yti );
}



// iFrame stuff
var videoArray = new Array();
var playerArray = new Array();

// This function is called when the YouTube iFrame API is loaded.
function onYouTubeIframeAPIReady() {
	for (var i = 0; i < videoArray.length; i++) {
		playerArray[i] = new YT.Player(videoArray[i], {
			events: {
				'onReady': onPlayerReady,
				'onStateChange': yoobtoob['yt' + i].onPlayerStateChange
			}
		});
	}
}


function onPlayerReady(event) {
	// This line intentionally left blank.
}


function _yto( id, i, is_iframe ) {
	
	if (typeof id == "undefined")
		return;

	if (typeof i == "undefined")
		return;

	this.pos = i;
	
	// 2012-02-13 youtube borked their API so no special chars are allowed in the string we pass to 'onStateChange', so we have to rework this a vit
	// first, change it so video ID is no longer numeric so we can call it like.this instead of like[this] since []'s are no longer allowed
	i = 'yt'+i;
	
	this.id = id;
	this.mytime;
	this.scrubTimer;
	this.startTimer;
	this.last = 'none';
	this.scrubbing = false;
	this.is_iframe = (is_iframe != undefined) ? is_iframe : false;

	// seek_count is used to try to figure out if this is a seek or not
	//
	// YT changed their API so that seeks can no longer be divined from PAUSE
	// events, but we may still be able to do it from the following pattern:
	//
	// BUFFERING -> PLAYING -> BUFFERING -> PLAYING
	//
	// It's cleared every time there's a PAUSE event, or seek_count crests
	// above 4
	//
	this.seek_count = 0;
	this.is_initially_buffered = false;
	
	this.o = document.getElementById( this.id );
	
	var _ref = this;

	if (! is_iframe)
		this.o.addEventListener("onStateChange", "yoobtoob."+i+".onPlayerStateChange" ); // have to pass as string because of horrible youtube API
	
	this.onPlayerStateChange = function( newState ) {
		
		// _ref is ``this'' for older, explicit YouTube tracking, but becomes
		// the relevant yoobtoob entry in the case of
		// newer/IFRAME/auto-tracking... geeeh.
		// var _ref = this;
		
		
		if ( _ref.is_iframe && typeof newState == "object")
		{
			var s;
			for (s = 0; s < playerArray.length; s++)
			{
				if (playerArray[s] == newState.target)
					_ref = yoobtoob['yt' + s];
			}
		}

		// some events rely on a timer to determine what action was performed, we clear it on every state change.
		if( _ref.myTime != undefined ) clearTimeout( _ref.myTime );
		
		// pause - happens when clicking pause, and we can now log this event
		// straightaway (since seeking is no longer 'guessed at' from PAUSE
		// events
		if( newState == '2' || ( _ref.is_iframe && newState.data == YT.PlayerState.PAUSED )) {
			yoobtoob[i].videoLog('pause');
			yoobtoob[i].last = 'pause';
			yoobtoob[i].scrubbing = false;
		}

		// buffer/seek - happens when passively buffering, or seeking
		// that's why a timeout is used, so if we're seeking, once it starts playing again, we log it as a seek and kill the timer that would have logged the pause
		// we're only giving it 2 seconds to start playing again though. that should be enough for most users.
		// if we happen to log a pause during the seek - so be it.
		else if( newState == '3' || ( _ref.is_iframe && newState.data == YT.PlayerState.BUFFERING )) {
			if (! yoobtoob[i].is_initially_buffered)
			{
				yoobtoob[i].is_initially_buffered = true;
				return;
			}

			yoobtoob[i].seek_count++;

			if (yoobtoob[i].seek_count > 4)
				yoobtoob[i].seek_count = 0;
			else
				_ref.last = 'pre-scrub';
		}
		
		// play
		else if( newState == '1' || ( _ref.is_iframe && newState.data == YT.PlayerState.PLAYING )) {
			
			switch( _ref.last ) {
				
				case 'none':
					_ref.killTimers();
					_ref.startTimer = setInterval( _ref.startRun, 200 );
					break;
				
				case 'pause':
					// i dont think we need a timeout here?
					//_ref.myTime = setTimeout( function() {
						yoobtoob[i].videoLog('play');
						yoobtoob[i].last = 'play';
					//}, 2000 );
					break;
				
				case 'pre-scrub':
					yoobtoob[i].seek_count++;

					if (yoobtoob[i].seek_count > 4)
					{
						yoobtoob[i].seek_count = 0;
						break;
					}

					if (4 === yoobtoob[i].seek_count)
					{
						_ref.last = 'pre-scrub';
						_ref.scrubbing = true;
						_ref.killTimers();
						_ref.scrubTimer = setInterval( _ref.scrubRun, 2000 ); // give it a second to buffer
						break;
					}

					break;
			}
		}
		
		// end
		else if( newState == '0' || ( _ref.is_iframe && newState.data == YT.PlayerState.ENDED )) {
			_ref.last = 'none';
			_ref.videoLog('end');
		}
	}
	
	
	// have to use external calls here because these are set as timeouts, which makes "this" change context (apparently)
	this.scrubRun = function() {
		yoobtoob[i].videoLog('seek');
		yoobtoob[i].killTimers();
		yoobtoob[i].last = 'scrub';
		yoobtoob[i].scrubbing = false;
	}

	this.startRun = function() {
		yoobtoob[i].videoLog('play');
		yoobtoob[i].killTimers();
		yoobtoob[i].last = 'start';
	}

	this.killTimers = function() {
		if( this.startTimer ) {
			clearInterval( this.startTimer );
			this.startTimer = null;
		}
		if( this.scrubTimer ){
			clearInterval( this.scrubTimer );
			this.scrubTimer = null;
		}
	}
	
	
	
	this.videoLog = function( action ) {
		if( window._genericStats ) _genericStats.video( action, this.videoTime(), this.videoURL(), this.videoTitle());
	}
	
	this.videoTime = function() {
		return Math.round( (this.is_iframe) ? playerArray[this.pos].getCurrentTime() : this.o.getCurrentTime() );
	}
	
	this.videoURL = function() {
		// can. not. believe. javascript doesn't have something like this built in.
		var url = (this.is_iframe) ? playerArray[this.pos].getVideoUrl() : this.o.getVideoUrl();
		var parts = url.split('?');
		var url_new = parts[0];
		var params = parts[1].split('&');
		for( var i = 0; i < params.length; i++ ) {
			if( params[i].match(/^v=/)) {
				url_new += '?' + params[i];
				return url_new;
			}
		}
		return url_new;
	}
	
	this.videoTitle = function() {
		// titles have to be defined in an external object
		if( window._ytmeta && _ytmeta[ this.id ] ) return _ytmeta[ this.id ].title || '';
	}
}





// The following was inspired heavily by:
// http://www.lunametrics.com/blog/2012/10/22/automatically-track-youtube-videos-events-google-analytics/
if (window.jQuery)
{
	// Inject YouTube IFRAME API stuff
	var tag = document.createElement('script');
	tag.src = "//www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	(function($) {
	 	function trackYouTube()
		{
			var i = 0;
			jQuery('iframe').each(function() {
				var video, vidSrc, regex, matches;

				video	= $(this);
				vidSrc	= video.attr('src');

				if (! vidSrc)
					// try to accommodate "deferred videos" users
					vidSrc = video.data('src');

				if (! vidSrc)
					return;

				regex	= /(https?\:)?\/\/www\.youtube\.com\/embed\/([\w-]{11})(?:\?.*)?/;
				matches	= vidSrc.match(regex);

				if (matches && matches[2])
				{
					var identifier = matches[2];

					if (! $(this).attr('id'))
						$(this).attr('id', matches[2]);
					else
						identifier = $(this).attr('id');

					videoArray[i] = identifier;

					yoobtoob['yt' + _yti] = new _yto($(this).attr('id'), _yti, true);
					_yti++;
					i++;

					/*
					 * Lastly, if iframe.src does not have enablejsapi=1 GET
					 * parameter, then let's go ahead and add it for the user.
					 */
					if (matches[0].indexOf('enablejsapi=1') < 0)
					{
						/*
						 * Rudimentary GET-append
						 *
						 * If a question mark doesn't exist in the iframe.src,
						 * then add one and give the only GET parameter as
						 * enablejsapi=1.
						 *
						 * Otherwise, a question mark exists; append
						 * additional GET parameter enablejsapi=1.
						 */
						if (matches[0].indexOf('?') < 0)
							video.attr('src', vidSrc + '?enablejsapi=1');
						else
							video.attr('src', vidSrc + '&enablejsapi=1');
					}
				}
			});
		}
		$(document).ready(function() {
			trackYouTube();
		});
	})(jQuery);
}




