

function getGrades(grading_period) {
    $('#viewgrradescontainer span').empty();
    var subject_id = $('input[name=viewgradesbarsubjectid]').val();
    $('#viewgradesbigspinner').show();
    $.ajax({
        type: 'GET',
        url: '/get_grades/',
        data: {'grading_period': grading_period, 'subject_id': subject_id},
        success: function(data) {
            $('#viewgrradescontainer span').html(data).hide();
            $('#viewgradesbigspinner').fadeOut('slow', function() {
                 $('#viewgrradescontainer span').show();
            });
        }
    });
}


function viewGrades(subject_id) {
    $('input[name=viewgradesbarsubjectid]').val($('#recgradbar div:nth-child(1) span:nth-child(1)').text());
    $('.contentbar').hide();
    $('#viewgradesbar').show();
    var grading_period = $('#gradingnumber').text() + ' ' + $('#gradingword').text();
    getGrades(grading_period);
}