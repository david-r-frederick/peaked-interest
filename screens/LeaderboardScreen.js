import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function LeaderboardScreen() {
    return (
        <View style={styles.screen}>
            <Text>Leaderboard!</Text>
            {/*          
              Dropdown of filters
              List of names
              Each button in list has...
                Rank
                Name
                Stat
                (links to history of person)
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
