import Platform from './classes/Platform';
import Shape from './classes/Shape';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shapes = [];
const platform = new Platform(canvas);
let score = 0;
let isPaused = false;

function movePlatform() {
  ctx.beginPath();
  ctx.fillStyle = '#000000';
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  ctx.lineWidth = 0;
  ctx.stroke();
}


function detectShapeCollision(shape) {
  if (shape.y + shape.height === platform.y) {
    if (shape.x + shape.width > platform.x
      && shape.x + shape.width < platform.x + platform.width + shape.width
    ) {
      shape.hasCollided = true;
    }
  }
}


function moveShapes() {
  shapes.forEach((shape) => {
    if (shape.y > canvas.height) {
      shape.shouldDelete = true;
    }

    if (!shape.hasCollided) {
      detectShapeCollision(shape);
    }

    if (shape.hasCollided) {
      score++;
      shape.shouldDelete = true;
    }

    shape.move();

    ctx.beginPath();
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'yellow');
    gradient.addColorStop(1, 'red');
    ctx.fillStyle = gradient;
    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  });
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

function updateScore() {
  ctx.font = '24px Roboto, sans-serif';
  ctx.fillStyle = 'brown';
  ctx.fillText(score, canvas.width - 50, 34);
}

function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (isPaused) {
    ctx.font = '48px Roboto, sans-serif';
    const text = 'Paused';
    ctx.fillText(text, canvas.width / 2 - (ctx.measureText(text).width / 2), canvas.height / 2);
  } else {
    updateScore();
    movePlatform();
    moveShapes();
    deleteShapes();
    decideOnShapeCreation();
  }
}

function keyboardPress(event) {
  const code = event.keyCode;

  switch (code) {
    case 71: // G
      createShape();
      break;

    case 72: // H
      console.log(shapes);
      break;

    case 32: // Space
      isPaused = !isPaused;
      break;

    default:
      if (!isPaused) {
        platform.move(code);
      }
  }
}

window.addEventListener('keydown', keyboardPress, false);

function initializeGame() {
  // Rate limit game loop
  setInterval(gameLoop, 10);
}

initializeGame();