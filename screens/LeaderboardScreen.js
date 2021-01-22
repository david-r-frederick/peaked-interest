import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronRight } from '../components/Chevrons';
import { combineDurations } from '../Utility';
import firebase from 'firebase';

export function LeaderboardScreen({ navigation, userId }) {
    const [sortBy, setSortBy] = useState('topSpeed');
    const [allUsers, setAllUsers] = useState([]);
    const unitsMap = {
        topSpeed: 'mph',
        largestVerticalDrop: 'ft',
        totalDistance: 'mi',
    };

    useEffect(() => {
        firebase
            .firestore()
            .collection('runs')
            .get()
            .then((snapShot) => {
                let userIds = [];
                const allRuns = [];
                snapShot.docs.forEach((doc) => {
                    const runObject = doc.data();
                    allRuns.push(runObject);
                    userIds.push(runObject.userId);
                });
                userIds = [...new Set(userIds)];
                const foo = userIds.map((userId) => {
                    const thisUsersData = allRuns.filter((runObj) => runObj.userId === userId);
                    const displayName = thisUsersData[0].userName;
                    const durations = [];
                    const verticalDrops = [];
                    const distances = [];
                    for (let i = 0; i < thisUsersData.length; i++) {
                        const currentData = thisUsersData[i];
                        durations.push(currentData.duration);
                        verticalDrops.push(parseFloat(currentData.verticalDrop.replace('ft', '')));
                    }
                    
                    const totalDuration = durations.reduce((x, y) => {
                        return combineDurations(x, y);
                    });

                    const largestVerticalDrop = `${Math.max(...verticalDrops)}ft`;

                    const totalDistance = '5mi';

                    return {
                        displayName,
                        userId,
                        totalDuration,
                        totalDistance,
                        largestVerticalDrop,
                        topSpeed: `${Math.round(Math.random() * 50)}mph`,
                    };
                });
                setAllUsers(foo);
            });
    }, []);

    console.log(allUsers);

    return (
        <View style={styles.screen}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={sortBy}
                    style={styles.picker}
                    itemStyle={styles.pickerOption}
                    mode="dropdown"
                    dropdownIconColor="#000000"
                    onValueChange={(itemValue) => {
                        setSortBy(itemValue);
                        setAllUsers(
                            allUsers.sort((x, y) => {
                                if (itemValue !== 'totalDuration') {
                                    const firstValueNoLabel = x[itemValue].replace(unitsMap[itemValue], '');
                                    const secondValueNoLabel = y[itemValue].replace(unitsMap[itemValue], '');
                                    return parseFloat(secondValueNoLabel) - parseFloat(firstValueNoLabel);
                                } else {
                                    const xTotalDurationSplit = x.totalDuration.split(':').map((el) => +el);
                                    const yTotalDurationSplit = y.totalDuration.split(':').map((el) => +el);
                                    for (let i = 0; i < 3; i++) {
                                        if (xTotalDurationSplit[i] !== yTotalDurationSplit[i]) {
                                            return yTotalDurationSplit[i] - xTotalDurationSplit[i];
                                        }
                                    }
                                    return 0;
                                }
                            })
                        );
                    }}
                >
                    <Picker.Item label="Top Speed" value="topSpeed" />
                    <Picker.Item label="Total Duration Skiing" value="totalDuration" />
                    <Picker.Item label="Largest Vertical Drop" value="largestVerticalDrop" />
                    <Picker.Item label="Total Distance" value="totalDistance" />
                </Picker>
            </View>
            <FlatList
                keyExtractor={(item, index) => index}
                data={allUsers}
                renderItem={({ item, index }) => {
                    const backgroundColorMap = {
                        0: 'gold',
                        1: 'silver',
                        2: 'bronze',
                    };
                    let backgroundColor = backgroundColorMap[index] || '#ddd';
                    return (
                        <View style={{ ...styles.line, borderTopWidth: index === 0 ? 1 : 0 }}>
                            <TouchableHighlight
                                onPress={() => {
                                    if (item.userId === userId) {
                                        navigation.navigate('My History');
                                    } else {
                                        navigation.navigate('User History', {
                                            userId: item.userId,
                                            displayName: item.displayName,
                                        });
                                    }
                                }}
                                underlayColor="lightgrey"
                            >
                                <View style={styles.leaderboardItem}>
                                    <View style={styles.leaderboardNameAndRank}>
                                        <Text
                                            style={{
                                                ...styles.leaderboardRank,
                                                backgroundColor,
                                            }}
                                        >
                                            {index + 1}
                                        </Text>
                                        <Text style={styles.leaderboardItemHeading}>{item.displayName}</Text>
                                    </View>
                                    <View style={styles.leaderboardNameAndRank}>
                                        <Text style={styles.leaderboardItemLabel}>{item[sortBy]}</Text>
                                        <ChevronRight />
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    picker: {
        width: '100%',
        height: 50,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 5,
        backgroundColor: '#ddd',
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: '5%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        marginVertical: 2,
    },
    leaderboardItemHeading: {
        fontSize: 18,
        marginLeft: 10,
    },
    leaderboardItemLabel: {
        fontSize: 18,
        marginRight: 12,
    },
    leaderboardRank: {
        fontSize: 18,
        paddingHorizontal: 7,
        borderWidth: 1,
        color: 'black',
        borderRadius: 3,
        textAlign: 'center',
    },
    leaderboardNameAndRank: { flexDirection: 'row', alignItems: 'center' },
    line: {
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 1,
        width: '100%',
    },
});
