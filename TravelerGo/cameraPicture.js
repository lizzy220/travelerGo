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
      this.addNewImage=this.addNewImage.bind(this);
      this.state={description: ''};
    }

    cancel(){
      this.props.navigator.popToTop();
    }

    upload(){
      navigator.geolocation.getCurrentPosition(
          (position) => {
              fetch('https://travelergo.herokuapp.com/api/uploadImage', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: "IamNotcat",
                    location:{
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    },
                    image: 'data:image/jpeg;base64,'+ this.props.image.data,
                    description: this.state.description,
                  })
              })
              .then((response)=>response.json())
              .then((responseJson) => {
                this.uploadNewImage(responseJson);
                this.props.navigator.popToTop();
              })
              .catch((error) => {
                console.error('upload fail');
              });
          },
          (error) => alert(JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
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
            onChangeText={(text) => this.setState({description: text})}
            value={this.state.description}
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
