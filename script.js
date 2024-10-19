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
    board.fill("");
  }
  
  return {updateBoard, getBoard, resetBoard}
}

function Player (
playerOneName = "Player one",
playerTwoName = "Player two"
) {
const players = [
{
  name: playerOneName,
  marker: "X",
},
{
  name: playerTwoName,
  marker: "O",
}
]; 

let currentPlayer = players[0];
let lastPlayerName;

const switchTurn = () => {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
}

const getCurrentPlayer = () => currentPlayer;
const getLastPlayer = () => lastPlayerName;

return {getCurrentPlayer, getLastPlayer, switchTurn}
}

function GameController() {
let winningCountP1 = 0;
let winningCountP2 = 0;
let gameOver = false;
let lastPlayerName;
let currentPlayer;
const playerTurnDiv = document.querySelector('.turn');
const boardDiv = document.querySelector('.board');
const p1CountDiv = document.querySelector('.P1-count');
const p2CountDiv = document.querySelector('.P2-count');
const gameboard = Gameboard();
const player = Player();

const getWinningCountP1 = () => winningCountP1;
const getWinningCountP2 = () => winningCountP2;
  const getGameOver = () => gameOver;

const start = () => gameOver = false;
const getBoard = () => gameboard.getBoard();
const resetBoard = () => { 
  playerTurnDiv.textContent = "";
  start();
  player.switchTurn();
  gameboard.resetBoard();
}

const makeMove = (position) => {
if (gameOver) return;
currentPlayer = player.getCurrentPlayer();
gameboard.updateBoard(position, currentPlayer.marker);
lastPlayerName = currentPlayer;
player.switchTurn();
}

 
 const getLastPlayer = () => lastPlayerName;

const checkForTie = () => {
  const board = getBoard();
  let isBoardFull = board.every((position) => position !== "");
  if (isBoardFull) {
  console.log("its a tie");
  playerTurnDiv.textContent = "It's a tie";
  boardDiv.textContent = "";
  gameboard.resetBoard();
  setGameOver();
  }
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
  let winningPlayer = getLastPlayer();

    for (let i = 0; i < winningCombinations.length; i++) {
      if((board[winningCombinations[i][0]] !== "" && 
        board[winningCombinations[i][1]] !== "" && 
        board[winningCombinations[i][2]] !== "")
      &&
      (board[winningCombinations[i][0]] ===  board[winningCombinations[i][1]] && 
        board[winningCombinations[i][1]] === board[winningCombinations[i][2]] )) {
        
      console.log(winningPlayer.name + " won");
       playerTurnDiv.textContent = winningPlayer.name + " won";
        
        
      if (winningPlayer.name == "Player one") {
        winningCountP1++;
        p1CountDiv.textContent = winningCountP1;
        
      } else if (winningPlayer.name == "Player two") {
        winningCountP2++;
        p2CountDiv.textContent = winningCountP2;
      }
        
        // gameOver = true;
        setGameOver();
        return;
    }
  }
  
  checkForTie();
}

 const setGameOver = () => {
  console.log("GAME OVER");
  gameOver = true;
  player.switchTurn();
  p1Count = getWinningCountP1();
  p2Count = getWinningCountP2();
}

return {checkForWin, getWinningCountP1, getWinningCountP2, getBoard, 
  resetBoard, makeMove, getCurrentPlayer: player.getCurrentPlayer, getGameOver}
}

function ScreenController() {
const game = GameController();
const playerTurnDiv = document.querySelector('.turn');
const boardDiv = document.querySelector('.board');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
let board;

const updateScreen = () => {
  boardDiv.textContent = "";
  board = game.getBoard();
  board.forEach((cell, i) => {
    console.log(cell);
    const cellBtn = document.createElement('button');
    cellBtn.classList.add('cellBtn');
    cellBtn.textContent = cell;
    boardDiv.appendChild(cellBtn);
    
    cellBtn.addEventListener('click', () => {
if (cellBtn.textContent === "" && !game.getGameOver()) {
  const activePlayer = game.getCurrentPlayer();
  game.makeMove(i);
  game.checkForWin();
  cellBtn.textContent = activePlayer.marker;
  console.log(game.getGameOver());
  if (!game.getGameOver()) {
    playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
  }
}
});


  });
}

startBtn.addEventListener('click', function() {
  updateScreen();
});

resetBtn.addEventListener('click', () => {
  game.resetBoard();
  updateScreen();
});
}


const startGame = ScreenController();