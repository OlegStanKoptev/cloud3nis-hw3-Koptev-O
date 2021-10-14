import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  ScrollView,
  Keyboard,
  InputAccessoryView,
  Button,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {MyContext} from './MyContext';

export const Note = ({route}) => {
  const myContext = useContext(MyContext);
  let note = route.params.note;

  const updateNote = (title, content, image) => {
    let noteIndex = myContext.notes.findIndex(e => e.id === note.id);
    let oldTitle = myContext.notes[noteIndex].title;
    myContext.notes[noteIndex].title = title;
    myContext.notes[noteIndex].content = content;
    myContext.notes[noteIndex].image = image;
    myContext.setNotes(myContext.notes);
    if (oldTitle !== title) {
      myContext.updateList();
    }
  };

  const inputAccessoryViewID = 'uniqueID';
  const scrollViewRef = useRef();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => setKeyboardHeight(e.endCoordinates.height),
    );
    return () => keyboardWillShowListener.remove();
  });

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [image, setImage] = useState(note.image);
  const updateTitle = value => {
    setTitle(value);
    updateNote(value, content, image);
  };
  const updateContent = value => {
    setContent(value);
    updateNote(title, value, image);
  };
  const updateImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets.length === 1) {
        let importedImg = response.assets[0].uri;
        setImage(importedImg);
        updateNote(title, content, importedImg);
      }
    });
  };
  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{padding: 8, backgroundColor: 'white'}}
        contentContainerStyle={{paddingBottom: keyboardHeight + 48}}
        keyboardDismissMode="interactive">
        <TouchableOpacity onPress={updateImage} underlayColor="gray">
          <ImageBackground
            style={{
              borderRadius: 20,
              overflow: 'hidden',
              width: '100%',
              aspectRatio: 3 / 2,
            }}
            // blurRadius={80}
            source={{uri: image}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  padding: 8,
                  fontSize: 16,
                  color: 'white',
                  textShadowColor: 'black',
                  textShadowRadius: 8,
                }}>
                replace
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TextInput
          style={{fontSize: 24}}
          editable
          multiline
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={v => updateTitle(v)}
          value={title}
        />
        <TextInput
          style={{paddingBottom: 32}}
          editable
          multiline
          scrollEnabled={false}
          inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={v => updateContent(v)}
          value={content}
        />
      </ScrollView>
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#EEEEEE',
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}>
          <Button onPress={() => {}} title="" />
          <Button onPress={() => Keyboard.dismiss()} title="Done" />
        </View>
      </InputAccessoryView>
    </>
  );
};
