import React, { useState } from 'react';
import { View, ScrollView, Text, Switch, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createControl from '../../utils/createControl';
import styles from './styles';
import Header from '../../utils/header';

export default function Legislation() {
    const navigation = useNavigation()
    const control = createControl
    const formik = useFormik({
        initialValues: {
            hasResidueComposting : false,
            hasBovineCattle : false,
            hasBovineDung : false,
            hasBovineFertigation : false,
            hasSwineCattle : false,
            hasSwineDung : false,
            hasSwineFertigation : false,
            hasWaterControlProgram : false,
            hasAviaryWastinAgriculture : false,
            hasReuseAgriculturalResidue : false,
            hasDeadCompostAnimals : false,
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
                  'boolWasteManagement': true
                })
                
            //     navigation.goBack()
            //   })
            //   .catch(err => {
            //     setSubmitting(false);
            //     setErrors({ message: err.message });
            //   });
            navigation.goBack()
            setSubmitting(false);
        },
      });
    
      const [bovino] = useState(true);
      const [suino] = useState(true);
      const [avino] = useState(true);
      const [agriculture] = useState(true);
      const [pecuaria] = useState(avino || bovino || suino);
    
    return <View style={styles.container} >

        <Header />
        <Text style={styles.tipsTitle}>
          Selecione abaixo as características de sua propriedade em relação a gestão de resíduo
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        { pecuaria &&
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasResidueComposting', !formik.values.hasResidueComposting)
            formik.setFieldValue('hasBovineCattle', false)
            formik.setFieldValue('hasBovineDung', false)
            formik.setFieldValue('hasBovineFertigation', false)
            formik.setFieldValue('hasSwineCattle', false)
            formik.setFieldValue('hasSwineDung', false)
            formik.setFieldValue('hasSwineFertigation', false)
            formik.setFieldValue('hasWaterControlProgram', false)
            formik.setFieldValue('hasAviaryWastinAgriculture', false)
            formik.setFieldValue('hasReuseAgriculturalResidue', false)
        }}>
            <Text style={styles.caption}>
            Os resíduos dos animais são destinados à Esterqueira/Compostagem ou Biodigestor?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasResidueComposting', text)
                formik.setFieldValue('hasBovineCattle', false)
                formik.setFieldValue('hasBovineDung', false)
                formik.setFieldValue('hasBovineFertigation', false)
                formik.setFieldValue('hasSwineCattle', false)
                formik.setFieldValue('hasSwineDung', false)
                formik.setFieldValue('hasSwineFertigation', false)
                formik.setFieldValue('hasWaterControlProgram', false)
                formik.setFieldValue('hasAviaryWastinAgriculture', false)
                formik.setFieldValue('hasReuseAgriculturalResidue', false)
            }}
            value = {formik.values.hasResidueComposting}
            />
        </TouchableOpacity>
        
        }
        
        
        {formik.values.hasResidueComposting && pecuaria? 
         bovino? 
         <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>BOVINOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineCattle', !formik.values.hasBovineCattle)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasBovineCattle', text)
                }}
                value = {formik.values.hasBovineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineDung', !formik.values.hasBovineDung)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasBovineDung', text)
                }}
                value = {formik.values.hasBovineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineFertigation', !formik.values.hasBovineFertigation)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasBovineFertigation', text)
                }}
                value = {formik.values.hasBovineFertigation}
                />
                <Text style={styles.option}>
                Fertirrigação
                </Text>
            </TouchableOpacity>
        </View>
        :<></>:<></> 
        }

        {formik.values.hasResidueComposting && pecuaria? 
         suino? 
         <>
        <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>SUÍNOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineCattle', !formik.values.hasSwineCattle)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasSwineCattle', text)
                }}
                value = {formik.values.hasSwineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineDung', !formik.values.hasSwineDung)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasSwineDung', text)
                }}
                value = {formik.values.hasSwineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineFertigation', !formik.values.hasSwineFertigation)}}>
                <CheckBox 
                onValueChange = {text => {
                    formik.setFieldValue('hasSwineFertigation', text)
                }}
                value = {formik.values.hasSwineFertigation}
                />
                <Text style={styles.option}>
                Fertirrigação
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasWaterControlProgram', !formik.values.hasWaterControlProgram)
        }}>
            <Text style={styles.caption}>
            A produção de suíno tem programa de controle de consumo de água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasWaterControlProgram', text)
            }}
            value = {formik.values.hasWaterControlProgram}
            />
        </TouchableOpacity>
        </>
        :<></>:<></> 
        }

        {formik.values.hasResidueComposting && pecuaria? 
         avino? 
         <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasAviaryWastinAgriculture', !formik.values.hasAviaryWastinAgriculture)
        }}>
            <Text style={styles.caption}>
            O resíduo de cama de aviário é aplicado na agricultura?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasAviaryWastinAgriculture', text)
            }}
            value = {formik.values.hasAviaryWastinAgriculture}
            />
        </TouchableOpacity>
        :<></>:<></> 
        }
        
        {formik.values.hasResidueComposting && pecuaria? 
         agriculture?
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasReuseAgriculturalResidue', !formik.values.hasReuseAgriculturalResidue)
        }}>
            <Text style={styles.caption}>
            O resíduo da produção agrícola é utilizado na propriedade?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasReuseAgriculturalResidue', text)
            }}
            value = {formik.values.hasReuseAgriculturalResidue}
            />
        </TouchableOpacity>
         :<></>:<></> 
        }
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasDeadCompostAnimals', !formik.values.hasDeadCompostAnimals)
        }}>
            <Text style={styles.caption}>
            O destino dos animais mortos é a compostagem? 
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasDeadCompostAnimals', text)
            }}
            value = {formik.values.hasDeadCompostAnimals}
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