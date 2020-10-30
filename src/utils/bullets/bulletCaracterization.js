import React from 'react';
import { View, Text } from 'react-native';
import FowardButton from './fowardButton';
import styles from './styles';

export default function Caracterization(props) {

  let biomeItems = props.data.city.biomes.map( (biome) => {
      return <Text style={styles.biomes} key={biome.name}>{biome.name}</Text>
  });
  
  
  return  <View style={styles.step}>
              <Text style={styles.stepProperty}>Cidade:</Text>
              <Text style={styles.stepValue}> 
                  {props.data.city.name} / {props.data.city.state.uf}
              </Text>
              <Text style={styles.stepProperty}>BIOMA:</Text>
                  {biomeItems}
              
              <Text style={styles.stepProperty}>
                  Tamanho:
              </Text>
              <Text style={styles.stepValue}>
                  {props.data.size.name}
              </Text>
              <FowardButton page={props.page}/>
          </View>
}