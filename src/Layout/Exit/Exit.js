import React from 'react'
import { View, Text, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function Exit() {

    const user = auth().currentUser

    auth()
  .signOut()
  .then( Alert.alert('Hasta luego : '+ user.email));
    return (
        <View>
        </View>

    )
}