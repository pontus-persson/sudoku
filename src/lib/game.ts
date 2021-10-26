import Utils from './utils';
import Render from './render';
import Board from './board';

class Game {

  // Submodules
  utils: Utils;
  renderer: Render;

  dt: number;
  lastUpdate: number;

  board: Board;

  constructor(params: any) {
    this.utils = new Utils(this);
    this.renderer = new Render(params.container, this);
    this.board = new Board(this.renderer);

    this.board.init();
  }

  init() {
    console.log('init game');

    this.renderer.init(); 
    this.lastUpdate = Date.now();

    this.board.randomizeBoard();

    setInterval(this.update, 1000/60);
    requestAnimationFrame(this.render);
  }


  update = () => {
    this.dt = (Date.now() - this.lastUpdate);

    this.lastUpdate = Date.now();
  }


  render = () => {
    requestAnimationFrame(this.render);

    this.renderer.clearBoard();

    this.renderer.drawBoard(this.board);

    this.renderer.drawText("dt: "+Math.round(this.dt * 100) / 100, 5, 30);

  }

}

export default Game;