$(document).ready(function() {

    $('.modal').modal();

    $('#crudQuestion').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        complete: function() {
                closeQuestionModal();
            } // Callback for Modal close
    });

    toggleTrueFalse($('#question_type').val());
})

function loadExamFromURL() {

    console.log('get checked elements');

    $('#stored-exams input:checked').each(function() {
        console.log($(this).val());

        $.ajax({
            url: $(this).val(),
            success: function(data) {
                //console.log(data);
                loadQuestions(data);
            }
        });

        $('#loadQuestionsModal').modal('close');
    });


}