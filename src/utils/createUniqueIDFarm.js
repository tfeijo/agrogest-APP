import AsyncStorage from '@react-native-community/async-storage';


const STORAGE_KEY = 'UniqueIDFarm';

async function getData() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.warn('[createUniqueIDFarm.getData]', err);
    return null;
  }
}

async function update(data) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('[createUniqueIDFarm.update]', err);
    return false;
  }
}

async function addFarm() {
  return false;
}

const createUniqueIDFarm = { getData, update, addFarm };
export default createUniqueIDFarm;
