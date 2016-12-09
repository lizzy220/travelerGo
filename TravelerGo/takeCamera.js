'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Button,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';

export default class MyCamera extends Component {
  constructor(props){
    super(props);
    this.cancle=this.cancle.bind(this);
    this.takePicture=this.takePicture.bind(this);
  }

  cancle(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <View style={styles.functionBar}>
            <Button style={styles.capture} onPress={this.cancle} title="cancel"/>
            <Button style={styles.capture} onPress={this.takePicture} title="capture"/>
          </View>
        </Camera>
      </View>
    );
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  functionBar: {
    flex: 0,
    flexDirection: 'row',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('MyCamera', () => MyCamera);
