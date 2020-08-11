import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { RectButton } from "react-native-gesture-handler"
import * as Notifications from 'expo-notifications'
import {Feather as Icon} from '@expo/vector-icons'
import Constants from 'expo-constants'
import storage from '@react-native-community/async-storage'
import * as BackgroundFetch from 'expo-background-fetch'

const Home = () => {
    const [icon, setIcon] = useState(require(`../../assets/cup-of-water.png`))
    const [count, setCount] = useState(200)
    const [name, setName] = useState('')
    const [hourInterval, setHourInterval] = useState('')
    const [start, setStart] = useState('')
    const [down, setDown] = useState('')
    const [water, setWater] = useState('')
    const [hour, setHour] = useState(1)

    useEffect(()=> {
        storage.multiGet(['name', 'hourInterval', 'start', 'down', 'water']).
        then(response => {
            setDown(response[3][1]!)
            setName(response[0][1]!)
            setStart(response[2][1]!)
            setWater(response[4][1]!)
            setHourInterval(response[1][1]!)
            setHour(new Date().getHours())
        })
    })

    useEffect(() => {
        handleOnOffNotifications()
    })

    function handleOnOffNotifications(){
        console.log(start, down)
        if(Number(start.substring(0,2)) <= hour){
            console.log('1')
            if(Number(down.substring(0,2)) >= hour){
                console.log('2')
                Notifications.scheduleNotificationAsync({
                    content: {
                      title: "Hora de beber água!"
                    },
                    trigger: {
                      seconds: Number(hourInterval),
                      repeats: true
                    },
                  });
            }else {
                Notifications.cancelAllScheduledNotificationsAsync()
            }
        }else {
            Notifications.cancelAllScheduledNotificationsAsync()
        }
    }


    function changeImage(){
        if(count === 200 ){
            setIcon(require('../../assets/bottle-water.png'))
            setCount(500)
        }
        if(count === 500){
            setIcon(require('../../assets/bottle-water-1000.png'))
            setCount(1000)
        }
        if(count === 1000){
            setIcon(require(`../../assets/cup-of-water.png`))
            setCount(200)
        }
        
    }

    async function handleWaterRegister(ml : number){
        const result = ml + Number(water)
        setWater(result.toString())
        storage.setItem('water', water)
    }
   
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Water Reminder</Text>
                <TouchableOpacity onPress={() => {}}>
                    <Icon name="settings" size={20}/>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.subTitle}>{`Bem vindo ${name}`}</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.description}>Clique no botão abaixo para registrar um copo d'água.</Text>
                <Image style={styles.image}  source={icon}/>
                <Text>{`${count} ml`}</Text>
            </View>
            <View>
            <RectButton onPress={changeImage} style={styles.button}>
                    <Text style={styles.textButton}>Alterar</Text>
                </RectButton>
            </View>
            <View>
                <RectButton style={styles.button} onPress={() => handleWaterRegister(count)}>
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
        marginTop: 10,
        alignItems: 'center'
    },

    description: {
        fontSize: 16,
        fontFamily: 'Roboto_400Regular',
        marginBottom: 5
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
        resizeMode: 'center',
        marginBottom: 5
    },

    subTitle: {
        fontFamily: 'Roboto_500Medium', 
        fontSize: 16,
        paddingTop: 5
    }

    
})

export default Home