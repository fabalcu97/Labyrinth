import React from 'react';
import { View, Text, StyleSheet } from '.';
import { Picker, TouchableOpacity } from 'react-native';

import { TileTypes } from '../utils/constants';

export class CellOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: 'up',
    };
  }

  changeType = (v, currentCell) => {
    currentCell.type = v;
    this.props.onChange(currentCell);
  };

  render() {
    let { currentCell } = this.props;
    return (
      currentCell && (
        <View styles={styles.mainContainer}>
          {/* <View style={styles.orientation}>
            <Text styles={styles.label}>Orientation</Text>
            <View style={styles.row}>
              <Button icon='chevron-up' iconType='font-awesome' onPress={() => {}} />
              <Button icon='chevron-down' iconType='font-awesome' onPress={() => {}} />
              <Button icon='chevron-left' iconType='font-awesome' onPress={() => {}} />
              <Button icon='chevron-right' iconType='font-awesome' onPress={() => {}} />
            </View>
          </View> */}
          <View style={styles.typeSelector}>
            <Text styles={styles.label}>Type</Text>
            <View style={styles.row}>
              <Picker
                selectedValue={currentCell.type}
                style={styles.typePicker}
                onValueChange={v => this.changeType(v, currentCell)}>
                {Object.keys(TileTypes).map((k, idx) => {
                  let text = k.replace('_', ' ').toLowerCase();
                  if (text == 'empty') text = 'path';
                  return <Picker.Item key={idx} itemStyle={styles.pickerItem} label={text} value={TileTypes[k]} />;
                })}
              </Picker>
            </View>
          </View>
          {/* <TouchableOpacity style={(styles.row, styles.button)} onPress={() => this.props.onChange(currentCell)}>
            <Text style={styles.buttonText}>Save Tile</Text>
          </TouchableOpacity> */}
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f50',
    height: '30%',
  },
  buttonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    height: '100%',
    fontSize: 16,
    color: 'white',
  },
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  orientation: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    backgroundColor: 'green',
    textAlign: 'center',
    width: '100%',
  },
  typeSelector: {
    flex: 1,
    alignItems: 'center',
  },
  typePicker: {
    width: '65%',
    borderBottomColor: '#f50',
    borderBottomWidth: 2,
  },
  picker: {
    borderColor: 'gray',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  pickerItem: {
    color: 'red',
    textTransform: 'capitalize',
  },
});
