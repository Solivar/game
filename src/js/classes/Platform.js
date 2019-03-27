export default class {
  constructor(canvas, params) {
    this.canvas = canvas;

    const platformParams = {
      width: 80,
      height: 8,
      x: 10,
      y: canvas.height - 10,
      lineWidth: 7,
      moveSpeed: 10,
      velocity: {
        left: 0,
        right: 0,
      },
      ...params,
    };

    Object.assign(this, platformParams);
  }

  startMovement(keyCode) {
    // Go left
    if (keyCode === 'KeyA' || keyCode === 'ArrowLeft') {
      this.velocity.left = this.moveSpeed;

    // Go right
    } else if (keyCode === 'KeyD' || keyCode === 'ArrowRight') {
      this.velocity.right = this.moveSpeed;
    }
  }

  stopMovement(keyCode) {
    if (keyCode === 'KeyA' || keyCode === 'ArrowLeft') {
      this.velocity.left = 0;

    // Go right
    } else if (keyCode === 'KeyD' || keyCode === 'ArrowRight') {
      this.velocity.right = 0;
    }
  }

  getPosition() {
    this.x += this.velocity.left * -1 + this.velocity.right;

    if (this.x > this.canvas.width - this.width) {
      this.x = this.canvas.width - this.width;
    } else if (this.x < 0) {
      this.x = 0;
    }
  }
}
