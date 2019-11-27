import React from 'react';
import { View, TouchableOpacity } from '.';

export class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.props.onPress}>
      </TouchableOpacity>
    )
  }
}
