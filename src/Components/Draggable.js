import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';

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
        Animated.spring(this.state.scale, {
          toValue: 1.1,
          friction: 3,
        }).start();
      },

      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]),

      onPanResponderRelease: (e, gesture) => {
        this.state.pan.flattenOffset();
        Animated.spring(this.state.scale, { toValue: 1, friction: 3 }).start();

        let dropZone = this.inDropZone(gesture);
        console.log(dropZone);

        if (dropZone) {
          console.log(
            dropZone.y - this.layout.y,
            this.state.pan.y._value,
            dropZone.y,
          );
          Animated.spring(this.state.pan, {
            toValue: {
              x: (dropZone.x + dropZone.height) / 2,
              y: (dropZone.y + dropZone.width) / 2,
            },
          }).start();
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 },
            delay: 0.3,
          }).start();
        }
      },
    });
  }

  inDropZone(gesture) {
    var isDropZone = false;
    for (let dropZone of this.props.dropZoneValues) {
      console.log('DZs =>', dropZone);
      console.log('GSs =>', gesture);
      if (
        gesture.moveY > dropZone.y &&
        gesture.moveY < dropZone.y + dropZone.height &&
        gesture.moveX > dropZone.x &&
        gesture.moveX < dropZone.x + dropZone.width
      ) {
        isDropZone = dropZone;
      }
    }
    return isDropZone;
  }

  setDropZoneValues(event) {
    this.layout = event.nativeEvent.layout;
  }

  render() {
    return (
      <View
        style={{ width: '20%', alignItems: 'center' }}
        onLayout={this.setDropZoneValues.bind(this)}>
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

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
