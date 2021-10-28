import Game from './game';
import Vec2, { IVec2 } from './includes/vec2';

export default class Input {

  private keysPressed: object = {};
  private keys = {
    // other
    'ctrl':17, 'enter':13, 'space':32, 'escape':27, '+':107, '-':109, 'insert':45, 'delete':46, 'home':36, 'end':35,
    // numbers
    '1':49, '2':50, '3':51, '4':52, '5':53, '6':54, '7':55, '8':56, '9':57, '0':58,
    // letters
    'w':87, 'a':65, 's':83, 'd':68,
    // arrowkeys
    'up':38, 'left':37, 'down':40, 'right':39,
  };
  // Holds mouse buttons pressed
  private buttonsPressed: object = {};
  private buttons = {
    'left':   0,
    'middle': 1,
    'right':  2,
  };
  // window relative mouse position


  // Holds pressed keys as keycodes
  public mouse = new Vec2();
  private lastmouse = new Vec2();


  private game: Game;

  constructor(game: Game) {
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
  keyDown(e: any) { // handle keyboard press down of key
    var event = e || window.event;
    this.keysPressed[event.keyCode] = true;
    this.game.keyPress(event.keyCode);
  }

  keyUp(e: any) { // handles keyboard release of key
    var event = e || window.event;
    this.keysPressed[event.keyCode] = false;
  }

  isKeyPressed(key: number) { // return if specific key is pressed
    if (this.keys[key]) {
      return this.keysPressed[this.keys[key]];
    }
    return false;
  }

  /**
  * Mouse functions
  */
  mouseMove(e: any) {
    // console.log(this.mouse);
    this.lastmouse.setVec(this.mouse);
    this.mouse.set(e.pageX || e.clientX, e.pageY || e.clientY);
  }

  mouseDown(e: any) {
    e.preventDefault();
    this.buttonsPressed[e.button] = true;
    this.game.mouseClick(e.button);
  }

  mouseUp(e: any) {
    e.preventDefault();
    this.buttonsPressed[e.button] = false;
  }

  isButtonPressed(button) {
    return this.buttonsPressed[this.buttons[button]];
  }

}