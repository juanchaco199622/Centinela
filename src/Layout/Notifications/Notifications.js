//import liraries
import React, { useEffect, useState} from 'react';
import { View, StyleSheet, FlatList, Image, LogBox, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import { Subheading,Surface, ActivityIndicator} from 'react-native-paper';
//import moment from 'moment'
import * as RNLocalize from "react-native-localize";
import DeleteNotification from '../../Components/Notifications/DeleteNotification';
import { useIsFocused } from '@react-navigation/native'

// create a component
const Notifications = ({navigation}) => {
    const isFocused = useIsFocused()
   /* var idLocale = require('moment/locale/es'); 
    moment.locale('es', idLocale)*/
    const user = auth().currentUser;
    const [state, setState] = useState({
        doc_id: "",
        nombres : "",
        apellidos : "",
        correo: "",
        id_rol :"",
        grupo :"",
        url :""
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
          nombres:usuario.nombres, 
          apellidos:usuario.apellidos,
          correo:usuario.email,
          rol:usuario.id_rol,
          grupo:usuario.id_grupo,
          url:usuario.url,
        });
      });
    },[isFocused]);

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = React.useState(false);
   
    const notificationsReq = firestore().collection('Usuario').doc().collection('NotificationsUser').orderBy('date', 'desc')

    useEffect(() => {
        notificationsRequest()
        LogBox.ignoreAllLogs()
        return () => {
            //foregroundSubscriber();
            //backgroundSubscriber();
        };
    }, [])
    
    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
  
    const notificationsRequest = async () => {
        notificationsReq.get()
        .then(response => {
        const fetchedNotifications = [];
        response.forEach(document => {
            const fetchedNotification = {
            id: document.id,
            ...document.data()
            };
            fetchedNotifications.push(fetchedNotification);
        });
        setTodos(fetchedNotifications);
        console.log(fetchedNotifications)
        setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setError(error);
        });
    }
  

   /*     
    const foregroundSubscriber = messaging().onMessage(
        async (remoteMessage) => {
            console.log('Notificacion recibida', remoteMessage)
        }
    );
    
    
    const backgroundSubscriber = messaging().setBackgroundMessageHandler(
        async (remoteMessage) => {
            console.log('En background', remoteMessage);
        },
    );*/
     
    if(loading){
        return(
            <View style={{flex:1, justifyContent:'center'}} >
                <ActivityIndicator  animating={true} size={50} />
            </View>
        )
    }

    const deleteItem = (index, id) => {
        const arr = [...todos];
        arr.splice(index, 1);
        firestore().collection('Usuario')
        .doc(auth().currentUser.uid)
        .collection('NotificationsUser')
        .doc(id)
        .delete()
        .then(
            setTodos(arr)
        )
    };
   
       /* return(
            <Surface style={styles.surface} >

                <View style={styles.containerSecundary}>
                    <Image
                        source={require('../../../assets/images/icons/2.png')}
                        style={styles.imageBackground}
                    />
                    <Subheading style={styles.textInfo}>
                        No tienes notificaciones por ver 
                    </Subheading>
                </View>
            </Surface>
        )*/

        if(todos != ''){
            return (
                <Surface style={styles.surface}>
                    <ImageBackground source={{uri:'https://firebasestorage.googleapis.com/v0/b/resolvemos-ya.appspot.com/o/Wallpapers%2Fnotifications.png?alt=media&token=b892a0f3-6729-4d96-bf16-3f6547a942e1'}} style={styles.containerPrimary}>
                        <FlatList
                            data={todos}
                            renderItem={({item, index}) => {
                                return <DeleteNotification data={item} handleDelete={() => deleteItem(index, item.id)}/> 
                            }}
                            
                        />
                    </ImageBackground>
                </Surface>
            );
        }else{
            return(
                <Surface style={styles.surface} >
    
                    <View style={styles.containerSecundary}>
                        <Image
                            source={require('../../../assets/images/icons/2.png')}
                            style={styles.imageBackground}
                        />
                        <Subheading style={styles.textInfo}>
                            No tienes notificaciones por ver 
                        </Subheading>
                    </View>
                </Surface>
            )
        }
    };
    

const styles = StyleSheet.create({
    surface:{
        width:'100%',
        height:'100%',
        backgroundColor: '#f9f9f9'
    },
    containerPrimary:{
        flex:1,
        backgroundColor: '#f9f9f9',
        textAlign:'center'
    },
    containerSecundary:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f9f9f9',
        padding:'5%',
        textAlign:'center'
    },
    imageBackground:{
        width:250,
        height:250,
    },
    textInfo:{
        textAlign:'center',
        marginBottom:'10%',
        fontSize:20,
        fontFamily:'ProductSans-Bold',
       
    },
    containerNotification:{
        padding:'2%',
        margin:'3%',
        marginBottom:'1%',
        backgroundColor:'#fff',
        elevation:4,
        shadowOpacity:10,
        borderRadius:10
    },
    seperatorLine: {
        height: 1,
        backgroundColor: 'black',
      },
});

//make this component available to the app
export default Notifications;
