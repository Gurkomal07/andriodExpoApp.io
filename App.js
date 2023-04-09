import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./js/myproject";
import LoginPage from "./js/login";
import Registration from "./js/Registration";
import { View } from 'react-native';
import Chat from './screens/Chat';
import DiscoverPage from "./js/discover";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name = "Login" component={LoginPage} />
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="discover" component={DiscoverPage} />


        {/* other screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
