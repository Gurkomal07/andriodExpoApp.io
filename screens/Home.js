import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function Home(){
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerRight}>
                    <TouchableOpacity>
                        <FontAwesome name="camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name="new-message" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
               onPress={() => navigation.navigate('Chat')}
               style={styles.ChatButton}
            >
              <Entypo name="chat" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    ChatButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    headerRight: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
        marginRight: 10
    }
});


