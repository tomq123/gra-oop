export class Scene {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = canvas.getContext("2d");
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
