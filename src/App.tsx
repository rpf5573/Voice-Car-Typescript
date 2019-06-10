import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import EntranceScreen from './Entrance/EntranceScreen';
import SpeechScreen from './Speech/SpeechScreen';
import PartSelectScreen from './PartSelect/PartSelectScreen';
import ROUTES from './routes';

const AppNavigator = createStackNavigator(
  {
    EntranceScreen,
    SpeechScreen,
    PartSelectScreen
  },
  {
    initialRouteName: ROUTES.EntranceScreen,
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer></AppContainer>
  }
}