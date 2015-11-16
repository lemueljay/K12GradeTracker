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

function input_validator() {
    var flag = email_validate();
    if(flag) {
        //do something useful
    }
}

$(document).ready(function() {
    $('#confirmbutton').click(function() {
        input_validator();
    });
});