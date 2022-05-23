import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight,
        flex: 1
    },
    numberSpecial: {
        width: '60%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'black',
    },
    countryCode: {
        width: '10%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'grey',
    },
    inputText: {
        width: '65%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'black',
        marginLeft: 10
    },
    textView: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputArea: {
        alignItems: 'center',
    },
    text: {
        color: '#dcdcdc',
    },
    SignInText: {
        color: 'black',
    },
    logo: {
        alignSelf: 'center',
        height: 200,
        width: 200,
        marginTop: '20%'
    },
    screenHeader: {
        color: 'black',
        fontSize: 25,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    modalTouchableContainer: {
        backgroundColor: 'black',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 12
    },
    modalTextStyles: {
        fontSize: 18
    },
    skillsCheckBoxContainer: {
        width: '65%',
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'black',
        marginLeft: 10,
        justifyContent: 'center'
    },
    checkboxTextStyle: {
        color: 'black',
        fontWeight: 'bold'
    },
    skillsRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:5
    }
})
export default styles