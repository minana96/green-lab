/*!
 * WP Googel Analytics Events | v2.2.8
 * Copyright (c) 2013 PineWise Ltd. (@yuvalo)
 * License: GPLv2 */

/*jslint indent: 4 */
/*global $, jQuery, document, window, _gaq, ga, wp_flow, YT,__gaTracker*/

var scroll_events = (function ($) {
    "use strict";
    var scroll_elements = [];
    var click_elements = [];
    var link_click_delay = false;
    var universal = 0;
    var advancedmode = 0;
    var gtm = 0;
    var gst = 0;
    var page = '';
    var nofollowelem = '';
    var nofollow_links = [];
    var nofollow_selectors = [];
    var link_track = {
        "track": '',
        "type": 'all',
        "link_class": ''
      };
    var youtube_videos = {};
    var youtube_video_instances = [];

    var vimeo_videos = {};
    var vimeo_video_instances = [];

    var videoChecked = false;
    var ga_element;


    var track_event = function (category, action, label, bounce, universal, evalue) {
        if (typeof ga_element === "undefined") {
            if (typeof ga !== 'undefined') {
                ga_element = ga;
            } else if (typeof _gaq !== 'undefined') {
                ga_element = _gaq;
            } else if (typeof __gaTracker === "function") {
                ga_element = __gaTracker;
            } else if (typeof gaplusu === "function") {
                ga_element = gaplusu;
            } else if (!gtm && !gst){
                return;
            }
        }

        var event_category = !category ? '' : category;
        category = event_category;

        var event_action = !action ? '' : action;
        action = event_action;

        var event_label = !label ? '' : label;
        label = event_label;

        var event_value = !evalue ? '' : evalue;
        var event_bounce = !bounce ? false : bounce;

        if (gtm) {
            dataLayer.push({
                'event' : 'WPGAE',
                'eventCategory' : category,
                'eventAction' : action,
                'eventLabel' : label,
                'eventValue' : event_value,
                'nonInteraction': event_bounce
            });
        }
        else if (gst) {
            gtag('event', action, {
                // Event parameters
                'event_category': category,
                'event_label': label,
                'value': event_value,
                'non_interaction': event_bounce
            });
        }
        else if (universal) {
            if (event_value) {
                ga_element('send', 'event', category, action, label, event_value, {'nonInteraction': event_bounce});
            } else {
                ga_element('send', 'event', category, action, label, {'nonInteraction': event_bounce});
            }
        } else {
            ga_element.push(['_trackEvent', category, action, label, event_value, event_bounce]);
        }
    };

    var replace_with = function (el, search, updated) {
        return el.replace(search, updated);
    };

    // replace placeholder with actual values
    var get_placeholder = function (self, placeholder) {
        var el = placeholder;

        var lel = '';
        if (el.indexOf('$$PAGENAME$$') > -1) {
            if (true === wp_flow.wp_flow_placeholders.is_front_page) {
                el = replace_with(el, "$$PAGENAME$$", "Home page");
            } else {
                el = replace_with(el, "$$PAGENAME$$", wp_flow.wp_flow_placeholders.page_title);
            }
        }

        if (el.indexOf('$$ATTR_HREF$$') > -1) {
            lel = $(this).attr("href");
            if (typeof lel === "undefined") {
                lel = $(self).attr("href");
            }
            el = replace_with(el, "$$ATTR_HREF$$", lel);
        }

        if (el.indexOf('$$ATTR_TITLE$$') > -1) {
            lel = $(this).attr("title");
            if (typeof lel === "undefined") {
                lel = $(self).attr("title");
            }
            el = replace_with(el, "$$ATTR_TITLE$$", lel);
        }

        if (el.indexOf('$$ATTR_ALT$$') > -1) {
            lel = $(this).attr("alt");
            if (typeof lel === "undefined") {
                lel = $(self).attr("alt");
            }
            el = replace_with(el, "$$ATTR_ALT$$", lel);
        }

        if (el.indexOf('$$ELEMENT_TEXT$$') > -1) {
            el = replace_with(el, "$$ELEMENT_TEXT$$", $(self).text());
        }

        if (el.indexOf('$$AUTHOR$$') > -1) {
            el = replace_with(el, "$$AUTHOR$$", wp_flow.wp_flow_placeholders.post_author);
        }

        if (el.indexOf('$$ATTR_ID$$') > -1) {
            if (undefined == $(self).attr('id')) {
                lel = '';
            } else {
                lel = $(self).attr('id');
            }
            el = replace_with(el, "$$ATTR_ID$$", lel);
        }

        if (el.indexOf('$$USER$$') > -1) {
            if (0 === wp_flow.wp_flow_placeholders.current_user_id) {
                lel = "Guest";
            } else {
                lel = wp_flow.wp_flow_placeholders.current_user_id;
            }
            el = replace_with(el, "$$USER$$", lel);
        }


        if (el.indexOf('$$PAGE_URL$$') > -1) {
            el = window.location.href;
        }
        return el;

    };

    // click event
    var click_event = function (event) {

        track_event(get_placeholder(this, event.data.category), get_placeholder(this, event.data.action), get_placeholder(this, event.data.label), event.data.bounce, event.data.universal, event.data.evalue, this);

        if (typeof event.data.link_click_delay !== 'undefined' && event.data.link_click_delay > 0 && typeof event.target.href !== 'undefined' && event.target.nodeName == "A") {
            if (! (isNoFollowLink(event.target.href) || 
                    isNoFollowSel(event.data.select) ) ) {
                event.preventDefault();
                var openInNewTab = false;
                if (event.target.target) {
                    if (event.target.target.trim() === "_blank") {
                        openInNewTab = true;
                    }
                }
                var w;
                if (openInNewTab) {
                    w = window.open('', '_blank');
                }

                var hash = isJustHashLink(event);
                if (typeof hash !== "undefined" && hash !== "") {
                    window.location.hash = hash;
                } else {
                    setTimeout(function () {
                        if (openInNewTab) {
                            w.location.href = event.target.href;
                        } else {
                            window.location = event.target.href;
                        }
                    }, link_click_delay);
                }
            }
        }
    };

    var isLinkExternal = function (url) {
        var query = new RegExp("//" + location.host + "($|/)");
        if (url.substring(0, 4) === "http") {
            if (!query.test(url)) {
                return true;
            }
        }
        return false;
    };

    var link_track_external = function (event) {

        var url = getUrl(event);
        if(isLinkExternal(url)){
            link_track_all(event);
        }
    };

    var link_track_external_new_tab = function (event) {
        var url = getUrl(event);
        if(isLinkExternal(url)){
            track_event(page, 'Link', url, false, universal);
        }
    };

    var link_track_all = function (event) {

        var url = getUrl(event);
        track_event(page, 'Link', url, false, universal);
         if (! (isNoFollowLink(event.target.href) || 
                isNoFollowSel('.'+event.currentTarget.className) ||
                isNoFollowSel('#'+event.currentTarget.id)) ) {   
            
            event.preventDefault();
            var hash = isJustHashLink(event);
            if (typeof hash !== "undefined" && hash !== "") {
                window.location.hash = hash;
            } else {
                setTimeout(function () {
                    window.location = url;
                }, link_click_delay);
            }
        }
    };

    var link_track_all_new_tab = function (event) {
        var url = getUrl(event);
        track_event(page, 'Link', url, false, universal);
    };

    var getUrl = function (event) {
        var url = "";
        if (event.target.tagName !== "A") {
            url = $(event.target).parents("a").attr("href");
        } else {
            url = event.target.href;
        }

        return url;
    };


    var isNoFollowLink = function (url) {

        // check if advanced mode is enabled, return false if not
        if (advancedmode === 0) {
            return false;
        }

        //check and remove '/' at the end
        url = removeTrailingSlash(url);

        if (nofollow_links.length > 0 && nofollow_links.indexOf(url) > -1) {
            return true;
        }
        return false;
    };
    
    var isNoFollowSel = function (selector) {

        // check if advanced mode is enabled, return false if not
        if (advancedmode === 0) {
            return false;
        }

        if (nofollow_selectors.length > 0 && nofollow_selectors.indexOf(selector) > -1) {
            return true;
            
        }
        return false;
    };

    var noFollowLinks = function () {
        var links = [];

        if (nofollowelem !== '') {
            var nofollow_arr = nofollowelem.split(',');
            var current = '';
            var elem;

            for (var i = 0; i < nofollow_arr.length; i++) {
                current = nofollow_arr[i];
                if (0 == current.indexOf("http")) {

                    links.push(removeTrailingSlash(current));

                } else if (0 == current.indexOf("id:")) {
                    elem = current.substring(current.indexOf(":") + 1, current.length);
                    var target = $('#' + elem);
                    nofollow_selectors.push('#' + elem);
                    if (target.is("a")) {
                        links.push(removeTrailingSlash(target.attr('href')));
                    }
                } else if (0 == current.indexOf("class:")) {
                    elem = current.substring(current.indexOf(":") + 1, current.length);
                    var target = $('.' + elem);
                    nofollow_selectors.push('.' + elem);
                    if (target.is("a")) {
                        links.push(removeTrailingSlash(target.attr('href')));
                    }
                }
            }

        }

        return links;
    };

    var isElementInViewport = function (elem) {
        var docViewTop = jQuery(window).scrollTop();
        var docViewBottom = docViewTop + jQuery(window).height();

        var elemTop = jQuery(elem).offset().top;
        var elemBottom = elemTop + jQuery(elem).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };

    var isInt = function (value) {
        return !isNaN(value) &&
                parseInt(Number(value)) == value &&
                !isNaN(parseInt(value, 10));
    };

    var unescapeChars = function (text) {
        var map = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            '\"': '"',
            '&#039;': "'"
        };
        return text.replace(/&lt;|&gt;|&quot;|'&#039;/gi, function (m) {
            return map[m];
        });
    };

    var removeTrailingSlash = function (url) {
        //check and remove '/' at the end
        var l = url.length - 1;
        if (url.lastIndexOf('/') === l) {
            url = url.substring(0, l);
        }
        return url;
    };

    var isJustHashLink = function (event) {
        var url = "";
        if (event.target.tagName !== "A") {
            url = $(event.target).parents("a").attr("href");
        } else {
            url = $(event.target).attr("href");
        }
        if (url.indexOf("#") === 0) {
            return url;
        }
        return "";
    };
    // parameter: time (time in seconds)
    var printTime = function (time) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    };

    var onPlayerReady = function () {

    };

    // youtube video player
    function onPlayerStateChange(event) {

        var videoData = event.target.getVideoData();
        var iframe = event.target.getIframe();
        if (event.data === YT.PlayerState.PLAYING) {
            if (youtube_videos[iframe.id].trackPlay === 1) {
                track_event("YouTube", "Play", videoData.title, false, true);
            }
        } else if (event.data === YT.PlayerState.ENDED) {
            if (youtube_videos[iframe.id].trackEnd === 1) {
                track_event("YouTube", "Ended", videoData.title, false, true);
            }
        } else if (event.data === YT.PlayerState.PAUSED) {
            if (youtube_videos[iframe.id].trackPause === 1) {
                track_event("YouTube", "Paused", videoData.title, false, true);
            }
        }
    }
    ;

    function onPlaybackQualityChange(event) {
        var iframe = event.target.getIframe();
        if (youtube_videos[iframe.id].trackQuality === 1) {
            var videoData = event.target.getVideoData();
            track_event("YouTube", "Quality Change: " + event.data, videoData.title, false, true);
        }
    }
    ;

    var vimeoOnPlay = function (event) {
        console.log('Vimeo Play');
        if (vimeo_videos[this.element.id].trackPlay === 1) {
            this.getVideoTitle().then(function (title) {
                track_event("Vimeo", "Play", title, false, true);
            });
        }
    };

    var vimeoOnPause = function (event) {
        console.log('Vimeo Pause');
        if (vimeo_videos[this.element.id].trackPause === 1) {
            this.getVideoTitle().then(function (title) {
                track_event("Vimeo", "Pause", title, false, true);
            });
        }
    };

    var vimeoOnEnd = function (event) {
        if (vimeo_videos[this.element.id].trackEnd === 1) {
            this.getVideoTitle().then(function (title) {
                track_event("Vimeo", "End", title, false, true);
            });
        }
    };

    var vimeoOnSkip = function (event) {
        if (event.seconds > 0) { // prevent from firing when the video ended
            var vimeoTime = printTime(parseInt(event.seconds));
            if (vimeo_videos[this.element.id].trackSkip === 1) {
                this.getVideoTitle().then(function (title) {
                    track_event("Vimeo", 'Skipped to ' + vimeoTime, title, false, true);
                });
            }
        }
    };


    // get youtube id from src
    var youtube_src_parser = function (url) {

        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);

        return (match && match[7].length === 11) ? match[7] : false;
    };

    // get vimeo id from src
    var vimeo_src_parser = function (url) {
        var regExp = /(videos|video|channels|\.com)\/([\d]+)/;
        var match = url.match(regExp)[2];

        return match ? match : false;
    };

    // add url param
    var add_params_to_url = function (url, param) {

        var new_url;

        if (-1 === url.indexOf('?')) {
            new_url = url + '?' + param;
        } else {
            new_url = url + '&' + param;
        }

        return new_url;

    };

    // check for videos that do not have iframe id, origin or jsapi
    var check_for_videos = function () {


        // get all iFrames that contain youtube in src
        var all_iframes = $('iframe');

        // iterate through all iframes in page
        all_iframes.each(function (index, el) {

            var iframe_obj = $(el);

            var iframe_src = $(el).attr('src');

            var new_iframe_src = '';

            if (typeof iframe_src !== "undefined") {
                // check if iframe is a youtube video
                var is_youtube = iframe_src.indexOf('youtube');
                var is_vimeo = iframe_src.indexOf('vimeo');
                if (-1 !== is_youtube) {

                    // get youtube id from src
                    var youtube_id = youtube_src_parser(iframe_src);

                    // check if youtube video set in backend
                    // loop through youtube_videos
                    var set_in_backend = false;
                    $.each(youtube_videos, function (index, val) {

                        // aici trebuie verificate si iframes care au html id
                        if (val['id_type'] == 'html_id') {

                            if (iframe_obj.attr('id') == index) {
                                set_in_backend = true;
                            }
                        } else {

                            if (index == youtube_id) {
                                set_in_backend = true;
                            }

                        }

                    });

                    // youtube video id is set in backend
                    if (set_in_backend) {

                        new_iframe_src = iframe_src;

                        // check if iframe has id
                        // if not: add youtube video id as iframe id
                        if (iframe_obj.attr('id') == undefined) {

                            iframe_obj.attr('id', youtube_id);
                        }

                        // check if iframe src has jsapi
                        // if not: add
                        if (-1 == iframe_src.indexOf('jsapi')) {

                            new_iframe_src = add_params_to_url(new_iframe_src, 'enablejsapi=1');

                        }

                        // check if iframe src has origin
                        // if not: add
                        if (-1 == iframe_src.indexOf('origin')) {

                            new_iframe_src = add_params_to_url(new_iframe_src, 'origin=' + window.location.protocol + '//' + window.location.hostname);

                        }

                        // if src was modified reload iframe
                        if (new_iframe_src != iframe_src) {

                            iframe_obj.attr('src', new_iframe_src);

                        }

                    }

                }

                if (-1 !== is_vimeo) {

                    //get the ID from the URL
                    var vimeo_id = vimeo_src_parser(iframe_src);

                    // loop through the list
                    $.each(vimeo_videos, function (index, val) {

                        //check if the vimeo_id match to the one set on the backend
                        if (index == vimeo_id) {
                            iframe_obj.attr('id', vimeo_id); //force replace the iframe ID with the vimeo_id
                            return false; //break each (vimeo_videos) loop, we've already get what we want
                        }

                    });
                }


            }

        });

        videoChecked = true;
    };

    return {
        bind_events: function (settings) {
            scroll_elements = settings.scroll_elements;
            click_elements = settings.click_elements;
            youtube_videos = settings.youtube_videos;
            vimeo_videos = settings.vimeo_videos;
            link_click_delay = settings.link_clicks_delay;
            universal = settings.universal;
            gtm = settings.gtm;
            gst = settings.gst;
            advancedmode = settings.advancedmode;
            nofollowelem = settings.nofollow;
            link_track = settings.link_track;

            page = settings.page;

            nofollow_links = noFollowLinks();
            if(link_track){
                if (link_track.track === '1') {

                    if (link_track.type === 'all') {
                        $('body').on('click', 'a:not([target~="_blank"])', link_track_all);
                        $('body').on('click', 'a[target~="_blank"]', link_track_all_new_tab);
                    } else if (link_track.type === 'external') {
                        $('body').on('click', 'a:not([target~="_blank"])', link_track_external);
                        $('body').on('click', 'a[target~="_blank"]', link_track_external_new_tab);
                    } else if (link_track.type === 'class') {
                        $('body').on('click', "." + link_track.link_class, link_track_all);
                    }
                }
            }
            

            var i;
            for (i = 0; i < click_elements.length; i++) {
                var clicked = click_elements[i];
                var selector = unescapeChars(clicked.select);
                clicked.link_click_delay = link_click_delay;
                clicked.universal = universal;

                $('body').on('click', selector, clicked, click_event);
            }

            // click event
            $('.clickevent').on('click', function (event) {
                event.data = {'category': $(this).attr('data-event-cat'), 'action': $(this).attr('data-event-action'), 'label': $(this).attr('data-event-label'), 'bounce': $(this).attr('data-event-bounce'), 'link_click_delay': link_click_delay, 'universal': universal, 'evalue': $(this).attr('data-event-value')};
                click_event(event);
            });


            // scroll elements
            $(window).scroll(function () {

                var ga_window = $(window).height();
                var ga_scroll_top = $(document).scrollTop();
                var i;

                for (i = 0; i < scroll_elements.length; i++) {
                    var scrollelement = scroll_elements[i];

                    if (!scrollelement.sent) {

                        var $select = $(unescapeChars(scrollelement.select));
                        // var trackevery = scrollelement.trackvalue;
                        // scrollelement.spent = 0;
                        scrollelement.offset =  $select.offset();

                        // var displayStr = '';
                        if( scrollelement.offset && ga_scroll_top + ga_window >= scrollelement.offset.top + $select.height( ) ){
                        track_event( get_placeholder($select, scrollelement.category), get_placeholder($select, scrollelement.action), get_placeholder($select, scrollelement.label), scrollelement.bounce, universal, scrollelement.evalue );

                        // if (isElementInViewport($select)) {
                        //     if (scrollelement.istrack && isInt(trackevery)) {
                        //         setTimeout(function () {
                        //             if (isElementInViewport($select)) {
                        //
                        //                 scrollelement.spent += parseInt(trackevery);
                        //                 displayStr = 'Time spent: ' + scrollelement.spent;
                        //                 track_event(get_placeholder($select, scrollelement.category), get_placeholder($select, scrollelement.action), get_placeholder($select, scrollelement.label+displayStr), scrollelement.bounce, universal, scrollelement.spent);
                        //             }
                        //         }, (trackevery * 1000));
                        //     } else {
                        //         track_event(get_placeholder($select, scrollelement.category), get_placeholder($select, scrollelement.action), get_placeholder($select, scrollelement.label), scrollelement.bounce, universal, scrollelement.evalue);
                        //     }


                            scrollelement.sent = true;
                        }
                    }
                }

                $('.scrollevent').each(function () {
                    if (!$(this).hasClass('scrolled')) {
                        var scrolloffset = $(this).offset();
                        if (scrolloffset && ga_scroll_top + ga_window >= scrolloffset.top + $(this).height()) {
                            track_event(get_placeholder(this, $(this).attr('data-event-cat')), get_placeholder(this, $(this).attr('data-event-action')), get_placeholder(this, $(this).attr('data-event-label')), $(this).attr('data-event-bounce'), universal, $(this).attr('data-event-value'));
                            $(this).addClass('scrolled');
                        }
                    }
                });

            });

        },

        // register videos and events
        register_youtube_videos: function () {

            if (!videoChecked) {
                check_for_videos();
            }
            for (var id in youtube_videos) {

                // each iframe has all stuff
                if (youtube_videos.hasOwnProperty(id)) {
                    youtube_video_instances.push(new YT.Player(id, {
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange,
                            'onPlaybackQualityChange': onPlaybackQualityChange
                        }
                    }));

                }
            }

        },

        register_vimeo_videos: function () {

            if (!videoChecked) {
                check_for_videos();
            }

            for (var id in vimeo_videos) {
                // each iframe has all stuff
                if (vimeo_videos.hasOwnProperty(id)) {

                    //make sure first that the element is on the current page
                    if (jQuery('iframe#' + id).length) {
                        var vimeo_player = new Vimeo.Player(id);
                        vimeo_player.on('play', vimeoOnPlay);
                        vimeo_player.on('pause', vimeoOnPause);
                        vimeo_player.on('ended', vimeoOnEnd);
                        vimeo_player.on('seeked', vimeoOnSkip);
                        //vimeo_video_instances.push(vimeo_player);
                    }

                }
            }

        }

    }; // end: return;




}(jQuery));