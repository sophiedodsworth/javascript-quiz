// identifying the DOM elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// identifying variables for the questions and timer

var currentQuestionIndex = 0;
var time = questions.length * 10;
var timerId;

// declaring function to start the quiz

function startQuiz() {

  // hiding the start screen of the quiz 

  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hiding the start screen of the quiz

  questionsEl.removeAttribute("class");

  // starts the timer when user begins quiz

  timerId = setInterval(theTimer, 1000);

  // displays the time to the user

  timerEl.textContent = time;

  // calling the function to load questions once the user starts the quiz

  loadQuestions();
}

// declaring function to start the questios

function loadQuestions() {

  // declaring variable to select the question object from the created array

  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // removes previous questions

  choicesEl.innerHTML = "";

  // a loop to go over the options / answers for the questions

  currentQuestion.choices.forEach(function(choice, i) {

    // creating buttons for each possible answer 

    var choiceNode = document.createElement("button");

    choiceNode.setAttribute("class", "choice");

    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // click event listener
    choiceNode.onclick = questionSelect;

    // executing it to display for the user

    choicesEl.appendChild(choiceNode);

  });
}

function questionSelect() {

  // check if user guessed wrong

  if (this.value !== questions[currentQuestionIndex].answer) {

    // deducts ten seconds if the user answered the question wrong
    time -= 10;

    if (time < 0) {
      time = 0;
    }

    // displays the time and what the user can see if they answer correctly or incorrectly

    timerEl.textContent = time;
    feedbackEl.textContent = "Incorrect";
    feedbackEl.style.color = "purple";
    feedbackEl.style.fontSize = "100%";

  } else {

    feedbackEl.textContent = "Correct";
    feedbackEl.style.color = "purple";
    feedbackEl.style.fontSize = "100%";

  }

  // executes the incorrect or correct feedback 

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // moves the user along to the next question in the quiz

  currentQuestionIndex++;

  // checks the time 

  if (currentQuestionIndex === questions.length) {
    endQuiz();

  } else {

// calling function to load the questions again

    loadQuestions();

  }
}

function endQuiz() {

  // the time stops at the end of the quiz

  clearInterval(timerId);

  // moves to the end screen

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show the user their score

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide the quiz questions 

  questionsEl.setAttribute("class", "hide");
}

function theTimer() {

  // the time is up to date

  time--;
  timerEl.textContent = time;

  // if statement to check if the user taking the quiz has no time left

  if (time <= 0) {
    endQuiz();
  }

}

// declaring function that saves the user's score

function saveScore() {

  var initials = initialsEl.value.trim();

  if (initials !== "") {

    // collects any saved scores and if there's none then it goes to an empty array

    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // creates a new score 

    var newScore = {
      score: time,
      initials: initials
    };

    // saves the score 

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // goes to the score page

    window.location.href = "score.html";
  }
}

// declaring function for when the user hits enter

function userEnter(event) {

  if (event.key === "Enter") {
    saveScore();
  }
}

// user to submit initials and it saves their score

submitBtn.onclick = saveScore;

// begin the quiz

startBtn.onclick = startQuiz;

initialsEl.onkeyup = userEnter;