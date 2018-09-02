var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var platform;
var object;

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

function moveObject() {
  if (!object.collided) {
    detectObjectCollision();
  }

  if (object.collided) {
    return;
  }

  object.y += object.fallSpeed;

  ctx.beginPath();
  ctx.rect(object.x, object.y, object.width, object.height);
  ctx.lineWidth = 2;
  ctx.stroke();
}

function detectObjectCollision() {
  if (object.y + object.height === platform.y) {
    if (object.x + object.width > platform.x &&
      object.x + object.width < platform.x + platform.width + object.width) {
      object.collided = true;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  movePlatform();
  moveObject();
}
