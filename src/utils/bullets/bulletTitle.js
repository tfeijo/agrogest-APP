import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function BulletTitle(props){
  return  <View style={styles.stepTitle}>
              <Text style={styles.stepTitleText}>
                  {props.number==7?
                  
                  <Text style={styles.stepTitleTextBold}>{props.description}</Text>
                  :
                  <><Text style={styles.stepTitleTextBold}>PASSO {props.number}: </Text>{props.description}</>
                }
              </Text>
          </View>
} 