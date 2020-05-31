import { AsyncStorage } from 'react-native';

function createUUID() {
  
  async function getData(){
    try{ 
      let jsonValue = await AsyncStorage.getItem('UniqueIDLand');
      return jsonValue != null ? JSON.parse(jsonValue): null;
    } catch(err) {
      console.warn(err)
    }
  }

  async function update(data){
    try{ 

      await AsyncStorage.setItem('UniqueIDLand', JSON.stringify(data));
      return true;
      
    } catch(err) {
      console.warn(err)
      return false;
    }
  }

  async function addFarm() {
    return false;
  }
  
  return {
    getData,
    update,
    addFarm
  }

}

export default createUUID();