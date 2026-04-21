import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';


export default function WaterResource() {
    const navigation = useNavigation();
    const [r1, setR1] = useState(false);
    const [r2, setR2] = useState(false);
    const [r3, setR3] = useState(false);
    const [r4, setR4] = useState(false);

    const control = createControl;

    const formik = useFormik({
        initialValues: {
            SourceProtectedWaterMine: false,
            DomesticSewageTreatment: false,
            WaterConsuptionTreatment: false,
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

                land.edited = true;
                await createLand.update({ ...land, attributes });
                await control.update({ ...JSONcontrol, boolWaterResource: true });
                setSubmitting(false);
                navigation.goBack();
            } catch (error) {
                console.warn('[WaterResource.onSubmit]', error);
                alert('Falha no armazenamento, tente mais uma vez.');
                setSubmitting(false);
                navigation.goBack();
            }
        },
    });

    // r1..r3 are sewage-treatment options; r4 is "none" (mutually exclusive).
    // We compute the next state up-front so the Formik flag stays in sync.
    const toggleSewage = (which) => {
        const next1 = which === 'r1' ? !r1 : r1;
        const next2 = which === 'r2' ? !r2 : r2;
        const next3 = which === 'r3' ? !r3 : r3;
        formik.setFieldValue('DomesticSewageTreatment', next1 || next2 || next3);
        if (which === 'r1') setR1(next1);
        if (which === 'r2') setR2(next2);
        if (which === 'r3') setR3(next3);
        setR4(false);
    };

    const toggleNone = () => {
        const next = !r4;
        setR4(next);
        if (next) {
            setR1(false);
            setR2(false);
            setR3(false);
            formik.setFieldValue('DomesticSewageTreatment', false);
        }
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.tipsTitle}>
                Selecione abaixo as características de sua propriedade em relação a recursos hídricos
            </Text>

            <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.flexView}
                    onPress={() => formik.setFieldValue('SourceProtectedWaterMine', !formik.values.SourceProtectedWaterMine)}
                >
                    <Text style={styles.caption}>Nascente ou mina de água protegida?</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('SourceProtectedWaterMine', text)}
                        value={formik.values.SourceProtectedWaterMine}
                    />
                </TouchableOpacity>

                <View style={styles.containerOption}>
                    <Text style={{ margin: 8, fontWeight: 'bold' }}>Destinação do esgoto doméstico:</Text>

                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleSewage('r1')}>
                        <CheckBox onPress={() => toggleSewage('r1')} color="#A3A3A3" checked={r1} />
                        <Text style={styles.option}>Fossa biodigestora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleSewage('r2')}>
                        <CheckBox onPress={() => toggleSewage('r2')} color="#A3A3A3" checked={r2} />
                        <Text style={styles.option}>Fossa negra/infiltração</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={() => toggleSewage('r3')}>
                        <CheckBox onPress={() => toggleSewage('r3')} color="#A3A3A3" checked={r3} />
                        <Text style={styles.option}>Outra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flexViewOption} onPress={toggleNone}>
                        <CheckBox onPress={toggleNone} color="#A3A3A3" checked={r4} />
                        <Text style={styles.option}>Nenhum</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.flexView}
                    onPress={() => formik.setFieldValue('WaterConsuptionTreatment', !formik.values.WaterConsuptionTreatment)}
                >
                    <Text style={styles.caption}>Água de consumo humano/animal e para limpeza tratada</Text>
                    <Switch
                        onValueChange={(text) => formik.setFieldValue('WaterConsuptionTreatment', text)}
                        value={formik.values.WaterConsuptionTreatment}
                    />
                </TouchableOpacity>

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
