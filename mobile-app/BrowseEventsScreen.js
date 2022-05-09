import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
const api = require('./modules/api');

function BrowseEventsScreen({ route, navigation }) {
  let [EventList, setEventList] = useState([]);

  let [collapsedList, setCollapsedList] = useState([]);

  //The state will have to be collected from storage somehow, but for now this is dummy data

  // const CONTENT = [
  //   {
  //     id: '1',
  //     customItem: (
  //       <View style={styles.button}>
  //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //           <Image
  //             source={{
  //               uri: 'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
  //             }}
  //             style={styles.img}
  //           />
  //           <Text style={styles.eventTitle}>Event 1</Text>
  //         </View>
  //       </View>
  //     ),
  //   },
  // ];

  let username = route.params.username;
  const toggleCollapse = (i) => {
    var newList = { ...collapsedList };
    newList[i] = !newList[i];
    setCollapsedList(newList);
  };

  const handleSignup = (e, item) => {
    //console.log(item);
    api.signup(username, item.name);
    alert('signed up for ' + item.name);
  };

  const getEvents = async () => {
    let eventlistOrig = await api.getEventsList();
    let eventlist = [...eventlistOrig.data];
    console.log(eventlist);
    let newList = new Array(eventlist.length);
    for (let i = 0; i < eventlist.length; i++) {
      eventlist[i].key = i;
      if (eventlist[i].name === null){
        eventlist[i].name = "";
      }
      if (eventlist[i].imgURL === null || eventlist[i].imgURL === ''){
        eventlist[i].imgURL = 'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85';
      }
      if (eventlist[i].date === null){
        eventlist[i].date = "";
      }
      if (eventlist[i].location === null){
        eventlist[i].location = "";
      }
      if (eventlist[i].description === null){
        eventlist[i].description = "";
      }
      
      newList[i] = true;
    }
    setCollapsedList(newList);
    setEventList(eventlist);
    console.log(eventlist);
    //console.log(Eventlist);

  };

  useEffect(() => {
    getEvents();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBlock}>
        <Text style={styles.title}>Upcoming Events</Text>
        <FlatList
          data={EventList}
          renderItem={({ item }) => (
            <Pressable
              style={styles.button}
              onPress={() => toggleCollapse(item.key)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.imgURL }} style={styles.img} />
                <Text style={styles.eventTitle}>{item.name}</Text>
              </View>
              <Collapsible collapsed={collapsedList[item.key]} align="center">
                <View style = {{marginVertical: 10}}>
                  <Text>Date: {item.date}{"\n"}
                        Location: {item.location}{"\n"}
                        Description: {item.description}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity style = {styles.signupButton} onPress={(e) => handleSignup(e, item)}>
                    <Text>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </Collapsible>
            </Pressable>
          )}
        />
      </View>
    </View>
  );
}




export default BrowseEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton: {
    marginVertical: 10,
    backgroundColor: '#32f497',
    width: 120,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    marginHorizontal: 24,
    padding: 10,
    width: 260,
  },
  title: {
    fontSize: 24,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  backgroundBlock: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(196,196,196,0.5)',
    margin: 30,
  },
  img: {
    height: 50,
    width: 50,
  },
  eventTitle: {
    fontSize: 20,
    paddingLeft: 20,
  },
});
