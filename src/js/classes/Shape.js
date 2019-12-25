export default class {
  constructor(canvas, params) {
    this.canvas = canvas;

    const shapeParams = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      fallSpeed: 1.5,
      hasCollided: false,
      shouldDelete: false,
      damage: 10,
      ...params,
    };

    Object.assign(this, shapeParams);
  }

  move() {
    this.y += this.fallSpeed;
  }
}
