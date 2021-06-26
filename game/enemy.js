import { gameConfig } from "./gameConfig.js";
export class Enemy {
  constructor(
    ctx,
    enemyCallback,
    x,
    y,
    radius,
    speedUp,
    color = gameConfig.enmey.defaultColor
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.isDestroyed = false;
    this.sceneIndex = null;
    this.enemiesIndex = null;
    this.enemyCallback = enemyCallback;
    this.image = new Image();
    this.image.src = "../asets/plane.png";
    this.speedUp = speedUp;
  }
  draw() {
    if (!this.isDestroyed) {
      this.ctx.drawImage(
        this.image,
        this.x - this.radius,
        this.y - this.radius,
        this.radius * 2,
        this.radius * 2
      );
    }
  }
  move() {
    this.y += gameConfig.enmey.speed + this.speedUp;
  }
  checkPlayerColision(playerX, playerY, palayerRadius) {
    if (this.isDestroyed) {
      return false;
    }
    const dist = Math.hypot(this.x - playerX, this.y - playerY);
    const isColision = dist < palayerRadius + this.radius;
    if (isColision) {
      this.color = gameConfig.enmey.colisionColor;
    }
    return isColision;
  }
  checkProjectileColision(projectileX, projectileY) {
    if (this.isDestroyed) {
      return false;
    }
    const dist = Math.hypot(this.x - projectileX, this.y - projectileY);
    const isColision = dist < gameConfig.projectile.radius + this.radius;
    if (isColision) {
      this.color = gameConfig.enmey.destroyColor;
      this.radius -= 10;
      if (this.radius < 30) {
        this.isDestroyed = true;
        this.enemyCallback("isDestroyed", {
          sceneIndex: this.sceneIndex,
          enemiesIndex: this.enemiesIndex,
        });
      }
    }
    return isColision;
  }
  checkOutsideScene(height) {
    const isColision = this.y > height + this.radius;
    if (isColision) {
      this.color = "#f00";
      this.enemyCallback("outsideScene", {
        sceneIndex: this.sceneIndex,
        enemiesIndex: this.enemiesIndex,
      });
    }
    return isColision;
  }
}
