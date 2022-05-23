import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, RefreshControl, FlatList } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import styles from './styles'


const MaintenanceHistoryScreen = (props) => {
    const [maintenanceRecord, setMaintenanceRecord] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const getMaintenanceData = async () => {
        await axios.post('https://fyp-ustaad-app.herokuapp.com/get-service-record', {
            mobileNumber: props.user.mobileNumber
        }).then(response => {
            setMaintenanceRecord(response.data)
        }).catch(error => {
            alert(error)
        })
    }
    useEffect(() => {
        getMaintenanceData()
    }, [])
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await getMaintenanceData()
        setRefreshing(false)
    }, [])
    return (
        <SafeAreaView>
            {
                maintenanceRecord.length >0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={maintenanceRecord}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => {
                            return (
                                <View key={item.serviceId} style={styles.serviceMainContainer} >
                                    <View style={styles.dataContainer} >
                                        <Text>Date of Service: </Text>
                                        <Text>{item.serviceDate.split('T')[0]}</Text>
                                    </View>
                                    <View style={styles.dataContainer} >
                                        <Text>Next Service Date: </Text>
                                        <Text>{item.nextServiceDate.split('T')[0]}</Text>
                                    </View>
                                    <View style={styles.dataContainer} >
                                        <Text>Service Type: </Text>
                                        <Text>{item.serviceType}</Text>
                                    </View>
                                    <View style={styles.dataContainer} >
                                        <Text>Service Cost: </Text>
                                        <Text>{item.costOfService + " Rs"}</Text>
                                    </View>
                                    <View style={styles.dataContainer} >
                                        <Text>Service Milleage: </Text>
                                        <Text>{item.currentMileage}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                ): (
                    <View style={styles.noReviewsContainer} >
                        <Text style={styles.noReviewsText} >
                            No record found.
                        </Text>
                    </View>
                )
            }
        </SafeAreaView>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer
    }
}


export default connect(mapStateToProps)(MaintenanceHistoryScreen)
