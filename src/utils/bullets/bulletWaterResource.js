import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import AnswerItem from './answersItem';
import  FowardButton from './fowardButton';

export default function WaterResource(props) { 
  return  <View style={styles.step}>
              <AnswerItem
                  item={props.data.attributes.SourceProtectedWaterMine}
                  text="Nascente ou mina de água protegida"
              />
              <AnswerItem
                  item={props.data.attributes.DomesticSewageTreatment}
                  text="Esgoto doméstico tratado"
              />
              <AnswerItem
                  item={props.data.attributes.WaterConsuptionTreatment}
                  text="Água de consumo humano/animal e para limpeza tratada"
              />
              
              <FowardButton page={props.page}/>
          </View>
}
