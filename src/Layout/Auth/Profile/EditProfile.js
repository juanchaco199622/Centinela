import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Title, Button, Avatar, Divider, TextInput } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';

//Inicio de funcion
export default function EditProfile({route, navigation}) {

//Declaracion de variables
  const user = auth().currentUser
  const data = route.params.state;
  const [state, setState] = useState({
    nombres: data.nombres, 
    apellidos: data.apellidos,
    correo: data.correo,
    rol: data.rol,
    grupo: data.grupo
  })
  const [ramas, setramas] = useState('')
  const rama = [
    { label: "Cachorros", value: "Cachorro" },
    { label: "Lobatos", value: "Lobato" },
    { label: "Webelos", value: "Webelo" },
    { label: "Scouts", value: "Scout" },
    { label: "Rovers", value: "Rover" },
  ];
  const rol = [
    { label: "Administrador", value: "Administrador" },
    { label: "Acudiente", value: "Acudiente" },
  ];
//Obtener datos de firestore
useEffect(()=>{
  let isSubscribed = true
  firestore()
    .collection('Grupo')
    .doc('7YmkzBGtRNw5IJK15zex')
    .onSnapshot((doc) => {
      if(isSubscribed){
        const datos = doc.json();
        console.log(datos);
      }
    });
  return () => isSubscribed = false
},[]) 
//Estilos
  const styles = StyleSheet.create({
    roundButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#6200ee',
    },
    profileHeader: {flexDirection:"row", padding:10, backgroundColor:"#fff"}
  });
  const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 15,
      paddingVertical: 13,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      color: 'black',
      paddingRight: 30,
    },
  });
//Funciones de acciones
  const updateProfile = async () =>{
    let error = true
    if(state.nombres === '' || state.apellidos === ''){
      Alert.alert(
        null,
        'Completa todos los campos',
        [
          {
            text: 'OK'
          },
        ],
        {cancelable: false},
      );
    } else {
        await firestore().collection('Usuario').doc(user.uid).update(
          {
            nombres: state.nombres,
            apellidos: state.apellidos,
            rol: state.rol,
            grupo: state.grupo,
          }
        ).then(() => {
          error = false
        });
      }
    if(!error){
      Alert.alert(
        null,
        'Perfil actualizado correctamente',
        [
          {
            text: 'OK', 
            onPress: () => navigation.navigate('Perfil')
          },
        ],
        {cancelable: false},
      );
    }
  }
  const handleChangeText = (name, value )=>{
      setState({...state,[name]:value})
  }
//Render
  return (
    <SafeAreaView>
      <ScrollView>
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
        <Text>Nombres</Text>
        <TextInput
          mode='outlined'
          returnKeyType={"next"} placeholder="Nombres"
          onChangeText={(text) => handleChangeText('nombres', text)}
          value={state.nombres}
        />
      </View>
      <View style={{padding:10}}>
        <Text>Apellidos</Text>
        <TextInput
          mode='outlined'
          returnKeyType={"next"} placeholder="Apellidos"
          onChangeText={(text) => handleChangeText('apellidos', text)}
          value={state.apellidos}
        />
      </View> 
      <View style={{padding:10}}>
        <Text>Rol</Text>
        <RNPickerSelect style={pickerSelectStyles}
          placeholder= {{}}
          onValueChange={(value) => handleChangeText('rol', value)}
          useNativeAndroidPickerStyle={false}
          value={state.rol}
          items={rol}
        />
      </View>
      <View style={{padding:10}}>
        <Text>Rama</Text>
        <RNPickerSelect style={pickerSelectStyles}
          placeholder= {{}}
          onValueChange={(value) => handleChangeText('grupo', value)}
          useNativeAndroidPickerStyle={false}
          value={state.grupo}
          items={rama}
        />
      </View>
      <Divider/>
      <View style={{alignItems:"flex-end", padding:10}}>
      <Button icon="floppy" color = "#fff" uppercase={false} style={styles.roundButton} 
      onPress={()=>updateProfile()}>Guardar</Button>
      </View>
      </ScrollView> 
    </SafeAreaView>
  )    
}