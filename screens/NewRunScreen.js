import * as React from 'react';
import { Text, View, StyleSheet, SectionList, TouchableHighlight } from 'react-native';

const easyRuns = [
    { name: 'Endeavor', difficulty: 'green', lift: 'Montezuma Express' },
    { name: "Ina's Way", difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Jaybird', difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Last Chance', difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Modest Girl', difficulty: 'green', lift: 'Argentine' },
    { name: 'Schoolmarm', difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Scout', difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Silver Spoon', difficulty: 'green', lift: 'Montezuma Express' },
    { name: 'Ski-Daddle', difficulty: 'green', lift: 'Montezuma Express' },
];

const mediumRuns = [
    { name: 'Anticipation', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Bachelor', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Ballhooter', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Beger', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Bobtail', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Cross-cut', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: "Dercum's Dash", difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Elk Bighorn', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Elk Run', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Flying Dutchman', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Frenchman', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Gassy Thompson', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Haywood', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Hoodoo', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Jackwhacker', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Jacques St. James', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Last Alamo', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Lodgepole', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Midland', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Missouri', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Mozart', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Oh, Bob', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Orfint Boy', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Paymaster', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Porcupine', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Prospector', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'River Run', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Santa Fe', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Silvermaster', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Spillway', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Spring Dipper', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Swandyke', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Whipsaw', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'Wild Irishman', difficulty: 'blue', lift: 'Montezuma Express' },
    { name: 'The Willows', difficulty: 'blue', lift: 'Montezuma Express' },
];

const hardRuns = [
    { name: 'Jackface', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Edge', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Last Hoot', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Richter', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Go Devil', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Diamond Back', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Mine Shaft', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Ambush', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Powder Cap', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Sampler', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Starfire', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Bullet', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Bullet Glades', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Black Hawk', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Geronimo', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Cat Dancer', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Cat South Glades', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Grizz', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Badger', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Bushwhacker', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Open 61', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'P.B.', difficulty: 'black', lift: 'Montezuma Express' },
    { name: '8 Iron', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Black Rock', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Alhambra', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Revolution', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Midnight Ride', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Patriot', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Liberty', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Indy Face', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Two If By Sea', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Liberty Trees', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Stray Horse', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Tommy Knocker', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Rathbone', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Cornucopia', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Christmas Tree', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Corral', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Goalpost Gully', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Stadium', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Victory Chutes', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Conquest', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Trap', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'The Wolf Den', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Timberwolf', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Puma Bowl', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Bingo', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'South Bowl Trees', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Wombat Chutes', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Tele Trees', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Wolverine', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Wildfire', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Pika Glades', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Wildcat', difficulty: 'black', lift: 'Montezuma Express' },
    { name: 'Coyote Caper', difficulty: 'black', lift: 'Montezuma Express' },
    { name: `Mr. Toad's Wild Ride`, difficulty: 'black', lift: 'Montezuma Express' },
    { name: `Jane's Journey`, difficulty: 'black', lift: 'Montezuma Express' },
];

const recentRuns = [...easyRuns, ...mediumRuns, ...hardRuns].filter((x) =>
    ['Jackface', 'Schoolmarm', "Ina's Way"].includes(x.name)
);

function sortRuns(arr) {
    return arr.sort((x, y) => (x.name > y.name ? 1 : -1));
}

function RunItem(props) {
    return (
        <View
            style={{
                ...styles.item,
                borderTopWidth: props.borderTop ? 1 : 0,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <View style={styles[props.item.difficulty]} />
                <View style={styles.routeInfoContainer}>
                    <Text style={styles.itemName}>{props.item.name}</Text>
                    <Text style={styles.liftName}>{props.item.lift}</Text>
                </View>
            </View>
            <View style={styles.rightArrow} />
        </View>
    );
}

export function NewRunScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <SectionList
                sections={[
                    { title: 'Recent', data: recentRuns },
                    {
                        title: 'All Runs',
                        data: [...sortRuns(easyRuns), ...sortRuns(mediumRuns), ...sortRuns(hardRuns)],
                    },
                ]}
                renderItem={({ item, index }) => (
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Record Run', item)}
                        underlayColor="lightgray"
                    >
                        <RunItem borderTop={index === 0} item={item}></RunItem>
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
        borderBottomWidth: 1,
        borderColor: 'rgb(200, 200, 200)',
    },
    itemName: {
        fontSize: 20,
    },
    liftName: {
        fontSize: 14,
        color: 'rgb(100, 100, 100)',
    },
    green: {
        width: 20,
        height: 20,
        borderRadius: 30 / 2,
        backgroundColor: 'green',
    },
    blue: {
        width: 20,
        height: 20,
        backgroundColor: 'blue',
    },
    black: {
        width: 20,
        height: 20,
        backgroundColor: 'black',
        transform: [{ rotate: '45deg' }],
    },
    rightArrow: {
        width: 10,
        height: 10,
        color: 'grey',
        borderColor: 'grey',
        borderTopWidth: 2,
        borderRightWidth: 2,
        transform: [{ rotate: '45deg' }],
    },
    routeInfoContainer: {
        marginLeft: 14,
    },
});
