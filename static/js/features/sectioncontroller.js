/**
 * This script is the event handler for sections.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Arlene Yosoya
 * **/

function loadSections(year) {
    $('#sectionbigspinner').show();
    $('#sectionscontainer span').empty().hide();
    var school_year = year;
     if(school_year == undefined) {
        school_year = $('#syyear').text();
    }
    $.ajax({
        type: 'GET',
        url: '/get_sections/',
        data: {'school_year': school_year},
        success: function(data) {
            $('#sectionscontainer span').html(data).hide();
        },
        complete: function() {
            $('#sectionbigspinner').fadeOut('slow', function() {
                $('#sectionscontainer span').fadeIn('slow');
            });
            /* Make langkat sa buttons. */
            $('#tablesectionview tbody tr').each(function() {
                var scyr = $('td:nth-child(3) span', this).text();
                var sy = $('#syyear').text();
                if(scyr != sy) {
                    $('td:nth-child(4) i:nth-child(2)', this).remove();
                }
            });
            $('#tablesectionview table').trigger('update');
        }
    });
}

function validateSectionForm() {
    $('input[name=createSectionButton]').blur();
    $('#createSectionForm').blur();
    var sectionName = $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val();
    if(sectionName.trim(" ") == '') {
        return false;
    } else {
        return true;
    }
}

function createSection() {
    $('input[name=createSectionButton]').blur();
    $('#createSectionForm').blur();
    $('#sectionspinner').removeClass('hidden');
     var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    /* Get section name. */
    var sectionName = $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val().toUpperCase();
    var school_year = $('#syyear').text();
    $.ajax({
        type: 'POST',
        url: '/create_section/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'sectionName': sectionName, 'school_year': school_year},
        success: function(data) {
            if(data['error']) {
                $('.sectionsbar-error').addClass('hidden');
                $('.sectionsbar-error-redundant').removeClass('hidden');
                $('#sectionspinner').addClass('hidden');
            } else {
                $("<tr id='trsection" + data['section_id'] + "'>" +
                "<td>" +
                "<i onclick='viewSection(" + data['section_id'] + ")' class='fa fa-apple fa-2x'></i>" +
                "</td>" +
                "<td>" +
                "<input id='tdsectionnameinput" + data['section_id'] + "' class='hidden tdsectionnameinput form-control'>" +
                "<span id='tdsectionname" + data['section_id'] + "' class='tdsectionname'>" + sectionName + "</span>" +
                "</td>" +
                "<td>" +
                "<span>" + school_year + "</span>" +
                "</td>" +
                "<td>" +
                "<i id='savesectionbutton" + data['section_id'] + "' class='fa fa-save fa-2x hidden savesectionbutton' onclick='saveSection(" + data['section_id'] + ")'></i>" +
                "<i id='editsectionbutton" + data['section_id'] + "' class='fa fa-edit fa-2x editsectionbutton' onclick='editSection(" + data['section_id'] + ")'></i>" +
                "<i class='fa fa-remove fa-2x removebutton' onclick='removeSection(" + data['section_id'] + ")'></i>" +
                "</td>" +
                "</tr>").appendTo('#tablesectionview table tbody').hide().fadeIn();
                /* Clear form and remove error prompts. */
                $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val('');
                $('.sectionsbar-error').addClass('hidden');
                $('.sectionsbar-error-redundant').addClass('hidden');
                // Notify the user.
                alertify.success('Section ' + sectionName.toUpperCase() + ' successfully created!');
                $('#sectionspinner').addClass('hidden');
                $('#tablesectionview table').trigger('update');
            }
        }
    });
}

function removeSection(section_id) {
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var section_name = $('#trsection' + section_id + ' td:nth-child(2)').text();
    $('.sectionsbar-error').addClass('hidden');
    $('.sectionsbar-error-redundant').addClass('hidden');
    alertify.confirm('THINK AGAIN!', 'Are you sure you want to delete the selected section? All of the following objects and their related items will be deleted.', function() {
        $.ajax({
            type: 'POST',
            url: '/delete_section/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'section_id': section_id},
            success: function(data) {
                $('#sectionspinner').removeClass('hidden');
                $('#trsection' + section_id).fadeOut('slow', function () {
                    $('#trsection' + section_id).remove();
                    $('#sectionspinner').addClass('hidden');
                    $('#tablesectionview table').trigger('update');
                    alertify.error('Section ' + section_name + ' successfully removed!');
                });
            }
        });
    }, function() {

    });
}

function editSection(section_id) {
    $('.savesectionbutton').addClass('hidden');
    $('.editsectionbutton').removeClass('hidden');
    $('#editsectionbutton' + section_id).addClass('hidden');
    $('#savesectionbutton' + section_id).removeClass('hidden');
    $('.tdsectionnameinput').addClass('hidden');
    $('.tdsectionname').removeClass('hidden');
    $('#tdsectionnameinput' + section_id).removeClass('hidden').val($('#tdsectionname' + section_id).text());
    $('#tdsectionname' + section_id).addClass('hidden');
}

function saveSection(section_id) {
    var newName = $('#tdsectionnameinput' + section_id).val().toUpperCase();
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    /* Validation */
    var valid = false;
    if(newName.trim(" ") == '') {
        valid = false;
    } else {
        valid = true;
    }
    if(newName == $('#trsection' + section_id + ' td:nth-child(2)').text().trim(" ")) {
        $('#savesectionbutton' + section_id).addClass('hidden');
        $('#editsectionbutton' + section_id).removeClass('hidden');
        $('#tdsectionname' + section_id).text(newName);
        $('.tdsectionnameinput').addClass('hidden');
        $('.tdsectionname').removeClass('hidden');
        $('.sectionsbar-error').addClass('hidden');
        $('.sectionsbar-error-redundant').addClass('hidden');
        $('#tablesectionview table').trigger('update');
        alertify.success('Section ' + newName + ' successfully updated!');
    } else {
        /* If valid. */
        if(valid) {
            $.ajax({
                type: 'POST',
                url: '/save_section/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'newName': newName, 'section_id': section_id},
                success: function(data) {
                    /* Redundancy */
                    if(data['error']) {
                        $('.sectionsbar-error').addClass('hidden');
                        $('.sectionsbar-error-redundant').removeClass('hidden');
                    } else {
                        $('#savesectionbutton' + section_id).addClass('hidden');
                        $('#editsectionbutton' + section_id).removeClass('hidden');
                        $('#tdsectionname' + section_id).text(newName);
                        $('.tdsectionnameinput').addClass('hidden');
                        $('.tdsectionname').removeClass('hidden');
                        $('.sectionsbar-error').addClass('hidden');
                        $('.sectionsbar-error-redundant').addClass('hidden');
                        $('#tablesectionview table').trigger('update');
                        alertify.success('Section ' + newName + ' successfully updated!');
                    }
                }
            });
        } else {
            $('.sectionsbar-error').removeClass('hidden');
            $('.sectionsbar-error-redundant').addClass('hidden');
        }
    }

}

function viewSection(section_id, what) {
    if(what == 'justno') {
        $('#studentbigspinner').show();
        $('.contentbar').hide();
        $('#studentsbar div:nth-child(1) span:nth-child(1)').text($('#tdsectionname' + section_id).text());
        $('input[name=contentbarsectionid]').val(section_id);
        $('#studentstopbar').show();
        $('#studentsbar').show();
        $('#studentscontainer span').empty().hide();
        $.ajax({
            type: 'GET',
            url: '/get_students/',
            data: {'section_id': section_id},
            success: function(data) {
                $('#studentscontainer span').html(data).hide();
                $('#studentbigspinner').fadeOut('slow', function() {
                    $('#studentscontainer span').show();
                })

            }
        });
    } else {
        $('#studentbigspinner').show();
        $('.contentbar').hide();
        $('#studentsbar div:nth-child(1) span:nth-child(1)').text($('#tdsectionname' + section_id).text());
        $('input[name=contentbarsectionid]').val(section_id);
        $('#studentsbar').show();
        $('#studentscontainer span').empty().hide();
        $.ajax({
            type: 'GET',
            url: '/get_students/',
            data: {'section_id': section_id},
            success: function(data) {
                $('#studentscontainer span').html(data).hide();
                $('#studentbigspinner').fadeOut('slow', function() {
                    $('#studentscontainer span').show();
                })

            }
        });
    }

}

$(document).ready(function() {
     $('#subjectbigspinner').hide();
    /* Load sections. */
    loadSections();
    $('input[name=createSectionButton]').click(function() {
        if(validateSectionForm()) {
            /* If form validated, */
            createSection();
            $('.sectionsbar-error').addClass('hidden');
            $('.sectionsbar-error-redundant').addClass('hidden');
        } else {
            /* Else, if form not validated. . . */
            $('.sectionsbar-error').removeClass('hidden');
            $('.sectionsbar-error-redundant').addClass('hidden');
        }
    });
});