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
const Dimensions = require('Dimensions');
const windowSize = Dimensions.get('window');

export default class LoginPage extends Component {
  state = {
      username: '',
      password: '',
  };
  render(){
    return (
            <Image source={require('./loginbg.jpg')} style={styles.container} >
            <Text> test </Text>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Username"
                        placeholderTextColor="#FFF"
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        password={true}
                        style={[styles.input, styles.whiteFont]}
                        placeholder="Pasword"
                        placeholderTextColor="#FFF"
                        value={this.state.password}
                    />
                </View>
                <View style={styles.forgotContainer}>
                    <Text style={styles.greyFont}>Forgot Password</Text>
                </View>
            </View>
            <View style={styles.signin}>
                <Text style={styles.whiteFont}>Sign In</Text>
            </View>
            <View style={styles.signup}>
                <Text style={styles.greyFont}>No account?<Text style={styles.whiteFont}>  Sign Up</Text></Text>
            </View>
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
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: .5,
        backgroundColor: 'transparent'
    },
    mark: {
        width: 150,
        height: 150
    },
    signin: {
        backgroundColor: '#FF3366',
        padding: 20,
        alignItems: 'center'
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
    inputPassword: {
        marginLeft: 15,
        width: 20,
        height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
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
