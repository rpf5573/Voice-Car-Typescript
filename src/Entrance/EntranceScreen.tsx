import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';
import {NavigationScreenProps, NavigationParams} from "react-navigation";
import {serverURL} from '../constants';
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
    this.state = {
      password: '',
      submitBtnDisabled: false,
    }
  }
  moveToPartSelectScreen(team: number) {
    this.props.navigation.push(ROUTES.PartSelectScreen, { team });
  }
  login(password: string) {
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
      console.log(err)
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