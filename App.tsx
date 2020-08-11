import React from 'react';
import {StatusBar} from 'react-native'
import { AppLoading } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto'
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'
import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
	Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  async function getPermissionAsync() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: true,
        }),
      });
    } else {
      throw new Error('Permissão para notificação não concedida.');
    }
  }

  getPermissionAsync()

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
    <>
	    <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent/>
      <Routes/>
    </>
  )
}


