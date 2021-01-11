import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function NewRunScreen() {
    return (
        <View style={styles.screen}>
            <Text>List of runs to track!</Text>
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
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
