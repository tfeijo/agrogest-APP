import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useFormik } from 'formik';
import styles from './styles';
import Header from '../../utils/header';

export default function Legislation() {
    const formik = useFormik({
        initialValues: {
            minhocasInsetos: false,
            producaoDiversificada: false,
            areaCompactada: false,
            erosao: false,
            plantioDireto: false,
            cultivoMinimo: false,
            queimaControlada: false,
            analiseSolo: false,
            manVegEncosta: false,

        },
        handleSubmit: () => {},
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            setSubmitting(false);
        },
      });

    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a solo e vegetação
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Observa presença de animais como minhoca e/ou insetos no solo?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('minhocasInsetos', text)
            }}
            value = {formik.values.minhocasInsetos}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            A produção diversificada?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('producaoDiversificada', text)
            }}
            value = {formik.values.producaoDiversificada}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Presença de áreas compactadas?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('areaCompactada', text)
            }}
            value = {formik.values.areaCompactada}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Presença de erosão?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('erosao', text)
            }}
            value = {formik.values.erosao}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Realiza análise de solo e correção com orientação técnica?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('analiseSolo', text)
            }}
            value = {formik.values.analiseSolo}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Presença e manutenção da vegetação em encostas e fundos de vale?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('manVegEncosta', text)
            }}
            value = {formik.values.manVegEncosta}
            />
        </View>
        <View style={styles.flexView}>
            <Text style={styles.caption}>
            Possui vegetação íntegra na margem dos rios?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('vegmargemRio', text)
            }}
            value = {formik.values.vegmargemRio}
            />
        </View>
        <View style={styles.containerOption}>
        <Text style={styles.title}>
            Escolha a prática de manejo das culturas: 
        </Text>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('plantioDireto', text)
            }}
            value = {formik.values.plantioDireto}
            />
            <Text style={styles.option}>
            Plantio direto
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('cultivoMinimo', text)
            }}
            value = {formik.values.cultivoMinimo}
            />
            <Text style={styles.option}>
            Cultivo mínimo
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('queimaControlada', text)
            }}
            value = {formik.values.queimaControlada}
            />
            <Text style={styles.option}>
            Queima controlada
            </Text>
        </View>
        </View>
        <View style={styles.containerOption}>
        <Text style={styles.title}>
            Escolha a área de renegeração, se houver: 
        </Text>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('areaRegNatural', text)
            }}
            value = {formik.values.areaRegNatural}
            />
            <Text style={styles.option}>
            Natural
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('areaRegManejo', text)
            }}
            value = {formik.values.areaRegManejo}
            />
            <Text style={styles.option}>
            Com manejo
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('areaRegPlantio', text)
            }}
            value = {formik.values.areaRegPlantio}
            />
            <Text style={styles.option}>
            Com plantio
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('areaRegAgro', text)
            }}
            value = {formik.values.areaRegAgro}
            />
            <Text style={styles.option}>
            Com sistemas agroflorestais
            </Text>
        </View>
        </View>

        <View style={styles.containerOption}>
        <Text style={styles.title}>
            O manejo da pastagem é: 
        </Text>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('manejoRotacionado', text)
            }}
            value = {formik.values.manejoRotacionado}
            />
            <Text style={styles.option}>
            Rotacionado
            </Text>
        </View>
        <View style={styles.flexViewOption}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('manejoConsorciado', text)
            }}
            value = {formik.values.manejoConsorciado}
            />
            <Text style={styles.option}>
            Consorciado
            </Text>
        </View>
        </View>
        <TouchableOpacity
        style={styles.Button}
        onPress={async () => {
            await AsyncStorage.setItem('control',JSON.stringify({
                boolCaracterization : true,
                boolProduction : true,
                boolLegislation :  true,
                boolWaterResource :  true,
                boolSoilVegetation : true,
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