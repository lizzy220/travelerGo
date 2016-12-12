'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class CameraPictureScreen extends Component {
    constructor(props){
      super(props);
      this.cancel=this.cancel.bind(this);
      this.upload=this.upload.bind(this);
    }

    cancel(){
      this.props.navigator.popToTop();
    }

    upload(){
      this.props.navigator.popToTop();
      //upload to database
      //add pic to homeScreen
    }

    render(){
      const source = {uri: 'data:image/jpeg;base64,' + this.props.image.data, isStatic: true};
      return(
        <View style={styles.container}>
          <View style={styles.picContainer}>
            <Image source={source} style={styles.img} />
          <TextInput style={styles.textinput}
            {...this.props}
            editable = {true}
            maxLength = {150}
            placeholder={'Brief description (optional)'}
          />
          </View>
          <KeyboardSpacer/>
          <View style={styles.funcContainer}>
            <Text style={styles.func} onPress={this.cancel}>Cancel</Text>
            <Text style={styles.func} onPress={this.upload}>Upload</Text>
          </View>
        </View>
      );
    }
}

const windowWidth=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  img:{
    width: windowWidth,
    height: 350,
  },
  textinput:{
    marginTop:20,
    width: windowWidth*0.95,
    borderRadius: 5,
    height:45,
    borderWidth:1,
    alignSelf: 'center',
  },
  funcContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  func: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('CameraPictureScreen', () => CameraPictureScreen);
