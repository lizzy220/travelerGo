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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

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
      return(
        <View style={styles.container}>
          <View style={styles.picContainer}>
            <Image style={styles.img} source={require('./place_holder_cat.jpg')} />
          </View>
          <View style={styles.funcContainer}>
            <Text style={styles.func} onPress={this.cancel}>Cancel</Text>
            <Text style={styles.func} onPress={this.upload}>Upload</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picContainer: {
    flex: 9,
  },
  funcContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'blue',
    alignItems: 'center',
  },
  func: {
    flex: 1,
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('CameraPictureScreen', () => CameraPictureScreen);
