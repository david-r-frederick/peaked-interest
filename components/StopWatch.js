import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const StopWatch = () => {
  const [startDisabled, setStartDisabled] = React.useState(false);
  const [stopDisabled, setStopDisabled] = React.useState(true);
  const [timer, setTimer] = React.useState(null);

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
      <Text>STOP WATCH</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 100,
    paddingVertical: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});

export default StopWatch;
