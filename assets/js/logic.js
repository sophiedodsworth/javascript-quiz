// identifying the DOM elements

var questionsEl = document.querySelector("#questions");
var questionOptions = document.querySelector("#question-options");

// identifying variables for the questions

var questionIdex = 0;
var time = questions.length * 10;

// identifying variables for the timer

var timerTwo;

// declaring function to start the quiz

function startJavaQuiz() {

    // hiding the start screen of the quiz

    var startQuizEl = document.getElementById("start-quiz");
    startQuizEl.setAttribute("class", "hide");

    // un-hiding the start screen of the quiz 

    questionsEl.removeAttribute("class");

    // calling the function

    getQuestion();

}

// declaring function to start the timer

function startTimer() {

    // start timer
    timerTwo = setInterval(countdown, 1000);

    // display starting time to the user 
    timerEl.textContent = time;

}

// declaring function to start the questions

function startQuestions() {

    // declaring variaable to select the question object from the created array

    var userSelectedQuestion = questions[currentQuestionIndex];

    // update title with current question

    var questionsEl = document.getElementById("questions");
    questionsEl.textContent = userSelectedQuestion.title;

    // removes previous questions

    questionOptions.innerHTML = "";

    // a loop to go over the options / answers for the questions

    userSelectedQuestion.choices.forEach(function (select, i) {

        // creating buttons for each answer 

        var questionOptionsNode = document.createElement("button");

        questionOptionsNode.setAttribute("class", "answer");

        questionOptionsNode.setAttribute("value", select);

        questionOptionsNode.textContent = i + 1 + ". " + select;

        // 

        questionOptionsNode.onclick = questionSelect;

        // 

        questionOptions.appendChild(questionOptionsNode);

    });

    //

    function questionSelect() {

    }
}

// the below code is for the end

// save initials

submitBtn.onclick = saveInitials;

// begin the quiz

startBtn.onclock = beginQuiz;