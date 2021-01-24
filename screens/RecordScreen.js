import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Stopwatch from '../components/StopWatch';
import firebase from 'firebase';
import { Barometer } from 'expo-sensors';
import { IconMapper, getCurrentTime } from '../Utility';
import { Button } from '../components/common/Button';
import axios from 'axios';
import * as Location from 'expo-location';

function hPaToFeet(pressure) {
    return 145366.45 * (1 - Math.pow(pressure / 1013.25, 0.190284));
}

export function RecordScreen({ route, userId, displayName, navigation, temperature, setTemperature }) {
    const [currentlyRecording, setCurrentlyRecording] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const [currentPressure, setCurrentPressure] = useState(0);
    const [startAltitude, setStartAltitude] = useState(0);
    const [speeds, setSpeeds] = useState([]);
    const [remover, setRemover] = useState(null);

    const { name, difficulty, length } = route.params;

    useEffect(
        () =>
            function () {
                Barometer.removeAllListeners();
            },
        []
    );

    const haltHandler = (finished) => {
        setCurrentlyRecording(false);
        remover.then((res) => {
            res.remove();
        });
        if (finished) {
            const [endTime, date] = getCurrentTime();
            Barometer.removeAllListeners();

            const saveToFirebase = (temp) => {
                firebase
                    .firestore()
                    .collection('runs')
                    .add({
                        trailId: name,
                        userId,
                        userName: displayName,
                        date,
                        startTime,
                        endTime,
                        duration: totalDuration,
                        distance: length,
                        temperature: temp,
                        topSpeed: Math.max(...speeds).toFixed(1),
                        avgSpeed: speeds.reduce((x, y) => x + y) / speeds.length,
                        difficulty,
                        verticalDrop: (startAltitude - hPaToFeet(currentPressure)).toFixed(2),
                    })
                    .then(() => {
                        navigation.navigate('My History');
                    });
            };

            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/onecall?lat=39.5792&lon=105.9347&units=imperial&appid=da9156d2392f013a7e000b4e71847f75`
                )
                .then((response) => {
                    setTemperature(response.data.current.temp);
                    saveToFirebase(response.data.current.temp);
                })
                .catch((err) => {
                    setTemperature('Unknown');
                    saveToFirebase('Unknown');
                });
        }
    };

    const recordHandler = () => {
        setCurrentlyRecording(true);
        Barometer.addListener(({ pressure }) => {
            setCurrentPressure(pressure);
            setStartAltitude(hPaToFeet(pressure));
        });
        let removePromise = Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
            },
            (data) => {
                setSpeeds((prevSpeeds) => {
                    return [...prevSpeeds, data.coords.speed * 2.23694];
                });
            }
        );
        setRemover(removePromise);

        if (!startTime) {
            const [startTime] = getCurrentTime();
            setStartTime(startTime);
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                {IconMapper[difficulty]}
                <View>
                    <Text style={styles.trailName}>{name}</Text>
                    <Text style={styles.trailLength}>{length} miles</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.listItemLabel}>Current Temperature: {temperature}</Text>
                <Text style={styles.listItemLabel}>Current Pressure: {currentPressure.toFixed(2)}</Text>
                <Text style={styles.listItemLabel}>Start Altitude: {startAltitude.toFixed(2)} </Text>
                <Text style={styles.listItemLabel}>
                    Top Speed: {speeds.length ? (Math.max(...speeds) * 2.23694).toFixed(1) : 0}mph
                </Text>
            </View>
            <View style={styles.recordBtnContainer}>
                <Stopwatch shouldRun={currentlyRecording} getTime={setTotalDuration} />
                <View style={styles.resolveContainer}>
                    {currentlyRecording ? (
                        <Button
                            icon={IconMapper['pause']}
                            title="Pause"
                            onPress={() => haltHandler(false)}
                            width="half"
                        />
                    ) : (
                        <Button
                            icon={IconMapper['record']}
                            title={startTime ? 'Resume' : 'Start'}
                            onPress={recordHandler}
                            width={startTime ? 'half' : 'full'}
                        />
                    )}
                    {startTime ? (
                        <Button
                            icon={IconMapper['finish']}
                            title="Finish"
                            onPress={() => haltHandler(true)}
                            width="half"
                        />
                    ) : null}
                </View>
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
    resolveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 300,
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
});
