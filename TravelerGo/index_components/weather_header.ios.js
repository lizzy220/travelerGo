import React, { Component } from 'react'
import {View, Text, Navigator, StyleSheet } from 'react-native'
import { Container, Content, Icon} from 'native-base';

export default class WeatherHeader extends Component {
    state = {
        lastPosition: null,
        position_name: null
    };
    watchID: ?number = null;

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lastPosition: position});
                this.getWeather(position)
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({lastPosition: position});
            this.getWeather(position)
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    async getWeather(position) {
        console.log(position)
        const loc = {'lat': position.coords.latitude, 'lon': position.coords.longitude}
        try {
            var headers = new Headers();
            open_weather_url = 'http://api.openweathermap.org/data/2.5/weather?APPID=23f2c34e1e7c91ecfe2b2427451c6a07&lat=' + loc.lat + '&lon=' + loc.lon;
            console.log(open_weather_url)
            let response = await fetch(open_weather_url,
                {
                  method: "GET",
                  headers: headers
                }
            );
            let responseJson = await response.json();
            console.log(responseJson)
            this.setState({position_name: responseJson.name})
        } catch(error) {
            console.error(error);
        }
    }

    render() {
        var location = '------'
        if (this.state.position_name != null) {
            location = this.state.position_name
        }
        return (
            <View style={styles.container}>
            <Icon name="ios-sunny" style={styles.weather_icon}/>
            <Text style={styles.location_name}>
            {location}
            </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'powderblue',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    weather_icon: {
        fontSize: 100,
        color: 'yellow',
        paddingTop: 10,
        paddingRight: 10,
    },
    location_name: {
        fontSize: 40,
        paddingTop: 10,
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 10,
    }
});
