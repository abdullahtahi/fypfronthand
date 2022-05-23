import React, { useState, useEffect } from 'react'
import { Image, PermissionsAndroid, View, Text, Alert, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import ProgressLoader from 'rn-progress-loader'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import axios from 'axios'
import Geolocation from 'react-native-geolocation-service'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './styles'

const MapViewComp = (props) => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const [allowLoad, setAllowLoad] = useState(false)
    const [showModal, setShowModal] = useState(true)
    const [helpers, setHelpers] = useState([])
    const getImage = () => {
        if (props.typeOfService === 'Mechanic') {
            return require('../../assets/images/mechanicIconOnMap.jpg')
        }
        if (props.typeOfService === 'Fuel Delivery') {
            return require('../../assets/images/fuelIconOnMap.jpg')
        }
        if (props.typeOfService === 'Tower') {
            return require('../../assets/images/towerIconOnMap.jpg')
        }
    }
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } catch (error) {
            alert(error)
        }
    }
    const getCurrentLocation = () => {
        if (requestLocationPermission()) {
            Geolocation.getCurrentPosition(position => {
                setCurrentLocation(position)
                axios.post('https://fyp-ustaad-app.herokuapp.com/update-user-location', {
                    mobileNumber: props.user.mobileNumber,
                    location: position.coords
                }).then(response => {
                    //do nothing
                }).catch(error => {
                    alert(error)
                })
            }, error => {
                alert(error)
            },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                })
        }
    }
    const onPinDragEnd = (location) => {
        axios.post('https://fyp-ustaad-app.herokuapp.com/update-user-location', {
            mobileNumber: props.user.mobileNumber,
            location: location
        }).then(response => {
            //do nothing
        }).catch(error => {
            alert(error)
        })
    }
    const getHelpersFromDb = () => {
        axios.get('https://fyp-ustaad-app.herokuapp.com/get-helpers')
            .then(response => {
                setHelpers(response.data)
            })
            .catch(error => {
                alert(error)
            })
    }
    useEffect(() => {
        getCurrentLocation()
        getHelpersFromDb()
    }, [])
    useEffect(() => {
        if (currentLocation != null) {
            setAllowLoad(true)
        }
        else {
            setAllowLoad(false)
        }
    })
    const toggleModal = (item) => {
        Alert.alert(
            item.fullName,
            `Services: ${item.userRole}\nRating: ${item.averageReview == undefined || item.averageReview == 0 ? 'Not rated yet' : item.averageReview} \nExpertise:${item.skills.map(i => { return ' ' + i })} \nExperience: ${item.experience > 1 ? item.experience + ' years' : item.experience + ' year'}`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Send Request",
                    onPress: () => {
                        axios.post('https://fyp-ustaad-app.herokuapp.com/send-request-to-recevier', {
                            sender: {
                                ...props.user,
                                lastLocation: {
                                    longitude: currentLocation.coords.longitude,
                                    latitude: currentLocation.coords.latitude
                                }
                            },
                            receiver: item
                        }).then(response => {
                            ToastAndroid.show('Request sent, awaiting response', ToastAndroid.LONG)
                        }).catch(error => {
                            if (error.response.status == 403) {
                                Alert.alert('Busy', 'The helper is busy at the moment and cannot respond to your request.\nTry again another time.', ['OK'])
                            } else if (error.response.status == 500) {
                                alert('Server not responding.\nTry again')
                            }
                        })
                    }
                },
            ]
        )
        setShowModal(!showModal)
    }
    return (
        <View style={styles.mapStyles} >
            {
                allowLoad && helpers.length > 0 ? (
                    <View>
                        <MapView
                            style={styles.mapStyles}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: currentLocation.coords.latitude,
                                longitude: currentLocation.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            {
                                helpers.map(item => {
                                    if (item.userRole == props.typeOfService) {
                                        return (
                                            <Marker
                                                key={item._id}
                                                coordinate={{
                                                    latitude: item.location.latitude != null ? item.location.latitude : 0,
                                                    longitude: item.location.longitude != null ? item.location.longitude : 0
                                                }}
                                                onPress={() => toggleModal(item)}
                                            >
                                                <Image
                                                    style={styles.markerStyles}
                                                    resizeMode="contain"
                                                    source={getImage(item.userRole)}
                                                />
                                            </Marker>
                                        )
                                    }
                                })
                            }
                            <Marker
                                style={styles.markerStyles}
                                coordinate={{
                                    latitude: currentLocation.coords.latitude,
                                    longitude: currentLocation.coords.longitude
                                }}
                                icon={
                                    <Entypo
                                        name="location-pin"
                                        size={20}
                                        style={styles.currentLocationStyles}
                                    />}
                                draggable
                                onDragEnd={e => onPinDragEnd(e.nativeEvent.coordinate)}
                            />
                        </MapView>
                    </View>
                ) : <ProgressLoader
                    visible={!allowLoad}
                    isModal={true}
                    isHUD={true}
                    color="#0241d8" />
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        typeOfService: state.userRequestTypeReducer,
        user: state.userProfileStateReducer
    }
}

export default connect(mapStateToProps)(MapViewComp)