var hideQuestionBar = true;

function openQuestionModal(question) {

    var questionID = $(question).data("id");

    $.each(questions, function(key, question) {
        if (question.id == questionID) {
            $('#selected_question_id').val(questionID);
            $('#selected_question_text').val(question.text);
            $('#selected_question_note').val(question.note);
            $('#selected_question_answers').html("");

            $.each(question.answers, function(aKey, aValue) {

                var newAnswer = '<li class="collection-item"><a class="waves-effect waves-light btn black disabled" style="padding: 0 1rem;" onclick="selectAnswer(this)"><i class="material-icons">done</i></a><a class="waves-effect waves-light btn red darken-4 disabled" onclick="deleteAnswer(this)" style="padding: 0 1rem;float:right;"><i class="material-icons">delete</i></a><span style="margin-left:15px;">' + aValue.text + '</span></li>';

                if (aValue.isValid) {
                    var newAnswer = '<li class="collection-item selectedColor"><a class="waves-effect waves-light btn black disabled" style="padding: 0 1rem;" onclick="selectAnswer(this)"><i class="material-icons">done</i></a><a class="waves-effect waves-light btn red darken-4 disabled" onclick="deleteAnswer(this)" style="padding: 0 1rem;float:right;"><i class="material-icons">delete</i></a><span style="margin-left:15px;">' + aValue.text + '</span></li>';
                }

                $('#selected_question_answers').append(newAnswer);
            });

            Materialize.updateTextFields();
            $('#crudQuestion').modal('open');
        }
    });
}

function enableEditAction() {
    $('#crudQuestion a').removeClass('disabled');
    $('#crudQuestion input').prop("disabled", false);
    $('#questionModalEdit').hide();
    $('#questionModalSave').show();
}

function updateQuestion() {
    var questionID = $('#selected_question_id').val();
    var questionText = $('#selected_question_text').val();
    var questionNote = $('#selected_question_note').val();
    var answers = [];
    $('#selected_question_answers li.collection-item').each(function(value) {
        var currentAnswer = $(this).find("span").text();
        var isCorrectAnswer = false;
        $('li.selectedColor').each(function(selection) {
            if ($(this).find('span').text() == currentAnswer) {
                isCorrectAnswer = true;
            }
        });
        answers.push(new Answer(currentAnswer, isCorrectAnswer));
    });

    $.each(questions, function(key, question) {
        if (question.id == questionID) {
            console.log('question', question)
            return false;
        }
    });

    console.log('questionID', questionID);
    console.log('questionText', questionText);
    console.log('questionNote', questionNote);
    console.log(answers);
}

function deleteQuestion() {
    var questionID = $('#selected_question_id').val();

    $.each(questions, function(key, question) {
        if (question.id == questionID) {
            console.log('key', key)
            questions.splice(key, 1);
            return false;
        }
    });

    $("a[data-id='" + questionID + "']").parent().remove();
    updateQuestionCounter();
}

function closeQuestionModal() {
    $('#crudQuestion input').prop("disabled", true);
    //$('#questionModalDelete').addClass("disabled");
    //$('#questionModalEdit').show();
    //$('#questionModalSave').hide();
    $('#selected_question_text').val("");
    $('#selected_question_note').val("");
    $('#selected_question_answers').html("");
}