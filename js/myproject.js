import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const loginpage = () => {
    navigation.navigate("Login");
  };

  const Registration = () => {
    navigation.navigate("Registration");
  };

  const Chats = () => {
    navigation.navigate("Chat");
  };

  const discover = () => {
    navigation.navigate("discover");
  };


 

  return (
    <View>
      <Button title="Registration" onPress={Registration} />

      <Button title='Login' onPress={loginpage} />  

      <Button title="Chat" onPress={Chats} />   

      <Button title="Discover" onPress={discover} /> 

    </View>
  );
};

export default HomeScreen;
