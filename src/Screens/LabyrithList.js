import React from 'react';

import { View, Text, StyleSheet, FlatList, Button } from '../Components';
import { retrieveMaps } from '../utils/firestore';
import { ActivityIndicator } from 'react-native';

export class LabyrinthListScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: 'Select a Map!',
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      maps: [],
      spinner: true,
    };
  }

  componentDidMount() {
    retrieveMaps()
      .then(snapshot => {
        let maps = [];
        snapshot.forEach(d => maps.push({ id: d.id, ...d.data() }));
        this.setState({ maps, spinner: false });
      })
      .catch(err => {
        this.setState({ spinner: false });
        console.error(err);
      });
  }

  selectedMap = item => this.props.navigation.navigate('', { map: item });

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Button color={'#FF5500'} textColor={'white'} text={'Play this'} onPress={() => this.selectedMap(item)} />
      </View>
    );
  };

  render() {
    return this.state.spinner ? (
      <View style={styles.spinner}>
        <ActivityIndicator size='large' color='#FF5500' />
        <Text style={styles.spinnerText}>Retrieving Maps...</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList data={this.state.maps} renderItem={this.renderItem} keyExtractor={item => item.id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    padding: 20,
  },
  itemText: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FF550044',
    height: '100%',
    width: '100%',
  },
  spinnerText: {
    textAlign: 'center',
  },
});
