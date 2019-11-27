import React from 'react';
import { TouchableOpacity, StyleSheet } from '.';
import { isEqual } from 'lodash';

const squareSize = 54;

export class Cell extends React.Component {
  selected = () => {
    this.props.onPress();
  };

  render() {
    const { position, currentCell } = this.props;
    return (
      <TouchableOpacity
        {...this.props}
        onPress={this.selected}
        style={
          isEqual(position, currentCell) ? styles.selectedCell : styles.cell
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  selectedCell: {
    height: squareSize,
    width: squareSize,
    borderWidth: 1,
    borderColor: 'red',
    margin: 1,
  },
  cell: {
    height: squareSize,
    width: squareSize,
    backgroundColor: 'orange',
    margin: 1,
  },
});
