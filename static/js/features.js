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
        alertify.error(sectionname.toUpperCase() + ' successully removed!');
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
        $('#buttoneditclass' + class_id).removeClass('hidden');
        $('#buttonsaveclass' + class_id).addClass('hidden');
        $('#inputclassname' + class_id).addClass('hidden');
        $('#inputclasssection' + class_id).addClass('hidden');
        $('#trsubject_type' + class_id).addClass('hidden');
        $('#tdclasssection' + class_id).removeClass('hidden').text(newsection);
        $('#tdclassname' + class_id).removeClass('hidden').text(newname);
        $('#tdsubject_type' + class_id).removeClass('hidden').text();
        alertify.success('Section ' + newsection.toUpperCase() + ' successfully updated!');
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

$(document).ready(function() {
    $('.sidebar-option').click(function() {
            $('#classtable').load('/searchclasses/');
    });
});