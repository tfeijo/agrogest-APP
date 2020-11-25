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
    const [data, setData] = useState({})
    const [suino ,setSuino] = useState(false)
    const [bovino ,setBovino] = useState(false)
    const [avino ,setAvino] = useState(false)
    const [agricultura ,setAgricultura] = useState(false)
    const [pecuaria,setPecuaria] = useState(false)
    const [r1,setR1] = useState(false)
    const [r2,setR2] = useState(false)
    const [r3,setR3] = useState(false)
    const [r4,setR4] = useState(false)
    const [r5,setR5] = useState(false)
    const [r6,setR6] = useState(false)
    const [r7,setR7] = useState(false)
    const [r8,setR8] = useState(false)
    const [r9,setR9] = useState(false)
    const [r10,setR10] = useState(false)

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
                jsonValue.edited = false
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
        <>
        <View style={styles.containerOption}>

            <Text style={{ margin: 8, fontWeight: 'bold'}}>
                Tratamento dos resíduos gerados pelos animais:
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('ResidueComposting', 
                    !r5 || r6 || r7 || r9
                )       
                setR5(!r5)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('ResidueComposting', 
                    !r5 || r6 || r7 || r9
                )       
                setR5(!r5)
                setR8(false)

                }}
                color="#A3A3A3"
                checked = {r5}
                />
                <Text style={styles.option}>
                Lagoa
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('ResidueComposting', 
                    r5 || !r6 || r7 || r9
                )
                setR6(!r6)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('ResidueComposting', 
                    r5 || !r6 || r7 || r9
                    )
                    setR6(!r6)
                    setR8(false)
                }}
                color="#A3A3A3"
                checked = {r6}
                />
                <Text style={styles.option}>
                Biodigestor anaeróbico
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('ResidueComposting', 
                    r5 || r6 || !r7 || r9
                )
                setR7(!r7)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('ResidueComposting', 
                    r5 || r6 || !r7 || r9
                    )
                    setR7(!r7)
                    setR8(false)
                }}
                color="#A3A3A3"
                checked = {r7}
                />
                <Text style={styles.option}>
                Esterqueira
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('ResidueComposting', 
                    r5 || r6 || !r9 || r7
                )
                setR9(!r9)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('ResidueComposting', 
                    r5 || r6 || !r9 || r7
                    )
                    setR9(!r9)
                    setR8(false)
                }}
                color="#A3A3A3"
                checked = {r9}
                />
                <Text style={styles.option}>
                Compostagem
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                setR8(!r8)
                setR5(false)
                setR6(false)
                setR7(false)
                setR9(false)
                formik.setFieldValue('ResidueComposting', false)
            }}>
                <CheckBox 
                onPress = {() => {
                    setR8(!r8)
                    setR5(false)
                    setR6(false)
                    setR7(false)
                    setR9(false)
                    formik.setFieldValue('ResidueComposting', false)
                }}
                color="#A3A3A3"
                checked = {r8}
                />
                <Text style={styles.option}>
                Nenhum
                </Text>
            </TouchableOpacity>        
        </View>
        <View style={styles.containerOption}>

            <Text style={{ margin: 8, fontWeight: 'bold'}}>
            Destino das carcaças dos bovinos mortos (bezerros e adultos):
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    !r1 || r2 || r3 || r4
                )
                formik.setFieldValue('DeadCompostAnimals', !formik.values.DeadCompostAnimals)
                setR1(!r1)
                setR10(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        !r1 || r2 || r3 || r4
                    )
                    formik.setFieldValue('DeadCompostAnimals', !formik.values.DeadCompostAnimals)
                    setR1(!r1)
                    setR10(false)

                }}
                color="#A3A3A3"
                checked = {r1}
                />
                <Text style={styles.option}>
                Compostagem na propriedade
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    r1 || !r2 || r3 || r4
                )
                setR2(!r2)
                setR10(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        r1 || !r2 || r3 || r4
                    )
                    setR2(!r2)
                    setR10(false)
                }}
                color="#A3A3A3"
                checked = {r2}
                />
                <Text style={styles.option}>
                Enterrado na propriedade
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    r1 || r2 || !r3 || r4
                )
                setR3(!r3)
                setR10(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        r1 || r2 || !r3 || r4
                    )
                    setR3(!r3)
                    setR10(false)
                }}
                color="#A3A3A3"
                checked = {r3}
                />
                <Text style={styles.option}>
                Deixa no local de morte ou em outro local
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('DomesticSewageTreatment', 
                    r1 || r2 || r3 || !r4
                )
                setR4(!r4)
                setR10(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('DomesticSewageTreatment', 
                        r1 || r2 || r3 || !r4
                    )
                    setR4(!r4)
                    setR10(false)
                }}
                color="#A3A3A3"
                checked = {r4}
                />
                <Text style={styles.option}>
                Outros
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                setR10(!r10)
                setR1(false)
                setR2(false)
                setR3(false)
                setR4(false)
                formik.setFieldValue('DomesticSewageTreatment', false)    
            }}>
                <CheckBox 
                onPress = {() => {
                    setR10(!r10)
                    setR1(false)
                    setR2(false)
                    setR3(false)
                    setR4(false)
                    formik.setFieldValue('DomesticSewageTreatment', false)
                }}
                color="#A3A3A3"
                checked = {r10}
                />
                <Text style={styles.option}>
                Nenhum
                </Text>
            </TouchableOpacity>        
        </View>
        
        </>
        
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
        
        {agricultura&&
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