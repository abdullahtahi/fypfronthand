import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import { StackActions } from '@react-navigation/native'
import Modal from 'react-native-modal'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RoundButton from '../../../../components/round-button/index'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import styles from './styles'
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const DataEntryScreen = ({ navigation, route }) => {
    const { mobileNumber, password } = route.params
    const [user, setUser] = useState({
        cnic: '',
        fullName: '',
        mobileNumber: mobileNumber,
        email: '',
        gender: '',
        dateOfBirth: '',
        password: password,
        userRole: 'user'
    })
    const [isCnicValid, setIsCnicValid] = useState(false)
  const [imageDetails, setImageDetails] = useState(null);
  const [imageDetails1, setImageDetails1] = useState(null);
    const [isFullNameValid, setIsFullNameValid] = useState(false)
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false)
    const [isGenderValid, setIsGenderValid] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    const [showGenderModal, setShowGenderModal] = useState(false)
    const placeholderColor = '#f0f8ff'
    const cnicRegex = /\d{5}[\-]\d{7}[\-]\d{1}/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const onNextButtonPress = () => {
        if (isCnicValid) {
            if (isFullNameValid) {
                if (isEmailValid) {
                    if (isDateOfBirthValid) {
                        if (isGenderValid) {
                            navigation.dispatch(
                                StackActions.replace('Vehicle Information Entry Screen', {
                                    user: user
                                })
                            )
                        }
                        else {
                            alert('Specify your gender')
                        }
                    }
                    else {
                        alert('Select your date of birth, you must be at least 18 years old')
                    }
                }
                else {
                    alert('Enter a valid email')
                }
            }
            else {
                alert('Enter your full name')
            }
        }
        else {
            alert('Enter valid CNIC with dashes(-)')
        }
    }
    const getUserAge = () => {
        const today = new Date()
        const birthDate = new Date(user.dateOfBirth.toString())
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }
    const checkIfCnicIsValid = () => {
        if (cnicRegex.test(user.cnic)) {
            setIsCnicValid(true)
        }
        else {
            setIsCnicValid(false)
        }
    }
    const checkIfFullNameValid = () => {
        if (user.fullName.length > 0) {
            setIsFullNameValid(true)
        }
        else {
            setIsFullNameValid(false)
        }
    }
    const checkIfEmailIsValid = () => {
        if (emailRegex.test(user.email)) {
            setIsEmailValid(true)
        }
        else {
            setIsEmailValid(false)
        }
    }
    const checkIfDateOfBirthIsValid = () => {
        if (getUserAge() >= 18) {
            setIsDateOfBirthValid(true)
        }
        else {
            setIsDateOfBirthValid(false)
        }
    }
    const checkIfGenderIsValid = () => {
        if (user.gender != '') {
            setIsGenderValid(true)
        }
        else {
            setIsGenderValid(false)
        }
    }
    const onDobPress = () => {
        setIsDatePickerVisible(true)
    }
    const onConfirmDatePress = (date) => {
        setUser({ ...user, dateOfBirth: date.toISOString().split('T')[0] })
        setIsDatePickerVisible(false)
    }
    const onCancelDatePress = () => {
        setIsDatePickerVisible(false)
    }
    const onGenderPress = () => {
        setShowGenderModal(true)
    }
    useEffect(() => {
        checkIfCnicIsValid()
        checkIfFullNameValid()
        checkIfEmailIsValid()
        checkIfDateOfBirthIsValid()
        checkIfGenderIsValid()
    })

    // const storagePermission = async () => {
    //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       // if get here, the user has accepted the permissions
    //       launchImageLibrary()
    //     } else {
    //       // if get here, the user did NOT accepted the permissions
    //     }
    //   }
    //   const launchImageLibrary = async () => {
    //     await ImagePicker.launchImageLibrary(
    //       {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 200,
    //         maxWidth: 200,
    //       },
    //       (response) => {
    //         if (response.didCancel) {
    //           console.log('User cancelled photo picker');
    //         } else if (response.error) {
    //           console.log('ImagePicker Error: ', response.error);
    //         } else {
    //           setpetimagefile(response.assets[0])
    //           setImageDetails(response.assets[0].uri)
    //           // setImageDetails([...imageDetails1, response])
    //           // setModalShow(false);
    //         }
    //       }
    //     );
    //   };
      
    // const launchCamera = () => {
    //     ImagePicker.launchCamera(
    //       {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 200,
    //         maxWidth: 200,
    //       },
    //       (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled photo picker');
    //           } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //           } else {
    //             setpetimagefile(response.assets[0])
    //             setImageDetails(response.assets[0].uri)
    //             // setImageDetails([...imageDetails1, response])
    //             // setModalShow(false);
    //           }
    //       }
    //     );
    //   };

    const openCamera = () => {
        console.log('yyoyo');
        ImagePicker.openCamera({
            // includeExif: true,
            mediaType: 'photo',
        })
            .then((video) => {
                setImageDetails(video.path)
                setImageDetails1(video.path)
                console.log('video', video);
                // setVideo(video.path);
                // setMime(video.mime);
            })
            .catch((e) => alert(e));
    };
    
    return (

        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/images2.jpg')} >
                <ScrollView>
                    <View>
                        {/* <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} /> */}
                    <Text style={{fontSize: 23, color: '#000', fontWeight: 'bold', textAlign: 'center', marginTop: '30%'}}>Local On Work</Text>

                    </View>
                    <View>
                        <Text style={styles.screenHeader} >
                            Enter Details
                        </Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                <TouchableOpacity

                    onPress={()=>{
                        openCamera()
                    }}

                  style={{
                    width: 180,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 60,
                    marginBottom: 40,
                    borderRadius: 100,
                  }}>
                  {imageDetails1 ?
                    <Image
                      style={{ width: 140, height: 140, borderRadius: 100, }}
                      source={{uri: imageDetails1}}
                    /> : <View
                      style={{justifyContent: 'center', alignItems: 'center', width: 140, height: 140,borderRadius: 100, backgroundColor: 'grey' }}
                        >
                    <Text style={{color: '#fff', textAlign: 'center'}}>Take profile image</Text>

                        </View>
                  }

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={()=>{
                        openCamera()
                    }}

                  style={{
                    width: 180,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'grey',
                    marginTop: 30,
                    borderRadius: 10,
                  }}>
                    <Text style={{color: '#fff'}}>Take ID card front image</Text>
                  {/* {imageDetails ?
                    <Image
                      style={{ width: 130, height: 130, borderRadius: 100, }}
                      source={{uri: imageDetails}}
                    /> : <View
                      style={{ width: 130, height: 40, backgroundColor: 'grey' }}
                        />
                  } */}

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={()=>{
                        openCamera()
                    }}

                  style={{
                    width: 180,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'grey',
                    marginTop: 30,
                    borderRadius: 10,
                  }}>
                    <Text style={{color: '#fff'}}>Take ID card back image</Text>
                  {/* {imageDetails ?
                    <Image
                      style={{ width: 130, height: 130, borderRadius: 100, }}
                      source={{uri: imageDetails}}
                    /> : <View
                      style={{ width: 130, height: 40, backgroundColor: 'grey' }}
                        />
                  } */}

                </TouchableOpacity>
              </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <AntDesign name="idcard" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                textContentType="telephoneNumber"
                                keyboardType="number-pad"
                                placeholder="Enter CNIC"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.cnic}
                                onChangeText={value => { setUser({ ...user, cnic: value }) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <SimpleLineIcons name="user" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                textContentType="name"
                                placeholder="Enter Full Name"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.fullName}
                                onChangeText={value => { setUser({ ...user, fullName: value }) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <MaterialCommunityIcons name="email-outline" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="email-address"
                                textContentType="name"
                                placeholder="Enter Email"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.email}
                                onChangeText={value => { setUser({ ...user, email: value }) }}
                            />
                        </View>
                        <TouchableOpacity style={styles.textView} onPress={onDobPress} >
                            <FontAwesome name="calendar" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Date of birth"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={user.dateOfBirth}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={onConfirmDatePress}
                            onCancel={onCancelDatePress}
                            maximumDate={new Date()}
                        />
                        <TouchableOpacity style={styles.textView} onPress={onGenderPress} >
                            <Fontisto name="genderless" size={15} color="black" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Gender"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={user.gender}
                            />
                        </TouchableOpacity>
                        <Modal
                            isVisible={showGenderModal}
                            onBackButtonPress={() => setShowGenderModal(false)}
                            onBackdropPress={() => setShowGenderModal(false)}
                        >
                            <View>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, gender: 'Male' })
                                    setShowGenderModal(false)
                                }}  >
                                    <Text style={styles.modalTextStyles} >
                                        Male
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, gender: 'Female' })
                                    setShowGenderModal(false)
                                }} >
                                    <Text style={styles.modalTextStyles} >
                                        Female
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <RoundButton onPress={onNextButtonPress} textToDisplay="Next" />
                </ScrollView>
            </ImageBackground>
        </View>

    )
}
export default DataEntryScreen