/**
 * This script is the event handler for assessments.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Dexter Esin
 * **/


function validateAssessmentForm() {
     $('input[value="Create Assessment"]').blur();
    $('#createSectionForm').blur();
    var assessmentName = $('input[name=recgradassessmentname]').val();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    if(assessmentName.trim(" ") == '' || assessmentType == null || assessmentTotal.trim(" ") == '') {
        $('.recgradbar-error').removeClass('hidden');
        return false;
    } else {
        $('.recgradbar-error').addClass('hidden');
        $('.recgradbar-error-redundant').addClass('hidden');
        return true;
    }
}

function createAssessment() {
     $('input[value="Create Assessment"]').blur();
    $('#createSectionForm').blur();
    /* Load spinner. */
    $('#assessmentspinnerspinner').removeClass('hidden');

    /* Get data. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var assessmentName = $('input[name=recgradassessmentname]').val().toUpperCase();
    var assessmentType = $('#recgradassessmenttype').val();
    var assessmentTypeName = $('#recgradassessmenttype option[value=' + assessmentType + ']').text();
    var assessmentTotal = $('input[name=recgradtotal]').val();
    var gradingPeriod = $('#gradingnumber').text();
    var subject_id = $('#recgradbar div:nth-child(1) span:nth-child(1)').text();
    /* Send data. */
    $.ajax({
        type: 'POST',
        url: '/create_assessment/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'assessmentName': assessmentName, 'assessmentType': assessmentType, 'assessmentTotal': assessmentTotal, 'gradingPeriod': gradingPeriod,
        'subject_id': subject_id},
        success: function(data) {
            /* Check for uniqueness. */
            if(data['error']) {{
                /* If there is redundancy. */
                $('.recgradbar-error').addClass('hidden');
                $('.recgradbar-error-redundant').removeClass('hidden');
            }} else {
                /* No redundancy, go for gold. */
                $('.recgradbar-error').addClass('hidden');
                $('.recgradbar-error-redundant').addClass('hidden');
                $("<tr id='trassessment" + data['assessment_id'] + "'>" +
                "<td>" +
                "<i onclick='goToAssessment(" + data['assessment_id'] + ")' class='fa fa-apple fa-2x'></i>" +
                "</td>" +
                "<td>" +
                "<input id='tdassessmentinputname" + data['assessment_id'] + "' type='text' class='form-control assessmentinput hidden'>" +
                "<span id='tdassessmenttextname" + data['assessment_id'] + "' class='tdassessmenttext'>" + assessmentName + "</span>" +
                "</td>" +
                "<td>" +
                "<input id='tdassessmentinputtotal" + data['assessment_id'] + "' type='number' class='form-control assessmentinput hidden'>" +
                "<span id='tdassessmenttexttotal" + data['assessment_id'] + "' class='tdassessmenttext'>" + assessmentTotal + "</span>" +
                "</td>" +
                "<td>" +
                "<select id='tdassessmentinputselect" + data['assessment_id'] + "' class='form-control assessmentinput hidden'>" +
                "<option value='0' disabled='disabled' selected='selected'>Assessment Type</option>" +
                "<option value='1'>Written Works</option>" +
                "<option value='2'>Performance Tasks</option>" +
                "<option value='3'>Quarterly Exams</option>" +
                "</select>" +
                "<span id='tdassessmenttexttype" + data['assessment_id'] + "' class='tdassessmenttext'>" + assessmentTypeName + "</span>" +
                "</td>" +
                "<td>" + gradingPeriod + " Grading" + "</td>" +
                "<td>" + data['timezone'] + "</td>" +
                "<td>" +
                "<i id='assessmentsavebutton" + data['assessment_id'] + "' class='fa fa-save fa-2x hidden savebutton' onclick='saveAssessment(" + data['assessment_id'] + ")'></i>" +
                "<i id='assessmenteditbutton" + data['assessment_id'] + "' class='fa fa-edit fa-2x editbutton' onclick='editAssessment(" + data['assessment_id'] + ")'></i>" +
                "<i class='fa fa-remove fa-2x removebutton' onclick='deleteAssessment(" + data['assessment_id'] + ")'></i>" +
                "</td>" +
                "</tr>").appendTo('#tableassessmentsview table tbody').hide().fadeIn();
                /* Clear Form */
                $('input[name=recgradassessmentname]').val('');
                $('#recgradassessmenttype').val(0);
                $('input[name=recgradtotal]').val('');
                alertify.success(assessmentName + ' successfully updated!');
                }
            $('#assessmentspinnerspinner').addClass('hidden');
        }
    });
}

function deleteAssessment(assessment_id) {
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var assessment_name = $('#tdassessmenttextname' + assessment_id).text();
    alertify.confirm('THINK AGAIN!', 'You cannot undo these once deleted.', function() {
        $.ajax({
        type: 'POST',
        url: '/remove_assessment/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'assessment_id': assessment_id},
        success: function() {
            $('#assessmentspinnerspinner').removeClass('hidden');
            $('#trassessment' + assessment_id).fadeOut('fast', function() {
                $('#trassessment' + assessment_id).remove();
                $('#assessmentspinnerspinner').addClass('hidden');
                console.log($('#tdassessmenttextname' + assessment_id).text());
                alertify.error(assessment_name + ' successfully removed!');
            });
        }
    });
    }, function() {

    });
}

function editAssessment(assessment_id) {
    /* Buttons */
    $('.savebutton').addClass('hidden');
    $('.editbutton').removeClass('hidden');
    $('#assessmenteditbutton' + assessment_id).addClass('hidden');
    $('#assessmentsavebutton' + assessment_id).removeClass('hidden');
    /* Inputs and T.D's and set values. */
    $('.tdassessmenttext').removeClass('hidden');
    $('#tdassessmenttextname' + assessment_id).addClass('hidden');
    $('#tdassessmenttexttotal' + assessment_id).addClass('hidden');
    $('#tdassessmenttexttype' + assessment_id).addClass('hidden');
    $('.assessmentinput').addClass('hidden');
    $('#tdassessmentinputname' + assessment_id).val($('#tdassessmenttextname' + assessment_id).text()).removeClass('hidden');
    $('#tdassessmentinputtotal' + assessment_id).val($('#tdassessmenttexttotal' + assessment_id).text()).removeClass('hidden');
    var type = $('#tdassessmenttexttype' + assessment_id).text();
    var value = 0;
    switch(type) {
        case "Written Works":
            value = 1;
            break;
        case "Performance Tasks":
            value = 2;
            break;
        case "Quarterly Exams":
            value = 3;
            break;
    }
    $('#tdassessmentinputselect' + assessment_id).val(value).removeClass('hidden');

}

function saveAssessment(assessment_id) {
    /* Validate */
    var validated = false;
    var assessment_name = $('#tdassessmentinputname' + assessment_id).val();
    var total = $('#tdassessmentinputtotal' + assessment_id).val();
    var assessment_type = $('#tdassessmentinputselect' + assessment_id).val();
    if(assessment_name.trim(" ") == '' || total.trim(" ") == '' || total == 0 || assessment_type == null) {
        validated = false;
    } else {
        validated = true;
    }
    /* Save when validated. */
    if(validated) {
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
        $.ajax({
            type: 'POST',
            url: '/save_assessment/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'assessment_id': assessment_id, 'assessment_name': assessment_name,'total': total, 'assessment_type': assessment_type},
            success: function(data) {
                /* Check for  redundancy*/
                if(data['error']) {
                    $('.recgradbar-error').addClass('hidden');
                    $('.recgradbar-error-redundant').removeClass('hidden');
                } else {
                    /* Set input. */
                    $('#tdassessmenttextname' + assessment_id).text(assessment_name);
                    $('#tdassessmenttexttotal' + assessment_id).text(total);
                    switch(assessment_type) {
                        case '1':
                            $('#tdassessmenttexttype' + assessment_id).text("Written Works");
                            break;
                        case '2':
                            $('#tdassessmenttexttype' + assessment_id).text("Performance Tasks");
                            break;
                        case '3':
                            $('#tdassessmenttexttype' + assessment_id).text("Quarterly Exams");
                            break;
                    }
                    /* Toggle views */
                    $('.assessmentinput').addClass('hidden');
                    $('.tdassessmenttext').removeClass('hidden');
                    $('#assessmenteditbutton' + assessment_id).removeClass('hidden');
                    $('#assessmentsavebutton' + assessment_id).addClass('hidden');
                    /* Hide errors. */
                    $('.recgradbar-error').addClass('hidden');
                    $('.recgradbar-error-redundant').addClass('hidden');
                    alertify.success(assessment_name + ' successfully updated!');
                }
            }
        });
    } else {
        /* Show invalid form error. */
        $('.recgradbar-error').removeClass('hidden');
        $('.recgradbar-error-redundant').addClass('hidden');
    }
}

function goToAssessment(assessment_id) {
    $('.contentbar').hide();
    var assessmentname = $('#tdassessmenttextname' + assessment_id).text();
    var assessmenttype = $('#tdassessmenttexttype' + assessment_id).text();
    var total = $('#tdassessmenttexttotal' + assessment_id).text();
    $('input[name=contentbarassessmentid]').val(assessment_id);
    $('#recordbar div:nth-child(1) span:nth-child(1)').text(assessmentname);
    $('#recordbar div:nth-child(1) span:nth-child(2)').text(assessmenttype);
    $('#recordbar div:nth-child(1) span:nth-child(4)').text(total);
    $('#recordbar').show();
    $.ajax({
        type: 'GET',
        url: '/get_records/',
        data: {'assessment_id': assessment_id},
        success: function(data) {
            $('#recordcontainer span').html(data).hide();
            $('#recordbigspinner').fadeOut('fast', function() {
                $('#recordcontainer span').show();
            });
        }
    });
}

function goToStudentGrades() {

}

function goToViewStudents() {

}

$(document).ready(function() {
    $('input[value="Create Assessment"]').click(function() {
        $('.recgradbar-error').addClass('hidden');
        $('.recgradbar-error-redundant').addClass('hidden');
       /* Validate */
       if(validateAssessmentForm()) {
            /* Send Form */
           createAssessment();

       } else {

       }
    });
});