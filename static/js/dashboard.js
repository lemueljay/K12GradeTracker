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
            $('#ampm').text(m);
        }
    }

}

function initBars() {
    $('.contentbar').hide();
    $('#mainbar').show();
}

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

function initFeatures() {
    updateManageSubjects();
}




$(document).ready(function() {

  // init Isotope
  var $container = $('.isotope-classes').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
        section: '.section',
        type: '.type'
    }
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });

  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

    updateTime();
    initBars();
    initFeatures();

    alertify.warning('Welcome '+ $('.contentbar-firstname').text() + ' !');
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

    $(".sidebar.left").sidebar().trigger("sidebar:toggle");
    $('.navbar-brand').click(function() {
        $(".sidebar.left").trigger("sidebar:toggle");

    });

    //MODALS
    $('.modal-left > div').click(function() {
        $('.modal-left > div').each(function() {
            $(this).removeClass('modal-selected-option');
        });
        $(this).addClass('modal-selected-option');
    });

    $('.opgen').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-gen').removeClass('hidden');
    });

    $('.opprof').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-prof').removeClass('hidden');
    });
    $('.opem').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-em').removeClass('hidden');
    });

    $('.oppass').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-pass').removeClass('hidden');
    });

    $('.oplin').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-lin').removeClass('hidden');
    });

    $('.opsch').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-sch').removeClass('hidden');
    });
     $('.oploc').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-loc').removeClass('hidden');
    });
     $('.opab').click(function() {
        $('.modal-right').addClass('hidden');
        $('#op-ab').removeClass('hidden');
    });


    $('#mansub').click(function() {
         var subject_name =  $('input[name=subject-name]').val();
        var section_value = $('#section-drop-down').val();
        var subject_type_value = $('#subject-type-drop-down').val();
        updateManageSubjects(subject_name, section_value, subject_type_value);
    });


})