/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TravelerGo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.weather_header}>
          Put weather, location here
        </Text>
        <Text style={styles.nearby_posts}>
          embed nearby postsa here
        </Text>
        <Text style={styles.bottom_functions}>
          put buttons heres
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weather_header: {
      flex: 2,
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
