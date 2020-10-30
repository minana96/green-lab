// search in desktop
$(function () {
    $('.toggle-search').click(function (e) {
        e.preventDefault();
        if ($('#navigation').is('.searching')) {
            if ($('#navigation [name="S"]').val().length) {
                $('#navigation_right form').submit();
            }
        } else {
            $('#navigation').addClass('searching');
            $('#navigation [name="S"]').focus();
        }
    });
    $('#navigation [name="S"]').focusout(function () {
        setTimeout(function () {
            $('#navigation').removeClass('searching');
        }, 500);
        
    });
});

// mobile menu
$(function () {
    //$('#mob-nav').prependTo('#outer');
    $('#mob-toggle').click(function () {
        $('body').toggleClass('mob-menu-active');
        if ($('body').is('.mob-menu-active')) {
            $("html, body").animate({ scrollTop: 0 }, 200);
        }
    });

    // handle mobile menu expand
    // * if parent menu has a link, then it is active when the menu is expanded
    // * if parent menu has no link, then it is just a toggle menu
    $('#mob-nav li > a').click(function (e) {
        var eAnchor = $(this);
        var eDropdown = $(this).parent().find('> .dropdown-menu');
        if (eDropdown.length) {
            if (eAnchor.attr('href').length > 2) {
                // handle clickable parent
                if (!eDropdown.is('.active')) {
                    eDropdown.addClass('active');
                    e.preventDefault();
                } else {
                    // menu already expanded, allow navigation
                }
            } else {
                // handle non-clickable parent
                eDropdown.toggleClass('active');
            }
        }
        
    });
});
//# sourceURL=mobile-menu.js
