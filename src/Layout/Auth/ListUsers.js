import React,{useEffect} from 'react'

import { View, Text } from 'react-native'
//import auth from '@react-native-firebase/auth'

export default function Exit() {


   /* const UsuariosCollection = firestore().collection('Usuario');*/

    /*useEffect(() => {
        Usuarios()
     },[]);*/

    /*const Usuarios = async () => {
        const response = await UsuariosCollection
        .onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(documentSnapshot => {
               list.push({
                  nombre: documentSnapshot.data().id
               });
            });
      
            setUsuarios(list);
        });
        return () => response();   
    }

    const [ todoAreas, setUsuarios ] = useState([]);*/


    return (
        <View>
            <Text>Hola </Text>
        </View>

    )
}