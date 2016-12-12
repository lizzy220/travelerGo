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
} from 'react-native';

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
          </View>
          <TextInput style={styles.textinput}
            {...this.props}
            editable = {true}
            maxLength = {150}
            multiline = {true}
            numberOfLines = {2}
            placeholder={'Brief description (optional)'}
          />
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
    backgroundColor: 'black',
  },
  picContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  textinput:{
    flex:1,
    width: windowWidth*0.9,
    backgroundColor:'white',
    borderRadius: 5,
    alignSelf: 'center',
  },
  funcContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  func: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  img:{
    width: windowWidth,
    height: 350,
  }
});

AppRegistry.registerComponent('CameraPictureScreen', () => CameraPictureScreen);
