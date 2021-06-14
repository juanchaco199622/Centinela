import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, Avatar } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Linking 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { useIsFocused } from '@react-navigation/native'
import storage from "@react-native-firebase/storage";
import getPath from '@flyerhq/react-native-android-uri-path';
// To pick the file from local file system
import DocumentPicker from "react-native-document-picker";
import { Icon, Header } from 'react-native-elements';

//Inicio de funcion
export default function Profile({ navigation }) {
  /*auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'AppTabsScreen' : 'AuthStackScreen');
  });*/
  //Declaracion de variables
  const isFocused = useIsFocused()
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [process, setProcess] = useState("");
  // User is signed in.
  if (user.email === null) {
    navigation.navigate('AuthStackScreen');
  }
  auth().onAuthStateChanged(function (user) {
    if (user) {
      //navigation.navigate('Perfil');

    } else {
      // No user is signed in.
      navigation.navigate('AuthStackScreen');
    }
  });
  const [state, setState] = useState({
    doc_id: "",
    nombres: "",
    apellidos: "",
    correo: "",
    id_rol: "",
    grupo: "",
    url: "",
    urlStorage: null
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
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          correo: usuario.email,
          rol: usuario.id_rol,
          grupo: usuario.id_grupo,
          url: usuario.url,
          urlStorage: usuario.urlStorage ? usuario.urlStorage : null
        });
      });
  }, [isFocused]);
  const _chooseFile = async () => {
    // Opening Document Picker to select one file
    try {
      const fileDetails = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.pdf],
      });
      /*console.log(
        fileDetails.uri + '\n',
        fileDetails.type + '\n', // mime type
        fileDetails.name + '\n',
        fileDetails.size
        //"Detalles del archivo : " + JSON.stringify(fileDetails)
      );*/
      // Setting the state for selected File
      setFilePath(fileDetails);
    } catch (error) {
      setFilePath({});
      // If user canceled the document selection
      alert(
        DocumentPicker.isCancel(error)
          ? "Cancelado"
          : "Error desconocido: " + JSON.stringify(error)
      );
    }
    try {
      // Check if file selected
      if (Object.keys(filePath).length == 0)
        return alert("Por favor selecciona un archivo");
      setLoading(true);

      // Create Reference
      //console.log(filePath.uri.replace("file://", ""));
      //console.log('este es el path ' + filePath.name);
      const reference = storage().ref(
        `/medical_info/${filePath.name}`
      );
      //console.log('esta es la referencia ' + reference);
      // Put File
      //console.log('este es la URI ' + filePath.uri);
      const fileUri = getPath(filePath.uri);
      const task = reference.putFile(fileUri);
      /*const task = reference.putFile(
        filePath.uri.replace("file://", "")
      );*/
      // You can do different operation with task
      // task.pause();
      // task.resume();
      // task.cancel();

      task.on("state_changed", (taskSnapshot) => {
        setProcess(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`
        );
        console.log(
          `${taskSnapshot.bytesTransferred} transferred 
           out of ${taskSnapshot.totalBytes}`
        );
      });
      task.then(() => {
        alert("Ficha medica cargada correctamente");
        setProcess("");
      });
      setFilePath({});
    } catch (error) {
      console.log("Error->", error);
      alert(`Error-> ${error}`);
    }
    setLoading(false);
  };
  const handleClick = () => {
    if(state.urlStorage){
      Linking.canOpenURL(state.urlStorage).then(supported => {
        if (supported) {
          Linking.openURL(state.urlStorage);
        } else {
          console.log("Error al abrir la ficha médica, intente nuevamente");
        }
      });
    }else{
      alert("El usuario no tiene ficha médica");
    }
  };
  //Obtener datos de firestore
  const renderAvatar = () => {
    if (state.url === null) {
      const renderAvatarText = () => (
        <Avatar.Text style={{ alignSelf: 'center', backgroundColor: '#b31d1d' }}
          size={150}
          label={state.nombres.charAt(0) + state.apellidos.charAt(0)}
        />
      );
      return renderAvatarText();
    } else {
      const renderAvatarImage = () => (
        <Avatar.Image style={{ alignSelf: 'center' }}
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
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    titleText: {
      alignSelf: 'center',
      paddingBottom: 20,
      fontSize: 25,
      fontWeight: 'bold'
    },
    subTitleText: {
      alignSelf: 'center',
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold'
    },
    body: {
      width: '85%',
      alignContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#e8e8e8',
      borderRadius: 8,
      borderWidth: 0.5
    },
    nameText: {
      alignSelf: 'center',
      fontSize: 19,
      color: '#000',
      fontWeight: 'bold',
      paddingTop: 10
    },
    infoText: {
      alignSelf: 'center',
      fontSize: 15,
      color: '#000',
      paddingBottom: 10
    },
    titleInfoText: {
      alignSelf: 'center',
      fontSize: 15,
      color: '#999'
    },
    roundButton: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#b31d1d',
    },
  })
  //Render
  return (
    <View style={styles.container}>
     
      <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
        <SafeAreaView>
          <ScrollView>
            {/**<Text style={styles.titleText}>PERFIL</Text>**/}
            <Text style={styles.titleText}>PERFIL</Text>
            <View style={styles.body}>
              <Text style={styles.subTitleText}>INFORMACIÓN BÁSICA</Text>
              {renderAvatar()}
              <View>
                <Text style={styles.nameText}>{state.nombres} {state.apellidos}</Text>
                <Text style={styles.titleInfoText}>Correo:</Text>
                <Text style={styles.infoText}>{state.correo}</Text>
                <Text style={styles.titleInfoText}>Rama:</Text>
                <Text style={styles.infoText}>{state.grupo}</Text>
                <Text style={styles.titleInfoText}>Rol:</Text>
                <Text style={styles.infoText}>{state.rol}</Text>
                <View style={{ padding: 10 }}>
                  <View style={{ padding: 5 }}>
                  <Button icon="book-open-page-variant" color={'#fff'} uppercase={false} onPress={()=>{ handleClick()}} style={styles.roundButton} >
                    Ver ficha médica
                  </Button>
                  </View>
                  <View style={{ padding: 5 }}>
                    <Button 
                      icon="pencil" 
                      color={'#fff'} 
                      uppercase={false} 
                      style={styles.roundButton}
                      onPress={() => navigation.navigate('EditProfile', { state, page: 'profile' })}
                    >
                      Editar usuario
                    </Button>
                  </View>
                </View>
                {/**<View style={{padding:10}}>
              <Button icon="exit" color = "#fff" uppercase={false} 
                  style={styles.roundButton} 
                  onPress={()=>auth().signOut()}
                >Cerrar </Button>
            </View>**/}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}