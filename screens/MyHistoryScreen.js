import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from 'firebase';

export function MyHistoryScreen() {

  React.useEffect(() => {
    
  }, []);

	return (
		<View style={styles.screen}>
			<Text>My Run History!</Text>
			{/* 
				Name of Person
				Stats
				Top Speed Ever
				Total Duration Skiing
				Top speed of last run
				Duration of last run
				History
				(list of runs)
				each item has...
					name of run
					difficulty
					max speed
					duration
					time started
					temperature
					distance
					vertical drop
			*/}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
