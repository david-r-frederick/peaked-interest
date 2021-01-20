import * as React from 'react';
import { LeaderboardScreen, MyHistoryScreen, NewRunScreen, RecordScreen, Register } from './screens';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import firebase from 'firebase';
import axios from 'axios';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ route, navigation, temperature, user }) {
    return (
        <React.Fragment>
            <View style={styles.widget}>
                <Text style={styles.weatherText}>Keystone, CO</Text>
                <Text style={styles.weatherText}>Current Temperature: {temperature}</Text>
            </View>
            <Tab.Navigator initialRouteName="Runs">
                <Tab.Screen name="Leaderboard">{(props) => <LeaderboardScreen {...props} />}</Tab.Screen>
                <Tab.Screen name="Trails">
                    {(props) => <NewRunScreen {...props} temperature={temperature} />}
                </Tab.Screen>
                <Tab.Screen name="My History">{(props) => <MyHistoryScreen {...props} userId={user.uid} displayName={user.displayName} />}</Tab.Screen>
            </Tab.Navigator>
        </React.Fragment>
    );
}

export default function App() {
    const [temperature, setTemperature] = React.useState('something else');
    const [user, setUser] = React.useState(null);

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

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

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
                <Stack.Screen name="Register">{(props) => <Register {...props} userExists={!!user} />}</Stack.Screen>
                <Stack.Screen name="Trails">
                    {(props) => <TabNavigator {...props} temperature={temperature} user={user} />}
                </Stack.Screen>
                <Stack.Screen name="Record Run">
                    {(props) => <RecordScreen {...props} displayName={user.displayName} userId={user.uid} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    widget: {
        backgroundColor: 'rgb(245, 245, 245)',
        position: 'absolute',
        bottom: 48,
        width: '100%',
        zIndex: 1000,
        paddingVertical: 8,
        paddingLeft: 12,
        borderBottomColor: '#bbb',
        borderTopColor: '#bbb',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    weatherText: {
        fontSize: 14,
    },
});
