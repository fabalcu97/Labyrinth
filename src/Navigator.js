import React from 'react';

import {createAppContainer, NavigationActions} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen} from './Screens/Home';
import {CreateScreen} from './Screens/Create';
import {CreateSettingsModal} from './Screens/CreateSettingsModal';

const MainNavigator = createStackNavigator(
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
  },
  {
    initialRouteName: 'Home',
  },
);

const NavigationAppContainer = createAppContainer(MainNavigator);

export default NavigationAppContainer;
