import React from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function Home() {

    const user = auth().currentUser
    return (
        <View>

            <Text>Hola {user.email}  Bienvenido</Text>
        </View>
    )
}