import { Projectile } from "./projectile.js";
export class Projectiles {
  constructor(scene) {
    this.scene = scene;
    this.projectiles = [];
  }
  projectileCallback(eventName, payload) {
    if (eventName === "outsideScene") {
      this.scene.removeDrawEntity(payload.sceneIndex);
      this.removeProjectile(payload.projectilesIndex);
    }
    if (eventName === "isDestroyed") {
      this.scene.removeDrawEntity(payload.sceneIndex);
      this.removeProjectile(payload.projectilesIndex);
    }
  }
  addProjectile(x, y) {
    const projectile = new Projectile(
      this.scene.ctx,
      (eventName, payload) => this.projectileCallback(eventName, payload),
      x,
      y
    );
    this.projectiles.push(projectile);
    projectile.projectilesIndex =
      this.projectiles.length + Date.now() + Math.round(1000 * Math.random());
    this.scene.addDrawEntity(projectile);
  }
  removeProjectile(projectilesIndex) {
    const index = this.projectiles.findIndex(
      (el) => el.projectilesIndex === projectilesIndex
    );
    if (index > -1) {
      this.projectiles.splice(index, 1);
    }
  }
}
