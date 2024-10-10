function Gameboard() {
  const board = Array(9).fill("");
  
  const updateBoard = (position, marker) => {
    if (board[position] == "") {
      board.splice(position , 1, marker);
    }
  }
  
  const getBoard = () => board;

  const resetBoard = () => {
    document.querySelectorAll('.cellBtn').forEach(cell => {
      cell.textContent = "";
    });
    board.forEach((cell,i) => {
      if (cell !== "") {
        board.splice(i, 1, "");
      }
    });
  }
  
  return {updateBoard, getBoard, resetBoard}
  
}

// const game = Gameboard();
// console.log(game.getBoard());

function Player (
playerOneName = "Player one",
playerTwoName = "Player two"
) {
const players = [
{
  name: playerOneName,
  marker: "x",
},
{
  name: playerTwoName,
  marker: "O",
}
]; 

const gameboard = Gameboard();
let currentPlayer = players[0];
let lastPlayerName;

const switchTurn = () => {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
}

const getCurrentPlayer = () => currentPlayer;

const makeMove = (position) => {
  gameboard.updateBoard(position, currentPlayer.marker);
  lastPlayerName = currentPlayer;
  switchTurn();
}

const getLastPlayer = () => lastPlayerName;

return {getCurrentPlayer, makeMove, getLastPlayer}
}

// const p1 = Player(game);
// console.log(p1.getCurrentPlayer());
// p1.makeMove(5);
// console.log(game.getBoard());
// p1.makeMove(0);
// console.log(game.getBoard());
// p1.makeMove(8);
// console.log(game.getBoard());
// p1.makeMove(1);
// console.log(game.getBoard());
// p1.makeMove(3);
// console.log(game.getBoard());
// p1.makeMove(2);
// console.log(game.getBoard());

function GameController() {
let winningCountP1 = 0;
let winningCountP2 = 0;
let gameOver;
const player = Player();
const gameboard = Gameboard();

const getWinningCountP1 = () => winningCountP1;
const getWinningCountP2 = () => winningCountP2;

// const start = () => {
//   gameOver = false;
// }

const checkForTIe = () => {
  const board = gameboard.getBoard();
  let isBoardFull = board.every(position => position !== "");
  console.log("its a tie");
}
const checkForWin = () => {
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  const board = gameboard.getBoard();
  let winningPlayer = player.getLastPlayer();

    for (let i = 0; i < winningCombinations.length; i++) {
      if((board[winningCombinations[i][0]] !== "" && 
        board[winningCombinations[i][1]] !== "" && 
        board[winningCombinations[i][2]] !== "")
      &&
      (board[winningCombinations[i][0]] ===  board[winningCombinations[i][1]] && 
        board[winningCombinations[i][1]] === board[winningCombinations[i][2]] )) {
      console.log(winningPlayer.name + " won");
      if (winningPlayer.name == "Player one") {
        winningCountP1++;
        document.getElementByClass('turn').textContent = player.name + ' wins';
        gameboard.resetBoard();
        
        if (winningCountP1 === 3) {
          setGameOver();
          winningCountP1 = 0;
        }
        
      } else {
        winningCountP2++;
        gameboard.resetBoard();
        
        if (winningCountP2 === 3) {
          setGameOver();
          winningCountP2 = 0;
        }
      }
       }
  }
  
  checkForTie();
}

 const setGameOver = () => {
  console.log("GAME OVER");
   gameOver = true;
  p1Count = getWinningCountP1();
  p2Count = getWinningCountP2();
  
  if (p1Count === 3) {
    console.log("Player 1 won");
    p1Count = 0;
    document.getElementByClass('turn').textContent = player.name + ' wins';
     gameboard.resetBoard();
  } else if (p2Count === 3) {
    console.log("Player 2 won");
    p2Count = 0;
    ocument.getElementByClass('turn').textContent = player.name + ' wins';
    gameboard.resetBoard();
  }
  
}

return {checkForWin, getWinningCountP1, getWinningCountP2}
}

// const gameLogic = GameController();
// gameLogic.checkForWin();
// console.log(gameLogic);
// console.log(gameLogic.getWinningCountP1());

function ScreenController() {
const game = Gameboard();
const player = Player();
const playerTurnDiv = document.querySelector('.turn');
const boardDiv = document.querySelector('.board');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');

const updateScreen = () => {
  boardDiv.textContent = "";
  
  const board = game.getBoard();
  const activePlayer = player.getCurrentPlayer();
  
  playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
  
  board.forEach((cell, i) => {
    console.log(cell);
    const cellBtn = document.createElement('button');
    cellBtn.classList.add('cellBtn');
    console.log(board);
    cellBtn.textContent = cell;
    boardDiv.appendChild(cellBtn);
    
    cellBtn.addEventListener('click', () => {
    console.log('clicked');
      console.log(player.marker);
      cellBtn.textContent = player.marker;
  });

  });
}


startBtn.addEventListener('click', function() {
  updateScreen();
});

resetBtn.addEventListener('click', () => {
  game.resetBoard();
  updateScreen();
})
}


ScreenController();