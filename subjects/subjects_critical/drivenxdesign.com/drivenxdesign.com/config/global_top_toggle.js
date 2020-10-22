$(document).ready(function () {
    // Programs dropdown - SHOW
    if (/iP(ad|hone|od)/.test(navigator.userAgent)) {
        $('#toggle1').click(function () {
            $('.toggle1').toggle('fast');
            return false;
        });

        $('#console-top-menu').click(function () {
            if ($('#jq-dropdown-console .jq-dropdown-menu').is(':visible')) {
                $('#console-top-menu').jqDropdown('hide');
            } else {
                $('#console-top-menu').jqDropdown('show');
            }
            return false;
        });
        $('#admin-notes-top-menu').click(function () {
            if ($('#jq-dropdown-admin-menu .jq-dropdown-menu').is(':visible')) {
                $('#admin-notes-top-menu').jqDropdown('hide');
            } else {
                $('#admin-notes-top-menu').jqDropdown('show');
            }
            return false;
        });

        // Programs dropdown - HIDE
        $("html").click(function (event) {
            if ($(event.target).closest('.toggle1, #toggle1, #header_content').length === 0) {
                $('.toggle1').hide('fast');
            }
        });
    } else {
        $('#toggle1').mouseover(function () {
            $('.toggle1').show('fast');
            return false;
        });

        // Programs dropdown - HIDE
        $("html").mouseover(function (event) {
            if ($(event.target).closest('.toggle1, #toggle1, #header_content').length === 0) {
                $('.toggle1').hide('fast');
            }
        });

        // Console dropdown - SHOW
        $('#console-top-menu').mouseover(function () {
            if (!$('#jq-dropdown-console .jq-dropdown-menu').is(':visible')) {
                $('#console-top-menu').jqDropdown('show');
            }
        });

        // Console dropdown - SHOW
        $('#admin-notes-top-menu').mouseover(function () {
            if (!$('#jq-dropdown-admin-menu .jq-dropdown-menu').is(':visible')) {
                $('#admin-notes-top-menu').jqDropdown('show');
            }
        });

        // Console dropdown - HIDE
        $("html").mouseover(function (event) {
            if ($(event.target).closest('#console-top-menu, #jq-dropdown-admin-menu, #jq-dropdown-console, #header_content').length === 0) {
                $('#console-top-menu').jqDropdown('hide');
            }
        });

    }


});
//# sourceURL=global_top_toggle.js
