import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, StatusBar } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import { BasicTile } from '../../GameComponents';
import { MoveFinger } from './systems';
import { range } from 'lodash';
import DonkeyKong from "react-native-donkey-kong";

function genEntities() {
  const entities = {};

  for (const i of range(5)) {
    entities;
  }

  return [
    { position: [0, 0], size: 50, renderer: <BasicTile /> }, //-- Notice that each entity has a unique id (required)
    { position: [100, 200], size: 50, renderer: <BasicTile /> }, //-- and a renderer property (optional). If no renderer
    { position: [160, 200], size: 50, renderer: <BasicTile /> }, //-- is supplied with the entity - it won't get displayed.
    { position: [220, 200], size: 50, renderer: <BasicTile /> },
    { position: [280, 200], size: 50, renderer: <BasicTile /> },
  ];
}
export class Playground extends PureComponent {
  constructor() {
    super();
  }

  render() {
    return (
      // <GameEngine
      //   style={styles.container}
      //   // systems={[MoveFinger]}
      //   entities={genEntities()}>
      //   <StatusBar hidden={true} />
      // </GameEngine>
      <DonkeyKong/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
