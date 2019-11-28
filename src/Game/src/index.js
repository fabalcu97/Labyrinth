import ExpoPhaser from 'expo-phaser';
import { Game } from './scenes';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

const config = {
  type: Phaser.WEBGL,
  width: WINDOW_WIDTH,
  height: WINDOW_HEIGHT,
  backgroundColor: '#eeeeee',
  parent: 'content',
  state: Game,
};

export function startGame({ context }) {
  const game = ExpoPhaser.game({ context });
  game.state.add('Game', Game);
  game.state.start('Game');
}
