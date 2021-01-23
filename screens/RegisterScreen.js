import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import firebase from 'firebase';

export const RegisterScreen = ({ navigation, userExists }) => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');

    React.useEffect(() => {
        if (userExists) {
            navigation.replace('Trails');
        }
    }, [userExists]);

    return (
        <View style={styles.space}>
            <Input
                label="First Name"
                autoCorrect={false}
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
            />
            <Input label="Last Name" autoCorrect={false} value={lastName} onChangeText={(text) => setLastName(text)} />
            <TouchableOpacity
                onPress={() => {
                    const displayName = `${firstName} ${lastName}`;
                    if (firstName !== '' && lastName !== '') {
                        firebase
                            .auth()
                            .signInAnonymously()
                            .then(() => {
                                const curUser = firebase.auth().currentUser;
                                curUser
                                    .updateProfile({
                                        displayName,
                                    })
                                    .then((res) => {
                                        firebase
                                            .firestore()
                                            .collection('users')
                                            .doc(curUser.uid)
                                            .set({
                                                displayName,
                                            })
                                            .then((res) => {
                                                navigation.replace('Trails');
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            })
                            .catch((err) => console.log(err));
                    } else {
                        alert('Please complete both fields.');
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
