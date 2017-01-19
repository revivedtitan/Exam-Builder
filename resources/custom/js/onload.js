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
    $.ajax({
        url: "https://raw.githubusercontent.com/revivedtitan/Exam-Builder/master/resources/questions/Exam%20Compass/Security%2B%20Practice%20Test%201.json",
        success: function(data) {
            //console.log(data);
            loadQuestions(data);
        }
    });
}