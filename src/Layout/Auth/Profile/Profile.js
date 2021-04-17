import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Caption, Button, Avatar, Divider } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth'

//Inicio de funcion
export default function Profile({navigation}) {

//Declaracion de variables
  const user = auth().currentUser;
  const [state, setState] = useState({
      doc_id: "",
      nombres : "",
      apellidos : "",
      correo: "",
      id_rol :"",
      grupo :""
  });
//Obtener datos de firestore
  firestore()
  .collection('Usuario')
  .where('email', '==', user.email)
  .get()
  .then(querySnapshot => {
    const usuario = querySnapshot.docs[0].data()
    const docId = querySnapshot.docs[0].id
    setState({
      doc_id: docId,
      nombres:usuario.nombres, 
      apellidos:usuario.apellidos,
      correo:usuario.email,
      rol:usuario.id_rol,
      grupo:usuario.id_grupo
    });
  });

//Estilos
  const styles = StyleSheet.create({
    roundButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: '#b31d1d',
    },
    profileHeader: {flexDirection:"row", padding:10, backgroundColor:"#fff"}
  });
//Render
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
            <Caption>{ state.correo}</Caption>
          </View>
      </View>
      <Divider/>
        <View style={{flexDirection:"row", padding:10}}>
          <Icon name="spa" size={25}/>
          <Text style={{marginLeft:10,marginTop:2}}>{ state.grupo }</Text>
        </View>
        <View style={{flexDirection:"row", padding:10}}>
          <Icon name="account" size={25}/>
          <Text style={{marginLeft:10,marginTop:2}}>{ state.rol }</Text>
        </View>
        {/* <View style={{flexDirection:"row", padding:10}}>
          <Icon name="account" size={25}/>
          <Text style={{marginLeft:10,marginTop:2}}>{ user.uid }</Text>
        </View> */} 
      <Divider/>
      <View style={{alignItems:"flex-end", padding:10}}>
        <Button icon="pencil" color = "#fff" uppercase={false} 
          style={styles.roundButton} 
          onPress={()=>navigation.navigate('EditProfile',{state})}
        >Editar perfil</Button>
      </View>
    </SafeAreaView>
  )    
}