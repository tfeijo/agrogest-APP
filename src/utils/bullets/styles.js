import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    box : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 6,
        borderBottomColor:'#00753E',
        paddingBottom:4
    },
    documentBox :{
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor:'#00753E',
        marginBottom:12,
        paddingBottom:12
    },
    documentBoxTitle :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    documentBoxUrl :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
    },
    documentTitle: {
        
        marginTop: 10,
        fontWeight: 'bold'
    },
    documentUrl: {
        marginLeft: 10,
        marginTop: 4,
        
    },
    documentItens: {
        marginLeft: 10
    },
    documentDescription :{
        fontSize:16,
        marginBottom: 4,
        color: "#00753E",
    },
    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color:'#737373'
    },
    headerTextBold: {
        fontWeight:'bold'
    },

    title: {
        fontSize: 30,
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
    stepTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00753E',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 5,
    },
    stepTitleText: {
        fontSize: 15,
        color: '#fff'
    },
    stepTitleTextBold: {
        fontSize: 15,
        color: '#fff',
        fontWeight:'bold'
    },
    productionTitle: {
        fontSize: 15,
        color: '#00753E',
        fontWeight:'bold',
    },
    stepEmpty: {
        padding: 24,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#00753E',
        marginBottom: 16,
        marginTop: -1
    },
    stepEmptyText: {
        fontSize: 20,
        color:'#C3C3C3'
    },
    stepList: {
        marginTop: 8
    },
    step: {
        padding: 24,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#00753E',
        marginBottom: 16,
        marginTop: -1
    },
    biomes: {
        color: '#737380',
        marginBottom: 6
    },
    stepProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    stepValue: {
        maxWidth:"90%",
        fontSize: 15,
        marginBottom: 6,
        color: '#737380',
        fontWeight: 'normal'
    },
    production: {
        marginBottom: 20
    },
    fowardButtonEmpty: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fowardButton: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },

    fowardButtonText: {
        color: '#00753E',
    },
    feather: {
        marginRight: 10
    }
}); 
