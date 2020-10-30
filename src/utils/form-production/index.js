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
import React from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createLand from '../createLand';
import createControl from '../createControl';
import api from '../../services/api';
import styles from './styles';
export default function Form(props) {
  
  const navigation = useNavigation();
  const control = createControl
  const formik = useFormik({
    initialValues: {
      farm_id:null,
      bovi_leite: {
        enabled: false,
        activity : "bovinocultura de leite",
        num_animals : null,
        handling : null,
        num_area : null
      },
      bovi_corte: {
        enabled: false,
        activity : "bovinocultura de corte",
        num_animals : null,
        handling : null,
        num_area : null
      },
      avicultura: {
        enabled: false,
        activity : "avicultura",
        num_animals : null,
        handling : null,
        num_area : null
      },
      suinocultura: {
        enabled: false,
        activity : "suinocultura",
        num_animals : null,
        handling : null,
        num_area : null,
      },
      agricultura: {
        enabled: false,
        activity : "agricultura",
        handling : null,
        num_area : null,
        cultivation: null
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
    handleSubmit: ()=>{

    },
    onSubmit: async (values, { setSubmitting, setErrors}) => {

      let productions = []
      let JSONcontrol = JSON.parse(await AsyncStorage.getItem('control'))
      let productionControl = JSONcontrol.productions
      
      setSubmitting(true);

      
      if (values.bovi_corte.enabled) {
        productions.push(values.bovi_corte)
        productionControl = {
          ...productionControl,
          bovi_corte: true
        }
      }
      if (values.bovi_leite.enabled) {
        productions.push(values.bovi_leite)
        productionControl = {
          ...productionControl,
          bovi_leite: true
        }
      }
      if (values.avicultura.enabled) {
        productions.push(values.avicultura)
        productionControl = {
          ...productionControl,
          avicultura: true
        }
      }
      if (values.suinocultura.enabled) {
        productions.push(values.suinocultura)
        productionControl = {
          ...productionControl,
          suinocultura: true
        }
      }
      if (values.agricultura.enabled) {
        productions.push(values.agricultura)
        productionControl = {
          ...productionControl,
          agricultura: true
        }
      }
      let jsonValue = JSON.parse(await AsyncStorage.getItem('land'))

      await api.post('productions', {
        productions,
        farm_id: jsonValue.id,
      })
      .then(async response => {
        await createLand.update({
          ...jsonValue,
          productions: response.data
        })

        await control.update({
          ...JSONcontrol,
          'boolProduction': true,
          'boolWasteManagement': false,
          productions: productionControl
        })

        navigation.goBack()
      })
      .catch(err => {
        setSubmitting(false);
        setErrors({ message: err.message });
      });
      setSubmitting(false);
    },
  });

 
  const bovi_leite_form = formik.values.bovi_leite.enabled? (
  <View style={styles.activityBox}>
    <Text style={styles.caption}>Qual manejo aplicado?</Text>
    <Picker style={styles.picker}
      selectedValue={formik.values.bovi_leite.handling}
      onValueChange={(itemValue, itemIndex) => {
        let bovi_leite = formik.values.bovi_leite;
        formik.setFieldValue('bovi_leite', {
          ...bovi_leite,
          handling: itemValue
        })
      }}
    >
      <Picker.Item value={9999} label={"Selecione um manejo"} />
      <Picker.Item value={"a pasto"} label={"A pasto"} />
      <Picker.Item value={"confinado"} label={"Confinado"} />
      <Picker.Item value={"semiconfinado"} label={"Semiconfinado"} />
    </Picker>
    <Text style={styles.caption}>
      Qual a área disponível para o sistema?
    </Text>
    <TextInput name='leite_num_area'
      onChangeText={number => {
        let bovi_leite = formik.values.bovi_leite;
        formik.setFieldValue('bovi_leite', {
          ...bovi_leite,
          num_area: number
        })
      }}
      placeholder="Hectares (ha)"
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
    <Text style={styles.caption}>
      Quantas cabeças de bovino?
    </Text>
    <TextInput  
      name='leite_num_animals'
      onChangeText={number => {
        let bovi_leite = formik.values.bovi_leite;
        formik.setFieldValue('bovi_leite', {
          ...bovi_leite,
          num_animals: number
        })
      }}
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
  </View>) : (<></>)

  const bovi_corte_form = formik.values.bovi_corte.enabled? (
  <View style={styles.activityBox}>
    <Text style={styles.caption}>Qual manejo aplicado?</Text>
    <Picker style={styles.picker}
      selectedValue={formik.values.bovi_corte.handling}
      onValueChange={(itemValue, itemIndex) => {
        let bovi_corte = formik.values.bovi_corte;
        formik.setFieldValue('bovi_corte', {
          ...bovi_corte,
          handling: itemValue
        })
      }}
    >
    <Picker.Item value={9999} label={"Selecione um manejo"} />
    <Picker.Item value={"a pasto"} label={"A pasto"} />
    <Picker.Item value={"confinado"} label={"Confinado"} />
    <Picker.Item value={"semiconfinado"} label={"Semiconfinado"} />
    </Picker>
    <Text style={styles.caption}>
      Qual a área disponível para o sistema?
    </Text>
    <TextInput name='corte_num_area'
      onChangeText={number => {
        let bovi_corte = formik.values.bovi_corte;
        formik.setFieldValue('bovi_corte', {
          ...bovi_corte,
          num_area: number
        })
      }}
      placeholder="Hectares (ha)"
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
    <Text style={styles.caption}>
      Quantas cabeças de bovino?
    </Text>
    <TextInput  
      name='corte_num_animals'
      onChangeText={number => {
        let bovi_corte = formik.values.bovi_corte;
        formik.setFieldValue('bovi_corte', {
          ...bovi_corte,
          num_animals: number
        })
      }}
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
  </View>) : (<></>)

  const suinocultura_form = formik.values.suinocultura.enabled? (
  <View style={styles.activityBox}>
    <Text style={styles.caption}>Qual manejo aplicado?</Text>
    <Picker style={styles.picker} 
      selectedValue={formik.values.suinocultura.handling}
      onValueChange={(itemValue, itemIndex) => {
        let suinocultura = formik.values.suinocultura;
        formik.setFieldValue('suinocultura', {
          ...suinocultura,
          handling: itemValue
        })
      }}
    >
    <Picker.Item value={9999} label={"Selecione um manejo"} />
    <Picker.Item value={"ciclo completo"} label={"Ciclo completo"} />
    <Picker.Item value={"criacao de leitoes"} label={"Criação de leitões"} />
    <Picker.Item value={"terminacao"} label={"Terminação"} />
   </Picker>
    <Text style={styles.caption}>
      Qual a área disponível para o sistema?
    </Text>
    <TextInput name='suinocultura_num_area'
      onChangeText={number => {
        let suinocultura = formik.values.suinocultura;
        formik.setFieldValue('suinocultura', {
          ...suinocultura,
          num_area: number
        })
      }}
      placeholder="Hectares (ha)"
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
    <Text style={styles.caption}>
      Quantas cabeças de suíno?
    </Text>
    <TextInput  
      name='suinocultura_num_animals'
      onChangeText={number => {
        let suinocultura = formik.values.suinocultura;
        formik.setFieldValue('suinocultura', {
          ...suinocultura,
          num_animals: number
        })
      }}
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
    </View>) : (<></>)
  
  const avicultura_form = formik.values.avicultura.enabled? (
  <View style={styles.activityBox}>
      <Text style={styles.caption}>Qual manejo aplicado?</Text>
      <Picker style={styles.picker}
        selectedValue={formik.values.avicultura.handling}
        onValueChange={(itemValue, itemIndex) => {
          let avicultura = formik.values.avicultura;
          formik.setFieldValue('avicultura', {
            ...avicultura,
            handling: itemValue
          })
        }}
      >
      <Picker.Item value={9999} label={"Selecione um manejo"} />
      <Picker.Item value={"corte"} label={"Corte"} />
      <Picker.Item value={"incubatorio"} label={"Incubatório"} />
      <Picker.Item value={"postura"} label={"Postura"} />
      </Picker>
      <Text style={styles.caption}>
        Qual a área disponível para o sistema?
      </Text>
      <TextInput name='avicultura_num_area'
        onChangeText={number => {
          let avicultura = formik.values.avicultura;
          formik.setFieldValue('avicultura', {
            ...avicultura,
            num_area: number
          })
        }}
        placeholder="Hectares (ha)"
        style={styles.NumberInputStyle}
        keyboardType={'numeric'}
        returnKeyType={ 'done' }
      />
      <Text style={styles.caption}>
        Quantas cabeças de aves?
      </Text>
      <TextInput  
        name='avicultura_num_animals'
        onChangeText={number => {
          let avicultura = formik.values.avicultura;
          formik.setFieldValue('avicultura', {
            ...avicultura,
            num_animals: number
          })
        }}
        style={styles.NumberInputStyle}
        keyboardType={'numeric'}
        returnKeyType={ 'done' }
      />
    </View>) : (<></>)
      
  const agricultura_form = formik.values.agricultura.enabled? (
  <View style={styles.activityBox}>
    <Text style={styles.caption}>Qual cultura praticada?</Text>
    <Picker style={styles.picker}
      selectedValue={formik.values.agricultura.cultivation}
      onValueChange={(itemValue, itemIndex) => {
        let agricultura = formik.values.agricultura;
        formik.setFieldValue('agricultura', {
          ...agricultura,
          cultivation: itemValue
        })
      }}
    >
      <Picker.Item value={9999} label={"Selecione um tipo de cultura"} />
      <Picker.Item value={"Anual"} label={"Anual"} />
      <Picker.Item value={"cana de acucar"} label={"Cana de açúcar"} />
      <Picker.Item value={"cafeicultura"} label={"Cafeicultura"} />
      <Picker.Item value={"fruticultura"} label={"Fruticultura"} />
      <Picker.Item value={"horticultura"} label={"Horticultura"} />
      <Picker.Item value={"oleicultura"} label={"Oleicultura"} />
      <Picker.Item value={"permanente"} label={"Permanente"} />
      
    </Picker>
    
    <Text style={styles.caption}>Qual manejo praticado?</Text> 
    <Picker style={styles.picker}
      selectedValue={formik.values.agricultura.handling}
      onValueChange={(itemValue, itemIndex) => {
        let agricultura = formik.values.agricultura;
        formik.setFieldValue('agricultura', {
          ...agricultura,
          handling: itemValue
        })
      }}
    >
      <Picker.Item value={9999} label={"Selecione um manejo"} />
      <Picker.Item value={"com irrigacao"} label={"Com Irrigação"} />
      <Picker.Item value={"com queima"} label={"Com Queima"} />
      <Picker.Item value={"sem irrigacao"} label={"Sem Irrigação"} />
      
    </Picker>
    <Text style={styles.caption}>
      Qual a área disponível para o sistema?
    </Text>
    <TextInput name='agricultura_num_area'
      onChangeText={number => {
        let agricultura = formik.values.agricultura;
        formik.setFieldValue('agricultura', {
          ...agricultura,
          num_area: number
        })
      }}
      placeholder="Hectares (ha)"
      style={styles.NumberInputStyle}
      keyboardType={'numeric'}
      returnKeyType={ 'done' }
    />
  </View>) : (<></>)
    

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
          <Text style={styles.activityTitle}>
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
            }}
            value = {formik.values.bovi_leite.enabled}
          />
        </View>
        { bovi_leite_form }
        
        <View style={styles.produtionItem}>
          <Text style={styles.activityTitle}>
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
            }}
            value = {formik.values.bovi_corte.enabled}
          />
        </View>
        { bovi_corte_form }
        <View style={styles.produtionItem}>
          <Text style={styles.activityTitle}>
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
            }}
            value = {formik.values.suinocultura.enabled}
          />
        </View>
        { suinocultura_form }
        <View style={styles.produtionItem}>
          <Text style={styles.activityTitle}>
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
            }}
            value = {formik.values.avicultura.enabled}
          />
        </View>
        { avicultura_form }
        <View style={styles.produtionItem}>
          <Text style={styles.activityTitle}>
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
            }}
            value = {formik.values.agricultura.enabled}
          />
        </View>
        { agricultura_form }
      </View>
    
      
      

      <TouchableOpacity
        style={styles.Button}
        onPress={formik.handleSubmit}
        >
        { 
          formik.isSubmitting ? 
          <><Text style={styles.ButtonText}>Salvando...</Text>
          <ActivityIndicator color='#fff' size= 'large' />
          </>
          :
          <Text style={styles.ButtonText}>Salvar</Text>
        }
       
      </TouchableOpacity>
      { formik.errors.message && <Text>{formik.errors.message}</Text> }
      
  </View>)

}