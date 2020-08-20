import { AsyncStorage } from 'react-native';
import api from '../services/api';
import createControl from './createControl';

function createLand() {
  
  async function getData(){
    try{ 
      const jsonValue = await AsyncStorage.getItem('land');
      if (jsonValue != null) {
          let jsonValueParsed = JSON.parse(jsonValue);
          try {
            let response = await api.get(`farms/${jsonValueParsed.id}`)
            if (response.status != 200) return clean();
            return response.data;
          } catch(err) {
            console.log(err)
            return clean();
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
      "productions": {}
    }
  }
  
  return {
    getData,
    update,
    clean
  }
}

export default createLand();