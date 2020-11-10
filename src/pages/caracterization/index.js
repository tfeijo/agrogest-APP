import React from 'react';
import { 
    View,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import Form from  './../../utils/form-caracterization';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Caracterization() {
    
    return <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
            </View>
            <Text style={styles.title}>Caracterização da propriedade</Text>
            <ScrollView style={styles.stepList}
                        showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                    Responda as questões para saber a caracterização de sua propriedade
                </Text>
                <Form />
            </ScrollView>
 
        </View>
    </>;
}