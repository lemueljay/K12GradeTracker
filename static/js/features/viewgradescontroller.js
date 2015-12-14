

function getGrades(grading_period) {
    $('#viewgrradescontainer span').empty();
    var subject_id = $('input[name=recgradbarsubjectid]').val();
    $('#viewgradesbar div:nth-child(2) div:nth-child(1) span:nth-child(1)').text($('#recgradbar div:nth-child(1) div:nth-child(1) span:nth-child(2)').text());
    $('#viewgradesbar div:nth-child(2) div:nth-child(1) span:nth-child(2)').text($('#recgradbar div:nth-child(1) div:nth-child(1) span:nth-child(3)').text());
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


function viewGrades() {
    $('input[name=viewgradesbarsubjectid]').val($('#recgradbar div:nth-child(1) span:nth-child(1)').text());
    $('.contentbar').hide();
    $('#viewgradestopbar').show();
    $('#viewgradesbar').show();
    var grading_period = $('#gradingnumber').text() + ' ' + $('#gradingword').text();
    getGrades(grading_period);
}