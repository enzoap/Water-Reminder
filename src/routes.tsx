import  React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";

import NameRegister from './pages/nameRegister'
import OptionsRegister from './pages/optionsRegister'
import AppDetail from './pages/appDetail'

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" screenOptions={{
                cardStyle: {
                    backgroundColor: '#f0f0f5'
                }
            }}>

            <AppStack.Screen name="NameRegister" component={NameRegister} />
            <AppStack.Screen name="OptionsRegister" component={OptionsRegister} />
            <AppStack.Screen name="AppDetail" component={AppDetail} />
            
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes