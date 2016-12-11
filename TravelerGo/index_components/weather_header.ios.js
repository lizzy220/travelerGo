import React, { Component } from 'react'
import {View, Text, Navigator, StyleSheet, Image } from 'react-native'
import { Container, Content, Icon} from 'native-base';
const { BlurView, VibrancyView } = require('react-native-blur');

export default class WeatherHeader extends Component {
    state = {
        lastPosition: null,
        position_name: null,
        weather: null,
        weather_cur_temp: '--°F',
        weather_temp_range: '--°F / --°F',
    };
    watchID: ?number = null;

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lastPosition: position});
                this.getLocation(position)
                this.getWeather(position)
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        this.watchID = navigator.geolocation.watchPosition((position) => {
            this.setState({lastPosition: position});
            this.getLocation(position)
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
            main = responseJson.weather[0]
            cur_temp = (responseJson.main.temp - 273.15).toFixed()
            low_temp = (responseJson.main.temp_min - 273.15).toFixed()
            high_temp = (responseJson.main.temp_max - 273.15).toFixed()
            unit = '°C'
            cur_temp_str = cur_temp + ' ' + unit
            temp_range_str = low_temp + ' ' + unit + ' / ' + high_temp + ' ' + unit
            this.setState({weather_cur_temp: cur_temp_str, weather_temp_range: temp_range_str, weather: main})
        } catch(error) {
            console.log(error);
        }
    }

    async getLocation(position) {
        console.log(position)
        const loc = {'lat': position.coords.latitude, 'lon': position.coords.longitude}
        try {
            var headers = new Headers();
            google_map_url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+loc.lat + ',' + loc.lon + '&result_type=locality&key=AIzaSyAvPsaA7HzHExgy-TER2mZjJ_2keqYRwSw';
            console.log(google_map_url)
            let response = await fetch(google_map_url,
                {
                  method: "GET",
                  headers: headers
                }
            );
            let responseJson = await response.json();
            console.log(responseJson)
            if (responseJson.status == 'OK') {
                name = responseJson.results[0].address_components[0].long_name;
                this.setState({position_name: name})
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        var location = '------'
        if (this.state.position_name != null) {
            location = this.state.position_name
        }
        var weather_desc = '---'
        var icon_name = 'ios-sunny-outline'
        if (this.state.weather != null) {
            weather_desc = this.state.weather.description
            var weather_code = this.state.weather.id / 100
            if (weather_code == 2) {
                icon_name = 'ios-thunderstorm-outline'
            } else if (weather_code == 3) {
                icon_name = 'ios-rainy-outline'
            } else if (weather_code == 5) {
                icon_name = 'ios-rainy-outline'
            } else if (weather_code == 6) {
                icon_name = 'ios-snow-outline'
            } else if (weather_code == 7) {
                icon_name = 'ios-nuclear-outline'
            } else if (weather_code == 8) {
                icon_name = 'ios-sunny-outline'
            } else {
                icon_name = 'ios-cloud-outline'
            }
        }
        return (
            <Image source={require('../bg.jpg')} style={styles.container}>
               <BlurView blurType="dark" blurAmount={5} style={styles.container}>
                <Icon name={icon_name} style={styles.weather_icon}/>
                <View style={styles.weather}>
                <Text style={styles.location_name}>{location}</Text>
                <Text style={styles.weather_desc}>
                    {weather_desc}  {this.state.weather_cur_temp}
                </Text>
                <Text style={styles.weather_temp_range}>
                    {this.state.weather_temp_range}
                </Text>
                </View>
                </BlurView>
            </Image>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        width: null,
        height: null,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'stretch',
    },
    weather_icon: {
        fontSize: 100,
        color: 'white',
        paddingLeft: 2,
        fontStyle: 'italic',
    },
    location_name: {
        fontSize: 35,
        paddingTop: 10,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Cochin',
    },
    weather: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingRight: 2,
    },
    weather_desc: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Cochin',
        fontWeight: 'bold',
    },
    weather_temp_range: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Cochin',
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
});
