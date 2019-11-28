import React from 'react';

import { View, StyleSheet, Button, height, width, Text, ScrollView } from '../Components';
import { Cell } from '../Components/Cell';
import { CellOptions } from '../Components/CellOptions';
import { CreateSettingsModal } from './CreateSettingsModal';

export class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Create Your Map',
      headerRight: (
        <Button icon='cog' iconType='font-awesome' onPress={() => navigation.getParam('toggleModal', () => {})()} />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      showOptions: false,
      currentCell: [],
      grid: [],
    };
  }

  componentDidMount() {
    this.saveModalData({ gridSize: 5 });
    this.props.navigation.setParams({
      toggleModal: this.toggleModal,
    });
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: true });
  };

  toggleOptions = (i, j) => {
    this.setState({
      showOptions: true,
      currentCell: this.state.grid[i][j],
    });
  };

  saveModalData = data => {
    let grid = [];
    console.log(data);
    this.getArray(data.gridSize).forEach((r, i) => {
      let row = [];
      this.getArray(data.gridSize).forEach((c, j) => {
        row.push({
          position: [ i, j ],
          type: 1, // SQUARE_WALL
          orientation: 'up',
        });
      });
      grid.push(row);
    });
    this.setState({
      modalIsOpen: false,
      grid: grid,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  changeCellValues = cell => {
    let { grid } = this.state;
    console.log(cell.position);
    grid[cell.position[0]][cell.position[1]] = cell;
    this.setState({
      grid: grid,
    });
  };

  getArray = size => Array.apply(null, Array(size));

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
          {!this.state.showOptions ? (
            <Text>Press one cell!.</Text>
          ) : (
            <CellOptions currentCell={this.state.currentCell} onChange={this.changeCellValues} />
          )}
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ScrollView horizontal contentContainerStyle={styles.scroll}>
              <View style={styles.cells}>
                {this.state.grid.map((row, i) => (
                  <View key={i} style={styles.gridRow}>
                    {row.map((cell, j) => (
                      <Cell
                        key={`${i}_${j}`}
                        style={styles.cell}
                        position={[ i, j ]}
                        orientation={cell.orientation}
                        type={cell.type}
                        currentCell={this.state.currentCell}
                        onPress={() => this.toggleOptions(i, j)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  options: {
    margin: '5%',
    width: '100%',
    maxHeight: '25%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
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
  container: {
    margin: 'auto',
    height: '65%',
    width: '90%',
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderWidth: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cells: {
    justifyContent: 'center',
  },
});
