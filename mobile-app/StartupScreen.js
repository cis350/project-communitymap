import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
 

function StartupScreen({ navigation }) {

  function handleLogin(e) {
    navigation.navigate('Login');
  }

  function handleRegister(e) {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer_top}></View>
      <View style={styles.content}>
        <Text style={styles.title}>CommunityMap</Text>        
        <TouchableOpacity
          title="create"
          style={styles.button}
          onPress={(e) => handleRegister(e)}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="login"
          style={styles.button}
          onPress={(e) => handleLogin(e)}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer_bot}></View>
    </View>
  );
}
export default StartupScreen;

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
    color: '#fff'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginVertical: 30,
    //paddingHorizontal: 120,
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
