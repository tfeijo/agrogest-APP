import { AsyncStorage } from 'react-native';
import api from '../services/api';
import createControl from './createControl';

function createLand() {
  
  async function getData(){
    try{ 
      const jsonValue = await AsyncStorage.getItem('land');
      
      if (jsonValue != null) {
        try {
          let jsonValueParsed = JSON.parse(jsonValue);
          let { data } = await api.get(`lands/${jsonValueParsed.id}`)
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
    let control = createControl;
    
    await control.clean();

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