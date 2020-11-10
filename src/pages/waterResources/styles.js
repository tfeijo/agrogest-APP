import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  tipsTitle: {
    fontSize: 15,
    color: '#131313',
    fontWeight:'bold',
    marginBottom: 20
  },
  option: {
    fontSize: 15,
    color: '#131313',
    marginLeft: 20
  },
  containerOption : {
      paddingBottom: 15,
      borderColor: '#A3A3A3',
      borderBottomWidth: 1
  },
  flexViewOption : {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    marginLeft: 15
  },
  caption: {
    fontSize: 15,
    color: '#131313',
    maxWidth: '80%'
  },
  flexView : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 10,
    borderColor: '#A3A3A3',
    borderBottomWidth: 1
},
Button: {
  marginTop: 50,
  height: 45,
  backgroundColor:'#00753E',
  borderRadius: 8,
  flexDirection: 'row',
  justifyContent:'center',
  alignItems: 'center',
  marginBottom: 30

},
ButtonText: {
  color:'#fff',
  fontSize:20
},
congratulation: {
  marginTop: 50
}
})