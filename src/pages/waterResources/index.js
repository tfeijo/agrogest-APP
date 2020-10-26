import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';
import Header from '../../utils/header';

export default function WaterResource() {
    const navigation = useNavigation()
    const control = createControl
    const formik = useFormik({
        initialValues: {
            hasSourceProtectedWaterMine: false,
            hasDomesticSewageTreatment: false,
            hasWaterConsuptionTreatment: false,
        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(true);
            
            let jsonValue = JSON.parse(await AsyncStorage.getItem('land'))
            let JSONcontrol = JSON.parse(await AsyncStorage.getItem('control'))
            
            let attributes = jsonValue.attributes
            for (var key in formik.values)  {
                attributes[key] = formik.values[key]
            }
            
            try {
                await createLand.update({
                    ...jsonValue,
                    attributes
                })
    
                await control.update({
                ...JSONcontrol,
                'boolWaterResource': true
                })
                
                setSubmitting(false);
                navigation.goBack();
            } catch (error) {
                alert('Falha no armazenamento, tente mais uma vez.')
                setSubmitting(false);
                navigation.goBack();
            }
            
        },
      });

    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a recursos hídricos
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasSourceProtectedWaterMine', !formik.values.hasSourceProtectedWaterMine)
        }}>
            <Text style={styles.caption}>
                Sua propriedade possui nascente ou mina de água protegida?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasSourceProtectedWaterMine', text)
            }}
            value = {formik.values.hasSourceProtectedWaterMine}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasDomesticSewageTreatment', !formik.values.hasDomesticSewageTreatment)
        }}>
            <Text style={styles.caption}>
                O esgoto doméstico das residências da propriedade é tratado?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasDomesticSewageTreatment', text)
            }}
            value = {formik.values.hasDomesticSewageTreatment}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasWaterConsuptionTreatment', !formik.values.hasWaterConsuptionTreatment)
        }}>
            <Text style={styles.caption}>
                A água de consumo humano/animal e para limpeza é tratada?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasWaterConsuptionTreatment', text)
            }}
            value = {formik.values.hasWaterConsuptionTreatment}
            />
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.Button}
        onPress={formik.handleSubmit}
        >
        {
          formik.isSubmitting ? 
          <><Text style={styles.ButtonText}>Salvando </Text>
          <ActivityIndicator color='#fff' size= 'large' /></>
          :
          <Text style={styles.ButtonText}>Salvar</Text>
        }
       
        </TouchableOpacity>
        </ScrollView>
    </View>;
}