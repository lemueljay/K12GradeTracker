/**
 * This script is the event handler for sections.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: None
 * **/

function validateStudentForm() {
    var first_name = $('input[name=firstname]').val();
    var middle_name = $('input[name=middlename]').val();
    var last_name = $('input[name=lastname]').val();
    if(first_name.trim(" ") == '' || middle_name.trim(" ") == '' || last_name.trim(" ") == '') {
        return false;
    } else {
        return true;
    }
}


function addStudent() {
    $('#studentspinnerspinner').removeClass('hidden');
    $('input[name=addStudentButton]').blur();
    /* Validate Form */
    var valid = validateStudentForm();
    /* Get data. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var first_name = $('input[name=firstname]').val();
    var middle_name = $('input[name=middlename]').val();
    var last_name = $('input[name=lastname]').val();
    var section_id = $('input[name=contentbarsectionid]').val();
    if(middle_name.slice(-1) == '.') {
        middle_name =  middle_name.slice(0, -1);
    }
    /* If valid, save. */
    if(valid) {
        $.ajax({
            type: 'POST',
            url: '/add_student/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'first_name': first_name, 'middle_name': middle_name, 'last_name': last_name, 'section_id': section_id},
            success: function(data) {
                if(data['error']) {
                    console.log('ERROE!');
                } else {
                    console.log('OK');
                    $("<tr>" +
                    "<td>" +
                    "<input class='hidden form-control tdstudentinput' name='tdstudentinputlastname" + data['student_id'] + "'>" +
                    "<span id='tdstudentspanfirstname" + data['student_id'] + "' class='tdstudentspan'>" + first_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<input class='hidden form-control tdstudentinput' name='tdstudentinputfirstname'" + data['student_id'] + ">" +
                    "<span id='tdstudentspanlastname'" + data['student_id'] + " class='tdstudentspan'>" + last_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<input class='hidden form-control tdstudentinput' name='tdstudentinputmiddlename" + data['student_id'] + "'>" +
                    "<span id='tdstudentspanmiddlename" + data['student_id'] + "' class='tdstudentspan'>" + middle_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<i onclick='saveStudent(" + data['student_id'] + ")' class='fa fa-save fa-2x hidden'></i>" +
                    "<i onclick='editStudent(" + data['student_id'] + ")' class='fa fa-edit fa-2x'></i>" +
                    "<i onclick='removeStudent(" + data['student_id'] + ")' class='fa fa-remove fa-2x'></i>" +
                    "</td>" +
                    "</tr>").appendTo('#tablestudentsview table tbody').hide().fadeIn();
                    $('#tablestudentsview table').trigger('update');
                }
                $('#studentspinnerspinner').addClass('hidden');
            }
        });
        /* Clear forms. */
        $('input[name=firstname]').val('');
        $('input[name=middlename]').val('');
        $('input[name=lastname]').val('');
        /* Clear errors. */
        $('.studentsbar-error').addClass('hidden');
        $('.studentsbar-error-redundant').addClass('hidden');
    } else {
        $('#studentspinnerspinner').addClass('hidden');
        $('.studentsbar-error').removeClass('hidden');
        $('.studentsbar-error-redundant').addClass('hidden');
    }
}

function removeStudent(student_id) {

}

function editStudent() {

}

function saveStudent() {

}

$(document).ready(function() {
    /* Add Student Button Clicked */
    $('input[name=addStudentButton]').click(function() {
        addStudent();
    });
});