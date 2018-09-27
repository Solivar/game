import Platform from './Platform';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var object = {};
var objects = [];
let platform = new Platform(canvas);

window.addEventListener('keydown', keyboardPress, false);

function initializeGame() {
  object = {
    x: 100,
    y: 0,
    width: 50,
    height: 50,
    fallSpeed: 1.5,
    collided: false,
  };

  // Rate limit game loop
  setInterval(gameLoop, 10);
}

function keyboardPress(event) {
  var code = event.keyCode;
  platform.move(code);
}

function movePlatform() {
  ctx.beginPath();
  ctx.rect(platform.x, platform.y, platform.width, platform.height);
  ctx.lineWidth = 0;
  ctx.stroke();
}

function moveObjects() {
  for (var i = 0; i < objects.length; i++) {
    moveObject(objects[i]);
  }
}

function moveObject(object) {
  if (!object.collided) {
    detectObjectCollision(object);
  }

  if (object.collided) {
    // TODO: Add score and exp
    // TODO: remove from objects array
    return;
  }

  object.y += object.fallSpeed;

  ctx.beginPath();
  ctx.rect(object.x, object.y, object.width, object.height);
  ctx.lineWidth = 2;
  ctx.stroke();
}

function detectObjectCollision(object) {
  if (object.y + object.height === platform.y) {
    if (object.x + object.width > platform.x &&
      object.x + object.width < platform.x + platform.width + object.width) {
      object.collided = true;
    }
  }
}

function createObject() {
  var object = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    fallSpeed: 1.5,
    collided: false,
  };

  object.x = Math.floor(Math.random() * (canvas.width - object.width)) + 1

  objects.push(object);
}

function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  movePlatform();
  moveObjects();
}

initializeGame();
