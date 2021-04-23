import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem, Icon, Header } from 'react-native-elements';
import {Avatar,Subheading} from 'react-native-paper'


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
    url :"",
    contador:0,
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
            <Avatar.Text style={{alignSelf: 'center', backgroundColor:'#b31d1d', marginLeft:10}}
            size={60} 
            label={iniciales}
            />
          );
          return renderAvatarText();
        }else{
          const renderAvatarImage = () => (
            <Avatar.Image style={{alignSelf: 'center', marginLeft:10}}
            size={60} 
            source={{
            uri: image || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
            }}
            />
          );
          return renderAvatarImage();
        }
      }

      
  getTempRow = (t) => {
    if(t==1){
      
      users.contador=2;
      return 1
    }
    else{
      users.contador=1;
      return 2
    }
  }

   return (
    <View>
      <Header style={{color:'#b10909'}}
          centerComponent={{ text: 'USUARIOS', style: { color: '#fff' } }}
          containerStyle={{
          backgroundColor: '#b10909',
          justifyContent: 'space-around',}}>
      </Header>

      <FlatList
      
        data={users}
        renderItem={({ item }) => (
            <View style={styles.profileHeader}>
              <ListItem key={item.id} >
                <View
                style={[
                  (getTempRow(users.contador)== 1) ? styles.colorback:styles.colorbackoriginal]}>

                    {renderAvatar(item.url, (item.nombres.charAt(0) + item.apellidos.charAt(0)))}
                    <ListItem.Content style={{marginLeft:15}}>
                        <ListItem.Title>{item.nombres+ ' ' + item.apellidos}</ListItem.Title>
                        <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
                    </ListItem.Content>
                  <Icon
                    containerStyle={{marginRight:20}}
                    name = 'pencil-square-o'
                    type='font-awesome'
                    onPress={()=>navigation.navigate('EditProfile',{state:item, page:'listUsers'})}
                  />
                </View>
            </ListItem>
            
        </View>
        )}
        >
        
        </FlatList>
      
      
    </View>
  );
  
}
const styles = StyleSheet.create({
    colorback:{
      height:100,
      width:'100%',
      backgroundColor:'#dfdfdf',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      
      
      
      
    },
    colorbackoriginal:{
      height:68,
      width:'100%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      
    },
    profileHeader:{
      width:'106%',
      margin:-8,
    }
  });
/*
  style={[
    (getTempRow(users.contador)== 1) ? styles.colorback:styles.colorbackoriginal]}
*/



/*
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet,ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem , Avatar, Icon, Header } from 'react-native-elements';
//import {Avatar} from 'react-native-paper'


export default function ListUsers(){
//const ListUsers = props => {
  
  const [users, setUsers] = useState({
    contador:0,
  }); 
  
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

  

  getTempRow = (t) => {
    if(t==1){
      
      users.contador=2;
      return 1
    }
    else{
      users.contador=1;
      return 2
    }
  }

    
   return (
     <View>
       <Header style={{color:'#b10909'}}
                centerComponent={{ text: 'USUARIOS', style: { color: '#fff' } }}
                containerStyle={{
                    backgroundColor: '#b10909',
                    justifyContent: 'space-around',}}
            />
      <FlatList
      
        data={users}
        renderItem={({ item }) => (
            <View style={styles.profileHeader}>
              <ListItem key={item.id}>
                <View
                  style={[
                    (getTempRow(users.contador)== 1) ? styles.colorback:styles.colorbackoriginal]}
                  >
                    <Avatar rounded
                            containerStyle={{marginLeft:10}}
                            source={{
                            uri: item.url,
                            }}
                            size={80}
                        />
                    <ListItem.Content style={{margin:10}}>
                        <ListItem.Title>{item.nombres+ ' ' + item.apellidos}</ListItem.Title>
                        <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
                    </ListItem.Content>
                  
                  <Icon
                  
                  icon = 'page-last'
                  
                  />
                </View>
              </ListItem>
        </View>
        )}
      />
    </View>
  );
  
};
*/