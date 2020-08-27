import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo';
import * as Yup from 'yup';
import api from '../../services/api';
import styles from './styles';
import createLand from '../createLand';
import createControl from '../createControl';
import UniqueID from '../createUniqueIDLand';
import { useIsFocused } from '@react-navigation/native';

export default function Form( props ) {
  const navigator = useNavigation();
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
    onSubmit: async (values, {setSubmitting, setErrors}) => {
      
      var newLand = null;
  
      UniqueID.getData()
      .then(response => {
        values.installation_id = response
      })

      setSubmitting(true);
      await AsyncStorage.removeItem('city')
      await api.post('farms', values)
      .then(response => {
        newLand = response.data;
        createLand.update(newLand);
        UniqueID.update(newLand.installation_id);
        createControl.update({
          ...createControl.getData(),
          'boolCaracterization': true
        })
        navigator.goBack()
      })
      .catch(err => {
        setSubmitting(false);
        setErrors({ message: err.message });
      });
      setSubmitting(false);
    },
  });
  const isFocused = useIsFocused();
  const [isLoading,setLoading] = useState(true);
  const [states, setStates] = useState([]);
  const [city, setCity] = useState({});

  async function loadCities(state){
    const { data } = await api.get(`states/${state}/cities`);
    navigator.navigate("CitySearch", { cities : data })
    return data;
  }
  
  async function getInfo(){
    try {
      const {data:stateList} = await api.get('/states')|| [];
      stateList.unshift({'id':9999, 'name': 'Selecione um estado'});
      let stateItems = stateList.map((state) => {
        return (<Picker.Item
          key={state.id} value={state.id} label={state.name} />)
      });
      setStates(stateItems);
    } catch(err) {
      console.log(err);
    }
  }
  async function getCity(){
    let jsonValue = JSON.parse(await AsyncStorage.getItem('city'))
    if (jsonValue != null){
      setCity(jsonValue)
      formik.setFieldValue('city_id', jsonValue.id)
    } else {
      await AsyncStorage.removeItem('city')
      setCity({'name':'-'})
    }
  }
  
  useEffect(() => {
    async function asyncFunction(){
      await getCity();
    }
    asyncFunction();
  }, [isFocused])

  useEffect(() => {
    setCity({'name':'-'})
  }, [])
   
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
        textStyle={styles.pickerItem}
        selectedValue={formik.values.state_id}
        onValueChange={(itemValue) => {
          loadCities(itemValue)
          formik.setFieldValue('state_id', itemValue)
        }}
      >
          {states}
      </Picker>
      <Text style={styles.caption}>
        Cidade:
      { formik.errors.city_id && 
        <Text style={styles.err}>
          {formik.errors.city_id}
        </Text> 
      }
      </Text>
      <View style={ styles.cityView}>
        <Text style={styles.city}>{city.name}</Text>
      </View>
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
        returnKeyType={ 'done' }
        />
      <View style={styles.flexView}>
        <Text style={styles.caption}>
          A propriedade rural já é licenciada?
        </Text>
        <Switch 
          onValueChange = {text => {
            formik.setFieldValue('licensing', text)
          }}
          value = {formik.values.licensing}
          />
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={formik.handleSubmit}
        >
        {
          formik.isSubmitting ? 
          <><Text style={styles.ButtonText}>Salvando </Text>
          <ActivityIndicator color='#fff' size= 'large' /></>
          :
          <Text style={styles.ButtonText}>Salvar</Text>
        }
       
      </TouchableOpacity>
      { formik.errors.message && <Text>{formik.errors.message}</Text> }
      
  </View>)

}