function username_validate() {
    var username = $('input[name=username]').val();
    if(username.trim(" ") == '') {
        if(username.trim(" ") == '') {
            $('#usernamelabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#usernamelabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#firstnamelabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#firstnamelabel').removeClass('bounceOut').hide();
        });
        return true;
    }
}

function firstname_validate() {
    var firstname = $('input[name=firstname]').val();
    if(firstname.trim(" ") == '') {
        if(firstname.trim(" ") == '') {
            $('#firstnamelabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#firstnamelabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#firstnamelabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#firstnamelabel').removeClass('bounceOut').hide();
        });
        return true;
    }
}

function lastname_validate() {
    var lastname = $('input[name=lastname]').val();
    if(lastname.trim(" ") == '') {
        if(lastname.trim(" ") == '') {
            $('#lastnamelabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#lastnamelabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#lastnamelabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#lastnamelabel').removeClass('bounceOut').hide();
        });
        return true;
    }

}

function email_validate() {
    var email = $('input[name=email]').val();
    var re = /\S+@\S+\.\S+/;
    if(email.trim(" ") == '' || !re.test(email)) {
        if(email.trim(" ") == '') {
            $('#emaillabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#emaillabel').removeClass('bounceIn');
            });;
        } else if(!re.test(email)) {
            $('#emaillabel').text('Invalid email!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#emaillabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#emaillabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#emaillabel').removeClass('bounceOut').hide();
        });
        return true;
    }
}


function password_validate() {
    var password = $('input[name=password]').val();
    if(password.trim(" ") == '' || password.length < 6) {
        if(password.trim(" ") == '') {
            $('#passwordlabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#passwordlabel').removeClass('bounceIn');
            });;
        } else if(password.length < 6) {
            $('#passwordlabel').text('Atleast 6 characters!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#passwordlabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#passwordlabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#passwordlabel').removeClass('bounceOut').hide();
        });
        return true;
    }
}

function password_confirmation_validate() {
    var passwordconfirmation = $('input[name=passwordconfirmation]').val();
    var password = $('input[name=password]').val();
    if(passwordconfirmation.trim(" ") == '' || password != passwordconfirmation) {
        if(passwordconfirmation.trim(" ") == '') {
            $('#passwordconfirmationlabel').text('This field is required!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#passwordconfirmationlabel').removeClass('bounceIn');
            });;
        } else if(password != passwordconfirmation) {
            $('#passwordconfirmationlabel').text('Password did not match!').show().fadeIn().addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('#passwordconfirmationlabel').removeClass('bounceIn');
            });;
        }
        return false;
    } else {
        $('#passwordconfirmationlabel').addClass('bounceOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $('#passwordconfirmationlabel').removeClass('bounceOut').hide();
        });
        return true;
    }
}

function input_validator() {
    var flag1 = firstname_validate();
    var flag2 = lastname_validate();
    var flag3 = email_validate();
    var flag4 = password_validate();
    var flag5 = password_confirmation_validate();
    if(flag1 && flag2 && flag3 && flag4 && flag5) {
        //do something usefule
    }
}

$(document).ready(function() {
    $('#confirmbutton').click(function() {
        input_validator();
    });
});