function init_hide() {
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
       });
   });

    $('.trackerbox2').click(function() {
        $('#formsignuppart1').fadeOut('fast', function() {
            $('#formsignuppart2').fadeIn('slow');
            $('.headstart').text('Sign up - Senior HS teacher');
        });
    });

    $('#backbutton').click(function() {
        $('#formsignuppart2').fadeOut('fast', function() {
            $('#formsignuppart1').fadeIn('slow');
        });
    });
});