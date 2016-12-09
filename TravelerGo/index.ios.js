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
import MyCamera from './takeCamera';

export default class TravelerGo extends Component {

    render() {
        return (
            <Navigator
                initialRoute={{title:'homeScreen'}}
                renderScene={(route, navigator) =>{
                    switch (route.title) {
                      case 'homeScreen':
                        return <HomeScreen navigator={navigator}/>
                      case 'takeCamera':
                        return <MyCamera navigator={navigator} />
                    }
                  }
                }
            />
        );
    }
}

AppRegistry.registerComponent('TravelerGo', () => TravelerGo);
