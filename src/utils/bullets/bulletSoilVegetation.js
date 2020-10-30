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
          item={props.data.attributes.hasEarthwormInsects}
          text="Presença de animais como minhocas e/ou insetos no solo"
      />
      <AnswerItem
          item={props.data.attributes.hasDiversifiedProduction}
          text="Produção diversificada"
      />
      <AnswerItem
          item={props.data.attributes.hasCompactedArea}
          text="Presença de área compactada"
      />
      <AnswerItem
          item={props.data.attributes.hasErosion}
          text="Presença de erosão"
      />
      <AnswerItem
          item={props.data.attributes.hasSoilAnalysisCorrection}
          text="Realiza análise e manutenção de solo e correção com orientação técnica"
      />
      <AnswerItem
          item={props.data.attributes.hasPresenceMaintenanceVegetation}
          text="Realiza análise e manutenção da vegetação em encostas e fundos de vale"
      />
      <AnswerItem
          item={props.data.attributes.hasIntegralVegetation}
          text="Vegetação integra na margem dos rios"
      />
      <AnswerList
          title="Práticas de manejo das culturas: "
          items={[
              {
                  item: props.data.attributes.hasNoTill,
                  text:"Plantio direto"
              },
              {
                  item: props.data.attributes.hasMinimumCultivation,
                  text:"Cultivo mínimo"
              },
              {
                  item: props.data.attributes.hasControlledBurning,
                  text:"Queima controlada"
              },
          ]}
      />
      <AnswerList
          title="Área de regeneração: "
          items={[
              {
                  item: props.data.attributes.hasNaturalRegeneration,
                  text:"Natural"
              },
              {
                  item: props.data.attributes.hasRegenerationWithHandling,
                  text:"Com manejo"
              },
              {
                  item: props.data.attributes.hasRegenerationWithPlanting,
                  text:"Com plantio"
              },
              {
                  item: props.data.attributes.hasAgroforestrySystems,
                  text:"Com sistemas agroflorestais"
              },
          ]}
      />
      <AnswerList
          title="Manejo da pastagem: "
          items={[
              {
                  item: props.data.attributes.hasRotatedHandling,
                  text:"Rotacionado"
              },
              {
                  item: props.data.attributes.hasConsortiumHandling,
                  text:"Consorciado"
              },
          ]}
      />

      <FowardButton page={props.page}/>
    </View>
  )
}