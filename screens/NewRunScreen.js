import * as React from 'react';
import { Text, View, StyleSheet, SectionList, TouchableHighlight } from 'react-native';

const runs = [
	{ name: 'Ballhooter', difficulty: 'blue' },
	{ name: 'Dercum\'s Dash', difficulty: 'blue' },
	{ name: 'Flying Dutchman', difficulty: 'blue' },
	{ name: 'Frenchman', difficulty: 'blue' },
	{ name: 'Ina\'s Way', difficulty: 'green' },
	{ name: 'Last Chance', difficulty: 'green' },
	{ name: 'Paymaster', difficulty: 'blue' },
	{ name: 'Schoolmarm', difficulty: 'green' },
	{ name: 'Scout', difficulty: 'green' },
	{ name: 'Silver Spoon', difficulty: 'green' },
	{ name: 'Whipsaw', difficulty: 'blue' }
];

const recentRuns = runs.filter(x => ['Schoolmarm', 'Ina\'s Way'].includes(x.name));

function RunItem(props) {
	return (
		<View style={styles.item}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<View style={styles[props.item.difficulty]} />
				<Text style={styles.itemName}>{props.item.name}</Text>
			</View>
			<View style={styles.rightArrow} />
		</View>
	);
}

export function NewRunScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{ title: 'Recent', data: recentRuns },
					{ title: 'All Runs', data: runs },
				]}
				renderItem={({ item }) =>
					<TouchableHighlight
						onPress={() => navigation.navigate('Record Run', item)}
						underlayColor="lightgray">
						<RunItem item={item}></RunItem>
					</TouchableHighlight>
				}
				renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
				keyExtractor={(item, index) => index}
			/>
			{/* 
				Recent Runs
				(list of recent runs, buttons)
				All Runs
				List of runs to choose from (buttons)
					each buttons has..
					Name of run
					Difficulty (as icon)
					Color coded
					Lift to take
			*/}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	sectionHeader: {
		paddingTop: 8,
		paddingLeft: 20,
		paddingRight: 10,
		paddingBottom: 4,
		fontSize: 16,
		fontWeight: 'bold',
		color: 'grey',
		backgroundColor: 'rgba(247,247,247,1.0)',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 30,
	},
	itemName: {
		paddingLeft: 10,
		fontSize: 22,
	},
	green: {
		width: 30,
		height: 30,
		borderRadius: 30 / 2,
		backgroundColor: 'green'
	},
	blue: {
		width: 30,
		height: 30,
		backgroundColor: 'blue'
	},
	rightArrow: {
		width: 10,
		height: 10,
		color: 'grey',
		borderColor: 'grey',
		borderTopWidth: 2,
		borderRightWidth: 2,
		transform: [{ rotate: '45deg' }]
	},
});
