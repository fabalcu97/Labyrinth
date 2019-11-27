import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';
import { Header } from 'react-navigation-stack';

export default class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
    };
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),
      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();
        let dropZone = this.inDropZone(gesture);
        if (dropZone) {
          Animated.spring(this.state.pan, {
            toValue: {
              x: dropZone.x + dropZone.height / 2 - CIRCLE_RADIUS,
              y:
                dropZone.y - Header.HEIGHT + dropZone.width / 2 - CIRCLE_RADIUS,
            },
          }).start();
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
          }).start();
        }
      },
    });
  }

  inDropZone(gesture) {
    var isDropZone = false;
    for (let dropZone of this.props.dropZoneValues) {
      if (
        gesture.moveY > dropZone.y &&
        gesture.moveY < dropZone.y + dropZone.height &&
        gesture.moveX > dropZone.x &&
        gesture.moveX < dropZone.x + dropZone.width
      ) {
        isDropZone = dropZone;
        break;
      }
    }
    return isDropZone;
  }

  setDropZoneValues(event) {
    this.layout = event.nativeEvent.layout;
  }

  render() {
    return (
      <View onLayout={this.setDropZoneValues.bind(this)}>
        {this.renderDraggable()}
      </View>
    );
  }

  renderDraggable() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.circle, { opacity: this.state.opacity }]}
      />
    );
  }
}

let CIRCLE_RADIUS = 27;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
  },
});
