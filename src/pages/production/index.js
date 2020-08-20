import React from 'react';
import { 
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import Form from  './../../utils/form-production';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Production() {
    
    const navigator = useNavigation();

    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                            style={styles.fowardButtonEmpty}
                            onPress={() => navigator.goBack()}
                >
                    <Feather name='arrow-left' size={35} color='#00753E' />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Caracterização da produção</Text>
            <ScrollView style={styles.stepList}
                        showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                    Responda as questões sobre seus sistemas de produção
                </Text>
                <Form />
            </ScrollView>
 
        </View>
    </>;
}