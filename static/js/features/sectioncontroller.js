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
    $.ajax({
        type: 'POST',
        url: '/create_section/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'sectionName': sectionName},
        success: function(data) {
            if(data['error']) {
                $('.sectionsbar-error').addClass('hidden');
                $('.sectionsbar-error-redundant').removeClass('hidden');
                $('#sectionspinner').addClass('hidden');
            } else {
                $("<tr>" +
                "<td><i onclick='' class='fa fa-apple fa-2x'></i></td>" +
                "<td>" + sectionName + "</td>" +
                "<td><i class='fa fa-save fa-2x hidden savebutton' onclick=''></i>" +
                "<i class='fa fa-edit fa-2x editbutton' onclick=''></i>" +
                "<i class='fa fa-remove fa-2x removebutton' onclick=''></i>" +
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
    alertify.confirm('THINK AGAIN!', 'Subjects that have these section will also be deleted!', function() {
        $.ajax({
            type: 'POST',
            url: '/delete_section/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'section_id': section_id},
            success: function(data) {

                $('#sectionspinner').removeClass('hidden');
                $('#trsection' + section_id).fadeOut('slow', function () {
                    $('#trsection' + section_id).remove();
                    $('#sectionspinner').addClass('hidden');
                });

                alertify.error($('#trsection' + section_id + ' td:nth-child(2)').text() + ' successfully removed!');
            }
        });
    }, function() {

    });
}

function editSection() {

}

function saveSection() {

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