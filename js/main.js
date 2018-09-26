console.log('ggg');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var platform = {};
var object = {};
var objects = [];

window.addEventListener('keydown', this.keyboardPress, false);
initializeGame();

function initializeGame() {
  platform = {
    width: 80,
    height: 8,
    y: canvas.height - 10,
    x: 10,
    lineWidth: 7,
    moveSpeed: 10,
  };

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

  if (code === 65 || code === 37) {
    if (platform.x - platform.moveSpeed < 0) {
      platform.x = 0;
    } else {
      platform.x -= platform.moveSpeed;
    }
  } else if (code === 68 || code === 39) {
    if (platform.x + platform.moveSpeed > canvas.width - platform.width) {
      platform.x = canvas.width - platform.width;
    } else {
      platform.x += platform.moveSpeed;
    }
  }
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
