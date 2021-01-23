import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ icon, title, onPress, width }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.button, width: width === 'full' ? 300 : 145 }}>
            {icon ? icon : null}
            <Text style={{ ...styles.title, paddingLeft: width === 'half' ? 2 : 15 }}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
    },
});
