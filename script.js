const choices = document.querySelectorAll(".pokemon-container img");

const roundDisplay = document.querySelector(".round-display span");
const playerScoreDisplay = document.querySelector(".player-score span");
const computerScoreDisplay = document.querySelector(".computer-score span");

const roundResult = document.querySelector(".round-result");
const roundResultInfo = document.querySelector(".round-result-info");

const playerSelectionImage = document.querySelector("img[alt='Player Selection']");
const computerSelectionImage = document.querySelector("img[alt='Computer Selection']");

let roundsPlayed = 0;

let playerScore = 0;
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
  image.addEventListener("click", getPlayerChoice);
});

function getPlayerChoice(e) {
  const playerChoice = e.target.alt;
  const computerChoice = getComputerChoice();
  playRound(playerChoice, computerChoice);
}

function playRound(playerChoice, computerChoice) {
  let winner;

  playerSelectionImage.classList.remove("rotate");

  if (playerChoice == computerChoice) {
    winner = "";
    roundResult.textContent = "It's a tie!";
    roundResultInfo.textContent = `You both chose ${playerChoice}`;
  } else if (
    (playerChoice == "Bulbasaur" && computerChoice == "Squirtle") ||
    (playerChoice == "Charmander" && computerChoice == "Bulbasaur") ||
    (playerChoice == "Squirtle" && computerChoice == "Charmander")
  ) {
    winner = "Player";

    roundResult.textContent = "You win!";
    roundResultInfo.textContent = `${playerChoice} beats ${computerChoice}`;

    playerScore++;
  } else {
    winner = "Computer";

    roundResult.textContent = "You lose!";
    roundResultInfo.textContent = `${playerChoice} loses to ${computerChoice}`;
    computerScore++;
  }

  updateSelectionImages(playerChoice, computerChoice, winner);
  
  roundsPlayed++;

  roundDisplay.textContent = roundsPlayed;
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  if (playerScore == 5 || computerScore == 5) {
    choices.forEach((image) => {
      image.removeEventListener("click", getPlayerChoice);
    });
    roundResult.textContent = "Game's over!";
    if (playerScore == 5) {
      roundResultInfo.textContent = "Player wins!";
      const audio = new Audio(
        `./audios/${playerChoice.toLowerCase()}_audio.mp3`
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

function updateSelectionImages(playerChoice, computerChoice, winner){
  switch (winner) {
    case "Player":
      playerSelectionImage.src = `./images/pokemon/${playerChoice.toLowerCase()}_win.png`;
      computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_default.png`;
      break;
    case "Computer":
      playerSelectionImage.src = `./images/pokemon/${playerChoice.toLowerCase()}_default.png`;
      computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_win.png`;
      break;
    default:
      playerSelectionImage.src = `./images/pokemon/${playerChoice.toLowerCase()}_default.png`;
      computerSelectionImage.src = `./images/pokemon/${computerChoice.toLowerCase()}_default.png`;
  }
}