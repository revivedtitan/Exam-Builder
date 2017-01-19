function clearAllQuestions() {
    questions = [];
    $('#nav-mobile li.no-padding').remove();
    $('#question_counter').html('Please Load Questions');
    $('#navbar-btn-save').addClass('disabled');
    $('#navbar-btn-clear').addClass('disabled');
    $('#navbar-btn-start').addClass('disabled');
    $('#nav-mobile').hide();
}

function toggleTrueFalse(option) {
    if (option == TRUE_FALSE) {
        $('#trueFalseRadios').show();
        $('#choice_question').hide();
    } else {
        $('#trueFalseRadios').hide();
        $('#choice_question').show();
    }
}

function addAnswer() {
    var answerText = $('#answerText').val().trim();

    if (answerText.length == 0) {
        $('#errorModalMessage').html('Please enter an answer before attempting to add it.');
        $('#errorModal').modal('open');
    } else {
        var newAnswer = '<li class="collection-item"><a class="waves-effect waves-light btn black" style="padding: 0 1rem;" onclick="selectAnswer(this)"><i class="material-icons">done</i></a><a class="waves-effect waves-light btn red darken-4" onclick="deleteAnswer(this)" style="padding: 0 1rem;float:right;"><i class="material-icons">delete</i></a><span style="margin-left:15px;">' + answerText + '</span></li>';
        $('#answerCollection').append(newAnswer);
        $('#answerText').val("")
        $('#answerText').focus();
    }
}

function deleteAnswer(answer) {
    $(answer).parent().remove();
}

function selectAnswer(answer) {
    var question_type = $('#question_type').val();

    if (question_type == "MULTIPLE_CHOICE") {
        if ($(answer).hasClass('selectedColor')) {
            $(answer).parent().removeClass('selectedColor');
            $(answer).removeClass('selectedColor');
        } else {
            $('.selectedColor').each(function() {
                $(this).removeClass('selectedColor');
            });

            $(answer).addClass('selectedColor');
            $(answer).parent().addClass('selectedColor');
        }
    } else {
        if ($(answer).hasClass('selectedColor')) {
            $(answer).parent().removeClass('selectedColor');
            $(answer).removeClass('selectedColor');
        } else {
            $(answer).addClass('selectedColor');
            $(answer).parent().addClass('selectedColor');
        }
    }
}

function builderQuestionAnswer() {
    var question_type = $('#question_type').val();
    var question_text = $('#question_text').val().trim();
    var answers = [];

    if (question_text.length == 0) {
        $('#errorModalMessage').html('Please enter a question.');
        $('#errorModal').modal('open');
        return;
    }

    if (question_type != TRUE_FALSE) {
        if ($('li.collection-item').length < 2) {
            $('#errorModalMessage').html('Please enter at least two answers.');
            $('#errorModal').modal('open');
            return;
        }

        var correct_answer = $('li.selectedColor');
        if (correct_answer.length == 0) {
            $('#errorModalMessage').html('Please select the correct answer by clicking on the check button.');
            $('#errorModal').modal('open');
            return;
        }

        $('li.collection-item').each(function(value) {
            var currentAnswer = $(this).find("span").text();
            var isCorrectAnswer = false;
            $('li.selectedColor').each(function(selection) {
                if ($(this).find('span').text() == currentAnswer) {
                    isCorrectAnswer = true;
                }
            });
            answers.push(new Answer(currentAnswer, isCorrectAnswer));
        });

    } else {
        var selectedValue = $('input[name=tf_radio]:checked').val();
        if (selectedValue == "true") {
            answers.push(new Answer("TRUE", true));
            answers.push(new Answer("FALSE", false));
        } else {
            answers.push(new Answer("TRUE", false));
            answers.push(new Answer("FALSE", true));
        }
    }

    var note = $('#question_note').val();
    var preserveOrder = $('#order').is(':checked');
    var question = new Question(question_text, answers, note, question_type, preserveOrder);

    questions.push(question);
    $('#nav-mobile').append(buildQuestionElement(question));

    resetQuestionBuilder();
    updateQuestionCounter();
    checkDisabledOptions();
}

function updateQuestionCounter() {
    $('#question_counter').html(questions.length + ' Questions Loaded');
    $('#numberOfQuestions').val(questions.length);
    Materialize.updateTextFields();
}

function resetQuestionBuilder() {
    $('#question_text').val("");
    $('#question_note').val("");
    $('#answerCollection').html("");
}

function openSaveQuestionModal() {
    var currentTime = new Date();
    var time = moment().format("DD-MMM-YYYY__HH[H]-mm[M]-ss[S]");
    $('#save_filename').val('Exam_Builder__' + time);
    Materialize.updateTextFields();
}

function saveQuestionList() {
    var filename = $('#save_filename').val();
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions));
    $('#question_list_link').remove();
    $('<a id="question_list_link" href="data:' + data + '" download="' + filename + '.json" style="display:none;">download JSON</a>').appendTo('.container');
    $('#question_list_link')[0].click();
}

function buildQuestionElement(question, answers, correct_answer) {

    var questionElement = '<li class="no-padding bold">';
    questionElement += '<a class="collapsible-header waves-effect waves-black truncate" onclick="openQuestionModal(this)" data-id="' + question.id + '">' + question.text + '</a>';
    questionElement += '</li>';

    return questionElement;
}

function openFile(event) {
    var input = event.target;

    function readFile(index) {
        if (index >= input.files.length) {
            return;
        }

        var file = input.files[index];
        var reader = new FileReader();

        reader.onload = function(e) {
            var fileQuestions = JSON.parse(reader.result);

            for (var i = 0; i < fileQuestions.length; i++) {
                questions.push(fileQuestions[i]);
                $('#nav-mobile').append(buildQuestionElement(fileQuestions[i]));
            }

            updateQuestionCounter();
            checkDisabledOptions();
            readFile(index + 1)
        }
        reader.readAsBinaryString(file);
        $('#loadQuestionsModal').modal('close');
    }
    readFile(0);
}
