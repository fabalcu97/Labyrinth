import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';

import { View, Text, StyleSheet, Dimensions, Button } from '../Components';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  login = async () => {
    let user = null;
    try {
      user = await auth().signInWithEmailAndPassword(
        'test@noidea.com',
        'noideatest',
      );
    } catch (e) {
      // console.error(e.message);
    }
    // console.log(user);
    this.successLogin();
  };

  auth = user => {
    // console.log(user);
  };

  successLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Game' })],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NoIdea</Text>
        <View style={styles.buttons}>
          <Button text={'AnonLogin'} onPress={this.login} />
          {/* <Button text={'Entrar'} onPress={this.successLogin} /> */}
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
