"use strict";
if (window.navigator && window.location.href) {
    var WP_Statistics_http = new XMLHttpRequest;
    WP_Statistics_http.open("GET", wps_statistics_object.rest_url + "wpstatistics/v1/hit" + (wps_statistics_object.rest_url.includes("?") ? "&" : "?") + "_=" + Math.floor(Date.now() / 1e3) + "&_wpnonce=" + wps_statistics_object.wpnonce + "&wp_statistics_hit_rest=yes&ua=" + navigator.userAgent + "&url=" + window.location.href + "&referred=" + document.referrer, !0), WP_Statistics_http.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), WP_Statistics_http.send(null)
}