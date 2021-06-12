import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator, FlatList, View, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem, Icon, Header } from 'react-native-elements';
import { Avatar, Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ListUsers({ navigation }) {
  //Declaracion de variable
  const user = auth().currentUser;
  const LeftContent = props => <Avatar.Icon {...props} icon="account-circle" />
  //------------------FUNCIONES
  //Declaracion de varables para traer del firebase
  const [users, setUsers] = useState({
    doc_id: "",
    nombres: "",
    apellidos: "",
    correo: "",
    rol: "",
    grupo: "",
    url: "",
    contador: 0,
  });
  //Funcion Para traer los datos de todos los usuarios
  useEffect(() => {
    const subscriber = firestore()
      .collection('Usuario')
      .orderBy('nombres')
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
        setUsers(users)
        //setLoading(false);
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  const renderAvatar = (image, iniciales) => {
    if (image === null || image === undefined) {
      const renderAvatarText = () => (
        <Avatar.Text style={{ alignSelf: 'center', backgroundColor: '#b31d1d', marginLeft: 10 }}
          size={60}
          label={iniciales}
        />
      );
      return renderAvatarText();
    } else {
      const renderAvatarImage = () => (
        <Avatar.Image style={{ alignSelf: 'center', marginLeft: 10 }}
          size={60}
          source={{
            uri: image || 'https://reactnativeelements.com//img/avatar/avatar--edit.jpg'
          }}
        />
      );
      return renderAvatarImage();
    }
  }
  //Contador
  const getTempRow = (t) => {
    if (t == 1) {
      users.contador = 2;
      return 1
    }
    else {
      users.contador = 1;
      return 2
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          containerStyle={{
            backgroundColor: '#b31d1d'
          }}
          leftComponent={<Icon
            name='keyboard-backspace'
            color='#fff'
            iconStyle={{ fontSize: 27 }}
            onPress={() => navigation.navigate('Home')}
          />
          }
          centerComponent={{ text: 'USUARIOS', style: { color: '#fff' } }}
        />
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.profileHeader}>
              <ListItem key={item.id} >
                <View
                  style={[
                    (getTempRow(users.contador) == 1) ? styles.colorback : styles.colorbackoriginal]}>

                  {renderAvatar(item.url, (item.nombres.charAt(0) + item.apellidos.charAt(0)))}
                  <ListItem.Content style={{ marginLeft: 15 }}>
                    <ListItem.Title>{item.nombres + ' ' + item.apellidos}</ListItem.Title>
                    <ListItem.Subtitle>{item.id_grupo}</ListItem.Subtitle>
                  </ListItem.Content>
                  <Icon
                    containerStyle={{ marginRight: 20 }}
                    name='pencil-square-o'
                    type='font-awesome'
                    onPress={() => navigation.navigate('EditProfile', { state: item, page: 'listUsers' })}
                  />
                </View>
              </ListItem>
            </View>
          )}
        >
        </FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  colorback: {
    height: 100,
    width: '100%',
    backgroundColor: '#dfdfdf',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorbackoriginal: {
    height: 68,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    width: '106%',
    margin: -8,
  }
});