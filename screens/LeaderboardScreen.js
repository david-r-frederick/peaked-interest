import * as React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firebase from 'firebase';
import { ChevronRight } from '../components/Chevrons';

export function LeaderboardScreen({ route, navigation, userId }) {
    const [sortBy, setSortBy] = React.useState('topSpeed');
    const [allUsers, setAllUsers] = React.useState([]);
    const unitsMap = {
        topSpeed: 'mph',
        largestVerticalDrop: 'ft',
        totalDistance: 'mi',
    };

    React.useEffect(() => {
        firebase
            .firestore()
            .collection('users')
            .get()
            .then((snapShot) => {
                const allUsers = [];
                snapShot.docs.forEach((doc) => {
                    allUsers.push({
                        ...doc.data(),
                        userId: doc.id,
                    });
                });
                setAllUsers([
                    ...allUsers.sort((x, y) => {
                        const firstValueNoLabel = x[sortBy].replace(unitsMap[sortBy], '');
                        const secondValueNoLabel = y[sortBy].replace(unitsMap[sortBy], '');
                        return +secondValueNoLabel - +firstValueNoLabel;
                    }),
                ]);
            });
    }, []);

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
                        setAllUsers([
                            ...allUsers.sort((x, y) => {
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
                            }),
                        ]);
                    }}
                >
                    <Picker.Item label="Top Speed" value="topSpeed" />
                    <Picker.Item label="Total Duration Skiing" value="totalDuration" />
                    <Picker.Item label="Largest Vertical Drop" value="largestVerticalDrop" />
                    <Picker.Item label="Total Distance" value="totalDistance" />
                </Picker>
            </View>
            <FlatList
                keyExtractor={(item) => item.id}
                data={allUsers}
                renderItem={({ item, index }) => {
                    const backgroundColorMap = {
                      0: 'gold',
                      1: 'silver',
                      2: 'bronze',
                    }
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
