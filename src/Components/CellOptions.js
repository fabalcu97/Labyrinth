import React from 'react';
import { View, Text, Button, StyleSheet } from '.';
import { Picker } from 'react-native';

export class CellOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: 'up',
      type: 1,
      // TODO: Import types from Fredy's file
      types: {
        SQUARE_WALL: 1,
        START: 2,
        END: 3,
        HOLE: 4,
      },
    };
  }

  onPress = () => {
    this.props.onPress(i, j);
  };

  render() {
    return (
      <View styles={styles.mainContainer}>
        <View style={styles.orientation}>
          {/* <Text styles={styles.label}>Orientation</Text>
          <View style={styles.row}>
            <Button icon='chevron-up' iconType='font-awesome' onPress={() => { }} />
            <Button icon='chevron-down' iconType='font-awesome' onPress={() => { }} />
            <Button icon='chevron-left' iconType='font-awesome' onPress={() => { }} />
            <Button icon='chevron-right' iconType='font-awesome' onPress={() => { }} />
          </View> */}
        </View>
        <View style={styles.typeSelector}>
          <Text styles={styles.label}>Type</Text>
          <View style={styles.row}>
            <Picker
              selectedValue={this.state.type}
              style={styles.typePicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ type: itemValue })
              }>
              {Object.keys(this.state.types).map((k, idx) => {
                let text = k.replace('_', ' ').toLowerCase();
                return (
                  <Picker.Item
                    key={idx}
                    itemStyle={styles.pickerItem}
                    label={text}
                    value={this.state.types[k]}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  pickerItem: {
    color: 'red',
    textTransform: 'capitalize',
  },
});
