import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const StopWatch = ({ running, getTime }) => {
    const [seconds, setSeconds] = useState(58);
    const [minutes, setMinutes] = useState(59);
    const [hours, setHours] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if (running) {
            startClickedHandler();
        } else {
            stopClickedHandler();
        }
    }, [running]);

    const startClickedHandler = () => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 59) {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 59) {
                            setHours((prevHours) => {
                                return prevHours + 1;
                            });
                            return 0;
                        }
                        return prevMinutes + 1;
                    });
                    return 0;
                }
                return prevSeconds + 1;
            });
        }, 1000);
        setTimer(interval);
    };

    const stopClickedHandler = () => {
        if (timer) {
            clearInterval(timer);
            setHours(0);
            setMinutes(59);
            setSeconds(58);
        }
    };

    const timeFormatted = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;

    if (getTime) {
        getTime(timeFormatted);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{timeFormatted}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
    },
    time: {
      marginVertical: 15,
      fontSize: 25
    }
});

export default StopWatch;
