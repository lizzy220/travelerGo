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
} from 'react-native';

import WeatherHeader from './index_components/weather_header';

export default class TravelerGo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                backgroundColor="blue"
                barStyle="light-content"
                />
                <Navigator
                initialRoute={{title:'Travel Go', index: 0}}
                renderScene={(route, navigator) =>
                    <View style={styles.container}>
                        <StatusBar hidden={true} />
                        <WeatherHeader style={styles.weather_header} />
                        <Text style={styles.nearby_posts}>
                        embed nearby postsa here
                        </Text>
                        <Text style={styles.bottom_functions}>
                        put buttons heres
                        </Text>
                    </View>
                }
                />
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
    bottom_functions: {
        flex: 1,
        backgroundColor: 'steelblue',
    }
});

AppRegistry.registerComponent('TravelerGo', () => TravelerGo);
