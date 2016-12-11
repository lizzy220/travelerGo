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

export default class TravelerGo extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{title:'homeScreen',}}
                renderScene={(route, navigator) =>{
                    switch (route.title) {
                      case 'homeScreen':
                        return <HomeScreen navigator={navigator}/>
                      case 'cameraPicture':
                        return <CameraPictureScreen navigator={navigator} image={route.image}/>
                      case 'pictureGo':
                        return <PictureGo navigator={navigator}/>
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
