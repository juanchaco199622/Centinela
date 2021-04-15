import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Button, Avatar, Divider, TextInput } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth'

export default function EditProfile({navigation}) {
  const user = auth().currentUser // Variable del servicio usuario

  const [state, setState] = useState({
      nombres : "",
      apellidos : "",
      correo: "",
      rol :"",
      grupo :""
  },{setNombres: ""})
  
  firestore()
    .collection('Usuario')
    .doc(user.uid)
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
            <Title style={{marginTop:25}}>Editar Perfil</Title>
          </View>
        </View>
        <Divider/>
        <View style={{padding:10}}>
              <TextInput
                mode='outlined'
                label='Nombres'
                autoCapitalize='none'
                value={state.nombres}
              />
        </View>
        <View style={{padding:10}}>
              <TextInput
                mode='outlined'
                label='Apellidos'
                autoCapitalize='none'
                value={state.apellidos}
              />
        </View>
        <View style={{padding:10}}>
              <TextInput
                mode='outlined'
                label='Rol'
                autoCapitalize='none'
                value={state.rol}
              />
        </View>
        <View style={{padding:10}}>
              <TextInput
                mode='outlined'
                label='Rama'
                autoCapitalize='none'
                value={state.grupo}
              />
        </View>
        <Divider/>
        <View style={{alignItems:"flex-end", padding:10}}>
        <Button icon="floppy" color = "#fff" uppercase={false} style={styles.roundButton} onPress={()=>navigation.navigate('Perfil')}>Guardar</Button>
        </View>
        
      </SafeAreaView>
    )    
  }