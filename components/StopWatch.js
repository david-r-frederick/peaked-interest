import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

function secondsToTime(seconds) {
    let secondsCopy = seconds;

    const hours = Math.floor(secondsCopy / 3600);
    secondsCopy = secondsCopy % 3600;
    const minutes = Math.floor(secondsCopy / 60);
    secondsCopy = secondsCopy % 60;
    const secs = secondsCopy;
    return [hours, minutes, secs].map((n) => n.toString().padStart(2, '0')).join(':');
}

const StopWatch = ({ shouldRun, getTime }) => {
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (shouldRun) {
            startClickedHandler();
        } else {
            pauseClickedHandler();
        }
        return function () {
            clearInterval(timer);
        };
    }, [shouldRun]);

    const startClickedHandler = () => {
        const interval = setInterval(() => {
            if (getTime) {
                getTime(secondsToTime(seconds + 1));
            }
            setSeconds((prevSeconds) => {
                return prevSeconds + 1;
            });
        }, 1000);
        setTimer(interval);
    };

    const pauseClickedHandler = () => {
        if (timer) {
            clearInterval(timer);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{secondsToTime(seconds)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    time: {
        marginVertical: 15,
        fontSize: 25,
    },
});

export default StopWatch;
