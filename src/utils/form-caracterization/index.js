import React, { useState } from 'react';
import { 
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import api from '../../services/api';
import createLand from '../createLand';
import createControl from '../createControl';
import createCaracterization from '../createCaracterization';
import createUID from '../createUniqueIDLand';


export default function FormCaracterization(props) {
  const [isLoading,setLoading] = useState(true);
  const [landData, setLand] = useState(null);
  const [UniqueID, setUID] = useState(null);
  const [controlData, setControl] = useState(null);
  const [enableCity, setenableCity] = useState(false);
  const [caracData, setCarac] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const navigator = useNavigation();

  let stateItems = states.map( (state) => {
    return <Picker.Item
                key={state.id} value={state.id} label={state.name} />
  });
  
  let cityItems = cities.map( (city) => {
    return <Picker.Item
                key={city.id} value={city.id} label={city.name} />
  });

  return isLoading === true ?
  <AppLoading
    startAsync={getInfo}
    onFinish={() => setLoading(false)}
    onError={console.warn}
  />
  :
  <>
    <Text style={styles.caption}>Selecione o estado: </Text>
    <Picker
        style={styles.picker}
        selectedValue={caracData.state_id}
        onValueChange={(itemValue, itemIndex) => loadCities(itemValue)}
    >
        {stateItems}
    </Picker>

    <Text style={styles.caption}>Selecione a cidade: </Text>
    <Picker
        style={styles.picker}
        selectedValue={caracData.city_id}
        onValueChange={(itemValue, itemIndex) => {}}
        enabled={enableCity}
    >
        {cityItems}
    </Picker>

    <Text style={styles.caption}>
        Tamanho da propriedade (ha):
    </Text>
    <TextInput  
        name='size'
        onChangeText={text => {}}
        placeholder="Hectares (ha)"
        style={styles.NumberInputStyle}
        keyboardType={'numeric'}
    />

    <Text style={styles.caption}>
        A propriedade rural já é licenciada?
    </Text>
        <Switch 
        style={{marginTop:-25}}
            onValueChange = {value => {}}
            value = {caracData.licensing}
        />
    <TouchableOpacity
    
        style={styles.Button}
        onPress={() => {
              if(false){
                  Alert.alert(
                      'Atenção',
                      'Preencha todos os dados antes de salvar.',
                      [
                        { 
                          text: 'OK',
                          onPress: () => console.log('OK Pressed')
                        },
                      ],
                      { cancelable: false }
                  );
              } else {
                  navigator.goBack();
              }
          }
        }
    >
        <Text style={styles.ButtonText}>Salvar</Text>
    </TouchableOpacity>
  </>
  async function loadCities(state){
    const { data } = await api.get(`cities/state/${state}`);
    setCities(data);
    setenableCity(true);
    return data;
  }

  async function getInfo(){
    const {data:stateList} = await api.get('/states')|| [];
    try {
        stateList.push({'id':999, 'name': 'Selecione um estado'});
        setStates(stateList);
        setControl(await createControl.getData());
        setLand(await createLand.getData());
        setUID(await createUID.getData());
        setCarac(await createCaracterization.getData());
    } catch(err) {
        console.warn(err);
    }
  }
}

   
