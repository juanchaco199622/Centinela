import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements';


//import auth from '@react-native-firebase/auth'

export default function ListPublications() {

  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Publication')
      .onSnapshot(querySnapshot => {
        const publications = [];

        querySnapshot.forEach(documentSnapshot => {
          publications.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setPublications(publications);
        //setLoading(false);
      });
    return () => subscriber();
  }, []);

  return (

    <FlatList
      data={publications}
      renderItem={({ item }) => (
        <Card>
          <Card.Title>{item.titulo}</Card.Title>
          <Card.Divider />
          <Card.Image source={require('../../Images/52415928_303.jpg')}></Card.Image>
          

          <Text style={{ marginBottom: 10 }}>
            {item.cuerpo}
          </Text>
          <Button
            title='Ver Archivo'
            theme={{ colors: { primary: '#8E0101' } }}
            icon={<Icon name='insert-drive-file' color='#ffffff' />}
            buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            onPress={() => Alert.alert('Simple Button pressed')}
          />

        </Card>
      )}
    />


  );

}
const styles = StyleSheet.create({});

/*<View style={styles.profileHeader}>
  <ListItem key={item.id} bottomDivider>
    <Avatar rounded
      source={{
        uri: item.url,
      }}
      size={100}
    />
    <ListItem.Content>
      <ListItem.Title>{item.titulo}</ListItem.Title>
      <ListItem.Subtitle>{item.cuerpo}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
</View>*/
