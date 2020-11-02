import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 10,

    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker : {
        backgroundColor: "#fff",
        fontSize:17,
        marginBottom: 16,
        elevation: 3,
        height: 50,
    },
    err: {
        fontSize: 16,
        color: '#f00',
        marginTop: -15,
        fontWeight: 'normal'
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
        fontWeight:'bold',
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontWeight:'bold',
        marginBottom: 20,
        color:'#00753E',

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
        marginBottom: 10,
        elevation: 4,
        paddingHorizontal: 8
    },
    Button: {
        marginTop: 50,
        marginBottom: 40,
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
    },
    produtionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boxList: {
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 30,
        marginTop: 15,
        marginBottom: 15,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom: 20,
        color:'#00753E',

    },
    activityBox: {
        marginBottom:20,
        paddingTop:10,
        borderColor: "#00753E",
        borderTopWidth: 3,
    },
});