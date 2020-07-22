import  React, {useState, useEffect} from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import NameRegister from './pages/nameRegister'
import OptionsRegister from './pages/optionsRegister'
import AppDetail from './pages/appDetail'
import Home from './pages/home'
import Initial from './pages/initial'
import storage from '@react-native-community/async-storage'

const AppStack = createStackNavigator() 

const Routes = () => {
    const [isUserRegistered, setUserRegistered] = useState(false)

    useEffect(() => {
        const retrieveData = () => {
            storage.getItem('logged')
            .then(response => {
                if(response){
                    setUserRegistered(Boolean(response))
                }else {
                    setUserRegistered(false)
                }
            })
        }
        retrieveData()
    },[isUserRegistered])
    

    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                }
            }}>

            {!isUserRegistered ? (
                <>
                    <AppStack.Screen name="NameRegister" component={NameRegister} />
                    <AppStack.Screen name="OptionsRegister" component={OptionsRegister} />
                    <AppStack.Screen name="AppDetail" component={AppDetail} />
                </>
                ): ( 
                <>
                    <AppStack.Screen name="Initial" component={Initial} />
            </> )} 
            <AppStack.Screen name="Home" component={Home} />
            
            
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes