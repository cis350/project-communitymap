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
      <View style={styles.spacer}></View>
      <View style={styles.content}>
        <Text style={styles.title}>Enter your event's information</Text>
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
          style={styles.loginBtn}
          onPress={(e) => handleSubmit(e)}
        >
          <Text style={styles.loginText}>Submit</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer}></View>
    </View>
  );
}

export default AddEventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    padding: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    fontWeight: 'bold',
    marginBottom: 60,
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginVertical: 10,
    //paddingHorizontal: 120,
    height: 30,
    width: 275,
  },
  directions: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  spacer: {
    width: 10,
    height: 150,
  },
  loginBtn: {
    backgroundColor: '#7C58E4',
    width: 150,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7C58E4',
  },
  loginText: {
    color: '#FFFFFF',
  },
});
