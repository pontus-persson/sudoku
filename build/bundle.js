webpackJsonp([0],[
/* 0 */
/*!**********************************!*\
  !*** ./src/lib/includes/vec2.ts ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Vec2 =
/** @class */
function () {
  function Vec2(x, y) {
    if (x === void 0) {
      x = 0;
    }

    if (y === void 0) {
      y = 0;
    }

    this.x = x;
    this.y = y;
  }

  Vec2.prototype.copy = function () {
    return new Vec2(this.x, this.y);
  };

  Vec2.prototype.len = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  Vec2.prototype.set = function (x, y) {
    this.x = x;
    this.y = y;
    return this;
  };

  Vec2.prototype.setVec = function (vec) {
    this.x = vec.x;
    this.y = vec.y;
    return this;
  };

  Vec2.prototype.add = function (a, b) {
    this.x += a;
    this.y += b ? b : a;
    return this;
  };

  Vec2.prototype.addVec = function (vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  };

  Vec2.prototype.sub = function (s) {
    this.x -= s;
    this.y -= s;
    return this;
  };

  Vec2.prototype.subVec = function (vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  };

  Vec2.prototype.mul = function (m) {
    this.x *= m;
    this.y *= m;
    return this;
  };

  Vec2.prototype.mulVec = function (vec) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  };

  Vec2.prototype.div = function (d) {
    this.x /= d;
    this.y /= d;
    return this;
  };

  Vec2.prototype.divVec = function (vec) {
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
  };

  Vec2.prototype.toAngle = function (radians) {
    if (radians === void 0) {
      radians = true;
    }

    return radians ? Math.atan2(this.y, this.x) : Math.atan2(this.y, this.x) * (180 / Math.PI);
  };

  Vec2.prototype.fromAngle = function (angle, radians) {
    if (radians === void 0) {
      radians = true;
    }

    angle = radians ? angle : angle * Math.PI / 180;
    this.x = Math.sin(angle);
    this.y = Math.cos(angle);
    return this;
  };

  Vec2.prototype.normalize = function () {
    var l = this.len();
    if (l != 0) this.div(l);
  };

  Vec2.prototype.limit = function (limit) {
    var l = this.len();

    if (l > limit) {
      this.normalize();
      this.mul(limit);
    }
  };

  return Vec2;
}();

exports.default = Vec2;

/***/ }),
/* 1 */
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/pontus/projects/sudoku/src/main.ts */2);


/***/ }),
/* 2 */
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_1 = __webpack_require__(/*! ./lib/game */ 3);

window.onload = function (e) {
  var game = new game_1.default({
    container: 'content'
  });
  game.init();
};

/***/ }),
/* 3 */
/*!*************************!*\
  !*** ./src/lib/game.ts ***!
  \*************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(/*! ./utils */ 4);

var render_1 = __webpack_require__(/*! ./render */ 5);

var board_1 = __webpack_require__(/*! ./board */ 6);

var input_1 = __webpack_require__(/*! ./input */ 7);

var vec2_1 = __webpack_require__(/*! ./includes/vec2 */ 0);

var Game =
/** @class */
function () {
  function Game(params) {
    var _this = this;

    this.update = function () {
      _this.dt = Date.now() - _this.lastUpdate;
      _this.lastUpdate = Date.now();
    };

    this.render = function () {
      requestAnimationFrame(_this.render);

      _this.renderer.clearBoard();

      _this.renderer.drawBoard(_this.board);

      _this.renderer.drawHighlight(_this.highlight, _this.board);

      _this.renderer.drawSelected(_this.selected);

      _this.renderer.drawText("dt: " + Math.round(_this.dt * 100) / 100, _this.renderer.canvas.width - 90, 30);
    };

    this.utils = new utils_1.default(this);
    this.renderer = new render_1.default(params.container, this);
    this.input = new input_1.default(this);
    this.board = new board_1.default(this.renderer);
    this.board.init();
    this.selected = new vec2_1.default(-1, -1);
  }

  Game.prototype.init = function () {
    var _this = this;

    console.log('init game');
    this.renderer.init();
    this.lastUpdate = Date.now();
    this.board.randomizeBoard();
    setInterval(this.update, 1000 / 60);
    requestAnimationFrame(this.render);
    document.getElementById('solve').addEventListener('click', function (e) {
      if (_this.board.solveBoard(1)) {
        console.log('solved');
      } else {
        alert('Abort abort, probably unsolvable');
      }
    });
    document.getElementById('reset').addEventListener('click', function (e) {
      _this.board.randomizeBoard();
    });
  };

  Game.prototype.keyPress = function (key) {
    // console.log('key', key);
    // Numbers
    if (this.selected.x > -1) {
      if (key < 106 && key > 95) {
        var num = key - 96;
        this.board.tryPut(this.selected.x, this.selected.y, num);
      }

      if (key < 58 && key > 47) {
        var num = key - 48;
        this.board.tryPut(this.selected.x, this.selected.y, num);
      }
    } // Enter


    if (key === 13) {
      if (this.board.solveBoard(1)) {
        console.log('solved');
      } else {
        console.log('broken');
      }
    } // Space or delete


    if (key === 32 || key == 46) {
      this.board.tryPut(this.selected.x, this.selected.y, 0);
    } // Arrows


    if (key === 38) {
      this.selected.y = this.selected.y > 0 ? this.selected.y - 1 : this.selected.y;
    } else if (key === 37) {
      this.selected.x = this.selected.x > 0 ? this.selected.x - 1 : this.selected.x;
    } else if (key === 40) {
      this.selected.y = this.selected.y < 8 ? this.selected.y + 1 : this.selected.y;
    } else if (key === 39) {
      this.selected.x = this.selected.x < 8 ? this.selected.x + 1 : this.selected.x;
    }
  };

  Game.prototype.mouseClick = function (button) {
    var bx = Math.floor(this.input.mouse.x / this.renderer.gridSize);
    var by = Math.floor(this.input.mouse.y / this.renderer.gridSize);
    var target = this.board.getTile(bx, by);

    if (button === 0 && bx < 9 && by < 9) {
      this.selected.set(bx, by);
    }

    if (button === 2) {
      this.highlight = target;
    } // console.log(button, this.input.mouse);
    // console.log(bx, by, target, button);

  };

  return Game;
}();

exports.default = Game;

/***/ }),
/* 4 */
/*!**************************!*\
  !*** ./src/lib/utils.ts ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils =
/** @class */
function () {
  function Utils(game) {
    this.game = game;
    console.log('constructing utils ');
  }

  Utils.prototype.drawVec2 = function (v, ctx) {};

  return Utils;
}();

exports.default = Utils;

/***/ }),
/* 5 */
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Render =
/** @class */
function () {
  function Render(container, game) {
    var _this = this;

    this.clearBoard = function () {
      // clear canvas
      _this.ctx.resetTransform();

      _this.ctx.fillStyle = "black";

      _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height); // draw board


      _this.ctx.strokeStyle = "rgb(255,25,255)";
      _this.ctx.lineWidth = 3;

      _this.ctx.strokeRect(1, 1, _this.boardsize - 1, _this.boardsize - 1);

      for (var y = 0; y < 9; y++) {
        if (y % 3 === 0) {
          _this.ctx.strokeStyle = "rgb(255,25,255)";
          _this.ctx.lineWidth = 3;
        } else {
          _this.ctx.strokeStyle = "rgb(255,255,255)";
          _this.ctx.lineWidth = 1;
        }

        _this.ctx.beginPath();

        _this.ctx.moveTo(0, y * _this.gridSize);

        _this.ctx.lineTo(_this.boardsize, y * _this.gridSize);

        _this.ctx.closePath();

        _this.ctx.stroke();
      }

      for (var x = 0; x < 9; x++) {
        if (x % 3 === 0) {
          _this.ctx.strokeStyle = "rgb(255,25,255)";
          _this.ctx.lineWidth = 3;
        } else {
          _this.ctx.strokeStyle = "rgb(255,255,255)";
          _this.ctx.lineWidth = 1;
        }

        _this.ctx.beginPath();

        _this.ctx.moveTo(x * _this.gridSize, 0);

        _this.ctx.lineTo(x * _this.gridSize, _this.boardsize);

        _this.ctx.closePath();

        _this.ctx.stroke();
      }
    };

    this.containerID = container;
    this.game = game;
  } // init rendering stuff


  Render.prototype.init = function () {
    var _this = this;

    this.canvas = document.createElement('canvas');

    this.canvas.oncontextmenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    document.getElementById(this.containerID).appendChild(this.canvas); // add Canvas element to container

    this.ctx = this.canvas.getContext('2d');
    this.resize(false);

    window.onresize = function (e) {
      _this.resize(e);
    };
  };

  Render.prototype.drawBoard = function (board) {
    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        if (board.grid[y][x] > 0) {
          this.drawText("" + board.grid[y][x], x * this.gridSize + this.gridSize / 2.2, y * this.gridSize + this.gridSize / 1.8);
        }
      }
    }
  };

  Render.prototype.drawHighlight = function (highlight, board) {
    if (!highlight) return;

    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        if (board.grid[y][x] === highlight) {
          this.ctx.strokeStyle = "rgba(25,25,255,0.5)";
          this.ctx.lineWidth = 5;
          this.ctx.strokeRect(x * this.gridSize, y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
        }
      }
    }
  };

  Render.prototype.drawSelected = function (target) {
    this.ctx.strokeStyle = "rgba(25,225,25,5)";
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(target.x * this.gridSize, target.y * this.gridSize, this.gridSize - 1, this.gridSize - 1);
  };

  Render.prototype.drawText = function (text, x, y) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText(text, x, y);
  }; // handle resize event


  Render.prototype.resize = function (e) {
    console.log('resize', e);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.boardsize = Math.min(this.canvas.width, this.canvas.height);
    this.gridSize = this.boardsize / 9;
  };

  return Render;
}();

exports.default = Render;

/***/ }),
/* 6 */
/*!**************************!*\
  !*** ./src/lib/board.ts ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var vec2_1 = __webpack_require__(/*! ./includes/vec2 */ 0); // class Section {
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


var Board =
/** @class */
function () {
  function Board(render) {
    this.renderer = render;
  }

  Board.prototype.init = function () {
    this.grid = [];

    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 9; x++) {
        if (this.grid[y] === undefined) this.grid[y] = [];
        this.grid[y][x] = 0;
      }
    }
  };

  Board.prototype.tryPut = function (x, y, num) {
    if (this.isPossible(x, y, num)) {
      this.grid[y][x] = num;
    }
  };

  Board.prototype.randomizeBoard = function () {
    // TODO: Get a always solvabe board by just randomizing a solved one and remove random slots?
    for (var x = 0; x < 9; x++) {
      for (var y = 0; y < 9; y++) {
        if (Math.random() < 0.1) {
          var rand = Math.round(Math.random() * 9);

          if (this.isPossible(x, y, rand)) {
            this.grid[y][x] = rand;
          }
        } else {
          this.grid[y][x] = 0;
        }
      }
    }
  };

  Board.prototype.solveBoard = function (depth) {
    if (depth > 100) return true; // infinite loop protection

    var pos = this.getEmptySlot();
    if (pos.x < 0) return true;
    console.log('solving... depth: ', depth);
    var available = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (var i = 0; i < available.length; i++) {
      var num = available[i];

      if (this.isPossible(pos.x, pos.y, num)) {
        this.grid[pos.y][pos.x] = num;
        this.renderer.drawBoard(this);

        if (this.solveBoard(depth + 1)) {
          return true;
        }

        this.grid[pos.y][pos.x] = 0;
      }
    }

    return false;
  };

  Board.prototype.getEmptySlot = function () {
    var ret = new vec2_1.default(-1, -1);
    var stop = false;

    for (var x = 0; x < 9 && !stop; x++) {
      for (var y = 0; y < 9 && !stop; y++) {
        if (this.grid[y][x] === 0) {
          stop = true;
          ret.set(x, y);
        }
      }
    }

    return ret;
  };

  Board.prototype.isPossible = function (tx, ty, num) {
    if (num === 0) return true;

    for (var y = 0; y < 9; y++) {
      if (y === ty) continue;
      if (this.grid[y][tx] === num) return false;
    }

    for (var x = 0; x < 9; x++) {
      if (x === tx) continue;
      if (this.grid[ty][x] === num) return false;
    }

    var sx = tx - tx % 3;
    var sy = ty - ty % 3;

    for (var y = 0; y < 3; y++) {
      for (var x = 0; x < 3; x++) {
        if (this.grid[sy + y][sx + x] === num) return false;
      }
    }

    return true;
  };

  Board.prototype.getTile = function (x, y) {
    return this.grid[y][x];
  };

  return Board;
}();

exports.default = Board;

/***/ }),
/* 7 */
/*!**************************!*\
  !*** ./src/lib/input.ts ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var vec2_1 = __webpack_require__(/*! ./includes/vec2 */ 0);

var Input =
/** @class */
function () {
  function Input(game) {
    this.keysPressed = {};
    this.keys = {
      // other
      'ctrl': 17,
      'enter': 13,
      'space': 32,
      'escape': 27,
      '+': 107,
      '-': 109,
      'insert': 45,
      'delete': 46,
      'home': 36,
      'end': 35,
      // numbers
      '1': 49,
      '2': 50,
      '3': 51,
      '4': 52,
      '5': 53,
      '6': 54,
      '7': 55,
      '8': 56,
      '9': 57,
      '0': 58,
      // letters
      'w': 87,
      'a': 65,
      's': 83,
      'd': 68,
      // arrowkeys
      'up': 38,
      'left': 37,
      'down': 40,
      'right': 39
    }; // Holds mouse buttons pressed

    this.buttonsPressed = {};
    this.buttons = {
      'left': 0,
      'middle': 1,
      'right': 2
    }; // window relative mouse position
    // Holds pressed keys as keycodes

    this.mouse = new vec2_1.default();
    this.lastmouse = new vec2_1.default();
    this.game = game;
    window.addEventListener('keydown', this.keyDown.bind(this));
    window.addEventListener('keyup', this.keyUp.bind(this));
    window.addEventListener('mousemove', this.mouseMove.bind(this));
    window.addEventListener('mousedown', this.mouseDown.bind(this));
    window.addEventListener('mouseup', this.mouseUp.bind(this));
  }
  /**
  * Keyboard functions
  */


  Input.prototype.keyDown = function (e) {
    var event = e || window.event;
    this.keysPressed[event.keyCode] = true;
    this.game.keyPress(event.keyCode);
  };

  Input.prototype.keyUp = function (e) {
    var event = e || window.event;
    this.keysPressed[event.keyCode] = false;
  };

  Input.prototype.isKeyPressed = function (key) {
    if (this.keys[key]) {
      return this.keysPressed[this.keys[key]];
    }

    return false;
  };
  /**
  * Mouse functions
  */


  Input.prototype.mouseMove = function (e) {
    // console.log(this.mouse);
    this.lastmouse.setVec(this.mouse);
    this.mouse.set(e.pageX || e.clientX, e.pageY || e.clientY);
  };

  Input.prototype.mouseDown = function (e) {
    e.preventDefault();
    this.buttonsPressed[e.button] = true;
    this.game.mouseClick(e.button);
  };

  Input.prototype.mouseUp = function (e) {
    e.preventDefault();
    this.buttonsPressed[e.button] = false;
  };

  Input.prototype.isButtonPressed = function (button) {
    return this.buttonsPressed[this.buttons[button]];
  };

  return Input;
}();

exports.default = Input;

/***/ })
],[1]);
//# sourceMappingURL=bundle.js.map