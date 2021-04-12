import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Caption, Button, Avatar, Divider } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditProfile() {
  const admin = 'qvmIaejtqxpPGQQYegC5';
  const [state, setState] = useState({
      nombres : "",
      apellidos : "",
      correo: "",
      rol :"",
      grupo :""
  })
  
  firestore()
    .collection('Usuario')
    .doc(admin)
    .onSnapshot((doc) => {
      if(doc.exists){
        setState({
          nombres:doc.data().nombres, 
          apellidos:doc.data().apellidos,
          correo:doc.data().correo,
          rol:doc.data().id_rol,
          grupo:doc.data().id_grupo
        });
      }
    });

    const styles = StyleSheet.create({
      roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#6200ee',
      },
      profileHeader: {flexDirection:"row", padding:10, backgroundColor:"#fff"}
    });

    return (
      <SafeAreaView>
        <View style={styles.profileHeader}>
          <Avatar.Image
            source={{
              uri: 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg',
            }}
            size={80}
          />
          <View style={{marginLeft:10}}>
            <Title style={{marginTop:10}}>{ state.nombres} {state.apellidos}</Title>
            <Caption>{ state.grupo}</Caption>
          </View>
        </View>
        <Divider/>
        <View style={{flexDirection:"row", padding:10}}>
          <Icon name="account" size={25}/>
          <Text style={{marginLeft:10,marginTop:2}}>Editar</Text>
        </View>
        <View style={{flexDirection:"row", padding:10}}>
          <Icon name="email" size={25}/>
          <Text style={{marginLeft:10,marginTop:2}}>Editar</Text>
        </View>
        <Divider/>
        <View style={{alignItems:"flex-end", padding:10}}>
        <Button icon="pencil" color = "#fff" uppercase={false} style={styles.roundButton} onPress={()=>console.log('Si')}>Editar perfil</Button>
        </View>
        
      </SafeAreaView>
    )    
  }