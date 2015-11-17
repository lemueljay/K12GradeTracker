
$(document).ready(function() {
    $('#loginbutton').click(function() {
        $('.loginfail').addClass('hidden');
        $('.spinner').removeClass('hidden');
        $('.loginpass').html('<i class="fa fa-spinner fa-spin fa-fw spinner"></i>Validating...').removeClass('hidden');
    });
});