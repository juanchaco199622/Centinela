import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, Avatar, TextInput, Card } from 'react-native-paper'
import { StyleSheet, Text, View, ScrollView, Alert, ImageBackground} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';

//Inicio de funcion
export default function EditProfile({route, navigation}) {

//Declaracion de variables
  const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
  const data = route.params.state;
  const dir = route.params.page;
  const user = auth().currentUser;
  const [state, setState] = useState({
    doc_id: data.doc_id,
    nombres: data.nombres, 
    apellidos: data.apellidos,
    correo: data.correo,
    rol: data.rol,
    grupo: data.grupo,
    url: data.url
  })
  const [ramas, setRamas] = useState([{label:'',value:''}])
  const [rol, setRol] = useState([{label:'',value:''}])
//Obtener datos de firestore
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
    
//Funciones de acciones
  const updateProfile = async () =>{
    let error = true
    if(state.nombres === '' || state.apellidos === ''){
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
        await firestore().collection('Usuario').doc(state.doc_id).update(
          {
            nombres: state.nombres,
            apellidos: state.apellidos,
            id_rol: state.rol,
            id_grupo: state.grupo,
            url : state.url,
          }
        ).then(() => {
          error = false
        });
      }
    if(!error){
      switch (dir){
        case 'listUsers':
          Alert.alert(
            null,
            'Usuario actualizado correctamente',
            [
              {
                text: 'OK', 
                onPress: () => navigation.navigate('ListUsers')
              },
            ],
            {cancelable: false},
          );
        break
        case 'profile':
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
        break
      } 
    }
  }
  const handleChangeText = (name, value )=>{
      setState({...state,[name]:value})
  }

//--------------------VISTA
  return (
    <View>
      {/* Header */}
      {/* <Card style ={{backgroundColor:"#B10909"}}>
        <Card.Title title={state.nombres} subtitle={state.rol} left={LeftContent} titleStyle={{color:"#EEEEEE"}} subtitleStyle={{color:"#EEEEEE"}}/>
      </Card> */}
      <SafeAreaView>
      {/* Fondo de pantalla */}
      <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{resizeMode:'cover'}}>

      
          <Text style={styles.titleText}>EDITAR USUARIO</Text>
          <View style={styles.body}>
            <Text style={styles.subTitleText}>Información básica</Text>
            <View style={{padding:10}}>
              <Text>Nombres</Text>
              <TextInput
                style={styles.inputText}
                mode='outlined'
                returnKeyType={"next"} placeholder="Nombres"
                onChangeText={(text) => handleChangeText('nombres', text)}
                value={state.nombres}
              />
            </View>
            <View style={{padding:10}}>
              <Text>Apellidos</Text>
              <TextInput
                style={styles.inputText}
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
                items={ramas}
              />
            </View>
            <View style={{padding:10}}>
              <Button icon="floppy" color = "#fff" uppercase={false} style={styles.roundButton} 
              onPress={()=>updateProfile()}>Guardar</Button>
            </View>
          </View>
      </ImageBackground>
      </SafeAreaView>
    </View>
  )    
}

//-------------------ESTILOS
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
        color: '#000',
        paddingRight: 30,
        backgroundColor: '#fff'
    },
});