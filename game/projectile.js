import { gameConfig } from "./gameConfig.js";
export class Projectile {
  constructor(ctx, x, y, color = gameConfig.projectile.defaultColor) {
    this.x = x;
    this.y = y;
    this.radius = gameConfig.projectile.radius;
    this.color = color;
    this.ctx = ctx;
    this.projectilesIndex = null;
    this.sceneIndex = null;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  update() {
    this.y -= gameConfig.projectile.speed;
  }
  destroy() {}
}
