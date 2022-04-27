import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const api = require("./modules/api");

function AddEventScreen({ navigation }) {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  

  function handleSubmit(e) {
    if (title.length == 0) {
      alert('Error: Event title required');
    } else if (description.length == 0) {
      alert('Error: Event description required');
    } else if (date.length != 10) {
      alert('Error: please enter dat in mm/dd/yyyy format');
    } else if (location.length == 0) {
      alert('Error: Event location required');
    } else {
      api.addEvent(title, date, location, description, imageUrl);
      alert('Event Added!');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer_top}></View>
      <View style={styles.content}>
        <Text style={styles.title}>Enter your event's {'\n'} information</Text>
        <Text style={styles.directions}>Enter event title:</Text>
        <TextInput
          style={styles.login}
          onChangeText={(value) => setTitle(value)}
        />
        <Text style={styles.directions}>Enter event date (mm/dd/yyyy):</Text>
        <TextInput
          style={styles.login}
          onChangeText={(value) => setDate(value)}
        />
        <Text style={styles.directions}>Enter event location:</Text>
        <TextInput
          style={styles.login}
          onChangeText={(value) => setLocation(value)}
        />
        <Text style={styles.directions}>Enter event description:</Text>
        <TextInput
          style={styles.login}
          onChangeText={(value) => setDescription(value)}
        />
        <Text style={styles.directions}>Enter event image url:</Text>
        <TextInput
          style={styles.login}
          onChangeText={(value) => setImageUrl(value)}
        />
        <TouchableOpacity
          title="submitEventBtn"
          style={styles.button}
          onPress={(e) => handleSubmit(e)}
        >
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer_bot}></View>
    </View>
  );
}

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5e6475',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5e6475',
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginBottom: 20,
    marginTop: 5,
    //paddingHorizontal: 120,
    height: 30,
    width: 275,
    height: 400,
    borderRadius: 10,
  },
  directions: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  spacer_top: {
    width: 10,
    height: 50,
    backgroundColor: '#5e6475'
  },
  spacer_bot: {
    width: 10,
    height: 140,
    backgroundColor: '#5e6475'
  },
  button: {
    backgroundColor: '#7C58E4',
    width: 175,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7C58E4',
    marginVertical: 15,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
