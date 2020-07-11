import React from 'react'
import Constants from 'expo-constants'
import { RectButton } from "react-native-gesture-handler";
import { StyleSheet, Text, View, TextInput } from 'react-native';

const NameRegister = () => {
    return (
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={ styles.title}>Water Reminder</Text>
            <Text style={ styles.description}>Bem vindo, para começar a usar o app, por favor entre com seu nome:</Text>
            <TextInput style={styles.input} placeholder="Nome" autoFocus={true}></TextInput>
          </View>
          <View style={styles.footer}>
            <RectButton style={styles.button}>
              <Text style={styles.textButton}>Continuar</Text>
            </RectButton>
          </View>
          
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e5f2f7',
      padding: 32,
      paddingTop: 20 + Constants.statusBarHeight
    },

    main: {
      paddingTop: 20,
      justifyContent: 'center'
    },

    input:{
      height: 50,
      backgroundColor: '#fff',
      paddingHorizontal: 5,
      borderRadius: 10,
      marginBottom: 8,
      marginTop: 15
    },

    title: {
      fontFamily: 'Ubuntu_700Bold',
      fontSize: 32,
    },

    description: {
      fontFamily: 'Roboto_500Medium',
      paddingTop: 30,
      fontSize: 16
    },

    footer: {
      marginTop: 10,
      paddingTop: 30
    },

    button:{
      backgroundColor: '#0191C8',
      height: 60,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center'
    }, 

    textButton: {
      fontSize: 16,
      fontFamily: 'Roboto_500Medium'
    }
  })

export default NameRegister