import React ,{ useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Avatar, Button, Card, Surface, Subheading} from 'react-native-paper';
import { StyleSheet, View, ImageBackground, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native'
import { Header,Icon } from 'react-native-elements';

//Inicio de la Funcion
export default function Home({navigation}) {
  const isFocused = useIsFocused()
//Declaracion de variables
//const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
const user = auth().currentUser;
const [state, setState] = useState({
  doc_id: "",
  nombres : "",
  apellidos : "",
  correo: "",
  id_rol :"",
  grupo :"",
  url :""
});

useEffect(() => {
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
  });
},[isFocused]);
  
//--------------------------------VISTAS
  
    if(state.rol == 'Administrador'){
          return (
          
            <View style={styles.container}>
              {/* Fondo de pantalla */}
              <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>
              
                {/* Botones y Direccionamiento */}
                <View style={styles.containerLogin} >
                  <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="account-multiple-plus" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('CreateUser')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                      Crear usuarios
                    </Button>
                  </Card.Content>
      
                  <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="account-group" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('ListUsers')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                      Listar usuarios
                    </Button>
                  </Card.Content>
      
                  <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="newspaper" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('CreatePublication')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                      Crear publicación
                    </Button>
                  </Card.Content>
                  <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="newspaper" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('ListPublications')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                      Listar publicaciones
                    </Button>
                  </Card.Content>
                </View>
      
              </ImageBackground>
            </View>
            )
    }else{
      return (
          
        <View style={styles.container}>
          {/* Fondo de pantalla */}
          <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>  
            <Surface style={styles.surface} >
              <Header
                  containerStyle={{
                    backgroundColor: '#b10909',
                    justifyContent: 'space-around',
                  }}
                  centerComponent={{ text: state.rol, style: { color: '#fff' } }}
                />
              <View style={styles.containerSecundary}>
                      
                  <Image
                      source={require('../../../../assets/images/icons/2.png')}
                      style={styles.imageBackground}
                  />
                  
                <Card.Content style={styles.containerButtonLogin} >
                  <Button icon="newspaper" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('ListPublications')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                    Listar publicaciones
                  </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                  <Button icon="newspaper-plus" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('CreatePublication')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                    Crear publicación
                  </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                  <Button icon="newspaper" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('ListPublications')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                    Listar publicaciones
                  </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                  <Button icon="notebook-plus-outline" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('CreateActivities')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                    Crear actividades
                  </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                  <Button icon="book-open-outline" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('ListActivities')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                    Listar actividades
                  </Button>
                </Card.Content>
              </View>
            </Surface>
          </ImageBackground>
        </View>
        )
    }
}

//--------------------------------ESTILOS
const styles = StyleSheet.create({
    surface: {
      height: '100%',
      width: '100%',
      backgroundColor: '#FFFFFF'
    },
    container:{
      flex:1,
      flexDirection:'column',
      justifyContent:'space-between',
    },
    input:{
      backgroundColor:'#FFFFFF',
      marginBottom:'2%'
    },  
    containerText:{
      margin:'5%',
      marginTop:'15%'
    },
    containerForgotPass:{
      flexDirection:'row',
      justifyContent:'flex-end',
      fontSize:20
    },
    containerButtonLogin:{
      margin:'5%',
      marginTop:'-1%',
      flexDirection:'column',
      justifyContent:'space-between',
    },
    buttonLogin:{
      padding:'2%'
    },
    facebookLogin:{
      padding:'2%',
      backgroundColor:'#dfe3ee',
    },
    containerButtonSignUp:{
      flexDirection:'row',
      justifyContent:'center',
      margin:'3%'
    },
    surface:{
      width:'100%',
      height:'100%',
      backgroundColor: '#f9f9f9'
    },
    containerSecundary:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#f9f9f9',
    padding:'5%',
    textAlign:'center'
    },
    textInfo:{
      textAlign:'center',
      marginBottom:'10%',
      fontSize:20,
      fontFamily:'ProductSans-Bold',
  }
  });