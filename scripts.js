import { Game } from "./game.js";
import { GameOverModal } from "./gameOverModal/gameOverModal.js";
const canvas = document.getElementById("game-canvas");
const game = new Game(canvas, window.innerWidth, window.innerHeight);
game.init();
const gameOverModal = new GameOverModal();
gameOverModal.show();
