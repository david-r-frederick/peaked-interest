import * as React from 'react';
import {
    LeaderboardScreen,
    MyHistoryScreen,
    NewRunScreen,
    RecordScreen,
    RegisterScreen,
    UserHistoryScreen,
} from './screens';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

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
    return (
        <React.Fragment>
            <View style={styles.widget}>
                <Text style={styles.weatherText}>Keystone, CO</Text>
                <Text style={styles.weatherText}>Current Temperature: {temperature}</Text>
            </View>
            <Tab.Navigator tabBarOptions={{ showLabel: false }} initialRouteName="Trails">
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
                            mostRecents={trailsHistory
                                .sort((x, y) => {
                                    return new Date(y.date + ' ' + y.endTime) - new Date(x.date + ' ' + x.endTime);
                                })
                                .slice(0, 3)
                                .map((trailObj) => trailObj.trailId)}
                            userId={user.uid}
                            temperature={temperature}
                        />
                    )}
                </Tab.Screen>
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, size }) => {
                            return <Entypo name="back-in-time" color={color} size={30} />;
                        },
                    }}
                    name="My History"
                >
                    {(props) => (
                        <MyHistoryScreen
                            {...props}
                            displayName={user.displayName}
                            trailsHistory={trailsHistory.filter((trailObj) => {
                                return trailObj.userId === user.uid;
                            })}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </React.Fragment>
    );
}

export default function App() {
    const [temperature, setTemperature] = React.useState('Unknown');
    const [user, setUser] = React.useState(null);
    const [userRoutesQuantity, setUserRoutesQuantity] = React.useState(0);
    const [trailsHistory, setTrailsHistory] = React.useState([]);

    React.useEffect(() => {
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
    });

    React.useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=39.5792&lon=105.9347&units=imperial&appid=da9156d2392f013a7e000b4e71847f75`
            )
            .then((response) => {
                setTemperature(`${response.data.current.temp} °F`);
            })
            .catch((err) => {
                alert(err.message);
                setTemperature('Unknown');
            });
    }, [userRoutesQuantity]);

    React.useEffect(() => {
        const db = firebase.firestore().collection('runs');
        db.get().then((snapShot) => {
            const allTrails = [];
            snapShot.docs.forEach((doc) => {
                const data = doc.data();
                allTrails.push({
                    ...data,
                    id: doc.id,
                });
            });
            setTrailsHistory(allTrails);
        });
    }, [userRoutesQuantity]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register">
                    {(props) => <RegisterScreen {...props} userExists={!!user} />}
                </Stack.Screen>
                <Stack.Screen
                    options={({ route }) => {
                        return {
                            title: getHeaderTitle(route),
                        };
                    }}
                    name="Trails"
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
                            updateRoutesCount={() => {
                                return new Promise((resolve, reject) => {
                                    setUserRoutesQuantity(userRoutesQuantity + 1);
                                    resolve();
                                });
                            }}
                            displayName={user.displayName}
                            userId={user.uid}
                            temperature={temperature}
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
