import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Subheading, List, Avatar, IconButton, Caption,  Button} from 'react-native-paper';
import * as RNLocalize from "react-native-localize";
import moment from 'moment';
import timezone from 'moment-timezone';
import firestore from '@react-native-firebase/firestore';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DetailNotifications = (props) => {

    /*const [state, setState] = useState({
        doc_id: "",
        nombres: "",
        apellidos: "",
        correo: "",
        id_rol: "",
        grupo: "",
        url: ""
      });

      useEffect(() => {
        firestore()
        .collection('Activity')
       .doc(props.data.key)
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
        //Notificaciones();
    }, [isFocused]);*/

   
    return (
        <Swipeable renderLeftActions={leftSwipe}>
            <View style={styles.container}>
                
            </View>
        </Swipeable>
    );
};

export default DetailNotifications;

const styles = StyleSheet.create({
  container: {
    height: '20%',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    padding:'3%',
    paddingRight:'15%',
    flex:1,
    marginTop:'4%',
    backgroundColor: '#f9f9f9',  
    elevation:4,
    shadowOpacity:10, 
  },
  deleteBox: {
    backgroundColor: '#f00e0e',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});