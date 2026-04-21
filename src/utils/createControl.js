import AsyncStorage from '@react-native-community/async-storage';


const STORAGE_KEY = 'control';

const defaultControl = () => ({
  boolCaracterization: false,
  boolProduction: false,
  boolLegislation: false,
  boolWaterResource: false,
  boolSoilVegetation: false,
  boolWasteManagement: false,
});

async function getData() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultControl();
  } catch (err) {
    console.warn('[createControl.getData]', err);
    return defaultControl();
  }
}

async function update(data) {
  if (data == null) return false;
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.warn('[createControl.update]', err);
    return false;
  }
}

async function clean() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.warn('[createControl.clean]', err);
    return false;
  }
}

const createControl = { getData, update, clean };
export default createControl;
