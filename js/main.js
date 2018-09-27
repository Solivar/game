import Platform from './classes/Platform';
import Shape from './classes/Shape';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const shapes = [];
const platform = new Platform(canvas);

window.addEventListener('keydown', keyboardPress, false);

function initializeGame() {
  // Rate limit game loop
  setInterval(gameLoop, 10);
}

function keyboardPress(event) {
  var code = event.keyCode;

  if (code === 71) {
    createShape();

    return;
  }
  platform.move(code);
}

function movePlatform() {
  ctx.beginPath();
  ctx.rect(platform.x, platform.y, platform.width, platform.height);
  ctx.lineWidth = 0;
  ctx.stroke();
}

function moveShapes() {
  for (const shape of shapes) {
    moveShape(shape);
  }
}

function moveShape(shape) {
  if (!shape.collided) {
    detectShapeCollision(shape);
  }

  if (shape.collided) {
    // TODO: Add score and exp
    // TODO: remove from shape array
    return;
  }

  shape.y += shape.fallSpeed;

  ctx.beginPath();
  ctx.rect(shape.x, shape.y, shape.width, shape.height);
  ctx.lineWidth = 2;
  ctx.stroke();
}

function detectShapeCollision(shape) {
  if (shape.y + shape.height === platform.y) {
    if (shape.x + shape.width > platform.x &&
      shape.x + shape.width < platform.x + platform.width + shape.width) {
        shape.collided = true;
    }
  }
}

function createShape() {
  const shape = new Shape();
  shape.x = Math.floor(Math.random() * (canvas.width - shape.width)) + 1;

  shapes.push(shape);
}

function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  movePlatform();
  moveShapes();
}

initializeGame();
