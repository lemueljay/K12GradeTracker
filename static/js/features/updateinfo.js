function validateUpdate() {
    var firstname = $('input[name=modFirstname]').val();
    var lastname = $('input[name=modLastname]').val();
    var email = $('input[name=modEmail]').val();
    var fb = $('input[name=modFb]').val();
    var password = $('input[name=modPass]').val();
    var school = $('input[name=modSchool]').val();
    var homeAdd = $('input[name=modHome]').val();
    var posCode = $('input[name=modPosCode]').val();
    var text = $('input[name=modText]').val();
}

$(document).ready(function() {
    $('#saveChangesButt').click(function() {
        validateUpdate();
    });
});