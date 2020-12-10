export default class {
  constructor(params) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const gameParams = {
      isPaused: false,
      isMenuVisible: true,
      score: 0,
      state: 'menu',
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
