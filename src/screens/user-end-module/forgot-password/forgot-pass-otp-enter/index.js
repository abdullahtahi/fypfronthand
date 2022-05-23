import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RoundButton from '../../../../components/round-button'
import { StackActions } from '@react-navigation/native'
import firebaseSetup from '../../../../firebase/setup'
import styles from './styles'

const ForgotPasswordOtpVerify = ({ navigation, route }) => {
    const { auth } = firebaseSetup()
    const { mobileNumber, confirm } = route.params
    const [otp, setOtp] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const placeholderColor = '#f0f8ff'
    const otpVerify = async () => {
        try {
            const verification = await confirm.confirm(otp)
            if (verification) {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        setAuthenticated(true)
                    }
                })
            } else {
                alert('Authentication failed.\nPlease try again.')
            }
        } catch (error) {
            alert(error)
        }
    }
    const onVerifyCodeButtonPress = () => {
        if (otp.length > 5 && otp.length < 7) {
            otpVerify()
        }
        else {
            alert('Enter the 6-digit code you received')
        }
    }
    useEffect(() => {
        try {
            auth().onAuthStateChanged(user => {
                if (user) {
                    setAuthenticated(true)
                }
            })
        } catch (error) {
            alert(error)
        }
    })
    useEffect(() => {
        if (authenticated) {
            navigation.dispatch(
                StackActions.replace('Forgot Password New Password', {
                    mobileNumber: mobileNumber
                })
            )
        }
    }, [authenticated])
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
                            <MaterialCommunityIcons name="barcode" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="number-pad"
                                textContentType="telephoneNumber"
                                placeholder="Enter the 6 digit code"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={otp}
                                onChangeText={value => setOtp(value)}
                            />
                        </View>
                    </View>
                    <RoundButton onPress={onVerifyCodeButtonPress} textToDisplay="Next" />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default ForgotPasswordOtpVerify