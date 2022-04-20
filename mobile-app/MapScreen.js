import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

function MapScreen({ route, navigation }) {

    const username = route.params;

    const events_coords = [{          
        latitude: 39.9656,          
        longitude: -75.1810}];

    function markerClick() {
      navigation.navigate('View Event', {
        title: 'name of event',
        date: '5/12/22',
        description: 'fun event'
        });
    }

  return (
        <MapView        
          style={{flex: 1}}        
          region={{          
            latitude: 39.9522,          
            longitude: -75.1932,          
            latitudeDelta: 0.1,          
            longitudeDelta: 0.1 }}        
          showsUserLocation={true}
        >
          <Marker 
            coordinate={events_coords[0]}
            title={'title'}
            description={'description'}
            onCalloutPress={markerClick}>
            <Callout>
              <View>
                <Text>This is a plain view</Text>
              </View>
            </Callout>
          </Marker>
        </MapView> 
      
    
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

