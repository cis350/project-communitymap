import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function HomeScreen({ route, navigation }) {

    const username = route.params.username;
  
  function handleEvents(e) {

    // TODO: change this to Home Page
    navigation.navigate('Browse Events', {
    username: username,
    });
    
  }

  function handleMap(e) {

    // TODO: change this to Home Page
    navigation.navigate('Map view', {
    username: username,
    });
    
  }
  function handleAddEvents(e) {

    // TODO: change this to Home Page
    navigation.navigate('Add Community Event', {
    username: username,
    });
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer_top}></View>
      <View style={styles.content}>
        <Text style={styles.title}>
            Welcome to CommunityMap!
        </Text>
        <TouchableOpacity
          title="browse events button"
          style={styles.button}
          onPress={(e) => handleEvents(e)}
        >
          <Text style={styles.loginText}>Browse Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="map button"
          style={styles.button}
          onPress={(e) => handleMap(e)}
        >
          <Text style={styles.loginText}>View Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="add event button"
          style={styles.button}
          onPress={(e) => handleAddEvents(e)}
        >
          <Text style={styles.loginText}>Add Event</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer_bot}></View>
    </View>
  );
}
export default HomeScreen;

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
    fontSize: 36,
    marginVertical: 15,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#fff',
    textAlign: 'center'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginVertical: 30,
    //paddingHorizontal: 120,
    width: 275,
<<<<<<< HEAD
    height: 30,
=======
    height: 400,
    borderRadius: 10,
>>>>>>> e3ec134cf6685bcdb1bdab068fbe1b68d76fa121
  },
  directions: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  spacer_top: {
    width: 10,
    height: 125,
    backgroundColor: '#5e6475'
  },
  spacer_bot: {
    width: 10,
    height: 200,
    backgroundColor: '#5e6475'
  },
  button: {
    backgroundColor: '#7C58E4',
    width: 250,
    height: 60,
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
