import React from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, ActivityIndicator,
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
            hasEarthwormInsects: false,
            hasDiversifiedProduction: false,
            hasCompactedArea: false,
            hasErosion: false,
            hasNoTill: false,
            hasMinimumCultivation: false,
            hasControlledBurning: false,
            hasSoilAnalysisCorrection: false,
            hasPresenceMaintenanceVegetation: false,
            hasNaturalRegeneration: false,
            hasRegenerationWithHandling: false,
            hasRegenerationWithPlanting: false,
            hasAgroforestrySystems: false,
            hasIntegralVegetation: false,
            hasRotatedHandling: false,
            hasConsortiumHandling   : false,
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
                  'boolSoilVegetation': true
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
            onValueChange = {text => {
                formik.setFieldValue('hasNoTill', text)
            }}
            value = {formik.values.hasNoTill}
            />
            <Text style={styles.option}>
            Plantio direto
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasMinimumCultivation', !formik.values.hasMinimumCultivation)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasMinimumCultivation', text)
            }}
            value = {formik.values.hasMinimumCultivation}
            />
            <Text style={styles.option}>
            Cultivo mínimo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasControlledBurning', !formik.values.hasControlledBurning)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasControlledBurning', text)
            }}
            value = {formik.values.hasControlledBurning}
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
            onValueChange = {text => {
                formik.setFieldValue('hasNaturalRegeneration', text)
            }}
            value = {formik.values.hasNaturalRegeneration}
            />
            <Text style={styles.option}>
            Natural
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasRegenerationWithHandling', !formik.values.hasRegenerationWithHandling)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasRegenerationWithHandling', text)
            }}
            value = {formik.values.hasRegenerationWithHandling}
            />
            <Text style={styles.option}>
            Com manejo
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasRegenerationWithPlanting', !formik.values.hasRegenerationWithPlanting)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasRegenerationWithPlanting', text)
            }}
            value = {formik.values.hasRegenerationWithPlanting}
            />
            <Text style={styles.option}>
            Com plantio
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasAgroforestrySystems', !formik.values.hasAgroforestrySystems)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasAgroforestrySystems', text)
            }}
            value = {formik.values.hasAgroforestrySystems}
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
            onValueChange = {text => {
                formik.setFieldValue('hasRotatedHandling', text)
            }}
            value = {formik.values.hasRotatedHandling}
            />
            <Text style={styles.option}>
            Rotacionado
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexViewOption} onPress={async () => {
            formik.setFieldValue('hasConsortiumHandling', !formik.values.hasConsortiumHandling)
        }}>
            <CheckBox 
            onValueChange = {text => {
                formik.setFieldValue('hasConsortiumHandling', text)
            }}
            value = {formik.values.hasConsortiumHandling}
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