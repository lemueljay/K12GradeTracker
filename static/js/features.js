function createClass() {
    var classname = $('input[name=class-name]').val();
    var classsection = $('input[name=class-section]').val();
    var subject_type = $('select[id="subject_type"]').val();
    var nothing = "";
    if(classname.trim(" ") == nothing || classsection.trim(" ") == nothing || subject_type == null) {
        $('.alert-class-invalid').removeClass('hidden shake');
        $('.alert-class-invalid').addClass('shake');
        $('.alert-class-invalid').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('.alert-class-invalid').removeClass('shake');
        });
    } else {
      $.ajax({
            type: 'GET',
            url: '/addclass/',
            data: {classname: classname, section: classsection, subject_type: subject_type},
            success: function(data) {
                $('#classtable').html(data);
                $('#dropdowncclassesupdate').load('/dropdowncclassesupdate/');
                $('input[name=class-name]').val('');
                $('input[name=class-section]').val('');
                $('select[id="subject_type"]').val('Subject Type');
                alertify.success('Section ' + classsection.toUpperCase() + ' successfully created!');
                $('.alert-class-invalid').addClass('hidden');
        }
        });
    }
}

function removeClass(class_id) {
    var name = $('#tdclassname' + class_id).text();
    var sectionname = $('#tdclasssection' + class_id).text();
    alertify.confirm('WARNING: Once removed, it can\' already be retrieved!', 'Do you really want to remove class section ' + sectionname + '?', function() {
        $.ajax({
            type: 'GET',
            url: '/removeclass/',
            data: {class_id: class_id},
            success: function(data) {
                $('#tr' + class_id).html('');
                $('#classtable').html(data);
                alertify.error(sectionname.toUpperCase() + ' successully removed!');
        }
        });
    }, function() {

    });
};


function editClass(class_id, class_name, class_section, subject_id) {

    $('.button-save').addClass('hidden');
    $('.button-edit').removeClass('hidden');
    $('#buttonsaveclass' + class_id).removeClass('hidden');
    $('#buttoneditclass' + class_id).addClass('hidden');

    $('#inputclassname' + class_id).val(class_name);
    $('#inputclasssection' + class_id).val(class_section);

    $('#trsubject_type' + class_id).val(subject_id);


    $('.tdclassname').removeClass('hidden');
    $('.tdclasssection').removeClass('hidden');

    $('#tdclassname' + class_id).addClass('hidden');
    $('#tdclasssection' + class_id).addClass('hidden');


    $('.inputs').addClass('hidden');
    $('#inputclassname' + class_id).removeClass('hidden');
    $('#inputclasssection' + class_id).removeClass('hidden');

    $('.trsubject_type').addClass('hidden');
    $('.tdsubject_type').removeClass('hidden');
    $('#trsubject_type' + class_id).removeClass('hidden');
    $('#tdsubject_type' + class_id).addClass('hidden');

};


function saveClass(class_id, class_name, class_section) {

    var newname = $('#inputclassname' + class_id).val();
    var newsection = $('#inputclasssection' + class_id).val();
    var newsubjecttype = $('#trsubject_type' + class_id).val();

    if(newsubjecttype == null || newname.trim(' ') == "" || newsection.trim(' ') == "") {
        alert('Please fill in the inputs correctly!');
    } else {
        $.ajax({
            type: 'GET',
            url: '/editclass/',
            data: {class_id: class_id, new_name: newname, new_section: newsection, newsubjecttype: newsubjecttype},
            success: function(data) {
                $('#classtable').html(data);
                $('#buttoneditclass' + class_id).removeClass('hidden');
                $('#buttonsaveclass' + class_id).addClass('hidden');
                alertify.success('Section ' + newsection.toUpperCase() + ' successfully updated!');
        }
        });
    }
}

function viewClass(class_id) {
    $('.assessmentrow').html('');
    $('.studentrow').html('');
    $('.sidebar-option').removeClass('sidebar-option-clicked');
    $('#button-manage-students').addClass('sidebar-option-clicked');
    $('.contentbar').addClass('hidden');
    $('.studentsbar').removeClass('hidden');

    $.ajax({
            type: 'GET',
            url: '/getstudents/',
            data: {class_id: class_id},
            success: function(data) {
                $('.studentrow').html(data);
        }
        });
};


function addStudent(class_id) {
    var first_name = $('input[name="first_name"]').val();
    var last_name = $('input[name="last_name"]').val();
    if(first_name.trim(' ') == "" || last_name.trim(' ') == "") {
        $('.alert-student-invalid').removeClass('hidden shake');
        $('.alert-student-invalid').addClass('shake');
        $('.alert-student-invalid').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('.alert-student-invalid').removeClass('shake');
        });
    } else {
        $.ajax({
            type: 'GET',
            url: '/addstudent/',
            data: {class_id: class_id, first_name: first_name, last_name: last_name},
            success: function(data) {
                $('input[name="first_name"]').val(' ');
                $('input[name="last_name"]').val(' ');
                $('.studentrow').html(data);
                alertify.success(first_name.toUpperCase() + ' ' + last_name.toUpperCase() + ' successfully added!');
            }
        });
    }
}

function removeStudent(class_id, student_id) {
    var studentname = $('.tdfirstname' + student_id).text() + '  ' + $('.tdlastname' + student_id).text();
    alertify.confirm('WARNING: Once removed, it can\' already be retrieved!', 'Do you really want to remove ' + studentname.toUpperCase() + ' from this class?', function() {
        var name = $('#tdclassname' + class_id).text();
        $.ajax({
        type: 'GET',
        url: '/removestudent/',
        data: {class_id: class_id, student_id: student_id},
        success: function(data) {
            $('#trstudent' + student_id).html('');
            $('.studentrow').html(data);
            alertify.error(studentname.toUpperCase() + ' successully removed!');
        }
    })
    }, function() {

    });
}

function editStudent(student_id, student_first_name, student_last_name) {
    $('.button-save').addClass('hidden');
    $('.button-edit').removeClass('hidden');
    $('.studentinputs').addClass('hidden');
    $('.tdstudent').removeClass('hidden');
    $('#buttoneditstudent' + student_id).addClass('hidden');
    $('#buttonsavestudent' + student_id).removeClass('hidden');
    $('#inputlastname' + student_id).removeClass('hidden');
    $('#inputfirstname' + student_id).removeClass('hidden');
    $('.tdfirstname' + student_id).addClass('hidden');
    $('.tdlastname' + student_id).addClass('hidden');
    $('#inputlastname' + student_id).val(student_last_name);
    $('#inputfirstname' + student_id).val(student_first_name);
}

function saveStudent(class_id, student_id) {
    var newfirstname = $('#inputfirstname' + student_id).val();
    var newlastname = $('#inputlastname' + student_id).val();

    if(newfirstname.trim(' ') == "" || newlastname.trim(' ') == "") {
        alert('Please fill in the inputs correctly!');
    } else {
        $.ajax({
            type: 'GET',
            url: '/editstudent/',
            data: {class_id: class_id, student_id: student_id, newfirstname: newfirstname, newlastname: newlastname},
            success: function(data) {
                $.ajax({
                    type: 'GET',
                    url: '/getstudents/',
                    data: {class_id: class_id},
                    success: function(data) {
                        $('.sidebar-option').removeClass('sidebar-option-clicked');
                        $('#button-manage-students').addClass('sidebar-option-clicked');
                        $('.contentbar').addClass('hidden');
                        $('.studentsbar').removeClass('hidden');
                        $('.studentrow').html(data);
                        alertify.success(newfirstname.toUpperCase() + ' ' + newlastname.toUpperCase() + ' successfully updated!');
                }
                });
        }
        });
    }
}

$(document).ready(function() {
    $('.sidebar-option').click(function() {
        $('.studentrow').load('/defaultstudentview/');
    });
});

