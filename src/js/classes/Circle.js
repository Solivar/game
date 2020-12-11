import Shape from './Shape';


class Circle extends Shape {
  draw() {
    this.ctx.beginPath();
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    const radius = this.width / 2;
    gradient.addColorStop(0, '#00ddff');
    gradient.addColorStop(1, '#00ff91');
    this.ctx.fillStyle = gradient;
    this.ctx.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  detectCollision(platform) {
    let platformCollidingEdgeX = this.x;
    let platformCollidingEdgeY = this.y;

    if (this.x < platform.x) {
      platformCollidingEdgeX = platform.x;
    } else if (this.x > platform.x + platform.width) {
      platformCollidingEdgeX = platform.x + platform.width;
    }

    if (this.y < platform.y) {
      platformCollidingEdgeY = platform.y;
    } else if (this.y > platform.y + platform.height) {
      platformCollidingEdgeY = platform.y + platform.height;
    }

    const changeInX = this.x - platformCollidingEdgeX;
    const changeInY = this.y - platformCollidingEdgeY;

    const distance = Math.sqrt((changeInX ** 2) + (changeInY ** 2));

    if (distance <= this.width / 2) {
      this.hasCollided = true;
    }
  }
}

export default Circle;
