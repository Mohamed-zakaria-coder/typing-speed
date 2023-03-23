// Elements
let gameContainer = document.querySelector(".game-container")
let levelMsg = document.querySelector(".level-msg");
let word = document.querySelector(".word");
let input = document.querySelector("input");
let allWords = document.querySelector(".all-words");
let score = document.querySelector(".score");
let scoreDiv = document.querySelector(".score div")
let scoreP = document.querySelector(".score p")
let timer = document.querySelector(".timer");
let timerDiv = document.querySelector(".timer div")
let timerP = document.querySelector(".timer p")
let gameOver = document.querySelector(".game-over");
let buttonsLevel = document.querySelectorAll("button");
let chooseLevel = document.querySelector(".choose-level");
let success = document.querySelector(".success");
let start = document.querySelector(".start");
let startButton = document.querySelector(".start button");

document.querySelector(".try-again") && document.querySelector(".try-again").remove()

startButton.addEventListener("click", function () {
  start.remove();
  
  // Choose Level Message
  let ChooseLevelMessage = document.createElement("div");
  let buttonLevelMessage = document.createElement("button"); 
  gameContainer.appendChild(ChooseLevelMessage);
  ChooseLevelMessage.appendChild(buttonLevelMessage);
  buttonLevelMessage.textContent = "Choose A Level";
  ChooseLevelMessage.className = "level-message"
  buttonLevelMessage.onclick = function(){
    ChooseLevelMessage.remove()
  }
  // Public Variables
  let seconds;
  let index;

  // Game Levels
  let levels = {
    easy: "6",
    normal: "4",
    hard: "2",
  };

 
  // Choose A Level
  Array.from(buttonsLevel).forEach((button) => {
    button.addEventListener("click", function () {
      seconds = levels[`${button.value}`];
      index = parseInt(button.dataset.num);
      timerDiv.textContent = seconds;
      gameStructure();
      chooseLevel.remove();
      input.focus();

      // Array Of Words
      let arrOfWords = [
        "Hello",
        "Welcome",
        "Bootstrap",
        "Tailwind",
        "Python",
        "Html",
        "CSS",
        "React",
        "JSX",
        "PHP",
        "Next",
        "Node",
        "JavaScript",
        "Try",
        "Basics",
        "Rules",
        "Done",
        "Practice",
        "Code",
        "Binary",
      ];
      success.textContent = `Congratulations You Have Done ${arrOfWords.length} from ${arrOfWords.length}`;
      success.style.opacity = 0;
      input.onpaste = function () {
        alert("What ? ");
        return false;
      };

      // Level Content Function
      function gameStructure() {
        let spanSeconds = document.createElement("span");
        spanSeconds.textContent = seconds;
        levelMsg.textContent = `You Are In (${
          Object.keys(levels)[index][0].toUpperCase() +
          Object.keys(levels)[index].slice(1)
        }) Level With (${spanSeconds.textContent}) Seconds`;
      }

      for (let i = 0; i < arrOfWords.length; i++) {
        let spans = document.createElement("span");
        spans.textContent = arrOfWords[i];
        allWords.appendChild(spans);
      }
      let allWordSpans = document.querySelectorAll(".all-words span");

      // Countdown Timer
      timerDiv.textContent = seconds;
      timerP.textContent = `Seconds Remaining: `
      scoreDiv.textContent = 0;
      scoreP.textContent = ` / ${arrOfWords.length}`
      let randomNumber = 1;

      let countDownTimer = setInterval(countDown, 1000);
      function countDown() {
        word.textContent = arrOfWords[randomNumber];
        timerDiv.textContent--;
        if (word.textContent === "") {
          success.style.opacity = 1;
          let tryAgain = document.createElement("button")
              tryAgain.textContent = "Try Again"
              tryAgain.className = "try-again"
              gameContainer.appendChild(tryAgain)
              tryAgain.onclick = function(){
                location.reload()
              }
          clearInterval(countDownTimer);
          timerDiv.textContent = 0;
        } else {
          if (timerDiv.textContent === "0") {
            arrOfWords.splice(randomNumber, 1);
            if (input.value === word.textContent) {
              scoreDiv.textContent++;
              Array.from(allWordSpans).forEach((span) => {
                if (span.textContent === word.textContent) {
                  span.remove();
                }
              });
              if (word.textContent === "") {
                timer.textContent = "";
                
              } else {
                timerDiv.textContent = seconds;
                timerP =  `Seconds Remaining: `
              }
            } else {
              clearInterval(countDownTimer);
              gameOver.textContent = "Game Over";
              let tryAgain = document.createElement("button")
              tryAgain.textContent = "Try Again"
              tryAgain.className = "try-again"
              gameContainer.appendChild(tryAgain)
              tryAgain.onclick = function(){
                location.reload()
              }
              timer.textContent = 0;
              chooseLevel.remove();
            }
            input.value = "";
            randomNumber = Math.floor(Math.random() * arrOfWords.length);
            gameStructure();
          }
        }
      }
    });
  });
});
