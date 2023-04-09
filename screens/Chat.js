import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, Avatar } from 'react-native-gifted-chat';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, onSnapshot, query, orderBy, getFirestore } from 'firebase/firestore';
import { app } from '../components/config';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const database = getFirestore(app);
const auth = getAuth(app);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [headerText, setHeaderText] = useState('Question here!');
  const [nextEditTime, setNextEditTime] = useState(null);
  const navigation = useNavigation();
  const [countdownMinutes, setCountdownMinutes] = useState(60);











  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.icon}>
          <AntDesign name="edit" size={24} color="black" onPress={() => setIsEditing(true)} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, setIsEditing]);

  const onHeaderTextChange = useCallback((text) => {
    setHeaderText(text);
  }, []);

  const onSaveHeaderText = useCallback(() => {
    setIsEditing(false);
    setNextEditTime(Date.now() + 60 * 60 * 1000); // set the next possible edit time to 60 minutes from now
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (nextEditTime) {
        const remainingTime = Math.max(nextEditTime - Date.now(), 0);
        // console.log(remainingTime);
        if (remainingTime === 1) {
        //   setNextEditTime(null);
          setIsEditing(true);
        }
        else {
          setCountdownMinutes(Math.floor(remainingTime / 600000));
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEditTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownMinutes > 0) {
        setCountdownMinutes(countdownMinutes - 1);
      }
    }, 60000);
  
    return () => clearInterval(interval);
  }, [countdownMinutes]);
  

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot);
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });

    return unsubscribe();
  }, []);


  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
 
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        {isEditing ? (
          <View style={styles.headerEditing}>
            <TextInput
              style={styles.headerInput}
              value={headerText}
              onChangeText={onHeaderTextChange}
              autoFocus={true}
            />
            <TouchableOpacity style={styles.headerSaveButton} onPress={onSaveHeaderText}>
              <Text style={styles.headerSaveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.headerTouchable} onPress={() => setIsEditing(true)}>
            <Text style={styles.headerText}>{headerText}</Text>
          </TouchableOpacity>
        )}
        {isEditing && (
          <View style={styles.countdownContainer}>
            <Text style={styles.countdownText}>{`You edit in ${countdownMinutes} minutes`}</Text>
          </View>
        )}
      </View>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 7,
          name: 'Test 2',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
  
}  


const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderTopColor: 'black',
        zIndex: 1,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 10,
        elevation: 10,
        borderRadius: 4,
        flexDirection: 'row',
    },
    headerText: {
        fontWeight: 'light',
        fontSize: 19,
        color: 'black',
        overflow: 'hidden',
        textShadowColor: 'blue',
        textShadowOffset: { width: 1, height: 0 },
        textShadowRadius: 1,
        backgroundColor: '#ebeff1',
        padding: 10,
        borderRadius: 4,
        marginRight: 24,
        },
    icon: {
        marginRight: 10,
        position: 'absolute',
        right: 0,
        bottom: -37,
    },
    headerSaveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    headerSaveButton: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 4,
        marginLeft: 10,
        },
    headerEditing: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginLeft: -20,
    },
    headerInput: {
        backgroundColor: '#ebeff1',
        padding: 10,
        borderRadius: 4,
        flex: 1,
        fontSize: 16,
    },

});
