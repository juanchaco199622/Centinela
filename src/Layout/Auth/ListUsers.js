import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem, Icon } from 'react-native-elements';
import {Avatar} from 'react-native-paper'

export default function ListUsers({navigation}){
//const ListUsers = props => {
    //const [users, setUsers] = useState(); 
  const [users, setUsers] = useState({
    doc_id: "",
    nombres : "",
    apellidos : "",
    correo: "",
    id_rol :"",
    grupo :"",
    url :""
  });
   
  
    useEffect(() => {
        const subscriber = firestore()
          .collection('Usuario')
          .onSnapshot(querySnapshot => {
            const users = [];
            let i = 0;
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                doc_id: querySnapshot.docs[i].id
              });
              i++;
            });
            setUsers(users);
            //setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);

      const renderAvatar = (image, iniciales) =>{
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
                name = 'pencil-square-o'
                type='font-awesome'
                onPress={()=>navigation.navigate('EditProfile',{state:item, page:'listUsers'})}
               />
          </ListItem>
      </View>
      )}
    />
  );
  
}
const styles = StyleSheet.create({
    
  });
