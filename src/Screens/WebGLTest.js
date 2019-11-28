import React from 'react';
import { startGame } from '../Game/src'

import { GLView } from 'expo-gl';

export class WebGLTest extends React.Component {
  static meta = {
    description: 'Basic Scene',
  };

  componentDidMount() {
    console.log('hola')
  }

  render() {
    console.log('ALGO')
    return (
      <GLView
        style={{flex: 1}}
        onContextCreate={context => startGame({ context })}
      />
    );
  }

}
