let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

let winningConditions = [
  [0, 1, 2], // horizontal row 1
  [3, 4, 5], // horizontal row 2
  [6, 7, 8], // horizontal row 3
  [0, 3, 6], // verticall row 1
  [1, 4, 7], // verticall row 2
  [2, 5, 8], // vertiacll row 3
  [0, 4, 8], // diagonal row
  [2, 4, 6]  // anti diagonal
];

let gameOver = false;
let restartGamebutton;

window.onload = function () {
  gameCells = document.getElementsByClassName("game-cell");
  for (let cell of gameCells) {
    cell.addEventListener("click", placeCell);
  }
  restartGamebutton = document.getElementById("game-restart-button");
  restartGamebutton.addEventListener("click", restartGame)
}

function placeCell() {
  if (gameOver) {
    return;
  }
  
  const index = parseInt(this.getAttribute("data-cell-index"));
  if (gameBoard[index] != "") {
    return;
  }
  
  this.innerText = currentPlayer;
  gameBoard[index] = currentPlayer;
  
  // change players
  currentPlayer = (currentPlayer == playerO) ? playerX : playerO;

  //check for the winner
  checkWinner()
}

function checkWinner () {
  for (let winCondition of winningConditions) {
    let a = gameBoard[winCondition[0]];
    let b = gameBoard[winCondition[1]];
    let c = gameBoard[winCondition[2]];

    if (a == b && b == c && a != "") {
      // apply winning game cell styling
      for (let i = 0; i < gameBoard.length; i++) {
        if (winCondition.includes(i)) {
          gameCells[i].classList.add("winning-game-cell");
          gameOver = true;
        }
      }
    }
  }
}

function restartGame () {
  gameOver = false;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  for (let cell of gameCells) {
    cell.innerText = "";
    cell.classList.remove("winning-game-cell");
  }
}