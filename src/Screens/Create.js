import React from 'react';

import {View, StyleSheet, Button} from '../Components';
import {CreateSettingsModal} from './CreateSettingsModal';

export class CreateScreen extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => {
    console.log(navigation.state.params);
    return {
      title: 'Create Your Map',
      headerRight: (
        <Button
          icon="cog"
          iconType="font-awesome"
          onPress={() => navigation.getParam('toggleModal', () => {})}></Button>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gridSize: 7,
      modalIsOpen: false,
      elements: [
        {
          position: [1, 1],
          type: 'type1',
          orientation: 'up',
        },
        {
          position: [1, 2],
          type: 'type1',
          orientation: 'up',
        },
        {
          position: [1, 3],
          type: 'type1',
          orientation: 'up',
        },
        {
          position: [1, 4],
          type: 'type1',
          orientation: 'up',
        },
      ],
    };
    this.grid = [];
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleModal: this.toggleModal,
    });
    this.setGrid();
  }

  toggleModal = () => {
    console.log(this.state);
    this.setState({modalIsOpen: !this.state.modalIsOpen});
  };

  setGrid = () => {
    for (var i = 0; i < this.state.gridSize; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.state.gridSize; j++) {
        this.grid[i].push(square(`${i}_${j}`));
      }
    }
  };

  render() {
    return (
      <View style={styles.grid}>
        <CreateSettingsModal
          closeModal={() => this.toggleModal()}
          modalVisible={this.state.modalIsOpen}
        />
        {this.grid.map((row, idx) => {
          return (
            <View key={idx} style={styles.gridRow}>
              {row}
            </View>
          );
        })}
      </View>
    );
  }
}

function square(key) {
  return <View key={key} style={styles.square}></View>;
}

const squareSize = 55;
const styles = StyleSheet.create({
  square: {
    height: squareSize,
    width: squareSize,
    backgroundColor: 'orange',
    borderColor: 'red',
    borderWidth: 1,
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
});
