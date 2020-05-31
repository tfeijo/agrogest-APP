import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Switch
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import React, { useState } from 'react';
import { withFormik } from 'formik';
import { AppLoading } from 'expo';

import api from '../../services/api';
import styles from './styles';


function Form(props) {
  
  const [enableCity, setenableCity] = useState(false);
  const [isLoading,setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);


  async function loadCities(state){
    const { data } = await api.get(`cities/state/${state}`);
    data.unshift({'id':1111, 'name': 'Selecione uma cidade'});
    setCities(data);
    setenableCity(true);
    return data;
  }
  
  async function getInfo(){
    try {
      const {data:stateList} = await api.get('/states')|| [];
      stateList.unshift({'id':1111, 'name': 'Selecione um estado'});
      setStates(stateList);
    } catch(err) {
      console.warn(err);
    }
  }

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
    <View style={styles.container}>
      <Text style={styles.caption}>Selecione o estado: </Text>
      <Picker
        style={styles.picker}
        selectedValue={props.values.state_id}
        onValueChange={(itemValue, itemIndex) => {
          loadCities(itemValue)
          props.setFieldValue('city_id', 1111)
          props.setFieldValue('state_id', itemValue)
        }}
      >
          {stateItems}
      </Picker>
      <Text style={styles.caption}>Selecione a cidade: </Text>
      <Picker
        style={styles.picker}
        selectedValue={props.values.city_id}
        onValueChange={(itemValue, itemIndex) => {
          props.setFieldValue('city_id', itemValue)
        }}
        enabled={enableCity}
      >
          {cityItems}
      </Picker>
      <Text style={styles.caption}>
        Tamanho da propriedade (ha):
      </Text>
      <TextInput  
        name='size'
        onChangeText={number => {
          props.setFieldValue('hectare', number)
        }}
        placeholder="Hectares (ha)"
        style={styles.NumberInputStyle}
        keyboardType={'numeric'}
      />
      <Text style={styles.caption}>
        A propriedade rural já é licenciada?
      </Text>
      <Switch 
        style={{marginTop:-25}}
        onValueChange = {text => {
          props.setFieldValue('licensing', text)
        }}
        value = {props.values.licensing}
      />
      <TouchableOpacity
        style={styles.Button}
        onPress={props.handleSubmit}
      >
        <Text style={styles.ButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  </>
};

export default withFormik({
  mapPropsToValues: () => ({
    state_id: 1111,
    city_id: 1111,
    hectare: '',
    licensing: '',
  }),
  
  handleSubmit: (values) => {
    console.log(values);
  }

})(Form);