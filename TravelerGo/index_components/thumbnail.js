import React, { Component } from 'react';
import { StyleSheet, View, Modal, Text, TouchableHighlight, Slider} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Container, Content, Icon, Button} from 'native-base';


export default class ThumbNail extends Component {
    constructor(props){
        super(props);
        this.onPressCamera=this.props.onPressCamera.bind(this);
    }

    state = {
        modalVisible: false,
        distance: 0.5,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {

        return(
            <View style={styles.thumbNailContainer}>
            <View>
                <Modal animationType={"fade"} transparent={true} visible={this.state.modalVisible} onRequestClose={() => {alert("Modal has been closed.")}} >
                    <View>
                        <View style={{padding: 20}}>
                            <View style={styles.modalContainer}>
                            <Text style={styles.titleText} >
                                Change Filter Distance
                            </Text>
                            <Text style={styles.text} >
                                {this.state.distance && +this.state.distance.toFixed(3) } KM
                            </Text>
                            <Slider
                            {...this.props}
                            minimumValue={0.5}
                            maximumValue={3}
                            step={0.5}
                            onValueChange={(value) => this.setState({distance: value})} />
                            <Button onPress={() => {
                                this.setModalVisible(false)
                            } } style={{alignSelf: 'center', paddingTop: 5}}> OK </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

            {/*Rest of App come ABOVE the action button component!*/}
            <ActionButton buttonColor="rgba(231,76,60,1)" >
            <ActionButton.Item buttonColor='#3498db' title="Camera" onPress={this.onPressCamera}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="Upload" onPress={() => {}}>
            <Icon name="md-photos" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9CCC65' title="My Photo" onPress={() => {}}>
            <Icon name="md-person" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9b59b6' title="Set Range" onPress={() => this.setModalVisible(true)}>
            <Icon name="md-navigate" style={styles.actionButtonIcon} />
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
    thumbNailContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex:1,
        backgroundColor: '#f3f3f3'
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        marginTop: 250,
        padding: 20,
        borderRadius: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: {
            height: 4,
            width: 4
        }
    },
    withShadow: {
        height: 200,
        width: 200,
      	backgroundColor: 'grey',
        borderRadius: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 4,
            width: 4
        }
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    baseText: {
        fontFamily: 'Cochin',
    },
});
