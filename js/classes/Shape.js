export default class {
  constructor(canvas, params) {
    this.canvas = canvas;

    let shapeParams = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      fallSpeed: 1.5,
      collided: false,
      ...params,
    };

    Object.assign(this, shapeParams);
  }
};
