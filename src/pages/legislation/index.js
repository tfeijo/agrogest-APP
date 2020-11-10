import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import {CheckBox} from "native-base";
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import Header from '../../utils/header';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';

export default function Legislation() {
    const navigation = useNavigation()
    const control = createControl
    const formik = useFormik({
        initialValues: {
            EnvironmentalLicensing: false,
            CAR : false,
            NativeVegetationLegalReserve: false,
            AppAroundWaterCoursesWaterReservoirs: false,
            AppAroundSpringsWaterEyes: false,
            AppHillside: false,
            AppHillTop: false,
            EnvironmentalRegularizationPlan: false,
            WaterGrant: false,
        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(true);
            let jsonValue = JSON.parse(await AsyncStorage.getItem('land'))
            let JSONcontrol = JSON.parse(await AsyncStorage.getItem('control'))
            let attributes = jsonValue.attributes!=null?jsonValue.attributes:{}
            
            for (var key in values)  {
                attributes[key] = values[key]                
            }
            
            try {
                await createLand.update({
                    ...jsonValue,
                    attributes
                })
    
                await control.update({
                    ...JSONcontrol,
                    'boolLegislation': true
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
          Selecione abaixo as características de sua propriedade em relação a legislação ambiental
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('EnvironmentalLicensing', !formik.values.EnvironmentalLicensing)
            formik.setFieldValue('CAR', true)
            formik.setFieldValue('NativeVegetationLegalReserve', true)
            formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', true)
            formik.setFieldValue('AppAroundSpringsWaterEyes', true)
            formik.setFieldValue('AppHillside', true)
            formik.setFieldValue('AppHillTop', true)
            formik.setFieldValue('EnvironmentalRegularizationPlan', true)
            formik.setFieldValue('WaterGrant', true)
        }}>
            <Text style={styles.caption}>
                Possui licenciamento ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('EnvironmentalLicensing', text)
                formik.setFieldValue('CAR', true)
                formik.setFieldValue('NativeVegetationLegalReserve', true)
                formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', true)
                formik.setFieldValue('AppAroundSpringsWaterEyes', true)
                formik.setFieldValue('AppHillside', true)
                formik.setFieldValue('AppHillTop', true)
                formik.setFieldValue('EnvironmentalRegularizationPlan', true)
                formik.setFieldValue('WaterGrant', true)

            }}
            value = {formik.values.EnvironmentalLicensing}
            />
        </TouchableOpacity>
        {!formik.values.EnvironmentalLicensing  &&
        <>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('CAR', !formik.values.CAR)
        }}>
            <Text style={styles.caption}>
                Possui cadastro ambiental rural - CAR?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('CAR', text)
            }}
            value = {formik.values.CAR}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('NativeVegetationLegalReserve', !formik.values.NativeVegetationLegalReserve)
        }}>
            <Text style={styles.caption}>
                Possui área com cobertura de vegetação nativa que atende percentual de Reserva Legal?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('NativeVegetationLegalReserve', text)
            }}
            value = {formik.values.NativeVegetationLegalReserve}
            />
        </TouchableOpacity>
        <View style={styles.containerOption}>
        <Text style={{ ...styles.title, fontWeight: "bold"}}>
        Possui Área de Preservação Permanente-APP em conformidade com o Código Florestal: 
        </Text>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', !formik.values.AppAroundWaterCoursesWaterReservoirs)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', !formik.values.AppAroundWaterCoursesWaterReservoirs)
            }}
            color="#A3A3A3"
            checked = {formik.values.AppAroundWaterCoursesWaterReservoirs}
            />
            <Text style={styles.option}>
            Em torno dos cursos e reservatórios de água
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('AppAroundSpringsWaterEyes', !formik.values.AppAroundSpringsWaterEyes)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('AppAroundSpringsWaterEyes', !formik.values.AppAroundSpringsWaterEyes)
            }}
            color="#A3A3A3"
            checked = {formik.values.AppAroundSpringsWaterEyes}
            />
            <Text style={styles.option}>
            Em nascentes e olhos d'água
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('AppHillside', !formik.values.AppHillside)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('AppHillside', !formik.values.AppHillside)
            }}
            color="#A3A3A3"
            checked = {formik.values.AppHillside}
            />
            <Text style={styles.option}>
            Em encostas
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('AppHillTop', !formik.values.AppHillTop)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('AppHillTop', !formik.values.AppHillTop)
            }}
            color="#A3A3A3"
            checked = {formik.values.AppHillTop}
            />
            <Text style={styles.option}>
            Em encostas
            </Text>
        </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('EnvironmentalRegularizationPlan', !formik.values.EnvironmentalRegularizationPlan)
        }}>
            <Text style={styles.caption}>
                Possui Plano de Regularização Ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('EnvironmentalRegularizationPlan', text)
            }}
            value = {formik.values.EnvironmentalRegularizationPlan}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('WaterGrant', !formik.values.WaterGrant)
        }}>
            <Text style={styles.caption}>
                Possui outorga de uso da água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('WaterGrant', text)
            }}
            value = {formik.values.WaterGrant}
            />
        </TouchableOpacity>
        </>
        }
        {formik.values.EnvironmentalLicensing  && <View style={styles.congratulation}>
            <Feather name='activity' size={35} color='#00753E' />
            <Text>
                Parabéns! Se sua propridade já possui licenciamento ambiental, ela se encontra em conformidade com a legislação ambiental.
            </Text>
        </View>
        }
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