import { Game } from "./game/game.js";
import { GameOverModal } from "./gameOverModal/gameOverModal.js";
const canvas = document.getElementById("game-canvas");
const gameOverModal = new GameOverModal();

const gameCallback = function (eventName, payload) {
  if (eventName === "gameOver") {
    gameOverModal.show();
  }
};
const game = new Game(
  canvas,
  window.innerWidth,
  window.innerHeight,
  gameCallback
);
game.init();
