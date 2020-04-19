import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
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
});