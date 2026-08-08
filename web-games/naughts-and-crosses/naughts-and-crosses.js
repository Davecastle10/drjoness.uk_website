let playerO = "O";
let playerX = "X";
let currentPlayer = playerO;

let score = [0, 0] // inedx 0 is player O index 1 is player X

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;

const scoreOEl = document.getElementById('playerO-score');
const scoreXEl = document.getElementById('playerX-score');
scoreOEl.textContent = score[0];
scoreXEl.textContent = score[1];

let singlePlayer = false;
let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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

  resetScorebutton = document.getElementById("reset-score-button");
  resetScorebutton.addEventListener("click", resetScore)

  modeToggle = document.getElementById("mode-toggle");

  modeToggle.addEventListener("change", () => {
    if (modeToggle.checked) {
      // toggle is ON
      singlePlayer = true;
    } else {
      // toggle is OFF
      singlePlayer  = false;
    }
  });

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
  
  let pos = emptyCells.indexOf(index);
  if (pos !== -1) {
    emptyCells.splice(pos, 1);
  }

  
  // change players
  currentPlayer = (currentPlayer == playerO) ? playerX : playerO;

  //check for the winner
  checkWinner()

  

  if (singlePlayer) {

    if (gameOver) {
      return; // check for gameover after player has played, if not then robot gets to play in singleplayer
    }
    
    if (currentPlayer == playerX) {
      if (gameBoard[4] == "") {
        gameCells[4].innerText = playerX;
        gameBoard[4] = playerX
        currentPlayer = playerO;
        const pos = emptyCells.indexOf(4);
        if (pos !== -1) emptyCells.splice(pos, 1);

      }
      else {
        let randCellIndex = getRandomEmptyIndex();

        if (randCellIndex != null) {
          gameCells[randCellIndex].innerText = playerX;
          gameBoard[randCellIndex] = playerX;
          currentPlayer = playerO;
          const pos = emptyCells.indexOf(randCellIndex);
          if (pos !== -1) emptyCells.splice(pos, 1);
          
        }
      }
    }
  }
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
  let winner = null;
  for (let cell of gameCells) {
    if (cell.classList.contains("winning-game-cell")) {
      if (cell.innerText == "O") {
        winner = 0;
      }
      else {
        winner = 1;
      }
    }
    cell.innerText = "";
    cell.classList.remove("winning-game-cell")
    if (singlePlayer) {
      currentPlayer = playerO;
    }

    emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }

  if (winner != null){
    score[winner]++;   
  }
  scoreOEl.textContent = score[0];
  scoreXEl.textContent = score[1];
}

function resetScore () {
  score = [0, 0];
  scoreOEl.textContent = score[0];
  scoreXEl.textContent = score[1];
}

function getRandomEmptyIndex() {
  if (emptyCells.length === 0) return null;

  const r = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[r];
}
