import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';

export const Unregistered = ({ navigation }) => {
    const [name, setName] = React.useState('');

    React.useEffect(() => {
        if (firebase.apps.length) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    navigation.navigate('Trails');
                } else {
                    console.log('User is signed out.');
                }
            });
        }
    }, [firebase.apps.length]);

    return (
        <View style={styles.space}>
            <Input
                label="Name"
                autoCorrect={false}
                value={name}
                onChangeText={(text) => setName(text)}
                secureTextEntry={false}
            />
            <TouchableOpacity
                onPress={() => {
                    if (name !== '') {
                        firebase
                            .auth()
                            .signInAnonymously()
                            .then(() => {
                                firebase
                                    .auth()
                                    .currentUser.updateProfile({
                                        displayName: name,
                                    })
                                    .then((res) => {
                                        console.log('Display name update successful.');
                                        navigation.navigate('Trails');
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                            .catch((err) => console.log(err));
                    } else {
                        alert('Please enter a valid name.');
                    }
                }}
                style={styles.submitBtn}
            >
                <Text style={styles.submitText}>Let's Go!</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    space: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        paddingHorizontal: 10,
    },
    submitBtn: {
        backgroundColor: 'rgb(125, 125, 240)',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    submitText: {
        fontSize: 18,
        color: 'white',
    },
});
