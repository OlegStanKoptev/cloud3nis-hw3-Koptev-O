import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyContext} from './components/MyContext';
import {NotesList} from './components/NotesList';
import {Note} from './components/Note';
import {penguins} from './res/penguins';

const DATA = [
  {
    id: 0,
    title: 'Note title 1',
    content: 'Note content 1',
    image: penguins,
  },
  {
    id: 1,
    title: 'Note title 2',
    content: 'Note content 2',
    image: penguins,
  },
];

const Stack = createNativeStackNavigator();

const App = () => {
  const [notes, setNotes] = useState(DATA);
  const [listUpdate, setListUpdate] = useState(false);
  const switchListUpdate = () => setListUpdate(!listUpdate);

  return (
    <MyContext.Provider
      value={{
        notes: notes,
        setNotes: setNotes,
        listUpdateState: listUpdate,
        updateList: switchListUpdate,
      }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="NotesList">
          <Stack.Screen name="NotesList" component={NotesList} options={{title: 'Notes'}}/>
          <Stack.Screen name="Note" component={Note} options={{title: ''}} />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  );
};

export default App;
