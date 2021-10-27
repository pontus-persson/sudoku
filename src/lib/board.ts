import Render from './render';

class Section {

  public grid: number[][];

  constructor() {

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if(this.grid[x] === undefined) this.grid[x] = [];
        this.grid[x][y] = 0;
      }
    }

  }

}


class Board {

  public grid: any[][];
  public sections: Section[][];
  private renderer: Render;

  constructor(render: Render) {
    this.renderer = render;
  }

  init() {
    this.grid = [];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if(this.grid[x] === undefined) this.grid[x] = [];
        this.grid[x][y] = 0;
      }
    }
  }

  
  
  randomizeBoard() {

    let x = 5, y = 5;
    let loops = 0;

    if(this.solveBoard(x, y, 1))
    {
      console.log('solved');
    } else {
      console.log('broken');
    }

  }

  solveBoard(x: number, y: number, depth: number) : boolean {

    if(depth > 1500) return true;
    if(x < 0 || y < 0 || x > 8 || y > 9) return true;
    // if(this.grid[x][y] !== 0) return true;
    if(this.isConstrained(x, y)) return false;
    
    console.log(depth);

    // fix this to only have available left in section?
    let available = [1,2,3,4,5,6,7,8,9];
    let solved = false;
    while(available.length > 0 && !solved) {
      let num = available.splice(Math.floor(Math.random() * available.length), 1);
      this.renderer.drawBoard(this);
      this.grid[x][y] = num;
      if(
        this.solveBoard(x,y-1,depth+1) &&
        this.solveBoard(x,y+1,depth+1) &&
        this.solveBoard(x-1,y,depth+1) &&
        this.solveBoard(x+1,y,depth+1)
      ) {
        solved = true;
      }
    }

    return true;
  }

  isConstrained(tx: number, ty: number) : boolean {
    if(this.grid[tx][ty] === 0) return false;
    for (let y = 0; y < 9; y++) {
      if(y === ty) continue;
      if(this.grid[tx][y] === this.grid[tx][ty]) return true;
    }
    for (let x = 0; x < 9; x++) {
      if(x === tx) continue;
      if(this.grid[x][ty] === this.grid[tx][ty]) return true;
    }
    return false;
  }


}


export default Board;