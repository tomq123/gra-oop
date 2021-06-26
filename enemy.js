import { gameConfig } from "./gameConfig.js";
export class Enemy {
  constructor(ctx, x, y, radius, color = gameConfig.enmey.defaultColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  move() {
    this.y += gameConfig.enmey.speed;
  }
  checkPlayerColision(playerX, playerY, palayerRadius) {
    const dist = Math.hypot(this.x - playerX, this.y - playerY);
    const isColision = dist < palayerRadius + this.radius;
    if (isColision) {
      this.color = gameConfig.enmey.colisionColor;
    }
    return isColision;
  }
}
