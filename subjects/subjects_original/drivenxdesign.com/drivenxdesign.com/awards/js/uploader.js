// NOTE: flash runtime is slow to load.  Therefore, to cope with older browsers, it is best to hide the browse_button until the uploader.bind(init) event is fired 
// NOTE: for flash runtime, clicking the browse_button anchor will occasionally navigate to the anchor's href instead of going to the plupload.flash.swf handler to popup a file open dialog.  Therefore, ensure that the browse_button's anchor has onclick="return false;" so that the page does not navigate away if the flash component fails to handle the click event.  Instead it will just do nothing, which is a lot better.  When the user clicks subsequently it will work.   
// NOTE: filters do not work in html4.  Hence, users may try to upload invalid types, so some feedback messaging is required for this scenario; uploader.bind(error) handler can be used to show the message 
function initUploadButton(sButtonText, eParent, myUploaderOptions) {

    // increment uploader_count (stored in body element)
    $('body').data('uploader_count', ($('body').data('uploader_count') ? 1 + $('body').data('uploader_count') : 1));
    var buttonId = 'upload_' + $('body').data('uploader_count').toString();

    var defaultUploaderOptions = {
        multipart_params: {
            cache: Date(),
            destination: ''
        },
        uploaderConfig: {
            runtimes: 'html5,html4',
            max_file_size: '20mb',
            max_file_count: 10,
            multi_selection: true,
            unique_names: true,
            url: '/aws/upload.php',
            filters: [
                { title: "Image files", extensions: "jpg,jpeg,gif,png" }
            ]
        },
        events: {
            Init: function (up, params) {
                var upConfig = $(up).data();
                //$('#filelist').html("<div>Current runtime: " + params.runtime + "</div>");
                //<%'note the browse_button anchor must be inline-block if the anchor has an image button.  In IE, the anchor height will not increase to accomodate a larger image and hence some of the image will not be clickable (plupload does not properly initalise the anchor in IE when the anchor contains an image) %>
                $('#' + upConfig.buttonId).css('display', 'inline-block');
                $('#' + upConfig.buttonId).attr('title', 'Browser support: ' + params.runtime);

            },
            FilesAdded: function (up, files) {
                var upConfig = $(up).data();
                $('#loading_' + upConfig.buttonId).show();
                up.start();
            },
            BeforeUpload: function (up, file) {
                var upConfig = $(up).data();
                multipart_params = upConfig.multipart_params;
                multipart_params.original_filename = file.name;
                up.settings.multipart_params = multipart_params;
            },
            UploadProgress: function (up, file) {
                var upConfig = $(up).data();
                //$('#' + file.id + " b").html(file.percent + "%");
            },
            Error: function (up, err) {
                var upConfig = $(up).data();
                $('#loading_' + upConfig.buttonId).hide();
                $('#error_' + upConfig.buttonId).text("Could not upload file (code " + err.code + "). " + err.message);
            },
            FileUploaded: function (up, file, info) {
                var upConfig = $(up).data();
                // alert('populate the FileUploaded handler to show an image thumb and update inputs on the DOM <form...> ')
            }
        }
    };

    var uploaderOptions = {};

    defaultUploaderOptions.uploaderConfig.browse_button = buttonId;
    defaultUploaderOptions.uploaderConfig.container = 'container_' + buttonId + '';

    // get config
    jQuery.extend(true, uploaderOptions, defaultUploaderOptions, myUploaderOptions);

    // button DOM
    var eContainer = $('<div id="container_' + buttonId + '" style="display:inline;"></div>');
    var eButton, eProgress;
    $(eParent).append(eContainer);
    $(eContainer).append(eButton = $('<input id="' + buttonId + '" class="formsubmitbutton" type="button" value="' + sButtonText + '" />'));

    $(eContainer).append($('<span  id=error_' + buttonId + '></span>'));
    $(eContainer).append(eProgress = $('<img src="/images/loading.gif" id="loading_' + buttonId + '" style="display:none;" />'));

    // construct uploader
    var uploader = new plupload.Uploader(uploaderOptions.uploaderConfig);
    $('body').data('uploader__' + buttonId, uploader); // store a reference in the body

    // put useful data in the uploader object
    var multipart_params = {};
    jQuery.extend(multipart_params, defaultUploaderOptions.multipart_params, myUploaderOptions.multipart_params);
    $(uploader).data('multipart_params', multipart_params);
    $(uploader).data('buttonId', eButton.attr('id'));
    $(uploader).data('progressId', eProgress.attr('id'));

    // events
    uploader.bind('Init', uploaderOptions.events.Init);
    uploader.init(); // initialise now
    uploader.bind('FilesAdded', uploaderOptions.events.FilesAdded);
    uploader.bind('BeforeUpload', uploaderOptions.events.BeforeUpload);
    uploader.bind('UploadProgress', uploaderOptions.events.UploadProgress);
    uploader.bind('Error', uploaderOptions.events.Error);
    uploader.bind('FileUploaded', uploaderOptions.events.FileUploaded);

}
