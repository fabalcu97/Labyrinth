import React from 'react';

import {
  View,
  Text,
  Slider,
  width,
  StyleSheet,
  Modal,
  Button,
} from '../Components';

export class CreateSettingsModal extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Creation settings',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gridSize: 5,
    };
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => this.props.onRequestClose(this.state)}>
        <View style={{ display: 'flex' }}>
          <View style={styles.input}>
            <Text style={styles.label}>Grid Size: {this.state.gridSize}</Text>
            <Slider
              style={styles.slider}
              step={1}
              value={this.state.gridSize}
              onValueChange={value => this.setState({ gridSize: value })}
              minimumValue={5}
              maximumValue={11}
              minimumTrackTintColor="orange"
              maximumTrackTintColor="#000000"
            />
          </View>
          <View style={styles.buttons}>
            <Button color="orange" text="Save" onPress={ev => this.props.saveModalData(this.state)}></Button>
            <Button
              text="Cancel"
              onPress={() => this.props.closeModal(this.state)}></Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 16,
  },
  slider: {
    width: width,
    height: 50,
  },
  buttons: {},
});
