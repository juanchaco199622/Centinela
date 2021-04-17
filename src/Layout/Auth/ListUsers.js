import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ListUsers(){
//const ListUsers = props => {
    const [users, setUsers] = useState([]); 
   // const [users, setUsers] = useState(false)
   
   // useEffect(() =>{
   
    useEffect(() => {
        const subscriber = firestore()
          .collection('Usuario')
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            //setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);


        /*firestore().collection('Usuario').onSnapshot(querySnapshot =>{

            const users = [];

            querySnapshot.docs.forEach((doc) =>{

                const {nombres, apellidos, email,id_rol,id_grupo} = doc.data();
                    users.push({
                        id : doc.id,
                        nombres,
                        apellidos,
                        email,
                        id_rol,
                        id_grupo,
                    });
                setUsers(users)
                //console.log(doc.data())
            });
        })*/
   /* }, [])*/

   return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>User ID: {item.id}</Text>
          <Text>User Name: {item.nombres}</Text>
          <Text>User Apellidos: {item.apellidos}</Text>
        </View>
      )}
    />
  );
  
}

