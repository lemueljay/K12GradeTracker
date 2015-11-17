function init_hide() {
    $('#usernamelabel').hide();
    $('#firstnamelabel').hide();
    $('#lastnamelabel').hide();
    $('#emaillabel').hide();
    $('#passwordlabel').hide();
    $('#passwordconfirmationlabel').hide();

    $('#formsignuppart2').hide();
}

$(document).ready(function() {

    init_hide();

    $('.trackerbox1').click(function() {
       $('#formsignuppart1').fadeOut('fast', function() {
           $('#formsignuppart2').fadeIn('slow');
           $('.headstart').text('Sign up - Elementary teacher');
           $('#usertrackerid').removeClass('fa-user fa-rocket').addClass('fa-bus');
           $('input[name=usertrackerid]').val('1');
       });
   });

    $('.trackerbox2').click(function() {
        $('#formsignuppart1').fadeOut('fast', function() {
            $('#formsignuppart2').fadeIn('slow');
            $('.headstart').text('Sign up - Senior HS teacher');
            $('#usertrackerid').removeClass('fa-user fa-bus').addClass('fa-rocket');
            $('input[name=usertrackerid]').val('2');
        });
    });

    $('#backbutton').click(function() {
        $('#formsignuppart2').fadeOut('fast', function() {
            $('#formsignuppart1').fadeIn('slow');
        });
    });
});