import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Scene } from "./scene.js";

export class Game {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.palayer = {};
  }
  init() {
    this.scene = new Scene(this.canvas, this.width, this.height);
    this.ctx = this.scene.ctx;
    console.log("this.ctx", this.ctx);
    this.createPlayer();
    this.createEnemies();
    this.addUiController();
    this.animate();
  }
  createPlayer() {
    this.palayer = new Player(this.ctx, 500, 500, 30, "#3592cc");
    this.palayer.draw();
  }
  createEnemies() {
    const enemy1 = new Enemy(this.ctx, 100, 100, 80);
    const enemy2 = new Enemy(this.ctx, 300, 100, 80);
    const enemy3 = new Enemy(this.ctx, 500, 100, 80);
    const enemy4 = new Enemy(this.ctx, 700, 100, 80);
    this.enemies = [enemy1, enemy2, enemy3, enemy4];
  }
  drawEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }
  updateDraw() {
    this.palayer.draw();
    this.drawEnemies();
  }
  checkPlayerColision() {
    const isColision = this.enemies.some((enemy) => {
      return enemy.checkPlayerColision(
        this.palayer.x,
        this.palayer.y,
        this.palayer.radius
      );
    });
    return isColision;
  }
  animate() {
    this.scene.clear();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    const isColision = this.checkPlayerColision();

    if (isColision) {
      console.log("game over");
    }
    this.updateDraw();
    window.requestAnimationFrame(() => this.animate());
  }
  addUiController() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyW") {
        this.scene.clear();
        this.palayer.moveUp();
        this.updateDraw();
      }
      if (event.code === "KeyS") {
        this.scene.clear();
        this.palayer.moveDown();
        this.updateDraw();
      }
      if (event.code === "KeyA") {
        this.scene.clear();
        this.palayer.moveLeft();
        this.updateDraw();
      }
      if (event.code === "KeyD") {
        this.scene.clear();
        this.palayer.moveRight();
        this.updateDraw();
      }
      if (event.code === "Space") {
        this.scene.clear();
        this.palayer.shoot();
        this.updateDraw();
      }
    });
  }
}
