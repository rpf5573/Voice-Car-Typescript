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
import {Locale} from '../constants';
import { NavigationScreenProps, NavigationParams } from "react-navigation";
import Voice from "react-native-voice";
import Spell from "./Spell";
import axios from "axios";
import { Part, Parts, Spell as SpellType } from "../@types/index";
import { TouchableHighlight } from "react-native-gesture-handler";

type States = {
  active: boolean;
  error: string;
  results: string[];
  partialResults: string[];
  part: Part;
  matchedSpellCode: number;
};
export default class SpeechScreen extends Component<NavigationScreenProps<NavigationParams>,States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    console.log(Voice);
    
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechError = this.onSpeechError
    Voice.onSpeechResults = this.onSpeechResults
    this.renderSpells = this.renderSpells.bind(this);
    this.sendStopMessage = this.sendStopMessage.bind(this);
  }
  state = {
    active: false,
    error: "",
    results: [],
    partialResults: [],
    part: this.props.navigation.getParam("part"),
    matchedSpellCode: 0
  };
  static navigationOptions = {
    title: "음성인식"
  };
  renderSpells(part: Part) {
    let spells: JSX.Element[] = [];
    part.spells.forEach((spell, index) => {
      let isMatched = false;
      if (this.state.matchedSpellCode == spell.code) {
        isMatched = true;
      }
      spells.push(
        <Spell key={spell.main + index} spell={spell} isMatched={isMatched} />
      );
    });
    return spells;
  }
  sendStopMessage() {
    console.warn("모든 동작을 중지시켰다");
    
  }
  render() {
    let btn = (
      <TouchableWithoutFeedback onPress={this.startRecognizing}>
        <Image
          style={styles.button}
          source={require("../images/ready_button.png")}
        />
      </TouchableWithoutFeedback>
    );
    let middleStyle: any[] = [styles.middle];
    if (this.state.active) {
      btn = (
        <TouchableWithoutFeedback onPress={this.stopRecognizing}>
          <Image
            style={styles.button}
            source={require("../images/active_button.png")}
          />
        </TouchableWithoutFeedback>
      );
      middleStyle.push(styles.dFlex);
    }
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>{this.state.part.korean} 명령어 목록</Text>
          <View style={styles.spellContainer}>
            {this.renderSpells(this.state.part)}
          </View>
        </View>
        <View style={middleStyle}>
          {this.state.results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.result}>
                {result}
              </Text>
            );
          })}
        </View>
        <View style={styles.bottom}>
          {btn}
          <TouchableHighlight onPress={() => {Alert.alert(
            ('모든 동작을 중지시키겠습니까?'),
            '',
            [
              {
                text: '아니오',
                onPress: () => {console.warn('아니오 클릭')}
              },
              {
                text: '예',
                onPress: () => {this.sendStopMessage()}
              }
            ]
          )}}>
            <Text style={styles.circleBtn}>
              중지
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStart = (e: Voice.StartEvent) => {
    // eslint-disable-next-line
    console.log("onSpeechStart: ", e);
  };
  onSpeechEnd = (e: Voice.EndEvent) => {
    // eslint-disable-next-line
    let matchedSpellCode = 0;
    if (this.state.results.length == 1) {
      let spell = this.state.results[0] as string;
      spell = spell.replace(/\s/g, "");
      console.log("spell : ", spell);
      this.state.part.spells.forEach((i: SpellType) => {
        i.similar.forEach((z: string) => {
          if (z == spell) {
            matchedSpellCode = i.code;
            const config = {
              method: "post",
              url: "http://voice-car.com",
              data: {
                code: i.code
              }
            };
            // axios(config).then(response => {
            // }).catch(e => {
            //   console.error( 'Error : ', e );
            // });
            Alert.alert("Code : " + i.code);
          }
        });
      });
    }
    this.setState({
      active: false,
      matchedSpellCode
    });
  };
  onSpeechError = (e: Voice.ErrorEvent) => {
    console.log(e);
    
    this.setState({
      error: JSON.stringify(e.error),
      active: false
    });
  };
  onSpeechResults = (e: Voice.Results) => {
    console.log(e.value);
    
    this.setState({
      results: e.value
    });
  };
  startRecognizing = async () => {
    this.setState({
      active: true,
      error: "",
      results: [],
      partialResults: []
    });
    try {
      await Voice.start(Locale.ko_KR);
    } catch (e) {
      console.error(e);
    }
  };
  stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };
  destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      error: "",
      results: [],
      partialResults: []
    });
  };
}

const styles = StyleSheet.create({
  button: {
    width: 75,
    height: 75
  },
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "space-between",
    marginBottom: 50
  },
  spellContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    marginBottom: 30
  },
  top: {},
  middle: {
    display: "none",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f2f4f7",
    padding: 10
  },
  dFlex: {
    display: "flex"
  },
  result: {
    fontSize: 30
  },
  bottom: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center"
  },
  circleBtn: {
    padding: 5,
    height: 100,
    width: 100,  //The Width must be the same as the height
    borderRadius:200, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor:'rgb(195, 125, 198)',
  } 
});
