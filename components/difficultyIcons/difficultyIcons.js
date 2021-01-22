import * as React from 'react';
import { View } from 'react-native';

export const EasyIcon = () => {
    return <View style={{ width: 25, height: 25, borderRadius: 30 / 2, backgroundColor: 'green' }} />;
};

export const MediumIcon = () => {
    return <View style={{ width: 25, height: 25, backgroundColor: 'blue' }} />;
};

export const HardIcon = () => {
    return <View style={{ width: 22, height: 22, backgroundColor: 'black', transform: [{ rotate: '45deg' }] }} />;
};