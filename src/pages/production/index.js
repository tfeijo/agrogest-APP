import React from 'react';
import { 
    View,
    Text,
    ScrollView
} from 'react-native';
import Header from '../../utils/header';
import Form from  './../../utils/form-production';
import styles from './styles';

export default function Production() {
    
    return <>
        <View style={styles.container}>
            <Header />
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