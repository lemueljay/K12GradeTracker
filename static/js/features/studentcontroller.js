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
                    $('.studentsbar-error').addClass('hidden');
                    $('.studentsbar-error-redundant').removeClass('hidden');
                } else {
                    $('.studentsbar-error').addClass('hidden');
                    $('.studentsbar-error-redundant').addClass('hidden');
                    $("<tr id='trstudent" + data['student_id'] + "'>" +
                    "<td>" +
                    "<input type='text' class='hidden form-control tdstudentinput' name='tdstudentinputlastname" + data['student_id'] + "'>" +
                    "<span id='tdstudentspanlastname" + data['student_id'] + "' class='tdstudentspan'>" + last_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' class='hidden form-control tdstudentinput' name='tdstudentinputfirstname" + data['student_id'] + "'>" +
                    "<span id='tdstudentspanfirstname" + data['student_id'] + "' class='tdstudentspan'>" + first_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<input type='text' class='hidden form-control tdstudentinput' name='tdstudentinputmiddlename" + data['student_id'] + "'>" +
                    "<span id='tdstudentspanmiddlename" + data['student_id'] + "' class='tdstudentspan'>" + middle_name + "</span>" +
                    "</td>" +
                    "<td>" +
                    "<i id='saveStudentButton" + data['student_id'] + "' onclick='saveStudent(" + data['student_id'] + ")' class='fa fa-save fa-2x hidden studentsavebtn'></i>" +
                    "<i id='editStudentButton" + data['student_id'] + "' onclick='editStudent(" + data['student_id'] + ")' class='fa fa-edit fa-2x studenteditbtn'></i>" +
                    "<i id='removeStudentButton" + data['student_id'] + "' onclick='removeStudent(" + data['student_id'] + ")' class='fa fa-remove fa-2x studentremovebtn'></i>" +
                    "</td>" +
                    "</tr>").appendTo('#tablestudentsview table tbody').hide().fadeIn();
                    $('#tablestudentsview table').trigger('update');
                    /* Clear forms. */
                    $('input[name=firstname]').val('');
                    $('input[name=middlename]').val('');
                    $('input[name=lastname]').val('');
                    alertify.success(first_name + ' ' + middle_name + ' ' + last_name + ' successfully added!');
                }
                $('#studentspinnerspinner').addClass('hidden');
            }
        });
    } else {
        $('#studentspinnerspinner').addClass('hidden');
        $('.studentsbar-error').removeClass('hidden');
        $('.studentsbar-error-redundant').addClass('hidden');
    }
}

function removeStudent(student_id) {
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var first_name = $('#tdstudentspanfirstname' + student_id).text();
    var middle_name = $('#tdstudentspanmiddlename' + student_id).text();
    var last_name = $('#tdstudentspanlastname' + student_id).text();
    $('.studentsbar-error').addClass('hidden');
    $('.studentsbar-error-redundant').addClass('hidden');
    alertify.confirm('THINK AGAIN!', 'Are you sure you want to remove the selected student? All of the following objects and their related items will be deleted.', function() {
        $.ajax({
            type: 'POST',
            url: '/remove_student/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'student_id': student_id},
            success: function() {
                $('#studentspinnerspinner').removeClass('hidden');
                $('#trstudent' + student_id).fadeOut('slow', function () {
                    $('#trstudent' + student_id).remove();
                    $('#studentspinnerspinner').addClass('hidden');
                    alertify.error(first_name + ' ' + middle_name + ' ' + last_name + ' successfully removed!');
                });
            }
        });
    }, function() {

    });

}

function editStudent(student_id) {
    var last_name = $('#tdstudentspanlastname' + student_id).text();
    var first_name = $('#tdstudentspanfirstname' + student_id).text();
    var middle_name = $('#tdstudentspanmiddlename' + student_id).text();

    $('.tdstudentinput').addClass('hidden');
    $('.studentsavebtn').addClass('hidden');
    $('.studenteditbtn').removeClass('hidden');
    $('.tdstudentspan').removeClass('hidden');
    $('#editStudentButton' + student_id).addClass('hidden');
    $('#tdstudentspanlastname' + student_id).addClass('hidden');
    $('#tdstudentspanfirstname' + student_id).addClass('hidden');
    $('#tdstudentspanmiddlename' + student_id).addClass('hidden');
    $('#saveStudentButton' + student_id).removeClass('hidden');
    $('input[name=tdstudentinputlastname' + student_id + ']').removeClass('hidden').val(last_name);
    $('input[name=tdstudentinputfirstname' + student_id + ']').removeClass('hidden').val(first_name);
    $('input[name=tdstudentinputmiddlename' + student_id + ']').removeClass('hidden').val(middle_name);

}

function saveStudent(student_id) {
    var section_id = $('input[name=contentbarsectionid]').val();
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var last_name = $('input[name=tdstudentinputlastname' + student_id + ']').val();
    var first_name = $('input[name=tdstudentinputfirstname' + student_id + ']').val();
    var middle_name =  $('input[name=tdstudentinputmiddlename' + student_id + ']').val();
    var first_name_span = $('#tdstudentspanfirstname' + student_id).text();
    var middle_name_span = $('#tdstudentspanmiddlename' + student_id).text();
    var last_name_span = $('#tdstudentspanlastname' + student_id).text();
    if(first_name == first_name_span && middle_name == middle_name_span && last_name == last_name_span) {
        $('#tdstudentspanlastname' + student_id).text(last_name);
        $('#tdstudentspanfirstname' + student_id).text(first_name);
        $('#tdstudentspanmiddlename' + student_id).text(middle_name);
        $('#editStudentButton' + student_id).removeClass('hidden');
        $('#saveStudentButton' + student_id).addClass('hidden');
        $('.tdstudentinput').addClass('hidden');
        $('.tdstudentspan').removeClass('hidden');
        $('.studentsbar-error').addClass('hidden');
        $('.studentsbar-error-redundant').addClass('hidden');
        alertify.success(first_name + ' ' + middle_name + ' ' + last_name + ' successfully updated!');
    } else {
        /* Validate */
        var valid = false;
        if(last_name.trim(" ") == '' || first_name.trim(" ") == '' || middle_name.trim(" ") == '') {
            valid = false;
        } else {
            valid = true;
        }
        if(valid) {
            /* Check for redundancy */
            $.ajax({
                type: 'POST',
                url: '/save_student/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'last_name': last_name,  'first_name': first_name, 'middle_name': middle_name, 'student_id': student_id, 'section_id': section_id},
                success: function(data) {
                    if(data['error']) {
                        $('.studentsbar-error').addClass('hidden');
                        $('.studentsbar-error-redundant').removeClass('hidden');
                    } else {
                        $('#tdstudentspanlastname' + student_id).text(last_name);
                        $('#tdstudentspanfirstname' + student_id).text(first_name);
                        $('#tdstudentspanmiddlename' + student_id).text(middle_name);
                        $('#editStudentButton' + student_id).removeClass('hidden');
                        $('#saveStudentButton' + student_id).addClass('hidden');
                        $('.tdstudentinput').addClass('hidden');
                        $('.tdstudentspan').removeClass('hidden');
                        $('.studentsbar-error').addClass('hidden');
                        $('.studentsbar-error-redundant').addClass('hidden');
                        alertify.success(first_name + ' ' + middle_name + ' ' + last_name + ' successfully updated!');
                    }
                }
            });

        } else {
            $('.studentsbar-error').removeClass('hidden');
            $('.studentsbar-error-redundant').addClass('hidden');
        }
    }


}

$(document).ready(function() {
    /* Add Student Button Clicked */
    $('input[name=addStudentButton]').click(function() {
        addStudent();
    });
});