const choices = document.querySelectorAll(".pokemon-container img");

const roundDisplay = document.querySelector(".round-display span");
const humanScoreDisplay = document.querySelector(".player-score span");
const computerScoreDisplay = document.querySelector(".computer-score span");

const roundResult = document.querySelector(".round-result");
const roundResultInfo = document.querySelector(".round-result-info");

const humanSelectionImage = document.querySelector("img[alt='Player Selection']");
const computerSelectionImage = document.querySelector("img[alt='Computer Selection']");

let roundsPlayed = 0;

let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      return "Bulbasaur";
    case 2:
      return "Charmander";
    case 3:
      return "Squirtle";
  }
}

choices.forEach((image) => {
  image.addEventListener("click", getHumanChoice);
});

function getHumanChoice(e) {
  const humanChoice = e.target.alt;
  const computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);
}

function playRound(humanChoice, computerChoice) {
  humanSelectionImage.classList.remove("rotate");

  if (humanChoice == computerChoice) {
    humanSelectionImage.src = `./images/pokemon/${humanChoice.toLowerCase()}_default.png`;
    computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_default.png`;

    roundResult.textContent = "It's a tie!";
    roundResultInfo.textContent = `You both chose ${humanChoice}`;
  } else if (
    (humanChoice == "Bulbasaur" && computerChoice == "Squirtle") ||
    (humanChoice == "Charmander" && computerChoice == "Bulbasaur") ||
    (humanChoice == "Squirtle" && computerChoice == "Charmander")
  ) {
    humanSelectionImage.src = `./images/pokemon/${humanChoice.toLowerCase()}_win.png`;
    computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_default.png`;

    roundResult.textContent = "You win!";
    roundResultInfo.textContent = `${humanChoice} beats ${computerChoice}`;
    humanScore++;
  } else {
    humanSelectionImage.src = `./images/pokemon/${humanChoice.toLowerCase()}_default.png`;
    computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_win.png`;

    roundResult.textContent = "You lose!";
    roundResultInfo.textContent = `${humanChoice} loses to ${computerChoice}`;
    computerScore++;
  }
  roundsPlayed++;

  roundDisplay.textContent = roundsPlayed;
  humanScoreDisplay.textContent = humanScore;
  computerScoreDisplay.textContent = computerScore;

  if (humanScore == 5 || computerScore == 5) {
    choices.forEach((image) => {
      image.removeEventListener("click", getHumanChoice);
    });
    roundResult.textContent = "Game's over!";
    if (humanScore == 5) {
      roundResultInfo.textContent = "Player wins!";
      const audio = new Audio(
        `./audios/${humanChoice.toLowerCase()}_audio.mp3`
      );
      audio.play();
    } else {
      roundResultInfo.textContent = "Computer wins!";
      const audio = new Audio(
        `./audios/${computerChoice.toLowerCase()}_audio.mp3`
      );
      audio.play();
    }
  }
}
