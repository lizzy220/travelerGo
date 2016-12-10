import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Container, Content, Icon} from 'native-base';


export default class ThumbNail extends Component {
    constructor(props){
      super(props);
      this.onPressCamera=this.props.onPressCamera.bind(this);
    }

    render() {
        return(
            <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
            {/*Rest of App come ABOVE the action button component!*/}
            <ActionButton buttonColor="rgba(231,76,60,1)" >
            <ActionButton.Item buttonColor='#9b59b6' title="Explore" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-navigate" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Camera" onPress={this.onPressCamera}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Upload" onPress={() => {}}>
            <Icon name="md-photos" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9CCC65' title="My Photo" onPress={() => {}}>
            <Icon name="md-person" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
