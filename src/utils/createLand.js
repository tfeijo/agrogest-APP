import { AsyncStorage } from 'react-native';
import api from '../services/api';

function createLand() {
  
  async function getData(){
    try{ 
      let jsonValue = await AsyncStorage.getItem('land');
      
      if (jsonValue != null) {
        try {
          jsonValue = JSON.parse(jsonValue);
          let { data } = await api.get(`lands/${jsonValue.id}`)
          return data;
        } catch(err) {
          console.warn(err);
          return JSON.parse(jsonValue);
        }
      } else {
        return clean()
      }
    } catch(err) {
      console.warn(err)
    }
  }

  async function update(data = null){
    try{ 
      if (data != null) {
        console.log(JSON.stringify(data));
        await AsyncStorage.setItem('land', JSON.stringify(data));
        return true
      }
      return false;
    } catch(err) {
      console.warn(err)
      return false;
    }
  }

  async function clean(){
    return {
      "id": null,
      "installation_id": null,
      "hectare": null,
      "licensing": null,
      "city": {
        "biomes":[],
        "state": {}
      },
      "size": null,
    }
  }
  
  return {
    getData,
    update,
    clean
  }
}

export default createLand();