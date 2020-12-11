import Platform from './classes/Platform';
import Circle from './classes/Circle';
import Shape from './classes/Shape';
import Game from './classes/Game';
import * as MenuManager from './menus';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let game;
let platform;
let interval;
let gameStartTime = null;
let lastShapeTime = null;

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
  game.shapes.forEach((shape) => {
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
  const random = Math.floor((Math.random() * 2) + 1);

  if (random === 2) {
    const shape = new Shape();

    shape.x = Math.floor(Math.random() * (canvas.width - shape.width)) + 1;

    game.shapes.push(shape);
  } else {
    const circle = new Circle();

    circle.x = Math.floor(Math.random() * (canvas.width - circle.width)) + 1;

    game.shapes.push(circle);
  }
}

function deleteShapes() {
  game.shapes = game.shapes.filter(shape => !shape.shouldDelete);
}

function decideOnShapeCreation() {
  const currentTimestamp = +new Date();
  const timeBetweenSpawns = 3 * 1000;

  if (lastShapeTime && currentTimestamp - lastShapeTime < timeBetweenSpawns) {
    return;
  }

  if (currentTimestamp - gameStartTime < timeBetweenSpawns) {
    return;
  }

  lastShapeTime = currentTimestamp;

  createShape();
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

function drawGameLevel() {
  if (!platform.health.current && !game.isOver) {
    game.isOver = true;
    MenuManager.showGameOverMenu();
  }

  updateScore();
  movePlatform();
  moveShapes();
  drawHealthBar();
  deleteShapes();
  decideOnShapeCreation();
}

function clearCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function gameLoop() {
  if (game.isPaused) {
    MenuManager.drawMenu(ctx, canvas, 'Paused');
  } else if (game.isOver) {
    MenuManager.drawMenu(ctx, canvas, 'Game Over');
  } else {
    clearCanvas();
    drawGameLevel();
  }
}

function stopGame() {
  clearInterval(interval);
  game = null;
  platform = null;
  gameStartTime = null;
  lastShapeTime = null;
  clearCanvas();
  MenuManager.toggleMainMenu();
  MenuManager.hidePauseMenu();
  MenuManager.hideGameOverMenu();
}

function initializeGame() {
  if (game) {
    stopGame();
  }

  game = new Game();
  platform = new Platform();
  gameStartTime = new Date();
  // Rate limit game loop
  interval = setInterval(gameLoop, 1000 / 60);
}

function startGame() {
  MenuManager.toggleMainMenu();
  initializeGame();
}

function keyDownHandler(event) {
  if (!game) {
    return;
  }

  const { code } = event;

  switch (code) {
    case 'KeyG':
      createShape();
      break;

    case 'KeyH':
      console.log(game.shapes);
      break;

    case 'Space':
      game.togglePause();
      break;

    case 'Escape':
      game.togglePause();
      break;

    default:
      if (!game.isPaused) {
        platform.startMovement(code);
      }
  }
}

function keyUpHandler(event) {
  if (!game) {
    return;
  }

  const { code } = event;
  platform.stopMovement(code);
}

window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

const startGameButtons = document.getElementsByClassName('start-button');
const quitGameButtons = document.getElementsByClassName('quit-button');

Array.from(startGameButtons).forEach(button => button.addEventListener('click', startGame));
Array.from(quitGameButtons).forEach(button => button.addEventListener('click', stopGame));
