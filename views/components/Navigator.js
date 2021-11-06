import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar'
import React from 'react'
import { Provider } from 'react-redux'
import store from '../../redux/store/store'
import ChatPage from '../ChatPage'
import RegisterPage from '../RegisterPage'


const Stack = createNativeStackNavigator()

export default function Navigator() {

    setStatusBarBackgroundColor("#46007F")
    setStatusBarStyle('light')

    return (
        <Provider store = {store}>
            <NavigationContainer>
            <Stack.Navigator
                screenOptions={
                    {
                        header: () => null
                    }
                }>
                <Stack.Screen
                    name="RegisterPage"
                    component={RegisterPage} />
                <Stack.Screen
                    name="ChatPage"
                    component={ChatPage} />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    )
}