import React, {useState} from "react";
import Constants from 'expo-constants'
import {View, Text, StyleSheet} from 'react-native'
import {Picker} from '@react-native-community/picker'

const OptionsRegister = () => {
  const [valuePicker, setValuePicker] = useState('1 hora')

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.description}>Agora selecione quando você gostaria de ser lembrado.</Text>
            </View>
            <View style={styles.picker}>
              <Picker selectedValue={valuePicker} onValueChange={() => {}}>
                <Picker.Item label='1 hora' value='1 hora'/>
                <Picker.Item label='2 horas' value='2 horas'/>
                <Picker.Item label='3 horas' value='3 horas'/>
              </Picker>
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
      fontFamily: 'Roboto_500Medium',
      fontSize: 16
    },

    picker: {
      flex: 1,
      justifyContent: 'center'
    }
})

export default OptionsRegister