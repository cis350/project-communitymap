import { React, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
 

function RegisterScreen({ navigation }) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function handleRegister(e) {
    if (!username.match('^[a-zA-Z0-9]*$') || username.length < 3) {
      alert('Error: Invalid username');
    } else if (password.length < 8) {
      alert('Error: Password must be at least 8 characters');
    } else if (!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      alert('Error: Email is invalid');
    } else {
      navigation.navigate('Home');
    }
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.spacer_top}></View>
      <View style={styles.content}>
        <Text style={styles.title}>Create an account</Text>     
        <Text style={styles.directions}>Username:</Text>   
        <TextInput
          style={styles.login}
          secureTextEntry={false}
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
        <Text style={styles.directions}>Email:</Text>
        <TextInput
          style={styles.login}
          secureTextEntry={false}
          onChangeText={setEmail}
          value={email}
        />
        <TouchableOpacity
          title="login"
          style={styles.button}
          onPress={(e) => handleRegister(e)}
        >
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
      <View style={styles.spacer_bot}></View>
    </View>
  );
}
export default RegisterScreen;

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
    marginBottom: 60,
    color: '#fff'
  },
  login: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    marginBottom: 20,
    marginTop: 5,
    //paddingHorizontal: 120,
    width: 275,
    height: 30,
    borderRadius: 10,
    fontSize: 20
  },
  directions: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  spacer_top: {
    width: 10,
    height: 70,
    backgroundColor: '#5e6475'
  },
  spacer_bot: {
    width: 10,
    height: 200,
    backgroundColor: '#5e6475'
  },
  button: {
    backgroundColor: '#7C58E4',
    width: 150,
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
