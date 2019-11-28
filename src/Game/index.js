import ExpoPhaser from 'expo-phaser';
import { Game } from './scenes';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

export function startGame(context, assets, mapJSON) {
  const game = ExpoPhaser.game({ context });
  game.state.add('Game', Game);
  game.state.start('Game', true, false, assets, mapJSON);
}
