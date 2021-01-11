import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function RecordScreen() {
    return (
        <View style={styles.screen}>
            <Text>RECORD!</Text>
            {/* 
              Record
              Name of run
              Difficulty of run
              Length
              Vertical drop of run
              Current temperature
              How long recording
              Record button (replaced with pause ability)
              Finish and resume button when recording
            */}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
