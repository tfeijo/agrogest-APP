import React, {useState} from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function BulletTitle(props){
  
    const [listDocs, setList] = useState([
        {
          name: 'Jonas Arnklint',
          born: 1985
        },
        {
          name: 'Martina Elm',
          born: 1986
        }
      ]
    )

  return  <>
    <View style={styles.step}>
        {
            listDocs.map(function(object){
            return <Text key={"docs"+object.born}><Feather name="file-text" size={20}/> {object.name}</Text>
            })
        }
    </View>
    </>
} 