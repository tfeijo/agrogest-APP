import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    produtionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boxList: {
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight:'bold',
        marginBottom: 10,
        color:'#00753E',
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
