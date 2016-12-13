/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/
'use strict';
import React, { Component} from 'react';
import {
    AppRegistry,
    Navigator,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Button,
} from 'react-native';
import HomeScreen from './homeScreen';
import CameraPictureScreen from './cameraPicture';
import PictureGo from './pictureGo';
import MyPhoto from './myPhoto';
import LoginPage from './loginPage';
import SignUp from './signupPage';

export default class TravelerGo extends Component {
    constructor(){
      super();
      this.state={images: []};
      this.uploadNewImage=this.uploadNewImage.bind(this);
      this.getImages=this.getImages.bind(this);
    }

    uploadNewImage(img){
      var tmp = this.state.images;
      this.setState({images: [img].concat(tmp)});
    }

    getImages(images){
      this.setState({images: images});
    }

    render() {
        return (
            <Navigator
                // initialRoute={{title:'homeScreen',}}
                initialRoute={{title:'loginPage',}}
                renderScene={(route, navigator) =>{
                    switch (route.title) {
                      case 'loginPage':
                        return <LoginPage />
                      case 'homeScreen':
                        return <HomeScreen navigator={navigator} images={this.state.images} getImages={this.getImages}/>
                      case 'cameraPicture':
                        return <CameraPictureScreen navigator={navigator} image={route.image} uploadNewImage={this.uploadNewImage}/>
                      case 'pictureGo':
                        return <PictureGo navigator={navigator} image={route.image}/>
                      case 'myPhoto':
                        return <MyPhoto navigator={navigator} />
                    }
                  }
                }
                configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
            />
        );
    }
}

AppRegistry.registerComponent('TravelerGo', () => TravelerGo);
