import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import { BackgroundImage } from 'react-native-elements/dist/config';

class Splash extends Component {

  componentDidMount() {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'AppTabsScreen' : 'AuthStackScreen');
      });
    }, 1500);
  }

  /*componentWillUnmount() {
    auth().onAuthStateChanged((user));
  }*/

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage source={require('../../../assets/imagenes/Login_Background.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>
          <View style={styles.containerInside}>
            <View>
              <Image source={require('../../../assets/imagenes/Scout_Logo.png')} style={styles.imageUp}/>
            </View>
          
          <View style={{flexDirection:'column', alignContent:'flex-end'}}>
            <Text style={styles.colorVersion}>Version</Text>
            <Text style={styles.colorVersion}>1.1.20210406-1</Text>
          </View>
          </View>
          
        </BackgroundImage>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection:'column',
    /*resizeMode: 'cover'
    ,
    backgroundColor: '#00af91'*/
  },
  containerInside:{
    flex: 6,
    justifyContent: 'center',
    alignItems:'center',
  },
  imageUp:{
    alignContent:'center'
  },
  colorVersion:{
    color:'#FFFFFF',
    fontFamily:'ProductSans-Bold',
    textAlign: 'center'
  }
});

export default Splash;