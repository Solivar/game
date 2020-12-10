export const showPauseMenu = () => {
  const pauseElement = document.getElementById('pause');

  pauseElement.classList.remove('hidden');
};

export const hidePauseMenu = () => {
  const pauseElement = document.getElementById('pause');

  pauseElement.classList.add('hidden');
};

export const showGameOverMenu = () => {
  const pauseElement = document.getElementById('game-over');

  pauseElement.classList.remove('hidden');
};

export const hideGameOverMenu = () => {
  const pauseElement = document.getElementById('game-over');

  pauseElement.classList.add('hidden');
};

export const toggleMainMenu = () => {
  const menuElement = document.getElementById('menu');

  menuElement.classList.toggle('hidden');
};

export const drawMenu = (ctx, canvas, text) => {
  ctx.font = '48px Roboto, sans-serif';
  ctx.fillText(text, canvas.width / 2 - (ctx.measureText(text).width / 2), canvas.height / 2 - 100);
};
