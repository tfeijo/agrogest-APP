import React from 'react';
import { View } from 'react-native';
import AnswerItem from './answersItem';
import FowardButton from './fowardButton';
import styles from './styles';

export default function Legislation(props) {
  return <>
    <View style={styles.step}>
       <AnswerItem
        item={props.data.attributes.hasEnvironmentalLicensing}
        text="Licenciamento ambiental"
      />
      <AnswerItem
        item={props.data.attributes.hasCAR}
        text="Cadastro Ambiental Rural (CAR)"
      />
      <AnswerItem
        item={props.data.attributes.hasNativeVegetationLegalReserve}
        text="Área com cobertura de vegetação nativa que atende percentual de reserva legal"
      />
      <AnswerItem
        item={props.data.attributes.hasAppAroundWaterCoursesWaterReservoirs}
        text="Área de Preservação Permanente (APP) em torno de cursos e reservatórios de água"
      />
      <AnswerItem
        item={props.data.attributes.hasAppAroundSpringsWaterEyes}
        text="APP em torno de nascentes e de olhos de água"
      />
      <AnswerItem
        item={props.data.attributes.hasAppHillside}
        text="APP em encosta"
      />
      <AnswerItem
        item={props.data.attributes.hasAppHillTop}
        text="APP em topo de morro"
      />
      <AnswerItem
        item={props.data.attributes.hasEnvironmentalRegularizationPlan}
        text="Plano de regularização Ambiental"
      />
      <AnswerItem
        item={props.data.attributes.hasWaterGrant}
        text="Outorga de uso da água"
      />
      <FowardButton page={props.page}/>
    </View>
  </>
}