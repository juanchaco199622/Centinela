import React, { useState, useRef } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image, Text, ImageBackground, Alert } from 'react-native'
import { IconButton, Subheading, ProgressBar, Card, Avatar } from 'react-native-paper'
import { Button, Header } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker'
import { imagePickerOptions } from '../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import { useUploadImagePreRegister } from '../../Hooks'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import PickerCheckBox from 'react-native-picker-checkbox';


export default function CreatePublication({navigation}) {

    //Declaracion de variables
    const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImagePreRegister();
    //const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
    const [imageLocal, setImageLocal] = useState();
    //const [checkedItem, setICheckedItem] = useState();
    const refRBSheet = useRef();
    const tomarFotoCamara = () => {
        refRBSheet.current.close()
        ImagePicker.launchCamera(imagePickerOptions, response => {
            const { didCancel, error } = response;
            if (didCancel) {
                console.log('Cancelaste');
            } else {
                console.log(response)
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
                console.log('Cancelaste');
            } else {
                console.log(response)
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

    const destinatarios = [
        { itemKey: 1, itemDescription: 'Cachorro' },
        { itemKey: 2, itemDescription: 'Lobato' },
        { itemKey: 3, itemDescription: 'Webelo' },
        { itemKey: 4, itemDescription: 'Scout' },
        { itemKey: 5, itemDescription: 'Rover' },
    ];

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
        destinatario: "",

    })


    //Obtener datos de firestore
   /* firestore()
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
                url: usuario.url
            });
        });
    const renderAvatar = () => {
        if (state.url === null) {
            const renderAvatarText = () => (
                <Avatar.Text style={{ alignSelf: 'center', backgroundColor: '#EEEEEE' }}
                    size={20}
                    label={state.nombres.charAt(0) + state.apellidos.charAt(0)}
                />
            );
            return renderAvatarText();
        } else {
            const renderAvatarImage = () => (
                <Avatar.Image style={{ alignSelf: 'center' }}
                    size={20}
                    source={{
                        uri: state.url || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
                    }}
                />
            );
            return renderAvatarImage();
        }
    }*/

    const handleChangeText = (name, value) => {
        setPublicar({ ...publicar, [name]: value })
        //setState({ ...state, [name]: value })
    }

    const saveNewPublication = async () => {
        console.log(publicar.checkedItem);
        let error = true
        if (publicar.titulo === '' || publicar.cuerpo === '' || publicar.checkedItem.length === 0) {
            alert('Campos Vacios. Por favor digita la información para continuar')
        } else {
            var destina = '';
            publicar.checkedItem.map((itemCheck) => {
                destina = destina + itemCheck.itemDescription + ',';
            });

            await firestore().collection('Publication').add({
                id: user.uid,
                titulo: publicar.titulo,
                cuerpo: publicar.cuerpo,
                destinatario: destina, //itemCheck.itemDescription,
                url: downloadURL,
            }).then(() => {
                error = false
              });
            
            //alert('Datos Guardados Correctamente')
        }
        if(!error){

            Alert.alert(
                null,
                'Datos Guardados Correctamente',
                [
                  {
                    text: 'OK', 
                    onPress: () => navigation.navigate('home')
                  },
                ],
                {cancelable: false},
              );
        }
    }

    return (
        <View>

            {/* Header */}
            {/**<Card style={{ backgroundColor: "#B10909" }}>
                <Card.Title title={state.nombres} subtitle={state.rol} left={LeftContent} titleStyle={{ color: "#EEEEEE" }} subtitleStyle={{ color: "#EEEEEE" }} />
            </Card>**/}

            <ScrollView style={styles.container}>

                <ImageBackground source={require('../../../assets/imagenes/Login_Background_White.png')} style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center' }}>

                    {/* <Header style={{ color: '#b10909' }}
                centerComponent={{ text: 'PUBLICACIONES', style: { color: '#fff' } }}
                containerStyle={{
                    backgroundColor: '#b10909',
                    justifyContent: 'space-around',
                }}
            /> */}

                    <View style={styles.Pheader}></View>

                    <View style={styles.Pbody}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.TextGroup}>Imagen:</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Button title='Subir Imagen'
                                    buttonStyle={{ height: 30, width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => refRBSheet.current.open()} />
                            </View>
                            {downloadURL && (
                                <Image
                                    source={{ uri: imageLocal }}
                                    style={{ width: 255, height: 200, alignSelf: 'center', marginTop: 15, marginRight: 5 }}
                                />

                            )}

                        </View>

                        <View >
                            <Text style={styles.TextGroup}>Titulo:</Text>
                            <TextInput
                                style={styles.inputGroup}
                                placeholder='Titulo:'
                                onChangeText={(value) => handleChangeText("titulo", value)}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <PickerCheckBox
                                data={destinatarios}
                                headerComponent={<Text style={{ fontSize: 25 }} >Destinatarios</Text>}
                                OnConfirm={(pItems) => handleConfirm(pItems)}
                                ConfirmButtonTitle='OK'
                                DescriptionField='itemDescription'
                                KeyField='itemKey'
                                placeholder='seleccionar destinatario'
                                arrowColor='#949494F'
                                arrowSize={35}
                                placeholderSelectedItems='$count selected item(s)'

                            />
                        </View>
                        <Text style={styles.TextGroup}>Cuerpo:</Text>
                        <View>

                            <TextInput
                                style={styles.inputGroup}
                                multiline
                                numberOfLines={8}
                                placeholder='Cuerpo:'
                                onChangeText={(value) => handleChangeText("cuerpo", value)}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}></View>



                        {downloadURL && (
                            <Button title='Publicar'
                                buttonStyle={{ marginTop: 15, width: '70%', alignSelf: 'center', borderRadius: 15 }}
                                onPress={() => saveNewPublication()}  ></Button>)}

                        {uploading && (
                            <View>
                                <ProgressBar progress={progress} />
                                <Subheading>{parseInt(progress * 100) + ' %'}</Subheading>
                            </View>
                        )}

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
                                        size={30}
                                        color={'grey'}
                                    />
                                    <Subheading style={{ fontFamily: 'Montserrat-Medium' }}>Tomar foto</Subheading>
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
                                        size={30}
                                        color={'grey'}

                                    />
                                    <Subheading style={{ fontFamily: 'Montserrat-Medium' }}>Seleccionar de galería</Subheading>
                                </TouchableOpacity>

                            </View>
                        </RBSheet>

                    </View>
                    <Subheading style={{ height: 50, backgroundColor: '#b10909', flex: 1, justifyContent: 'space-between' }}></Subheading>
                </ImageBackground>
            </ScrollView  >
        </View>
    )
}

const styles = StyleSheet.create({
    Pheader: {
        backgroundColor: '#b10909'
    },
    Pbody: {
        width: '85%',
        height: 750,
        alignContent: 'center',
        //justifyContent:'center',
        alignSelf: 'center',
        backgroundColor: '#DFDFDF',

    },
    container: {
        backgroundColor: 'white', /**'#F5FCFF' */

    },

    inputGroup: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: 10,
        alignSelf: 'center',
        textAlignVertical: 'top',
    },
    TextGroup: {
        width: '90%',
        marginTop: 10,
        alignSelf: 'center',
    }
})
