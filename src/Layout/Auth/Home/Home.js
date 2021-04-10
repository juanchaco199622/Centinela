import React ,{ useEffect, useState} from 'react'
import auth from '@react-native-firebase/auth'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet, View} from 'react-native';

export default function Home() {

    const user = auth().currentUser
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

    return (
        <View>
            
            <Card>
                <Card.Title title={user.email} subtitle="admin" left={LeftContent} />
            </Card>

            <View style={styles.containerLogin} >

                <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="account-circle" mode="contained" color={'#6c757d'} onPress={() => console.log('Pressed')}>
                    Crear usuarios
                    </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="account-group" mode="contained" color={'#6c757d'} onPress={() => console.log('Pressed')}>
                    Listar usuarios
                    </Button>
                </Card.Content>

                <Card.Content style={styles.containerButtonLogin} >
                    <Button icon="align-horizontal-left" mode="contained" color={'#6c757d'} onPress={() => console.log('Pressed')}>
                     Crear Ramas
                    </Button>
                </Card.Content>

            </View>


        </View>
    )
}

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
    containerLogin:{
      margin:'4%',
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
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
      justifyContent:'space-between'
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