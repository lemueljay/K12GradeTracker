
$(document).ready(function() {
    $('#loginbutton').click(function() {
        $('.loginfail').addClass('hidden');
        $('.spinner').removeClass('hidden');
        $('.loginpass').html('<i class="fa fa-circle-o-notch fa-spin fa-fw spinner fa-2x"></i>Validating...').removeClass('hidden');
    });
});