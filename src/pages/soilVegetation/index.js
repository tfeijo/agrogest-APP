import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CheckBox } from 'native-base';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import Header from '../../utils/header';
import Loading from '../../utils/loading';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';


export default function SoilVegetation() {
    const navigation = useNavigation();
    const control = createControl;
    const [bovino, setBovino] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [r1, setR1] = useState(false); // "Nenhum" in "prática de manejo" group
    const [r2, setR2] = useState(false); // "Nenhum" in "recuperação de áreas" group
    const [r3, setR3] = useState(false); // "Nenhum" in "manejo da pastagem" group

    async function getInfo() {
        try {
            const raw = await AsyncStorage.getItem('control');
            if (raw == null) return;
            const parsed = JSON.parse(raw);
            setBovino(!!(parsed.productions?.bovi_leite || parsed.productions?.bovi_corte));
        } catch (err) {
            console.warn('[SoilVegetation.getInfo]', err);
        }
    }

    async function fetchData() {
        setLoading(true);
        await getInfo();
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formik = useFormik({
        initialValues: {
            EarthwormInsects: false,
            DiversifiedProduction: false,
            CompactedArea: false,
            Erosion: false,
            SoilAnalysisCorrection: false,
            NoTill: false,
            MinimumCultivation: false,
            ControlledBurning: false,
            RegenerationArea: false,
            NaturalRegeneration: false,
            RegenerationWithHandling: false,
            RegenerationWithPlanting: false,
            AgroforestrySystems: false,
            RotatedHandling: false,
            ConsortiumHandling: false,
        },
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
                const [landRaw, controlRaw] = await Promise.all([
                    AsyncStorage.getItem('land'),
                    AsyncStorage.getItem('control'),
                ]);
                const land = JSON.parse(landRaw);
                const JSONcontrol = JSON.parse(controlRaw);
                const attributes = { ...(land.attributes ?? {}), ...values };

                attributes.RegenerationArea =
                    attributes.RegenerationWithHandling ||
                    attributes.RegenerationWithPlanting ||
                    attributes.NaturalRegeneration ||
                    attributes.AgroforestrySystems;

                land.edited = true;
                await createLand.update({ ...land, attributes });
                await control.update({ ...JSONcontrol, boolSoilVegetation: true });
                setSubmitting(false);
                navigation.goBack();
            } catch (error) {
                console.warn('[SoilVegetation.onSubmit]', error);
                Alert.alert('', 'Falha no armazenamento, tente mais uma vez.');
                setSubmitting(false);
                navigation.goBack();
            }
        },
    });

    const toggleField = (field) => formik.setFieldValue(field, !formik.values[field]);
    const toggleTillOption = (field) => {
        formik.setFieldValue(field, !formik.values[field]);
        setR1(false);
    };
    const pickTillNone = () => {
        formik.setFieldValue('ControlledBurning', false);
        formik.setFieldValue('MinimumCultivation', false);
        formik.setFieldValue('NoTill', false);
        setR1(true);
    };
    const toggleRegenerationOption = (field) => {
        formik.setFieldValue(field, !formik.values[field]);
        setR2(false);
    };
    const pickRegenerationNone = () => {
        formik.setFieldValue('AgroforestrySystems', false);
        formik.setFieldValue('RegenerationWithPlanting', false);
        formik.setFieldValue('RegenerationWithHandling', false);
        formik.setFieldValue('NaturalRegeneration', false);
        setR2(true);
    };
    const togglePastureOption = (field) => {
        formik.setFieldValue(field, !formik.values[field]);
        setR3(false);
    };
    const pickPastureNone = () => {
        formik.setFieldValue('ConsortiumHandling', false);
        formik.setFieldValue('RotatedHandling', false);
        setR3(true);
    };

    if (isLoading) return <Loading />;

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.tipsTitle}>
                Selecione abaixo as características de sua propriedade em relação a solo e vegetação
            </Text>

            <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.flexView} onPress={() => toggleField('EarthwormInsects')}>
                    <Text style={styles.caption}>Observa presença de animais como minhoca e/ou insetos no solo?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('EarthwormInsects', text)}
                        value={formik.values.EarthwormInsects}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexView} onPress={() => toggleField('DiversifiedProduction')}>
                    <Text style={styles.caption}>Realiza cultivo diversificado ou rotacionado?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('DiversifiedProduction', text)}
                        value={formik.values.DiversifiedProduction}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexView} onPress={() => toggleField('CompactedArea')}>
                    <Text style={styles.caption}>Presença de áreas compactadas?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('CompactedArea', text)}
                        value={formik.values.CompactedArea}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexView} onPress={() => toggleField('Erosion')}>
                    <Text style={styles.caption}>Presença de erosão?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('Erosion', text)}
                        value={formik.values.Erosion}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.flexView} onPress={() => toggleField('SoilAnalysisCorrection')}>
                    <Text style={styles.caption}>Realiza análise de solo e correção com orientação técnica?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('SoilAnalysisCorrection', text)}
                        value={formik.values.SoilAnalysisCorrection}
                    />
                </TouchableOpacity>

                <View style={styles.containerOption}>
                    <Text style={styles.title}>Qual a prática de manejo utilizada?</Text>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleTillOption('NoTill')}>
                        <CheckBox onPress={() => toggleTillOption('NoTill')} color="#A3A3A3" checked={formik.values.NoTill} />
                        <Text style={styles.option}>Plantio direto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleTillOption('MinimumCultivation')}>
                        <CheckBox onPress={() => toggleTillOption('MinimumCultivation')} color="#A3A3A3" checked={formik.values.MinimumCultivation} />
                        <Text style={styles.option}>Cultivo mínimo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleTillOption('ControlledBurning')}>
                        <CheckBox onPress={() => toggleTillOption('ControlledBurning')} color="#A3A3A3" checked={formik.values.ControlledBurning} />
                        <Text style={styles.option}>Queima controlada</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={pickTillNone}>
                        <CheckBox onPress={pickTillNone} color="#A3A3A3" checked={r1} />
                        <Text style={styles.option}>Nenhum</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerOption}>
                    <Text style={styles.title}>Qual tipo de manejo é realizado na recuperação de áreas?</Text>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleRegenerationOption('NaturalRegeneration')}>
                        <CheckBox onPress={() => toggleRegenerationOption('NaturalRegeneration')} color="#A3A3A3" checked={formik.values.NaturalRegeneration} />
                        <Text style={styles.option}>Regeneração natural sem manejo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleRegenerationOption('RegenerationWithHandling')}>
                        <CheckBox onPress={() => toggleRegenerationOption('RegenerationWithHandling')} color="#A3A3A3" checked={formik.values.RegenerationWithHandling} />
                        <Text style={styles.option}>Regeneração natural com manejo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleRegenerationOption('RegenerationWithPlanting')}>
                        <CheckBox onPress={() => toggleRegenerationOption('RegenerationWithPlanting')} color="#A3A3A3" checked={formik.values.RegenerationWithPlanting} />
                        <Text style={styles.option}>Plantio total na área</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleRegenerationOption('AgroforestrySystems')}>
                        <CheckBox onPress={() => toggleRegenerationOption('AgroforestrySystems')} color="#A3A3A3" checked={formik.values.AgroforestrySystems} />
                        <Text style={styles.option}>Sistemas agroflorestais</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={pickRegenerationNone}>
                        <CheckBox onPress={pickRegenerationNone} color="#A3A3A3" checked={r2} />
                        <Text style={styles.option}>Nenhum</Text>
                    </TouchableOpacity>
                </View>

                {bovino && (
                    <View style={styles.containerOption}>
                        <Text style={styles.title}>Qual o tipo de manejo da pastagem?</Text>
                        <TouchableOpacity style={styles.flexViewOption} onPress={() => togglePastureOption('RotatedHandling')}>
                            <CheckBox onPress={() => togglePastureOption('RotatedHandling')} color="#A3A3A3" checked={formik.values.RotatedHandling} />
                            <Text style={styles.option}>Rotacionado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flexViewOption} onPress={() => togglePastureOption('ConsortiumHandling')}>
                            <CheckBox onPress={() => togglePastureOption('ConsortiumHandling')} color="#A3A3A3" checked={formik.values.ConsortiumHandling} />
                            <Text style={styles.option}>Consorciado</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flexViewOption} onPress={pickPastureNone}>
                            <CheckBox onPress={pickPastureNone} color="#A3A3A3" checked={r3} />
                            <Text style={styles.option}>Nenhum</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity style={styles.Button} onPress={formik.handleSubmit}>
                    {formik.isSubmitting ? (
                        <>
                            <Text style={styles.ButtonText}>Salvando </Text>
                            <ActivityIndicator color="#fff" size="large" />
                        </>
                    ) : (
                        <Text style={styles.ButtonText}>Salvar</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
