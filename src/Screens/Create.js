import React from 'react';
import { flatten } from 'lodash';

import firestore from '@react-native-firebase/firestore';

import { View, StyleSheet, Button, height, width, Text, Modal, ScrollView } from '../Components';
import { Cell } from '../Components/Cell';
import { CellOptions } from '../Components/CellOptions';
import { CreateSettingsModal } from './CreateSettingsModal';
import { TextInput } from 'react-native';

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
      name: '',
      isNameModalOpen: true,
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

  toggleNameModal = () => this.setState({ isNameModalOpen: !this.state.isNameModalOpen });

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

  saveMap = () => {
    this.toggleNameModal();
    let tt = {
      name: this.state.name,
      grid: flatten(this.state.grid),
      userId: '',
    };
    console.log(tt);
    firestore()
      .collection('maps')
      .add(tt)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  };

  updateNameText = t => this.setState({ name: t });

  render() {
    return (
      <View style={styles.grid}>
        <CreateSettingsModal
          saveModalData={this.saveModalData}
          closeModal={this.closeModal}
          onRequestClose={this.closeModal}
          modalVisible={this.state.modalIsOpen}
        />
        <Modal animationType='slide' visible={this.state.isNameModalOpen} onRequestClose={this.toggleNameModal}>
          <View style={{ display: 'flex' }}>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder={'Map Name'}
                onChangeText={this.updateNameText}
                value={this.state.name}
              />
            </View>
            <View style={styles.buttons}>
              <Button color='orange' text='Ok' onPress={this.saveMap} />
            </View>
          </View>
        </Modal>
        <View style={styles.options}>
          {!this.state.showOptions ? (
            <Text>Press any tile!</Text>
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
        <View style={styles.saveButton}>
          <Button text={'Save'} textColor={'white'} color={'#f50'} onPress={this.toggleNameModal} />
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
  saveButton: {
    width: '100%',
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
    backgroundColor: '#f50',
    borderWidth: 1,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cells: {
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    alignItems: 'center',
  },
  textInput: {
    width: '70%',
    borderBottomColor: '#f50',
    borderBottomWidth: 2,
  },
});
