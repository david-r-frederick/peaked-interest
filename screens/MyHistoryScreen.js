import * as React from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import firebase from 'firebase';
import { EasyIcon, MediumIcon, HardIcon } from '../difficultyIcons/difficultyIcons';

function TrailHistoryItem(props) {
    const { item } = props;

    let difficultyIcon = null;
    let backgroundColor = null;
    if (item.difficulty) {
        if (item.difficulty === 'green') {
            difficultyIcon = <EasyIcon />;
            backgroundColor = 'rgba(150, 200, 150, 0.1)';
        } else if (item.difficulty === 'blue') {
            difficultyIcon = <MediumIcon />;
            backgroundColor = 'rgba(150, 150, 240, 0.1)';
        } else {
            difficultyIcon = <HardIcon />;
            backgroundColor = 'rgba(150, 150, 150, 0.1)';
        }
    }

    return (
        <View
            style={{
                ...styles.item,
                backgroundColor,
                borderColor: item.difficulty,
            }}
        >
            <View style={styles.itemHeader}>
                {difficultyIcon}
                <Text style={styles.itemName}>{item.trailId}</Text>
            </View>
            <View style={styles.statsContainer}>
                <Text style={styles.itemData}>Start: {item.startTime}</Text>
                <Text style={styles.itemData}>End: {item.endTime}</Text>
                <Text style={styles.itemData}>Duration: {item.duration}</Text>
                <Text style={styles.itemData}>Temperature: {item.temperature}</Text>
                <Text style={styles.itemData}>Vertical Drop: {item.verticalDrop}</Text>
            </View>
        </View>
    );
}

export function MyHistoryScreen({ route, userId, displayName }) {
    const [trailsHistory, setTrailsHistory] = React.useState([]);
    const [allDates, setAllDates] = React.useState([]);

    React.useEffect(() => {
        const db = firebase.firestore().collection('runs');
        db.get().then((snapShot) => {
            const allTrails = [];
            snapShot.docs.forEach((doc) => {
                const data = doc.data();
                let compareId = userId;
                if (route.params !== undefined) {
                    compareId = route.params.userId;
                }
                if (data.userId === compareId) {
                    allTrails.push({
                        ...data,
                        id: doc.id,
                    });
                }
            });
            setTrailsHistory(allTrails);
        });
    }, [route.params]);

    React.useEffect(() => {
        const d = Array.from(new Set(trailsHistory.map((trailItem) => trailItem.date)));
        setAllDates(
            d.sort((x, y) => {
                const d1 = new Date(x);
                const d2 = new Date(y);
                return d2 - d1;
            })
        );
    }, [trailsHistory]);

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Text style={styles.infoCardHeading}>{route.params ? route.params.displayName : displayName}</Text>
                <Text style={styles.infoCardLabel}>Top Speed Ever: 27mph</Text>
                <Text style={styles.infoCardLabel}>
                    Total Time Skiing:{' '}
                    {trailsHistory.length ? (
                        <Text>
                            {trailsHistory
                                .map((trailObj) => trailObj.duration)
                                .reduce((acc, cur) => {
                                    const allThreeCur = cur.split(':').map((n) => +n);
                                    const allThreeAcc = acc.split(':').map((n) => +n);
                                    allThreeAcc.forEach((num, index) => {
                                        allThreeCur[index] += num;
                                    });
                                    for(let i = 2; i > 0; i--) {
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
                    ) : null}
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
            {/* 
				Stats
				  Top Speed Ever
				History
				(list of runs)
				each item has...
					top speed
					distance
			*/}
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
