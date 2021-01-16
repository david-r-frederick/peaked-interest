import * as React from 'react';
import { LeaderboardScreen, MyHistoryScreen, NewRunScreen, RecordScreen, Unregistered } from './screens';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ route, navigation, temperature }) {
    return (
        <React.Fragment>
            <View style={styles.widget}>
                <Text style={styles.weatherText}>Current Temperature: {temperature}</Text>
            </View>
            <Tab.Navigator initialRouteName="Runs">
                <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
                <Tab.Screen name="Trails">
                    {(props) => <NewRunScreen {...props} temperature={temperature} />}
                </Tab.Screen>
                <Tab.Screen name="My History" component={MyHistoryScreen} />
            </Tab.Navigator>
        </React.Fragment>
    );
}

export default function App() {
    const [temperature, setTemperature] = React.useState('something else');

    useEffect(() => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: 'AIzaSyCV62W7Aiaa1Y0KOTubkAvcQ5qCWY2N94k',
                authDomain: 'peaked-interest.firebaseapp.com',
                databaseURL: 'https://peaked-interest-default-rtdb.firebaseio.com',
                projectId: 'peaked-interest',
                storageBucket: 'peaked-interest.appspot.com',
                messagingSenderId: '1072528476291',
                appId: '1:1072528476291:web:a60a6e2f3c5f55c658f3b6',
            });
        }

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=39.5792&lon=105.9347&units=imperial&appid=da9156d2392f013a7e000b4e71847f75`
            )
            .then((response) => {
                setTemperature(`${response.data.current.temp} °F`);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Unregistered">
                  {(props) => <Unregistered {...props} />}
                </Stack.Screen>
                <Stack.Screen name="Trails">
                    {(props) => <TabNavigator {...props} temperature={temperature} />}
                </Stack.Screen>
                <Stack.Screen name="Record Run" component={RecordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    widget: {
        backgroundColor: '#bbb',
        position: 'absolute',
        bottom: 48,
        width: '100%',
        zIndex: 1000,
        paddingVertical: 10,
        paddingLeft: 8,
    },
    weatherText: {
        fontSize: 16,
    },
});
