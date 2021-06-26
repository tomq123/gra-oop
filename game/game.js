import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { Scene } from "./scene.js";
import { Projectile } from "./projectile.js";
import { gameConfig } from "./gameConfig.js";
import { Enemies } from "./enemies.js";

export class Game {
  constructor(canvas, width, height, gameCallback) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.palayer = {};
    this.gameCallback = gameCallback;
    this.projectiles = [];
    this.score = 0;
    this.isEndGame = false;
  }
  init() {
    this.scene = new Scene(this.canvas, this.width, this.height);
    this.ctx = this.scene.ctx;
    this.enemiesControler = new Enemies(this.scene);
    this.enemiesControler.init();
    this.createPlayer();
    this.addUiController();
    this.animate();
  }
  retry() {
    this.projectiles = [];
    this.score = 0;
    this.palayer = {};
    this.isEndGame = false;
    this.init();
  }
  close() {
    this.scene.clear();
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

  updateDraw() {
    this.scene.drawEntities.forEach((enemy) => {
      enemy.draw();
    });
  }
  checkPlayerColision() {
    const isColision = this.enemiesControler.enemies.some((enemy) => {
      return enemy.checkPlayerColision(
        this.palayer.x,
        this.palayer.y,
        this.palayer.radius
      );
    });
    return isColision;
  }
  checkEnemiesOutsideScene() {
    this.enemiesControler.enemies.forEach((enemy) => {
      return enemy.checkOutsideScene(this.height);
    });
  }
  checkEnemiesAndProjectileColision() {
    this.enemiesControler.enemies.forEach((enemy) => {
      this.projectiles.forEach((projectile) => {
        const isColision = enemy.checkProjectileColision(
          projectile.x,
          projectile.y
        );
        if (isColision) {
          this.scene.removeDrawEntity(projectile.sceneIndex);
          const index = this.projectiles.findIndex(
            (el) => el.projectilesIndex === projectile.projectilesIndex
          );
          if (index > -1) {
            this.projectiles.splice(index, 1);
          }
          this.score += gameConfig.enmey.destroyScore;
          this.gameCallback("setScore", {
            score: this.score,
          });
        }
      });
    });
  }
  animate() {
    this.scene.clear();
    this.enemiesControler.enemies.forEach((enemy) => {
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
    if (this.isEndGame) {
      return false;
    }
    this.checkEnemiesOutsideScene();
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
      score: this.score,
    });
    this.isEndGame = true;
  }
}
