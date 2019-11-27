import React from 'react';

import {
  View,
  StyleSheet,
  Button,
  height,
  width,
  Cell,
  CellOptions,
  Text,
  ScrollView,
} from '../Components';
import { CreateSettingsModal } from './CreateSettingsModal';

export class CreateScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Create Your Map',
      headerRight: (
        <Button
          icon="cog"
          iconType="font-awesome"
          onPress={() => navigation.getParam('toggleModal', () => {})()}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      gridSize: 5,
      modalIsOpen: false,
      showOptions: false,
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
      currentCell: [],
    };
  }

  componentDidMount() {
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
      currentCell: [i, j],
    });
  };

  saveModalData = data => {
    this.setState({
      modalIsOpen: false,
      gridSize: data.gridSize,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  getArray = () => Array.apply(null, Array(this.state.gridSize));

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
            <CellOptions cellPosition={this.state.currentCell} />
          )}
        </View>
        <View style={styles.cells}>
          <ScrollView>
            {this.getArray().map((r, i) => (
              <View key={i} style={styles.gridRow}>
                {this.getArray().map((c, j) => (
                  <Cell
                    key={`${i}_${j}`}
                    style={styles.cell}
                    position={[i, j]}
                    currentCell={this.state.currentCell}
                    onPress={() => this.toggleOptions(i, j)}
                  />
                ))}
              </View>
            ))}
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
});
