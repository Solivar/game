export default class {
  constructor(canvas, params) {
    this.canvas = canvas;

    let platformParams = {
      width: 80,
      height: 8,
      x: 10,
      y: canvas.height - 10,
      lineWidth: 7,
      moveSpeed: 10,
      ...params,
    };

    Object.assign(this, platformParams);
  }

  move(keyCode) {
    // Go left
    if (keyCode === 65 || keyCode === 37) {
      if (this.x - this.moveSpeed < 0) {
        this.x = 0;
      } else {
        this.x -= this.moveSpeed;
      }

    // Go right
    } else if (keyCode === 68 || keyCode === 39) {
      if (this.x + this.moveSpeed > this.canvas.width - this.width) {
        this.x = this.canvas.width - this.width;
      } else {
        this.x += this.moveSpeed;
      }
    }
  }
};
