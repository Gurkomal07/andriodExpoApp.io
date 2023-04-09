import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { app } from '../components/config'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {collection, getFirestore, query, where, getDocs} from 'firebase/firestore';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";


const auth= getAuth(app);

const db = getFirestore(app);

const userRef = collection(db, "Users")
const postRef = collection(db, "Posts")

const storage = getStorage(app);

let signInEmail;

let Name;
let Username;
let ProfilePic;
let UserId;




const LoginPage = () => {
  let [email, setEmail] = useState('');
let [password, setPassword] = useState('');


    auth.onAuthStateChanged(function (user) {
    
        if (user) {
          signInEmail = auth.currentUser.email
      
      
          const getCurrentUser = query(userRef, where("Email", "==", signInEmail));
          
          const getCurrentUserData = getDocs(getCurrentUser);
          
          getCurrentUserData.then((data) => {
            const response =
              data.docs.map(d => ({ id: d.id, ...d.data() }))
              
            response.map(results => {
              
              Name = results.FullName;
              Username = results.UserName;
              ProfilePic = results.ProfilePic
              UserId = results.id
       
            });
          })//endgetcurrentuserdate
      
      
        } //endif
      })


    const navigation = useNavigation();

    const handlePress = () => {
      
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        
        navigation.navigate('discover');

        
      })
      .catch((err) => {
        console.log("Message" + err.message)
      })
    };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handlePress}  />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      width: '80%',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
    },
  });

  export default LoginPage
  
