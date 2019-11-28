import { Asset } from 'expo-asset';

export const Assets = {
  'ball.png': require('./ball.png'),
  'basic_tile.png': require('./basic_tile.png'),
  'hole.png': require('./hole.png'),
};

export  async function loadAssets() {
  const downloads = [];
  for (let key of Object.keys(Assets)) {
    const asset = Asset.fromModule(Assets[key]);
    downloads.push(asset.downloadAsync());
  }
  await Promise.all(downloads);
}
