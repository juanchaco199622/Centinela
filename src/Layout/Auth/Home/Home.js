import React ,{ useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import {firestore} from '@react-native-firebase/firestore';

export default function Home() {

    const user = auth().currentUser
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  /*  const [ todoUsuarios, setTodoUsuarios ] = useState([]);

    const usersCollection = firestore().collection('Users');

    useEffect(() => {
        Users()
     },[]);
    
    const Users = async () => {
        const response = await usersCollection
        .onSnapshot(querySnapshot => {
            const list = [];
            querySnapshot.forEach(documentSnapshot => {
               list.push({
                  id: documentSnapshot.data().id,
                  rol: documentSnapshot.data().rol
               });
            });
      
            setTodoUsuarios(list);
        });
        return () => response();   
    }*/

    

   /* If (todoAreas.map(x=> (x.rol)) == "admin"){
        return(
        Código.......
        )
        }*/

    return (
        <View>
            
            <Card>
                <Card.Title title={user.email} subtitle="admin" left={LeftContent} />
            </Card>
            <Button icon="account-circle" mode="contained" onPress={() => console.log('Pressed')}>
                Press me {user.uid}
            </Button>
        </View>
    )
}