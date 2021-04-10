import React, { useState, useContext  } from 'react';
import { TextInput, Surface, Button, Headline, Text, Subheading} from 'react-native-paper';
import { StyleSheet, View, ScrollView, Alert} from 'react-native';
import auth from '@react-native-firebase/auth'


function Login({navigation}){

  //const { login, facebookLogin } = useContext(AuthContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword] = useState('');
  const [ isSecureEntry, setIsSecureEntry ] = useState(true);


  const LoginUser = async() =>{
      try {
    
          await auth().signInWithEmailAndPassword(email,password);

      }catch {error} {
        Alert.alert('Error', 'Hay un error'+  error)
      }
  }

  return (
    <Surface style={styles.surface}>
      <View style={styles.container}>

        <View style={styles.containerText}>
          <Headline style={{marginTop:'5%',color:'#007a6f', fontSize:33, fontFamily:'ProductSans-Bold'}}>Bienvenid@,</Headline>
          <Text style={{color:'grey', fontSize:19,color:'#007a6f'}}>
              Ingresa para continuar a la app!
          </Text>
        </View> 
     
  
        <View style={styles.containerLogin}>
          <TextInput
            style={styles.input}
            mode='outlined'
            label='Correo Electrónico'
            autoCapitalize='none'
            value={email}
            onChangeText={(email) => setEmail(email)}
          />

          <TextInput
            style={styles.input}
            mode='outlined'
            label='Contraseña'
            secureTextEntry={isSecureEntry}
            right={
              <TextInput.Icon 
                name = {isSecureEntry ?  'eye-off-outline' : 'eye-outline'} 
                color={"#c8c8c8"} 
                onPress={() => {setIsSecureEntry((prev) => !prev)}} 
            />}
            value={password}
            onChangeText={(password) => setPassword(password)}
          />

          <View style={styles.containerForgotPass}>
              <Subheading 
                style={{color:'#007a6f'}}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                 Olvidaste la contraseña?
              </Subheading>
          </View>
        </View>

        <View style={styles.containerButtonLogin}>
          <View style={{marginBottom:'5%'}}>
            <Button 
              //onPress={() => login(email, password)}
              onPress={LoginUser}
              contentStyle={styles.buttonLogin}
              mode="contained"
              uppercase={false} 
              labelStyle={{fontSize: 18}}
      
            >
              Ingresar
            </Button>
          </View>
          
         
        </View>
  
    
        <View style={styles.containerButtonSignUp}>
          <Subheading stylye={{fontSize:40}}>Desarrollado por <Subheading style={{color:'#007a6f'}} onPress={() => navigation.navigate('SignUp')}>CentinelAPP</Subheading></Subheading>
        </View>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({

  surface: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF'
  },
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-between',
  },
  containerLogin:{
    margin:'5%',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  input:{
    backgroundColor:'#FFFFFF',
    marginBottom:'2%'
  },  
  containerText:{
    margin:'5%',
    marginTop:'15%'
  },
  containerForgotPass:{
    flexDirection:'row',
    justifyContent:'flex-end',
    fontSize:20
  },
  containerButtonLogin:{
    margin:'5%',
    marginTop:'-1%',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  buttonLogin:{
    padding:'2%'
  },
  facebookLogin:{
    padding:'2%',
    backgroundColor:'#dfe3ee',
  },
  containerButtonSignUp:{
    flexDirection:'row',
    justifyContent:'center',
    margin:'3%'
  }
});
export default Login;