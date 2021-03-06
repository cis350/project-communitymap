import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
 

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function checkUserInDatabase() {} // TODO: find/create user from database once backend is setup

  function handleLogin(e) {
    if (!username.match('^[a-zA-Z0-9]*$') || username.length < 3) {
      alert('Error: Invalid username');
    } else if (password.length < 8) {
      alert('Error: Password must be at least 8 characters');
    } else {
      checkUserInDatabase();

      // TODO: change this to Home Page
      navigation.navigate('Home', {
        username: username,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer_top}></View>
      <View style={styles.content}>
        <Text style={styles.title}>CommunityMap</Text>
        <Text style={styles.directions}>Username:</Text>
        <TextInput
          style={styles.login}
          onChangeText={setUsername}
          value={username}
        />
        <Text style={styles.directions}>Password:</Text>
        <TextInput
          style={styles.login}
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          title="loginBtn"
          style={styles.loginBtn}
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
export default LoginScreen;

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
    fontSize: 30,
    marginVertical: 15,
    fontWeight: 'bold',
    marginBottom: 60,
    color: '#fff'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginBottom: 30,
    marginTop: 5,
    //paddingHorizontal: 120,
    width: 275,
    height: 400,
    borderRadius: 10,
    fontSize: 20
  },
  directions: {
    fontSize: 12,
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
    height: 250,
    backgroundColor: '#5e6475'
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
