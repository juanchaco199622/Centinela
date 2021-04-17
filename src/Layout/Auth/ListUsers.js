import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';

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

   return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <ListItem key={item.id} bottomDivider>
           
            <ListItem.Content>
            <ListItem.Title>{item.nombres+' ' + item.apellidos}</ListItem.Title>
            <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
            </ListItem.Content>
      </ListItem>
      )}
    />
  );
  
}

