import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {NavigationScreenProps, NavigationParams} from "react-navigation";
import {serverURL, rapiURL, parts} from '../constants';
import ROUTES from '../routes';
import axios from "axios";
import {AxiosRequestConfig} from "axios";

type States = {
  password: string,
  submitBtnDisabled: boolean,
}

export default class EntranceScreen extends Component<NavigationScreenProps<NavigationParams>, States> {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.moveToPartSelectScreen = this.moveToPartSelectScreen.bind(this);
    this.login = this.login.bind(this);
    this.testmode = this.testmode.bind(this);
    this.state = {
      password: '',
      submitBtnDisabled: false,
    }
  }
  moveToPartSelectScreen(team: number) {
    this.props.navigation.push(ROUTES.PartSelectScreen, { team });
  }
  login(password: string) {
    if (password == "testmode") {
      this.testmode();
      return;
    }
    this.setState({
      submitBtnDisabled: true
    });
    let config: AxiosRequestConfig = {
      method: 'POST',
      url: `${serverURL}/user/login`,
      data: {
        password
      }
    }
    axios(config).then((response) => {
      console.log(response.data);
      this.setState({
        submitBtnDisabled: false
      });
      if (response.status == 201) {
        if (response.data.error) {
          Alert.alert(response.data.error);
          return;
        }
        Alert.alert('성공',`${response.data.team}팀으로 입장`, [
          {
            text: "확인",
            onPress: () => { this.moveToPartSelectScreen(response.data.team) }
          }
        ], {
          cancelable: false
        });
      } else {
        Alert.alert("ERROR", "통신 에러");  
      }
    }).catch((err) => {
      console.error(err);
      Alert.alert("ERROR", "알수없는 에러가 발생했습니다");
    });
  }
  render() {
    return (
      <ImageBackground source={require("../images/background.jpeg")} style={styles.backgroundImage}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Text style={styles.textLogo}>- 팀 포크레인 -</Text>
            <View style={styles.passwordContainer}>
              <TextInput style={styles.passwordInput}
                placeholder="비밀번호 입력"
                onChangeText={(text) => {this.setState({password: text})}}
                underlineColorAndroid='transparent'/>
              <TouchableOpacity
                disabled={this.state.submitBtnDisabled}
                style={styles.passwordSubmitBtn}
                onPress={() => { this.login(this.state.password) }}>
                <Text>Log in</Text>
                </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
  testmode() {
    let time = 0;
    for ( let motor = 1; motor <= 6; motor++ ) {
      let url: string = `${rapiURL(1)}/motor-${motor}/`;
      for ( let moving = 0; moving <= 2; moving++ ) {
        time += 1500
        let tempUrl = url;
        if ( moving == 0 ) {
          tempUrl += 'forward/95';
        } 
        else if ( moving == 1 ) {
          tempUrl += 'backward/95';
        } else {
          tempUrl += 'stop';
        }
        setTimeout(() => {
          console.log(tempUrl);
          axios(tempUrl).then((response) => {
          }).catch((err) => {
            console.warn(err);
          });
        }, time);
      }
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogo: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  passwordContainer: {
    display: 'flex',
    width: '100%',
    marginBottom: '10%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  passwordInput: {
    minHeight: 45,
    width: '100%',
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
    marginTop: 30,
    marginBottom: 30,
  },
  passwordSubmitBtn: {
    width: '100%',
    backgroundColor: '#01c853',
    alignSelf: 'stretch',
    padding: 15,
    alignItems: 'center',
  }
})