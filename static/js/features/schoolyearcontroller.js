$(document).ready(function() {
    $('li').click(function() {
        $('li a i').addClass('hidden');
        $('a i', this).removeClass('hidden');
    });
});