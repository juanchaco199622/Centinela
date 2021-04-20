import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text, Alert } from 'react-native'
import { Icon, Button } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import { List, Checkbox } from 'react-native-paper';
import { utils } from '@react-native-firebase/app';
import { Storage } from '@react-native-firebase/storage';



export default function CreatePublication() {
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

    const saveNewPublication = async () => {
        if (state.titulo === '' || state.cuerpo === '' || state.destinatario === '') {
            alert('Campos Vacios. Por favor digita la información para continuar')
        } else {
            await firestore().collection('Publication').add({
                id: user.uid,
                titulo: state.titulo,
                cuerpo: state.cuerpo,
                destinatario: state.destinatario,
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
            <Button
                title='Añadir Archivo'
                theme={{ colors: { primary: '#8E0101' } }}
                icon={<Icon name='file-upload' color='#ffffff' />}
                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
                onPress={() => Alert.alert('ouuukkk2')} />

            <Button title='Publicar' onPress={() => saveNewPublication()}  ></Button>
        </View >

    )
}


/*destinatarios.map((v) => {
    return <Picker.Item testID={v.key} label={v.label} value={v.value} />
})*/
//onPress={() => Alert.alert('Simple Button pressed')}
//<View style={styles.inputGroup}>
//<RNPickerSelect
///onValueChange={(value) => console.log(value)}
//items={[
//    {label: 'Cachorros', value: 'cachorro'},
//    {label: 'Lobatos', value: 'lobato'},
//    {label: 'Webelos', value: 'Webelo'},
//    {label: 'Scouts', value: 'Scout'},
//    {label: 'Rovers', value: 'Rover'},
//]}
//></RNPickerSelect>
//</View>

/*{[
    { label: 'Cachorro', value: 'cachorro' },
    { label: 'Lobato', value: 'lobato' },
    { label: 'Webelo', value: 'Webelo' },
    { label: 'Scout', value: 'Scout' },
    { label: 'Rover', value: 'Rover' },
]}*/