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
            ResidueComposting : false,
            BovineCattle : false,
            BovineDung : false,
            BovineFertigation : false,
            SwineCattle : false,
            SwineDung : false,
            SwineFertigation : false,
            WaterControlProgram : false,
            AviaryWastinAgriculture : false,
            ReuseAgriculturalResidue : false,
            DeadCompostAnimals : false,
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
                    attributes,
                    documents: []
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
            formik.setFieldValue('ResidueComposting', !formik.values.ResidueComposting)
            formik.setFieldValue('BovineCattle', false)
            formik.setFieldValue('BovineDung', false)
            formik.setFieldValue('BovineFertigation', false)
            formik.setFieldValue('SwineCattle', false)
            formik.setFieldValue('SwineDung', false)
            formik.setFieldValue('SwineFertigation', false)
            formik.setFieldValue('WaterControlProgram', false)
            formik.setFieldValue('AviaryWastinAgriculture', false)
            formik.setFieldValue('ReuseAgriculturalResidue', false)
        }}>
            <Text style={styles.caption}>
            Os resíduos dos animais são destinados à Esterqueira/Compostagem ou Biodigestor?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('ResidueComposting', text)
                formik.setFieldValue('BovineCattle', false)
                formik.setFieldValue('BovineDung', false)
                formik.setFieldValue('BovineFertigation', false)
                formik.setFieldValue('SwineCattle', false)
                formik.setFieldValue('SwineDung', false)
                formik.setFieldValue('SwineFertigation', false)
                formik.setFieldValue('WaterControlProgram', false)
                formik.setFieldValue('AviaryWastinAgriculture', false)
                formik.setFieldValue('ReuseAgriculturalResidue', false)
            }}
            value = {formik.values.ResidueComposting}
            />
        </TouchableOpacity>
        
        }
        
        
        {formik.values.ResidueComposting? 
         bovino? 
         <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>BOVINOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('BovineCattle', !formik.values.BovineCattle)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('BovineCattle', !formik.values.BovineCattle)
                }}
                color="#A3A3A3"
                checked = {formik.values.BovineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('BovineDung', !formik.values.BovineDung)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('BovineDung', !formik.values.BovineDung)
                }}
                color="#A3A3A3"
                checked = {formik.values.BovineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('BovineFertigation', !formik.values.BovineFertigation)}}>
                <CheckBox 
                onPress = {text => {
                    formik.setFieldValue('BovineFertigation', !formik.values.BovineFertigation)
                }}
                color="#A3A3A3"
                checked = {formik.values.BovineFertigation}
                />
                <Text style={styles.option}>
                Fertirrigação
                </Text>
            </TouchableOpacity>
        </View>
        :<></>:<></> 
        }

        {formik.values.ResidueComposting&&
         suino&&
         <>
        <View style={styles.containerOption}>
            <Text style={styles.title}>
                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de <Text style={styles.bold}>SUÍNOS</Text>: 
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('SwineCattle', !formik.values.SwineCattle)}}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SwineCattle', !formik.values.SwineCattle)    
                }}
                color="#A3A3A3"
                checked = {formik.values.SwineCattle}
                />
                <Text style={styles.option}>
                Biodigestor
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('SwineDung', !formik.values.SwineDung)}}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SwineDung', !formik.values.SwineDung)}
                }
                color="#A3A3A3"
                checked = {formik.values.SwineDung}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={()=>{
                formik.setFieldValue('SwineFertigation', !formik.values.SwineFertigation)}}>
                <CheckBox 
                onPress = {()=> {
                    formik.setFieldValue('SwineFertigation', !formik.values.SwineFertigation)}
                }
                color="#A3A3A3"
                checked = {formik.values.SwineFertigation}
                />
                <Text style={styles.option}>
                Fertirrigação
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('WaterControlProgram', !formik.values.WaterControlProgram)
        }}>
            <Text style={styles.caption}>
            A produção de suíno tem programa de controle de consumo de água?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('WaterControlProgram', text)
            }}
            value = {formik.values.WaterControlProgram}
            />
        </TouchableOpacity>
        </> 
        }

        {formik.values.ResidueComposting&&
         avino&&
         <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('AviaryWastinAgriculture', !formik.values.AviaryWastinAgriculture)
        }}>
            <Text style={styles.caption}>
            O resíduo de cama de aviário é aplicado na agricultura?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('AviaryWastinAgriculture', text)
            }}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            value = {formik.values.AviaryWastinAgriculture}
            />
        </TouchableOpacity>
        }
        
        {formik.values.ResidueComposting &&
         agricultura&&
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('ReuseAgriculturalResidue', !formik.values.ReuseAgriculturalResidue)
        }}>
            <Text style={styles.caption}>
            O resíduo da produção agrícola é utilizado na propriedade?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('ReuseAgriculturalResidue', text)
            }}
            value = {formik.values.ReuseAgriculturalResidue}
            />
        </TouchableOpacity>
        }
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('DeadCompostAnimals', !formik.values.DeadCompostAnimals)
        }}>
            <Text style={styles.caption}>
            O destino dos animais mortos é a compostagem? 
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('DeadCompostAnimals', text)
            }}
            value = {formik.values.DeadCompostAnimals}
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