// declaring the function to print the scores

function printHighscores() {

    // takes the scores that are saved and if there aren't any then it creates an empty array

    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    // when scores are displayed, this lists them in order like a typical scoreboard 

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    highscores.forEach(function (score) {

        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        // show the scores

        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

  // clearing the scores when user chooses this option

  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // calling the function to print the scores 
  
  printHighscores();