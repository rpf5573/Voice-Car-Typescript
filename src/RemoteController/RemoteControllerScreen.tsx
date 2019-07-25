import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import {Locale, rapiURL} from '../constants';
import { NavigationScreenProps, NavigationParams } from "react-navigation";
import axios from "axios";
import { Part } from "../@types/index";
import { TouchableHighlight } from "react-native-gesture-handler";
import { number } from "prop-types";

import Svg,{
  Circle,
  Path,
  Rect,
} from 'react-native-svg';

type States = {
  active: boolean;
  error: string;
  result: string;
  partialResults: string[];
  matchedSpellCode: number;
};
export default class RemoteControllerScreen extends Component<NavigationScreenProps<NavigationParams>,States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.sendCommand = this.sendCommand.bind(this);
  }
  team: number = this.props.navigation.getParam("team");
  part: Part = this.props.navigation.getParam("part");
  static navigationOptions = {
    title: "리모컨"
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>여기는 리모컨 컨트롤러 스크린 입니다</Text>
        <View style={styles.rcContainer}>
          <View style={styles.wrapper}>
            
          </View>
        </View>
      </View>
    );
  }

  // custom function
  sendCommand(command: string|undefined, callback: () => void) {
    callback();
    let url: string = `${rapiURL(this.team)}/${command}`;
    axios(url).then((response) => {
      if ( response.status == 201 ) {
      } else {
      }
    }).catch((err) => {
      Alert.alert("ERROR", "포크레인 서버로부터 응답이 없습니다");
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "space-between",
    paddingBottom: 80,
    position: 'relative'
  },
  rcContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  wrapper: {
    width: '100%',
    height: '80%'
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    marginBottom: 30
  },
  arrow: {
    position: 'absolute'
  },
  arrowTop: {
    top: 20
  },
  arrowRight: {
    left: 260,
    transform: [
      { rotate: '90deg' }
    ]
  },
  arrowBottom: {
    bottom: 20,
    transform: [
      { rotate: '180deg' }
    ]
  },
  arrowLeft: {
    right: 260,
    transform: [
      { rotate: '270deg' }
    ]
  }
});