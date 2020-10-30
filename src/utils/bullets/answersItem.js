import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function AnswerItem(props){
  return  <View style={{...styles.box, justifyContent: "flex-start",borderBottomColor:"#eeeeee"}}> 
      {props.item?
          <Feather name='check-square' style={styles.feather} size={20} color='#00753E'/> :
          <Feather name='x-square' style={styles.feather} size={20} color='#AD0900'/>
      } 
      <Text style={styles.stepValue}>
          {props.text}
      </Text>
  </View>
}