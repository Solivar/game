export default class {
  constructor(params) {
    this.canvas = document.getElementById('canvas');

    const platformParams = {
      health: {
        max: 100,
        current: 100,
      },
      width: 80,
      height: 8,
      x: 10,
      y: this.canvas.height - 10,
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

  takeDamage(damage) {
    this.health.current -= damage;

    if (this.health.current < 0) {
      this.health.current = 0;
    }
  }
}
