$(document).ready(function() {
    $('.gradingperiodfooter').addClass('hidden');
    /* POST token. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    $('#changeGradingForm div').click(function() {
        var gradingPeriod = $("input", this).val();
        var gradingNumber = gradingPeriod.slice(0, 3);
        var value = gradingNumber;
        var temp = parseInt($('#gradingnumber').text().slice(0, 1));
        var temp2 = parseInt(value.slice(0, 1));

        if(temp <= temp2) {
            $('.gradingperiodfooter').addClass('hidden');
             $.ajax({
                type: 'POST',
                url: '/grading_period/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'value': value},
                success: function() {
                    $('#gradingnumber').text(gradingNumber).show();
                    alertify.success('Grading Period changed to ' + gradingPeriod + '!');
                    $('#changeGradingModal').modal('hide');
                }
            });
        } else {
            $('.gradingperiodfooter').removeClass('hidden');
        }




    });
});