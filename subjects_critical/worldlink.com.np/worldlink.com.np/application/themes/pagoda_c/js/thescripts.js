/**
 * Created by Sushant, Niroj Prajapati{ Not sushant }  on 12/14/2017.
 */

var $ = jQuery;
var winWidth = $(window).width();

$(document).ready(function () {
    sliderInit();
    modalInit();
    selectInit();
    classChangeInit();
    searchInit();
    mobileSelectInit();
    $('.common-select #daSelect').trigger('change');
});

// window.onload = function () {
//     $('body').addClass('window-loaded');
// };
/*------------------------------- Functions Starts -------------------------------*/
function sliderInit() {
    $('.common-banner-slider').slick({
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 400,
        fade: true,
        cssEase: 'linear'
    });

    $('.common-channels-slider').slick({
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    $('.common-shows-slider').slick({
        arrows: true,
        dots: false,
        autoplay: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    if (winWidth <= 767) {
        $('.features-wrapper .features-inner').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            speed: 400,
            slidesToShow: 2,
            slidesToScroll: 1
        });
    }

    $('.banner-container-5g').slick({
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        pauseOnHover: false,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 667,
                settings: {
                    arrows: false,
                    dots: false
                }
            }
        ]
    });
}


function modalInit() {
    // $('.open-modal').click(function (e) {
    //     e.preventDefault();
    //
    //     $('.modal-loading-gif').css('display', 'block');
    //     $('.modal-loading-area').empty();
    //     var theURL = $(this).attr('href');
    //
    //     $('#theModal').modal('show');
    //
    //     $('.modal-loading-area').load(theURL + ' .modal-loading-content', function () {
    //         $('.modal-loading-gif').css('display', 'none');
    //     });
    // });
}

function selectInit() {
    // $('.js-example-basic-single').select2();
    $(".js-example-basic-single").select2({
        placeholder: "Select a branch",
        allowClear: true
    });
    /*    $('.common-select').on('change', function (e) {
     var $optionSelected = $("option:selected", this);
     $optionSelected.tab('show');
     });*/
}

function mobileSelectInit() {
    $('.common-mobile-select select').on('change', function (e) {
        $('#myTab li a').eq($(this).val()).tab('show');
    });
}

function classChangeInit() {
    $('.common-video-list-container .video-item').click(function (e) {
        e.preventDefault();
        $(this).addClass('playing');
        var url = $(this).find('iframe').attr('src') + '?autoplay=1';
        $(this).find('iframe').attr('src', url)

    });

    $('.siteSearch a').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('search-open')
    });

    $('.nav-toggle').click(function (e) {
        $('body').addClass('nav-open');
    });
    $('#header-wrapper .mobile-menu .mobile-nav-container .menu-header').click(function (e) {
        $('body').removeClass('nav-open');
    });
    $('.has-sub-menu .menu-open-class').on('click', function () {
        if ($(this).parent('li').hasClass('sub-menu-open')) {
            $(this).parent('li').removeClass('sub-menu-open');
        } else {
            $('.has-sub-menu').removeClass('sub-menu-open');
            $(this).parent('li').addClass('sub-menu-open');
        }
    });


}

function searchInit() {
    $('.mobile-search-button').click(function (e) {
        e.preventDefault();
        $('.mobile-menu').toggleClass('mobile-search-open');
    });
}


// function initMap(key = null) {
//     var directionsDisplay;
//     var directionsService = new google.maps.DirectionsService();

//     directionsDisplay = new google.maps.DirectionsRenderer();


//     var mapOptions = {
//         center: new google.maps.LatLng(27.70762, 85.31896),
//         zoom: 10
//     };
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     directionsDisplay.setMap(map);

//     directionsDisplay = new google.maps.DirectionsRenderer();

//     var input = document.getElementById('pac_input');
//     var searchBox = new google.maps.places.SearchBox(input);
//     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener('bounds_changed', function () {
//         searchBox.setBounds(map.getBounds());
//     });
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener('places_changed', function () {

//         var places = searchBox.getPlaces();

//         if (places.length == 0) {
//             return;
//         }

//         // Clear out the old markers.
//         if (marker) {
//             marker.setMap(null);
//         }

//         // For each place, get the icon, name and location.
//         var bounds = new google.maps.LatLngBounds();
//         places.forEach(function (place) {
//             if (!place.geometry) {
//                 return;
//             }
//             var icon = {
//                 url: place.icon,
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(25, 25)
//             };

//             // Create a marker for each place.
//             placeMarker(place.geometry.location);

//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             } else {
//                 bounds.extend(place.geometry.location);
//             }
//         });


//         map.fitBounds(bounds);
//     });


//     if (key != null && key != 0) {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function (position) {
//                 var pos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude
//                 };
//                 var point = new google.maps.LatLng(
//                     parseFloat(position.coords.latitude),
//                     parseFloat(position.coords.longitude));

//                 var marker = new google.maps.Marker({
//                     map: map,
//                     position: point,
//                     // label: icon.label
//                 });
//                 var infowincontent = '<strong>current location</strong>';

//                 marker.addListener('click', function () {
//                     infoWindow.setContent(infowincontent);
//                     infoWindow.open(map, marker);
//                 });
//                 console.log('from marker'+pos.lat,pos.lng);
//                 console.log('from marker'+parseFloat(obj[key].lat),parseFloat(obj[key].lng));
//                 calcandshowroute(pos, key);
//             }, function () {
//                 // handleLocationError(true, infoWindow, map.getCenter());
//             });
//         } else {
//             // Browser doesn't support Geolocation
//             // handleLocationError(false, infoWindow, map.getCenter());
//         }

//         function calcandshowroute(pos, key) {
//             console.log('from calc'+pos.lat,pos.lng);
//             console.log('from calc'+parseFloat(obj[key].lat),parseFloat(obj[key].lng));
//             var start = new google.maps.LatLng(pos.lat,pos.lng);
//             //var end = new google.maps.LatLng(38.334818, -181.884886);
//             var end = new google.maps.LatLng(parseFloat(obj[key].lat),parseFloat(obj[key].lng));
//             var request = {
//                 origin: start,
//                 destination: end,
//                 travelMode: google.maps.TravelMode.DRIVING
//             };
//             directionsService.route(request, function(response, status) {
//                 if (status == google.maps.DirectionsStatus.OK) {
//                     directionsDisplay.setDirections(response);
//                     directionsDisplay.setMap(map);
//                 } else {
//                     alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
//                 }
//             });
//         }
//     }

//     function placeMarker(location) {
//         // clearMarkers();
//         if (marker) {
//             marker.setMap(null);
//         }

//         // marker = [];
//         marker = new google.maps.Marker({
//             position: location,
//             map: map
//         });
//     }

//     var infoWindow = new google.maps.InfoWindow;
//     if (key != null && key != 0) {


//         var point = new google.maps.LatLng(
//             parseFloat(obj[key].lat),
//             parseFloat(obj[key].lng));

//         var marker = new google.maps.Marker({
//             map: map,
//             position: point,
//             // label: icon.label
//         });
//         var infowincontent = '<strong>' + obj[key].name + '</strong><p>' + obj[key].address + '</p>';

//         marker.addListener('click', function () {
//             infoWindow.setContent(infowincontent);
//             infoWindow.open(map, marker);
//         });
//         map.setCenter({lat: parseFloat(obj[key].lat), lng: parseFloat(obj[key].lng)});
//         map.setZoom(12);

//     } else {

//         $.each(obj, function (k, v) {

//             var point = new google.maps.LatLng(
//                 parseFloat(v.lat),
//                 parseFloat(v.lng));

//             var marker = new google.maps.Marker({
//                 map: map,
//                 position: point,
//                 // label: icon.label
//             });
//             var _contactno = (typeof v.contactno !== "undefined") ? v.contactno : '';
//             var infowincontent = '<strong>' + v.name + '</strong><p>' + v.address + '</p><p>' + _contactno + '</p>';
//             marker.addListener('click', function () {
//                 infoWindow.setContent(infowincontent);
//                 infoWindow.open(map, marker);
//             });
//             map.setZoom(9);
//         });
//     }
//     // map.setCenter({lat: 23.70762, lng: 85.31896});
// }


/*-------------------------------- Functions Ends --------------------------------*/





