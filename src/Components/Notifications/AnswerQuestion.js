import React, {useEffect, useState, useRef} from 'react'
import {View, ScrollView, ToastAndroid} from 'react-native'
import { Button, Subheading, TextInput, Title} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth' 
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";
import * as RNLocalize from "react-native-localize";
import moment from 'moment';

const AnswerQuestion = (props) => {
    const navigation = useNavigation(); 
    const refRBSheet = useRef();
    const [answerSend, setAnswerSend] = useState('')
    const timestamp = firestore.FieldValue.serverTimestamp;
    const timezoneActual = RNLocalize.getTimeZone();
    const actualDay = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

    const saveAnswers = () => {
        firestore().collection('Solicitudes')
        .doc(props.answer.idRequest)
        .collection('Answers')
        .add({
            idQuestion: props.answer.idAsk,
            answer: answerSend,
            timeZone: timezoneActual,
            create_At: timestamp(),
            dateAnswer: actualDay,
            tokenTeacher: props.answer.tokenTeacher,
            userName: auth().currentUser.displayName
        })
        .then(
            ToastAndroid.show('Tu respuesta se envió correctamente!', ToastAndroid.LONG),
            setAnswerSend(''),
            refRBSheet.current.close()
        )
    }
    return (
        <View>   
            <Button
                mode="outlined"
                uppercase={false} 
                labelStyle={{fontSize: 17}}
                onPress={() => refRBSheet.current.open()}
            >
                Responder
            </Button>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={400}
                customStyles={{
                    container:{
                        borderTopLeftRadius:30,
                        borderTopRightRadius:30,
                        flexDirection:'column',
                        justifyContent:'space-between',
                        padding:'5%',
                    },
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: '#007a6f'
                    }
                }}
            >
                <View style={{ margin:'2%'}}>
                    {props.answer.teacher == undefined ? (
                        <Title style={{fontFamily:'ProductSans-Bold', textAlign:'center', marginBottom:'5%',fontSize:22}}>Pregunta del profesor</Title>
                    ):(
                        <Title style={{fontFamily:'ProductSans-Bold', textAlign:'center', marginBottom:'5%', fontSize:22}}>{'Pregunta de ' + props.answer.teacher.split(' ')[0]}</Title>
                    )}
                    <View style={{marginTop:'10%'}}>
                        <Subheading 
                            style={{
                                textAlign:'auto',
                                fontSize:17
                            }}
                        >
                            {props.answer.description}
                        </Subheading>
                    </View>
                    <View style={{flexDirection:'row', marginTop:'12%',  marginBottom:'5%'}}>
                        <ScrollView>
                        <TextInput
                            style={{width:'100%'}}
                            placeholder='Responde rápido a la pregunta'
                            multiline
                            numberOfLines={5}
                            maxLength={200}
                            value={answerSend}
                            onChangeText={(answerSend) => setAnswerSend(answerSend)}
                            right={
                                <TextInput.Icon 
                                    name='send'
                                    size={30}
                                    color={'#007a6f'} 
                                    onPress={saveAnswers} 
                                />  
                            }

                        />
                        </ScrollView>
                    </View>
                
                </View>
            </RBSheet>
        </View>
    )
}

export default AnswerQuestion;