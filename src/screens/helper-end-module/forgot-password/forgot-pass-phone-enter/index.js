import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView, } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import RoundButton from '../../../../components/round-button/index'
import { ButtonGroup } from 'react-native-elements'
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import firebaseSetup from '../../../../firebase/setup'
import styles from './styles'

const HelperForgotPassPhoneNumberEntry = ({ navigation }) => {
    const { auth } = firebaseSetup()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const buttons = ['Electrician', 'Plumber', 'HouseHold','Sanitary']
    const [mobileNumber, setMobileNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    let confirm = null
    const phoneRegex = /[\+]\d{12}/
    const placeholderColor = '#f0f8ff'
    const sendOtpMessageToNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(mobileNumber)
            confirm = confirmation
            if (confirm != null) {
                navigation.dispatch(
                    StackActions.replace('Helper Forgot Pass Otp Screen', {
                        mobileNumber: mobileNumber,
                        confirm: confirm,
                        userRole: buttons[selectedIndex]
                    })
                )
            } else {
                alert('Authentication failed.\nTry again later.')
            }
        }
        catch (error) {
            alert(error)
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
    const onNextButtonPress = () => {
        if (isPhoneNumberValid) {
            axios.post('https://fyp-ustaad-app.herokuapp.com/check-helper-for-forgot-password', {
                mobileNumber: mobileNumber,
                userRole: buttons[selectedIndex]
            }).then((response) => {
                if (response.data) {
                    sendOtpMessageToNumber()
                }
            }).catch(error => {
                if (error.response.status == 404) {
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
    // const onNextButtonPress = () => {
    //     navigation.push('Helper Forgot Pass Otp Screen')
    // }
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
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={mobileNumber}
                                onChangeText={value => setMobileNumber(value)}
                            />
                        </View>
                        <View style={styles.buttonGroupMainContainer} >
                            <ButtonGroup
                                buttons={buttons}
                                onPress={item => setSelectedIndex(item)}
                                selectedButtonStyle={{ backgroundColor: 'grey' }}
                                selectedIndex={selectedIndex}
                                containerStyle={styles.buttonGroupContainer}
                            />
                        </View>
                    </View>
                    <RoundButton onPress={onNextButtonPress} textToDisplay="Next" />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default HelperForgotPassPhoneNumberEntry