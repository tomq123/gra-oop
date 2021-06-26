import { gameConfig } from "./gameConfig.js";
export class Projectile {
  constructor(
    ctx,
    projectileCallback,
    x,
    y,
    color = gameConfig.projectile.defaultColor
  ) {
    this.x = x;
    this.y = y;
    this.radius = gameConfig.projectile.radius;
    this.color = color;
    this.ctx = ctx;
    this.projectilesIndex = null;
    this.sceneIndex = null;
    this.projectileCallback = projectileCallback;
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
  checkOutsideScene() {
    const isColision = this.y < 0;
    if (isColision) {
      this.projectileCallback("outsideScene", {
        sceneIndex: this.sceneIndex,
        projectilesIndex: this.projectilesIndex,
      });
    }
    return isColision;
  }
}
