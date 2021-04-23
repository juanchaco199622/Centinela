import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateUser({navigation}) {
    //Declaracion de variables
    const user = auth().currentUser;
    const [state, setState] = useState({
        nombres : "",
        apellidos : "",
        email: "",
        id_rol :"",
        id_grupo : "",
    });
    const [ramas, setRamas] = useState([{label:'',value:''}]);
    const [rol, setRol] = useState([{label:'',value:''}]);
    //Obtener datos desde firestore
    useEffect(()=>{
        firestore()
        .collection('Grupo')
        .get()
        .then(querySnapshot => {
          let grupo
          let datosRamas = []
          for (let i=0; i < querySnapshot.size; i++){
            grupo = querySnapshot.docs[i].data();
            datosRamas.push({ label: grupo.nombre, value: grupo.nombre });
          }
          setRamas(datosRamas);
        });
        firestore()
        .collection('Rol')
        .get()
        .then(querySnapshot => {
          let _rol
          let datosRol = []
          for (let i=0; i < querySnapshot.size; i++){
            _rol = querySnapshot.docs[i].data();
            console.log(_rol.nombre);
            datosRol.push({ label: _rol.nombre, value: _rol.nombre });
          }
          setRol(datosRol);
        });
      },[])
    //Estilos de la pantalla 
    const styles = StyleSheet.create({
        container:{
            backgroundColor:'#fff'
        },
        titleText:{
            alignSelf:'center', 
            padding:20, 
            fontSize:25, 
            fontWeight:'bold'
        },
        subTitleText:{
            padding:10, 
            fontSize:20, 
            fontWeight:'bold'
        },
        body: {
            width: '85%',
            alignContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#e8e8e8',
            borderRadius: 8,
            borderWidth: 0.5
        },
        inputText:{
            height:40, 
            backgroundColor:'#fff'
        },
        roundButton: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#b31d1d',
        },
    })
    const pickerSelectStyles = StyleSheet.create({
        inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 15,
            paddingVertical: 7,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            color: 'gray',
            paddingRight: 30,
            backgroundColor: '#fff'
        },
    });
    //Funciones
    const handleChangeText = (name,value )=>{
        setState({...state,[name]:value})
    };
    const saveNewUser = async () =>{
        let error = true
        if(state.nombres === '' || state.apellidos === '' || state.email === ''){
            Alert.alert(
                null,
                'Completa todos los campos',
                [
                  {
                    text: 'Ok'
                  },
                ],
                {cancelable: false},
            );
        } else {
            await  firestore().collection('Usuario').add({
                nombres: state.nombres,
                apellidos : state.apellidos,
                email : state.email,
                id_rol : state.id_rol,
                id_grupo : state.id_grupo,
            }).then(()=>{
                error = false
            });
        }
        if(!error){
            Alert.alert(
              null,
              'Usuario creado correctamente',
              [
                {
                    text: 'Crear otro',
                },
                {
                    text: 'OK', 
                    onPress: () => navigation.navigate('home')
                },
              ],
              {cancelable: false},
            );
        }
    };
    //Render
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.titleText}>CREAR USUARIO</Text>
                <View style={styles.body}>
                    <Text style={styles.subTitleText}>Información básica</Text>
                    <View style={{padding:10}}>
                        <Text>Nombres</Text>
                        <TextInput
                        style={styles.inputText}
                        mode='outlined'
                        returnKeyType={"next"} placeholder="Nombres"
                        onChangeText={(value) => handleChangeText('nombres', value)}
                        />
                    </View>
                    <View style={{padding:10}}>
                        <Text>Apellidos</Text>
                        <TextInput
                        style={styles.inputText}
                        mode='outlined'
                        returnKeyType={"next"} placeholder="Apellidos"
                        onChangeText={(value) => handleChangeText('apellidos', value)}
                        />
                    </View> 
                    <View style={{padding:10}}>
                        <Text>Correo</Text>
                        <TextInput
                        style={styles.inputText}
                        mode='outlined'
                        autoCapitalize='none'
                        returnKeyType={"next"} placeholder="Correo"
                        onChangeText={(value) => handleChangeText('email', value)}
                        />
                    </View> 
                    <View style={{padding:10}}>
                        <Text>Rol</Text>
                        <RNPickerSelect style={pickerSelectStyles}
                        placeholder= {{}}
                        onValueChange={(value) => handleChangeText('id_rol', value)}
                        useNativeAndroidPickerStyle={false}
                        value={state.id_rol}
                        items={rol}
                        />
                    </View>
                    <View style={{padding:10}}>
                        <Text>Rama</Text>
                        <RNPickerSelect style={pickerSelectStyles}
                        placeholder= {{}}
                        onValueChange={(value) => handleChangeText('id_grupo', value)}
                        useNativeAndroidPickerStyle={false}
                        value={state.id_grupo}
                        items={ramas}
                        />
                    </View>
                    <View style={{padding:10}}>
                        <Button 
                        icon="floppy" 
                        color = "#fff" 
                        uppercase={false} 
                        style={styles.roundButton} 
                        onPress={()=>saveNewUser()}
                        >Guardar
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    ) 
}
