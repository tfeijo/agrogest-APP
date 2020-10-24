import React from 'react';
import { View, Image, TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Header() {
  const navigator = useNavigation();

  return <View style={styles.header}>
      <Image source={logoImg} />
      <TouchableOpacity
                  style={styles.fowardButtonEmpty}
                  onPress={async () => {
                      navigator.goBack()
                  }}
      >
      <Feather name='arrow-left' size={35} color='#00753E' />
      </TouchableOpacity>
  </View>
}