function updateManageSubjects(subject_name, section_value, subject_type_value) {
    // Load subjects
    $('#subjectscontainer').load('/get_subjects/', function() {
        $('input[name=subject-name]').val(subject_name);
    });
    // Load section drop down
    $('#section-drop-down').load('/get_sections_drop_down/', function() {
        if(section_value != null) {
            $("#section-drop-down option").each(function() {
                $(this).removeAttr('selected');
            });
            $("#section-drop-down option[value=" + section_value + "]").attr("selected","selected");
        }
    })
    // Load subject type drop down
    $('#subject-type-drop-down').load('/get_subject_type_drop_down/', function() {
        if(subject_type_value != null) {
            $("#subject-type-drop-down option").each(function() {
                $(this).removeAttr('selected');
            });
            $("#subject-type-drop-down option[value=" + subject_type_value + "]").attr("selected","selected");
        }
    })
}

function validateSubjectForm(subject_name, section_value, subject_type_value) {
    if(subject_name.trim(" ") == '' || section_value == null || subject_type_value == null) {
        $('.contentbar-error').removeClass('hidden');
        return false;
    } else {
        $('.contentbar-error').fadeOut(function() {
            $('.contentbar-error').show().addClass('hidden');
        });
        return true;
    }
}

function initFeatures() {
    updateManageSubjects();
}



$(document).ready(function() {
    initFeatures();
    $('#mansub').click(function() {
        var subject_name =  $('input[name=subjectname]').val();
        var section_value = $('#section-drop-down').val();
        var subject_type_value = $('#subject-type-drop-down').val();
        updateManageSubjects(subject_name, section_value, subject_type_value);
    });

    $('#createSubjectForm').click(function() {
        var sortByValue = 'original-order';
        $container.isotope({ sortBy: sortByValue });
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    // Create subject button clicked!
    $('input[name=createSubjectButton]').click(function() {
        var subject_name =  $('input[name=subjectname]').val();
        var section_value = $('#section-drop-down').val();
        var subject_type_value = $('#subject-type-drop-down').val();
        if(validateSubjectForm(subject_name, section_value, subject_type_value)) {
            var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
            // Submit form
            $.ajax({
            type: 'POST',
            url: '/create_subject/',
            data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'subject_name': subject_name.toUpperCase(), 'section_value': section_value, 'subject_type_value': subject_type_value},
            success: function(data) {
                 // If validated, reset forms.
                $('input[name=subjectname]').val('');
                $("#section-drop-down option[disabled=disabled]").attr("selected","selected");
                $("#subject-type-drop-down option[disabled=disabled]").attr("selected","selected");
                updateManageSubjects();
                // Notify the user.
            }
        });
            alertify.success(subject_name.toUpperCase() + ' successfully created!');
        }
        $('input[name=createSubjectButton]').blur();
        $('#createSubjectForm').blur();
    });
});