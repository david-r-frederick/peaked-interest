import * as React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { IconMapper } from '../Utility';

function TrailHistoryItem({ item }) {
    const { difficulty, trailId, startTime, endTime, duration, temperature, verticalDrop, distance, topSpeed } = item;
    const IconBackgroundMapper = {
        green: 'rgba(150, 200, 150, 0.1)',
        blue: 'rgba(150, 150, 240, 0.1)',
        black: 'rgba(150, 150, 150, 0.1)',
    };

    let difficultyIcon = IconMapper[difficulty];
    let backgroundColor = IconBackgroundMapper[difficulty];

    return (
        <View
            style={{
                ...styles.item,
                backgroundColor,
                borderColor: difficulty,
            }}
        >
            <View style={styles.itemHeader}>
                {difficultyIcon}
                <Text style={styles.itemName}>{trailId}</Text>
            </View>
            <View style={styles.statsContainer}>
                <Text style={styles.itemData}>Start: {startTime}</Text>
                <Text style={styles.itemData}>End: {endTime}</Text>
                <Text style={styles.itemData}>Duration: {duration}</Text>
                <Text style={styles.itemData}>Temperature: {temperature}</Text>
                <Text style={styles.itemData}>Top Speed: {topSpeed}</Text>
                <Text style={styles.itemData}>Avg Speed: </Text>
                <Text style={styles.itemData}>Vertical Drop: {verticalDrop}</Text>
                <Text style={styles.itemData}>Length: {distance}</Text>
            </View>
        </View>
    );
}

export function History({ displayName, trailsHistory }) {
    const allDates = Array.from(new Set(trailsHistory.map(({ date }) => date))).sort(
        (x, y) => new Date(y) - new Date(x)
    );

    const topSpeedEver = Math.max(...trailsHistory.map((trailObj) => trailObj.topSpeed));

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.infoCardHeading}>{displayName}</Text>
                <Text style={styles.infoCardLabel}>Top Speed Ever: {topSpeedEver}mph</Text>
                <Text style={styles.infoCardLabel}>
                    Total Time Skiing: &nbsp;
                    {trailsHistory
                        .map((trailObj) => trailObj.duration || '00:00:00')
                        .reduce((acc, cur) => {
                            const allThreeCur = cur.split(':').map((n) => +n);
                            const allThreeAcc = acc.split(':').map((n) => +n);
                            allThreeAcc.forEach((num, index) => {
                                allThreeCur[index] += num;
                            });
                            for (let i = 2; i > 0; i--) {
                                if (allThreeCur[i] >= 60) {
                                    allThreeCur[i - 1] += Math.floor(allThreeCur[i] / 60);
                                    allThreeCur[i] = allThreeCur[i] % 60;
                                }
                            }
                            return allThreeCur
                                .map((n) => {
                                    const asString = n.toString();
                                    return asString.length === 1 ? '0' + asString : n;
                                })
                                .join(':');
                        }, '00:00:00')}
                </Text>
            </View>
            <SectionList
                sections={allDates.map((date) => {
                    return {
                        title: date,
                        data: trailsHistory
                            .filter((trailItem) => trailItem.date === date)
                            .sort((x, y) => {
                                return new Date(y.date + ' ' + y.endTime) - new Date(x.date + ' ' + x.endTime);
                            }),
                    };
                })}
                renderItem={({ item, index }) => {
                    return <TrailHistoryItem borderTop={index === 0} item={item} />;
                }}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 5,
        marginBottom: 50,
    },
    sectionHeader: {
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
    },
    item: {
        flex: 1,
        width: '90%',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: '5%',
        borderWidth: 1,
    },
    statsContainer: {
        paddingVertical: 8,
        width: '100%',
    },
    itemHeader: {
        flexDirection: 'row',
    },
    itemName: {
        fontSize: 20,
        marginLeft: 10,
    },
    itemData: {
        fontSize: 15,
        color: 'rgb(75, 75, 75)',
    },
    card: {
        width: '90%',
        marginHorizontal: '5%',
        paddingHorizontal: 10,
        marginVertical: 8,
    },
    infoCardHeading: {
        fontSize: 27,
    },
    infoCardLabel: {
        fontSize: 15,
    },
});
