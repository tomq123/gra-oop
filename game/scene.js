export class Scene {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = canvas.getContext("2d");
    this.drawEntities = [];
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  addDrawEntity(entity) {
    this.drawEntities.push(entity);
    entity.sceneIndex =
      this.drawEntities.length + Date.now() + Math.round(1000 * Math.random());
  }
  removeDrawEntity(sceneIndex) {
    const index = this.drawEntities.findIndex(
      (el) => el.sceneIndex === sceneIndex
    );
    if (index > -1) {
      this.drawEntities.splice(index, 1);
    }
  }
  updateDraw() {
    this.clear();
    this.drawEntities.forEach((entity) => {
      entity.draw();
    });
  }
}
