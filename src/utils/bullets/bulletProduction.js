import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import FowardButton from './fowardButton';
import BulletEmpty from './bulletEmpty';
import styles from './styles';

export default function Production(props) {
  const [prods, setProds] = useState(props.data.productions)
  const navigation = useNavigation()

  const productions = prods.map((production, index) => {
    return <View style={styles.production} key={index}>
      <View style={styles.box}>
        <Text style={styles.productionTitle}>{production.activity}</Text>
        <Feather name='trash-2' size={20} color='#AD0900' onPress={() => {
            Alert.alert('',
              `Deseja remover a produção ${production.activity}?`,
              [
                {text: 'Remover', onPress: async () => {            
                  
                  await api.delete(`farms/${props.data.id}/productions/${production.id}`)
                  .then(async () => {
                    let productionsControl = {
                      suinocultura : false,
                      bovi_leite : false,
                      bovi_corte : false,
                      agricultura : false,
                      avicultura : false,
                    }
                    
                    let newActivityList = prods.filter((prod) => {
                      return prod.id!=production.id;
                    })

                    newActivityList.map((prod)=>{
                      if (prod.activity=="Suinocultura"){
                        productionsControl.suinocultura = true
                      }
                      if (prod.activity=="Bovinocultura De Leite"){
                        productionsControl.bovi_leite = true
                      }
                      if (prod.activity=="Bovinocultura De Corte"){
                        productionsControl.bovi_corte = true
                      }
                      if (prod.activity=="Avicultura"){
                        productionsControl.avicultura = true
                      }
                      if (prod.activity=="Agricultura"){
                        productionsControl.agricultura = true
                      }
                    })
                    
                    let control = JSON.parse(await AsyncStorage.getItem('control'))
                    let controlWasteManagement = control.boolWasteManagement
                    let farm = JSON.parse(await AsyncStorage.getItem('land'))
                    
                    await AsyncStorage.setItem('control',JSON.stringify({
                      ...control,
                      boolWasteManagement : false ,
                      boolProduction : newActivityList.length != 0,
                      productions : productionsControl
                    }))

                    await AsyncStorage.setItem('land', JSON.stringify({
                      ...farm,
                      productions: newActivityList
                    }))

                    setProds(newActivityList)

                    if (newActivityList.length == 0) {
                      Alert.alert('Sua propriedade precisa ter uma produção ;)',
                        `Você será redirecionado para inserir uma nova produção.`,
                        [
                          {text: 'ok', onPress: () => navigation.navigate('Production')},
                        ], {})
                    }
                  })

                }},
                {text: 'Cancelar', onPress: () => {}},
              ],
              {}
            )
          }}
        />
      </View>

      {production.activity == 'Agricultura' &&
        <Text
          key={`${production.id}_${production.cultivation}`}
          style={styles.stepProperty}
        >
          Tipo de cultivo: 
          <Text style={styles.stepValue}> {production.cultivation}</Text>
        </Text>
      }
      <Text 
        key={`${production.id}_${production.handling}`}
        style={styles.stepProperty}
      >
        Tipo de manejo: 
        <Text style={styles.stepValue}> {production.handling}</Text>
      </Text>
      {production.activity != 'Agricultura' &&
        <Text
          key={`${production.id+"Animals"}_${production.num_animals}`}
          style={styles.stepProperty}
        >
          Número de animais: 
          <Text style={styles.stepValue}> {production.num_animals}</Text>
        </Text>
      }
      <Text
        key={`${production.id+"Area"}_${production.num_area}`}
        style={styles.stepProperty}
      >
        Área do sistema: 
        <Text style={styles.stepValue}> {production.num_area}</Text>
      </Text>
      <Text
        key={`${production.id}Size${production.size}`}
        style={styles.stepProperty}
      >
        Porte da produção: 
        <Text style={styles.stepValue}> {production.size}</Text>
      </Text>
      <Text
        key={`${production.id}Factor${production.factor}`}
        style={styles.stepProperty} 
      >
        Potencial poluidor:
        <Text style={styles.stepValue}> {production.factor}</Text>
      </Text>  
    </View>
  });
  
  return prods.length == 0?
    <BulletEmpty page={props.page} stepBefore={true}/>
    :
    <View style={styles.step}>
    {productions}
      <FowardButton page={props.page}/>
    </View>
}