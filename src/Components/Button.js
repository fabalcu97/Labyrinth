import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from './index';

export class Button extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    padding: 7,
    margin: 7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#EEE',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
