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