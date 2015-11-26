$(document).ready(function() {
     $('#isotopeclassesview').addClass('hidden');

    $('input[name=tableviewbutt]').click(function() {
        $('.classesview').addClass('hidden');
        $('#tableclassesview').removeClass('hidden');
    });

    $('input[name=isotopeviewbutt]').click(function() {
        $('.classesview').addClass('hidden');
       $('#isotopeclassesview').removeClass('hidden');
    });
});