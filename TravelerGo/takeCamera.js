'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import {Icon} from 'native-base';

export default class MyCamera extends Component {
  constructor(props){
    super(props);
    this.cancel=this.cancel.bind(this);
    this.takePicture=this.takePicture.bind(this);
  }

  cancel(){
    this.props.navigator.pop();
    console.log('cancel camera');
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
            <View style={styles.function}><Text style={styles.cancel} onPress={this.cancel}>Cancel</Text></View>
            <View style={styles.function}><Icon name="ios-radio-button-on" style={styles.shot} onPress={this.takePicture}/></View>
            <View style={styles.function}></View>
          </View>
        </Camera>
      </View>
    );
  }

  takePicture() {
    var self = this;
    this.camera.capture()
      .then((path) => {
          console.log('take pic');
          self.props.navigator.push({title: 'cameraPicture'});
      })
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
    height: 100,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  function: {
    flex: 1,
  },
  shot: {
    color: '#fff',
    fontSize: 75,
    alignSelf:'center',
  },
  cancel: {
    color: '#fff',
    fontSize: 25,
    paddingLeft: 10,
  }
});

AppRegistry.registerComponent('MyCamera', () => MyCamera);
