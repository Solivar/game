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
}

export default Circle;
