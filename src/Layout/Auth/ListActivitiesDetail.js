
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View, Text, Image, Alert, Pressable, style, Linking } from 'react-native';
//Modal,
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ListItem, Button, Icon, Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'

import { State } from 'react-native-gesture-handler';
import PickerCheckBox from 'react-native-picker-checkbox';
import { ScrollView } from 'react-native';
import storage from "@react-native-firebase/storage";
import moment from 'moment'
import 'moment/locale/es'

export default function ListActivitiesDetail({ route, navigation }) {
    console.log(route.params.items.dest)
    const activity = route.params.items;
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', }
    //LO NUEVO PARA LISTAR
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listFilesAndDirectories("");
    }, []);

    const listFilesAndDirectories = (pageToken) => {
        const reference = storage().ref("files");
        reference.list({ pageToken }).then((result) => {
            result.items.forEach((ref) => {
                console.log("ref  ->>  ", JSON.stringify(ref));
            });

            if (result.nextPageToken) {
                return listFilesAndDirectories(
                    reference,
                    result.nextPageToken
                );
            }
            setListData(result.items);
            setLoading(false);
        });
    };

    const ItemView = ({ item }) => {
        return (
            // FlatList Item
            <View style={{ padding: 10 }}>
                <Text
                    style={styles.item}
                    onPress={() => getItem(item.fullPath)}
                >
                    Adjunto: {item.name}
                </Text>
                <Text style={{ color: "red" }}>
                    Abrir en el navegador
                </Text>
            </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // FlatList Item Separator
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#C8C8C8",
                }}
            />
        );
    };

    const getItem = async (fullPath) => {
        const url = await storage()
            .ref(fullPath)
            .getDownloadURL()
            .catch((e) => {
                console.error(e);
            });
        Linking.openURL(url);
        console.log(url);
    };

    //
    return (
        <ScrollView style={{ flex: 1 }}>
            <Header
                containerStyle={{
                    backgroundColor: '#b10909',
                    justifyContent: 'space-around',
                }}
                //leftComponent={{ icon: 'reply', color: '#fff', }}
                leftComponent={<Icon
                    name='keyboard-backspace'
                    iconStyle={{ fontSize: 27 }}
                    color='#fff'
                    onPress={() => navigation.navigate('ListActivities')}
                />

                }
                centerComponent={{ text: 'ACTIVIDADES', style: { color: '#fff' } }}

            />

            <Text style={styles.txtTitulo}
                selectable={true}
            >
                {activity.title}
            </Text>
            <Image
                style={{ width: '97%', height: 270, margin: 7, alignSelf: 'center', borderRadius: 20, resizeMode: 'stretch' }}
                source={{ uri: activity.url }}>
            </Image>

            <Text style={{ paddingLeft: 15 }}>

                { 'Fecha Inicial: ' + (activity.date)} 
                
                </Text>
            <Text style={{ paddingLeft: 15 }}>

                {'Fecha Final: ' + (activity.date2)}
            </Text>
            <Text style={{ paddingLeft: 15 }}>
                {'Destinatarios: [' + activity.dest.split(',').join("] [").slice(0, -1)}

            </Text>

            <Text style={{ paddingLeft: 15 }}>
                {activity.resp === "" ? '' : 'Responsables: [' + activity.resp.split(',').join("] [").slice(0, -1)}
            </Text>


            <Text style={styles.txtCuerpo}
                selectable={true}
            >
                {activity.cuerpo}
            </Text>
            <Text style={styles.titleText}>
                Adjuntos
            </Text>
            {loading ? (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={listData}
                    //data defined in constructor
                    ItemSeparatorComponent={ItemSeparatorView}
                    //Item Separator View
                    renderItem={ItemView}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}

        </ScrollView>



    );




}
const styles = StyleSheet.create({
    txtTitulo: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8
    },
    imagen: {
        marginTop: 8
    },
    txtCuerpo: {
        margin: 8,
        textAlign: 'auto',
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20,
      },
      footerHeading: {
        fontSize: 18,
        textAlign: "center",
        color: "grey",
      },
      footerText: {
        fontSize: 16,
        textAlign: "center",
        color: "grey",
      },

})