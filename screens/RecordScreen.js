import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { EasyIcon, MediumIcon, HardIcon } from '../difficultyIcons/difficultyIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';

function RecordButton({ title, width, paddingLeft, onPress }) {
    return (
        <TouchableOpacity style={{ ...styles.recordBtn, width }} onPress={onPress}>
            <Entypo name="vinyl" color="red" size={40} />
            <Text style={{ ...styles.recordLabel, paddingLeft }}>{title}</Text>
        </TouchableOpacity>
    );
}

export function RecordScreen({ route, navigation }) {
    const [currentlyRecording, setCurrentlyRecording] = useState(false);
    const [totalDuration, setTotalDuration] = useState(0);
    const [runStarted, setRunStarted] = useState(false);

    const { name, difficulty } = route.params;

    const renderInfoListItem = ({ item }) => {
        return (
            <View style={styles.listItem}>
                <Text style={styles.listItemLabel}>{item.label}: </Text>
                <Text style={styles.listItemValue}>{item.value}</Text>
            </View>
        );
    };

    let duration;

    const renderFinishButton = () => {
        if (runStarted) {
            return (
                <TouchableOpacity
                    style={{ ...styles.resolveBtn, marginLeft: 10 }}
                    onPress={() => {
                        setCurrentlyRecording(false);
                        setTotalDuration(duration);
                        navigation.navigate('My History', {
                            personName: 'David',
                            trailName: name,
                            difficulty,
                            topSpeed: 'Top Speed',
                            totalDuration,
                            startTime: 'start time',
                            temperature: 'temperature',
                            distance: 'distance',
                            verticalDrop: 'vertical drop',
                        });
                    }}
                >
                    <Ionicon name="stop-circle-outline" color="black" size={40} backgroundColor="white" />
                    <Text style={styles.resolveLabel}>Finish</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };

    const renderRecordControls = () => {
        if (currentlyRecording) {
            return <View style={styles.resolveContainer}>
                <TouchableOpacity style={styles.resolveBtn} onPress={() => setCurrentlyRecording(false)}>
                    <Ionicon name="pause-circle-outline" color="black" size={40} backgroundColor="white" color="blue" />
                    <Text style={styles.resolveLabel}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.resolveBtn, marginLeft: 10 }}
                    onPress={() => {
                        setCurrentlyRecording(false);
                        setTotalDuration(duration);
                        navigation.navigate('My History');
                    }}
                >
                    <Ionicon name="stop-circle-outline" color="black" size={40} backgroundColor="white" />
                    <Text style={styles.resolveLabel}>Finish</Text>
                </TouchableOpacity>
            </View>;
        } else {
            return <View style={styles.resolveContainer}>
                <RecordButton
                    title={runStarted ? 'Resume' : 'Start'}
                    paddingLeft={runStarted ? 2 : 15}
                    width={runStarted ? 145 : 300}
                    onPress={() => {
                        setCurrentlyRecording(true);
                        if (!runStarted) {
                            setRunStarted(true);
                        }
                    }}
                />
                {renderFinishButton()}
            </View>;
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                {difficulty === 'green' ? <EasyIcon /> : difficulty === 'blue' ? <MediumIcon /> : <HardIcon />}
                <View>
                    <Text style={styles.trailName}>{name}</Text>
                    <Text style={styles.trailLength}>1.2 miles</Text>
                </View>
            </View>
            <View>
                <FlatList
                    data={[
                        {
                            label: 'Current Temperature',
                            value: '2C',
                        },
                        {
                            label: 'Vertical Drop',
                            value: '1261 ft',
                        },
                    ]}
                    renderItem={renderInfoListItem}
                    keyExtractor={(item) => item.label}
                />
            </View>
            <View style={styles.recordBtnContainer}>
                <Stopwatch start={currentlyRecording} getTime={(time) => (duration = time)} />
                {renderRecordControls()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
    },
    recordBtnContainer: {
        position: 'absolute',
        bottom: 15,
    },
    recordBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: 300,
    },
    resolveBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        width: 145,
    },
    resolveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resolveLabel: {
        fontSize: 25,
    },
    recordLabel: {
        fontSize: 25,
        paddingLeft: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    trailName: {
        fontSize: 30,
        marginLeft: 15,
    },
    trailLength: {
        marginLeft: 15,
        color: 'rgb(100, 100, 100)',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        paddingVertical: 15,
    },
    listItemLabel: {
        fontSize: 18,
    },
    listItemValue: {
        fontSize: 18,
        color: 'rgb(25, 75, 25)',
    },
});
