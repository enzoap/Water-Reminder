import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { RectButton } from "react-native-gesture-handler"
import {Feather as Icon} from '@expo/vector-icons'
import Constants from 'expo-constants'
import storage from '@react-native-community/async-storage'

const Home = () => {
   
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Water Reminder</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="settings" size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.main}>
                <Text style={styles.description}>Clique no botão abaixo para registrar um copo d'água.</Text>
                <Image style={styles.image}  source={require('../../assets/cup-of-water.png')}/>
                <Text>200ml</Text>
            </View>
            <View>
            <RectButton style={styles.button}>
                <Text style={styles.textButton}>Registrar</Text>
                </RectButton>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5f2f7',
        padding: 30,
        paddingTop: 25 + Constants.statusBarHeight
    },

    topBar: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 28
    },

    main: {
        marginTop: 50,
        alignItems: 'center',
    },

    description: {
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        marginBottom: 20
    },

    button: {
        backgroundColor: '#0191C8',
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    textButton: {
        fontSize: 16,
        fontFamily: 'Roboto_500Medium'
    },

    image:{
        width: 120,
        height: 100,
        resizeMode: 'center' 
    }

    
})

export default Home