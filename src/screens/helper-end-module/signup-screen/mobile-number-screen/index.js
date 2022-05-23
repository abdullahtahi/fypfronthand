import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView, BackHandler, Alert } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { HelperText } from 'react-native-paper'
import ProgressLoader from 'rn-progress-loader'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import RoundButton from '../../../../components/round-button/index'
import firebaseSetup from '../../../../firebase/setup'
import styles from './styles'

const HelperMobileNumberEntryScreen = ({ navigation }) => {
    const { auth } = firebaseSetup()
    const [mobileNumber, setMobileNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    let confirm = null
    const phoneRegex = /[\+]\d{12}/
    const placeholderColor = '#f0f8ff'
    const sendOtpMessageToNumber = async () => {
        try {
            setIsLoading(true)
            const confirmation = await auth().signInWithPhoneNumber(mobileNumber)
            confirm = confirmation
            if (confirm != null) {
                navigation.dispatch(
                    StackActions.replace('Helper Otp Screen', {
                        mobileNumber: mobileNumber,
                        confirm: confirm
                    })
                )
                setIsLoading(false)
            } else {
                alert('Authentication failed.\nTry again later.')
                setIsLoading(false)
            }
        }
        catch (error) {
            alert(error)
            setIsLoading(false)
        }
    }
    const onNextButtonPress = () => {
        if (isPhoneNumberValid) {
            axios.post('https://fyp-ustaad-app.herokuapp.com/check-for-helper-in-database', {
                mobileNumber: mobileNumber
            }).then((response) => {
                if (response.data) {
                    sendOtpMessageToNumber()
                    // navigation.dispatch(
                    //     StackActions.replace('Helper Otp Screen', {
                    //         mobileNumber: mobileNumber
                    //     })
                    // )
                }
            }).catch(error => {
                if (error.response.status == 405) {
                    alert(error.response.data)
                } else {
                    alert(error)
                }
            })
        }
        else {
            alert('Please check your mobile number format.\nIt should be in following format: \n+92 300 0000 000')
        }
    }
    const checkIfPhoneNumberIsValid = () => {
        if (phoneRegex.test(mobileNumber)) {
            setIsPhoneNumberValid(true)
        }
        else {
            setIsPhoneNumberValid(false)
        }
    }
    useEffect(() => {
        checkIfPhoneNumberIsValid()
    }, [mobileNumber])
    useEffect(() => {
        if (auth().currentUser) {
            auth().signOut()
        }
    }, [])
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/images2.jpg')} >
                <ScrollView>
                    <View>
                        {/* <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} /> */}
                    <Text style={{fontSize: 23, color: '#000', fontWeight: 'bold', textAlign: 'center', marginTop: '60%'}}>Local On Work</Text>

                    </View>
                    <View>
                        <Text style={styles.screenHeader} >
                            Enter Your Mobile Number
                        </Text>
                    </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <Feather name="phone" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                placeholder="+92 300 000 0000"
                                value={mobileNumber}
                                onChangeText={value => setMobileNumber(value)}
                                placeholderTextColor={placeholderColor}
                                editable={true} />
                        </View>
                        <HelperText style={styles.helperTextStyles} type="error" visible={!isPhoneNumberValid} >
                            * Check your mobile number format
                        </HelperText>
                    </View>
                    <RoundButton onPress={onNextButtonPress} textToDisplay="Next" />
                </ScrollView>
                <ProgressLoader
                    visible={isLoading}
                    isModal={true}
                    isHUD={true}
                    color="#0241d8" />
            </ImageBackground>
        </View>
    )
}
export default HelperMobileNumberEntryScreen