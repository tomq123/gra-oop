import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Scene } from "./scene.js";
import { Projectile } from "./projectile.js";
import { gameConfig } from "./gameConfig.js";

export class Game {
  constructor(canvas, width, height, gameCallback) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.palayer = {};
    this.gameCallback = gameCallback;
    this.projectiles = [];
    this.score = 0;
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
  playerCallback(eventName, payload) {
    if (eventName === "shoot") {
      const projectile = new Projectile(this.ctx, payload.x, payload.y);
      this.projectiles.push(projectile);
      projectile.projectilesIndex =
        this.projectiles.length + Date.now() + Math.round(1000 * Math.random());
      this.scene.addDrawEntity(projectile);
    }
  }
  createPlayer() {
    this.palayer = new Player(
      (eventName, payload) => this.playerCallback(eventName, payload),
      this.ctx,
      500,
      500,
      30,
      "#3592cc"
    );
    this.palayer.draw();
    this.scene.addDrawEntity(this.palayer);
  }
  createEnemies() {
    const enemy1 = new Enemy(this.ctx, 100, 100, 80);
    const enemy2 = new Enemy(this.ctx, 300, 100, 80);
    const enemy3 = new Enemy(this.ctx, 500, 100, 80);
    const enemy31 = new Enemy(this.ctx, 500, -100, 80);
    const enemy32 = new Enemy(this.ctx, 500, -200, 80);
    const enemy4 = new Enemy(this.ctx, 700, 100, 80);
    this.enemies = [enemy1, enemy2, enemy3, enemy4, enemy31, enemy32];
    this.enemies.forEach((enemy) => {
      this.scene.addDrawEntity(enemy);
    });
  }
  drawEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
  }
  updateDraw() {
    this.scene.drawEntities.forEach((enemy) => {
      enemy.draw();
    });
    // this.palayer.draw();
    // this.drawEnemies();
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
  checkEnemiesAndProjectileColision() {
    this.enemies.forEach((enemy) => {
      this.projectiles.forEach((projectile) => {
        const isColision = enemy.checkProjectileColision(
          projectile.x,
          projectile.y
        );
        if (isColision) {
          console.log(
            "this.projectiles",
            this.projectiles,
            projectile.projectilesIndex
          );
          this.scene.removeDrawEntity(projectile.sceneIndex);
          const index = this.projectiles.findIndex(
            (el) => el.projectilesIndex === projectile.projectilesIndex
          );
          if (index > -1) {
            this.projectiles.splice(index, 1);
          }
          this.score += gameConfig.enmey.destroyScore;
          console.log("this.score", this.score);
        }
      });
    });
  }
  animate() {
    this.scene.clear();
    this.enemies.forEach((enemy) => {
      enemy.move();
    });
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.checkEnemiesAndProjectileColision();
    const isColision = this.checkPlayerColision();

    if (isColision) {
      this.gameOver();
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
        event.preventDefault();
        this.scene.clear();
        this.palayer.shoot();
        this.updateDraw();
      }
    });
  }
  gameOver() {
    this.gameCallback("gameOver", {
      score: 777,
    });
  }
}
