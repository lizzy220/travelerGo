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

import ImagePicker from 'react-native-image-picker';
import WeatherHeader from './index_components/weather_header';

export default class HomeScreen extends Component {
    constructor(props){
      super(props);
      this.onPressCamera=this.onPressCamera.bind(this);
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
                        <Text style={styles.nearby_posts}>
                        embed nearby postsa here
                        </Text>
                        <View style={styles.bottom_functions}>
                        <Button
                          onPress={this.onPressCamera}
                          title="camera"
                          color="#841584"
                          accessibilityLabel="open camera"
                          />
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
    bottom_functions: {
        flex: 1,
        backgroundColor: 'steelblue',
    }
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
