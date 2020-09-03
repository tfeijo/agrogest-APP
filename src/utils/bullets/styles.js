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
    },
    stepTitleText: {
        fontSize: 15,
        color: '#131313'
    },
    stepTitleTextBold: {
        fontSize: 15,
        color: '#131313',
        fontWeight:'bold'
    },
    productionTitle: {
        fontSize: 15,
        color: '#00753E',
        fontWeight:'bold',
    },
    stepListEmpty: {
        marginTop: 8,
    },
    stepEmpty: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
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
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },
    biomes: {
        color: '#737380'
    },
    stepProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },
    stepValue: {
        marginTop: 4,
        fontSize: 15,
        marginBottom: 10,
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
}); 
