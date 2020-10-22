function open_form() {
    $('#step1').removeClass('show-link');
    $('#step1').addClass('show-button');
}
function open_link() {
    $('#step1').removeClass('show-button');
    $('#step1').addClass('show-link');
}

function calculate_score() {
    var device_score = parseInt($('#device').val());
    var use_type_score = 0;
    $(".use_type").each(function (index) {
        if ($(this).prop("checked") && use_type_score < parseInt($(this).val())) {
            use_type_score = parseInt($(this).val());
            // console.log(index + ": " + $(this).val());
        }
    });

    var total_score = device_score + use_type_score;
    // $('.package-result').hide();
    // alert(total_score);
    $('.package-result').hide();
    
    if(total_score <= 15){
        $('#speed-30').show();
    }else if (total_score > 15 && total_score < 20) {
        $('#speed-40').show();
    }else if (total_score >= 20) {
        $('#speed-60').show();
    }
}