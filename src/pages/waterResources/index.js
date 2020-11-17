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
    const [r5,setR5] = useState(false)
    const [r6,setR6] = useState(false)
    const [r7,setR7] = useState(false)
    const [r8,setR8] = useState(false)
    const [r9,setR9] = useState(false)
    const [r10,setR10] = useState(false)
    const [r11,setR11] = useState(false)
    const [r12,setR12] = useState(false)
    const [r13,setR13] = useState(false)

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
            async function setEdited(bool){
                let response = await AsyncStorage.setItem('edited', JSON.stringify(bool))
                return response
            }   
            let editedReturn = await setEdited(true)
            
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
        
        <View style={styles.containerOption}>

            <Text style={{ margin: 8, fontWeight: 'bold'}}>
            Fonte de água da propriedade:
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('SourceProtectedWaterMine', 
                    !r9 || r10 || r11 || r13
                )       
                setR9(!r9)
                setR12(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SourceProtectedWaterMine', 
                        !r9 || r10 || r11|| r13
                    )
                    setR9(!r9)
                    setR12(false)

                }}
                color="#A3A3A3"
                checked = {r9}
                />
                <Text style={styles.option}>
                Poço artesiano
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('SourceProtectedWaterMine', 
                    r9 || !r10 || r11|| r13
                )
                setR10(!r10)
                setR12(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SourceProtectedWaterMine', 
                        r9 || !r10 || r11|| r13
                    )
                    setR10(!r10)
                    setR12(false)
                }}
                color="#A3A3A3"
                checked = {r10}
                />
                <Text style={styles.option}>
                Poço raso ou cisterna
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('SourceProtectedWaterMine', 
                    r9 || r10 || !r11|| r13
                )
                setR11(!r11)
                setR12(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SourceProtectedWaterMine', 
                        r9 || r10 || !r11|| r13
                    )
                    setR11(!r11)
                    setR12(false)
                }}
                color="#A3A3A3"
                checked = {r11}
                />
                <Text style={styles.option}>
                Mina
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('SourceProtectedWaterMine', 
                    r9 || r10 || r11|| !r13
                )
                setR13(!r13)
                setR12(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('SourceProtectedWaterMine', 
                        r9 || r10 || r11 || !r13
                    )
                    setR13(!r13)
                    setR12(false)
                }}
                color="#A3A3A3"
                checked = {r13}
                />
                <Text style={styles.option}>
                Outra
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                setR12(!r12)
                setR9(false)
                setR13(false)
                setR10(false)
                setR11(false)
                formik.setFieldValue('SourceProtectedWaterMine', false)    
            }}>
                <CheckBox 
                onPress = {() => {
                    setR12(!r12)
                    setR9(false)
                    setR10(false)
                    setR11(false)
                    formik.setFieldValue('SourceProtectedWaterMine', false)
                }}
                color="#A3A3A3"
                checked = {r12}
                />
                <Text style={styles.option}>
                Nenhum
                </Text>
            </TouchableOpacity>        
        </View>
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
        <View style={styles.containerOption}>

            <Text style={{ margin: 8, fontWeight: 'bold'}}>
            Tratamento da água de consumo humano e animal:
            </Text>

            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('WaterConsuptionTreatment', 
                    !r5 || r6 || r7
                )       
                setR5(!r5)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('WaterConsuptionTreatment', 
                    !r5 || r6 || r7
                )       
                setR5(!r5)
                setR8(false)

                }}
                color="#A3A3A3"
                checked = {r5}
                />
                <Text style={styles.option}>
                Filtração
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('WaterConsuptionTreatment', 
                    r5 || !r6 || r7
                )
                setR6(!r6)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('WaterConsuptionTreatment', 
                    r5 || !r6 || r7
                    )
                    setR6(!r6)
                    setR8(false)
                }}
                color="#A3A3A3"
                checked = {r6}
                />
                <Text style={styles.option}>
                Cloração
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                formik.setFieldValue('WaterConsuptionTreatment', 
                    r5 || r6 || !r7
                )
                setR7(!r7)
                setR8(false)
            }}>
                <CheckBox 
                onPress = {() => {
                    formik.setFieldValue('WaterConsuptionTreatment', 
                    r5 || r6 || !r7
                    )
                    setR7(!r7)
                    setR8(false)
                }}
                color="#A3A3A3"
                checked = {r7}
                />
                <Text style={styles.option}>
                Outros
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
                setR8(!r8)
                setR5(false)
                setR6(false)
                setR7(false)
                formik.setFieldValue('WaterConsuptionTreatment', false)
            }}>
                <CheckBox 
                onPress = {() => {
                    setR8(!r8)
                    setR5(false)
                    setR6(false)
                    setR7(false)
                    formik.setFieldValue('WaterConsuptionTreatment', false)
                }}
                color="#A3A3A3"
                checked = {r8}
                />
                <Text style={styles.option}>
                Nenhum
                </Text>
            </TouchableOpacity>        
        </View>
        
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