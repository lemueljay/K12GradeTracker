function init_hide() {
    $('#usernamelabel').hide();
    $('#firstnamelabel').hide();
    $('#lastnamelabel').hide();
    $('#emaillabel').hide();
    $('#passwordlabel').hide();
    $('#passwordconfirmationlabel').hide();
    $('#formsignuppart2').hide();
}

function check_alert_error() {
    if($('.signupfail').hasClass('alert')) {
        $('#formsignuppart1').hide();
           $('#formsignuppart2').fadeIn('slow');
           $('.headstart').text('Sign up - Elementary teacher');
           $('#usertrackerid').removeClass('fa-user fa-rocket').addClass('fa-bus');
    }
}

function set_usertrackerid() {
    if($('input[name=usertrackerid]').val() == 1) {
        $('.headstart').text('Sign up - Elementary teacher');
        $('#usertrackerid').removeClass('fa-user fa-rocket').addClass('fa-bus');
    } else {
        $('.headstart').text('Sign up - Senior HS teacher');
        $('#usertrackerid').removeClass('fa-user fa-bus').addClass('fa-rocket');
    }
}

$(document).ready(function() {

    init_hide();
    check_alert_error();
    set_usertrackerid();

    $('.trackerbox1').click(function() {
       $('#formsignuppart1').fadeOut('fast', function() {
           $('#formsignuppart2').fadeIn('slow');
           $('input[name=usertrackerid]').val('1');
           set_usertrackerid();
       });
   });

    $('.trackerbox2').click(function() {
        $('#formsignuppart1').fadeOut('fast', function() {
            $('#formsignuppart2').fadeIn('slow');
            $('input[name=usertrackerid]').val('2');
            set_usertrackerid();
        });
    });

    $('#backbutton').click(function() {
        $('#formsignuppart2').fadeOut('fast', function() {
            $('#formsignuppart1').fadeIn('slow');
        });
    });
});