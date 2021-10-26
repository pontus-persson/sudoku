import Game from './lib/game';

window.onload = function(e: any) {

  let game = new Game({
    container: 'content',
  });
  game.init();
  
};
