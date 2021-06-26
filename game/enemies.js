import { Enemy } from "./enemy.js";
export class Enemies {
  constructor(scene) {
    this.scene = scene;
    this.enemies = [];
  }
  init() {
    for (let i = 0; i < 5; i++) {
      this.addEnemy(i, 5);
    }
  }
  enemyCallback(eventName, payload) {
    if (eventName === "outsideScene") {
      this.scene.removeDrawEntity(payload.sceneIndex);
      this.removeEnemy(payload.enemiesIndex);
    }
    if (eventName === "isDestroyed") {
      this.scene.removeDrawEntity(payload.sceneIndex);
      this.removeEnemy(payload.enemiesIndex);
    }
  }
  addEnemy(i, maxIndex) {
    let positionX = Math.random() * this.scene.width;
    if (i) {
      positionX =
        Math.random() * (this.scene.width / maxIndex) +
        i * (this.scene.width / maxIndex);
    }
    console.log("i, maxIndex", i, maxIndex);
    const enemy = new Enemy(
      this.scene.ctx,
      (eventName, payload) => this.enemyCallback(eventName, payload),
      positionX,
      -100,
      80
    );
    console.log("this.scene.ctx", this.scene.ctx);
    this.enemies.push(enemy);
    enemy.enemiesIndex =
      this.enemies.length + Date.now() + Math.round(1000 * Math.random());
    this.scene.addDrawEntity(enemy);
  }
  removeEnemy(enemiesIndex) {
    const index = this.enemies.findIndex(
      (el) => el.enemiesIndex === enemiesIndex
    );
    if (index > -1) {
      this.enemies.splice(index, 1);
      this.addEnemy();
    }
  }
}
