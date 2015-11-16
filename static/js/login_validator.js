function email_validate() {
    var email = $('input[name=email]').val();
    var re = /\S+@\S+\.\S+/;
    if(email.trim(" ") == '' || !re.test(email)) {
        if(email.trim(" ") == '') {
            $('.loginpass').addClass('hidden');
            $('.loginfail').text('Username and password did not match!').removeClass('hidden');
        } else if(!re.test(email)) {
            $('.loginpass').addClass('hidden');
            $('.loginfail').text('Invalid email.').removeClass('hidden');
        }
        return false;
    } else {

        return true;
    }
}

function password_validate() {
    var password = $('input[name=password]').val();
    if(password.trim(" ") == '' || password.length < 6) {
        if(password.trim(" ") == '') {
            $('.loginpass').addClass('hidden');
            $('.loginfail').text('Username and password did not match!').removeClass('hidden');
        } else if(password.length < 6) {
            $('.loginpass').addClass('hidden');
            $('.loginfail').text('Username and password did not match!').removeClass('hidden');
        }
        return false;
    } else {

        return true;
    }
}

function login_validator() {
    var flag1 = email_validate();
    var flag2 = password_validate();
    if(flag1 && flag2) {
        $('.loginfail').addClass('hidden');
        $('.spinner').removeClass('hidden');
        $('.loginpass').html('<i class="fa fa-spinner fa-spin fa-fw spinner"></i>Validating...').removeClass('hidden');
    }
}

$(document).ready(function() {
    $('#loginbutton').click(function() {
        login_validator();
    });
});