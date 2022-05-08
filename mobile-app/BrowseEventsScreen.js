import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
function BrowseEventsScreen({ navigation }) {
  let [EventList, setEventList] = useState([
    {
      description: 'description: this is the detailed description.',
      title: 'Event 1',
      key: '1',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 2',
      key: '2',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 3',
      key: '3',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 4',
      key: '4',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 5',
      key: '5',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 6',
      key: '6',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 7',
      key: '7',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 8',
      key: '8',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 9',
      key: '9',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 10',
      key: '10',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
    {
      description: 'description: this is the detailed description.',
      title: 'Event 11',
      key: '0',
      image:
        'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
    },
  ]);

  let [collapsedList, setCollapsedList] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);

  //The state will have to be collected from storage somehow, but for now this is dummy data

  const CONTENT = [
    {
      id: '1',
      customItem: (
        <View style={styles.button}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: 'https://cdn.britannica.com/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg?s=1500x700&q=85',
              }}
              style={styles.img}
            />
            <Text style={styles.eventTitle}>Event 1</Text>
          </View>
        </View>
      ),
    },
  ];

  const toggleCollapse = (i) => {
    var newList = { ...collapsedList };
    newList[i] = !newList[i];
    setCollapsedList(newList);
  };

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
                <Image source={{ uri: item.image }} style={styles.img} />
                <Text style={styles.eventTitle}>{item.title}</Text>
              </View>
              <Collapsible collapsed={collapsedList[item.key]} align="center">
                <View>
                  <Text>{item.description}</Text>
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
