import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
      flex:1,
      paddingHorizontal: 24,
      paddingTop: Constants.statusBarHeight + 20,
  },
  fowardButtonEmpty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'  
  },
  header : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  },
})