import React, {Component} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

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
        <View>
          <Image source={require('../../../assets/imagenes/flor.png')} style={styles.imageUp}/>
        </View>
        <View style={{flexDirection:'column', alignContent:'flex-end'}}>
          <Text style={styles.colorVersion}>1.1.20210406-1</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00af91'
  },
  imageUp:{
    width: 200,
    height: 200
  },
  colorVersion:{
    color:'#FFFFFF',
    fontFamily:'ProductSans-Bold'
  }
});

export default Splash;