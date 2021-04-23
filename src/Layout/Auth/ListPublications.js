import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, Image, Alert, Pressable } from 'react-native';
//Modal,
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ListItem, Button, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

import { State } from 'react-native-gesture-handler';
import PickerCheckBox from 'react-native-picker-checkbox';
//Button, Card, Icon, Avatar

export default function ListPublications() {

  const user = auth().currentUser
  var checkedItem = [];
  const [publications, setPublications] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModaReenviarlVisible, setModalReenviarlVisible] = useState(false);
  const [selectedPost, setPost] = useState([]);

  const destinatarios = [
    { itemKey: 1, itemDescription: 'Cachorro' },
    { itemKey: 2, itemDescription: 'Lobato' },
    { itemKey: 3, itemDescription: 'Webelo' },
    { itemKey: 4, itemDescription: 'Scout' },
    { itemKey: 5, itemDescription: 'Rover' },
  ];


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModalReenviar = () => {
    setModalReenviarlVisible(!isModaReenviarlVisible);
  };


  const functionCombined = (item) => {
    toggleModal();
    setPost(item);
  };

  const functionCombinedResend = (items) => {
    //handleConfirm(items);
    reSendPost(items);

  };


  const deletePost = (answer) => {
    if (answer) {
      var dPost = 'Publication/' + selectedPost.key;
      firestore().doc(dPost).delete()
        .then(result => {
          //console.log('Successfully deleted document');
          toggleModal();
          selectedPost = [];
        })
        .catch(err => {
          console.log('Delete failed with: ', err);
        });
    }
  };

  const reSendPost = (items) => {
    if (items.length > 0) {
      var destina = '';
      items.map((item) => {
        destina = destina + item.itemDescription + ',';
      });
      firestore().collection('Publication').add({
        id: selectedPost.id,
        titulo: selectedPost.titulo,
        cuerpo: selectedPost.cuerpo,
        destinatario: destina,
        url: selectedPost.url,
      })
        .then(result => {
          toggleModalReenviar();
          toggleModal();
          Alert.alert('Publicación enviada correctamente')
          selectedPost = [];
        })
        .catch(err => {
          console.log('Delete failed with: ', err);
        });
    } else {
      toggleModalReenviar();
    }
  };

  const alertAction = (action) => {
    if (action === 1) {
      Alert.alert('Eliminar Post', '¿Esta seguro que desea eliminar el post?', [
        {
          text: "Cancelar",
          onPress: () => deletePost(false),
          style: "cancel"
        },
        { text: "OK", onPress: () => deletePost(true) }
      ])
    } else if (action === 2) {
      toggleModalReenviar();
    }
  };

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

    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={styles.modalText}>Acciones</Text>

            <Button
              title='Eliminar'
              theme={{ colors: { primary: '#FB2C00' } }}
              icon={<Icon name='delete' color='#ffffff' />}
              buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
              onPress={() => alertAction(1)} />
            <Button
              title='Reenviar'
              theme={{ colors: { primary: '#0C3473' } }}
              icon={<Icon name='send' color='#ffffff' />}
              buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 10 }}
              onPress={() => alertAction(2)} />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal} >
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal isVisible={isModaReenviarlVisible}>
        <View style={styles.centeredView2}>
          <View style={styles.modalView2}>


            <PickerCheckBox
              data={destinatarios}

              headerComponent={<Text style={{ fontSize: 25 }} >Destinatarios</Text>}
              OnConfirm={(pItems) => functionCombinedResend(pItems)}
              ConfirmButtonTitle='OK'
              DescriptionField='itemDescription'
              KeyField='itemKey'
              placeholder='Destinatarios'
              arrowColor='#000000'
              arrowSize={10}
              placeholderSelectedItems='$count selected item(s)'

            />

          </View>
        </View>
      </Modal>

      <FlatList
        data={publications}
        renderItem={({ item }) => (
          <Card>
            <CardAction
              separator={true}
              inColumn={false}>
              <CardTitle
                title={item.titulo}
              />

              <Button
                theme={{ colors: { primary: '#ffffff' } }}
                icon={<Icon name='more-vert' color='#8E0101' />}
                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                onPress={() => functionCombined(item)} />


            </CardAction>
            <CardImage
              source={{ uri: item.url }}
            //source={{ uri: 'http://placehold.it/480x270' }}
            />

            <CardContent text={item.cuerpo} />
            <CardAction
              separator={true}
              inColumn={false}>
              <CardButton
                onPress={() => { }}
                title="ver mas..."
                color="#8E0101"
              />
            </CardAction>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    color: 'black',
    fontWeight: "bold",
    marginTop: 22
  },
  modalView: {
    //margin: 50,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 100,
    paddingBottom: 20,
    paddingTop: 30,
    alignItems: "center",
    /*shadowColor: "#FB2C00",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5*/
  },
  modalView2: {
    //margin: 50,
    color: "black",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 90,
    paddingBottom: 20,
    paddingTop: 30,

    /*shadowColor: "#FB2C00",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5*/
  },
  button: {
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    elevation: 2
  },
  buttonOption: {
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#FB2C00",
  },
  buttonClose: {
    backgroundColor: "#FB2C00",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle2: {
    color: "black"

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  }

});