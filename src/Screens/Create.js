import React from 'react';

import { View, StyleSheet, Button, height, width, Cell, CellOptions, Text } from '../Components';
import { CreateSettingsModal } from './CreateSettingsModal';

const squareSize = 54;

export class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Create Your Map',
      headerRight: (
        <Button icon='cog' iconType='font-awesome' onPress={() => navigation.getParam('toggleModal', () => { })()} />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gridSize: 5,
      modalIsOpen: false,
      showOptions: true,
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
      grid: [],
      currentCell: [0, 0],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      toggleModal: this.toggleModal,
    });
    this.setGrid();
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: true });
  };

  toggleOptions = (i, j) => {
    this.setState({
      showOptions: true,
      currentCell: [i, j],
    });
  }

  setGrid = () => {
    let grid = [];
    for (var i = 0; i < this.state.gridSize; i++) {
      grid.push([]);
      for (var j = 0; j < this.state.gridSize; j++) {
        grid[i].push(<Cell key={`${i}_${j}`} style={styles.cell} onPress={() => this.toggleOptions(i, j)} />);
      }
    }
    this.setState({ grid });
  };

  saveModalData = data => {
    this.setState({
      modalIsOpen: false,
      gridSize: data.gridSize,
    }, () => {
      delete this.state.grid;
      this.setGrid();
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  render() {
    return (
      <View style={styles.grid}>
        <CreateSettingsModal
          saveModalData={this.saveModalData}
          closeModal={this.closeModal}
          onRequestClose={this.closeModal}
          modalVisible={this.state.modalIsOpen}
        />
        <View style={styles.options}>
          {(!this.state.showOptions) ? <Text>Press one cell!.</Text> : <CellOptions cellPosition={this.state.currentCell} />}
        </View>
        <View style={styles.cells}>
          {this.state.grid.map((row, idx) => (
            <View key={idx} style={styles.gridRow} >
              {row.map(c => c)}
            </View>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    margin: '5%',
    width: '100%',
    height: '100%',
    maxHeight: '25%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    height: height,
    width: width,
  },
  gridRow: {
    flexDirection: 'row',
  },
  cells: {
    flex: 1,
    justifyContent: 'center',
    borderColor: 'green',
    borderWidth: 1,
  },
  cell: {
    height: squareSize,
    width: squareSize,
    backgroundColor: 'orange',
    margin: 1,
  },
});
