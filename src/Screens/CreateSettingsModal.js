import React from 'react';

import {View, Text, Slider, width, StyleSheet} from '../Components';

export class CreateSettingsModal extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Creation settings',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gridSize: 8,
    };
  }

  render() {
    return (
      <View>
        <View style={styles.input}>
          <Text>Grid Size: {this.state.value}</Text>
          <Slider
            style={styles.slider}
            step={1}
            value={this.state.value}
            minimumValue={5}
            maximumValue={11}
            minimumTrackTintColor="orange"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    width: width,
    height: 50,
  },
});
