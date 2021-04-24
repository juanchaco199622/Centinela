import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity, Image} from 'react-native';
import { TextInput, IconButton, Subheading, ProgressBar} from 'react-native-paper';
import {Button} from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
//import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';

// LIBRERIAS PARA LAS FOTOS INICIO
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions } from '../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { useUploadImageCrearUsuario } from '../../Hooks'
// LIBRERIAS PARA LA FOTO FIN

export default function CreateUser({navigation}) {
    //Declaracion de variables
    
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
            //console.log(_rol.nombre);
            datosRol.push({ label: _rol.nombre, value: _rol.nombre });
          }
          setRol(datosRol);
        });
      },[])

      // LOGICA PARA OBTENER LA FOTO
      const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImageCrearUsuario();
        const [imageLocal, setImageLocal] = useState();
        const refRBSheet = useRef();
            
        const tomarFotoCamara = () => {
            refRBSheet.current.close()
            ImagePicker.launchCamera(imagePickerOptions, response => {
                const { didCancel, error } = response;
                if (didCancel) {
                    console.log('Cancelaste');
                } else {
                    console.log(response)
                    monitorUpload(response)

                    setImageLocal(response.uri)
                }
            })
        }

        const mostrarfotoGalaria = () => {
            refRBSheet.current.close()
            ImagePicker.launchImageLibrary(imagePickerOptions, response => {
                const { didCancel, error } = response;
                if (didCancel) {
                    console.log('Cancelaste');
                } else {
                    console.log(response)
                    monitorUpload(response)
                    setImageLocal(response.uri)
                }
            })
        }

    // TERMINA LA LOGICA DE LA FOTO
    //Funciones
    const handleChangeText = (name,value )=>{
        setState({...state,[name]:value})
    };

    const guardar = () =>{
        firestore().collection('Usuario_prueba').add({
            nombres: state.nombres,
            apellidos : state.apellidos,
            email : state.email,
            id_rol : state.id_rol,
            id_grupo : state.id_grupo,
            url : downloadURL,
        }).then(()=>{
            error = false
        });
        /*if(!error){
            Alert.alert(
                null,
                'Usuario creado correctamente, valida tu buzon de mensajes',
                [
                  {
                    text: 'OK', 
                    onPress: () => navigation.navigate('Home')
                  },
                ],
                {cancelable: false},
              );
            
        }*/
        console.log('Error', 'Este correo si se puede.')

    }
    /*const [users, setUsers] = useState({
        doc_id: "",
        nombres : "",
        apellidos : "",
        correo: "",
        id_rol :"",
        grupo :"",
        url :"",
      });*/
      
    const saveNewUser= () =>{
        
        console.log(state.email);
        firestore()
        .collection('Usuario')
        .where('email', '==', state.email)
        .get()
        .then(querySnapshot => {
            const users = [];
            let i = 0;
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                doc_id: querySnapshot.docs[i].id
              });
              i++;
            });
           // setUsers(users);
           const validation = users.map(x=>(x.email))
           if(validation == state.email){
                alert('El correo ya existe')
           }else{
            let error = true
               //console.log('nuevo correo')
               firestore().collection('Usuario').add({
                nombres: state.nombres,
                apellidos : state.apellidos,
                email : state.email,
                id_rol : state.id_rol,
                id_grupo : state.id_grupo,
                url : downloadURL,
                }).then(()=>{
                    error = false
                });

            Alert.alert(
                null,
                'Usuario creado correctamente',
                [
                    {
                    text: 'OK', 
                    onPress: () => navigation.navigate('Home')
                    },
                ],
                {cancelable: false},
                );
           }
        });
                  
    };
    //Render
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.titleText}>CREAR USUARIO</Text>
                <View style={styles.body}>
                    <Text style={styles.subTitleText}>Información básica</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.TextGroup}>Imagen:</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15, alignItems: 'center' }}>
                            <TextInput
                                style={{ width: '60%', backgroundColor: 'white', borderRadius: 10 }}
                                placeholder='Subir Imagen:'
                            />

                            <Button title="Subir..."
                                buttonStyle={{ height: 30, width: 70, marginLeft: 10, borderRadius: 12, color:'black' }}
                                onPress={() => refRBSheet.current.open()} />
                        </View>
                        {downloadURL && (
                            <Image
                                source={{ uri: imageLocal }}
                                style={{ width: 255, height: 200, alignSelf: 'center', marginTop: 15, marginRight: 5 }}
                            />

                        )}

                    </View>

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
                        //value={email}
                        //onChangeText={(email) => setEmail(email)}
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
                   {/**<View style={{padding:10}}>
                        <Button 
                        icon="floppy" 
                        color = "#fff" 
                        uppercase={false} 
                        style={styles.roundButton} 
                        onPress={()=>saveNewUser()}
                        >Guardar
                        </Button>
                    </View>**/}
                    <View style={{ marginTop: 15 }}></View>

                    {downloadURL && (
                        <Button title='Guardar'
                            buttonStyle={{ marginTop: 15, width: '70%', alignSelf: 'center', borderRadius: 15 }}
                            style={styles.roundButton}
                            onPress={() => saveNewUser()} 
                            disabled={(state.nombres =='' || state.apellidos=='') ? true:false }
                            ></Button>)}
                            

                    {uploading && (
                        <View>
                            <ProgressBar progress={progress} />
                            <Subheading>{parseInt(progress * 100) + ' %'}</Subheading>
                        </View>
                    )}

                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        height={180}
                        customStyles={{

                            wrapper: {
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            },
                            draggableIcon: {
                                backgroundColor: '#ffc604'
                            }
                        }}
                    >
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', marginTop: '2%' }}>
                            <TouchableOpacity
                                onPress={tomarFotoCamara}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: '2%'
                                }}>
                                <IconButton
                                    icon='camera'
                                    size={30}
                                    color={'grey'}
                                />
                                <Subheading style={{ fontFamily: 'Montserrat-Medium' }}>Tomar foto</Subheading>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={mostrarfotoGalaria}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <IconButton
                                    icon='image-multiple'
                                    size={30}
                                    color={'grey'}

                                />
                                <Subheading style={{ fontFamily: 'Montserrat-Medium' }}>Seleccionar de galería</Subheading>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                    <Subheading style={{ height: 50, backgroundColor: '#b10909', flex: 1, justifyContent: 'space-between' }}></Subheading>
                </View>
            </ScrollView>
        </SafeAreaView>
    ) 
}


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
    TextGroup: {
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
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
// FIN DE LOS ESTILOS