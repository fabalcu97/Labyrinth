import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';

export class Button extends React.Component {
  render() {
    return this.props.icon ? (
      <Icon
        raised
        name={this.props.icon}
        type={this.props.iconType}
        color="#f50"
        onPress={this.props.onPress}
      />
    ) : (
      <TouchableOpacity
        style={{...styles.button, backgroundColor: this.props.color || '#EEE'}}
        onPress={this.props.onPress}>
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
  },
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
