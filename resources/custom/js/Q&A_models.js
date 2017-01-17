var questions = [];
var exam;

var TRUE_FALSE = "TRUE_FALSE";
var MULTIPLE_CHOICE = "MULTIPLE_CHOICE";
var CHECK_ALL = "CHECK_ALL";

function Answer(text, isValid) {
    this.text = text;
    this.isValid = isValid;
}

function Question(text, answers, note, type, preserveOrder) {
    this.id = Date.now();
    this.text = text;
    this.answers = answers;
    this.note = note;
    this.type = type;
    this.preserveOrder = preserveOrder;
}

function Exam() {
    this.questions = [];
    this.currentQuestion;
    this.correctlyAnswered = [];
    this.wronglyAnswered = [];
    this.unanswered = [];
    this.currentQuestionCount = 0;
    this.totalQuestionCount = 0;

    this.calculateGrade = function() {
        return ((this.correctlyAnswered.length / this.currentQuestionCount) * 100).toFixed(2);
    }

    this.calculateExamProgress = function() {
        return ((this.currentQuestionCount / this.totalQuestionCount) * 100).toFixed(2);
    }
}

function getAnswers(question) {
    var correctAnswers = [];
    $.each(question.answers, function(index, answer) {
        if (answer.isValid) {
            correctAnswers.push(answer.text);
        }
    });
    return correctAnswers;
}