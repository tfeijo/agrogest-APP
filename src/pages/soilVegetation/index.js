import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
AsyncStorage} from 'react-native';
import {CheckBox} from "native-base";
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';

import styles from './styles';
import Header from '../../utils/header';

export default function SoilVegetation() {
    const navigation = useNavigation()
    const control = createControl
    const formik = useFormik({
        initialValues: {
            hasEarthwormInsects: false,
            hasDiversifiedProduction: false,
            hasCompactedArea: false,
            hasErosion: false,
            hasSoilAnalysisCorrection: false,
            hasPresenceMaintenanceVegetation: false,
            hasIntegralVegetation: false,
            hasNoTill: false,
            hasMinimumCultivation: false,
            hasControlledBurning: false,
            hasNaturalRegeneration: false,
            hasRegenerationWithHandling: false,
            hasRegenerationWithPlanting: false,
            hasAgroforestrySystems: false,
            hasRotatedHandling: false,
            hasConsortiumHandling   : false,
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
                  'boolSoilVegetation': true
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
          Selecione abaixo as características de sua propriedade em relação a solo e vegetação
        </Text>
        
        <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasEarthwormInsects', !formik.values.hasEarthwormInsects)
        }}>
            <Text style={styles.caption}>
            Observa presença de animais como minhoca e/ou insetos no solo?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasEarthwormInsects', text)
            }}
            value = {formik.values.hasEarthwormInsects}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasDiversifiedProduction', !formik.values.hasDiversifiedProduction)
        }}>
            <Text style={styles.caption}>
            A produção diversificada?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasDiversifiedProduction', text)
            }}
            value = {formik.values.hasDiversifiedProduction}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasCompactedArea', !formik.values.hasCompactedArea)
        }}>
            <Text style={styles.caption}>
            Presença de áreas compactadas?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasCompactedArea', text)
            }}
            value = {formik.values.hasCompactedArea}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasErosion', !formik.values.hasErosion)
        }}>
            <Text style={styles.caption}>
            Presença de erosão?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasErosion', text)
            }}
            value = {formik.values.hasErosion}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasSoilAnalysisCorrection', !formik.values.hasSoilAnalysisCorrection)
        }}>
            <Text style={styles.caption}>
            Realiza análise de solo e correção com orientação técnica?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasSoilAnalysisCorrection', text)
            }}
            value = {formik.values.hasSoilAnalysisCorrection}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasPresenceMaintenanceVegetation', !formik.values.hasPresenceMaintenanceVegetation)
        }}>
            <Text style={styles.caption}>
            Presença e manutenção da vegetação em encostas e fundos de vale?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasPresenceMaintenanceVegetation', text)
            }}
            value = {formik.values.hasPresenceMaintenanceVegetation}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('hasIntegralVegetation', !formik.values.hasIntegralVegetation)
        }}>
            <Text style={styles.caption}>
            Possui vegetação íntegra na margem dos rios?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('hasIntegralVegetation', text)
            }}
            value = {formik.values.hasIntegralVegetation}
            />
        </TouchableOpacity>
        <View style={styles.containerOption}>
        <Text style={styles.title}>
            Escolha a prática de manejo das culturas: 
        </Text>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasNoTill', !formik.values.hasNoTill)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasNoTill', !formik.values.hasNoTill)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasNoTill}
            />
            <Text style={styles.option}>
            Plantio direto
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasMinimumCultivation', !formik.values.hasMinimumCultivation)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasMinimumCultivation', !formik.values.hasMinimumCultivation)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasMinimumCultivation}
            />
            <Text style={styles.option}>
            Cultivo mínimo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasControlledBurning', !formik.values.hasControlledBurning)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasControlledBurning', !formik.values.hasControlledBurning)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasControlledBurning}
            />
            <Text style={styles.option}>
            Queima controlada
            </Text>
        </TouchableOpacity>
        </View>
        <View style={styles.containerOption}>
        <Text style={styles.title}>
            Escolha a área de renegeração, se houver: 
        </Text>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasNaturalRegeneration', !formik.values.hasNaturalRegeneration)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasNaturalRegeneration', !formik.values.hasNaturalRegeneration)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasNaturalRegeneration}
            />
            <Text style={styles.option}>
            Natural
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasRegenerationWithHandling', !formik.values.hasRegenerationWithHandling)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasRegenerationWithHandling', !formik.values.hasRegenerationWithHandling)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasRegenerationWithHandling}
            />
            <Text style={styles.option}>
            Com manejo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasRegenerationWithPlanting', !formik.values.hasRegenerationWithPlanting)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasRegenerationWithPlanting', !formik.values.hasRegenerationWithPlanting)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasRegenerationWithPlanting}
            />
            <Text style={styles.option}>
            Com plantio
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasAgroforestrySystems', !formik.values.hasAgroforestrySystems)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasAgroforestrySystems', !formik.values.hasAgroforestrySystems)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasAgroforestrySystems}
            />
            <Text style={styles.option}>
            Com sistemas agroflorestais
            </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.containerOption}>
        <Text style={styles.title}>
            O manejo da pastagem é: 
        </Text>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasRotatedHandling', !formik.values.hasRotatedHandling)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('hasRotatedHandling', !formik.values.hasRotatedHandling)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasRotatedHandling}
            />
            <Text style={styles.option}>
            Rotacionado
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasConsortiumHandling', !formik.values.hasConsortiumHandling)
        }}>
            <CheckBox 
            onPress = {()=>{
                formik.setFieldValue('hasConsortiumHandling', !formik.values.hasConsortiumHandling)
            }}
            color="#A3A3A3"
            checked = {formik.values.hasConsortiumHandling}
            />
            <Text style={styles.option}>
            Consorciado
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