import { gameConfig } from "./gameConfig.js";
export class Enemy {
  constructor(ctx, x, y, radius, color = gameConfig.enmey.defaultColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.isDestroyed = false;
    this.sceneIndex = null;
  }
  draw() {
    if (!this.isDestroyed) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }
  move() {
    this.y += gameConfig.enmey.speed;
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
      }
    }
    return isColision;
  }
}
