import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import createControl from './createControl';
import UniqueID from './createUniqueIDFarm';


const STORAGE_KEY = 'land';

const emptyLand = () => ({
  id: null,
  installation_id: null,
  hectare: null,
  licensing: null,
  city: { biomes: [], state: {} },
  size: null,
  productions: {},
});

async function clean() {
  await createControl.clean();
  return emptyLand();
}

async function update(data) {
  if (data == null) return false;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('[createLand.update]', err);
    return false;
  }
}

async function getData() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue == null) return clean();

    const parsed = JSON.parse(jsonValue);

    try {
      const response = await api.get(`farms/${parsed.id}`);
      return response.data;
    } catch (err) {
      // Farm missing on the backend; try to recreate and persist the fresh copy.
      try {
        const installationId = await UniqueID.getData();
        const payload = {
          id: parsed.id,
          installation_id: installationId,
          hectare: parsed.hectare,
          licensing: parsed.licensing,
          city_id: parsed.city?.id,
        };
        const response = await api.post('farms', payload);
        await update(response.data);
        return response.data;
      } catch (postErr) {
        console.warn('[createLand.getData] recreate failed', postErr);
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[createLand.getData]', err);
    return clean();
  }
}

const createLand = { getData, update, clean };
export default createLand;
