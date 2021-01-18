import * as React from 'react';
import { Text, View, StyleSheet, SectionList, FlatList } from 'react-native';
import firebase from 'firebase';

function TrailHistoryItem(props) {
    const { item } = props;
    return (
        <View
            style={{
                ...styles.item,
                borderTopWidth: props.borderTop ? 1 : 0,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={styles.routeInfoContainer}>
                    <Text style={styles.itemName}>Trail Name: {item.trailId}</Text>
                    <Text style={styles.liftName}>Start: {item.startTime}</Text>
                    <Text style={styles.liftName}>End: {item.endTime}</Text>
                    <Text style={styles.liftName}>Duration: {item.duration}</Text>
                    <Text style={styles.liftName}>Temperature: {item.temperature}</Text>
                    <Text style={styles.liftName}>Vertical Drop: {item.verticalDrop}</Text>
                </View>
            </View>
        </View>
    );
}

export function MyHistoryScreen({ route }) {
    const [trailsHistory, setTrailsHistory] = React.useState([]);
    const [allDates, setAllDates] = React.useState([]);
    // const { displayName } = route.params;

    React.useEffect(() => {
        const db = firebase.firestore().collection('runs');
        db.get().then((snapShot) => {
            const allTrails = [];
            snapShot.docs.forEach((doc) => {
                allTrails.push({
                    ...doc.data(),
                    id: doc.id,
                });
            });
            setTrailsHistory(allTrails);
        });
    }, []);

    React.useEffect(() => {
        setAllDates(Array.from(new Set(trailsHistory.map((trailItem) => trailItem.date))));
    }, [trailsHistory]);

    return (
        <View style={styles.screen}>
            <Text>My Run History!</Text>
            <SectionList
                sections={allDates.map((date) => {
                    return {
                        title: date,
                        data: trailsHistory.filter((trailItem) => trailItem.date === date),
                    };
                })}
                renderItem={({ item, index }) => {
                    return (
                        <View>
                            <TrailHistoryItem item={item} />
                        </View>
                    );
                }}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
            {/* 
				Name of Person
				Stats
				Top Speed Ever
				Total Duration Skiing
				Top speed of last run
				Duration of last run
				History
				(list of runs)
				each item has...
					name of run
					difficulty
					max speed
					duration
					time started
					temperature
					distance
					vertical drop
			*/}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
    sectionHeader: {
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingRight: 30,
        borderBottomWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
    },
    routeInfoContainer: {
        marginLeft: 14,
    },
    itemName: {
        fontSize: 20,
    },
    liftName: {
        fontSize: 14,
        color: 'rgb(100, 100, 100)',
    },
});
