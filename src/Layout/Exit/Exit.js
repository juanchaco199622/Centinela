import React from 'react'
import { View, Text, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function Exit() {

    //const user = auth().signOut().then(() => console.log('User signed out!'));

    auth()
  .signOut()
  .then( Alert.alert('Hasta luego CentinelAPP'));
    return (
        <View>
            <Text>Terminado</Text>
        </View>

    )
}