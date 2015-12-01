/**
 * This script is the event handler for assessments.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Dexter Esin
 * **/


function validateAssessmentForm() {
    var assessmentName = $('input[name=recgradassessmentname]').val();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    if(assessmentName.trim(" ") == '' || assessmentType == null || assessmentTotal.trim(" ") == '') {
        return false;
    } else {
        return true;
    }
}

function createAssessment() {
    /* Load spinner. */
    $('#assessmentspinnerspinner').removeClass('hidden');

    /* Get data. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var assessmentName = $('input[name=recgradassessmentname]').val();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTypeName = $('#recgradassessmenttype option[value=' + assessmentType + ']').text();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    var gradingPeriod = $('#gradingnumber').text().slice(0, 1);
    /* Send data. */
    $.ajax({
        type: 'POST',
        url: '/create_assessment/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'assessmentName': assessmentName, 'assessmentType': assessmentType, 'assessmentTotal': assessmentTotal, 'gradingPeriod': gradingPeriod},
        success: function(data) {
            /* Clear Form */
            $('input[name=recgradassessmentname]').val('');
            $('#recgradassessmenttype').val(0);
            $('input[name=recgradtotal]').val('');
            $("<tr>" +
            "<td>" +
            "<i onclick='' class='fa fa-apple fa-2x'></i>" +
            "</td>" +
            "<td>" + assessmentName + "</td>" +
            "<td>" + assessmentTotal + "</td>" +
            "<td>" + assessmentTypeName + "</td>" +
            "<td>date perfomed</td>" +
            "<td>" +
            "<i class='fa fa-save fa-2x hidden savebutton' onclick=''></i>" +
            "<i class='fa fa-edit fa-2x editbutton' onclick=''></i>" +
            "<i class='fa fa-remove fa-2x removebutton' onclick=''></i>" +
            "</td>" +
            "</tr>").appendTo('#tableassessmentsview table tbody').hide().fadeIn();
            $('#assessmentspinnerspinner').addClass('hidden');
        },
        complete: function() {

        }
    });
}

function deleteAssessment() {

}

function editAssessment() {

}

function saveAssessment() {

}

function goToAssessment() {

}

function goToStudentGrades() {

}

function goToViewStudents() {

}

$(document).ready(function() {
    $('input[value="Create Assessment"]').click(function() {
       /* Validate */
       if(validateAssessmentForm()) {
            /* Send Form */
           createAssessment();

       } else {

       }
    });
});/**
 * This script is the event handler for assessments.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Dexter Esin
 * **/


function validateAssessmentForm() {
    var assessmentName = $('input[name=recgradassessmentname]').val();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    if(assessmentName.trim(" ") == '' || assessmentType == null || assessmentTotal.trim(" ") == '') {
        return false;
    } else {
        return true;
    }
}

function createAssessment() {
    /* Load spinner. */
    $('#assessmentspinnerspinner').removeClass('hidden');

    /* Get data. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var assessmentName = $('input[name=recgradassessmentname]').val();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTypeName = $('#recgradassessmenttype option[value=' + assessmentType + ']').text();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    var gradingPeriod = $('#gradingnumber').text().slice(0, 1);
    /* Send data. */
    $.ajax({
        type: 'POST',
        url: '/create_assessment/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'assessmentName': assessmentName, 'assessmentType': assessmentType, 'assessmentTotal': assessmentTotal, 'gradingPeriod': gradingPeriod},
        success: function(data) {
            /* Clear Form */
            $('input[name=recgradassessmentname]').val('');
            $('#recgradassessmenttype').val(0);
            $('input[name=recgradtotal]').val('');
            $("<tr>" +
            "<td>" +
            "<i onclick='' class='fa fa-apple fa-2x'></i>" +
            "</td>" +
            "<td>" + assessmentName + "</td>" +
            "<td>" + assessmentTotal + "</td>" +
            "<td>" + assessmentTypeName + "</td>" +
            "<td>date perfomed</td>" +
            "<td>" +
            "<i class='fa fa-save fa-2x hidden savebutton' onclick=''></i>" +
            "<i class='fa fa-edit fa-2x editbutton' onclick=''></i>" +
            "<i class='fa fa-remove fa-2x removebutton' onclick=''></i>" +
            "</td>" +
            "</tr>").appendTo('#tableassessmentsview table tbody').hide().fadeIn();
            $('#assessmentspinnerspinner').addClass('hidden');
        },
        complete: function() {

        }
    });
}

function deleteAssessment() {

}

function editAssessment() {

}

function saveAssessment() {

}

function goToAssessment() {

}

function goToStudentGrades() {

}

function goToViewStudents() {

}

$(document).ready(function() {
    $('input[value="Create Assessment"]').click(function() {
       /* Validate */
       if(validateAssessmentForm()) {
            /* Send Form */
           createAssessment();

       } else {

       }
    });
});