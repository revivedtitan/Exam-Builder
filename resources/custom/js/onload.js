function toggleGlossaryLetter(button) {
    $('.glossary-letter-pane').removeClass('active');
    var tabID = "#" + $(button).data("id");
    $(tabID).addClass('active');
}

function loadExamFromURL() {
    $('#stored-exams input:checked').each(function() {
        $.ajax({
            url: $(this).val(),
            success: function(data) {
                loadQuestions(data);
            }
        });

        $('#loadQuestionsModal').modal('close');
    });

    $('#stored-exams input:checked').each(function() {
        $(this).attr('checked', false);
    });

    $('#loadQuestionsModal').modal('close');
}

$(document).ready(function() {

    $('.modal').modal();

    $('a.nn_tabs-toggle').click(function() {
        toggleGlossaryLetter(this);
    });

    $('#crudQuestion').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        complete: function() {
                closeQuestionModal();
            } // Callback for Modal close
    });

    toggleTrueFalse($('#question_type').val());
});