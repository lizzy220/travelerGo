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
  Linking,
  ScrollView,
} from 'react-native';
import {Button, Icon} from 'native-base';

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
        <View style={styles.backContainer}>
          <Button info onPress={this.backHome} style={{backgroundColor: 'transparent'}} color='black'>
            Back
            <Icon name='ios-arrow-back' />
          </Button>
        </View>
        <View style={styles.imgContainer}>
        <ScrollView style={{paddingTop:50}}
          horizontal={true}
          bouncesZoom={true}
          maximumZoomScale={1.5}>
          <Image style={styles.img} source={{uri: this.props.image.image, isStatic: true}}/>
        </ScrollView>
        <Text style={{color:'white', height:50}}>{this.props.image.description}</Text>
        </View>
        <View style={styles.goConatiner}>
          <TouchableHighlight style={styles.go} underlayColor='#ff7043' onPress={this.gotoMap}>
            <Text style={{fontSize: 35, color: 'white'}}>Go</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const windowWidth=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
  backContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  imgContainer: {
    backgroundColor: 'black',
  },
  img: {
    height:350,
    width: windowWidth,
  },
  goConatiner: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  go:{
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
});

AppRegistry.registerComponent('PictureGo', () => PictureGo);
