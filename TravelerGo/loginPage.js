'use strict';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    AppRegistry,
} from 'react-native';
import {Button, InputGroup, Input} from 'native-base'
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');
const { BlurView, VibrancyView } = require('react-native-blur');

export default class LoginPage extends Component {
  state = {
      username: '',
      password: '',
  };
  render(){
    return (
            <Image source={require('./loginbg.jpg')} style={styles.container}>
            <BlurView blurType="dark" blurAmount={0} style={styles.container}>
            <Text style={styles.header}>TravelerGo</Text>
                <View style={styles.inputContainer}>
                    <InputGroup borderType='rounded'>
                      <Input placeholder='Username'/>
                    </InputGroup>
                </View>
                <View style={styles.inputContainer}>
                <InputGroup borderType='rounded'>
                  <Input placeholder='Password'/>
                </InputGroup>
                </View>
                <View style={styles.forgotContainer}>
                    <Button block info>Forgot Password</Button>
                </View>
            <View style={styles.signin}>
                <Button block success>Sign In</Button>
            </View>
            <View style={styles.signup}>
                <Text style={styles.whiteFont}>No account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </View>
            </BlurView>
            </Image>

    )
  }
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 2,
      backgroundColor: 'transparent',
      justifyContent: 'space-around',
      alignItems: 'stretch',
      width: null,
      height: null,
    },
    header: {
        fontSize: 35,
        paddingTop: 150,
        paddingLeft: 100,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Cochin',
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
      alignItems: 'flex-end',
      padding: 15,
    },
    signup: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .25
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        alignItems: 'center'
    },
    forgotContainer: {
      alignItems: 'flex-end',
      padding: 15,
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
});

AppRegistry.registerComponent('LoginPage', () => LoginPage);
