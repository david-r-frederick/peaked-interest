import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ChevronRight } from '../components/Chevrons';
import { combineDurations } from '../Utility';
import firebase from 'firebase';

const backgroundColorMap = {
    0: 'gold',
    1: 'silver',
    2: '#cd7f32',
};

const unitsMap = {
    topSpeed: 'mph',
    avgSpeed: 'mph',
    largestVerticalDrop: 'ft',
    totalDistance: 'mi',
    totalDuration: '',
};

const LeaderBoardItem = ({ navigation, item, index, sortCat, userId }) => {
    let backgroundColor = backgroundColorMap[index] || '#ddd';

    const itemClickHandler = () => {
        if (item.userId === userId) {
            navigation.navigate('My History');
        } else {
            navigation.navigate('User History', {
                userId: item.userId,
                displayName: item.displayName,
            });
        }
    };

    return (
        <View style={{ ...styles.line, borderTopWidth: index ? 0 : 1 }}>
            <TouchableHighlight onPress={itemClickHandler} underlayColor="lightgrey">
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
                        <Text style={styles.leaderboardItemLabel}>
                            {item[sortCat]}&nbsp;
                            {unitsMap[sortCat]}
                        </Text>
                        <ChevronRight />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
};

export function LeaderboardScreen({ navigation, userId }) {
    const [sortCat, setSortCat] = useState('topSpeed');
    const [allUsers, setAllUsers] = useState([]);

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
                const usersWithMaxes = userIds.map((userId) => {
                    const thisUsersData = allRuns.filter((runObj) => runObj.userId === userId);
                    const leaderboardData = thisUsersData.reduce(
                        (acc, cur) => {
                            return {
                                ...acc,
                                totalDuration: combineDurations(cur.duration, acc.totalDuration),
                                totalDistance: acc.totalDistance + cur.distance,
                                topSpeed: cur.topSpeed > acc.topSpeed ? cur.topSpeed : acc.topSpeed,
                                avgSpeed: acc.avgSpeed + cur.avgSpeed,
                                largestVerticalDrop:
                                    cur.verticalDrop > acc.largestVerticalDrop
                                        ? cur.verticalDrop
                                        : acc.largestVerticalDrop,
                            };
                        },
                        {
                            displayName: thisUsersData[0].userName,
                            userId,
                            totalDuration: '00:00:00',
                            totalDistance: 0,
                            largestVerticalDrop: 0,
                            topSpeed: 0,
                            avgSpeed: 0,
                        }
                    );

                    return {
                        ...leaderboardData,
                        avgSpeed: parseFloat((leaderboardData.avgSpeed / thisUsersData.length).toFixed(1)),
                    };
                });
                setAllUsers(usersWithMaxes);
            });
    }, []);

    const pickerHandler = (sortCat) => {
        setSortCat(sortCat);
        setAllUsers([
            ...allUsers.sort((x, y) => {
                if (sortCat !== 'totalDuration') {
                    return parseFloat(y[sortCat]) - parseFloat(x[sortCat]);
                }
                const xTotalDurationSplit = x.totalDuration.split(':').map((n) => +n);
                const yTotalDurationSplit = y.totalDuration.split(':').map((n) => +n);
                for (let i = 0; i < 3; i++) {
                    if (xTotalDurationSplit[i] !== yTotalDurationSplit[i]) {
                        return yTotalDurationSplit[i] - xTotalDurationSplit[i];
                    }
                }
                return 0;
            }),
        ]);
    };

    return (
        <View style={styles.screen}>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={sortCat}
                    style={styles.picker}
                    itemStyle={styles.pickerOption}
                    mode="dropdown"
                    dropdownIconColor="#010101"
                    onValueChange={pickerHandler}
                >
                    <Picker.Item label="Top Speed" value="topSpeed" />
                    <Picker.Item label="Average Speed" value="avgSpeed" />
                    <Picker.Item label="Total Duration Skiing" value="totalDuration" />
                    <Picker.Item label="Largest Vertical Drop" value="largestVerticalDrop" />
                    <Picker.Item label="Total Distance" value="totalDistance" />
                </Picker>
            </View>
            <FlatList
                keyExtractor={({ userId }) => userId}
                data={allUsers}
                renderItem={({ item, index }) => (
                    <LeaderBoardItem
                        navigation={navigation}
                        item={item}
                        index={index}
                        sortCat={sortCat}
                        userId={userId}
                    />
                )}
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
