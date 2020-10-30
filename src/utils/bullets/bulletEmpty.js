import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function BulletEmpty(props){
  let navigation = useNavigation(); 
  
  if (props.stepBefore) {
    return <View style={styles.stepListEmpty}>
      <View style={styles.stepEmpty}>
        <TouchableOpacity
          style={styles.fowardButtonEmpty}
          onPress={() => navigation.navigate(props.page)}
        >
          <Text style={{color: '#000', fontSize: 20}}>Clique para preencher.</Text>
          <Feather name='arrow-right' size={25} color='#00753E' />
        </TouchableOpacity>
      </View>
    </View>
  }
  return <View style={styles.stepListEmpty}>
    <View style={styles.stepEmpty}>
      <Text style={styles.stepEmptyText}>Preencha os anteriores.</Text>
    </View>
  </View>
}