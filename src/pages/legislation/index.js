import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import { useFormik } from 'formik';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import Header from '../../utils/header';

export default function Legislation() {
    const formik = useFormik({
        initialValues: {
          licensing: false,
          car: false,
          reservaLegal: false,
          appCursoReservatorio: false,
          appNascente: false,
          appEncosta: false,
          appMorro: false,
          pra: false,
          outorga: false
        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(false);
        },
      });

    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a legislação ambiental
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui licenciamento ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('licensing', text)
                formik.setFieldValue('car', false)
                formik.setFieldValue('reservaLegal', false)
                formik.setFieldValue('appCursoReservatorio', false)
                formik.setFieldValue('appNascente', false)
                formik.setFieldValue('appEncosta', false)
                formik.setFieldValue('appMorro', false)
                formik.setFieldValue('pra', false)
                formik.setFieldValue('outorga', false)

            }}
            value = {formik.values.licensing}
            />
        </View>
        {!formik.values.licensing  &&
        <>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui cadastro ambiental rural - CAR?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('car', text)
            }}
            value = {formik.values.car}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui área com cobertura de vegetação nativa que atende percentual de Reserva Legal?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('reservaLegal', text)
            }}
            value = {formik.values.reservaLegal}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui área de APP em áreas em torno de cursos d'água e reservatórios de água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('appCursoReservatorio', text)
            }}
            value = {formik.values.appCursoReservatorio}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui área de APP em áreas em torno de nascentes e de olhos d'água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('appNascente', text)
            }}
            value = {formik.values.appNascente}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui área de APP em áreas de encosta?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('appEncosta', text)
            }}
            value = {formik.values.appEncosta}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui área de APP em áreas de topo de morro?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('appMorro', text)
            }}
            value = {formik.values.appMorro}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui Plano de Regularização Ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('pra', text)
            }}
            value = {formik.values.pra}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui outorga de uso da água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('outorga', text)
            }}
            value = {formik.values.outorga}
            />
        </View>
        </>
        }
        {formik.values.licensing  && <View style={styles.congratulation}>
            <Feather name='activity' size={35} color='#00753E' />
            <Text>
                Parabéns! Se sua propridade já possui licenciamento ambiental, ela se encontra em conformidade com a legislação ambiental.
            </Text>
        </View>
        }
        <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
            await AsyncStorage.setItem('control',JSON.stringify({
                boolCaracterization : true,
                boolProduction : true,
                boolLegislation :  true,
                boolWaterResource :  false,
                boolSoilVegetation : false,
                boolWasteManagement :  false,
            }))
    
            alert("asdf")   
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