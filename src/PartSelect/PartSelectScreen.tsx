import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Alert} from 'react-native';
import {NavigationScreenProps, NavigationParams} from "react-navigation";
import {parts} from '../constants';
import PartBox from './PartBox';
import {Part, Parts} from '../@types/index';
import ROUTES from '../routes';

type States = {
  part: Part | null
}
export default class PartSelectScreen extends Component<NavigationScreenProps<NavigationParams>, States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      part: null
    }
    this.moveToSpeechScreen = this.moveToSpeechScreen.bind(this);
  }
  static navigationOptions = {
    title: '몸체 설정'
  }
  moveToSpeechScreen(part: Part) {
    let team: number = this.props.navigation.getParam('team');
    if ( team > 0 ) {
      this.props.navigation.push(ROUTES.SpeechScreen, {
        part,
        team
      });
    } else {
      Alert.alert("ERROR", "팀이 설정되어있지 않습니다.");
    }
  }
  renderPartBoxes(parts: Parts) {
    let partBoxes = []
    partBoxes.push(<PartBox key="hand" moveToSpeechScreen={this.moveToSpeechScreen} part={parts.HAND} image={require('../images/hand.png')}></PartBox>);
    partBoxes.push(<PartBox key="arm" moveToSpeechScreen={this.moveToSpeechScreen} part={parts.ARM} image={require('../images/arm.png')}></PartBox>);
    partBoxes.push(<PartBox key="waist" moveToSpeechScreen={this.moveToSpeechScreen} part={parts.WAIST} image={require('../images/waist.png')}></PartBox>);
    partBoxes.push(<PartBox key="bottom" moveToSpeechScreen={this.moveToSpeechScreen} part={parts.BOTTOM} image={require('../images/bottom.png')}></PartBox>);

    return partBoxes;
  }
  render() {
    return (
      <View style={styles.container}>
        {this.renderPartBoxes(parts)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F5FCFF',
  }
});