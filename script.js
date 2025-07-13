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

function playGame() {
  const choices = document.querySelectorAll(".pokemon-container img");

  const roundDisplay = document.querySelector(".round-display span");
  const humanScoreDisplay = document.querySelector(".player-score span");
  const computerScoreDisplay = document.querySelector(".computer-score span");

  choices.forEach((image) => {
    image.addEventListener("click", (e) => {
      const humanChoice = e.target.alt;
      const computerChoice = getComputerChoice();
      playRound(humanChoice, computerChoice);
    });
  });

  let roundsPlayed = 0;

  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
      console.log(`It's a tie! You both chose ${humanChoice}`);
    } else if (
      (humanChoice == "Bulbasaur" && computerChoice == "Squirtle") ||
      (humanChoice == "Charmander" && computerChoice == "Bulbasaur") ||
      (humanChoice == "Squirtle" && computerChoice == "Charmander")
    ) {
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
      humanScore++;
    } else {
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
    roundsPlayed++;

    roundDisplay.textContent = roundsPlayed;
    humanScoreDisplay.textContent = humanScore;
    computerScoreDisplay.textContent = computerScore;
  }

  if (roundsPlayed == 5) {
    if (humanScore == computerScore) {
      console.log(
        `Game's over! It's a tie! - Player: ${humanScore} - Computer: ${computerScore}`
      );
    } else if (humanScore > computerScore) {
      console.log(
        `Game's over! Player wins! - Player: ${humanScore} - Computer: ${computerScore}`
      );
    } else {
      console.log(
        `Game's over! Computer wins! - Player: ${humanScore} - Computer: ${computerScore}`
      );
    }
  }
}

playGame();
