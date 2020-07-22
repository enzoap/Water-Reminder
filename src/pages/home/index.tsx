import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { RectButton } from "react-native-gesture-handler"
import Constants from 'expo-constants'
import storage from '@react-native-community/async-storage'

const Home = () => {
    async function reset(){
        storage.clear()
    }
    return (
        <View style={styles.container}>
            <RectButton onPress={reset}>
                <Text>Reseta</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5f2f7',
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight
    }   
})

export default Home