import React, {useState, useEffect} from 'react'
import Constants from 'expo-constants'
import { RectButton } from "react-native-gesture-handler"
import {Feather as Icon} from '@expo/vector-icons'
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native'
import {Picker} from '@react-native-community/picker'
import {useNavigation} from '@react-navigation/native'
import storage from '@react-native-community/async-storage'


interface Item {
  hour: string[]
}

const ChangeOptions = () => {
  const [valuePickerHourInterval, setValuePickerHourInterval] = useState('3600')
  const [valuePickerDay, setValuePickerDay] = useState('00:00')
  const [valuePickerNight, setValuePickerNight] = useState('00:00')
  const showToast = () => {
      ToastAndroid.show('Configurações alteradas com sucesso!',
      ToastAndroid.SHORT)
  }

  useEffect(() => {
    storage.multiGet(['hourInterval', 'start', 'down']).
    then(response => {
        setValuePickerNight(response[2][1]!)
        setValuePickerDay(response[1][1]!)
        setValuePickerHourInterval(response[0][1]!)
    })
  },[])
  

  let hourArr:Item = {hour: []}
  
  for (let i = 0; i <= 24; i++){
    if(i <= 9){
     hourArr.hour.push(`0${i}:00`)
    }
    if(i >=10 && i <= 23){
      hourArr.hour.push(`${i}:00`)
    }
  }

  async function handleSetValuesStorage(){
    storage.multiSet([
        ['start', valuePickerDay],
        ['down', valuePickerNight],
        ['hourInterval', valuePickerHourInterval]
    ])
    showToast()
    navigation.goBack()
  }


  const navigation = useNavigation()
  
  function handleNavigationBack(){
    navigation.goBack()
  }

  function handleValuePicker(itemValue: string | number){
    setValuePickerHourInterval(String(itemValue))
  }

  function handleValuePickerDay(itemValue: string | number){
    setValuePickerDay(String(itemValue))
  }

  function handleValuePickerNight(itemValue: string | number){
    setValuePickerNight(String(itemValue))
  }

    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigationBack}>
            <Icon name="arrow-left" size={20} color="black"></Icon>
          </TouchableOpacity>
          <View style={styles.main}>
            <Text style={styles.description}>Agora selecione a cada quanto tempo você gostaria de ser lembrado.</Text>
          </View>
            <View style={styles.picker}>
              <Picker mode='dropdown' selectedValue={valuePickerHourInterval} onValueChange={(itemValue, itemIndex) => handleValuePicker(itemValue)}>
                <Picker.Item label='1 hora' value='3600'/>
                <Picker.Item label='2 horas' value='7200'/>
                <Picker.Item label='3 horas' value='10800'/>
              </Picker>
            </View>
            <View style={styles.main}>
              <Text style={styles.description}>Não esqueça de selecionar qual horario você inicia o dia e qual você termina o dia.</Text>
            </View>
            <View style={styles.pickerView}>
              <Picker style={styles.dualPicker} selectedValue={valuePickerDay} onValueChange={(itemValue, itemIndex) => handleValuePickerDay(itemValue)}>
                {hourArr.hour.map(item => (
                 <Picker.Item key={item} label={item} value={item}/> 
                ))}
              </Picker>
              <Picker style={styles.dualPicker} selectedValue={valuePickerNight} onValueChange={(itemValue, itemIndex) => handleValuePickerNight(itemValue)}>
                {hourArr.hour.map(item => (
                 <Picker.Item key={item} label={item} value={item}/> 
                ))}
              </Picker>
            </View>
            <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleSetValuesStorage}>
              <Text style={styles.textButton}>Salvar</Text>
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

    pickerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 10
    },

    picker: {
      marginTop: 20,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10
    },

    dualPicker: {
      marginTop: 20,
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      width: 120
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

export default ChangeOptions