import React from 'react';
import { View, Text, Button } from 'react-native';
import { Card, IconButton, Title, Paragraph, FAB, Portal, Provider } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { Avatar } from 'react-native-elements';

export default function Profile() {

  const user = auth().currentUser
    return (
        <View>

            <Card>
             <Avatar
                rounded
                source={{
                  uri:
                    'https://reactnativeelements.com//img/avatar/avatar--edit.jpg',
                }}
                size={100}
              />
               <Card.Content>
                <Title>Email</Title>
                <Paragraph>{user.email}</Paragraph>
                <Paragraph>{user.email}</Paragraph>
              </Card.Content>
            
              <Card.Content>
                <Title>Edad</Title>
                <Paragraph>24 años</Paragraph>
              </Card.Content>

            </Card>
            <Card>
              <Card.Content>
                <Title>Datos medicos</Title>
                <Paragraph>N/A</Paragraph>
              </Card.Content>
            </Card>
        </View>
    )
}