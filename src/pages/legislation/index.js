import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createControl from '../../utils/createControl';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import Header from '../../utils/header';

export default function Legislation() {
    const navigation = useNavigation()
    const control = createControl
    const formik = useFormik({
        initialValues: {
            hasEnvironmentalLicencing: false,
            hasCAR : false,
            hasNativeVegetationLegalReserve: false,
            hasAppAroundWaterCoursesWaterReservoirs: false,
            hasAppAroundSpringsWaterEyes: false,
            hasAppHillside: false,
            hasAppHillTop: false,
            hasEnvironmentalRegularizationPlan: false,
            hasWaterGrant: false,
        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(true);
            alert(JSON.stringify(formik.values))
            // await api.post('productions', {
            //     productions,
            //     farm_id: jsonValue.id,
            //   })
            //   .then(async response => {
                
            //     await createLand.update({
            //       ...jsonValue,
            //       productions: response.data
            //     })
                
                let JSONcontrol = JSON.parse(await AsyncStorage.getItem('control'))
                control.update({
                  ...JSONcontrol,
                  'boolWaterResource': true
                })
                
            //     navigation.goBack()
            //   })
            //   .catch(err => {
            //     setSubmitting(false);
            //     setErrors({ message: err.message });
            //   });
            navigation.goBack();
            setSubmitting(false);
        },
      });

    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a legislação ambiental
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasEnvironmentalLicencing', !formik.values.hasEnvironmentalLicencing)
            formik.setFieldValue('hasCAR', false)
            formik.setFieldValue('hasNativeVegetationLegalReserve', false)
            formik.setFieldValue('hasAppAroundWaterCoursesWaterReservoirs', false)
            formik.setFieldValue('hasAppAroundSpringsWaterEyes', false)
            formik.setFieldValue('hasAppHillside', false)
            formik.setFieldValue('hasAppHillTop', false)
            formik.setFieldValue('hasEnvironmentalRegularizationPlan', false)
            formik.setFieldValue('hasWaterGrant', false)
        }}>
            <Text style={styles.caption}>
                Possui licenciamento ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasEnvironmentalLicencing', text)
                formik.setFieldValue('hasCAR', false)
                formik.setFieldValue('hasNativeVegetationLegalReserve', false)
                formik.setFieldValue('hasAppAroundWaterCoursesWaterReservoirs', false)
                formik.setFieldValue('hasAppAroundSpringsWaterEyes', false)
                formik.setFieldValue('hasAppHillside', false)
                formik.setFieldValue('hasAppHillTop', false)
                formik.setFieldValue('hasEnvironmentalRegularizationPlan', false)
                formik.setFieldValue('hasWaterGrant', false)

            }}
            value = {formik.values.hasEnvironmentalLicencing}
            />
        </TouchableOpacity>
        {!formik.values.hasEnvironmentalLicencing  &&
        <>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasCAR', !formik.values.hasCAR)
        }}>
            <Text style={styles.caption}>
                Possui cadastro ambiental rural - CAR?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasCAR', text)
            }}
            value = {formik.values.hasCAR}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasNativeVegetationLegalReserve', !formik.values.hasNativeVegetationLegalReserve)
        }}>
            <Text style={styles.caption}>
                Possui área com cobertura de vegetação nativa que atende percentual de Reserva Legal?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasNativeVegetationLegalReserve', text)
            }}
            value = {formik.values.hasNativeVegetationLegalReserve}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasAppAroundWaterCoursesWaterReservoirs', !formik.values.hasAppAroundWaterCoursesWaterReservoirs)
        }}>
            <Text style={styles.caption}>
                Possui área de APP em áreas em torno de cursos d'água e reservatórios de água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasAppAroundWaterCoursesWaterReservoirs', text)
            }}
            value = {formik.values.hasAppAroundWaterCoursesWaterReservoirs}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasAppAroundSpringsWaterEyes', !formik.values.hasAppAroundSpringsWaterEyes)
        }}>
            <Text style={styles.caption}>
                Possui área de APP em áreas em torno de nascentes e de olhos d'água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasAppAroundSpringsWaterEyes', text)
            }}
            value = {formik.values.hasAppAroundSpringsWaterEyes}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasAppHillside', !formik.values.hasAppHillside)
        }}>     
            <Text style={styles.caption}>
                Possui área de APP em áreas de encosta?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasAppHillside', text)
            }}
            value = {formik.values.hasAppHillside}
            />
        </TouchableOpacity>

        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasAppHillTop', !formik.values.hasAppHillTop)
        }}>
            <Text style={styles.caption}>
                Possui área de APP em áreas de topo de morro?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasAppHillTop', text)
            }}
            value = {formik.values.hasAppHillTop}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasEnvironmentalRegularizationPlan', !formik.values.hasEnvironmentalRegularizationPlan)
        }}>
            <Text style={styles.caption}>
                Possui Plano de Regularização Ambiental?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasEnvironmentalRegularizationPlan', text)
            }}
            value = {formik.values.hasEnvironmentalRegularizationPlan}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasWaterGrant', !formik.values.hasWaterGrant)
        }}>
            <Text style={styles.caption}>
                Possui outorga de uso da água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasWaterGrant', text)
            }}
            value = {formik.values.hasWaterGrant}
            />
        </TouchableOpacity>
        </>
        }
        {formik.values.hasEnvironmentalLicencing  && <View style={styles.congratulation}>
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