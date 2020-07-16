import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Switch,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Yup from 'yup';

import api from '../../services/api';
import styles from './styles';
import createLand from '../createLand';
import createControl from '../createControl';
import UniqueID from '../createUniqueIDLand';

export default function Form(props) {
  
  const navigation = useNavigation();
  
  const formik = useFormik({
    initialValues: {
      state_id: 9999,
      city_id: 9999,
      hectare: 1,
      licensing: false,
      installation_id: null,
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      state_id: Yup.number()
        .required('Preencha o estado.')
        .lessThan(9999, 'Preencha o estado.'),
      city_id: Yup.number()
        .required('Preencha a cidade.')
        .lessThan(9999, 'Preencha a cidade.'),
        
      hectare: Yup.number()
        .positive('O número deve ser positivo.')
        .required('Preencha o tamanho da propriedade.')
        .moreThan(0, 'O número deve ser maior que 0.')
    }),
    handleSubmit: () => {},
    onSubmit: async (values, { setSubmitting, setErrors}) => {
      var newLand = null;
  
      UniqueID.getData()
      .then(response => {
        values.installation_id = response
      })
     
      api.post('farms', values)
      .then(response => {
        newLand = response.data;
        createLand.update(newLand);
        setSubmitting(true);
        UniqueID.update(newLand.installation_id);
        createControl.update({
          ...createControl.getData(),
          'boolCaracterization': true
        })
        setSubmitting(false);
        navigation.goBack()
      })
      .catch(err => {
        setSubmitting(false);
        setErrors({ message: err.message });
      });
    },
  });

  const [enableCity, setenableCity] = useState(false);
  const [isLoading,setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  async function loadCities(state){
    const { data } = await api.get(`states/${state}/cities`);
    data.unshift({'id':9999, 'name': 'Selecione uma cidade'});
    setCities(data);
    setenableCity(true);
    return data;
  }
  
  async function getInfo(){
    try {
      const {data:stateList} = await api.get('/states')|| [];
      stateList.unshift({'id':9999, 'name': 'Selecione um estado'});
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
  (<AppLoading
    startAsync={getInfo}
    onFinish={() => setLoading(false)}
    onError={console.warn}
  />)
  :
    (<View style={styles.container}>
      <Text style={styles.caption}>
        Selecione o estado:
        { formik.errors.state_id && 
        <Text style={styles.err}>
          {formik.errors.state_id}
        </Text> 
      }
      </Text>
        <Picker
        style={styles.picker}
        selectedValue={formik.values.state_id}
        onValueChange={(itemValue, itemIndex) => {
          loadCities(itemValue)
          formik.setFieldValue('city_id', 9999)
          formik.setFieldValue('state_id', itemValue)
        }}
      >
          {stateItems}
      </Picker>
      <Text style={styles.caption}>
        Selecione a cidade:
      { formik.errors.city_id && 
        <Text style={styles.err}>
          {formik.errors.city_id}
        </Text> 
      }
      </Text>
      <Picker
        style={styles.picker}
        selectedValue={formik.values.city_id}
        onValueChange={(itemValue, itemIndex) => {
          formik.setFieldValue('city_id', itemValue)
        }}
        enabled={enableCity}
        >
          {cityItems}
      </Picker>
      <Text style={styles.caption}>
        Tamanho da propriedade (ha):
        
        { formik.errors.hectare && 
          <Text style={styles.err}>
            {formik.errors.hectare}
          </Text> }
      </Text>
      <TextInput  
        name='size'
        onChangeText={number => {
          formik.setFieldValue('hectare', number)
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
          formik.setFieldValue('licensing', text)
        }}
        value = {formik.values.licensing}
        />

      <TouchableOpacity
        style={styles.Button}
        onPress={formik.handleSubmit}
        >
        { 
          formik.isSubmitting ? 
          <ActivityIndicator color='#fff' size= 'large' />
          :
          <Text style={styles.ButtonText}>Salvar</Text>
        }
       
      </TouchableOpacity>
      { formik.errors.message && <Text>{formik.errors.message}</Text> }
      
  </View>)

}