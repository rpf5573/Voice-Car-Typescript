import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback, Alert, Image, ImageSourcePropType} from 'react-native';
import {Part} from '../@types/index';

type Props = {
  backgroundColor?: string,
  part: Part,
  moveToSpeechScreen: (part: Part) => void,
  image: ImageSourcePropType
}
export default class PartBox extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.partBox, {backgroundColor: this.props.backgroundColor}]}>
        <TouchableWithoutFeedback onPress={() => { Alert.alert(
          '안내',
          (this.props.part.korean + ' 로 진행하시겠습니까?'),
          [
            {
              text: '아니오',
              onPress: () => {console.warn('아니오 클릭')}
            },
            {
              text: '예',
              onPress: () => {this.props.moveToSpeechScreen(this.props.part)}
            }
          ]
        )
        }}>
          <View style={styles.innerBox}>
            <Text style={styles.btnText}>{this.props.part.korean}</Text>
            <Image style={styles.img} source={this.props.image} resizeMode="contain"></Image>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  partBox: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 50,
    color: 'black'
  },
  innerBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    maxWidth: 100,
    maxHeight: '100%'
  }
});