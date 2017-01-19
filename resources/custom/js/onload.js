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