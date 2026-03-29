import { TicTacToe } from "./TicTacToe.mjs";

const status = document.querySelector("#status");
const resetBtn = document.querySelector(".reset-btn");

let isO = false; // false = X, true = O
let gameOver = false;

const game = new TicTacToe(".game-container");
const board = Array(9).fill(null);

// ------------------ INIT ------------------
const startGame = () => {
  game.background = "transparent";
  game.drawBoard();
  status.textContent = "Player X's Turn";
};

// ------------------ HELPERS ------------------
const roundNumber = (n) => {
  if (n < 100) return 50;
  if (n < 200) return 150;
  return 250;
};

const getIndex = (x, y) => {
  const map = [
    [50, 50],
    [150, 50],
    [250, 50],
    [50, 150],
    [150, 150],
    [250, 150],
    [50, 250],
    [150, 250],
    [250, 250],
  ];

  return map.findIndex(([mx, my]) => mx === x && my === y);
};

// ------------------ CLICK ------------------
game.canvas.onmousedown = (e) => {
  if (gameOver) return;

  const x = roundNumber(e.offsetX);
  const y = roundNumber(e.offsetY);
  const index = getIndex(x, y);

  // prevent overwrite
  if (board[index]) return;

  // draw move
  if (isO) {
    game.drawO(x, y);
    board[index] = "O";
  } else {
    game.drawX(x, y);
    board[index] = "X";
  }

  // check win
  const winInfo = game.getWinInfo(board);

  if (winInfo) {
    gameOver = true;

    game.drawWinLine(winInfo);
    status.textContent = `Player ${isO ? "O" : "X"} Wins!`;
    return;
  }

  // check draw
  if (!board.includes(null)) {
    gameOver = true;
    status.textContent = "Draw!";
    return;
  }

  // switch turn
  isO = !isO;
  status.textContent = `Player ${isO ? "O" : "X"}'s Turn`;
};

// ------------------ RESET ------------------
resetBtn.onclick = () => {
  document.location.reload();
  isO = false;
  gameOver = false;

  startGame();
};

// ------------------ START ------------------
startGame();
