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
    Image,
    ScrollView,
} from 'react-native';

import WeatherHeader from './index_components/weather_header';
import Thumbnail from './index_components/thumbnail';

export default class HomeScreen extends Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                backgroundColor="blue"
                barStyle="light-content"
                />
                <View style={styles.container}>
                    <StatusBar hidden={true} />
                    <WeatherHeader style={styles.weather_header} />
                    <View style={styles.nearby_posts}>
                        <Thumbnail onPressCamera={this.onPressCamera} navigator={this.props.navigator}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    weather_header: {
        flex: 4,
        backgroundColor: 'powderblue'
    },
    nearby_posts: {
        flex: 10,
        backgroundColor: 'skyblue',
    },
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
