import React from 'react';
import { TouchableOpacity, StyleSheet } from '.';
import { isEqual } from 'lodash';

const squareSize = 54;

export class Cell extends React.Component {
  selected = () => {
    this.props.onPress();
  };

  setColor = type => {
    switch (type) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      case 4:
        return 'blue';
      case 5:
        return 'white';
      default:
        return 'orange';
    }
  };

  render() {
    const { type, position, currentCell } = this.props;
    let style = {
      ...(isEqual(position, currentCell.position) ? styles.selectedCell : styles.cell),
      backgroundColor: this.setColor(type),
    };
    return <TouchableOpacity {...this.props} activeOpacity={0.65} onPress={this.selected} style={style} />;
  }
}

const styles = StyleSheet.create({
  selectedCell: {
    height: squareSize,
    width: squareSize,
    margin: 1,
    borderColor: 'white',
    borderWidth: 2,
  },
  cell: {
    height: squareSize,
    width: squareSize,
    margin: 1,
  },
});
