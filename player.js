import { gameConfig } from "./gameConfig.js";

export class Player {
  constructor(ctx, x, y, radius, color = gameConfig.player.defaultColor) {
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
    this.ctx.strokeRect(
      this.x - this.radius / 4,
      this.y - this.radius,
      this.radius / 2,
      this.radius
    );
  }
  moveUp() {
    this.y -= gameConfig.player.speed;
  }
  moveDown() {
    this.y += gameConfig.player.speed;
  }
  moveLeft() {
    this.x -= gameConfig.player.speed;
  }
  moveRight() {
    this.x += gameConfig.player.speed;
  }
  shoot() {
    console.log("shoot");
  }
}
