$(document).ready(function() {

    /* POST token. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();

    $('#changeGradingForm div').click(function() {
        var gradingPeriod = $("input", this).val();
        var gradingNumber = gradingPeriod.slice(0, 3);
        var value = gradingNumber;
        $.ajax({
            type: 'POST',
            url: '/grading_period/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'value': value},
            success: function() {
                $('#gradingnumber').text(gradingNumber).show();
                alertify.success('Grading Period changed to ' + gradingPeriod + '!');
            }
        });

    });
});