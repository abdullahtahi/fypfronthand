import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth- 50,
        height: 50,
        backgroundColor: '#899ca5',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    },
    text: {
        color: 'black',
        fontWeight:'900',
        fontSize:18
    }
})
export default styles