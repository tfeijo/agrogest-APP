import React from 'react';
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
import { Feather } from '@expo/vector-icons';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

import Header from '../../utils/header';
import createControl from '../../utils/createControl';
import createLand from '../../utils/createLand';
import styles from './styles';


export default function Legislation() {
    const navigation = useNavigation();
    const control = createControl;

    const formik = useFormik({
        initialValues: {
            EnvironmentalLicensing: false,
            CAR: false,
            PresenceMaintenanceVegetation: false,
            NativeVegetationLegalReserve: false,
            AppAroundWaterCoursesWaterReservoirs: false,
            IntegralVegetation: false,
            AppAroundSpringsWaterEyes: false,
            AppHillside: false,
            AppHillTop: false,
            EnvironmentalRegularizationPlan: false,
            WaterGrant: false,
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
                await control.update({ ...JSONcontrol, boolLegislation: true });
                setSubmitting(false);
                navigation.goBack();
            } catch (error) {
                console.warn('[Legislation.onSubmit]', error);
                alert('Falha no armazenamento, tente mais uma vez.');
                setSubmitting(false);
                navigation.goBack();
            }
        },
    });

    const setAppFlags = (value) => {
        formik.setFieldValue('CAR', value);
        formik.setFieldValue('NativeVegetationLegalReserve', value);
        formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', value);
        formik.setFieldValue('AppAroundSpringsWaterEyes', value);
        formik.setFieldValue('AppHillside', value);
        formik.setFieldValue('AppHillTop', value);
        formik.setFieldValue('EnvironmentalRegularizationPlan', value);
        formik.setFieldValue('WaterGrant', value);
    };

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.tipsTitle}>
                Selecione abaixo as características de sua propriedade em relação a legislação ambiental
            </Text>

            <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.flexView}
                    onPress={() => {
                        const next = !formik.values.EnvironmentalLicensing;
                        formik.setFieldValue('EnvironmentalLicensing', next);
                        setAppFlags(true);
                    }}
                >
                    <Text style={styles.caption}>Possui licenciamento ambiental?</Text>
                    <Switch
                        onValueChange={(text) => {
                            formik.setFieldValue('EnvironmentalLicensing', text);
                            setAppFlags(true);
                        }}
                        value={formik.values.EnvironmentalLicensing}
                    />
                </TouchableOpacity>

                {!formik.values.EnvironmentalLicensing && (
                    <>
                        <TouchableOpacity
                            style={styles.flexView}
                            onPress={() => formik.setFieldValue('CAR', !formik.values.CAR)}
                        >
                            <Text style={styles.caption}>Possui cadastro ambiental rural - CAR?</Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('CAR', text)}
                                value={formik.values.CAR}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.flexView}
                            onPress={() => formik.setFieldValue('NativeVegetationLegalReserve', !formik.values.NativeVegetationLegalReserve)}
                        >
                            <Text style={styles.caption}>
                                Possui área com cobertura de vegetação nativa que atende percentual de Reserva Legal?
                            </Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('NativeVegetationLegalReserve', text)}
                                value={formik.values.NativeVegetationLegalReserve}
                            />
                        </TouchableOpacity>

                        <View style={styles.containerOption}>
                            <Text style={{ ...styles.title, fontWeight: 'bold' }}>
                                Possui Área de Preservação Permanente-APP em conformidade com o Código Florestal:
                            </Text>
                            <TouchableOpacity
                                style={styles.flexViewOption}
                                onPress={() => {
                                    const next = !formik.values.AppAroundWaterCoursesWaterReservoirs;
                                    formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', next);
                                    formik.setFieldValue('IntegralVegetation', next);
                                }}
                            >
                                <CheckBox
                                    onPress={() => {
                                        const next = !formik.values.AppAroundWaterCoursesWaterReservoirs;
                                        formik.setFieldValue('AppAroundWaterCoursesWaterReservoirs', next);
                                        formik.setFieldValue('IntegralVegetation', next);
                                    }}
                                    color="#A3A3A3"
                                    checked={formik.values.AppAroundWaterCoursesWaterReservoirs}
                                />
                                <Text style={styles.option}>Em torno dos cursos hídricos e reservatórios de água</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.flexViewOption}
                                onPress={() => formik.setFieldValue('AppAroundSpringsWaterEyes', !formik.values.AppAroundSpringsWaterEyes)}
                            >
                                <CheckBox
                                    onPress={() => formik.setFieldValue('AppAroundSpringsWaterEyes', !formik.values.AppAroundSpringsWaterEyes)}
                                    color="#A3A3A3"
                                    checked={formik.values.AppAroundSpringsWaterEyes}
                                />
                                <Text style={styles.option}>Em nascentes e olhos d'água</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.flexViewOption}
                                onPress={() => {
                                    const next = !formik.values.AppHillside;
                                    formik.setFieldValue('AppHillside', next);
                                    formik.setFieldValue('PresenceMaintenanceVegetation', next);
                                }}
                            >
                                <CheckBox
                                    onPress={() => {
                                        const next = !formik.values.AppHillside;
                                        formik.setFieldValue('AppHillside', next);
                                        formik.setFieldValue('PresenceMaintenanceVegetation', next);
                                    }}
                                    color="#A3A3A3"
                                    checked={formik.values.AppHillside}
                                />
                                <Text style={styles.option}>Em encostas</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.flexViewOption}
                                onPress={() => formik.setFieldValue('AppHillTop', !formik.values.AppHillTop)}
                            >
                                <CheckBox
                                    onPress={() => formik.setFieldValue('AppHillTop', !formik.values.AppHillTop)}
                                    color="#A3A3A3"
                                    checked={formik.values.AppHillTop}
                                />
                                <Text style={styles.option}>Em topo de morro</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.flexView}
                            onPress={() => formik.setFieldValue('EnvironmentalRegularizationPlan', !formik.values.EnvironmentalRegularizationPlan)}
                        >
                            <Text style={styles.caption}>Possui Plano de Regularização Ambiental?</Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('EnvironmentalRegularizationPlan', text)}
                                value={formik.values.EnvironmentalRegularizationPlan}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.flexView}
                            onPress={() => formik.setFieldValue('WaterGrant', !formik.values.WaterGrant)}
                        >
                            <Text style={styles.caption}>Possui outorga de uso da água?</Text>
                            <Switch
                                onValueChange={(text) => formik.setFieldValue('WaterGrant', text)}
                                value={formik.values.WaterGrant}
                            />
                        </TouchableOpacity>
                    </>
                )}
                {formik.values.EnvironmentalLicensing && (
                    <View style={styles.congratulation}>
                        <Feather name="activity" size={35} color="#00753E" />
                        <Text>
                            Parabéns! Se sua propridade já possui licenciamento ambiental, ela se encontra em conformidade com a legislação ambiental.
                        </Text>
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
