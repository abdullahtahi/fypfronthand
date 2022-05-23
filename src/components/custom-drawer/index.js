import React from 'react'
import { ToastAndroid, View } from 'react-native'
import { Avatar, Title, Caption, Drawer } from 'react-native-paper'
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles'


const CustomDrawerContent = (props) => {
    const removeSessionInDb = () => {
        axios.post('https://fyp-ustaad-app.herokuapp.com/logout-user', {
            mobileNumber: props.user.mobileNumber
        })
    }
    const getUserSession = () => {
        try {
            return EncryptedStorage.getItem('user_session')
        } catch (error) {
            alert(error)
        }
    }
    const removeUserSession = async () => {
        try {
            await EncryptedStorage.removeItem('user_session');
        } catch (error) {
            alert(error)
        }
    }
    const onLogoutPress = () => {
        if (getUserSession()) {
            removeSessionInDb()
            removeUserSession()
            ToastAndroid.show('Successfully Logged out', ToastAndroid.LONG)
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Main Screen'
                        }
                    ]
                })
            )
        }
        else {
            alert('No user logged in')
        }
    }
    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView>
                <View style={styles.drawerContent}>
                    <View style={[styles.userInfoSection, styles.dpDetails]}>
                        <Avatar.Image
                            source={{ uri: 'https://i.pinimg.com/564x/20/62/69/20626905851e066e66764c3385fa4352.jpg' }}
                            size={50}
                        />
                        <View style={styles.captionTitle}>
                            <Title style={styles.title} >{props.user.fullName}</Title>
                        </View>
                    </View>
                    <Drawer.Section>
                        <DrawerItem
                            label='Home'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Icon name='home-outline' color={color} size={size} />
                            )}
                            onPress={() => {
                                props.navigation.navigate('Home')
                            }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            label='Usage History'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Icon name='history' color={color} size={size} />
                            )}
                            onPress={() => {
                                props.navigation.navigate('History')
                            }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            label='Profile'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Icon name='account-outline' color={color} size={size} />
                            )}
                            onPress={() => {
                                props.navigation.navigate('Profile')
                            }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            label='Maintenance Record'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <SimpleLineIcons name='notebook' color={color} size={size} />
                            )}
                            onPress={() => {
                                props.navigation.navigate('Maintenance')
                            }}
                        >
                        </DrawerItem>
                        {/* <DrawerItem
                            label='Parts Prices'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Ionicons name='pricetag-outline' color={color} size={size} />
                            )}
                            onPress={() => {
                                props.navigation.navigate('Parts')
                            }}
                        >
                        </DrawerItem> */}
                        {/* <DrawerItem
                            label='Settings'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Icon name='account-settings-outline' color={color} size={size} />
                            )}
                            onPress={() => {
                                // props.navigation.navigate('Settings')
                            }}
                        >
                        </DrawerItem>
                        <DrawerItem
                            label='Support'
                            labelStyle={{ color: 'black' }}
                            icon={({ color, size }) => (
                                <Icon name='account-check-outline' color={color} size={size} />
                            )}
                            onPress={() => {
                                // props.navigation.navigate('Support')
                            }}
                        >
                        </DrawerItem> */}
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    label='Sign Out!'
                    labelStyle={{ color: 'black' }}
                    icon={({ color, size }) => (
                        <Icon name='exit-to-app' color={color} size={size} />
                    )}
                    onPress={onLogoutPress}
                >
                </DrawerItem>
            </Drawer.Section>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer
    }
}

export default connect(mapStateToProps)(CustomDrawerContent)