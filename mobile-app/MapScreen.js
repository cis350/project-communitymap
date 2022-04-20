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
import MapView from 'react-native-maps';

function MapScreen({ route, navigation }) {
  const username = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 39.9522,
          longitude: -75.1932,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        showsUserLocation={true}
      />
    </View>
  );
}
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
