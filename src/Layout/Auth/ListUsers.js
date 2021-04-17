import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem , Avatar, Icon } from 'react-native-elements';
//import {Avatar} from 'react-native-paper'

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
          <View style={styles.profileHeader}>
            <ListItem key={item.id} >
                <Avatar rounded
                        source={{
                        uri: item.url,
                        }}
                        size={80}
                    />
                <ListItem.Content>
                    <ListItem.Title>{item.nombres+ ' ' + item.apellidos}</ListItem.Title>
                    <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name='page-last' />
          </ListItem>
      </View>
      )}
    />
  );
  
}
const styles = StyleSheet.create({
    
  });
