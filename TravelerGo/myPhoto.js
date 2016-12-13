'use strict';
import React, { Component} from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import {Button, Icon} from 'native-base';

export default class MyPhoto extends Component {
  constructor(props){
    super(props);
    this.state={canSelect: false,
                images: [],
                deleteFlags: []};
    this.selectOrCancel=this.selectOrCancel.bind(this);
    this.backHome=this.backHome.bind(this);
    this.deleteSingleImage=this.deleteSingleImage.bind(this);
    this.deleteImages=this.deleteImages.bind(this);
    this.refreshDeleteFlags=this.refreshDeleteFlags.bind(this);
  }

  componentDidMount(){
    fetch('https://travelergo.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "IamNotcat",
        })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({images: responseJson});
        this.refreshDeleteFlags(responseJson.length);
    })
    .catch((error) => {
      console.error('fail to get images by distance');
    });
  }

  refreshDeleteFlags(length){
    var tmp = [];
    for(var i=0; i < length; i++) tmp.push(false);
    this.setState({deleteFlags: tmp});
  }

  backHome(){
    this.props.navigator.pop();
  }

  selectOrCancel(){
    const cur = this.state.canSelect;
    this.setState({canSelect: !cur});
  }

  arrangeImages(images){
    var length = images.length;
    var rows  = Math.floor(length / 3);
    var ret = [];
    for(var i=0, j= 0; i < rows; i++){
      ret.push(
        <View key={i} style={styles.scrollItemContainer}>
          {images.slice(j, j+3).map((image) =>
            <Photo key={j++} canSelect={this.state.canSelect} image={image} />)}
        </View>
      );
    }
    var remain = length % 3;
    if(remain === 1){
      ret.push(
        <View key={rows} style={styles.scrollItemContainer}>
          <Photo key={length - 1} canSelect={this.state.canSelect} image={images[length-1]}/>
          <View style={styles.imageTouch}/>
          <View style={styles.imageTouch}/>
        </View>
      );
    }else if(remain === 2){
      ret.push(
        <View key={rows} style={styles.scrollItemContainer}>
          <Photo key={length - 2} canSelect={this.state.canSelect} image={images[length-2]}/>
          <Photo key={length - 1} canSelect={this.state.canSelect} image={images[length-1]}/>
          <View style={styles.imageTouch}/>
        </View>
      );
    }
    return ret;
  }

  deleteSingleImage(index, shouldDelete){
      var tmp = this.state.deleteFlags.slice();
      tmp[index] = shouldDelete;
      this.setState({deleteFlags: tmp});
  }

  deleteImages(){
    var remainedImages = [];
    var deletedImages = [];
    for(var i = 0; i < this.state.images.length; i++){
      if(this.state.deleteFlags[i]){
        deletedImages.push(images[i]._id);
      }else{
        remainedImages.push(images[i]);
      }
    }
    this.setState({images: remainedImages});
    this.refreshDeleteFlags(remainedImages.length);
    fetch('http://localhost:3001/api/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: "IamNotcat",
          images: deletedImages,
        })
    })
    .then((response) => console.log('delete successfully'))
    .catch((error) => {
      console.error('delete fail');
    });
  }

  render(){
    var scrollItems=this.arrangeImages(this.state.images);
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Button info onPress={this.backHome} style={{backgroundColor: 'transparent'}} color='white'>
            Back
            <Icon name='ios-arrow-back' />
          </Button>
          <Button info style={{backgroundColor: 'transparent'}} color='white' onPress={this.selectOrCancel}>
            {this.state.canSelect? 'Cancel' : 'Select'}
          </Button>
        </View>
        <View style={styles.body}>
          {scrollItems}
        </View>
        <View style={styles.footer}>
          <Icon name='ios-trash' onPress={this.deleteImages} style={{color: 'white'}}/>
        </View>
      </View>
    );
  }
}

class Photo extends Component {
  constructor(props){
    super(props);
    this.state={selected: false};
    this.clickPicture=this.clickPicture.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.canSelect !== nextProps.canSelect){
      this.setState({selected: false});
    }
  }

  clickPicture(){
    if(this.props.canSelect){
      var curSelectState = this.state.selected;
      this.props.deleteSingleImage(this.props.key, !curSelectState);
      this.setState({selected: !curSelectState});
    }
  }

  render(){
    if(this.props.canSelect && this.state.selected){
      return(
        <View style={styles.imageTouch}>
          <TouchableHighlight style={styles.imageTouch} onPress={this.clickPicture}>
            <Image blurRadius={3} style={styles.image} source={{uri: this.props.image.image, isStatic: true}}/>
          </TouchableHighlight>
          <Icon color='#9CCC65' name='ios-checkmark-circle' style={{position: 'absolute', bottom: 2, right: 4}}/>
        </View>
      );
    }else{
      return(
        <View style={styles.imageTouch}>
          <TouchableHighlight style={styles.imageTouch} onPress={this.clickPicture}>
            <Image style={styles.image} source={require('./place_holder_cat.jpg')}/>
          </TouchableHighlight>
        </View>
      );
    }
  }
}
const windowWidth=Dimensions.get('window').width;
const styles=StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:'#9CCC65',
    borderBottomColor: '#F5FCFF',
    borderBottomWidth: 1,
  },
  body: {
    flex: 12,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor:'#9CCC65',
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
    height:windowWidth*0.33,
  },
});

AppRegistry.registerComponent('MyPhoto', () => MyPhoto);
