import React, {useContext, useLayoutEffect} from 'react';
import {Button, FlatList, Text, TouchableHighlight, View} from 'react-native';
import {MyContext} from './MyContext';
import {penguins} from '../res/penguins';

export const NotesList = ({navigation}) => {
  const myContext = useContext(MyContext);
  const lastNoteId = myContext.notes[myContext.notes.length - 1].id;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            let note = {
              id: lastNoteId + 1,
              title: 'Note ' + (lastNoteId + 2),
              content: '',
              image: penguins,
            };
            myContext.setNotes([...myContext.notes, note]);
            navigation.navigate('Note', {note: note});
          }}
          title="New"
        />
      ),
    });
  }, [lastNoteId, myContext, navigation]);
  const NotesListItem = ({item}) => {
    const navigate = () => {
      navigation.navigate('Note', {note: item});
    };
    const shortContent = item.content.substr(
      0,
      item.content.indexOf('\n') === -1
        ? item.content.length
        : item.content.indexOf('\n'),
    );
    return (
      <TouchableHighlight onPress={navigate}>
        <View style={{padding: 12, backgroundColor: 'white'}}>
          <Text style={{fontSize: 18}} numberOfLines={1}>
            {item.title}
          </Text>
          <Text numberOfLines={1}>{shortContent}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <MyContext.Consumer>
      {context => (
        <FlatList
          data={context.notes}
          renderItem={NotesListItem}
          extraData={context.listUpdateState}
          keyExtractor={i => i.id}
        />
      )}
    </MyContext.Consumer>
  );
};
