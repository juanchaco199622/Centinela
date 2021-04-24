import React ,{ useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import { Avatar, Button, Card} from 'react-native-paper';
import { StyleSheet, View, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';

//Inicio de la Funcion
export default function Home({navigation}) {

//Declaracion de variables
const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
const user = auth().currentUser;
const [state, setState] = useState({
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
const renderAvatar = () =>{
  if(state.url===null){
    const renderAvatarText =   () => (
      <Avatar.Text style={{alignSelf: 'center', backgroundColor:'#EEEEEE'}}
      size={20} 
      label={state.nombres.charAt(0) + state.apellidos.charAt(0)}
      />
    );
    return renderAvatarText();
  }else{
    const renderAvatarImage = () => (
      <Avatar.Image style={{alignSelf: 'center'}}
      size={20} 
      source={{
      uri: state.url || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
      }}
      />
    );
    return renderAvatarImage();
  }
}
    
//--------------------------------VISTAS
    return (
      <View style={styles.container}>
        {/* <Header
          headerStyle ={{backgroundColor:"#B10909"}}
          leftComponent={{ icon: 'menu', color: '#EEEEEE' }}
          centerComponent={{ text: 'Home', style: { color: '#EEEEEE'} }}
        /> */}

        {/* Header */}
        <Card style ={{backgroundColor:"#B10909"}}>
            <Card.Title title={state.nombres} subtitle={state.rol} left={LeftContent} titleStyle={{color:"#EEEEEE"}} subtitleStyle={{color:"#EEEEEE"}}/>
        </Card>

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
    }
  });