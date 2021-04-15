import React from 'react'
import { View, Text, Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

export default function Exit() {

    auth().signOut()
  
  
}