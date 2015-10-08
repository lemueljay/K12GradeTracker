
$(document).ready(function() {
    $("#classform").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#createclassbutton').click();
        }
    });

    $("#addstudentform").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#addstudentbutton').click();
        }
    });

    $("#assessmentsform").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#createassessmentbutton').click();
        }
    });
});