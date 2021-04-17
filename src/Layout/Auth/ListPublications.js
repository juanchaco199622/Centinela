import React,{useEffect, useState} from 'react'
import { ActivityIndicator, FlatList, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem , Avatar} from 'react-native-elements';

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
                  <View style={styles.profileHeader}>
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
              </View>
              )}
            />
          );
          
        }
        const styles = StyleSheet.create({
            
          });
        