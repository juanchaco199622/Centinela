import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Subheading, List, Avatar, IconButton, Caption,  Button} from 'react-native-paper';
import * as RNLocalize from "react-native-localize";
import moment from 'moment';
import timezone from 'moment-timezone';
import Modal from 'react-native-modal';
import { color } from 'react-native-elements/dist/helpers';

const SCREEN_WIDTH = Dimensions.get('window').width;

const DeleteNotificationAsk = (props) => {
    const navigation = props.navigation;
    const timezoneActual = RNLocalize.getTimeZone();
    const [asks,setAsks] = useState([]);
    const [loading,setLoading] = useState(true);

   
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const leftSwipe = (progress, dragX) => {
        const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
        });
        return (
        <TouchableOpacity style={{marginTop:'4%'}} onPress={props.handleDelete} activeOpacity={0.6}>
            <View style={styles.deleteBox}>
            <Animated.Text style={{transform: [{scale: scale}]}}>
                <IconButton
                    icon='delete'
                    color={'#fff'}
                    size={30}
                />
            </Animated.Text>
            </View>
        </TouchableOpacity>
        );
    };
    return (

        
        <Swipeable renderLeftActions={leftSwipe}>
              
            <View style={styles.container}>
                
                <View style={{flexDirection:'row', justifyContent:'space-between', width:'80%'}}>
                    <View style={{flexDirection:'column', marginRight:'8%'}}>
                        {props.data.url == null ? (
                            <Avatar.Text {...props}
                                size={50}
                                color={'#FFFFFF'} 
                                label={'Actividad'.split(' ').map( item => props.data.title.charAt(0)).slice(0,2).join('')}
                                style={{width:75, height:75, borderRadius:100}}
                            />
                        ):(
                            <Image
                                source={{uri: props.data.url+"?height=600"}}
                                style={{width:75, height:75, borderRadius:100}}
                            />
                        )}
                        
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Subheading style={{fontFamily:'ProductSans-Bold'}}>{props.data.titulo}</Subheading>
                        <Text>{'Fin : ' + props.data.key}</Text>
                        {/**<Caption style={{ marginTop:'1%', marginBottom:'8%'}}>{timezone.tz(props.data.date, props.data.date2).tz(timezoneActual).fromNow()} </Caption>**/}
                        <View style={{flexDirection:'row',margin:5, padding:5}} >
                                <Text>{'Inicio : ' + props.data.date+'  |  '}</Text>
                                <Text>{'Fin : ' + props.data.date2}</Text> 
                        </View>
        
                        <View style={{flex: 1}}>
                            <Button  
                                mode='contained'
                                uppercase={false}
                                labelStyle={{fontSize:16}}
                                color={'#B10909'}  
                                onPress={toggleModal} 
                            >
                                Detalle
                            </Button>
                            <Modal isVisible={isModalVisible}>
                                <View style={{flex: 1}}>

                                    <Button 
                                        mode='contained'
                                        uppercase={false}
                                        labelStyle={{fontSize:16}}
                                        color={'#B10909'}  
                                        onPress={toggleModal}
                                    > 
                                        Cerrar
                                    </Button>
                                    <Text style={{fontFamily:'ProductSans-Bold', color:'white'}}>{' Título : ' +props.data.titulo}</Text>
                                    <Image
                                        style={{ width: '97%', height: 270, margin: 7, alignSelf: 'center', borderRadius: 20, resizeMode: 'stretch' }}
                                        source={{ uri: props.data.url }}>
                                    </Image>
                                </View>
                            </Modal>
                        </View>
                    </View>    
                </View>
            </View>
        </Swipeable>
    );
};

export default DeleteNotificationAsk;

const styles = StyleSheet.create({
  container: {
    height: '20%',
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    padding:'3%',
    paddingRight:'15%',
    flex:1,
    marginTop:'4%',
    backgroundColor: '#f9f9f9',  
    elevation:4,
    shadowOpacity:10, 
  },
  deleteBox: {
    backgroundColor: '#f00e0e',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});