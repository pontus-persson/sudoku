import Render from './render';
import Vec2, { IVec2 } from './includes/vec2';

// class Section {
//   public grid: number[][];
//   constructor() {
//     for (let x = 0; x < 3; x++) {
//       for (let y = 0; y < 3; y++) {
//         if(this.grid[y] === undefined) this.grid[y] = [];
//         this.grid[y][x] = 0;
//       }
//     }
//   }
// }

// 1. Create a grid with the dimension of the output, and each slot contains a list of possible modules.
// 2. Initialize the grid in a completely unobserved state, i.e. with all modules added to all slots’ possibility spaces.
// 3. Repeat the following steps: Observation: Find the slot with the lowest entropy. Entropy is a measurement of uncertainty and disorder.
//    In general, a slot with high entropy is one with lots of possible tiles remaining in its wavefunction. Which tile it will eventually collapse
//    to is still very uncertain. By contrast, a square with low entropy is one with few possible tiles remaining in its wavefunction.
//    Which tile it will eventually collapse to is already very constrained. In our case, find the slot with the smallest possibility space.
//    If multiple slots are tied, select one of those at random. If all slots only have one module left in their possibility space or all modules
//    only have zero modules left. Break the cycle and go to step 4. Collapse this slot’s possibility space at random down to a single module.
//    This is done by removing all but one module from the possibility space. As they are removed they start a chain reaction that reduces the
//    size of neighbouring possibility spaces. Propagation: propagate the information gained on the previous observation step. The propagation
//    step propagates through the whole grid and checks if changes made in the observation step aﬀect the possibility space of the neighbouring slots.
//    The propagation step is the most expensive part of the algorithm and is recursive and dependent on the size of the grid. In the simplest
//    approach, it propagates through every single slot in the grid each time a change in a possibility space happens
// 4. By now all the slots possibility space either contains exactly one module or they all contain exactly zero modules. If all slots contain
//    zero modules, the algorithm has hit a contradiction and the result should be discarded. If the slots all contain one module, the algorithm
//    is completed and the result can be returned.


// entropy = available.length
//
// class Node {
//   public available: number[];
//   // public available: [];
// }


class Board {

  public grid: any[][];
  private renderer: Render;

  constructor(render: Render) {
    this.renderer = render;
  }

  init() {
    this.grid = [];
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if(this.grid[y] === undefined) this.grid[y] = [];
        this.grid[y][x] = 0;
      }
    }
  }

  tryPut(x:number, y: number, num: number) {
    if(this.isPossible(x, y, num)) {
      this.grid[y][x] = num;
    }
  }

  randomizeBoard() {
    // TODO: Get a always solvabe board by just randomizing a solved one and remove random slots?
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if(Math.random() < 0.1) {
          let rand = Math.round(Math.random()*9);
          if(this.isPossible(x, y, rand)) {
            this.grid[y][x] = rand;
          }
        } else {
          this.grid[y][x] = 0;
        }
      }
    }
  }

  solveBoard(depth: number) : boolean {
    if(depth > 100) return true; // infinite loop protection
    let pos = this.getEmptySlot();
    if(pos.x < 0) return true;

    console.log('solving... depth: ', depth);

    let available = [1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < available.length; i++) {
      const num = available[i];

      if (this.isPossible(pos.x, pos.y, num)) {
        this.grid[pos.y][pos.x] = num;
        this.renderer.drawBoard(this);
        if(this.solveBoard(depth+1)) {
          return true;
        }
        this.grid[pos.y][pos.x] = 0;
      }
    }

    return false;
  }

  getEmptySlot() : Vec2 {
    let ret = new Vec2(-1, -1);
    let stop = false;
    for (let x = 0; x < 9 && !stop; x++) {
      for (let y = 0; y < 9 && !stop; y++) {
        if(this.grid[y][x] === 0) {
          stop = true;
          ret.set(x, y);
        }
      }
    }
    return ret;
  }

  isPossible(tx: number, ty: number, num: number) : boolean {
    if(num === 0) return true;
    for (let y = 0; y < 9; y++) {
      if(y === ty) continue;
      if(this.grid[y][tx] === num) return false;
    }
    for (let x = 0; x < 9; x++) {
      if(x === tx) continue;
      if(this.grid[ty][x] === num) return false;
    }
    let sx = tx - tx % 3;
    let sy = ty - ty % 3;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if(this.grid[sy+y][sx+x] === num) return false;
      }
    }
    return true;
  }

  getTile(x: number, y: number): number {
    return this.grid[y][x];
  }

}


export default Board;