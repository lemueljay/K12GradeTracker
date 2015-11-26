/**
 * This script is the event handler for subjects.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: None
 * **/

/* Load subjects in the container. */
function loadSubjects() {
    var subject_name =  $('input[name=subjectname]').val();
    $('#subjectscontainer').load('/get_subjects/', function() {
        $('input[name=subject-name]').val(subject_name);
    });
}
/* Load section drop down. */
function loadSectionDropdown() {
    var section_value = $('#section-drop-down').val();
    $('#section-drop-down').load('/get_sections_drop_down/', function() {
        if(section_value != null) {
            $("#section-drop-down option").each(function() {
                $(this).removeAttr('selected');
            });
            $("#section-drop-down option[value=" + section_value + "]").attr("selected","selected");
        }
    })
}
/* Load subject type drop down. */
function loadSubjectTypeDropdown() {
    var subject_type_value = $('#subject-type-drop-down').val();
    $('#subject-type-drop-down').load('/get_subject_type_drop_down/', function() {
        if(subject_type_value != null) {
            $("#subject-type-drop-down option").each(function() {
                $(this).removeAttr('selected');
            });
            $("#subject-type-drop-down option[value=" + subject_type_value + "]").attr("selected","selected");
        }
    })
}
/* Validate the create subject form. */
function validateSubjectForm(subject_name, section_value, subject_type_value) {
    if(subject_name.trim(" ") == '' || section_value == null || subject_type_value == null) {
        $('.contentbar-error-redundant').addClass('hidden');
        $('.contentbar-error').removeClass('hidden');
        return false;
    } else {
        $('.contentbar-error').fadeOut(function() {
            $('.contentbar-error').show().addClass('hidden');
        });
        return true;
    }
}
/* Create the subject. */
function createSubject() {
    var subject_name =  $('input[name=subjectname]').val();
    var section_value = $('#section-drop-down').val();
    var section_name = $('#section-drop-down option:selected').text()
    var subject_type_value = $('#subject-type-drop-down').val();
    var subject_type = $('#subject-type-drop-down option:selected').text();
    if(validateSubjectForm(subject_name, section_value, subject_type_value)) {
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
        // Submit form
        $.ajax({
            type: 'POST',
            url: '/create_subject/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_name': subject_name.toUpperCase(), 'section_value': section_value, 'subject_type_value': subject_type_value},
            success: function(data) {
                if(data['error']) {
                    $('.contentbar-error').addClass('hidden');
                    $('.contentbar-error-redundant').removeClass('hidden');
                } else {
                    // Reset forms.
                    $('input[name=subjectname]').val('');
                    $("#section-drop-down option[disabled=disabled]").attr("selected","selected");
                    $("#subject-type-drop-down option[disabled=disabled]").attr("selected","selected");
                    $('.redundant').addClass('hidden');
                    $('<tr id=\'tr' + data['subject_id'] + '\'' + '><td>' + subject_name.toUpperCase() + '</td>' +
                    '<td>' + section_name + '</td>' +
                    '<td>' + subject_type + '</td>' +
                    '<td><i class="fa fa-edit fa-2x" onclick="editSubject(' + data['subject_id'] + ')"></i><i class="fa fa-remove fa-2x" onclick="removeSubject(' + data['subject_id'] + ');"></i></td>' +
                    '</tr>').appendTo('#tableclassesview table tbody').hide().fadeIn();
                    $('#tableclassesview table').trigger('update');
                    // Notify the user.
                    alertify.success(subject_name.toUpperCase() + ' successfully created!');
                }
            }
        });
    }
    $('input[name=createSubjectButton]').blur();
    $('#createSubjectForm').blur();
}
/* Remove the subject. */
function removeSubject(subject_id) {
    $.ajax({
            type: 'get',
            url: '/delete_subject/',
            data: {'subject_id': subject_id},
            success: function(data) {
                $('#tr' + subject_id).fadeOut('slow', function() {
                    $('#tr' + subject_id).remove();
                });
                alertify.error($('#tr' + subject_id + ' td:nth-child(1)').text() + ' successfully removed!');
            }
    });
}
/* When the document is ready... */
$(document).ready(function() {
    /* !!OBSOLETE!! Toggling of table or isotope view. */
    $('#isotopeclassesview').addClass('hidden');
    $('input[name=tableviewbutt]').click(function() {
        $('.classesview').addClass('hidden');
        $('#tableclassesview').removeClass('hidden');
    });
    $('input[name=isotopeviewbutt]').click(function() {
        $('.classesview').addClass('hidden');
       $('#isotopeclassesview').removeClass('hidden');
    });
    $('#createSubjectForm').click(function() {
        var sortByValue = 'original-order';
        $container.isotope({ sortBy: sortByValue });
    });
    /* Initialize the manage subject feature. */
    loadSubjects();
    loadSectionDropdown();
    loadSubjectTypeDropdown();
    /* Manage Subject Button clicked! */
    $('#mansub').click(function() {
        loadSectionDropdown();
        loadSubjectTypeDropdown();
    });
    /* Create subject button clicked! */
    $('input[name=createSubjectButton]').click(function() {
        createSubject();
    });
});