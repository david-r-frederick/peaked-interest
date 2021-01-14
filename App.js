import * as React from 'react';
import { LeaderboardScreen, MyHistoryScreen, NewRunScreen, RecordScreen } from './screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
	return (
		<Tab.Navigator initialRouteName="Runs">
			<Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
			<Tab.Screen name="Trails" component={NewRunScreen} />
			<Tab.Screen name="My History" component={MyHistoryScreen} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Trails" component={TabNavigator} />
				<Stack.Screen name="Record Run" component={RecordScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}