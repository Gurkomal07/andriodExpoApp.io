import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CreatePage() {
  const navigation = useNavigation();

  
  const handleSubmit = ()  => {
    navigation.navigate('');
  };
  

  return (
    <View style={styles.container}>
    
    <Button title="Access Text" onPress={handleSubmit} />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
  
 
});
