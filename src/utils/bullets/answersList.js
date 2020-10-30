import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function AnswerList(props){
  return  <>
      <Text style={{...styles.stepTitleTextBold, color: '#131313'}}>
          {props.title}
      </Text>
      {props.items.map(function(object){
          return <View id={object.item} key={object.text} style={{
              ...styles.box, 
              justifyContent: "flex-start",
              borderBottomWidth:0,
              paddingLeft: 10,
              }}> 
              {object.item?
                  <Feather name='check-square' style={styles.feather} size={20} color='#00753E'/> :
                  <Feather name='x-square' style={styles.feather} size={20} color='#AD0900'/>
              } 
              <Text style={styles.stepValue}>
                  {object.text}
              </Text>
          </View>
      })}
  </>
}