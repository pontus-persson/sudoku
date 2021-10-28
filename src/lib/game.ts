import Utils from './utils';
import Render from './render';
import Board from './board';
import Input from './input';
import Vec2, { IVec2 } from './includes/vec2';

class Game {

  // Submodules
  utils: Utils;
  renderer: Render;
  input: Input;

  dt: number;
  lastUpdate: number;

  board: Board;

  highlight: number;
  selected: Vec2;

  constructor(params: any) {
    this.utils = new Utils(this);
    this.renderer = new Render(params.container, this);
    this.input = new Input(this);
    this.board = new Board(this.renderer);
    this.board.init();
    this.selected = new Vec2(-1, -1);
  }

  init() {
    console.log('init game');

    this.renderer.init();
    this.lastUpdate = Date.now();
    this.board.randomizeBoard();

    setInterval(this.update, 1000/60);
    requestAnimationFrame(this.render);

    document.getElementById('solve').addEventListener('click', (e) => {
      if(this.board.solveBoard(1)) {
        console.log('solved');
      } else {
        alert('Abort abort, probably unsolvable');
      }
    });
    document.getElementById('reset').addEventListener('click', (e) => {
      this.board.randomizeBoard();
    });
  }


  update = () => {
    this.dt = (Date.now() - this.lastUpdate);

    this.lastUpdate = Date.now();
  }


  render = () => {
    requestAnimationFrame(this.render);

    this.renderer.clearBoard();
    this.renderer.drawBoard(this.board);
    this.renderer.drawHighlight(this.highlight, this.board);
    this.renderer.drawSelected(this.selected);
    this.renderer.drawText("dt: "+Math.round(this.dt * 100) / 100, this.renderer.canvas.width - 90, 30);
  }

  keyPress(key: number) {
    // console.log('key', key);
    // Numbers
    if(this.selected.x > -1) {
      if(key < 106 && key > 95) {
        let num = key - 96;
        this.board.tryPut(this.selected.x, this.selected.y, num);
      }
      if(key < 58 && key > 47) {
        let num = key - 48;
        this.board.tryPut(this.selected.x, this.selected.y, num);
      }
    }
    // Enter
    if(key === 13) {
      if(this.board.solveBoard(1)) {
        console.log('solved');
      } else {
        console.log('broken');
      }
    }
    // Space or delete
    if(key === 32 || key == 46) {
      this.board.tryPut(this.selected.x, this.selected.y, 0);
    }
    // Arrows
    if(key === 38) {
      this.selected.y = this.selected.y > 0 ? this.selected.y - 1 : this.selected.y;
    } else if(key === 37) {
      this.selected.x = this.selected.x > 0 ? this.selected.x - 1 : this.selected.x;
    } else if(key === 40) {
      this.selected.y = this.selected.y < 8 ? this.selected.y + 1 : this.selected.y;
    } else if(key === 39) {
      this.selected.x = this.selected.x < 8 ? this.selected.x + 1 : this.selected.x;
    }
  }

  mouseClick(button: number) {
    let bx = Math.floor(this.input.mouse.x / this.renderer.gridSize);
    let by = Math.floor(this.input.mouse.y / this.renderer.gridSize);
    let target = this.board.getTile(bx, by);
    if(button === 0 && bx < 9 && by < 9) {
      this.selected.set(bx, by);
    }
    if(button === 2) {
      this.highlight = target;
    }
    // console.log(button, this.input.mouse);
    // console.log(bx, by, target, button);
  }


}

export default Game;