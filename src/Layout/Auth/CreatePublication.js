import React, { useState, useRef , Text} from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native'
import {IconButton, Subheading, ProgressBar} from 'react-native-paper'
import { Icon, Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker'
import {imagePickerOptions} from '../../Utils';
import RBSheet from "react-native-raw-bottom-sheet";
import {useUploadImagePreRegister} from '../../Hooks'
 

export default function CreatePublication() {
    
    const [{ downloadURL, uploading, progress }, monitorUpload] = useUploadImagePreRegister();
    const [imageLocal, setImageLocal] = useState();
    const refRBSheet = useRef();
    const tomarFotoCamara = () =>{
        refRBSheet.current.close()
        ImagePicker.launchCamera(imagePickerOptions, response =>{
            const {didCancel, error } = response;
            if(didCancel){
                console.log('Cancelaste');
            }else{
                console.log(response)
                monitorUpload(response)
                
                setImageLocal(response.uri)
            }
        })
    }

    const mostrarfotoGalaria = () =>{
        refRBSheet.current.close()
        ImagePicker.launchImageLibrary(imagePickerOptions, response =>{
            const {didCancel, error } = response;
            if(didCancel){
                console.log('Cancelaste');
            }else{
                console.log(response)
                monitorUpload(response)
                setImageLocal(response.uri)
            }
        })
    }




    const user = auth().currentUser

    /*const reference = storage().ref('black-t-shirt-sm.png');*/
    //const reference = storage().ref('/test/black-t-shirt-sm.png');
    const destinatarios = [
        { key: '0', label: 'Selecciona una opcion', value: '' },
        { key: '1', label: 'Cachorro', value: 'cachorro' },
        { key: '2', label: 'Lobato', value: 'lobato' },
        { key: '3', label: 'Webelo', value: 'webelo' },
        { key: '4', label: 'Scout', value: 'scout' },
        { key: '5', label: 'Rover', value: 'rover' },
    ];


    const [state, setState] = useState({
        titulo: "",
        cuerpo: "",
        destinatario: ""
    })


    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const saveNewPublication =  () => {
        if (state.titulo === '' || state.cuerpo === '' || state.destinatario === '') {
            alert('Campos Vacios. Por favor digita la información para continuar')
        } else {
             firestore().collection('Publication').add({
                id: user.uid,
                titulo: state.titulo,
                cuerpo: state.cuerpo,
                destinatario: state.destinatario,
                url :downloadURL,
            })
            alert('Datos Guardados Correctamente')
        }
        // console.log(state)
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#F5FCFF', /**'#F5FCFF' */
        }
    })

    return (

        <View style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Titulo:'
                    onChangeText={(value) => handleChangeText("titulo", value)}
                />
            </View>
           
            <View style={styles.inputGroup}>
                <Picker selectedValue={state.destinatario} 
                    onValueChange={(itemValue) => handleChangeText("destinatario", itemValue)}>
                    {
                        destinatarios.map((v) => <Picker.Item key={v.key} label={v.label} value={v.value} />)
                    }

                </Picker>
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Cuerpo:'
                    onChangeText={(value) => handleChangeText("cuerpo", value)}
                />
            </View>
            <Image
                source = {{uri:imageLocal}}
                style={{width: 200, height: 200}}

            />
            <Button
                title='Añadir Archivo'
                theme={{ colors: { primary: '#8E0101' } }}
                icon={<Icon name='file-upload' color='#ffffff' />}
                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
                onPress={mostrarfotoGalaria} />

            {uploading && (
                <View>
                    <ProgressBar progress={progress} />
                    <Subheading>{parseInt(progress*100)+' %'}</Subheading>
                </View>
            )}
            {downloadURL && (
              <Button title='Publicar' onPress={() => saveNewPublication()}  ></Button>
            )}


            <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
               

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
                <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center', marginTop:'2%'}}>
                    <TouchableOpacity 
                        onPress={tomarFotoCamara}
                        style={{
                            flexDirection:'row', 
                            alignItems:'center', 
                            marginBottom:'2%'
                        }}>
                        <IconButton
                            icon='camera'
                            size={30}
                            color={'grey'}
                        />
                        <Subheading style={{fontFamily:'Montserrat-Medium'}}>Tomar foto</Subheading>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={mostrarfotoGalaria}
                        style={{
                            flexDirection:'row',  
                            alignItems:'center'
                        }}
                    >
                        <IconButton
                            icon='image-multiple'
                            size={30}
                            color={'grey'}

                        />
                        <Subheading style={{fontFamily:'Montserrat-Medium'}}>Seleccionar de galería</Subheading>
                    </TouchableOpacity>
                    
                </View>
            </RBSheet>
            
    
        </View >

    )
}
