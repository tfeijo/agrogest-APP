import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function BulletTitle(props){
  return  <View style={styles.stepTitle}>
              <Text style={styles.stepTitleText}>
                  <Text style={styles.stepTitleTextBold}>PASSO {props.number}: </Text>
                  {props.description}
              </Text>
          </View>
} 