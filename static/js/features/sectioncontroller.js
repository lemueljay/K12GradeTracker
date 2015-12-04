/**
 * This script is the event handler for sections.html
 * Author: Lemuel Jay V. Vallinas
 * Contributors: Arlene Yosoya
 * **/

function loadSections() {
    $('#sectionscontainer').load('/get_sections/');
}

function validateSectionForm() {
    var sectionName = $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val();
    if(sectionName.trim(" ") == '') {
        return false;
    } else {
        return true;
    }
}

function createSection() {
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
                "<i onclick='' class='fa fa-apple fa-2x'></i>" +
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
            }

        }
    });

}

function removeSection(section_id) {
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
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
                    alertify.error($('#trsection' + section_id + ' td:nth-child(2)').text() + ' successfully removed!');
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
    $('#savesectionbutton' + section_id).addClass('hidden');
    $('#editsectionbutton' + section_id).removeClass('hidden');
    var newName = $('#tdsectionnameinput' + section_id).val();
    $('#tdsectionname' + section_id).text(newName);
    $('.tdsectionnameinput').addClass('hidden');
    $('.tdsectionname').removeClass('hidden');
}

$(document).ready(function() {
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