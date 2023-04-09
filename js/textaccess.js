import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';

const AddText = () => {
  const textInputRef = useRef(null);
  const [textValue, setTextValue] = useState('');

  const handleSubmit = () => {
    let maxLength = 750;

    if (textValue.length > maxLength) {
      setTextValue(textValue.slice(0, maxLength) + "...");
    }
  }

  return (
    <View>
      
      <View>
        <TextInput
          ref={textInputRef}
          placeholder="Enter text"
          onChangeText={(text) => setTextValue(text)}
          onSubmitEditing={handleSubmit}
          
        />
      </View>
      
    </View>
  );
};


export default AddText;
