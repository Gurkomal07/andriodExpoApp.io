import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Button, Text, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { Svg} from 'react-native-svg';

import { app } from '../components/config'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {collection, getFirestore, query, where, getDocs, doc, getCountFromServer} from 'firebase/firestore';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from "firebase/storage";


const auth= getAuth(app);

const db = getFirestore(app);

const userRef = collection(db, "Users")
const postRef = collection(db, "Posts")

const storage = getStorage(app);
//https://firebasestorage.googleapis.com/v0/b/world2opinion.appspot.com/o/Images%2Fpexels-jaime-reimer-2662116.jpg?alt=media&token=b77398ff-a56a-4e58-ad54-777594ceba29
//https://firebasestorage.googleapis.com/v0/b/world2opinion.appspot.com/o/Images%2Fless-investment.png?alt=media&token=71f705b6-16f0-4a51-8f95-e7a6320c3086



  
export default function Profilepage() {
    let [name, setName] = useState('');
    let [username, setUserName] = useState('');
    let [signInEmail, setSignInEmail] = useState('');
    let [profilePics, setProfilePics] = useState("https://img.freepik.com/premium-vector/male-profile-flat-blue-simple-icon-with-long-shadowxa_159242-10092.jpg");
    let [userId, setUserId] = useState('');
    const svgFile= require('../assets/svgs/setting.svg')

    const [friends, setFriends] = useState([]);
    let [friendsCount, setFriendsCount] = useState(0);
    let [usercollection, setusercollection] = useState();
    let [friendsCollection, setFriendsCollection] = useState();
    
auth.onAuthStateChanged(function (user) {
   
    
    if (user) {
      signInEmail = auth.currentUser.email
  
  
      const getCurrentUser = query(userRef, where("Email", "==", signInEmail));
      
      const getCurrentUserData = getDocs(getCurrentUser);
      
      getCurrentUserData.then((data) => {
        const response =
          data.docs.map(d => ({ id: d.id, ...d.data() }))
          
   
          data.forEach((document) => {
            const userdata= document.data();
            setUserName(userdata.UserName);
            setName(userdata.FullName);
            setProfilePics(userdata.ProfilePic);
            setUserId(document.id);
            setusercollection(doc(userRef, document.id));
            setFriendsCollection(collection(doc(userRef, document.id), "Friends"));

            // const friendsData = getDocs(friendsCollection);

            // friendsData.then((data) => {
            //     const data2 = data.docs.map(d => ({ id: d.id, ...d.data() }))
            // })

            getCountFromServer(collection(doc(userRef, document.id), "Friends"))
					.then((snap) => {
						setFriendsCount(snap.data().count);
					});

            // setusercollection(doc(userRef, doc.id));
            // console.log(doc(userRef, doc.id));
            // setFriendsCollection(collection(usercollection, "Friends"));

            
            //const userCollectionRef = db.collection('Users').doc(userRef).collection('Friends').doc(doc.id);
            // setFriendsCollection(collection(userRef.doc(doc.id), "Friends"));
        })
        }).catch((error) => {
            console.log(error);
          })

          

          
            
    };//endgetcurrentuserdata


  })

    const navigation = useNavigation();

    const handleCreate = () => {
          
          navigation.navigate('create');
  
      };

      const handleDiscover = () => {
          
        navigation.navigate('discover');

    };
    return (
        <View style={styles.container}>
            <View style={[styles.flexColumn,  styles.alignCenter]}>
            <View style={[styles.p_header, styles.alignCenter, styles.flexRow, styles.darkBlue,  styles.p_activity]}>
                    <Image
                        style={styles.image}
                        source={{uri: profilePics}}
                    />
                    <Image
                        style={styles.svgg}
                        source={require("../assets/svgs/setting.svg")}
                    />
                    <Text style={styles.name}>{name}</Text>
            </View>

            <View style={[styles.p_header, styles.alignCenter, styles.flexRow, styles.rounderBorder,styles.darkBlue, styles.p_activity, styles.alignCenter]}>
                <View style={[styles.alignCenter, styles.halfWidth]}>
                    <Text style={[styles.whiteText, styles.textSixe]}>Friends</Text>
                    <Text style={[styles.whiteText, styles.textSixe]}>{friendsCount}</Text>

                </View>
                <View style={[styles.alignCenter, styles.halfWidth]}>
                    <Text style={[styles.whiteText, styles.textSixe]}>Posts</Text>
                    <Text style={[styles.whiteText, styles.textSixe]}>50</Text>
                </View>
            </View>
            </View>

            {/* //Friends display */}
            <View style={[styles.friends]}>
            <Text style={[styles.heading]}>Friends</Text>
            <Image
                        style={styles.image}
                        source={{uri: profilePics}}
            />
            </View>

            {/* <Button title="Create" onPress={handleCreate}  />
            <Button title="Discover" onPress={handleDiscover}  /> */}


        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 75,
        borderColor: 'black',
        margin: 20,
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#194789',
        paddingLeft: 10,
    },
    content: {
        fontSize: 16,
        color: 'gray',
    },

    p_header: {
        padding: 10,
        paddinTop: 20,
        //fontFamily: 'Helvetica',
        // backgroundColor: '#194789',
        borderTop: 0,


    },
    flexColumn: {
        flexDirection: 'column',
        // backgroundColor: '#194789',
    },
    darkBlue:{
        backgroundColor: '#194789',
    },
    alignCenter: {
        alignItems: 'center', 
    },
    flexRow: {
        flexDirection: 'row',
    },
    p_activity: {
        width: '100%',
    },
    whiteText: {
        color: 'white',
    },
    textSixe: {
        fontSize: 18,
        fontWeight: '500',
        paddingBottom: 10,
    },
    rounderBorder: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    halfWidth: {
        width: '50%',
    }
});

