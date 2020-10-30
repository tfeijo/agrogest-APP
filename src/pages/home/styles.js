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
    trashFarm: {
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 4
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
    stepList: {
        marginTop: 8
    },
    Button: {
        marginTop: 50,
        height: 60,
        backgroundColor:'#00753E',
        borderRadius: 32,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 60
    
      },
      ButtonText: {
        color:'#fff',
        fontSize:20
      },
}); 
