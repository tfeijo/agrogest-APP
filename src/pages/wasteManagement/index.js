import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Switch, TouchableOpacity, ActivityIndicator,
AsyncStorage, Image, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {CheckBox} from "native-base";
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createLand from '../../utils/createLand';
import createControl from '../../utils/createControl';
import Loading from '../../utils/loading';
import styles from './styles';
import Header from '../../utils/header';

export default function WasteManagement() {
    const navigation = useNavigation()
    const control = createControl
    const [isLoading,setLoading] = useState(true);

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
                control.update({
                  ...JSONcontrol,
                  'boolWasteManagement': true
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
    
    const [data, setData] = useState({})
    const [suino ,setSuino] = useState(false)
    const [bovino ,setBovino] = useState(false)
    const [avino ,setAvino] = useState(false)
    const [agricultura ,setAgricultura] = useState(false)
    const [pecuaria,setPecuaria] = useState(false)
    
    const isFocused = useIsFocused();

    async function getInfo(){

        async function getControl(){
            try{ 
                let jsonValue = JSON.parse(await AsyncStorage.getItem('control'));
                
                setBovino(
                    jsonValue.productions.bovi_leite || 
                    jsonValue.productions.bovi_corte
                )
                setAvino(jsonValue.productions.avicultura)
                setSuino(jsonValue.productions.suinocultura)
                setAgricultura(jsonValue.productions.agricultura)
                setPecuaria(
                    jsonValue.productions.bovi_corte ||
                    jsonValue.productions.bovi_leite || 
                    jsonValue.productions.avicultura || 
                    jsonValue.productions.suinocultura
                )
              return jsonValue.productions != null && jsonValue.productions 
            } catch(err) {
              console.warn(err)
            }
        }
        setData(await getControl())
    }

    async function fetchData() {
        setLoading(true)
        await getInfo();
        setLoading(false)
    }

    useEffect(() => {
        if (isFocused && !isLoading){
            fetchData()
        }
    }, [isFocused])
    
    useEffect(() => {
        fetchData()
    }, [])

      
    return isLoading === true ? <Loading />
    :
    <>
    <StatusBar backgroundColor="#00753E" barStyle='light-content' />
    <View style={styles.container} >
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
        
        
        {formik.values.hasResidueComposting? 
         bovino? 
         <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>BOVINOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineCattle', !formik.values.hasBovineCattle)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('hasBovineCattle', !formik.values.hasBovineCattle)
                }}
                color="#A3A3A3"
                checked = {formik.values.hasBovineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineDung', !formik.values.hasBovineDung)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('hasBovineDung', !formik.values.hasBovineDung)
                }}
                color="#A3A3A3"
                checked = {formik.values.hasBovineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasBovineFertigation', !formik.values.hasBovineFertigation)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('hasBovineFertigation', !formik.values.hasBovineFertigation)
                }}
                color="#A3A3A3"
                checked = {formik.values.hasBovineFertigation}
                />
                <Text style={styles.option}>
                Fertirrigação
                </Text>
            </TouchableOpacity>
        </View>
        :<></>:<></> 
        }

        {formik.values.hasResidueComposting&&
         suino&&
         <>
        <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>SUÍNOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineCattle', !formik.values.hasSwineCattle)}}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('hasSwineCattle', !formik.values.hasSwineCattle)    
                }}
                color="#A3A3A3"
                checked = {formik.values.hasSwineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineDung', !formik.values.hasSwineDung)}}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('hasSwineDung', !formik.values.hasSwineDung)}
                }
                color="#A3A3A3"
                checked = {formik.values.hasSwineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('hasSwineFertigation', !formik.values.hasSwineFertigation)}}>
                <CheckBox 
                onPress = {()=> {
                    formik.setFieldValue('hasSwineFertigation', !formik.values.hasSwineFertigation)}
                }
                color="#A3A3A3"
                checked = {formik.values.hasSwineFertigation}
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
        }

        {formik.values.hasResidueComposting&&
         avino&&
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
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            value = {formik.values.hasAviaryWastinAgriculture}
            />
        </TouchableOpacity>
        }
        
        {formik.values.hasResidueComposting &&
         agricultura&&
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
    </View>
    </>;
}