import React from 'react';
import { View, Text, Button } from 'react-native';
import { Avatar, Card, IconButton, Title, Paragraph, FAB, Portal, Provider } from 'react-native-paper';
//import auth from '@react-native-firebase/auth'

export default function Profile() {

   //const user = auth().signOut().then(() => console.log('User signed out!'))
    return (
        <View>
            <Text>Este es el perfil</Text>
    <Card.Title
    title="Lino Zamora"
    subtitle="Cachorro"
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
  />
   <Card>
    <Card.Content>
      <Title>Edad</Title>
      <Paragraph>12 años</Paragraph>
    </Card.Content>
  </Card>
  <Card>
    <Card.Content>
      <Title>Datos medicos</Title>
      <Paragraph>12 años</Paragraph>
    </Card.Content>
  </Card>
        </View>
    )
}