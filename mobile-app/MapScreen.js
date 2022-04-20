import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

function MapScreen({ route, navigation }) {
  const username = route.params;

  // async function getOpenEvents() {}
  // async function getMyEvents() {}

  // useEffect(() => {
  //   my_events_coords = getMyEvents();
  //   open_events_coords = getOpenEvents();
  // });

  const my_events_coords = [
    {
      name: 'event1',
      coords: {
        latitude: 39.966333,
        longitude: -75.197123,
      },
    },
    {
      name: 'event1',
      coords: {
        latitude: 39.951641,
        longitude: -75.152672,
      },
    },
  ];

  const open_events_coords = [
    {
      name: 'event2',
      coords: {
        latitude: 39.9656,
        longitude: -75.181,
      },
    },
  ];

  function markerClick() {
    navigation.navigate('View Event', {
      title: 'name of event',
      date: '5/12/22',
      description: 'fun event',
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 39.9522,
          longitude: -75.1932,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {open_events_coords.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            title={marker.name}
            description={'description'}
            onCalloutPress={markerClick}
            pinColor={'red'}
          >
            <Callout>
              <View>
                <Text>This is a currently open event</Text>
              </View>
            </Callout>
          </Marker>
        ))}
        {my_events_coords.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            title={marker.name}
            description={'description'}
            onCalloutPress={markerClick}
            pinColor={'purple'}
          >
            <Callout>
              <View>
                <Text>This is one of my events</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
export default MapScreen;

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
