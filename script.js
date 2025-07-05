function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

function getHumanChoice() {
  return prompt("Rock, paper or scissors?").toLowerCase();
}

const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
      console.log(`It's a tie! You both chose ${humanChoice}`);
    } else if (
      (humanChoice == "rock" && computerChoice == "scissors") ||
      (humanChoice == "paper" && computerChoice == "rock") ||
      (humanChoice == "scissors" && computerChoice == "paper")
    ) {
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
      humanScore++;
    } else {
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      computerScore++;
    }
  }

  playRound(humanChoice, computerChoice);
}
