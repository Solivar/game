import Platform from './classes/Platform';
import Shape from './classes/Shape';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let shapes = [];
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
  } else if(code === 72) {
    console.log(shapes);

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
    if (shape.y > canvas.height) {
      shape.shouldDelete = true;
    }

    if (!shape.hasCollided) {
      detectShapeCollision(shape);
    }

    if (shape.hasCollided) {
      // TODO: Add score and exp
      shape.shouldDelete = true;
      continue;
    }

    shape.move();

    ctx.beginPath();
    ctx.rect(shape.x, shape.y, shape.width, shape.height);
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function detectShapeCollision(shape) {
  if (shape.y + shape.height === platform.y) {
    if (shape.x + shape.width > platform.x &&
      shape.x + shape.width < platform.x + platform.width + shape.width) {
        shape.hasCollided = true;
    }
  }
}

function createShape() {
  const shape = new Shape();
  shape.x = Math.floor(Math.random() * (canvas.width - shape.width)) + 1;

  shapes.push(shape);
}

function deleteShapes() {
  shapes = shapes.filter(shape => !shape.shouldDelete);
}

function decideOnShapeCreation() {
  const number = Math.floor(Math.random() * 30000) + 1;

  if (number <= 100) {
    createShape();
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  movePlatform();
  moveShapes();
  deleteShapes();
  decideOnShapeCreation();
}

initializeGame();
