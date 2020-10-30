import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';


export default function FowardButton(props) {
  let texto = 'Corrigir o preenchimento deste passo'
  let navigation = useNavigation(); 
  if (props.page == 'Production'){
      texto = 'Inserir novos sistemas de produção'
  }
  return <TouchableOpacity
  
  style={styles.fowardButton}
  onPress={() => navigation.navigate(props.page)}
  >
      <Text style={styles.fowardButtonText}>{texto}</Text>
      <Feather name='arrow-right' size={16} color='#00753E' />
  </TouchableOpacity>
}