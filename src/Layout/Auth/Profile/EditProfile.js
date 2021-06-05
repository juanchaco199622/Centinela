import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState, useRef } from 'react'
import { Button, IconButton, Subheading, ProgressBar, Avatar, TextInput, HelperText } from 'react-native-paper'
import { StyleSheet, Text, View, ScrollView, Alert, ImageBackground, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
// LIBRERIAS PARA LAS FOTOS INICIO
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions } from '../../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { useUploadImageCrearUsuario } from '../../../Hooks'
// LIBRERIAS PARA LA FOTO FIN

//Inicio de funcion
export default function EditProfile({ route, navigation }) {

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
    rol: data.rol?data.rol:data.id_rol,
    grupo: data.grupo?data.grupo:data.id_grupo,
    url: data.url
  })
  const [validNombres, setValidNombres] = useState(false);
  const [validApellidos, setValidApellidos] = useState(false);
  const [ramas, setRamas] = useState([{ label: '', value: '' }])
  const [rol, setRol] = useState([{ label: '', value: '' }])
  //Obtener datos de firestore
  useEffect(() => {
    firestore()
      .collection('Grupo')
      .orderBy('nombre')
      .get()
      .then(querySnapshot => {
        let grupo
        let datosRamas = []
        for (let i = 0; i < querySnapshot.size; i++) {
          grupo = querySnapshot.docs[i].data();
          datosRamas.push({ label: grupo.nombre, value: grupo.nombre });
        }
        setRamas(datosRamas);
      },);
  },[]);
  useEffect(() => {
    firestore()
      .collection('Rol')
      .orderBy('nombre')
      .get()
      .then(querySnapshot => {
        let _rol
        let datosRol = []
        for (let i = 0; i < querySnapshot.size; i++) {
          _rol = querySnapshot.docs[i].data();
          datosRol.push({ label: _rol.nombre, value: _rol.nombre });
        }
        setRol(datosRol);
      });
  },[]);

  //Funciones de acciones
  // LOGICA PARA OBTENER LA FOTO
  const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImageCrearUsuario();
  const [imageLocal, setImageLocal] = useState(state.url);
  const refRBSheet = useRef();

  const tomarFotoCamara = () => {
    refRBSheet.current.close()
    ImagePicker.launchCamera(imagePickerOptions, response => {
      const { didCancel, error } = response;
      if (didCancel) {
        alert(error);
      } else {
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
        alert(error);
      } else {
        monitorUpload(response);
        setImageLocal(response.uri);
      }
    })
  }
  const quitarImagenPerfil = () => {
    setImageLocal(null);
    refRBSheet.current.close();
  }

  // TERMINA LA LOGICA DE LA FOTO
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
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value });
    validInput(name, value);
  };
  const validInput = (name, value) => {
    let testNombres = true;
    let testApellidos = true;
    switch (name) {
      case 'nombres':
        testNombres = /^[A-Za-z\s]*$/g.test(value);
        setValidNombres(!testNombres);
        break;
      case 'apellidos':
        testApellidos = /^[A-Za-z\s]*$/g.test(value);
        setValidApellidos(!testApellidos);
        break;
    }
  };
  const updateProfile = async () => {
    let error = true
    if (state.nombres === '' || state.apellidos === '') {
      Alert.alert(
        null,
        'Completa todos los campos',
        [
          {
            text: 'Ok'
          },
        ],
        { cancelable: false },
      );
    } else {
      await firestore().collection('Usuario').doc(state.doc_id).update(
        {
          nombres: state.nombres,
          apellidos: state.apellidos,
          id_rol: state.rol,
          id_grupo: state.grupo,
          url: imageLocal,
        }
      ).then(() => {
        error = false
      });
    }
    if (!error) {
      switch (dir) {
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
            { cancelable: false },
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
            { cancelable: false },
          );
          break
      }
    }
  }
  //--------------------VISTA

  if (state.rol == 'Administrador'){
  
  return (
    <View>
    
      <SafeAreaView>
        <ScrollView>
          {/* Fondo de pantalla */}
          <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{ resizeMode: 'cover' }}>


            <Text style={styles.titleText}>EDITAR USUARIO</Text>
            <View style={styles.body}>
              <Text style={styles.subTitleText}>Información básica</Text>
              <View style={{ paddingHorizontal: 10 }}>
                {renderAvatar()}
                {uploading && (
                  <View style={{ paddingHorizontal: 10 }}>
                    <Text>Subiendo imagen: {parseInt(progress * 100) + '%'}</Text>
                    <ProgressBar progress={progress} color={'#b10909'} />
                  </View>
                )}
                <Button icon="camera" mode="text" color="gray" uppercase={false}
                  onPress={() => refRBSheet.current.open()}>Cambiar imagen de perfil</Button>
                <Text>Nombres</Text>
                <TextInput
                  error={validNombres}
                  style={styles.inputText}
                  mode='outlined'
                  returnKeyType={"next"} placeholder="Nombres"
                  onChangeText={(text) => handleChangeText('nombres', text)}
                  value={state.nombres}
                />
                <HelperText type="error" visible={validNombres}>
                  Ingrese un nombre valido
              </HelperText>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text>Apellidos</Text>
                <TextInput
                  error={validApellidos}
                  style={styles.inputText}
                  mode='outlined'
                  returnKeyType={"next"} placeholder="Apellidos"
                  onChangeText={(text) => handleChangeText('apellidos', text)}
                  value={state.apellidos}
                />
                <HelperText type="error" visible={validApellidos}>
                  Ingrese un apellido valido
                </HelperText>
              </View>
              <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
                <Text>Rama</Text>
                <RNPickerSelect style={pickerSelectStyles}
                  placeholder={{}}
                  onValueChange={(value) => handleChangeText('grupo', value)}
                  useNativeAndroidPickerStyle={false}
                  value={state.grupo}
                  items={ramas}
                />
              </View>
              <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
                <Text>Rol</Text>
                <RNPickerSelect style={pickerSelectStyles}
                  placeholder={{}}
                  onValueChange={(value) => handleChangeText('rol', value)}
                  useNativeAndroidPickerStyle={false}
                  value={state.rol}
                  items={rol}
                />
              </View>
              <View style={{ padding: 10 }}>
                <Button icon="floppy" color="#fff" uppercase={false} style={styles.roundButton}
                  onPress={() => updateProfile()}>Guardar</Button>
              </View>
            </View>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
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
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                <TouchableOpacity
                  onPress={tomarFotoCamara}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <IconButton
                    icon='camera'
                  />
                  <Subheading>Cámara</Subheading>
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
                  />
                  <Subheading>Abrir galería de fotos</Subheading>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={quitarImagenPerfil}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <IconButton
                    icon='delete'
                  />
                  <Subheading>Quitar foto de perfil</Subheading>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}// FIN DEL IF
  else{
    return (
      <View>
      
        <SafeAreaView>
          <ScrollView>
            {/* Fondo de pantalla */}
            <ImageBackground source={require('../../../../assets/imagenes/Login_Background_White.png')} style={{ resizeMode: 'cover' }}>
  
  
              <Text style={styles.titleText}>EDITAR USUARIO</Text>
              <View style={styles.body}>
                <Text style={styles.subTitleText}>Información básica</Text>
                <View style={{ paddingHorizontal: 10 }}>
                  {renderAvatar()}
                  {uploading && (
                    <View style={{ paddingHorizontal: 10 }}>
                      <Text>Subiendo imagen: {parseInt(progress * 100) + '%'}</Text>
                      <ProgressBar progress={progress} color={'#b10909'} />
                    </View>
                  )}
                  <Button icon="camera" mode="text" color="gray" uppercase={false}
                    onPress={() => refRBSheet.current.open()}>Cambiar imagen de perfil</Button>
                  <Text>Nombres</Text>
                  <TextInput
                    error={validNombres}
                    style={styles.inputText}
                    mode='outlined'
                    returnKeyType={"next"} placeholder="Nombres"
                    onChangeText={(text) => handleChangeText('nombres', text)}
                    value={state.nombres}
                  />
                  <HelperText type="error" visible={validNombres}>
                    Ingrese un nombre valido
                </HelperText>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text>Apellidos</Text>
                  <TextInput
                    error={validApellidos}
                    style={styles.inputText}
                    mode='outlined'
                    returnKeyType={"next"} placeholder="Apellidos"
                    onChangeText={(text) => handleChangeText('apellidos', text)}
                    value={state.apellidos}
                  />
                  <HelperText type="error" visible={validApellidos}>
                    Ingrese un apellido valido
                  </HelperText>
                </View>
                <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
                  <Text>Rama</Text>
                  <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{}}
                    onValueChange={(value) => handleChangeText('grupo', value)}
                    useNativeAndroidPickerStyle={false}
                    value={state.grupo}
                    items={ramas}
                    disabled={true}
                  />
                </View>
                <View style={{ paddingHorizontal: 10, paddingBottom: 15 }}>
                  <Text>Rol</Text>
                  <RNPickerSelect style={pickerSelectStyles}
                    placeholder={{}}
                    onValueChange={(value) => handleChangeText('rol', value)}
                    useNativeAndroidPickerStyle={false}
                    value={state.rol}
                    items={rol}
                    disabled={true}
                  />
                </View>
                <View style={{ padding: 10 }}>
                  <Button icon="floppy" color="#fff" uppercase={false} style={styles.roundButton}
                    onPress={() => updateProfile()}>Guardar</Button>
                </View>
              </View>
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
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
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                  <TouchableOpacity
                    onPress={tomarFotoCamara}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <IconButton
                      icon='camera'
                    />
                    <Subheading>Cámara</Subheading>
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
                    />
                    <Subheading>Abrir galería de fotos</Subheading>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={quitarImagenPerfil}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                      icon='delete'
                    />
                    <Subheading>Quitar foto de perfil</Subheading>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </ImageBackground>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }//FIN DEL ELSE
}

//-------------------ESTILOS
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  titleText: {
    alignSelf: 'center',
    padding: 20,
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
  inputText: {
    height: 40,
    backgroundColor: '#fff'
  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
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