import { Game } from "./game/game.js";
import { GameOverModal } from "./gameOverModal/gameOverModal.js";
const canvas = document.getElementById("game-canvas");
const gameScoreEl = document.getElementById("game-score");

const gameOverModal = new GameOverModal(gameOverModalCallback);

const game = new Game(
  canvas,
  window.innerWidth,
  window.innerHeight,
  gameCallback
);
game.init();

function gameCallback(eventName, payload) {
  if (eventName === "gameOver") {
    gameOverModal.show();
  }
  if (eventName === "setScore") {
    gameScoreEl.innerText = payload.score;
  }
}
function gameOverModalCallback(eventName, payload) {
  if (eventName === "retry") {
    game.retry();
  }
  if (eventName === "close") {
    game.close();
  }
}
