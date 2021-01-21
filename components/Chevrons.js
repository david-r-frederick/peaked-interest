import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const ChevronRight = (props) => {
    return <View style={{ ...styles.chevron, ...styles.right }}></View>;
};

const styles = StyleSheet.create({
    chevron: {
        width: 10,
        height: 10,
        color: 'grey',
        borderColor: 'grey',
        borderTopWidth: 2,
        borderRightWidth: 2,
    },
    right: {
        transform: [{ rotate: '45deg' }],
    },
});
