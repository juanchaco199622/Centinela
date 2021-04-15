import React, { useState } from 'react'
import { View, StyleSheet, Button , TextInput} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Profile() {

    const user = auth().currentUser
    const [state, setState] = useState({
        nombres : "",
        apellidos : "",
        email: "",
        password :"",
        id_rol :"",
    })

 const handleChangeText = (name,value )=>{
     setState({...state,[name]:value})
 }

 const saveNewUser = async () =>{
     if(state.nombres === '' || state.apellidos === ''){
        alert('Campos Vacios.')
     } else {
        await  firestore().collection('Usuario').add({
            id: user.uid,
            nombres: state.nombres,
            apellidos : state.apellidos,
            email : state.email,
            password : state.password,
            id_rol : state.id_rol,
        })
        alert('Datos Guardados')
     }
    // console.log(state)
 }

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Nombres'
                    onChangeText={(value) => handleChangeText("nombres",value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Apellidos'
                    onChangeText={(value) => handleChangeText("apellidos",value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Email'
                    onChangeText={(value) => handleChangeText("email",value)}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Password'
                    onChangeText={(value) => handleChangeText("password",value)}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput 
                    placeholder='Rol'
                    onChangeText={(value) => handleChangeText("id_rol",value)}
                />
            </View>


            <Button title='Save User' onPress={() => saveNewUser()} ></Button>
        </View>

    )
    
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding:35,
    },
    inputGroup : {
        flex : 1,
        padding:0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor : '#cccccc'
    }
})