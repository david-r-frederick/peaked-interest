import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Stopwatch from '../components/StopWatch';
import firebase from 'firebase';
import { Barometer } from 'expo-sensors';
import { IconMapper } from '../Utility';
import { Button } from '../components/common/Button';
import axios from 'axios';
import * as Location from 'expo-location';

function getCurrentTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return [`${hours}:${minutes} ${ampm}`, `${mm}/${dd}/${yyyy}`];
}

function hPaToFeet(pressure) {
    return 145366.45 * (1 - Math.pow(pressure / 1013.25, 0.190284));
}

export function RecordScreen({ route, userId, displayName, navigation, temperature, setTemperature }) {
    const [currentlyRecording, setCurrentlyRecording] = useState(false);
    const [totalDuration, setTotalDuration] = useState(0);
    const [runStarted, setRunStarted] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [currentPressure, setCurrentPressure] = useState(0);
    const [startAltitude, setStartAltitude] = useState(0);
    const [speeds, setSpeeds] = useState([]);
    const [remover, setRemover] = useState(null);

    const { name, difficulty, length } = route.params;

    useEffect(() => {
        Barometer.addListener(({ pressure }) => {
            setCurrentPressure(pressure);
        });
        return () => {
            Barometer.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        if (currentlyRecording) {
            setStartAltitude(hPaToFeet(currentPressure));
        }
    }, [currentlyRecording]);

    const finishHandler = () => {
        setCurrentlyRecording(false);
        remover.then((res) => {
            res.remove();
        });
        const [endTime, date] = getCurrentTime();

        let endAltitude = hPaToFeet(currentPressure);
        let verticalDrop = startAltitude - endAltitude;
        const topSpeed = (Math.max(...speeds) * 2.23694).toFixed(1);

        const fs = firebase.firestore();

        const saveToFirebase = (temp) => {
            fs.collection('runs')
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
                    topSpeed,
                    difficulty,
                    verticalDrop: verticalDrop.toFixed(2),
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
                alert(err.message);
                setTemperature('Unknown');
                saveToFirebase('Unknown');
            });
    };

    const pauseHandler = () => {
        setCurrentlyRecording(false);
        remover.then((res) => {
            console.log(res);
            res.remove();
        });
    };

    const recordHandler = () => {
        setCurrentlyRecording(true);
        let removePromise = Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.BestForNavigation,
                timeInterval: 1000,
            },
            (data) => {
                setSpeeds((prevSpeeds) => {
                    return [...prevSpeeds, data.coords.speed];
                });
            }
        );
        setRemover(removePromise);

        if (!runStarted) {
            const [startTime] = getCurrentTime();
            setStartTime(startTime);
            setRunStarted(true);
        }
    };

    const renderRecordControls = () => {
        return (
            <View style={styles.resolveContainer}>
                {currentlyRecording ? (
                    <Button icon={IconMapper['pause']} title="Pause" onPress={pauseHandler} width="half" />
                ) : (
                    <Button
                        icon={IconMapper['record']}
                        title={runStarted ? 'Resume' : 'Start'}
                        onPress={recordHandler}
                        width={runStarted ? 'half' : 'full'}
                    />
                )}
                {runStarted ? (
                    <Button icon={IconMapper['finish']} title="Finish" onPress={finishHandler} width="half" />
                ) : null}
            </View>
        );
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
            <View>
                <View style={styles.listItem}>
                    <Text style={styles.listItemLabel}>Current Temperature:</Text>
                    <Text style={styles.listItemValue}>{temperature}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listItemLabel}>Current Pressure: </Text>
                    <Text style={styles.listItemValue}>{currentPressure.toFixed(2)}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listItemLabel}>Start Altitude: </Text>
                    <Text style={styles.listItemValue}>{startAltitude.toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.recordBtnContainer}>
                <Text>Top Speed: {speeds.length ? (Math.max(...speeds) * 2.23694).toFixed(1) : 0}mph</Text>
                <Stopwatch shouldRun={currentlyRecording} getTime={setTotalDuration} />
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
    listItemValue: {
        fontSize: 18,
        color: 'rgb(25, 75, 25)',
    },
});
