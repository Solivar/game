export default class {
  constructor(params) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

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

  draw() {
    this.ctx.beginPath();
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, 'red');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  detectCollision(platform) {
    if (this.y + this.height === platform.y) {
      if (this.x + this.width > platform.x
        && this.x + this.width < platform.x + platform.width + this.width
      ) {
        this.hasCollided = true;
      }
    }
  }
}
