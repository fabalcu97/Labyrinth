import React from 'react';

import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { HomeScreen } from './Screens/Home';
import { CreateScreen } from './Screens/Create';
import { CreateSettingsModal } from './Screens/CreateSettingsModal';
import { LoginScreen } from './Screens/Login';
import {RedSquareWebGL} from './Screens/WebGLTest'

const SecondaryNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Create: {
      screen: CreateScreen,
    },
    CreateSettingsModal: {
      screen: CreateSettingsModal,
    },
    WebGLTest: {
      screen: RedSquareWebGL
    }
  },
  {},
);

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Game: {
      screen: SecondaryNavigator,
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const NavigationAppContainer = createAppContainer(MainNavigator);

export default NavigationAppContainer;
