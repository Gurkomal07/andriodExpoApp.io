import React, { useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Svg } from "react-native-svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const Registration = () => {
  let [userName, setUserName] = useState("");
  let [email, setEmail] = useState("");
  let [fullName, setFullName] = useState("");
  let [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  let [confirmPassword, setConfirmPassword] = useState("");
  let [age, setAge] = useState("");
  let [city, setCity] = useState("");
  let [postalCode, setPostalCode] = useState("");
  let [gender, setGender] = useState("");

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handlePress = () => {
    console.log("TextInput pressed!");
  };

  const auth = getAuth();
  const db = getFirestore();

  const colRef = collection(db, "Users");

  getDocs(colRef).then((data) => {
    const data1 = data.docs.map((d) => ({ id: d.id, ...d.data() }));
    data1.map((e) => {
      console.log(e);
    });
  });

  const rform = (event) => {
    event.preventDefault();

    const g = query(colRef, where("UserName", "==", userName));
    const s = getDocs(g);
    // console.log(g);
    s.then((querySnapshot) => {
      if (!querySnapshot.empty) {
        // The username already exists
        alert("Username already taken. Please choose a different one.");
        return;
      } else {
        const passwordConfirm = password;
        //console.log(email, password);

        // check for email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
          console.log("please enter a valid email address.");
        }
        //check that the password eets minimum length requirements
        if (password.length < 8) {
          console.log("password must be atleast 8 characters.");
          return;
        }

        //check that the password and password confirmation match
        if (password !== passwordConfirm) {
          console.log("password do not match");
          return;
        }

        createUserWithEmailAndPassword(auth, email, password).then(() => {
          sendEmailVerification(auth.currentUser);
          window.alert("Account Registered");

          console.log("send");

          if (auth.currentUser.emailVerified) {
            //This will return true or false
            console.log("email is verified");
          } else {
            console.log("email not verified");
          }

          console.log("send");
          addDoc(colRef, {
            UserName: userName,
            Email: email,
            Password: password,
            FullName: fullName,
            Gender: gender,
            PostalCode: postalCode,
            City: city, //
            Age: age,
            ProfilePic:
              "https://img.freepik.com/premium-vector/male-profile-flat-blue-simple-icon-with-long-shadowxa_159242-10092.jpg",
          });
          //window.location.href="../dist/index.html"
        });
      }
    });
  };

  return (
    <ImageBackground
      source={require("../assets/background-login.jpg")}
      style={{ flex: 1 }}
    >
      <View style={styles.rcontainer}>
        <View style={styles.rbackground}>
          <View>
            <Text style={styles.rheader}>Registration</Text>
          </View>
          <TextInput
            style={styles.rinput}
            placeholder="Username"
            onChangeText={setUserName}
            value={userName}
          />
          <TextInput
            style={styles.rinput}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.rinput}
            placeholder="Fullname"
            onChangeText={setFullName}
            value={fullName}
          />

          <TouchableOpacity onPress={handlePress} style={styles.touchable}>
            <View style={styles.rinputPassword}>
              <TextInput
                placeholder="Password"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={setPassword}
              />
              <MaterialIcons
                onPress={togglePasswordVisibility}
                name={password ? "visibility-off" : "visibility"}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePress} style={styles.touchable}>
            <View style={styles.rinputPassword}>
              <TextInput
                placeholder="ConfirmPassword"
                secureTextEntry={hidePassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <MaterialIcons
                onPress={togglePasswordVisibility}
                name={confirmPassword ? "visibility-off" : "visibility"}
                size={24}
                color="black"
              />
            </View>
          </TouchableOpacity>

          <TextInput
            style={styles.rinput}
            placeholder="Age"
            onChangeText={setAge}
            value={age}
          />
          <TextInput
            style={styles.rinput}
            placeholder="City"
            onChangeText={setCity}
            value={city}
          />
          <TextInput
            style={styles.rinput}
            placeholder="Postal Code"
            onChangeText={setPostalCode}
            value={postalCode}
          />
          <TextInput
            style={styles.rinput}
            placeholder="Gender"
            onChangeText={setGender}
            value={gender}
          />
          <Button title="Register" onPress={rform} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rcontainer: {
    marginTop: 40,
    marginBottom: 1,
    marginLeft: 30,
    marginRight: 30,
  },
  rbackground: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "rgba(250, 250, 250, 0.7)",
  },
  rheader: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 5,
  },
  rinput: {
    width: "70%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  touchable: {
    width: "70%",
  },
  rinputPassword: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
});

export default Registration;
