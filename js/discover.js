import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ScrollView, Button, TouchableOpacity, Dimensions, Image } from 'react-native';
import { app } from '../components/config'
import { doc, getDoc, setDoc, getFirestore, addDoc, collection, getDocs, updateDoc, where, query, FieldValue, increment, FieldPath, deleteDoc } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { onAuthStateChanged, getAuth } from "firebase/auth";
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Card, CardHeader, CardContent, CardFooter, Link, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';


// Load the fonts using Font.loadAsync()
async function loadFonts() {
  await Font.loadAsync({
    'Sono-Regular': require('../assets/fonts/Sono-Regular.ttf'),
    'Sono-Bold': require('../assets/fonts/Sono-Bold.ttf'),
  })
}

// base styles for text on post
const baseStyles = {
  position: 'absolute',
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  padding: 8,
  textShadowColor: 'black',
  textShadowRadius: 10,
  backgroundColor: 'rgba(25, 42, 59, 0.4)',
  fontFamily: 'Sono-Regular',
  fontSize: 17,
  lineHeight: 20,
  letterSpacing: 0.4,
};

// styles for text on post
const styles = {
  0: { display: 'none' },

  1: {
    ...baseStyles,
    bottom: 220,
  },

  2: {
    ...baseStyles,
    bottom: 205,
  },

  3: {
    ...baseStyles,
    bottom: 190,
  },

  4: {
    ...baseStyles,
    bottom: 175,

  },

  5: {
    ...baseStyles,
    bottom: 160,
  },

  6: {
    ...baseStyles,
    bottom: 145,
  },

  7: {
    ...baseStyles,
    bottom: 138,
  },

  8: {
    ...baseStyles,
    bottom: 122,
  },

  9: {
    ...baseStyles,
    bottom: 110,
  },

};

const userPostedStyles = {
  fontSize: 17, 
  color: 'white',
  marginRight: 11, 
  fontFamily: 'Sono-Regular',
  textShadowColor: 'black',
  textShadowRadius: 5,
  textShadowOffset: { width: 1, height: 1 },
};

const footerContainer = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
};

const footer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingBottom: 13,
  borderBottomColor: 'orange',
  borderBottomWidth: 2,
  backgroundColor: 'rgba(25, 42, 59, 0.4)',
  paddingHorizontal: 20,
  paddingVertical: 10,
};

// screen height
const windowHeight = Dimensions.get('window').height - 195;
const windowWidth = Dimensions.get('window').width;


const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


const DiscoverPage = () => {

  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  //const [postIDs, setPostIDs] = useState([]);
  //const [profilePicUrls, setProfilePicUrls] = useState([]);
  const postRef = collection(db, "Posts");
  // const userRef = collection(db, "Users");

  // styling of text on post
  // let textStyles;
  // posts.map((post) => {
  //   textStyles = handleText(post);
  // });
  // console.log(textStyles);


  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => {

    //     const userId = user.uid;
    //     // console.log("User is signed in." + userId);

    const fetchImages = async () => {
      const querySnapshot = await getDocs(postRef);
      //const imageList = [];
      //const postIds = [];
      const Postarray = [];
      querySnapshot.forEach((doc) => {
        const imageInfo = doc.data();
        //imageList.push(imageInfo.ImageUrl);
        //postIDs.push(doc.id);
        const Post = {
          "image": imageInfo.ImageUrl,
          "id": doc.id,
          "like_count": imageInfo.like_count,
          "dislike_count": imageInfo.dislike_count,
          "likedBy": imageInfo.likedBy,
          "disLikedBy": imageInfo.disLikedBy,
          "UserId": imageInfo.UserId,
          "split": imageInfo.split,
          "text": imageInfo.text,
          "Date": imageInfo.Date,
        }

        Postarray.push(Post)
        // console.log(doc.id);
        // console.log(imageInfo.ImageUrl);
      });
      setPosts(Postarray);
      //setPostIDs(postIds);
    };
    fetchImages();

    // unsubscribe();
    // const handleLikeButtonPress = (id, type) => {
    //   console.log(id);
    //   console.log(type);
    // }

      // call loadFonts() before rendering the app
  loadFonts();
  }, []);

  // Handling disLike Button
  async function handledisLikeButtonClick(id) {
    console.log(id);

    // const userRef=collection(db, "Users")
    let UserId = "abc123";


    // const user = getAuth().currentUser;
    // if (user) {
    //   UserId = user.uid;
    //   console.log("User is signed in.");
    // } else {
    //   // No user is signed in.
    //   console.log("No user is signed in.");
    // }


    // console.log(UserId);

    try {
      const postRef = collection(db, "Posts");
      const docRef = doc(db, "Posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());


      let likedBy = docSnap.data().likedBy;
      if (!likedBy) {
        likedBy = {};
      }

      let disLikedBy = docSnap.data().disLikedBy;
      if (!disLikedBy) {
        disLikedBy = {};
      }

      const updateDatas = {};


      if (likedBy[UserId]) {
        // Remove the user's name from the disLikedBy map
        delete likedBy[UserId];
        updateDatas.likedBy = likedBy;
      }

      var hasDisLiked;
      hasDisLiked = disLikedBy[UserId] || false;
      // console.log("hasDisLiked", !hasDisLiked);

      if (!hasDisLiked) {
        // Add a new map entry for the user
        disLikedBy[UserId] = true;
        updateDatas.disLikedBy = disLikedBy;
      } else {
        // Toggle the value of the user's map entry
        disLikedBy[UserId] = !disLikedBy[UserId];
        updateDatas[`disLikedBy.${UserId}`] = disLikedBy[UserId];
      }
      await updateDoc(docRef, updateDatas);


      const dislikeCount = docSnap.data().dislike_count;
      // count the number of true values in the likedBy map
      const newdisLikeCount = Object.values(disLikedBy).filter(Boolean).length;
      // update the like_count field
      await updateDoc(docRef, { dislike_count: newdisLikeCount });
      // console.log("newdisLikeCount", newdisLikeCount);

      // update like_count
      const newLikeCount = Object.values(likedBy).filter(Boolean).length;
      await updateDoc(docRef, { like_count: newLikeCount });

    } catch (error) {
      console.log("Error disliking post: ", error);
      console.error(error);
    }
  }

  // Handling Like Button
  async function handleLikeButtonClick(id) {
    console.log(id);

    // const userRef=collection(db, "Users")
    let UserId = "abc123";

    // const user = getAuth().currentUser;
    // if (user) {
    //   UserId = user.uid;
    //   console.log("User is signed in.");
    // } else {
    //   // No user is signed in.
    //   console.log("No user is signed in.");
    // }


    // console.log(UserId);


    try {
      const postRef = collection(db, "Posts");

      const docRef = doc(db, "Posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());


      let likedBy = docSnap.data().likedBy;
      if (!likedBy) {
        likedBy = {};
      }

      let disLikedBy = docSnap.data().disLikedBy;
      if (!disLikedBy) {
        disLikedBy = {};
      }

      const updateDatas = {};

      if (disLikedBy[UserId]) {
        // Remove the user's name from the disLikedBy map
        delete disLikedBy[UserId];
        updateDatas.disLikedBy = disLikedBy;
      }

      var hasLiked;
      hasLiked = likedBy[UserId] || false;
      // console.log("hasLiked", !hasLiked);

      if (!hasLiked) {
        // Add a new map entry for the user
        likedBy[UserId] = true;
        updateDatas.likedBy = likedBy;
      } else {
        // Toggle the value of the user's map entry
        likedBy[UserId] = !likedBy[UserId];
        updateDatas[`likedBy.${UserId}`] = likedBy[UserId];
      }

      await updateDoc(docRef, updateDatas);


      const likeCount = docSnap.data().like_count;
      // count the number of true values in the likedBy map
      const newLikeCount = Object.values(likedBy).filter(Boolean).length;
      // update the like_count field
      await updateDoc(docRef, { like_count: newLikeCount });
      // console.log("newLikeCount", newLikeCount);

      // update dislike_count
      const newdisLikeCount = Object.values(disLikedBy).filter(Boolean).length;
      await updateDoc(docRef, { dislike_count: newdisLikeCount });

    } catch (error) {
      console.log("Error liking post: ", error);
      console.error(error);
    }
  }

  // Handling A Button  
  async function handleAButtonClick(id) {
    console.log(id);

    // const userRef=collection(db, "Users")
    let UserId = "abc123";


    // const user = getAuth().currentUser;
    // if (user) {
    //   UserId = user.uid;
    //   console.log("User is signed in.");
    // } else {
    //   // No user is signed in.
    //   console.log("No user is signed in.");
    // }

    // console.log(UserId);

    try {
      const postRef = collection(db, "Posts");
      const docRef = doc(db, "Posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());

      // Check if the post has a 'A' map
      let A = docSnap.data().A;
      if (!A) {
        A = {};
      }

      // Check if the post has a 'B' map
      let B = docSnap.data().B;
      if (!B) {
        B = {};
      }

      const updateDatas = {};

      if (B[UserId]) {
        // Remove the user's name from the B map
        delete B[UserId];
        updateDatas.B = B;
      }

      var hasA;
      hasA = A[UserId] || false;
      // console.log("hasA", !hasA);

      if (!hasA) {
        // Add a new map entry for the user
        A[UserId] = true;
        updateDatas.A = A;
      } else {
        // Toggle the value of the user's map entry
        A[UserId] = !A[UserId];
        updateDatas[`A.${UserId}`] = A[UserId];
      }

      await updateDoc(docRef, updateDatas);
      const ACount = docSnap.data().A_count;
      // count the number of true values in the A map
      const newACount = Object.values(A).filter(Boolean).length;
      // update the A_count field
      await updateDoc(docRef, { A_count: newACount });
      // console.log("newACount", newACount);

      // update B_count
      const BCount = docSnap.data().B_count;
      const newBCount = Object.values(B).filter(Boolean).length;
      await updateDoc(docRef, { B_count: newBCount });


    } catch (error) {
      console.log("Error liking a post: ", error);
      console.error(error);
    }
  }

  // Handling B Button
  async function handleBButtonClick(id) {
    // console.log(id);

    // const userRef=collection(db, "Users")
    let UserId = "abc123";

    // const user = getAuth().currentUser;
    // if (user) {
    //   UserId = user.uid;
    //   console.log("User is signed in.");
    // } else {
    //   // No user is signed in.
    //   console.log("No user is signed in.");
    // }

    // console.log(UserId);

    try {
      const postRef = collection(db, "Posts");
      const docRef = doc(db, "Posts", id);
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data());

      // Check if the post has a 'A' map
      let A = docSnap.data().A;
      if (!A) {
        A = {};
      }

      // Check if the post has a 'B' map
      let B = docSnap.data().B;
      if (!B) {
        B = {};
      }

      const updateDatas = {};

      if (A[UserId]) {
        // Remove the user's name from the A map
        delete A[UserId];
        updateDatas.A = A;
      }

      var hasB;
      hasB = B[UserId] || false;
      // console.log("hasB", !hasB);

      if (!hasB) {
        // Add a new map entry for the user
        B[UserId] = true;
        updateDatas.B = B;
      } else {
        // Toggle the value of the user's map entry
        B[UserId] = !B[UserId];
        updateDatas[`B.${UserId}`] = B[UserId];
      }

      await updateDoc(docRef, updateDatas);
      const BCount = docSnap.data().B_count;
      // count the number of true values in the B map
      const newBCount = Object.values(B).filter(Boolean).length;
      // update the B_count field
      await updateDoc(docRef, { B_count: newBCount });
      // console.log("newBCount", newBCount);

      // update A_count
      const ACount = docSnap.data().A_count;
      const newACount = Object.values(A).filter(Boolean).length;
      await updateDoc(docRef, { A_count: newACount });

    } catch (error) {
      console.log("Error liking b post: ", error);
      console.error(error);
    }
  }

  function handleText(post) {

    const text = post.text;
    if (text.length > 0 && text.length <= 50) {
      return styles[1];
    } else if (text.length > 50 && text.length <= 100) {
      return styles[2];
    } else if (text.length > 100 && text.length <= 200) {
      return styles[3];
    } else if (text.length > 200 && text.length <= 300) {
      return styles[4];
    } else if (text.length > 300 && text.length <= 400) {
      return styles[5];
    } else if (text.length > 400 && text.length <= 500) {
      return styles[6];
    } else if (text.length > 500 && text.length <= 600) {
      return styles[7];
    } else if (text.length > 600 && text.length <= 700) {
      return styles[8];
    } else if (text.length > 700 && text.length <= 750) {
      return styles[9];
    } else if (text.length == 0) {
      return styles[0];
    }

  }


  // ---------------const PostList = ({ posts }) => {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    const getUserPostedInfo = async (userId) => {
      const userRef = doc(db, 'Users', userId);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log('No such document!');
        return null;
      }
    };

    const fetchData = async () => {
      const userInfos = await Promise.all(posts.map((post) => getUserPostedInfo(post.UserId)));
      setUserInfos(userInfos);
    };

    fetchData();
  }, [posts]);

  return (
    <View style={{position: 'relative', flex:1}}>
     <ScrollView>
      {posts.map((post, index) => {
        const userInfo = userInfos[index];

        return (
          <View key={post.id} >
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingTop: 13, paddingLeft: 13, alignItems: 'center', position: 'absolute', top: 0, zIndex: 1}}>
              {userInfo && <Image style={{ width: 55, height: 55, borderRadius: 30, marginRight: 14, borderColor: '#454545', borderWidth: 1  }} source={{ uri: userInfo.ProfilePic }} />}
              {userInfo && <Text style={ userPostedStyles }>{userInfo.UserName}</Text>}
              <Text style={ userPostedStyles }> {post.Date}</Text>
            </View>

            <Image
              style={{
                width: windowWidth,
                height: windowHeight,
                resizeMode: 'stretch',
                marginBottom: 13,
                position: 'relative',
              }}
              source={{ uri: post.image }}
            />

            <Text style={handleText(post)} key={post.id}>
              {post.text}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 13, borderBottomColor: 'orange', borderBottomWidth: 2 }}>
              {post.split ? (
                <>
                  <TouchableOpacity onPress={() => handleAButtonClick(post.id)} style={{ marginLeft: 15 }}>
                    <Icon name="spellcheck" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("Share")}>
                    <Icon name="share" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("Delete")}>
                    <Icon name="delete" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleBButtonClick(post.id)} style={{ marginRight: 15 }}>
                    <Icon name="format-bold" size={40} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity onPress={() => { handleLikeButtonClick(post.id) }} style={{ marginLeft: 15 }}>
                    <Icon name="thumb-up-alt" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log(post)}>
                    <Icon name="share" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log("Delete")}>
                    <Icon name="delete" size={40} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handledisLikeButtonClick(post.id)} style={{ marginRight: 15 }}>
                    <Icon name="thumb-down-alt" size={40} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        );
      })}
       </ScrollView> 
        
            <View style={footerContainer}>
            <View style={footer}>
              {/* // navigate to home page on Press  */}
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={40} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('discover')}>
                <Icon name="explore" size={40} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                <Icon name="person" size={40} />
              </TouchableOpacity>
              </View>
            </View>
        </View>
   
  );
};

export default DiscoverPage;
