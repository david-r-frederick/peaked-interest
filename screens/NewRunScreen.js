import * as React from 'react';
import { Text, View, StyleSheet, SectionList, TouchableHighlight } from 'react-native';
import { IconMapper, easyRuns, mediumRuns, hardRuns } from '../Utility';
import { ChevronRight } from '../components/Chevrons';

function sortRuns(arr) {
    return arr.sort((x, y) => (x.name > y.name ? 1 : -1));
}
const all = [...sortRuns(easyRuns), ...sortRuns(mediumRuns), ...sortRuns(hardRuns)];

function RunItem({ item, borderTop }) {
    return item ? (
        <View
            style={{
                ...styles.item,
                borderTopWidth: borderTop ? 1.5 : 0,
            }}
        >
            <View style={styles.itemContent}>
                {IconMapper[item.difficulty]}
                <View style={styles.routeInfoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.liftName}>{item.lift}</Text>
                    <Text style={styles.liftName}>{item.length}mi</Text>
                </View>
            </View>
            <ChevronRight />
        </View>
    ) : null;
}

export function NewRunScreen({ navigation, mostRecents }) {
    const recentsTrailData = [];
    for (let i = 0; i < all.length; i++) {
        if (mostRecents.includes(all[i].name)) {
            recentsTrailData[mostRecents.indexOf(all[i].name)] = all[i];
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={[
                    { title: 'Recent', data: recentsTrailData },
                    {
                        title: 'All Runs',
                        data: all,
                    },
                ]}
                renderItem={({ item, index }) => {
                    return item ? (
                        <TouchableHighlight
                            onPress={() => navigation.navigate('Record Run', item)}
                            underlayColor="lightgrey"
                        >
                            <RunItem borderTop={!index} item={item} />
                        </TouchableHighlight>
                    ) : null;
                }}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        borderBottomWidth: 0.5,
        borderColor: 'rgb(200, 200, 200)',
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 20,
        marginRight: 20,
    },
    liftName: {
        fontSize: 14,
        color: 'rgb(100, 100, 100)',
    },
    routeInfoContainer: {
        marginLeft: 14,
    },
});
