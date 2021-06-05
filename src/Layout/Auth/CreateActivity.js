import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Text, ImageBackground, Alert } from 'react-native'
import { Button, IconButton, Subheading, ProgressBar, Card, Avatar } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions } from '../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { useUploadImagePreRegister } from '../../Hooks'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PickerCheckBox from 'react-native-picker-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import DatePicker from 'react-native-datepicker';
import { Icon, Header } from 'react-native-elements';

export default function CreateActivity({ navigation }) {
    //Declaracion de variables
    const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImagePreRegister();
    //const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
    const [imageLocal, setImageLocal] = useState();
    //const [checkedItem, setICheckedItem] = useState();
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
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


    const user = auth().currentUser

    const handleConfirm = (pItems) => {
        //setICheckedItem(pItems);
        var name = "checkedItem";
        setPublicar({ ...publicar, [name]: pItems })
    }
    const handleConfirmResp = (pItems) => {
        //setICheckedItem(pItems);
        var name = "checkedResp";
        setPublicar({ ...publicar, [name]: pItems })
    }

    const cItems = {};
    const [state, setState] = useState({
        doc_id: "",
        nombres: "",
        apellidos: "",
        correo: "",
        rol: "",
        grupo: "",
        url: ""
    })

    const [publicar, setPublicar] = useState({
        titulo: "",
        cuerpo: "",
        checkedItem: [],
        checkedResp: [],
        destinatario: "",
        date: date,
        date2: date2,
    })

    const [destinatarios, setDestinatarios] = useState([{ itemKey: '', itemDescription: '' }]);
    const [Users, setUsers]=useState([{itemResp:'', itemDescription:''}])

    //Obtener datos de firestore
    useEffect(() => {
        //DESTINATARIOS
        firestore()
            .collection('Grupo')
            .orderBy('nombre')
            .get()
            .then(querySnapshot => {
                let grupo
                let datosRamas = []
                for (let i = 0; i < querySnapshot.size; i++) {
                    grupo = querySnapshot.docs[i].data();
                    datosRamas.push({ itemKey: i, itemDescription: grupo.nombre });
                }
                setDestinatarios(datosRamas);
            });
    }, [])

    useEffect(() => {
        //DESTINATARIOS
        firestore()
            .collection('Usuario')
            .orderBy('nombres')
            .get()
            .then(querySnapshot => {
                let Usuario
                let datosUser = []
                for (let i = 0; i < querySnapshot.size; i++) {
                    Usuario = querySnapshot.docs[i].data();
                    datosUser.push({ itemResp: i, itemDescription: Usuario.nombres });
                }
                setUsers(datosUser);
            });
    }, [])


    const handleChangeText = (name, value) => {
        setPublicar({ ...publicar, [name]: value })
        //setState({ ...state, [name]: value })
    }


    const saveNewPublication = async () => {
        let error = true
        if (publicar.titulo === '' || publicar.cuerpo === '' || publicar.checkedItem.length === 0) {
            alert('Complete todos los campos')
        } else {
            var destina = '';
            publicar.checkedItem.map((itemCheck) => {
                destina = destina + itemCheck.itemDescription + ',';
            });
            var resp = '';
            publicar.checkedResp.map((itemResp) => {
                resp = resp + itemResp.itemDescription + ',';
            });
            await firestore().collection('Activity').add({
                id: user.uid,
                date: publicar.date,
                date2: publicar.date2,
                titulo: publicar.titulo,
                cuerpo: publicar.cuerpo,
                responsable: resp,
                destinatario: destina, //itemCheck.itemDescription,
                url: downloadURL || 'https://firebasestorage.googleapis.com/v0/b/centinela-8b7ed.appspot.com/o/PreRegister%2FImg_Predeterminada_Publicacion.png?alt=media&token=20c6f2a0-2e0c-4c5e-8bde-65cf9854e744',
            }).then(() => {
                error = false
            });

            //alert('Datos Guardados Correctamente')
        }
        if (!error) {

            Alert.alert(
                null,
                'Actividad creada correctamente',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Home')
                    },
                ],
                { cancelable: false },
            );
        }
    }

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
                    onPress={() => navigation.navigate('Home')}
                />

                }
                centerComponent={{ text: 'ACTIVIDADES', style: { color: '#fff' } }}

            />
            <ImageBackground source={require('../../../assets/imagenes/Login_Background_White.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={styles.titleText}>PUBLICAR ACTIVIDAD</Text>
                        <View style={styles.body}>
                            <View style={{ marginTop: 10 }}>
                                <View style={{ alignSelf: 'flex-start' }}>
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
                                {downloadURL && (
                                    <Image
                                        source={{ uri: imageLocal }}
                                        style={{ width: 255, height: 200, alignSelf: 'center', marginTop: 15, marginRight: 5 }}
                                    />

                                )}

                            </View>

                            <View style={styles.container}>
                                <Text style={{ padding: 10 }}>
                                    Seleccione La Fecha Inicial:
                            </Text>
                                <DatePicker
                                    style={styles.DatePickerStyle}
                                    date={date} // fecha inicial del state
                                    mode="date" //representacion de la fecha
                                    placeholder="Selecciona la Fecha"
                                    format="DD-MM-YYYY"
                                    minDate={date}
                                    maxDate="31-12-2025"
                                    confirmBtnText="Aceptar"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                        dateIcon: {

                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                                />

                            </View>

                            <View style={styles.container}>
                                <Text style={{ padding: 10 }}>
                                    Seleccione La Fecha Final:
                            </Text>
                                <DatePicker
                                    style={styles.DatePickerStyle}
                                    date={date2} // fecha final del state
                                    mode="date" //representacion de la fecha
                                    placeholder="Selecciona la Fecha Final"
                                    format="DD-MM-YYYY"
                                    minDate={date}
                                    maxDate="31-12-2025"
                                    confirmBtnText="Aceptar"
                                    cancelBtnText="Cancelar"
                                    customStyles={{
                                        dateIcon: {

                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                        },
                                    }}
                                    onDateChange={(date2) => {
                                        setDate2(date2);
                                    }}
                                />

                            </View>

                            <View style={{ padding: 10 }}>
                                <Text>Titulo</Text>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder='Titulo'
                                    onChangeText={(value) => handleChangeText("titulo", value)}
                                />
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>Destinatarios</Text>
                                <View style={styles.inputGroup}>
                                    <PickerCheckBox
                                        data={destinatarios}
                                        headerComponent={<Text style={{ fontSize: 20 }} >Destinatarios</Text>}
                                        OnConfirm={(pItems) => handleConfirm(pItems)}
                                        ConfirmButtonTitle='Ok'
                                        DescriptionField='itemDescription'
                                        KeyField='itemKey'
                                        placeholder='Seleccionar...'
                                        placeholderSelectedItems='$count selected item(s)'
                                    />
                                </View>
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>Usuarios</Text>
                                <View style={styles.inputGroup}>
                                    <PickerCheckBox
                                        data={Users}
                                        headerComponent={<Text style={{ fontSize: 20 }} >Usuarios</Text>}
                                        OnConfirm={(pItems) => handleConfirmResp(pItems)}
                                        ConfirmButtonTitle='Ok'
                                        DescriptionField='itemDescription'
                                        KeyField='itemResp'
                                        placeholder='Seleccionar...'
                                        placeholderSelectedItems='$count selected item(s)'
                                    /> 
                                </View>
                            </View>
                            <View style={{ padding: 10 }}>
                                <Text>Mensaje</Text>
                                <ScrollView>
                                    <TextInput
                                        style={styles.areaText}
                                        row={5}
                                        multiline={true}
                                        numberOfLines={8}
                                        maxLines={10}
                                        placeholder='Descripción del mensaje'
                                        onChangeText={(value) => handleChangeText("cuerpo", value)}
                                    />
                                </ScrollView>
                            </View>
                            <View style={{ padding: 10 }}>
                            <Button icon="paperclip" mode="contained" color={'#B10909'} onPress={() => navigation.navigate('UploadFileScreen')} style={{height:45, justifyContent: 'center', alignItems: 'center'}}>
                            Subir Adjunto
                            </Button>
                            </View>
                            
                            <View style={{ padding: 10 }}>
                                <Button icon="floppy" color="#fff" uppercase={false} style={styles.roundButton}
                                    onPress={() => saveNewPublication()}>Guardar</Button>
                            </View>
                            <View style={{ marginTop: 15 }}></View>
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
                                <View >
                                    <TouchableOpacity
                                        onPress={tomarFotoCamara}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconButton
                                            icon='camera'
                                        />
                                        <Subheading>Tomar foto</Subheading>
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
                                        <Subheading>Seleccionar de galería</Subheading>
                                    </TouchableOpacity>

                                </View>
                            </RBSheet>

                        </View>
                    </ScrollView  >
                </SafeAreaView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '85%',
        alignContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#e8e8e8',
        borderRadius: 8,
        borderWidth: 0.5
    },
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    inputGroup: {
        width: '100%',
        backgroundColor: 'white',
        height: 45,
    },
    areaText: {
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        textAlignVertical: 'top',
    },
    inputText: {
        height: 40,
        backgroundColor: '#fff'
    },
    titleText: {
        alignSelf: 'center',
        paddingBottom: 20,
        fontSize: 25,
        fontWeight: 'bold'
    },
    roundButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b31d1d',
    },
    pickerContainerStyle: {
        backgroundColor: '#b31d1d',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        
    },
})





