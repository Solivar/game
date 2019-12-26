import Platform from './classes/Platform';
import Circle from './classes/Circle';
import Shape from './classes/Shape';
import Game from './classes/Game';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shapes = [];
const game = new Game();
const platform = new Platform();

function movePlatform() {
  platform.getPosition();

  ctx.beginPath();
  ctx.fillStyle = '#000000';
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  ctx.lineWidth = 0;
  ctx.stroke();
}


function detectShapeCollision(shape) {
  shape.detectCollision(platform);
}


function moveShapes() {
  shapes.forEach((shape) => {
    if (shape.y > canvas.height) {
      shape.shouldDelete = true;
      platform.takeDamage(shape.damage);
    }

    if (!shape.hasCollided) {
      detectShapeCollision(shape);
    }

    if (shape.hasCollided) {
      game.score++;
      shape.shouldDelete = true;
    }

    shape.move();
    shape.draw();
  });
}


function createShape() {
  const shape = new Shape();
  const circle = new Circle();
  shape.x = Math.floor(Math.random() * (canvas.width - shape.width)) + 1;
  circle.x = Math.floor(Math.random() * (canvas.width - shape.width)) + 1;

  shapes.push(shape);
  shapes.push(circle);
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


function drawHealthBar() {
  const healthPercentage = platform.health.current / platform.health.max;
  ctx.beginPath();
  ctx.rect(20, 20, 150, 20);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 20, 150, 20);
  ctx.fillStyle = '#ff1414';
  ctx.fillRect(20, 20, 150 * healthPercentage, 20);
  ctx.stroke();
}


function updateScore() {
  ctx.font = '24px Roboto, sans-serif';
  ctx.fillStyle = 'brown';
  ctx.fillText(game.score, canvas.width - 50, 34);
}


function toggleMenuVisibility() {
  game.isMenuVisible = !game.isMenuVisible;

  const menuElement = document.getElementById('menu');

  menuElement.classList.toggle('hidden');
}


function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  if (game.isPaused) {
    ctx.font = '48px Roboto, sans-serif';
    const text = 'Paused';
    ctx.fillText(text, canvas.width / 2 - (ctx.measureText(text).width / 2), canvas.height / 2);
  } else {
    updateScore();
    movePlatform();
    moveShapes();
    drawHealthBar();
    deleteShapes();
    decideOnShapeCreation();
  }
}


function keyDownHandler(event) {
  const { code } = event;

  switch (code) {
    case 'KeyG': // G
      createShape();
      break;

    case 'KeyH': // H
      console.log(shapes);
      break;

    case 'Space': // Space
      game.isPaused = !game.isPaused;
      break;

    case 'Escape':
      toggleMenuVisibility();
      break;

    default:
      if (!game.isPaused) {
        platform.startMovement(code);
      }
  }
}

function keyUpHandler(event) {
  const { code } = event;
  platform.stopMovement(code);
}

window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

function initializeGame() {
  // Rate limit game loop
  setInterval(gameLoop, 1000 / 60);
}

initializeGame();
