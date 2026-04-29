import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { CheckBox } from 'native-base';
import { useFormik } from 'formik';

import Header from '../../utils/header';
import Loading from '../../utils/loading';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';


export default function WasteManagement() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const control = createControl;

    const [isLoading, setLoading] = useState(true);
    const [suino, setSuino] = useState(false);
    const [bovino, setBovino] = useState(false);
    const [avino, setAvino] = useState(false);
    const [agricultura, setAgricultura] = useState(false);
    const [pecuaria, setPecuaria] = useState(false);

    // Residue-composting treatment options: r5/r6/r7/r9 are four treatments,
    // r8 is the mutually-exclusive "Nenhum".
    const [r5, setR5] = useState(false); // Lagoa
    const [r6, setR6] = useState(false); // Biodigestor anaeróbico
    const [r7, setR7] = useState(false); // Esterqueira
    const [r9, setR9] = useState(false); // Compostagem
    const [r8, setR8] = useState(false); // Nenhum

    // Dead-animal-composting options: r1/r2/r3/r4 are four treatments,
    // r10 is the mutually-exclusive "Nenhum".
    const [r1, setR1] = useState(false);
    const [r2, setR2] = useState(false);
    const [r3, setR3] = useState(false);
    const [r4, setR4] = useState(false);
    const [r10, setR10] = useState(false);

    const formik = useFormik({
        initialValues: {
            ResidueComposting: false,
            BovineCattle: false,
            BovineDung: false,
            BovineFertigation: false,
            SwineCattle: false,
            SwineDung: false,
            SwineFertigation: false,
            WaterControlProgram: false,
            AviaryWastinAgriculture: false,
            ReuseAgriculturalResidue: false,
            DeadCompostAnimals: false,
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

                land.edited = false;
                await createLand.update({ ...land, attributes, documents: [] });
                await control.update({ ...JSONcontrol, boolWasteManagement: true });
                setSubmitting(false);
                navigation.goBack();
            } catch (error) {
                console.warn('[WasteManagement.onSubmit]', error);
                Alert.alert('', 'Falha no armazenamento, tente mais uma vez.');
                setSubmitting(false);
                navigation.goBack();
            }
        },
    });

    async function getInfo() {
        try {
            const raw = await AsyncStorage.getItem('control');
            if (raw == null) return;
            const parsed = JSON.parse(raw);
            const p = parsed.productions || {};
            setBovino(!!(p.bovi_leite || p.bovi_corte));
            setAvino(!!p.avicultura);
            setSuino(!!p.suinocultura);
            setAgricultura(!!p.agricultura);
            setPecuaria(!!(p.bovi_corte || p.bovi_leite || p.avicultura || p.suinocultura));
        } catch (err) {
            console.warn('[WasteManagement.getInfo]', err);
        }
    }

    async function fetchData() {
        setLoading(true);
        await getInfo();
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    // Residue (r5..r9) group: compute next state up-front so the Formik flag
    // is derived from the *next* union of checkboxes, not the previous one.
    const toggleResidue = (which) => {
        const next5 = which === 'r5' ? !r5 : r5;
        const next6 = which === 'r6' ? !r6 : r6;
        const next7 = which === 'r7' ? !r7 : r7;
        const next9 = which === 'r9' ? !r9 : r9;
        formik.setFieldValue('ResidueComposting', next5 || next6 || next7 || next9);
        if (which === 'r5') setR5(next5);
        if (which === 'r6') setR6(next6);
        if (which === 'r7') setR7(next7);
        if (which === 'r9') setR9(next9);
        setR8(false);
    };
    const pickResidueNone = () => {
        const next = !r8;
        setR8(next);
        if (next) {
            setR5(false);
            setR6(false);
            setR7(false);
            setR9(false);
            formik.setFieldValue('ResidueComposting', false);
        }
    };

    // Dead-animal (r1..r4) group: same pattern.
    const toggleDead = (which) => {
        const next1 = which === 'r1' ? !r1 : r1;
        const next2 = which === 'r2' ? !r2 : r2;
        const next3 = which === 'r3' ? !r3 : r3;
        const next4 = which === 'r4' ? !r4 : r4;
        formik.setFieldValue('DeadCompostAnimals', next1 || next2 || next3 || next4);
        if (which === 'r1') setR1(next1);
        if (which === 'r2') setR2(next2);
        if (which === 'r3') setR3(next3);
        if (which === 'r4') setR4(next4);
        setR10(false);
    };
    const pickDeadNone = () => {
        const next = !r10;
        setR10(next);
        if (next) {
            setR1(false);
            setR2(false);
            setR3(false);
            setR4(false);
            formik.setFieldValue('DeadCompostAnimals', false);
        }
    };

    const toggleField = (field) => formik.setFieldValue(field, !formik.values[field]);

    if (isLoading) return <Loading />;

    return (
        <>
            <StatusBar backgroundColor="#00753E" barStyle="light-content" />
            <View style={styles.container}>
                <Header />
                <Text style={styles.tipsTitle}>
                    Selecione abaixo as características de sua propriedade em relação a gestão de resíduo
                </Text>

                <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                    {pecuaria && (
                        <>
                            <View style={styles.containerOption}>
                                <Text style={{ margin: 8, fontWeight: 'bold' }}>
                                    Tratamento dos resíduos gerados pelos animais:
                                </Text>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleResidue('r5')}>
                                    <CheckBox onPress={() => toggleResidue('r5')} color="#A3A3A3" checked={r5} />
                                    <Text style={styles.option}>Lagoa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleResidue('r6')}>
                                    <CheckBox onPress={() => toggleResidue('r6')} color="#A3A3A3" checked={r6} />
                                    <Text style={styles.option}>Biodigestor anaeróbico</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleResidue('r7')}>
                                    <CheckBox onPress={() => toggleResidue('r7')} color="#A3A3A3" checked={r7} />
                                    <Text style={styles.option}>Esterqueira</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleResidue('r9')}>
                                    <CheckBox onPress={() => toggleResidue('r9')} color="#A3A3A3" checked={r9} />
                                    <Text style={styles.option}>Compostagem</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={pickResidueNone}>
                                    <CheckBox onPress={pickResidueNone} color="#A3A3A3" checked={r8} />
                                    <Text style={styles.option}>Nenhum</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerOption}>
                                <Text style={{ margin: 8, fontWeight: 'bold' }}>
                                    Destino das carcaças dos bovinos mortos (bezerros e adultos):
                                </Text>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleDead('r1')}>
                                    <CheckBox onPress={() => toggleDead('r1')} color="#A3A3A3" checked={r1} />
                                    <Text style={styles.option}>Compostagem na propriedade</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleDead('r2')}>
                                    <CheckBox onPress={() => toggleDead('r2')} color="#A3A3A3" checked={r2} />
                                    <Text style={styles.option}>Enterrado na propriedade</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleDead('r3')}>
                                    <CheckBox onPress={() => toggleDead('r3')} color="#A3A3A3" checked={r3} />
                                    <Text style={styles.option}>Deixa no local de morte ou em outro local</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleDead('r4')}>
                                    <CheckBox onPress={() => toggleDead('r4')} color="#A3A3A3" checked={r4} />
                                    <Text style={styles.option}>Outros</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={pickDeadNone}>
                                    <CheckBox onPress={pickDeadNone} color="#A3A3A3" checked={r10} />
                                    <Text style={styles.option}>Nenhum</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {formik.values.ResidueComposting && bovino && (
                        <View style={styles.containerOption}>
                            <Text style={styles.title}>
                                Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de{' '}
                                <Text style={styles.bold}>BOVINOS</Text>:
                            </Text>
                            <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('BovineCattle')}>
                                <CheckBox onPress={() => toggleField('BovineCattle')} color="#A3A3A3" checked={formik.values.BovineCattle} />
                                <Text style={styles.option}>Biodigestor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('BovineDung')}>
                                <CheckBox onPress={() => toggleField('BovineDung')} color="#A3A3A3" checked={formik.values.BovineDung} />
                                <Text style={styles.option}>Esterqueira</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('BovineFertigation')}>
                                <CheckBox onPress={() => toggleField('BovineFertigation')} color="#A3A3A3" checked={formik.values.BovineFertigation} />
                                <Text style={styles.option}>Fertirrigação</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {formik.values.ResidueComposting && suino && (
                        <>
                            <View style={styles.containerOption}>
                                <Text style={styles.title}>
                                    Selecione abaixo o(s) tratamento(s) de resíduos realizado(s) na produção de{' '}
                                    <Text style={styles.bold}>SUÍNOS</Text>:
                                </Text>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('SwineCattle')}>
                                    <CheckBox onPress={() => toggleField('SwineCattle')} color="#A3A3A3" checked={formik.values.SwineCattle} />
                                    <Text style={styles.option}>Biodigestor</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('SwineDung')}>
                                    <CheckBox onPress={() => toggleField('SwineDung')} color="#A3A3A3" checked={formik.values.SwineDung} />
                                    <Text style={styles.option}>Esterqueira</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleField('SwineFertigation')}>
                                    <CheckBox onPress={() => toggleField('SwineFertigation')} color="#A3A3A3" checked={formik.values.SwineFertigation} />
                                    <Text style={styles.option}>Fertirrigação</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.flexView} onPress={() => toggleField('WaterControlProgram')}>
                                <Text style={styles.caption}>
                                    A produção de suíno tem programa de controle de consumo de água?
                                </Text>
                                <Switch
                                    onValueChange={(text) => formik.setFieldValue('WaterControlProgram', text)}
                                    value={formik.values.WaterControlProgram}
                                />
                            </TouchableOpacity>
                        </>
                    )}

                    {formik.values.ResidueComposting && avino && (
                        <TouchableOpacity style={styles.flexView} onPress={() => toggleField('AviaryWastinAgriculture')}>
                            <Text style={styles.caption}>O resíduo de cama de aviário é aplicado na agricultura?</Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('AviaryWastinAgriculture', text)}
                                value={formik.values.AviaryWastinAgriculture}
                            />
                        </TouchableOpacity>
                    )}

                    {agricultura && (
                        <TouchableOpacity style={styles.flexView} onPress={() => toggleField('ReuseAgriculturalResidue')}>
                            <Text style={styles.caption}>O resíduo da produção agrícola é utilizado na propriedade?</Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('ReuseAgriculturalResidue', text)}
                                value={formik.values.ReuseAgriculturalResidue}
                            />
                        </TouchableOpacity>
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
        </>
    );
}
