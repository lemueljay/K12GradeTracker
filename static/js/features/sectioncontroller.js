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
     var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    /* Get section name. */
    var sectionName = $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val().toUpperCase();
    $.ajax({
        type: 'POST',
        url: '/create_section/',
        data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'sectionName': sectionName},
        success: function(data) {

        }
    });

}

function removeSection() {

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
            /* Clear form and remove error prompts. */
            $('#sections_field > div:nth-child(1) > form > div.col-xs-12.col-sm-9 > input').val('');
            $('.sectionsbar-error').addClass('hidden');
            $('.sectionsbar-error-redundant').addClass('hidden');
        } else {
            /* Else, if form not validated. . . */
            $('.sectionsbar-error').removeClass('hidden');
            $('.sectionsbar-error-redundant').addClass('hidden');
        }
    });
});