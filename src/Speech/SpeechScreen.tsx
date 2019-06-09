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
import {Locale, serverURL} from '../constants';
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
  matchedSpellCode: number;
};
export default class SpeechScreen extends Component<NavigationScreenProps<NavigationParams>,States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart
    Voice.onSpeechEnd = this.onSpeechEnd
    Voice.onSpeechError = this.onSpeechError
    Voice.onSpeechResults = this.onSpeechResults
    this.renderSpells = this.renderSpells.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
  }
  part: Part = this.props.navigation.getParam("part");
  state = {
    active: false,
    error: "",
    results: [],
    partialResults: [],
    matchedSpellCode: 0
  };
  static navigationOptions = {
    title: "음성인식"
  };

  // render
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
          <Text style={styles.title}>{this.part.korean} 명령어 목록</Text>
          <View style={styles.spellContainer}>
            {this.renderSpells(this.part)}
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
        </View>
        <View style={styles.allStopBtnContainer}>
          <TouchableWithoutFeedback onPress={() => {Alert.alert(
            ('모든 동작을 중지시키겠습니까?'),
            '',
            [
              {
                text: '아니오',
                onPress: () => {console.warn('아니오 클릭')}
              },
              {
                text: '예',
                onPress: () => {this.sendCommand(this.part.stop.command, () => {
                  this.setState({
                    active: false,
                    results: [],
                    matchedSpellCode: 0
                  });
                })}
              }
            ]
          )}}>
            <Text style={styles.allStopBtn}>중지</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  // custom function
  sendCommand(command: string|undefined, callback: () => void) {
    callback();
    let url: string = `${serverURL}/${command}`;
    console.log(url);
    axios(url).then((response) => {
    }).catch((err) => {
      if ( err.response ) {
      }
    });
  }

  // life cycle
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  // voice recognition functions
  onSpeechStart = (e: Voice.StartEvent) => {
    // eslint-disable-next-line
    console.log("onSpeechStart: ", e);
  };
  onSpeechEnd = (e: Voice.EndEvent) => {
    // eslint-disable-next-line
    let matchedSpellCode = 0;
    let matchedCommand = undefined;
    if (this.state.results.length == 1) {
      let spell = this.state.results[0] as string;
      spell = spell.replace(/\s/g, "");
      this.part.spells.forEach((i: SpellType) => {
        i.similar.forEach((z: string) => {
          if (z == spell) {
            matchedSpellCode = i.code;
            matchedCommand = i.command;
          }
        });
      });
    }
    this.sendCommand(matchedCommand, () => {
      this.setState({
        active: false,
        matchedSpellCode
      });
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
    paddingTop: 50,
    justifyContent: "space-between",
    paddingBottom: 80,
    position: 'relative'
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
  allStopBtnContainer: {
    padding: 10,
    width: '100%',  //The Width must be the same as the height
    backgroundColor:'rgb(195, 125, 198)',
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0,
  },
  allStopBtn: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  }
});
