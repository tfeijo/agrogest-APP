import React from 'react';
import { View } from 'react-native';
import AnswerItem from './answersItem';
import AnswerList from './answersList';
import FowardButton from './fowardButton';
import styles from './styles';

export default function Legislation(props) {
  
  return <>
    <View style={styles.step}>
       <AnswerItem
        item={props.data.attributes.EnvironmentalLicensing}
        text="Licenciamento ambiental"
      />
      <AnswerItem
        item={props.data.attributes.CAR}
        text="Cadastro Ambiental Rural (CAR)"
      />
      <AnswerItem
        item={props.data.attributes.NativeVegetationLegalReserve}
        text="Área com cobertura de vegetação nativa que atende percentual de reserva legal"
      />
      <AnswerList
          title="Área de Preservação Permanente-APP em conformidade com o Código Florestal: "
          items={[
              {
                  item: props.data.attributes.AppAroundWaterCoursesWaterReservoirs,
                  text:"Em torno dos cursos e reservatórios de água"
              },
              {
                  item: props.data.attributes.AppAroundSpringsWaterEyes,
                  text:"Em nascentes e olhos d'água"
              },
              {
                  item: props.data.attributes.AppHillside,
                  text:"Em encostas"
              },
              {
                  item: props.data.attributes.AppHillTop,
                  text:"Topo de morro"
              },
          ]}
      />

      <AnswerItem
        item={props.data.attributes.EnvironmentalRegularizationPlan}
        text="Plano de regularização Ambiental"
      />
      <AnswerItem
        item={props.data.attributes.WaterGrant}
        text="Outorga de uso da água"
      />
      <FowardButton page={props.page}/>
    </View>
  </>
}