export class GameOverModal {
  constructor(gameOverModalCallback) {
    this.gameOverModalCallback = gameOverModalCallback;
    this.gameOverModalEl = document.getElementById("game-over-modal");
    this.gameOverModalButtonCloseEl = document.getElementById(
      "game-over-button-close"
    );
    this.gameOverModalButtonRetryEl = document.getElementById(
      "game-over-button-retry"
    );
    this.addListeners();
  }
  show() {
    this.gameOverModalEl.classList.add("show");
  }
  hide() {
    this.gameOverModalEl.classList.remove("show");
  }
  close() {
    this.hide();
    this.gameOverModalCallback("close");
  }
  retry() {
    this.hide();
    this.gameOverModalCallback("retry");
  }
  addListeners() {
    this.gameOverModalButtonCloseEl.addEventListener("click", () => {
      this.close();
    });

    this.gameOverModalButtonRetryEl.addEventListener("click", () => {
      this.retry();
    });
  }
}
