export default class {
  constructor(params) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const gameParams = {
      isPaused: false,
      isOver: false,
      score: 0,
      shapes: [],
      ...params,
    };

    Object.assign(this, gameParams);
  }

  togglePause() {
    this.isPaused = !this.isPaused;

    const pauseElement = document.getElementById('pause');

    pauseElement.classList.toggle('hidden');
  }
}
