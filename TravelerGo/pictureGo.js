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
  Button,
  Linking,
} from 'react-native';

export default class PictureGo extends Component {
  constructor(props){
    super(props);
    this.backHome=this.backHome.bind(this);
    this.gotoMap=this.gotoMap.bind(this);
  }

  backHome(){
    this.props.navigator.pop();
  }

  gotoMap(){
    const url = 'http://maps.apple.com/?ll=50.894967,4.341626';
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.back}>
          <Button title='Back' onPress={this.backHome}/>
        </View>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={require('./place_holder_cat.jpg')} />
        </View>
        <View style={styles.go}>
          <Button title='Go' onPress={this.gotoMap}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    flex: 1,
  },
  imgContainer: {
    flex: 7,
  },
  img: {
    flex: 1,
  },
  go: {
    flex: 3,
  }
});

AppRegistry.registerComponent('PictureGo', () => PictureGo);
