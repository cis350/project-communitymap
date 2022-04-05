import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

function MapScreen({ route, navigation }) {

    const username = route.params;

  return (
    <MapView        
    style={{flex: 1}}        
    region={{          
        latitude: 39.9522,          
        longitude: -75.1932,          
        latitudeDelta: 0.3,          
        longitudeDelta: 0.3 }}        
        showsUserLocation={true} /> 
  );
}
export default MapScreen;

