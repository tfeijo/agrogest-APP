import { AsyncStorage } from 'react-native';

function createControl() {
  
  async function getData(){
    try{ 
      let jsonValue = await AsyncStorage.getItem('control');
      
      return jsonValue != null ? JSON.parse(jsonValue): {
        boolCaracterization : false,
        boolProduction : false,
        boolLegislation :  false,
        boolWaterResource :  false,
        boolSoilVegetation : false,
        boolWasteManagement :  false,
      } 
    } catch(err) {
      console.warn(err)
    }
  }


  async function update(data = null){
    try{ 
      if (data != null) {
        let jsonValue = await AsyncStorage.setItem('control', JSON.stringify(data));
        return true
      }
      return false;
    } catch(err) {
      console.warn(err)
      return false;
    }
  }

  async function clean(){
    try{
      await AsyncStorage.removeItem('control');
      return true;
    } catch (err) {
      return false;
    }
  }
  
  return {
    getData,
    update,
    clean
  }

}

export default createControl();