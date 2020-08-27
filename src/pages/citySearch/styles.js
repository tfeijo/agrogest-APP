import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    item : {
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS''
      shadowRadius: 1, //IOS''
      backgroundColor: '#fff',
      elevation: 2, // Android
      height: 50,
      alignItems: 'center',
      flexDirection: 'row',
      // marginTop: Platform.OS == 'ios' ? 30 : 0,
      paddingLeft: 25,
      flex: 1,
  },
  textItem: {
    justifyContent: 'center',
    color: '#00753E',
    fontWeight:'bold',
    fontSize: 15,
  },
  inputStyle: {
    color: "#fff",
    fontWeight: "bold"
  },
  containerStyle : {
    backgroundColor: "#00753E",
    borderWidth: 1,
    borderColor: "#00753E"
    // borderRadius: 5
  }
});