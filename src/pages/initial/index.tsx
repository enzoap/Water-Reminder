import React from 'react'
import {useNavigation} from '@react-navigation/native'


const Initial = () => {
    const navigation = useNavigation()
    navigation.reset({
        index: 0,
        routes: [{name: 'Home'}]
    })
    return (
        <>

        </>
    )
    
}

export default Initial
