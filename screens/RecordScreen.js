import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { EasyIcon, MediumIcon, HardIcon } from '../difficultyIcons/difficultyIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import firebase from 'firebase';
import axios from 'axios';
import { useEffect } from 'react';
import { Barometer } from 'expo-sensors';

function RecordButton({ title, width, paddingLeft, onPress }) {
    return (
        <TouchableOpacity style={{ ...styles.recordBtn, width }} onPress={onPress}>
            <Entypo name="vinyl" color="red" size={40} />
            <Text style={{ ...styles.recordLabel, paddingLeft }}>{title}</Text>
        </TouchableOpacity>
    );
}

export function RecordScreen({ route, displayName, navigation }) {
    const [currentlyRecording, setCurrentlyRecording] = useState(false);
    const [totalDuration, setTotalDuration] = useState(0);
    const [runStarted, setRunStarted] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [temperature, setTemperature] = useState('');
    const [currentPressure, setCurrentPressure] = useState(0);
    const [startAltitude, setStartAltitude] = useState(0);

    const { name, difficulty } = route.params;

    useEffect(() => {
        Barometer.addListener(({ pressure }) => {
            setCurrentPressure(pressure);
        });
    }, []);

    useEffect(() => {
        if (currentlyRecording) {
            setStartAltitude(hPaToFeet(currentPressure));
        }
    }, [currentlyRecording]);

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
                        const today = new Date();
                        const dd = String(today.getDate()).padStart(2, '0');
                        const mm = String(today.getMonth() + 1).padStart(2, '0');
                        const yyyy = today.getFullYear();
                        const date = `${mm}/${dd}/${yyyy}`;

                        let hours = today.getHours();
                        let minutes = today.getMinutes();
                        const ampm = hours >= 12 ? 'pm' : 'am';
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        minutes = minutes < 10 ? '0' + minutes : minutes;
                        const endTime = `${hours}:${minutes} ${ampm}`;

                        let endAltitude = hPaToFeet(currentPressure);
                        let verticalDrop = startAltitude - endAltitude;

                        firebase.firestore().collection('runs').add({
                            trailId: name,
                            userName: displayName,
                            date,
                            startTime,
                            endTime,
                            duration,
                            temperature,
                            verticalDrop: `${verticalDrop}ft`,
                        })
                        // .then(() => {
                        //     navigation.navigate('My History');
                        // });
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
            return (
                <View style={styles.resolveContainer}>
                    <TouchableOpacity style={styles.resolveBtn} onPress={() => setCurrentlyRecording(false)}>
                        <Ionicon
                            name="pause-circle-outline"
                            color="black"
                            size={40}
                            backgroundColor="white"
                            color="blue"
                        />
                        <Text style={styles.resolveLabel}>Pause</Text>
                    </TouchableOpacity>
                    {renderFinishButton()}
                </View>
            );
        } else {
            return (
                <View style={styles.resolveContainer}>
                    <RecordButton
                        title={runStarted ? 'Resume' : 'Start'}
                        paddingLeft={runStarted ? 2 : 15}
                        width={runStarted ? 145 : 300}
                        onPress={() => {
                            setCurrentlyRecording(true);
                            if (!runStarted) {
                                const today = new Date();
                                let hours = today.getHours();
                                let minutes = today.getMinutes();
                                const ampm = hours >= 12 ? 'pm' : 'am';
                                hours = hours % 12;
                                hours = hours ? hours : 12;
                                minutes = minutes < 10 ? '0' + minutes : minutes;
                                const startTimeString = `${hours}:${minutes} ${ampm}`;
                                setStartTime(startTimeString);
                                setRunStarted(true);
                            }
                        }}
                    />
                    {renderFinishButton()}
                </View>
            );
        }
    };

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=39.5791544&lon=-105.9414672&units=imperial&appid=da9156d2392f013a7e000b4e71847f75`
            )
            .then((response) => {
                setTemperature(`${response.data.current.temp} °F`);
            })
            .catch((err) => {
                alert(err.message);
            });
    }, []);

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
                            value: `${temperature}`,
                        },
                        {
                            label: 'Current Pressure',
                            value: currentPressure,
                        },
                        {
                            label: 'Start Altitude',
                            value: startAltitude,
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

function hPaToFeet(pressure) {
    return 145366.45 * (1 - Math.pow(pressure / 1013.25, 0.190284));
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
