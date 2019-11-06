import React from 'react';

import { View, StyleSheet, Button } from '../Components';
import { CreateSettingsModal } from './CreateSettingsModal';
import Draggable from '../Components/Draggable';

export class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
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
      gridSize: 2,
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
      dropZoneValues: [],
      mainLayout: null,
    };
    this.grid = [];
  }

  setDropZoneValues = $ev => {
    const { layout } = $ev.nativeEvent;
    console.log(this.state.mainLayout, layout);
    this.setState({
      dropZoneValues: this.state.dropZoneValues.concat({
        ...layout,
        x: layout.x + this.state.mainLayout.x,
        y: layout.y + this.state.mainLayout.y,
      }),
    },);
  };

  setMainLayout = $ev => {
    const { layout } = $ev.nativeEvent;
    this.setState({
      mainLayout: layout,
    });
  };

  componentDidMount() {
    this.props.navigation.setParams({
      toggleModal: this.toggleModal,
    });
    this.setGrid();
  }

  toggleModal = () => {
    console.log(this.state);
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  setGrid = () => {
    for (var i = 0; i < this.state.gridSize; i++) {
      this.grid.push([]);
      for (var j = 0; j < this.state.gridSize; j++) {
        this.grid[i].push(
          <View
            key={`${i}_${j}`}
            style={styles.dropZone}
            onLayout={this.setDropZoneValues}
          />,
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.grid} onLayout={this.setMainLayout}>
        {/* <CreateSettingsModal
          closeModal={() => this.toggleModal()}
          modalVisible={this.state.modalIsOpen}
        /> */}
        {this.state.mainLayout && this.grid.map((row, idx) => {
          return (
            <View key={idx} style={styles.gridRow}>
              {row}
            </View>
          );
        })}
        <Draggable dropZoneValues={this.state.dropZoneValues}></Draggable>
      </View>
    );
  }
}

const squareSize = 55;
const styles = StyleSheet.create({
  grid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  dropZone: {
    height: squareSize,
    width: squareSize,
    backgroundColor: 'orange',
    borderColor: 'red',
    borderWidth: 1,
  },
});
