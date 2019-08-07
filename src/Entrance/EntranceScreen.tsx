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
  rcUsageState: boolean|null
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
      rcUsageState: null
    }
  }
  componentWillMount() {
    axios(`${serverURL}/user/initialState`).then((response) => {
      console.log(response.data);
      if (response.status == 201) {
        if (response.data.error) {
          Alert.alert(response.data.error);
          return;
        }
        let rcUsageState = parseInt(response.data.rcUsageState) ? true : false;
        this.setState({rcUsageState});
      } else {
        Alert.alert("ERROR", "통신 에러");
      }
    }).catch((err) => {
      console.error(err);
      Alert.alert("ERROR", "알수없는 에러가 발생했습니다");
    });
  }
  moveToPartSelectScreen(team: number, rcUsageState: boolean) {
    this.props.navigation.push(ROUTES.PartSelectScreen, { team, rcUsageState });
  }
  login(password: string) {
    if (password == "testmode1") {
      this.testmode(1);
      return;
    } else if (password == "testmode2") {
      this.testmode(2);
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
            onPress: () => { this.moveToPartSelectScreen(response.data.team, this.state.rcUsageState!) }
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
    if ( this.state.rcUsageState != null ) {
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
    else {
      return (<View></View>)
    }
  }
  testmode(t: number) {
    if (t == 1) {
      let arr: Array<string> = [
        'motor-1/forward/100',
        'motor-1/backward/100',
        'motor-1/stop',
        'motor-2/forward/100',
        'motor-2/backward/100',
        'motor-2/stop',
        'motor-3/forward/100',
        'motor-3/backward/100',
        'motor-3/stop',
        'motor-4/forward/100',
        'motor-4/backward/100',
        'motor-4/stop',
        'motor-5/forward/100',
        'motor-5/backward/100',
        'motor-5/stop',
        'motor-6/forward/100',
        'motor-6/backward/100',
        'motor-6/stop',
      ];
      for(var i = 0; i < arr.length; i++){
        let time = 5000*i;
        if (i%3 == 0) {
          time -= 4000;
        }
        let url = `${rapiURL(1)}/${arr[i]}`;
        console.log(url);
        setTimeout(() => {
          axios(url).then(response => {
            
          }).catch((err) => {
            console.warn(err);
          });
        }, time);
      }
    } else if (t == 2) {

      // all forward
      let arr: Array<string> = [
        'motor-1/forward/100',
        'motor-2/forward/100',
        'motor-3/forward/100',
        'motor-4/forward/100',
        'motor-5/forward/100',
        'motor-6/forward/100',
      ]
      for(let i = 0; i < arr.length; i++){
        let time = 100*i;
        setTimeout(() => {
          axios(`${rapiURL(1)}/${arr[i]}`)
        }, time);
      }

      // all backward
      arr = [
        'motor-1/backward/100',
        'motor-2/backward/100',
        'motor-3/backward/100',
        'motor-4/backward/100',
        'motor-5/backward/100',
        'motor-6/backward/100',
      ]
      for(let i = 0; i < arr.length; i++){
        let time = 10000*i;
        setTimeout(() => {
          axios(`${rapiURL(1)}/${arr[i]}`)
        }, time);
      }
      
      // all stop
      arr = [
        'motor-1/stop',
        'motor-2/stop',
        'motor-3/stop',
        'motor-4/stop',
        'motor-5/stop',
        'motor-6/stop',
      ]
      for(let i = 0; i < arr.length; i++) {
        let time = 15000*i;
        setTimeout(() => {
          axios(`${rapiURL(1)}/${arr[i]}`);
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