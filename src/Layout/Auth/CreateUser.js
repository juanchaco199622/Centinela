import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, TextInput, IconButton, Subheading, ProgressBar, HelperText, Avatar } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
//import auth from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, Header } from 'react-native-elements';

// LIBRERIAS PARA LAS FOTOS INICIO
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions } from '../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { useUploadImageCrearUsuario } from '../../Hooks'
// LIBRERIAS PARA LA FOTO FIN

const CreateUser = ({ navigation }) => {
    //Declaracion de variables
    const [state, setState] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        id_rol: "",
        id_grupo: "",
    });
    const [validNombres, setValidNombres] = useState(false);
    const [validApellidos, setValidApellidos] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validId_rol, setValidId_rol] = useState(false);
    const [validId_grupo, setValidId_grupo] = useState(false);
    const [emailExist, setEmailExist] = useState(false);

    const [ramas, setRamas] = useState([{ label: '', value: '' }]);
    const [rol, setRol] = useState([{ label: '', value: '' }]);
    //Obtener datos desde firestore
    useEffect(() => {
        //RAMAS
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
            });
    }, []);
    useEffect(() => {
        //ROLES
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
    }, []);
    // LOGICA PARA OBTENER LA FOTO
    const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImageCrearUsuario();
    const [imageLocal, setImageLocal] = useState(null);
    const refRBSheet = useRef();

    const tomarFotoCamara = () => {
        refRBSheet.current.close()
        ImagePicker.launchCamera(imagePickerOptions, response => {
            const { didCancel, error } = response;
            if (didCancel) {
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
            } else {
                monitorUpload(response)
                setImageLocal(response.uri)
            }
        })
    }

    // TERMINA LA LOGICA DE LA FOTO
    //Funciones
    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
        validInput(name, value)
    };
    const validInput = (name, value) => {
        let testNombres = true;
        let testApellidos = true;
        let testEmail = true;
        switch (name) {
            case 'nombres':
                testNombres = /^[A-Za-z\s]*$/g.test(value);
                setValidNombres(!testNombres);
                break;
            case 'apellidos':
                testApellidos = /^[A-Za-z\s]*$/g.test(value);
                setValidApellidos(!testApellidos);
                break;
            case 'email':
                testEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(value);
                setValidEmail(!testEmail);
                break;
            case 'id_grupo':
                if (!value) {
                    setValidId_grupo(true);
                } else {
                    setValidId_grupo(false);
                }
                break;
            case 'id_rol':
                if (!value) {
                    setValidId_rol(true);
                } else {
                    setValidId_rol(false);
                }
                break;
        }
    };

    const saveNewUser = () => {
        if (state.nombres && state.apellidos && state.email) {
            firestore()
                .collection('Usuario')
                .where('email', '==', state.email)
                .get()
                .then(querySnapshot => {
                    let emailCreated;
                    querySnapshot.forEach(r => emailCreated = r.data().email);
                    if (emailCreated == state.email) {
                        alert('Ya existe un usuario con el correo ingresado')
                        setValidEmail(true);
                    } else {
                        if (validId_rol || validId_grupo) {
                            alert('Por favor seleccione un rol y una rama para crear el usuario')
                        } else {
                            firestore().collection('Usuario').add({
                                nombres: state.nombres,
                                apellidos: state.apellidos,
                                email: state.email,
                                id_rol: state.id_rol,
                                id_grupo: state.id_grupo,
                                url: imageLocal,
                            });
                            Alert.alert(
                                null,
                                'Usuario creado correctamente',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.navigate('home')
                                    }
                                ],
                                { cancelable: false },
                            );
                        }
                    }
                });
        } else {
            alert('Complete todos los campos')
        }
    };
    //Render
    return (
        <View style={styles.container}>
            <Header
                containerStyle={{
                    backgroundColor: '#b31d1d',
                    justifyContent: 'space-around',
                }}
                //leftComponent={{ icon: 'reply', color: '#fff', }}
                leftComponent={<Icon
                    name='keyboard-backspace'
                    color='#fff'
                    iconStyle={{ fontSize: 27 }}
                    onPress={() => navigation.navigate('home')}
                />

                }
                centerComponent={{ text: 'USUARIOS', style: { color: '#fff' } }}

            />
            <ImageBackground source={require('../../../assets/imagenes/Login_Background_White.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={styles.titleText}>CREAR USUARIO</Text>
                        <View style={styles.body}>
                            <Text style={styles.subTitleText}>Información básica</Text>
                            <View style={{ alignSelf: 'flex-start', paddingBottom: 10 }}>
                                <Button
                                    icon="camera"
                                    color="gray"
                                    uppercase={false}
                                    mode="text"
                                    onPress={() => refRBSheet.current.open()}
                                >
                                    Tomar o subir una imagen
                        </Button>
                            </View>
                            {uploading && (
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Text>Subiendo imagen: {parseInt(progress * 100) + '%'}</Text>
                                    <ProgressBar progress={progress} color={'#b10909'} />
                                </View>
                            )}
                            <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
                                {downloadURL && (
                                    <Avatar.Image style={{ alignSelf: 'center' }}
                                        size={150}
                                        source={{ uri: imageLocal }}
                                    />
                                )}
                            </View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text>Nombres</Text>
                                <TextInput
                                    error={validNombres}
                                    style={styles.inputText}
                                    mode='outlined'
                                    placeholder="Nombres"
                                    onChangeText={value => handleChangeText('nombres', value)}
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
                                    placeholder="Apellidos"
                                    onChangeText={value => handleChangeText('apellidos', value)}
                                />
                                <HelperText type="error" visible={validApellidos}>
                                    Ingrese un apellido valido
                        </HelperText>
                            </View>
                            <View style={{ paddingHorizontal: 10 }}>
                                <Text>Correo</Text>
                                <TextInput
                                    error={validEmail}
                                    style={styles.inputText}
                                    mode='outlined'
                                    autoCapitalize='none'
                                    placeholder="Correo"
                                    onChangeText={value => handleChangeText('email', value)}
                                />
                                <HelperText type="error" visible={validEmail}>
                                    Ingrese un correo valido
                        </HelperText>
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>Rama</Text>
                                <RNPickerSelect style={pickerSelectStyles}
                                    placeholder={{ label: 'Seleccionar...', value: null }}
                                    onValueChange={value => handleChangeText('id_grupo', value)}
                                    useNativeAndroidPickerStyle={false}
                                    value={state.id_grupo}
                                    items={ramas}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>Rol</Text>
                                <RNPickerSelect style={pickerSelectStyles}
                                    placeholder={{ label: 'Seleccionar...', value: null }}
                                    onValueChange={value => handleChangeText('id_rol', value)}
                                    useNativeAndroidPickerStyle={false}
                                    value={state.id_rol}
                                    items={rol}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Button
                                    icon="floppy"
                                    color="#fff"
                                    uppercase={false}
                                    style={styles.roundButton}
                                    onPress={() => saveNewUser()}
                                >Guardar
                        </Button>
                            </View>
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
                                </View>
                            </RBSheet>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
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
    inputText: {
        height: 40,
        backgroundColor: '#fff'
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b10909',
    },
    buttonDisable: {
        backgroundColor: '#ccc',
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
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff'
    },

});
// FIN DE LOS ESTILOS
export default CreateUser;