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

    const username = route.params;
  
  function handleEvents(e) {

    // TODO: change this to Home Page
    navigation.navigate('Browse Events', {
    user: username,
    });
    
  }

  function handleMap(e) {

    // TODO: change this to Home Page
    navigation.navigate('Map view', {
    user: username,
    });
    
  }
  function handleAddEvents(e) {

    // TODO: change this to Home Page
    navigation.navigate('Add Community Event', {
    user: username,
    });
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer}></View>
      <View style={styles.content}>
        <Text style={styles.title}>
            Welcome to CommunityMap!
        </Text>
        <TouchableOpacity
          title="browse events button"
          style={styles.btn}
          onPress={(e) => handleEvents(e)}
        >
          <Text style={styles.loginText}>Browse Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="map button"
          style={styles.btn}
          onPress={(e) => handleMap(e)}
        >
          <Text style={styles.loginText}>View Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="add event button"
          style={styles.btn}
          onPress={(e) => handleAddEvents(e)}
        >
          <Text style={styles.loginText}>Add Event</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer}></View>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 220,
  },
  btn: {
    backgroundColor: '#7C58E4',
    width: 150,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7C58E4',
    marginVertical: 8,
  },
  loginText: {
    color: '#FFFFFF',
  },
});