function updateTime() {
    var today = new Date();
    var day = today.getDay();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = mm+'/'+dd+'/'+yyyy;
    today = '';
    switch(mm) {
        case 1:
            today += 'January';
            break;
        case 2:
            today += 'February';
            break;;
        case 3:
            today += 'March';
            break;;
        case 4:
            today += 'April';
            break;;
        case 5:
            today += 'May';
            break;;
        case 6:
            today += 'June';
            break;;
        case 7:
            today += 'July';
            break;
        case 8:
            today += 'August';
            break;;
        case 9:
            today += 'September';
            break;
        case 10:
            today += 'October';
            break;;
        case 11:
            today += 'November';
            break;;
        case 12:
            today += 'December';
            break;;
        default:
            today += '??';
    }
    myDay = '';
    switch(day) {
        case 0:
            myDay = 'Sunday';
            break;
        case 1:
            myDay = 'Monday';
            break;
        case 2:
            myDay = 'Tuesday';
            break;
        case 3:
            myDay = 'Wednesday';
            break;
        case 4:
            myDay = 'Thursday';
            break;
        case 5:
            myDay = 'Friday';
            break;
        case 6:
            myDay = 'Saturday';
            break;
    }

    today += ' ' + dd + ', ' + yyyy;
    document.getElementById("myDate").innerHTML = today;
    var myVar=setInterval(function(){myTimer()},1000);
    function myTimer() {
        var d = new Date();
        document.getElementById("myTime").innerHTML = myDay + ' ' +  d.toLocaleTimeString();
    }
}

$(document).ready(function() {


    $('.sidebar-option').click(function() {
        $('.sidebar-option').removeClass('sidebar-option-clicked');
        $(this).addClass('sidebar-option-clicked');
        $('.contentbar').addClass('hidden');
    });

    $('#button-start-now').click(function() {
        $('.sidebar-option').removeClass('sidebar-option-clicked');
        $('#button-manage-classes').addClass('sidebar-option-clicked');
        $('.contentbar').addClass('hidden');
        $('.classesbar').removeClass('hidden');
    });

    $('#button-home').click(function() {
        $('.mainbar').removeClass('hidden');
    });

    $('#button-manage-classes').click(function() {
        $('.classesbar').removeClass('hidden');
    });

    $('#button-manage-students').click(function() {
        $('.studentsbar').removeClass('hidden');
    });

    $('#button-manage-assessments').click(function() {
        $('.assessmentsbar').removeClass('hidden');
    });

    $('#button-view-grades').click(function() {
        $('.gradesbar').removeClass('hidden');
    });

    alertify.warning('Welcome ' + $('#info-name').text());

    updateTime();
});