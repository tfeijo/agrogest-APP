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
            EarthwormInsects: false,
            DiversifiedProduction: false,
            CompactedArea: false,
            Erosion: false,
            SoilAnalysisCorrection: false,
            PresenceMaintenanceVegetation: false,
            IntegralVegetation: false,
            NoTill: false,
            MinimumCultivation: false,
            ControlledBurning: false,
            RegenerationArea: false,
            NaturalRegeneration: false, 
            RegenerationWithHandling: false, 
            RegenerationWithPlanting: false, 
            AgroforestrySystems: false,
            RotatedHandling: false,
            ConsortiumHandling   : false,
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
            
            attributes.RegenerationArea = attributes.RegenerationWithHandling ||
            attributes.RegenerationWithPlanting || 
            attributes.NaturalRegeneration || 
            attributes.AgroforestrySystems

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
            formik.setFieldValue('EarthwormInsects', !formik.values.EarthwormInsects)
        }}>
            <Text style={styles.caption}>
            Observa presença de animais como minhoca e/ou insetos no solo?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('EarthwormInsects', text)
            }}
            value = {formik.values.EarthwormInsects}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('DiversifiedProduction', !formik.values.DiversifiedProduction)
        }}>
            <Text style={styles.caption}>
            A produção diversificada?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('DiversifiedProduction', text)
            }}
            value = {formik.values.DiversifiedProduction}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('CompactedArea', !formik.values.CompactedArea)
        }}>
            <Text style={styles.caption}>
            Presença de áreas compactadas?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('CompactedArea', text)
            }}
            value = {formik.values.CompactedArea}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('Erosion', !formik.values.Erosion)
        }}>
            <Text style={styles.caption}>
            Presença de erosão?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('Erosion', text)
            }}
            value = {formik.values.Erosion}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('SoilAnalysisCorrection', !formik.values.SoilAnalysisCorrection)
        }}>
            <Text style={styles.caption}>
            Realiza análise de solo e correção com orientação técnica?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('SoilAnalysisCorrection', text)
            }}
            value = {formik.values.SoilAnalysisCorrection}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('PresenceMaintenanceVegetation', !formik.values.PresenceMaintenanceVegetation)
        }}>
            <Text style={styles.caption}>
            Presença e manutenção da vegetação em encostas e fundos de vale?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('PresenceMaintenanceVegetation', text)
            }}
            value = {formik.values.PresenceMaintenanceVegetation}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexView} onPress={async () => {
            formik.setFieldValue('IntegralVegetation', !formik.values.IntegralVegetation)
        }}>
            <Text style={styles.caption}>
            Possui vegetação íntegra na margem dos rios?
            </Text>
            <Switch 
            onValueChange = {text => {
                formik.setFieldValue('IntegralVegetation', text)
            }}
            value = {formik.values.IntegralVegetation}
            />
        </TouchableOpacity>
        <View style={styles.containerOption}>
        <Text style={styles.title}>
            Escolha a prática de manejo das culturas: 
        </Text>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('NoTill', !formik.values.NoTill)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('NoTill', !formik.values.NoTill)
            }}
            color="#A3A3A3"
            checked = {formik.values.NoTill}
            />
            <Text style={styles.option}>
            Plantio direto
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('MinimumCultivation', !formik.values.MinimumCultivation)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('MinimumCultivation', !formik.values.MinimumCultivation)
            }}
            color="#A3A3A3"
            checked = {formik.values.MinimumCultivation}
            />
            <Text style={styles.option}>
            Cultivo mínimo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('ControlledBurning', !formik.values.ControlledBurning)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('ControlledBurning', !formik.values.ControlledBurning)
            }}
            color="#A3A3A3"
            checked = {formik.values.ControlledBurning}
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
            formik.setFieldValue('NaturalRegeneration', !formik.values.NaturalRegeneration)
            
        
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('NaturalRegeneration', !formik.values.NaturalRegeneration)
                
            }}
            color="#A3A3A3"
            checked = {formik.values.NaturalRegeneration}
            />
            <Text style={styles.option}>
            Natural
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('RegenerationWithHandling', !formik.values.RegenerationWithHandling)
            
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('RegenerationWithHandling', !formik.values.RegenerationWithHandling)
                
            }}
            color="#A3A3A3"
            checked = {formik.values.RegenerationWithHandling}
            />
            <Text style={styles.option}>
            Com manejo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('RegenerationWithPlanting', !formik.values.RegenerationWithPlanting)
            
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('RegenerationWithPlanting', !formik.values.RegenerationWithPlanting)
                
            }}
            color="#A3A3A3"
            checked = {formik.values.RegenerationWithPlanting}
            />
            <Text style={styles.option}>
            Com plantio
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('AgroforestrySystems', !formik.values.AgroforestrySystems)
            
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('AgroforestrySystems', !formik.values.AgroforestrySystems)
                
            }}
            color="#A3A3A3"
            checked = {formik.values.AgroforestrySystems}
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
            formik.setFieldValue('RotatedHandling', !formik.values.RotatedHandling)
        }}>
            <CheckBox 
            onPress = {() => {
                formik.setFieldValue('RotatedHandling', !formik.values.RotatedHandling)
            }}
            color="#A3A3A3"
            checked = {formik.values.RotatedHandling}
            />
            <Text style={styles.option}>
            Rotacionado
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('ConsortiumHandling', !formik.values.ConsortiumHandling)
        }}>
            <CheckBox 
            onPress = {()=>{
                formik.setFieldValue('ConsortiumHandling', !formik.values.ConsortiumHandling)
            }}
            color="#A3A3A3"
            checked = {formik.values.ConsortiumHandling}
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