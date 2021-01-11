import * as React from 'react';
import { LeaderboardScreen, MyHistoryScreen, NewRunScreen } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
                <Tab.Screen name="Track Run" component={NewRunScreen} />
                <Tab.Screen name="My History" component={MyHistoryScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
