

function getGrades(grading_period) {
     $('#viewgradesbigspinner').show();
    $.ajax({
        type: 'GET',
        url: '/get_grades/',
        data: {'grading_period': grading_period},
        success: function(data) {
            $('#viewgrradescontainer span').html(data).hide();
            $('#viewgradesbigspinner').fadeOut('slow', function() {
                 $('#viewgrradescontainer span').show();
            });
        }
    });
}


function viewGrades(subject_id) {
    $('.contentbar').hide();
    $('#viewgradesbar').show();
    getGrades(1);
}