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

    $('#monthnumber').text(mm);
    $('#monthword').text(today);
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

    $('#datenumber').text(dd);
    $('#dateword').text(myDay);

    var myVar=setInterval(function(){myTimer()},1000);
    function myTimer() {
        var d = new Date();
        var time = d.toLocaleTimeString();
        if(time.charAt(1) == ':') {
            var hour = time.charAt(0);
            $('#hour').text(hour);
            var minute = time.slice(2, 4);
            $('#minute').text(minute);
            var seconds = time.slice(5, 7);
            $('#seconds').text(seconds);
            var m = time.slice(8, 10);
            $('#ampm').text(m);
        } else {
            var hour = time.charAt(0) + time.charAt(1);
            $('#hour').text(hour);
            var minute = time.slice(3, 5);
            $('#minute').text(minute);
            var seconds = time.slice(6, 8);
            $('#seconds').text(seconds);
            var m = time.slice(9, 11);
            console.log(m);
            $('#ampm').text(m);
        }
    }
}

function initBars() {
    $('.contentbar').hide();
    $('#mainbar').show();
}

$(document).ready(function() {
    updateTime();
    initBars();
    $()
    $('#ophome').click(function() {
        initBars();
    });
    $('#mansub').click(function() {
         $('.contentbar').hide();
         $('#subjectsbar').show();
    });
    $('#mansec').click(function() {
        $('.contentbar').hide();
        $('#sectionsbar').show();
    });
    $('#viewgrad').click(function() {
        $('.contentbar').hide();
        $('#viewgradesbar').show();
    });
    $('#recgrad').click(function() {
        $('.contentbar').hide();
        $('#recgradbar').show();
    });
})