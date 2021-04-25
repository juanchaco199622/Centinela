import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useLayoutEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Title, Caption, Button, Avatar, Divider } from 'react-native-paper'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth'

//Inicio de funcion
export default function Profile({navigation}) {
  /*auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'AppTabsScreen' : 'AuthStackScreen');
  });*/
//Declaracion de variables

const user = auth().currentUser;

  // User is signed in.

 


  if (user.email === null){
    navigation.navigate('AuthStackScreen');
  }
    auth().onAuthStateChanged(function(user) {
    if (user) {
      //navigation.navigate('Perfil');
     
    } else {
      // No user is signed in.
      navigation.navigate('AuthStackScreen');
    }
  });
  const [state, setState] = useState({
    doc_id: "",
    nombres : "",
    apellidos : "",
    correo: "",
    id_rol :"",
    grupo :"",
    url :""
});

useLayoutEffect(()=>{
 
 // console.log(user.email)

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
      grupo:usuario.id_grupo,
      url:usuario.url,
    });
    console.log(user.email)
  });

});

    

//Obtener datos de firestore


  const renderAvatar = () =>{
    if(state.url===null){
      const renderAvatarText =   () => (
        <Avatar.Text style={{alignSelf: 'center', backgroundColor:'#b31d1d'}}
        size={150} 
        label={state.nombres.charAt(0) + state.apellidos.charAt(0)}
        />
      );
      return renderAvatarText();
    }else{
      const renderAvatarImage = () => (
        <Avatar.Image style={{alignSelf: 'center'}}
        size={150} 
        source={{
        uri: state.url || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
        }}
        />
      );
      return renderAvatarImage();
    }
  }

//Estilos de la pantalla 
  const styles = StyleSheet.create({
      container:{
        flex:1,
        flexDirection:'column',
        marginTop:-150
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
      nameText:{
        alignSelf: 'center', 
        fontSize:20, 
        color:'#000', 
        fontWeight:'bold', 
        paddingTop:10
      },
      infoText:{
        alignSelf: 'center', 
        fontSize:15, 
        color:'#000', 
        paddingBottom:10
      },
      titleInfoText:{
        alignSelf: 'center', 
        fontSize:15, 
        color:'#999'
      },
      roundButton: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#b31d1d',
      },
  })
//Render
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>
    <SafeAreaView>
      <Text style={styles.titleText}>PERFIL</Text>
      <View style={styles.body}>
        <Text style={styles.subTitleText}>INFORMACIÓN BÁSICA</Text>
          {renderAvatar()}
          <View>
            <Text style={styles.nameText}>{ state.nombres} {state.apellidos}</Text>
            <Text style={styles.infoText}>{ state.correo}</Text>
            <Text style={styles.titleInfoText}>Rama:</Text>
            <Text style={styles.infoText}>{ state.grupo }</Text>
            <Text style={styles.titleInfoText}>Rol:</Text>
            <Text style={styles.infoText}>{ state.rol }</Text>
            <View style={{padding:10}}>
              <Button icon="pencil" color = "#fff" uppercase={false} 
                style={styles.roundButton} 
                onPress={()=>navigation.navigate('EditProfile',{state, page:'profile'})}
              >Editar usuario</Button>
            </View>
            {/**<View style={{padding:10}}>
              <Button icon="exit" color = "#fff" uppercase={false} 
                  style={styles.roundButton} 
                  onPress={()=>auth().signOut()}
                >Cerrar </Button>
            </View>**/}
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
    </View>
  )    
}