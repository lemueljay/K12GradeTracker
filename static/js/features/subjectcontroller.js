/**
 * This script is the event handler for subjects.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Dexter Esin
 * **/

/* Load subjects in the container. */
function loadSubjects(year) {

    $('#subjectbigspinner').show();
    $('#subjectscontainer span').empty();
    var subject_name =  $('input[name=subjectname]').val();
    var school_year = year;
    if(school_year == undefined) {
        school_year = $('#syyear').text();
    } else if(school_year == 'CURRENT') {
        school_year = $('#syyear').text();
    }
    var sy = $('#syyear').text();
    loadSections(school_year);

    $.ajax({
        type: 'GET',
        url: '/get_subjects/',
        data: {'subject_name': subject_name, 'school_year': school_year, 'sy': sy},
        success: function(data) {
            $('#subjectscontainer span').html(data).hide();
        },
        complete: function() {
             $('#subjectbigspinner').fadeOut('slow', function() {
                $('#subjectscontainer span').fadeIn('slow');
            });
            loadSectionDropdown();
            loadSubjectTypeDropdown();
            /* Make langkat sa buttons. */
            $('#tableclassesview tbody tr').each(function() {
                var scyr = $('td:nth-child(5) span', this).text();
                var sy = $('#syyear').text();
                if(scyr != sy) {
                    $('td:nth-child(6) i:nth-child(2)', this).remove();
                }
            });

        }
    });
}
/* Load section drop down. */
function loadSectionDropdown() {
    var section_value = $('#section-drop-down').val();
    var school_year = $('#syyear').text();
    $.ajax({
        type: 'GET',
        url: '/get_sections_drop_down/',
        data: {'school_year': school_year},
        success: function(data) {
            $('#section-drop-down').html(data);
            $('td select.section-drop-down').html(data);
            if(section_value != null) {
            $("#section-drop-down option").each(function() {
                $(this).removeAttr('selected');
            });
            $("#section-drop-down option[value=" + section_value + "]").attr("selected","selected");
        }
        }
    });
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
    });
    $('td select.subject-type-drop-down').load('/get_subject_type_drop_down/');
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
    $('.savebutton').addClass('hidden');
    $('.editbutton').removeClass('hidden');
    $('.tdselect').addClass('hidden');
    $('.tdinput').addClass('hidden');
    $('.tdtext').removeClass('hidden');
    var subject_name =  $('input[name=subjectname]').val().toUpperCase();
    var section_value = $('#section-drop-down').val();
    var section_name = $('#section-drop-down option:selected').text()
    var subject_type_value = $('#subject-type-drop-down').val();
    var subject_type = $('#subject-type-drop-down option:selected').text();
    var school_year = $('#syyear').text();
    if(validateSubjectForm(subject_name, section_value, subject_type_value)) {
        var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
        /* Show loader while sending request. */
        $('#spinner').removeClass('hidden');
        $.ajax({
            type: 'POST',
            url: '/create_subject/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_name': subject_name.toUpperCase(), 'section_value': section_value, 'subject_type_value': subject_type_value, 'school_year': school_year},
            success: function(data) {
                if(data['error']) {
                    $('.contentbar-error').addClass('hidden');
                    $('.contentbar-error-redundant').removeClass('hidden');
                    $('#spinner').addClass('hidden');
                } else {
                    // Reset forms.
                    $('input[name=subjectname]').val('');
                    $("#section-drop-down option[disabled=disabled]").attr("selected","selected");
                    $("#subject-type-drop-down option[disabled=disabled]").attr("selected","selected");
                    $('.contentbar-error-redundant').addClass('hidden');
                    $('#spinner').addClass('hidden');
                    $("<tr id='tr" + data['subject_id'] + "'>" +
                        "<td class=''><i onclick='viewSubject(" + data['subject_id'] + ")' class='fa fa-apple fa-2x'></i></td>" +
                    "<td><input class='hidden form-control tdinput' value='" + subject_name + "'><span class='tdtext'>" + subject_name + "</span></td>" +
                    "<td>" +
                        " <span id='td" + data['subject_id'] + "sectionid' class='hidden sectionid'>" + data['section_id'] + "</span>" +
                        "<span class='sectionname'>" + section_name + "</span>" +
                    "</td>" +
                    "<td><select class='hidden form-control subject-type-drop-down tdselect'></select><span id='td" + data['subject_id'] + "subjecttypeid' class='hidden subjecttypeid'>" + subject_type_value + "</span><span class='tdtext subjecttypename'>" + subject_type +"</span></td>" +
                    "<td>" +
                    "<span class='tdschoolyear'>" + school_year + "</span>" +
                    "</td>" +
                    "<td><i id='savebutton" + data['subject_id'] + "' class='fa fa-save fa-2x hidden savebutton' onclick='saveSubject(" + data['subject_id'] + ");'></i><i id='editbutton"+ data['subject_id'] +"' class='fa fa-edit fa-2x editbutton' onclick='editSubject(" + data['subject_id'] + ");'></i><i class='fa fa-remove fa-2x' onclick='removeSubject(" + data['subject_id'] + ");'></i></td>" +
                    "</tr>").appendTo('#tableclassesview table tbody').hide().fadeIn();
                    loadSectionDropdown();
                    loadSubjectTypeDropdown();
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
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    $('.contentbar-error').addClass('hidden');
    $('.contentbar-error-redundant').addClass('hidden');
    var subject_name = $('#tr' + subject_id + ' td:nth-child(2) span').text();
    alertify.confirm('THINK AGAIN!', 'You cannot undo these once deleted.', function() {
       $.ajax({
            type: 'POST',
            url: '/delete_subject/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_id': subject_id},
            success: function(data) {
                    $('#spinner').removeClass('hidden');
                    $('#tr' + subject_id).fadeOut('slow', function() {
                        $('#tr' + subject_id).remove();
                        $('#spinner').addClass('hidden');
                        $('#tableclassesview table').trigger('update');
                        alertify.error(subject_name + ' successfully removed!');
                });
            }
        });
    }, function() {

    });
}

/* Edit subject. */
function editSubject(subject_id) {
    /* Normalize. */
    $('.savebutton').addClass('hidden');
    $('.editbutton').removeClass('hidden');
    /* Hide this edit button. */
    $('#editbutton' + subject_id).addClass('hidden');
    $('#savebutton' + subject_id).removeClass('hidden');
    $('.tdselect').addClass('hidden');
    $('.tdinput').addClass('hidden');
    $('.tdtext').removeClass('hidden');
    $('#tr' + subject_id + ' td').addClass('trfocus');
    /* Get data and apply to form. */
    var subject_name = $('#tr' + subject_id + ' td:nth-child(1) span').text();
    $('#tr' + subject_id + ' td:nth-child(1) input').val(subject_name);
    var section_value = $('#td' + subject_id + 'sectionid').text();
    console.log(section_value);
    var subjecttype = $('#td' + subject_id + 'subjecttypeid').text();
    $("select.subject-type-drop-down option[value=" + subjecttype + "]").attr("selected","selected");
    /* Show form. */
    $('#tr' + subject_id + ' td input').removeClass('hidden');
    $('#tr' + subject_id + ' td select').removeClass('hidden');
    $('#tr' + subject_id + ' td span').addClass('hidden');
    $('.tdschoolyear').removeClass('hidden');
    $('.sectionname').removeClass('hidden');
}

function saveSubject(subject_id) {
    /* POST token. */
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    /* Get data */
    var new_subject_name = $('#tr' + subject_id + ' td:nth-child(2) input.tdinput').val().toUpperCase();
    var new_section_value = $('#td' + subject_id + 'sectionid').text();
    var new_subject_type_id = $('#tr' + subject_id + ' td:nth-child(4) select').val();
    var new_subject_type = $('#tr' + subject_id + ' td:nth-child(4) select option[value=' + new_subject_type_id+ ']').text();
    /* Check for changes */
    var temp1 = $('#tr' + subject_id + ' td:nth-child(2) span').text();
    var temp2 = $('#tr' + subject_id + ' td:nth-child(2) input.tdinput').val().toUpperCase();
    var temp5 = $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypeid').text();
    var temp6 = $('#tr' + subject_id + ' td:nth-child(4) select').val();
    if(temp1 == temp2 && temp5 == temp6) {
        console.log('Oks');
        $('#tr' + subject_id + ' td').removeClass('trfocus');
        $('.contentbar-error').addClass('hidden');
        $('.contentbar-error-redundant').addClass('hidden');
        /* Request successful. */
        $('#tr' + subject_id + ' td:nth-child(2) span').text(new_subject_name);
        $('#tr' + subject_id + ' td:nth-child(3) span.sectionid').text(new_section_value);
        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypeid').text(new_subject_type_id);
        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypename').text(new_subject_type);
        alertify.success('No changes made with ' + new_subject_name);
        /* Hide editor, show spans. */
        $('.tdselect').addClass('hidden');
        $('.tdinput').addClass('hidden');
        $('.tdtext').removeClass('hidden');
        /* Hide this save button. */
        $('#editbutton' + subject_id).removeClass('hidden');
        $('#savebutton' + subject_id).addClass('hidden');
        $('#tableclassesview table').trigger('update');
    } else if(temp2.trim(" ") == '') {
        $('.contentbar-error-redundant').addClass('hidden');
        $('.contentbar-error').removeClass('hidden');
    } else {
            if(temp1 == temp2) {
            /* Send data. */
            var updateOnly = true;
            $.ajax({
                type: 'POST',
                url: '/save_subject/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_id': subject_id, 'new_subject_name': new_subject_name, 'new_section_value': new_section_value, 'new_subject_type_id': new_subject_type_id, 'updateOnly': updateOnly},
                success: function(data) {
                    if(data['error']) {
                        $('.contentbar-error').addClass('hidden');
                        $('.contentbar-error-redundant').removeClass('hidden');
                    } else {
                        $('.contentbar-error').addClass('hidden');
                        $('.contentbar-error-redundant').addClass('hidden');
                        /* Request successful. */
                        $('#tr' + subject_id + ' td').removeClass('trfocus');
                        $('#tr' + subject_id + ' td:nth-child(2) span').text(new_subject_name);
                        $('#tr' + subject_id + ' td:nth-child(3) span.sectionid').text(new_section_value);
                        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypeid').text(new_subject_type_id);
                        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypename').text(new_subject_type);
                        alertify.success(new_subject_name + ' successfully updated!');
                         /* Hide editor, show spans. */
                        $('.tdselect').addClass('hidden');
                        $('.tdinput').addClass('hidden');
                        $('.tdtext').removeClass('hidden');
                        /* Hide this save button. */
                        $('#editbutton' + subject_id).removeClass('hidden');
                        $('#savebutton' + subject_id).addClass('hidden');
                        $('#tableclassesview table').trigger('update');
                        $('#tr' + subject_id + ' td').removeClass('trfocus');
                    }
                }
            });
        } else {
        /* Send data. */
            var updateOnly = false;
            $.ajax({
                type: 'POST',
                url: '/save_subject/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_id': subject_id, 'new_subject_name': new_subject_name, 'new_section_value': new_section_value, 'new_subject_type_id': new_subject_type_id, 'updateOnly': updateOnly},
                success: function(data) {
                    if(data['error']) {
                        $('.contentbar-error').addClass('hidden');
                        $('.contentbar-error-redundant').removeClass('hidden');
                    } else {
                        $('.contentbar-error').addClass('hidden');
                        $('.contentbar-error-redundant').addClass('hidden');
                        /* Request successful. */
                        $('#tr' + subject_id + ' td:nth-child(2) span').text(new_subject_name);
                        $('#tr' + subject_id + ' td:nth-child(3) span.sectionid').text(new_section_value);
                        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypeid').text(new_subject_type_id);
                        $('#tr' + subject_id + ' td:nth-child(4) span.subjecttypename').text(new_subject_type);
                        alertify.success(new_subject_name + ' successfully updated!');
                         /* Hide editor, show spans. */
                        $('.tdselect').addClass('hidden');
                        $('.tdinput').addClass('hidden');
                        $('.tdtext').removeClass('hidden');
                        /* Hide this save button. */
                        $('#editbutton' + subject_id).removeClass('hidden');
                        $('#savebutton' + subject_id).addClass('hidden');
                        $('#tr' + subject_id + ' td').removeClass('trfocus');
                        $('#tableclassesview table').trigger('update');
                    }
                }
            });
        }
    }
    $('#tableclassesview table').trigger('update');
}
/* View subject function. */
function viewSubject(subject_id) {
    $('#assessmentscontainer span').empty();
    /* Show loading bar. */
    $('#assessmentbigspinner').show();
    var subject_name =  $('#tr' + subject_id + ' td:nth-child(2) span').text();
    var section_name = $('#tr' + subject_id + ' td:nth-child(3) span.sectionname').text();
    var section_id = $('#td' + subject_id + 'sectionid').text();
    $('input[name=recgradbarsubjectid]').val(subject_id);
    $('#recgradbar div:nth-child(1) span:nth-child(2)').text(subject_name);
    $('#recgradbar div:nth-child(1) span:nth-child(3)').text(section_name);
    $('input[name=assessmentsectionidhidden]').val(section_id);
    $().text();
    $('.contentbar').hide();
    $('#assessmenttopbar').show();
    $('#recgradbar').show();
    $.ajax({
        type: 'GET',
        url: '/get_assessments/',
        data: {'subject_id': subject_id},
        success: function(data) {
            $('#assessmentscontainer span').html(data).hide();
        },
        complete: function() {
             $('#assessmentbigspinner').fadeOut('slow', function() {
                $('#assessmentscontainer span').fadeIn('slow');
            });
        }
    });
}

/* When the document is ready... */
$(document).ready(function() {
    /* Initialize the manage subject feature. */
    loadSubjects();
    $('#subjectbigspinner').hide();
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