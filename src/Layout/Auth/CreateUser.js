import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { TextInput, IconButton, Subheading, ProgressBar, Card, Avatar} from 'react-native-paper';
import {Button} from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
const user = auth().currentUser;
const [states, setStates] = useState({
  doc_id: "",
  nombres : "",
  correo: "",
  id_rol :"",
  grupo :"",
  url :""
});

//Obtener datos de firestore
firestore()
.collection('Usuario')
.where('email', '==', user.email)
.get()
.then(querySnapshot => {
  const usuario = querySnapshot.docs[0].data()
  const docId = querySnapshot.docs[0].id
  setStates({
    doc_id: docId,
    nombres:usuario.nombres, 
    apellidos:usuario.apellidos,
    correo:usuario.email,
    rol:usuario.id_rol,
    grupo:usuario.id_grupo,
    url:usuario.url,
  });
});
const renderAvatar = () =>{
  if(states.url===null){
    const renderAvatarText =   () => (
      <Avatar.Text style={{alignSelf: 'center', backgroundColor:'#EEEEEE'}}
      size={20} 
      label={states.nombres.charAt(0) + states.apellidos.charAt(0)}
      />
    );
    return renderAvatarText();
  }else{
    const renderAvatarImage = () => (
      <Avatar.Image style={{alignSelf: 'center'}}
      size={20} 
      source={{
      uri: states.url || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
      }}
      />
    );
    return renderAvatarImage();
  }
}

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
            console.log(_rol.nombre);
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
    const saveNewUser= () =>{
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
        <View style={styles.container}>
        {/* /*<Card style ={{backgroundColor:"#B10909"}}>
            <Card.Title title={states.nombres} subtitle={states.rol} left={LeftContent} titleStyle={{color:"#EEEEEE"}} subtitleStyle={{color:"#EEEEEE"}}/>
        </Card>*/ }
        <ImageBackground source={require('../../../assets/imagenes/Login_Background_White.png')} style={{ resizeMode:'cover', justifyContent: 'center'}}>
        <View style={styles.container}>
            {/* Fondo de pantalla */}
            
            <SafeAreaView>
                <ScrollView>
                <Text style={styles.titleText}>CREAR USUARIO</Text>
                <View style={styles.body}>
                    <Text style={styles.subTitleText}>Información básica</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.TextGroup}>Imagen:</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Button title='Subir Imagen'
                            buttonStyle={{ height: 30, width: '100%', borderRadius: 10,justifyContent: 'center',alignItems: 'center'}}
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
                    <View style={{ marginTop: 15 }}></View>
                    {downloadURL && (
                        <Button title='Guardar'
                            buttonStyle={{ marginTop: 15, width: '70%', alignSelf: 'center', borderRadius: 15 }}
                            style={styles.roundButton}
                            onPress={() => saveNewUser()}  ></Button>)}
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
        </View>
        </ImageBackground>
        </View>
    ) 
}


 //Estilos de la pantalla 
const styles = StyleSheet.create({
    container:{
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