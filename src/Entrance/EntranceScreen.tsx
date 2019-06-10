import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {NavigationScreenProps, NavigationParams} from "react-navigation";
import {teamColors} from '../constants';
import ROUTES from '../routes';

type States = {}

export default class EntranceScreen extends Component<NavigationScreenProps<NavigationParams>, States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.moveToPartSelectScreen = this.moveToPartSelectScreen.bind(this);
  }
  moveToPartSelectScreen() {
    this.props.navigation.push(ROUTES.PartSelectScreen);
  }
  render() {
    return (
      <ImageBackground source={require("../images/background.jpeg")} style={styles.backgroundImage}>
        
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  }
})