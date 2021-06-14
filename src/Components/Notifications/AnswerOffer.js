import React, {useEffect, useState, useRef} from 'react'
import { View, Text  } from 'react-native'
import { Button, Subheading, Title} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";

const AnswerOffer = (props) => {
    const navigation = useNavigation(); 
    const refRBSheet = useRef();

    return (

            
        <View>   
            <Button
                mode="outlined"
                uppercase={false} 
                labelStyle={{fontSize: 17}}
                onPress={() => refRBSheet.current.open()}
            >
                Ver Oferta
            </Button>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={270}
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
                    {props.offer.teacher == undefined ? (
                        <Title style={{fontFamily:'ProductSans-Bold', textAlign:'center', marginBottom:'5%',fontSize:25}}>Oferta del profesor</Title>
                    ):(
                        <Title style={{fontFamily:'ProductSans-Bold', textAlign:'center', marginBottom:'5%', fontSize:25}}>{'Oferta de ' + props.offer.teacher.split(' ')[0]}</Title>
                    )}
                    <View style={{marginTop:'5%'}}>
                        <Subheading 
                            style={{
                                textAlign:'auto',
                                fontSize:17
                            }}
                        >
                            {props.offer.description}
                        </Subheading>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'center', marginTop:'12%'}}>
                        <View>
                            <Button
                                onPress={() => navigation.navigate('Inicio', {
                                    screen: 'Offer',
                                    params: {
                                        idRequest: props.offer.idRequest,
                                        amountTotal: props.offer.amountLocal,
                                        comision: props.offer.comision,
                                        currency: props.offer.currency,
                                        amountTeacher: props.offer.amount,
                                        start: '12:10',
                                        end: '20:00',
                                        country:'Colombia',
                                        telegram: props.offer.telegram,
                                        teacherId: props.offer.teacherId,
                                        teacher: props.offer.teacher,
                                        tokenTeacher: props.offer.tokenTeacher,
                                    }
                                })}
                                mode='contained'
                                contentStyle={{padding: '1%'}}
                                labelStyle={{fontSize: 17}}
                                uppercase={false}   
                            >
                                {'Aceptar oferta por ' + props.offer.currencyLocal + ' ' + props.offer.amountLocal}
                            </Button>
                        </View>
                    </View>
                
                </View>
            </RBSheet>
        </View>
    )
}

export default AnswerOffer;