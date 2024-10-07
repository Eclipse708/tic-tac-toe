function Gameboard() {
    const board = Array(9).fill(null);
    
    const updateBoard = (position, marker) => {
      if (board[position] == null) {
        board.splice(position , 1, marker);
      }
    }
    
    const getBoard = () => board;
  
    const resetBoard = () => {
      board.forEach((cell,i) => {
        if (cell !== null) {
          board.splice(i, 1, null);
        }
      });
    }
    
    return {updateBoard, getBoard, resetBoard}
    
}

const game = Gameboard();
console.log(game.getBoard());

function Player (
gameboard,
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

const p1 = Player(game);
console.log(p1.getCurrentPlayer());
p1.makeMove(5);
// // game.resetBoard();
console.log(game.getBoard());
p1.makeMove(0);
console.log(game.getBoard());
p1.makeMove(8);
console.log(game.getBoard());
p1.makeMove(1);
console.log(game.getBoard());
p1.makeMove(3);
console.log(game.getBoard());
p1.makeMove(2);
console.log(game.getBoard());

function GameController(player, gameboard) {
  let winningCountP1 = 0;
  let winningCountP2 = 0;
  const reset = gameboard.resetBoard;
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
    let isBoardFull = board.every(position => position !== null);
    let winningPlayer = player.getLastPlayer();
    if (isBoardFull) {
      console.log("its a tie");
    }else {
    for (let i = 0; i < winningCombinations.length; i++) {
      if((board[winningCombinations[i][0]] !== null && 
          board[winningCombinations[i][1]] !== null && 
          board[winningCombinations[i][2]] !== null)
        &&
        (board[winningCombinations[i][0]] ===  board[winningCombinations[i][1]] && 
          board[winningCombinations[i][1]] === board[winningCombinations[i][2]] )) {
        console.log(winningPlayer.name + " won");
        if (winningPlayer.name == "Player one") {
          winningCountP1++;
          console.log(winningCountP1);
          reset();
        } else {
          winningCountP2++;
          console.log(winningCountP2);
          reset();
          
          if (winningCountP2 == 3) {
            
          }
        }
         }
    }
   }   
  }
  return {checkForWin}
}

const gameLogic = GameController(p1, game);
gameLogic.checkForWin();
console.log(game.getBoard());