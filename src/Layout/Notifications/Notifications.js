//import liraries
import React, { useEffect, useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Subheading,Surface} from 'react-native-paper';


// create a component
const Notifications = ({navigation}) => {
   
        return(
            <Surface style={styles.surface} >

                <View style={styles.containerSecundary}>
                    <Image
                        source={require('../../../assets/images/icons/2.png')}
                        style={styles.imageBackground}
                    />
                    <Subheading style={styles.textInfo}>
                        No tienes notificaciones por ver 
                    </Subheading>
                </View>
            </Surface>
        )
    
};

const styles = StyleSheet.create({
    surface:{
        width:'100%',
        height:'100%',
        backgroundColor: '#f9f9f9'
    },
    containerPrimary:{
        flex:1,
        backgroundColor: '#f9f9f9',
        textAlign:'center'
    },
    containerSecundary:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#f9f9f9',
        padding:'5%',
        textAlign:'center'
    },
    imageBackground:{
        width:250,
        height:250,
    },
    textInfo:{
        textAlign:'center',
        marginBottom:'10%',
        fontSize:20,
        fontFamily:'ProductSans-Bold',
       
    },
    containerNotification:{
        padding:'2%',
        margin:'3%',
        marginBottom:'1%',
        backgroundColor:'#fff',
        elevation:4,
        shadowOpacity:10,
        borderRadius:10
    },
    seperatorLine: {
        height: 1,
        backgroundColor: 'black',
      },
});

//make this component available to the app
export default Notifications;
