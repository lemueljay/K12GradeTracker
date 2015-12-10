

function editAllButton() {
    var scores = [];
    var i = 0;
    $('.tdrecordspan').each(function() {
        scores[i] = $(this).val();
        i++;
    });
    i = 0;
    $('.tdrecordinput').each(function() {
        $(this).text(parseInt(scores[i]));
        i++;
    });
    $('input[name=editAllBtn]').addClass('hidden');
    $('input[name=saveAllBtn]').removeClass('hidden');
    $('.tdrecordspan').addClass('hidden');
    $('.tdrecordinput').removeClass('hidden');
}

function saveAllButton() {
    var csrfmiddlewaretoken = $('input[name=csrfmiddlewaretoken]').val();
    var valid = false;
    var total = parseInt($('#recordbar div:nth-child(1) span:nth-child(4)').text());
    $('.tdrecordinput').each(function() {
        if($(this).val().trim(" ") == '' || parseInt($(this).val()) > total || parseInt($(this).val()) < 0 ) {
            valid = false;
            return false;
        } else {
            valid = true;
        }
    });

    if(valid) {
        $('.recordbar-error').addClass('hidden');
        $('input[name=editAllBtn]').removeClass('hidden');
        $('input[name=saveAllBtn]').addClass('hidden');
        $('.tdrecordspan').removeClass('hidden');
        $('.tdrecordinput').addClass('hidden');
        /* Save */
        $('#recordcontainer span').hide();
        $('#recordbigspinner').show();

        $('.tdrecordinput').each(function() {
            var score = parseInt($(this).val());
            var id = ($(this).attr('id')).slice(13);
            $('#tdrecordspan' + id).text(score);
            $.ajax({
                type: 'POST',
                url: '/record_score/',
                data: {'csrfmiddlewaretoken': csrfmiddlewaretoken, 'id': id, 'score': score},
                success: function() {
                    initGrade();
                    $('#recordbigspinner').fadeOut('fast', function() {
                        $('#recordcontainer span').show();
                    });
                }
            });
        });
    } else {
        $('.recordbar-error').removeClass('hidden');
    }
}

function backToAssessment() {
    $('.contentbar').hide();
    $('#recgradbar').show();
}

function initGrade() {
    $('#tablerecordview table tbody tr').each(function() {
        var score = parseInt($('td:nth-child(2) span', this).text());
        var total = parseInt($('td:nth-child(3)', this).text());
        var grade = parseFloat((score/total)*100);
        $('td:nth-child(4)', this).text(grade.toFixed(2) + '%');
        if(grade >= 75) {
            $('td:nth-child(5)', this).text('PASSED!').removeClass().addClass('tdrecordspanstatus passed');
        } else {
            $('td:nth-child(5)', this).text('FAILED!').removeClass().addClass('tdrecordspanstatus failed');;
        }

    });
}

function calculateGrade() {

}

$(document).ready(function() {
    initGrade();
});