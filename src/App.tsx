import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import TeamSelectScreen from './TeamSelect/TeamSelectScreen';
import SpeechScreen from './Speech/SpeechScreen';
import PartSelectScreen from './PartSelect/PartSelectScreen';
import ROUTES from './routes';

const AppNavigator = createStackNavigator(
  {
    TeamSelectScreen,
    SpeechScreen,
    PartSelectScreen
  },
  {
    initialRouteName: ROUTES.TeamSelectScreen,
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer></AppContainer>
  }
}