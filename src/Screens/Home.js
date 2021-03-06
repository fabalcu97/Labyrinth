import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Button,
} from '../Components';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  createGame = () => this.props.navigation.navigate('Create');
  goToMaps = () => this.props.navigation.navigate('Maps');
  webGlTest = () => this.props.navigation.navigate('WebGLTest')

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NoIdea</Text>
        <View style={styles.buttons}>
          <Button text={'Create Labyrinth'} onPress={this.createGame} />
          <Button text={'Select a Map'} onPress={this.goToMaps} />
          <Button text={'WebGLTest'} onPress={this.webGlTest} />
          <Button text={'Scoreboard'} onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  buttons: {
    width: Dimensions.get('screen').width / 2,
  },
});
