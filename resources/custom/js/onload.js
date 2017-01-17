$(window).resize(function() {
    var sideNavHeight = window.innerHeight - 101;
    setTimeout(function() { $('#nav-mobile').height(sideNavHeight); }, 10);
});

$(document).ready(function() {

    $('.modal').modal();

    $('#crudQuestion').modal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        complete: function() {
                closeQuestionModal();
            } // Callback for Modal close
    });

    toggleTrueFalse($('#question_type').val());

    var sideNavHeight = $('#nav-mobile').height();
    $('#nav-mobile').height(sideNavHeight - 40);
})