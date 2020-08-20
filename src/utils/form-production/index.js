import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  Switch,
  ActivityIndicator
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
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
      bovi_leite: {
        enabled: false,
        activity_id: 1,
        system_id: null,
        head_animals: null,
        area_size: null
      },
      bovi_corte: {
        enabled: false,
        activity_id: 1,
        system_id: null,
        head_animals: null,
        area_size: null
      },
      avicultura: {
        enabled: false,
        activity_id: 1,
        system_id: null,
        head_animals: null,
        area_size: null
      },
      suinocultura: {
        enabled: false,
        activity_id: 1,
        system_id: null,
        head_animals: null,
        area_size: null
      },
      agricultura: {
        enabled: false,
        activity_id: 1,
        system_id: null,
        handling_id:null,
        area_size: null
      },
    },
    validateOnChange: false,
    // validationSchema: Yup.object().shape({
    //   bovi_corte: {
    //     activity_id:Yup.number()
    //     .required('Preencha o estado.')
    //     .lessThan(9999, 'Preencha o estado.'),
    //   }
    // }),
    handleSubmit: () => {},
    onSubmit: async (values, { setSubmitting, setErrors}) => {
  
      UniqueID.getData()
      .then(response => {
        values.installation_id = response
      })

      const farm = await createLand.getData();

      api.post(`farms/${farm.id}/productions`, values)
      .then(response => {
        newProductions = response.data;
        console.log(newProductions);
        // createLand.update({
        // ...createLand.getData,
        // "productions": newProductions,
        // });
        // UniqueID.update(newLand.installation_id);
        // createControl.update({
        //   ...createControl.getData(),
        //   'boolProduction': true
        // })
        setSubmitting(false);
        // navigation.goBack()
      })
      .catch(err => {
        setSubmitting(false);
        // setErrors({ message: err.message });
      });
    },
  });

  const [enableSystem, setEnableSystem] = useState(false);
  const [leite_system, setLeitesystem] = useState([]);
  const [corte_system, setCortesystem] = useState([]);
  const [suino_system, setSuinosystem] = useState([]);
  const [ave_system, setAvesystem] = useState([]);
  const [agri_system, setAgrisystem] = useState([]);
  const [agri_handling, setAgrihandling] = useState([]);


  
  const list = [true]
  
  let items_leite_system = leite_system.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  let items_corte_system = corte_system.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  let items_suino_system = suino_system.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  let items_ave_system = ave_system.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  let items_agri_system = agri_system.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  let items_agri_handling = agri_handling.map( (system) => {
    return <Picker.Item
                key={system.id} value={system.id} label={system.name} />
  });
  
  const bovi_leite_form = list.map(() => { 

    if(formik.values.bovi_leite.enabled){ 
      return (
        <View style={styles.boxList}>
         
          <Text style={styles.title}>BOVINOCULTURA DE LEITE</Text>
            <Text style={styles.caption}>
                Qual sistema?
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.bovi_leite.system_id}
              onValueChange={(itemValue, itemIndex) => {
                let bovi_leite = formik.values.bovi_leite;
                formik.setFieldValue('bovi_leite', {
                  ...bovi_leite,
                  system_id: itemValue
                })
              }}
            >
                {items_leite_system}
            </Picker>

            <Text style={styles.caption}>
              Qual a área disponível para o sistema?
            </Text>
            <TextInput  
              name='size'
              onChangeText={number => {
                let bovi_leite = formik.values.bovi_leite;
                formik.setFieldValue('bovi_leite', {
                  ...bovi_leite,
                  area_size: number
                })
              }}
              placeholder="Hectares (ha)"
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />

            <Text style={styles.caption}>
              Quantas cabeças de bovino?
            </Text>
            <TextInput  
              name='head_animals'
              onChangeText={number => {
                let bovi_leite = formik.values.bovi_leite;
                formik.setFieldValue('bovi_leite', {
                  ...bovi_leite,
                  area_size: number
                })
              }}
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
        </View>
      )
    } else {
      return (<></>)
    };
  });

  const bovi_corte_form = list.map(() => { 
    if(formik.values.bovi_corte.enabled){ 
      return (
        <View style={styles.boxList}>
         
          <Text style={styles.title}>BOVINOCULTURA DE CORTE</Text>
            <Text style={styles.caption}>
                Qual sistema?
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.bovi_corte.system_id}
              onValueChange={(itemValue, itemIndex) => {
                let bovi_corte = formik.values.bovi_corte;
                formik.setFieldValue('bovi_corte', {
                  ...bovi_corte,
                  system_id: itemValue
                })
              }}
            >
                {items_corte_system}
            </Picker>
            <Text style={styles.caption}>
              Qual a área disponível para o sistema?
            </Text>
            <TextInput  
              name='size'
              onChangeText={number => {
                let bovi_corte = formik.values.bovi_corte;
                formik.setFieldValue('bovi_corte', {
                  ...bovi_corte,
                  area_size: number
                })
              }}
              placeholder="Hectares (ha)"
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
            <Text style={styles.caption}>
              Quantas cabeças de bovino?
            </Text>
            <TextInput  
              name='head_animals'
              onChangeText={number => {
                let bovi_corte = formik.values.bovi_corte;
                formik.setFieldValue('bovi_corte', {
                  ...bovi_corte,
                  head_animals: number
                })
              }}
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
        </View>
      )
    } else {
      return (<></>)
    };
  });
  
  const suinocultura_form = list.map(() => { 
    if(formik.values.suinocultura.enabled){ 
      return (
        <View style={styles.boxList}>
         
          <Text style={styles.title}>SUINOCULTURA</Text>
          <Text style={styles.caption}>
                Qual sistema?
              { formik.errors.city_id && 
                <Text style={styles.err}>
                  {formik.errors.city_id}
                </Text> 
              }
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.suinocultura.system_id}
              onValueChange={(itemValue, itemIndex) => {
                let suinocultura = formik.values.suinocultura;
                formik.setFieldValue('suinocultura', {
                  ...suinocultura,
                  system_id: itemValue
                })
              }}
            >
                {items_suino_system}
            </Picker>
            <Text style={styles.caption}>
              Qual a área disponível para o sistema?
              
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
              Quantas cabeças de suíno?
              
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
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
        </View>
      )
    } else {
      return (<></>)
    };
  });

  const avicultura_form = list.map(() => { 
    if(formik.values.avicultura.enabled){ 
      return (
        <View style={styles.boxList}>
         
          <Text style={styles.title}>AVICULTURA</Text>
            <Text style={styles.caption}>
                Qual sistema?
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.avicultura.system_id}
              onValueChange={(itemValue, itemIndex) => {
                let avicultura = formik.values.avicultura;
                formik.setFieldValue('avicultura', {
                  ...avicultura,
                  system_id: itemValue
                })
              }}
            >
                {items_ave_system}
            </Picker>
            <Text style={styles.caption}>
              Qual a área disponível para o sistema?
            </Text>
            <TextInput  
              name='size'
              onChangeText={number => {
                let avicultura = formik.values.avicultura;
                formik.setFieldValue('avicultura', {
                  ...avicultura,
                  area_size: number
                })
              }}
              placeholder="Hectares (ha)"
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
            <Text style={styles.caption}>
              Quantas cabeças de aves?
              
              { formik.errors.hectare && 
                <Text style={styles.err}>
                  {formik.errors.hectare}
                </Text> }
            </Text>
            <TextInput  
              name='head_animals'
              onChangeText={number => {
                let avicultura = formik.values.avicultura;
                formik.setFieldValue('avicultura', {
                  ...avicultura,
                  head_animals: number
                })
              }}
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
        </View>
      )
    } else {
      return (<></>)
    };
  });

  const agricultura_form = list.map(() => { 
    if(formik.values.agricultura.enabled){ 
      return (
        <View style={styles.boxList}>
         
          <Text style={styles.title}>AGRICULTURA</Text>
            <Text style={styles.caption}>
                Qual tipo de sistema?
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.agricultura.system_id}
              onValueChange={async (itemValue, itemIndex) => {
                let agricultura = formik.values.agricultura;
                formik.setFieldValue('agricultura', {
                  ...agricultura,
                  system_id: itemValue
                })
                const { data } = await api
                .get(`production/systems/${agricultura.system_id}/handling`);

                data.unshift({'id':9999, 'name': 'Selecione um tipo de manuseio'});
                setAgrihandling(data)
              }}
            >
                {items_agri_system}
            </Picker>           
            
            <Text style={styles.caption}>
                Qual tipo de manuseio?
            </Text>
            <Picker
              style={styles.picker}
              selectedValue={formik.values.agricultura.system_id}
              onValueChange={(itemValue, itemIndex) => {
                let agricultura = formik.values.agricultura;
                formik.setFieldValue('agricultura', {
                  ...agricultura,
                  handling_id: itemValue
                })
              }}
            >
                {items_agri_handling}
            </Picker>
            <Text style={styles.caption}>
              Qual a área disponível para o sistema?
            </Text>
            <TextInput  
              name='size'
              onChangeText={number => {
                let agricultura = formik.values.agricultura;
                formik.setFieldValue('agricultura', {
                  ...agricultura,
                  area_size: itemValue
                })
              }}
              placeholder="Hectares (ha)"
              style={styles.NumberInputStyle}
              keyboardType={'numeric'}
            />
        </View>
      )
    } else {
      return (<></>)
    };
  });
  
  return (<View style={styles.container}>
      <Text style={styles.caption}>
        Quais sistemas de produção de sua propriedade?
        { formik.errors.state_id && 
        <Text style={styles.err}>
          {formik.errors.state_id}
        </Text> 
      }
      </Text>
      <View style={styles.boxList}>
        <View style={styles.produtionItem}>
          <Text>
            Bovinocultura de leite
          </Text>
          <Switch 
            style={{ marginTop: -25} }
            onValueChange = {async (text) => {
              let bovi_leite = formik.values.bovi_leite;
              formik.setFieldValue('bovi_leite', {
                ...bovi_leite,
                enabled: text
              })
              const { data } = await api
                .get(`production/activities/${bovi_leite.activity_id}/system`);

              data.unshift({'id':9999, 'name': 'Selecione um tipo de sistema'});
              setLeitesystem(data);
            }}
            value = {formik.values.bovi_leite.enabled}
          />
        </View>
        <View style={styles.produtionItem}>
          <Text>
            Bovinocultura de corte
          </Text>
          <Switch 
            style={{ marginTop: -25} }
            onValueChange = {async (text) => {
              let bovi_corte = formik.values.bovi_corte;
              formik.setFieldValue('bovi_corte', {
                ...bovi_corte,
                enabled: text
              })
              const { data } = await api
                .get(`production/activities/${bovi_corte.activity_id}/system`);

              data.unshift({'id':9999, 'name': 'Selecione um tipo de sistema'});
              setCortesystem(data);
            }}
            value = {formik.values.bovi_corte.enabled}
          />
        </View>
        <View style={styles.produtionItem}>
          <Text>
            Suinocultura
          </Text>
          <Switch 
            style={{ marginTop: -25} }
            onValueChange = {async (text) => {
              let suinocultura = formik.values.suinocultura;
              formik.setFieldValue('suinocultura', {
                ...suinocultura,
                enabled: text
              })
              const { data } = await api
                .get(`production/activities/${suinocultura.activity_id}/system`);

              data.unshift({'id':9999, 'name': 'Selecione um tipo de sistema'});
              setSuinosystem(data);
            }}
            value = {formik.values.suinocultura.enabled}
          />
        </View>
        <View style={styles.produtionItem}>
          <Text>
            Avicultura
          </Text>
          <Switch 
            style={{ marginTop: -25} }
            onValueChange = {async (text) => {
              let avicultura = formik.values.avicultura;
              formik.setFieldValue('avicultura', {
                ...avicultura,
                enabled: text
              })
              const { data } = await api
                .get(`production/activities/${avicultura.activity_id}/system`);

              data.unshift({'id':9999, 'name': 'Selecione um tipo de sistema'});
              setAvesystem(data);
            }}
            value = {formik.values.avicultura.enabled}
          />
        </View>
        <View style={styles.produtionItem}>
          <Text>
            Agricultura
          </Text>
          <Switch 
            style={{ marginTop: -25} }
            onValueChange = {async (text) => {
              let agricultura = formik.values.agricultura;
              formik.setFieldValue('agricultura', {
                ...agricultura,
                enabled: text
              })
              const { data } = await api
                .get(`production/activities/${agricultura.activity_id}/system`);

              data.unshift({'id':9999, 'name': 'Selecione um tipo de sistema'});
              setAgrisystem(data);
            }}
            value = {formik.values.agricultura.enabled}
          />
        </View>
      </View>
      
      { bovi_leite_form }
      { bovi_corte_form }
      { suinocultura_form }
      { avicultura_form }
      { agricultura_form }
      

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