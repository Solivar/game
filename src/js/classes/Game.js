export default class {
  constructor(params) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    const gameParams = {
      isPaused: false,
      isMenuVisible: false,
      score: 0,
      ...params,
    };

    Object.assign(this, gameParams);
  }
}
