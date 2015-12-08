/**
 * This script is the event handler for sections.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: None
 * **/

function validateStudentForm() {
    console.log('***Validating forms...');
    var first_name = $('input[name=firstname]').val();
    var middle_name = $('input[name=middlename]').val();
    var last_name = $('input[name=lastname]').val();
    if(first_name.trim(" ") == '' || middle_name.trim(" ") == '' || last_name.trim(" ") == '') {
        console.log('INVALID FORM!');
        return false;
    } else {
        console.log('VALID FORM!');
        return true;
    }
}


function addStudent() {
    $('input[name=addStudentButton]').blur();
    /* Validate Form */
    var valid = validateStudentForm();
    /* Get data. */
    /* Clear Forms */
}

function removeStudent(student_id) {
    console.log('***Remove Student Button Clicked!');
}

function editStudent() {

}

function saveStudent() {

}

$(document).ready(function() {
    console.log('***Student Controller ready.');
    /* Add Student Button Clicked */
    $('input[name=addStudentButton]').click(function() {
        console.log('***Add Student Button Clicked!');
        addStudent();
    });
});