import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    ScrollView,
    View,
    TouchableHighlight,
    Dimensions,
    Modal,
    Slider,
    Text,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';
import { Container, Content, Icon, Button} from 'native-base';


export default class ThumbNail extends Component {
    constructor(props){
      super(props);
      this.onPressCamera=this.onPressCamera.bind(this);
      this.clickPicture=this.clickPicture.bind(this);
      this.arrangeImages=this.arrangeImages.bind(this);
    }

    state = {
        modalVisible: false,
        distance: 0.5,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    onPressCamera(){
      var self = this;
      var options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
          cameraRoll: true,
        },
      };
      ImagePicker.launchCamera(options, (response) => {
          if(!response.didCancel){
            self.props.navigator.push({title: 'cameraPicture', image: response});
          }
      });
    }

    clickPicture(){
      console.log('clickPicture');
      this.props.navigator.push({title: 'pictureGo'});
    }

    arrangeImages(images){
      var length = images.length;
      var rows  = Math.floor(length / 2);
      var ret = [];
      for(var i=0, j= 0; i < rows; i++){
        ret.push(
          <View key={i} style={styles.scrollItemContainer}>
            {images.slice(j, j+2).map((image) =>
              <TouchableHighlight key={j++} style={styles.imageTouch} onPress={this.clickPicture}>
                <Image style={styles.image} source={require('../place_holder_cat.jpg')}>
                  <View style={styles.description}>
                    <Text style={{color: 'white'}}>a great place</Text>
                  </View>
                </Image>
              </TouchableHighlight>)}
          </View>
        );
      }
      var remain = length % 2;
      if(remain === 1){
        ret.push(
          <View key={rows} style={styles.scrollItemContainer}>
            <TouchableHighlight key={length-1} style={styles.imageTouch} onPress={this.clickPicture}>
              <Image style={styles.image} source={require('../place_holder_cat.jpg')}>
                <View style={styles.description}>
                  <Text style={{color: 'white'}}>a great place</Text>
                </View>
              </Image>
            </TouchableHighlight>
            <View style={styles.image}/>
          </View>
        );
      }
      return ret;
    }

    render() {
        var images=[1,2,3,4,5,6,7,8,9];
        var scrollItems=this.arrangeImages(images);
        return(
            <View style={styles.thumbNailContainer}>
            <View>
                <Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}} >
                    <View>
                        <View style={{padding: 20}}>
                            <View style={styles.modalContainer}>
                            <Text style={styles.titleText} >
                                Change Filter Distance
                            </Text>
                            <Text style={styles.text} >
                                {this.state.distance && +this.state.distance.toFixed(3) } KM
                            </Text>
                            <Slider
                            {...this.props}
                            minimumValue={0.5}
                            maximumValue={3}
                            step={0.5}
                            minimumTrackTintColor='rgba(231,76,60,1)'
                            onValueChange={(value) => this.setState({distance: value})} />
                            <Button onPress={() => {
                                this.setModalVisible(false)
                            } } style={{alignSelf: 'center', paddingTop: 5, backgroundColor: 'rgba(231,76,60,1)'}}> OK </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            <ScrollView style={{flex: 1}}>
              {scrollItems}
            </ScrollView>
            <ActionButton buttonColor="rgba(231,76,60,1)" >
            <ActionButton.Item buttonColor='#3498db' title="Camera" onPress={this.onPressCamera}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Refresh" onPress={() => {}}>
            <Icon name="md-refresh" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9CCC65' title="My Photo" onPress={() => {this.props.navigator.push({title: 'myPhoto'})}}>
            <Icon name="md-person" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9b59b6' title="Set Range" onPress={() => this.setModalVisible(true)}>
            <Icon name="md-navigate" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            </ActionButton>
            </View>
        )
    }
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  thumbNailContainer: {
    flex:1,
    backgroundColor: '#f3f3f3'
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    marginTop: 250,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      height: 4,
      width: 4
    }
  },
  withShadow: {
    height: 200,
    width: 200,
    backgroundColor: 'grey',
    borderRadius: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 4
    }
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 10
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  scrollItemContainer: {
    flexDirection: 'row',
  },
  imageTouch: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    borderColor: 'white',
    borderWidth: 1,
    flex:1,
    height:windowWidth*0.5,
    backgroundColor:'transparent',
  },
  description: {
    minHeight:50,
    backgroundColor:'rgba(255,255,255,0.4)',
    position:'absolute',
    bottom:0,
    right: 0,
    left: 0,
    borderTopWidth:0.5,
    borderTopColor:'rgba(255,255,255,0.6)',
  },
});
