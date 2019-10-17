import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {HomeScreen} from './Screens/Home';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
});

const NavigationAppContainer = createAppContainer(MainNavigator);

export default NavigationAppContainer;
