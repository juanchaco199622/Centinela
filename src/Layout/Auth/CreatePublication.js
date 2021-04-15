import React, { useState } from 'react'
import { View, StyleSheet, Button , TextInput, Text} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { List, Checkbox} from 'react-native-paper';

export default function CreatePublication(){
const user = auth().currentUser
const [state, setState] = useState({
    titulo : "",
    cuerpo: "",
    destinatario :"",
})

const handleChangeText = (name,value )=>{
    setState({...state,[name]:value})
}
const saveNewPublication = async () =>{
    if(state.titulo == '' || state.cuerpo === '' ){
       alert('Campos Vacios. Por favor digita la información para continuar')
    } else {
       await  firestore().collection('Publication').add({
           id: user.uid,
           titulo: state.titulo,
           cuerpo : state.cuerpo,
           destinatario : state.destinatario,
       })
       alert('Datos Guardados Correctamente')
    }
   // console.log(state)
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5FCFF',
    }})

return (
    <View style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput 
                placeholder='Titulo:'
                onChangeText={(value) => handleChangeText("titulo",value)}
            />
        </View>
        <View>
        <RNPickerSelect
      placeholder= {{ label: "Selecciona el primer grupo destinatario", value: "" }}
      onValueChange={(value) => setState(value)}
      
      useNativeAndroidPickerStyle={false}
      items={[
        { label: "Cachorros", value: "cachorro" },
        { label: "Lobatos", value: "Lobato" },
        { label: "Webelos", value: "Webelo" },
        { label: "Scouts", value: "Scout" },
        { label: "Rovers", value: "Rover" },
      ]}
  />
        </View>

      <View style={styles.inputGroup}>
            <TextInput 
                placeholder='Cuerpo:'
                onChangeText={(value) => handleChangeText("cuerpo",value)}
            />
        </View>
        <Button title='Publicar' onPress={() => saveNewPublication()} ></Button>
    </View>
    
)
}

//<View style={styles.inputGroup}>
//<RNPickerSelect
///onValueChange={(value) => console.log(value)}
//items={[
//    {label: 'Cachorros', value: 'cachorro'},
//    {label: 'Lobatos', value: 'lobato'},
//    {label: 'Webelos', value: 'Webelo'},
//    {label: 'Scouts', value: 'Scout'},
//    {label: 'Rovers', value: 'Rover'},
//]}
//></RNPickerSelect>
//</View>