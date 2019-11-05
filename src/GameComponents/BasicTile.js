import React from 'react';
import { View, StyleSheet } from '../Components';

export function BasicTile({ size, position }) {
  const [x, y] = position;
  const extraStyles = { width: size, height: size, left: x, top: y };
  return <View style={[styles.tile, extraStyles]} />;
}

const styles = StyleSheet.create({
  tile: {
    borderColor: '#543228',
    borderWidth: 4,
    backgroundColor: '#77564c',
    position: 'absolute',
  },
});
