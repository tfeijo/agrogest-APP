import React, {useState} from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import {CheckBox} from "native-base";
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';
import Header from '../../utils/header';

export default function WaterResource() {
    const navigation = useNavigation()
    const [r1,setR1] = useState(false)
    const [r2,setR2] = useState(false)
    const [r3,setR3] = useState(false)
    const [r4,setR4] = useState(false)
    
    const control = createControl
    const formik = useFormik({
        initialValues: {
            SourceProtectedWaterMine: false,
            DomesticSewageTreatment: false,
            WaterConsuptionTreatment: false,
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
                jsonValue.edited = true
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
            formik.setFieldValue('SourceProtectedWaterMine', !formik.values.SourceProtectedWaterMine)
        }}>
            <Text style={styles.caption}>
                Nascente ou mina de água protegida?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('SourceProtectedWaterMine', text)
            }}
            value = {formik.values.SourceProtectedWaterMine}
            />
        </TouchableOpacity>

        <View style={styles.containerOption}>

            <Text style={{ margin: 8, fontWeight: 'bold'}}>
            Destinação do esgoto doméstico:
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    !r1 || r2 || r3
                )       
                setR1(!r1)
                setR4(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        !r1 || r2 || r3
                    )
                    setR1(!r1)
                    setR4(false)

                }}
                color="#A3A3A3"
                checked = {r1}
                />
                <Text style={styles.option}>
                Fossa biodigestora
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    r1 || !r2 || r3
                )
                setR2(!r2)
                setR4(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        r1 || !r2 || r3
                    )
                    setR2(!r2)
                    setR4(false)
                }}
                color="#A3A3A3"
                checked = {r2}
                />
                <Text style={styles.option}>
                Fossa negra/infiltração
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    r1 || r2 || !r3
                )
                setR3(!r3)
                setR4(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        r1 || r2 || !r3
                    )
                    setR3(!r3)
                    setR4(false)
                }}
                color="#A3A3A3"
                checked = {r3}
                />
                <Text style={styles.option}>
                Outra
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                setR4(!r4)
                setR1(false)
                setR2(false)
                setR3(false)
                formik.setFieldValue('DomesticSewageTreatment', false)    
            }}>
                <CheckBox 
                onPress = {() => {
                    setR4(!r4)
                    setR1(false)
                    setR2(false)
                    setR3(false)
                    formik.setFieldValue('DomesticSewageTreatment', false)
                }}
                color="#A3A3A3"
                checked = {r4}
                />
                <Text style={styles.option}>
                Nenhum
                </Text>
            </TouchableOpacity>        
        </View>
        
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('WaterConsuptionTreatment', !formik.values.WaterConsuptionTreatment)
        }}>
            <Text style={styles.caption}>
                Água de consumo humano/animal e para limpeza tratada
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('WaterConsuptionTreatment', text)
            }}
            value = {formik.values.WaterConsuptionTreatment}
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