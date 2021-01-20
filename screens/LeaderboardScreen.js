import * as React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import firebase from 'firebase';

export function LeaderboardScreen({ route, navigation }) {
    const [sortBy, setSortBy] = React.useState('topSpeed');
    const [allUsers, setAllUsers] = React.useState([]);
    const unitsMap = {
        topSpeed: 'mph',
        largestVerticalDrop: 'ft',
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
                setAllUsers(
                    allUsers.sort((x, y) => {
                        const firstValueNoLabel = x[sortBy].replace(unitsMap[sortBy], '');
                        const secondValueNoLabel = y[sortBy].replace(unitsMap[sortBy], '');
                        return +secondValueNoLabel - +firstValueNoLabel;
                    })
                );
            });
    }, []);

    return (
        <View style={styles.screen}>
            <Picker
                selectedValue={sortBy}
                style={styles.picker}
                itemStyle={styles.pickerOption}
                mode="dropdown"
                dropdownIconColor="#000000"
                onValueChange={(itemValue, itemIndex) => {
                    setSortBy(itemValue);
                    setAllUsers(
                        allUsers.sort((x, y) => {
                            if (itemValue !== 'totalDuration') {
                                const firstValueNoLabel = x[itemValue].replace(unitsMap[itemValue], '');
                                const secondValueNoLabel = y[itemValue].replace(unitsMap[itemValue], '');
                                return +secondValueNoLabel - +firstValueNoLabel;
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
            </Picker>
            <FlatList
                keyExtractor={(item) => item.id}
                data={allUsers}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                console.log(allUsers);
                                navigation.navigate('My History', {
                                    userId: item.userId,
                                    displayName: item.displayName,
                                });
                            }}
                            style={styles.leaderboardItem}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text>{index + 1}</Text>
                                <Text style={styles.leaderboardItemHeading}>{item.displayName}</Text>
                            </View>
                            <Text style={styles.leaderboardItemLabel}>{item[sortBy]}</Text>
                        </TouchableOpacity>
                    );
                }}
            />
            {/*
				Dropdown of filters
				List of names
				Each button in list has...
				Rank
				Name
				Stat
				(links to history of person)
			*/}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1 },
    picker: {
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 5,
        height: 40,
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: '5%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 2,
    },
    leaderboardItemHeading: {
        fontSize: 18,
        marginLeft: 10,
    },
    leaderboardItemLabel: {
        fontSize: 18,
    },
});
