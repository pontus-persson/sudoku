import Game from './game';
import Board from './board';

class Render {

  containerID: string;
  canvas: any;
  ctx: any;
  game: Game;
  boardsize: number;
  gridSize: number;

  constructor(container: string, game: Game) {
    this.containerID = container;
    this.game = game;
  }

  // init rendering stuff
  public init() {
    this.canvas = document.createElement('canvas');
    document.getElementById(this.containerID).appendChild(this.canvas); // add Canvas element to container
    this.ctx = this.canvas.getContext('2d');
    this.resize(false);

    window.onresize = (e) => {
      this.resize(e);
    }
  }

  clearBoard = () => {

    // clear canvas
    this.ctx.resetTransform();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw board
    this.ctx.strokeStyle = "rgb(255,255,255)";

    this.ctx.strokeRect(1, 1, this.boardsize-1, this.boardsize-1);

    
    for (let y = 0; y < 9; y++) {
      if(y % 3 === 0) this.ctx.lineWidth = 5;
      else this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0,y*this.gridSize);
      this.ctx.lineTo(this.boardsize, y*this.gridSize);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (let x = 0; x < 9; x++) {
      if(x % 3 === 0) this.ctx.lineWidth = 5;
      else this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(x*this.gridSize,0);
      this.ctx.lineTo(x*this.gridSize, this.boardsize);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  drawBoard(board: Board) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        this.drawText(""+board.grid[x][y], x * this.gridSize + (this.gridSize / 2.2), y * this.gridSize + (this.gridSize / 1.8));
      }
    }
  }

  drawText(text: string, x: number, y: number) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText(text, x, y);
  }


  // handle resize event
  resize(e: any) {
    console.log('resize', e);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.boardsize = Math.min(this.canvas.width, this.canvas.height);
    this.gridSize = this.boardsize / 9;
  }


}


export default Render;