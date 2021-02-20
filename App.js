import React, { useState, useEffect } from 'react';
import {
    LeaderboardScreen,
    MyHistoryScreen,
    NewRunScreen,
    RecordScreen,
    RegisterScreen,
    UserHistoryScreen,
} from './screens';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Location from 'expo-location';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Leaderboard';

    switch (routeName) {
        case 'My History':
            return 'History';
        default:
            return routeName;
    }
}

function TabNavigator({ temperature, user, trailsHistory }) {
    const userTrailsOrdered = trailsHistory
        .filter((trailObj) => trailObj.userId === user.uid)
        .sort((x, y) => {
            return new Date(y.date + ' ' + y.endTime) - new Date(x.date + ' ' + x.endTime);
        });

    const mostRecentThree = [];
    for (let i = 0; i < userTrailsOrdered.length; i++) {
        const trailName = userTrailsOrdered[i].trailId;
        if (!mostRecentThree.includes(trailName)) {
            mostRecentThree.push(trailName);
        }
        if (mostRecentThree.length === 3) {
            break;
        }
    }

    return (
        <React.Fragment>
            <View style={styles.widget}>
                <Text style={styles.weatherText}>{temperature}</Text>
                <Text style={styles.location}>Keystone, CO</Text>
            </View>
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    activeBackgroundColor: 'rgb(255, 145, 0)',
                    activeTintColor: 'white',
                }}
                initialRouteName="Leaderboard"
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <EvilIcons name="trophy" size={35} color={color} />;
                        },
                    }}
                    name="Leaderboard"
                >
                    {(props) => <LeaderboardScreen {...props} userId={user.uid} />}
                </Tab.Screen>
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <Entypo name="area-graph" size={30} color={color} />;
                        },
                    }}
                    name="Trails"
                >
                    {(props) => (
                        <NewRunScreen
                            {...props}
                            mostRecents={mostRecentThree}
                            userId={user.uid}
                            temperature={temperature}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <Entypo name="back-in-time" size={30} color={color} />;
                        },
                    }}
                    name="My History"
                >
                    {(props) => (
                        <MyHistoryScreen
                            {...props}
                            displayName={user.displayName}
                            trailsHistory={trailsHistory.filter((trailObj) => trailObj.userId === user.uid)}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </React.Fragment>
    );
}

export default function App() {
    const [temperature, setTemperature] = useState('Loading...');
    const [user, setUser] = useState(null);
    const [trailsHistory, setTrailsHistory] = useState([]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
        })();
    }, []);

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

        firebase
            .firestore()
            .collection('runs')
            .onSnapshot((querySnapshot) => {
                const allTrails = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    allTrails.push({
                        ...data,
                        id: doc.id,
                    });
                });
                if (allTrails.length !== trailsHistory.length) {
                    setTrailsHistory(allTrails);
                }
            });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=39.6064085&lon=-105.9462657&units=imperial&appid=da9156d2392f013a7e000b4e71847f75`
            )
            .then((response) => {
                setTemperature(`${response.data.current.temp} °F`);
            })
            .catch((err) => {
                console.log(err.message);
                setTemperature('Unknown');
            });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register">
                    {(props) => <RegisterScreen {...props} userExists={!!user} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Trails"
                    options={({ route }) => {
                        return {
                            title: getHeaderTitle(route),
                        };
                    }}
                >
                    {(props) => (
                        <TabNavigator {...props} temperature={temperature} user={user} trailsHistory={trailsHistory} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="User History">
                    {(props) => <UserHistoryScreen {...props} trailsHistory={trailsHistory} />}
                </Stack.Screen>
                <Stack.Screen name="Record Run">
                    {(props) => (
                        <RecordScreen
                            {...props}
                            displayName={user.displayName}
                            userId={user.uid}
                            temperature={temperature}
                            setTemperature={setTemperature}
                        />
                    )}
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
        paddingVertical: 5,
        paddingLeft: 12,
        borderBottomColor: '#bbb',
        borderTopColor: '#bbb',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    weatherText: {
        fontSize: 24,
    },
    location: {
        fontSize: 14,
        color: 'rgb(100, 100, 100)',
    },
});
