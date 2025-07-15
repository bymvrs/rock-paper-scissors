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

let gameOver = false;

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
  if (gameOver) return;
  const playerChoice = e.target.alt;
  const computerChoice = getComputerChoice();
  playRound(playerChoice, computerChoice);
}

function playRound(playerChoice, computerChoice) {
  let winner;

  playerSelectionImage.classList.remove("rotate");

  if (playerChoice == computerChoice) {
    winner = "";
  } else if (
    (playerChoice == "Bulbasaur" && computerChoice == "Squirtle") ||
    (playerChoice == "Charmander" && computerChoice == "Bulbasaur") ||
    (playerChoice == "Squirtle" && computerChoice == "Charmander")
  ) {
    winner = "Player";
    playerScore++;
  } else {
    winner = "Computer";
    computerScore++;
  }

  updateSelectionImages(playerChoice, computerChoice, winner);
  updateRoundResult(playerChoice, computerChoice, winner);
  updatePlayerScores();

  roundsPlayed++;

  roundDisplay.textContent = roundsPlayed;

  if (playerScore == 5 || computerScore == 5) endGame(playerChoice, computerChoice);
}

function updateSelectionImages(playerChoice, computerChoice, winner) {
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

function updateRoundResult(playerChoice, computerChoice, winner) {
  switch (winner) {
    case "Player":
      roundResult.textContent = "You win!";
      roundResultInfo.textContent = `${playerChoice} beats ${computerChoice}`;
      break;
    case "Computer":
      roundResult.textContent = "You lose!";
      roundResultInfo.textContent = `${playerChoice} loses to ${computerChoice}`;
      break;
    default:
      roundResult.textContent = "It's a tie!";
      roundResultInfo.textContent = `You both chose ${playerChoice}`;
  }
}

function updatePlayerScores() {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
}

function endGame(playerChoice, computerChoice) {
  gameOver = true;

  roundResult.textContent = "Game's over!";

  if (playerScore == 5) {
    roundResultInfo.textContent = "Player wins!";
    playVictoryAudio(playerChoice);
  } else {
    roundResultInfo.textContent = "Computer wins!";
    playVictoryAudio(computerChoice);
  }

  displayReplayButton();
}

function playVictoryAudio(winnersChoice){
  const audio = new Audio(`./audios/${winnersChoice.toLowerCase()}_audio.mp3`);
  audio.play();
}

function displayReplayButton() {
  const roundDisplayParagraph = document.querySelector(".round-display");

  const replayButton = document.createElement("button");
  replayButton.textContent = "Play again";
  replayButton.classList.add("replay-button");

  replayButton.addEventListener("click", () => {
    gameOver = false;

    replayButton.replaceWith(roundDisplayParagraph);

    roundsPlayed = 0;
    roundDisplay.textContent = roundsPlayed;

    playerScore = 0;
    computerScore = 0;
    updatePlayerScores();

    roundResult.textContent = "Game start";
    roundResultInfo.textContent = "First player to reach five points wins";

    playerSelectionImage.src = `./images/pokeball.png`;
    playerSelectionImage.classList.add("rotate");
    
    computerSelectionImage.src = `./images/pokeball.png`;

    replayButton.remove();
  });

  roundDisplayParagraph.replaceWith(replayButton);
}