import Game from './game';
import Vec2 from './includes/vec2';

class Utils {

  game: Game;

  constructor(game: Game) {
    this.game = game;
    console.log('constructing utils ');
  }


  drawVec2(v: Vec2, ctx: any) {

  }

}

export default Utils;