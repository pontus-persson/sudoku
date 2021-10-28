import Game from './game';
import Board from './board';
import Vec2 from './includes/vec2';

class Render {

  containerID: string;
  canvas: any;
  ctx: any;
  game: Game;
  public boardsize: number;
  public gridSize: number;

  constructor(container: string, game: Game) {
    this.containerID = container;
    this.game = game;
  }

  // init rendering stuff
  public init() {
    this.canvas = document.createElement('canvas');
    this.canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
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
    this.ctx.strokeStyle = "rgb(255,25,255)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(1, 1, this.boardsize-1, this.boardsize-1);

    for (let y = 0; y < 9; y++) {
      if(y % 3 === 0) {
        this.ctx.strokeStyle = "rgb(255,25,255)";
        this.ctx.lineWidth = 3;
      } else {
        this.ctx.strokeStyle = "rgb(255,255,255)";
        this.ctx.lineWidth = 1;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(0,y*this.gridSize);
      this.ctx.lineTo(this.boardsize, y*this.gridSize);
      this.ctx.closePath();
      this.ctx.stroke();
    }

    for (let x = 0; x < 9; x++) {
      if(x % 3 === 0) {
        this.ctx.strokeStyle = "rgb(255,25,255)";
        this.ctx.lineWidth = 3;
      } else {
        this.ctx.strokeStyle = "rgb(255,255,255)";
        this.ctx.lineWidth = 1;
      }
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
        if(board.grid[y][x] > 0) {
          this.drawText(""+board.grid[y][x], x * this.gridSize + (this.gridSize / 2.2), y * this.gridSize + (this.gridSize / 1.8));
        }
      }
    }
  }

  drawHighlight(highlight: number, board: Board) {
    if(!highlight) return;

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if(board.grid[y][x] === highlight) {
          this.ctx.strokeStyle = "rgba(25,25,255,0.5)";
          this.ctx.lineWidth = 5;
          this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize-1, this.gridSize-1);
        }
      }
    }
  }

  drawSelected(target: Vec2) {
    this.ctx.strokeStyle = "rgba(25,225,25,5)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(target.x * this.gridSize, target.y * this.gridSize, this.gridSize-1, this.gridSize-1);
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