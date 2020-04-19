import React from 'react';
import { View, Image, Text, ScrollView,TouchableOpacity  } from 'react-native';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation } from '@react-navigation/native';



export default function Caracterization() {
    const navigator = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                            style={styles.fowardButtonEmpty}
                            onPress={() => navigator.navigate('Home')}
                >
                    <Feather name='arrow-left' size={35} color='#00753E' />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>PORTE DA PROPRIEDADE</Text>
                <Text style={styles.description}>Responda as questões para saber o porte de sua propriedade</Text>
            </ScrollView>
            
        </View>
        
    );
}