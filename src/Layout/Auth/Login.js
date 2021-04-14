import React, { useState, useContext  } from 'react';
import { TextInput, Surface, Button, Headline, Text, Subheading} from 'react-native-paper';
import { StyleSheet, View, ScrollView, Alert, Image, ImageBackground} from 'react-native';
import {Font} from 'expo-font';
import auth from '@react-native-firebase/auth'


function Login({navigation}){

  //const { login, facebookLogin } = useContext(AuthContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState('');
  const [ isSecureEntry, setIsSecureEntry ] = useState(true);


  const LoginUser = async() =>{
      try {
         if(email === ''){
            Alert.alert('Se requiere un correo electrónico.');
         }else if(password === ''){
           Alert.alert('Se requiere una contraseña .');
         }else{
             await auth().signInWithEmailAndPassword(email,password);
         }

      }catch  {
          Alert.alert('Correo o Contraseña inválida');
      }
  }

  const restablecerContraseña = async() => {
      if(email === ''){
        alert('Se requiere un correo electrónico.');
      }else{
        firebase.auth().sendPasswordResetEmail(email)
      }
  }

  return (
    
    <Surface style={styles.surface}>    
        <View style={styles.container}>
        <ImageBackground source={require('../../../assets/imagenes/Login_Background.png')} style={{flex: 1, resizeMode:'cover', justifyContent: 'center'}}>
          <View style={styles.containerLogo}>
              <Image source={require('../../../assets/imagenes/Scout_Logo.png')} style={styles.imageUp}/>
            </View> 

            <View style={styles.containerText}>
              <Headline style={{marginTop:'10%',color:'#DEDEDE', fontSize:33, fontFamily:'ProductSans-Bold'}}>BIENVENIDO!</Headline>
              <Text style={{fontSize:19, color:'#DEDEDE'}}>
                  Gusto en verte de nuevo
              </Text>
            </View> 
      
          <View style={styles.containerLogin}>
              <TextInput
                style={styles.input}
                mode='outlined'
                label='Correo Electrónico'
                autoCapitalize='none'
                theme={{colors: {primary: 'black'}}}
                value={email}
                onChangeText={(email) => setEmail(email)}
              />

            <TextInput
              style={styles.input}
              mode='outlined'
              label='Contraseña'
              theme={{colors: {primary: 'black'}}}
              secureTextEntry={isSecureEntry}
              right={
                <TextInput.Icon 
                  name = {isSecureEntry ?  'eye-off-outline' : 'eye-outline'} 
                  color={"#949494"}                   
                  onPress={() => {setIsSecureEntry((prev) => !prev)}} 
              />}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <View style={styles.containerButtonLogin}>
            <View style={{marginBottom:'2%'}}>
              <Button 
                //onPress={() => login(email, password)}
                onPress={LoginUser}
                contentStyle={styles.buttonLogin}
                mode="contained"
                uppercase={false} 
                theme={{colors: {primary: '#8E0101'}}}
                labelStyle={{fontSize: 21}}
              >
                INGRESAR
              </Button>
            </View>

            <View style={styles.containerForgotPass}>
                <Subheading 
                  style={{color:'#DEDEDE'}}
                  onPress={restablecerContraseña}
                >
                  Olvido su contraseña?
                </Subheading>
            </View>
          </View>

          <View style={styles.containerButtonSignUp}>
            <Subheading stylye={{fontSize:12, color:'#DEDEDE'}}>
            <Text style={{fontSize:15, color:'#DEDEDE'}}>
                  Desarrollador por
              </Text> 
            <Subheading style={{color:'#FFA303'}} onPress={() => navigation.navigate('SignUp')}> CentinelAPP</Subheading></Subheading>
          </View>

          <View style={styles.containerTextCopyright}>
              <Text style={styles.copyrightText}>
                © CENTINELAPP 2021 - TODOS LOS DERECHOS RESERVADOS
              </Text>
            </View>
            </ImageBackground>
        </View>
    </Surface>
    
  );
}

const styles = StyleSheet.create({

  surface: {
    height: '100%',
    width: '100%'
  },
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  containerLogin:{
    margin:'6%'
  },
  input:{
    backgroundColor:'white',
    marginBottom:'1%'    
  },  
  containerText:{
    margin:'5%'
  },
  containerForgotPass:{
    flexDirection:'row',
    justifyContent:'center',
    fontSize:20
  },
  containerButtonLogin:{
    margin:'6%',
    marginTop:'-3%',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  buttonLogin:{
    padding:'2%',
    backgroundColor: '#8E0101',
    borderRadius: 10,
  },
  facebookLogin:{
    padding:'2%',
    backgroundColor:'#dfe3ee',
  },
  containerButtonSignUp:{
    flexDirection:'row',
    justifyContent:'center',
    margin:'3%'
  },
  imageUp:{
    justifyContent:'center',
    alignItems: 'center'
  },
  containerTextCopyright:{
    justifyContent:'center',
    alignItems: 'center',
    margin:'5%',
    marginTop:'0%'
  },
  containerLogo:{
    marginTop: '13%',
    justifyContent:'center',
    alignItems: 'center'
  },
  copyrightText:{
    color:'#DEDEDE', 
    fontSize:11,
    color:'#DEDEDE'
  }
});
export default Login;