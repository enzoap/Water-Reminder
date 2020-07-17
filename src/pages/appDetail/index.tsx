import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import {Feather as Icon} from '@expo/vector-icons'
import Constants from 'expo-constants'
import {useNavigation, useRoute} from '@react-navigation/native'

interface Params {
  name: string,
  hourInterval: string,
  start: string,
  down: string
}

const AppDetail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const routeParams = route.params as Params

  function handleNavigationBack(){
    navigation.goBack()
  }

    return(
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigationBack}>
            <Icon name="arrow-left" size={20} color="black"></Icon>
          </TouchableOpacity>  
          <View style={styles.main}>
            <Text style={styles.description}>O objetivo é atingir 2L por dia, o app vai te lembrar conforme as opções selecionadas.</Text>
            <Text style={styles.description}>Você pode clicar no botão para acrescentar mais 200ml no seu dia.</Text>
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
      marginTop: 50,
      justifyContent: 'center'
    },

    description: {
      fontFamily: 'Roboto_400Regular',
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

export default AppDetail