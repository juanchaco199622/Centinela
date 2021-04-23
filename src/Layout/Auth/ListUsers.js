import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem, Icon } from 'react-native-elements';
import {Avatar} from 'react-native-paper'

export default function ListUsers(){
//const ListUsers = props => {
    const [users, setUsers] = useState([]); 
   // const [users, setUsers] = useState(false)
   
  
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

      const renderAvatar = (image, iniciales) =>{
        console.log(image)
        if(image===null || image===undefined){
          const renderAvatarText = () => (
            <Avatar.Text style={{alignSelf: 'center', backgroundColor:'#b31d1d'}}
            size={60} 
            label={iniciales}
            />
          );
          return renderAvatarText();
        }else{
          const renderAvatarImage = () => (
            <Avatar.Image style={{alignSelf: 'center'}}
            size={60} 
            source={{
            uri: image || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
            }}
            />
          );
          return renderAvatarImage();
        }
      }

   return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
          <View style={styles.profileHeader}>
            <ListItem key={item.id} >
                  {renderAvatar(item.url, (item.nombres.charAt(0) + item.apellidos.charAt(0)))}
                <ListItem.Content>
                    <ListItem.Title>{item.nombres+ ' ' + item.apellidos}</ListItem.Title>
                    <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
                </ListItem.Content>
               <Icon
               
               icon = 'page-last'
               
               />
                
          </ListItem>
      </View>
      )}
    />
  );
  
}
const styles = StyleSheet.create({
    
  });
