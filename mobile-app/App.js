import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import  { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BrowseEventsScreen from './BrowseEventsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
   //Need to change initial route to login once login screen exists
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Browse Events">
        <Stack.Screen options={{headerStyle:{backgroundColor:'#32f497',}}} name="Browse Events" component={BrowseEventsScreen} />
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
