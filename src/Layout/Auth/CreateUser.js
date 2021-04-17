import React, { useState } from 'react'
import { View, StyleSheet, Button , Text, ScrollView} from 'react-native'
import {TextInput} from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {

    const user = auth().currentUser
    const [state, setState] = useState({
        nombres : "",
        apellidos : "",
        email: "",
        id_rol :"",
        id_grupo : "",
    })

 const handleChangeText = (name,value )=>{
     setState({...state,[name]:value})
 }

 const saveNewUser = async () =>{
     if(state.nombres === '' || state.apellidos === ''){
        alert('Campos Vacios.')
     } else {
        await  firestore().collection('Usuario').add({
            nombres: state.nombres,
            apellidos : state.apellidos,
            email : state.email,
            id_rol : state.id_rol,
            id_grupo : state.id_grupo,
        })
        alert('Datos Guardados')
     }
    // console.log(state)
 }

 const rol = [
    { label: "Administrador", value: "Administrador" },
    { label: "Acudiente", value: "Acudiente" },
  ]; // array ROL

  const [ramas, setRamas] = useState({
    label:'', value:''
  })
  const rama = [
    { label: "Cachorros", value: "Cachorros" },
    { label: "Lobatos", value: "Lobatos" },
  ];

    return (
    <SafeAreaView>
        <ScrollView>
            
                <View style={styles.inputGroup}>
                    <Text>Nombres</Text>
                    <TextInput
                    mode='outlined'
                    returnKeyType={"next"} placeholder="Nombres"
                    onChangeText={(value) => handleChangeText('nombres', value)}
                    //theme={{colors: {primary: 'black'}}}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text>Apellidos</Text>
                    <TextInput
                    mode='outlined'
                    returnKeyType={"next"} placeholder="Apellidos"
                    onChangeText={(value) => handleChangeText('apellidos', value)}
                    //theme={{colors: {primary: 'black'}}}
                    />
                </View> 

                <View style={styles.inputGroup}>
                    <Text>Email</Text>
                    <TextInput
                    mode='outlined'
                    returnKeyType={"next"} placeholder="Email"
                    onChangeText={(value) => handleChangeText('email', value)}
                    //theme={{colors: {primary: 'black'}}}
                    />
                </View> 

                <View style={styles.inputGroup}>
                    <Text>Rol</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                        placeholder= {{}}
                        onValueChange={(value) => handleChangeText('id_rol', value)}
                        useNativeAndroidPickerStyle={false}
                        value={state.id_rol}
                        items={rol}
                        //theme={{colors: {primary: 'black'}}}
                    />
                </View>

                <View style={{padding:10}}>
                    <Text>Rama</Text>
                    <RNPickerSelect style={pickerSelectStyles}
                    placeholder= {{}}
                    onValueChange={(value) => handleChangeText('id_grupo', value)}
                    useNativeAndroidPickerStyle={false}
                    value={state.id_grupo}
                    items={rama}
                    />
                </View>

                <Button title='Save User' onPress={() => saveNewUser()} ></Button>
          
        </ScrollView>
    </SafeAreaView>

    )
    
}

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

const styles = StyleSheet.create({
   
    inputGroup : {
        padding:10
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#b31d1d',
        padding:10,
      },
      profileHeader: {flexDirection:"row", padding:10, backgroundColor:"#fff"},
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
})