import * as React from 'react';
import { Text, View, StyleSheet, SectionList, TouchableHighlight } from 'react-native';
import { IconMapper, easyRuns, mediumRuns, hardRuns } from '../Utility';
import { ChevronRight } from '../components/Chevrons';

const all = [...easyRuns, ...mediumRuns, ...hardRuns];

function sortRuns(arr) {
    return arr.sort((x, y) => (x.name > y.name ? 1 : -1));
}

function RunItem(props) {
    const { item } = props;

    return (
        <View
            style={{
                ...styles.item,
                borderTopWidth: props.borderTop ? 1.5 : 0,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {IconMapper[item.difficulty]}
                <View style={styles.routeInfoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.liftName}>{item.lift}</Text>
                    <Text style={styles.liftName}>{props.item.length}mi</Text>
                </View>
            </View>
            <ChevronRight />
        </View>
    );
}

export function NewRunScreen({ navigation, mostRecents }) {
    const usable = [];
    for (let i = 0; i < all.length; i++) {
        if (mostRecents.includes(all[i].name)) {
            usable[mostRecents.indexOf(all[i].name)] = all[i];
        }
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={[
                    { title: 'Recent', data: usable },
                    {
                        title: 'All Runs',
                        data: [...sortRuns(easyRuns), ...sortRuns(mediumRuns), ...sortRuns(hardRuns)],
                    },
                ]}
                renderItem={({ item, index }) => (
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Record Run', item)}
                        underlayColor="lightgrey"
                    >
                        <RunItem borderTop={index === 0} item={item} />
                    </TouchableHighlight>
                )}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
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
