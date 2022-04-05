import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// screen imports
import LoginScreen from './LoginScreen';
//import HomeScreen from './HomeScreen';
import BrowseEventsScreen from './BrowseEventsScreen';
import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: '#32f497' } }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: '#32f497' } }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerStyle: { backgroundColor: '#32f497' } }}
          name="Browse Events"
          component={BrowseEventsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
