import React from 'react';
import { startGame } from '../Game';

import { GLView } from 'expo-gl';
import { View } from 'react-native';
import { Asset } from 'expo-asset';
import { mapGenerator } from '../Game/utils/mapGenerator';

const example = [
  'wwwwwwwwww',
  'w        w',
  'w ww  ww w',
  'w   hh   w',
  'w ww  ww w',
  'w   p    w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'w        w',
  'wwwwwwwwww',
];

const exampleJSON = mapGenerator(example);

export class Game extends React.Component {
  state = { loading: true };

  assets = {
    'ball.png': require('../Game/assets/ball.png'),
    'basic_tile.png': require('../Game/assets/basic_tile.png'),
    'hole.png': require('../Game/assets/hole.png'),
  };
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const downloads = [];
    for (let key of Object.keys(this.assets)) {
      const asset = Asset.fromModule(this.assets[key]);
      downloads.push(asset.downloadAsync());
    }
    await Promise.all(downloads);
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <View />;
    }
    let map = this.props.navigation.getParam('map');
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={context => startGame(context, this.assets, map.grid) // TODO: replace exampleJSON with props.map
        }
      />
    );
  }
}
