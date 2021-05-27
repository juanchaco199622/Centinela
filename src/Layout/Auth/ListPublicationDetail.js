import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, Image, Alert, Pressable, style } from 'react-native';
//Modal,
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ListItem, Button, Icon, Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

import { State } from 'react-native-gesture-handler';
import PickerCheckBox from 'react-native-picker-checkbox';
import { ScrollView } from 'react-native';

export default function ListPublicationDetail({route,navigation}) {
    console.log(route.params.items.title)
    const publicacion=route.params.items;   

/*    const [publica, setpublic]= useState({
        id: '',
        title:'',
        url:'',
        cuerpo:''

            })

    const getUserById = async (id) =>{
        const dbref=firestore().collection('Publication').doc(id)
        const doc= await dbref.get();
        const doc= await dbref.get();
        const publicacion = doc.data();
        setpublic({
            ...publicacion,
            id: doc.id,
        })
       console.log(publicacion)
    }

    useEffect(() => {
        getUserById(props.route.params.itemID )
   })*/


    return(
        <ScrollView style={{flex:1}}>
            <Header
               containerStyle={{
                backgroundColor: '#b10909',
                justifyContent: 'space-around',
              }}
              //leftComponent={{ icon: 'reply', color: '#fff', }}
              leftComponent={<Icon 
                name= 'reply'
                iconStyle={{fontSize:27}}
                color='#fff'
                onPress={()=>navigation.navigate('ListPublications')}
                />

              }
              centerComponent={{ text: 'PUBLICACIONES', style: { color: '#fff' } }}

            />

            <Text style={styles.txtTitulo}
                selectable={true}
            >
                {publicacion.title}
            </Text>
            <Image 
            style={{width:'97%', height:270, margin:7, alignSelf:'center', borderRadius:20}}
            source={{uri: publicacion.url}}>
            </Image>
            
           
            <Text style={styles.txtCuerpo}
                selectable={true}
            >
                {publicacion.cuerpo}
            </Text>
            

        </ScrollView>



    );

    
    

}
const styles= StyleSheet.create({
    txtTitulo:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        color:'black',
        marginTop:8
    },
    imagen:{
        marginTop:8
    },
    txtCuerpo:{
        margin:8,
        textAlign:'auto',
        color:'black'

        
        
    }

})