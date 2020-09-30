import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native'
import {Bar as ProgressBar} from 'react-native-progress'
import { RectButton } from "react-native-gesture-handler"
import * as Notifications from 'expo-notifications'
import {Feather as Icon} from '@expo/vector-icons'
import Constants from 'expo-constants'
import storage from '@react-native-community/async-storage'
import {useNavigation, useFocusEffect} from '@react-navigation/native'


const Home = () => {
    const [icon, setIcon] = useState(require(`../../assets/cup-of-water.png`))
    const [count, setCount] = useState(200)
    const [name, setName] = useState('')
    const [hourInterval, setHourInterval] = useState('')
    const [start, setStart] = useState('')
    const [down, setDown] = useState('')
    const [water, setWater] = useState('')
    const [hour, setHour] = useState(1)
    const [percentage, setPercentage] = useState(0)
    let identifier = ''
    let notification = ''
    let createNotification = true
    const navigation = useNavigation()

    useFocusEffect(()=> {
        storage.multiGet(['name', 'hourInterval', 'start', 'down', 'water']).
        then(response => {
            setDown(response[3][1]!)
            setName(response[0][1]!)
            setStart(response[2][1]!)
            setHourInterval(response[1][1]!)
            setHour(new Date().getHours())
        })
    })

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            identifier = notification.request.identifier
            console.log(identifier)
            handleOnOffNotifications(identifier)
            handleSetNotifications()
        })
        return () => subscription.remove()
    },[])

    useEffect(() => {
        handleDailyNotificantion()
        handleSetNotifications()
    })


    function handleOnOffNotifications (identifier: string){
        if(Number(start.substring(0,2)) <= hour){
            if(Number(down.substring(0,2)) > hour){
                return
            }else {
                Notifications.cancelScheduledNotificationAsync(identifier)
                createNotification = true
            }
        }else {
            Notifications.cancelScheduledNotificationAsync(identifier)
            createNotification = true            
        }
    }


    async function handleDailyNotificantion(){
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Bom dia,Hora de beber água!"
              },
              trigger:{
                  hour: Number(start.substring(0,2)),
                  minute: 0,
                  repeats: true
              }
        })
    }

    async function handleSetNotifications(){
        if(Number(start.substring(0,2)) <= hour){
            if(Number(down.substring(0,2)) >= hour){
                if(createNotification){
                    notification = await Notifications.scheduleNotificationAsync({
                        content: {
                          title: "Hora de beber água!"
                        },
                        trigger: {
                          seconds: 20,
                          repeats: true
                        },
                    })
                    createNotification = false
                } 
            }else {
                if(notification !== ''){
                    await Notifications.cancelScheduledNotificationAsync(notification)
                }
                createNotification = true
            }
        }else {
            if(notification !== ''){
                await Notifications.cancelScheduledNotificationAsync(notification)
            }
            createNotification = true
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
        console.log(identifier)
        if(Number(water) >= 2000){
            Alert.alert('Párabens', 'Você atingiu os 2L necessários hoje.')
            setPercentage(0)
            await Notifications.cancelScheduledNotificationAsync(identifier)
        }else {
            const result = ml + Number(water)
            setWater(String(result))
            await storage.setItem('water', water)
            handlePercentage()
        }
    }

    function handlePercentage(){
       let percentage =  Number(water)*100/2000
       setPercentage(percentage/100)
    }

    function handleNavigationToChangeOptions(){
        navigation.navigate('ChangeOptions')
    }
   
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.title}>Water Reminder</Text>
                <TouchableOpacity onPress={handleNavigationToChangeOptions}>
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
            <View style={styles.progressBarView}>
            <ProgressBar progress={percentage} width={null} ></ProgressBar>
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
    },

    progressBarView: {
        marginTop: 50,
    }


})

export default Home