import React from 'react';
import { View } from 'react-native';
import AnswerItem from './answersItem';
import AnswerList from './answersList';
import FowardButton from './fowardButton';
import styles from './styles';

export default function SoilVegetation(props) { 
  return  (
    <View style={styles.step}>
      <AnswerItem
          item={props.data.attributes.EarthwormInsects}
          text="Presença de animais como minhocas e/ou insetos no solo"
      />
      <AnswerItem
          item={props.data.attributes.DiversifiedProduction}
          text="Produção diversificada"
      />
      <AnswerItem
          item={props.data.attributes.CompactedArea}
          text="Presença de área compactada"
      />
      <AnswerItem
          item={props.data.attributes.Erosion}
          text="Presença de erosão"
      />
      <AnswerItem
          item={props.data.attributes.SoilAnalysisCorrection}
          text="Realiza análise e manutenção de solo e correção com orientação técnica"
      />
      <AnswerItem
          item={props.data.attributes.PresenceMaintenanceVegetation}
          text="Realiza análise e manutenção da vegetação em encostas e fundos de vale"
      />
      <AnswerItem
          item={props.data.attributes.IntegralVegetation}
          text="Vegetação integra na margem dos rios"
      />
      <AnswerList
          title="Práticas de manejo das culturas: "
          items={[
              {
                  item: props.data.attributes.NoTill,
                  text:"Plantio direto"
              },
              {
                  item: props.data.attributes.MinimumCultivation,
                  text:"Cultivo mínimo"
              },
              {
                  item: props.data.attributes.ControlledBurning,
                  text:"Queima controlada"
              },
          ]}
      />
      <AnswerList
          title="Área de regeneração: "
          items={[
              {
                  item: props.data.attributes.NaturalRegeneration,
                  text:"Natural"
              },
              {
                  item: props.data.attributes.RegenerationWithHandling,
                  text:"Com manejo"
              }, 
              {
                  item: props.data.attributes.RegenerationWithPlanting,
                  text:"Com plantio"
              },
              {
                  item: props.data.attributes.AgroforestrySystems,
                  text:"Com sistemas agroflorestais"
              },
          ]}
      />
      {props.control.productions.bovi_corte || props.control.productions.bovi_leite &&
      <AnswerList
          title="Manejo da pastagem: "
          items={[
              {
                  item: props.data.attributes.RotatedHandling,
                  text:"Rotacionado"
              },
              {
                  item: props.data.attributes.ConsortiumHandling,
                  text:"Consorciado"
              },
          ]}
      />
        }
      <FowardButton page={props.page}/>
    </View>
  )
}