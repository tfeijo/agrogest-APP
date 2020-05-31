import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,

    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    picker : {
        flexDirection: 'row',
        backgroundColor: "#fff",
        fontSize:17,
        marginBottom: 16,
        elevation: 3,
        height: 50,
    },
    pickerItem : {
        marginLeft: 5,
        marginRight: 5,
    },
    headerText: {
        color:'#737373'
    },
    headerTextBold: {
        fontWeight:'bold'
    },
    caption: {
        fontSize: 15,
        color: '#131313',
        fontWeight:'bold'
    },
    title: {
        fontSize: 25,
        marginBottom: 0,
        marginTop: 38,
        color: '#131313',
        fontWeight:'bold'
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
        marginBottom: 32
    },
    NumberInputStyle: {
        fontSize: 16,
        backgroundColor: '#fff',
        height: 50,
        marginBottom: 32,
        elevation: 4,
        paddingHorizontal: 8
    },
    Button: {
        marginTop: 50,
        height: 45,
        backgroundColor:'#00753E',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center'
    
    },
    ButtonText: {
        color:'#fff',
        fontSize:20
    }
    
});