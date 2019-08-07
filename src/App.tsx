import React, {Component} from 'react';
import {Alert} from 'react-native';
import { InitialAppState } from "./@types/index";
import {createStackNavigator, createAppContainer} from 'react-navigation';
import EntranceScreen from './Entrance/EntranceScreen';
import SpeechScreen from './Speech/SpeechScreen';
import PartSelectScreen from './PartSelect/PartSelectScreen';
import RemoteControllerScreen from './RemoteController/RemoteControllerScreen';
import {serverURL} from './constants';
import axios from "axios";
import {AxiosRequestConfig} from "axios";
import ROUTES from './routes';

const AppNavigator = createStackNavigator(
  {
    EntranceScreen,
    SpeechScreen,
    PartSelectScreen,
    RemoteControllerScreen
  },
  {
    initialRouteName: ROUTES.EntranceScreen,
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (<AppContainer></AppContainer>);
  }
}