import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import { useFormik } from 'formik';
import styles from './styles';
import Header from '../../utils/header';

export default function Legislation() {
    const formik = useFormik({
        initialValues: {
          nascenteProtegida: false,
          esgotoDomestico: false,
          aguaTratada: false
        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(false);
        },
      });

    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a recursos hídricos
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Sua propriedade possui nascente ou mina de água protegida?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('nascenteProtegida', text)
            }}
            value = {formik.values.nascenteProtegida}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            O esgoto doméstico das residências da propriedade é tratado?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('esgotoDomestico', text)
            }}
            value = {formik.values.esgotoDomestico}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            A água de consumo humano/animal e para limpeza é tratada?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('aguaTratada', text)
            }}
            value = {formik.values.aguaTratada}
            />
        </View>
        <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
            await AsyncStorage.setItem('control',JSON.stringify({
                boolCaracterization : true,
                boolProduction : true,
                boolLegislation :  true,
                boolWaterResource :  true,
                boolSoilVegetation : false,
                boolWasteManagement :  false,
            }))
        }
        }
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