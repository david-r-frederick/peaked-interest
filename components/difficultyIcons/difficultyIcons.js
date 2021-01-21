import * as React from 'react';
import { View } from 'react-native';

export const EasyIcon = () => {
    return <View style={{ width: 30, height: 30, borderRadius: 30 / 2, backgroundColor: 'green' }} />;
};

export const MediumIcon = () => {
    return <View style={{ width: 30, height: 30, backgroundColor: 'blue' }} />;
};

export const HardIcon = () => {
    return <View style={{ width: 27, height: 27, backgroundColor: 'black', transform: [{ rotate: '45deg' }] }} />;
};