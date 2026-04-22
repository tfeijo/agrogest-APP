import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    BackHandler,
    Image,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import BulletFull from '../../utils/bullets';
import Loading from '../../utils/loading';
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import styles from './styles';


const defaultControl = () => ({
    boolCaracterization: false,
    boolProduction: false,
    boolLegislation: false,
    boolWaterResource: false,
    boolSoilVegetation: false,
    boolWasteManagement: false,
    productions: {
        suinocultura: false,
        bovi_leite: false,
        bovi_corte: false,
        agricultura: false,
        avicultura: false,
    },
});

const defaultLand = () => ({
    id: null,
    installation_id: null,
    hectare: null,
    licensing: null,
    city: { biomes: [], state: {} },
    size: null,
    productions: {},
    attributes: {
        hasEnvironmentalLicensing: false,
        hasCAR: false,
        hasNativeVegetationLegalReserve: false,
        hasAppAroundWaterCoursesWaterReservoirs: false,
        hasAppAroundSpringsWaterEyes: false,
        hasAppHillside: false,
        hasAppHillTop: false,
        hasEnvironmentalRegularizationPlan: false,
        hasWaterGrant: false,
    },
});

export default function Home() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [searchingDocs, setSearchingDocs] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [control, setControl] = useState(defaultControl());
    const [land, setLand] = useState(defaultLand());
    const [editFarm, setEdit] = useState(true);

    async function deleteData() {
        Alert.alert('', 'Deseja remover esta propriedade?', [
            {
                text: 'Remover',
                onPress: async () => {
                    await AsyncStorage.multiRemove(['control', 'land', 'UniqueIDLand']);
                    await fetchData();
                },
            },
            { text: 'Cancelar', onPress: () => {} },
        ]);
    }

    async function getInfo() {
        // Clear any sticky 'city' selection carried over from a previous session
        // in parallel with loading the main documents.
        const [, controlRaw, landRaw] = await Promise.all([
            AsyncStorage.removeItem('city'),
            AsyncStorage.getItem('control'),
            AsyncStorage.getItem('land'),
        ]);

        try {
            const controlValue = controlRaw != null ? JSON.parse(controlRaw) : defaultControl();
            const landValue = landRaw != null ? JSON.parse(landRaw) : defaultLand();
            setEdit(landRaw != null ? !!landValue.edited : false);
            setControl(controlValue);
            setLand(landValue);
        } catch (err) {
            console.warn('[Home.getInfo]', err);
            setControl(defaultControl());
            setLand(defaultLand());
        }
    }

    async function fetchData() {
        setLoading(true);
        await getInfo();
        setLoading(false);
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
        // fetchData is stable within this component; including it would force a
        // useCallback ceremony that does not improve correctness here.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    async function submitAttributes() {
        const controlRaw = await AsyncStorage.getItem('control');
        const storedControl = controlRaw != null ? JSON.parse(controlRaw) : { boolWasteManagement: false };

        const allStepsTrue =
            storedControl.boolCaracterization &&
            storedControl.boolProduction &&
            storedControl.boolLegislation &&
            storedControl.boolWaterResource &&
            storedControl.boolSoilVegetation &&
            storedControl.boolWasteManagement;

        const changedWasteManagement = storedControl.boolWasteManagement !== control.boolWasteManagement;

        if (changedWasteManagement) {
            Alert.alert(
                '',
                'Você excluiu uma produção, não é!? :) Você será redirecionado para preencher o passo de Gestão de resíduos novamente.',
                [{ text: 'ok', onPress: () => navigation.navigate('WasteManagement') }]
            );
            return;
        }

        if (!allStepsTrue) {
            Alert.alert('', 'Você precisa preencher todos os passos acima...');
            return;
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        setSearchingDocs(true);
        try {
            const payload = { ...land.attributes, farm_id: land.id };
            const response = await api.post('attributes', payload);
            const landRaw = await AsyncStorage.getItem('land');
            const jsonFarm = landRaw != null ? JSON.parse(landRaw) : {};
            jsonFarm.edited = false;
            jsonFarm.documents = response.data;
            await AsyncStorage.setItem('land', JSON.stringify(jsonFarm));
            setLand(jsonFarm);
            await fetchData();
        } catch (err) {
            console.warn('[Home.submitAttributes]', err);
            Alert.alert(
                '',
                'Pedimos desculpas, mas não conseguimos adicionar os atributos :( Pedimos que tente mais uma vez.'
            );
        } finally {
            backHandler.remove();
            setSearchingDocs(false);
        }
    }

    if (isLoading) return <Loading />;

    return (
        <>
            <StatusBar backgroundColor="#00753E" barStyle="light-content" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg} />
                    <Text style={styles.headerText}>
                        Total de{' '}
                        <Text style={styles.headerTextBold}>
                            {land.documents ? Object.keys(land.documents).length : 0} recomendações
                        </Text>
                        .
                    </Text>
                </View>
                <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                    {!control.boolCaracterization ? (
                        <>
                            <Text style={styles.title}>Bem-vindo!</Text>
                            <Text style={styles.description}>
                                Esse aplicativo é resultado de uma parceria da Universidade Federal de Juiz de Fora e da Embrapa - Gado de Leite.
                            </Text>
                            <Text style={styles.description}>
                                O @grogestAmbiental tem como principal objetivo lhe ajudar a encontrar as informações certas para a melhoria de suas práticas ambientais, de acordo com o cenário de sua propriedade.

                                Ao usá-lo, você deve responder alguns detalhes sobre sua propriedade, suas produções rurais e sobre as práticas ambientais que exerce. Com isso, lhe será apresentado informações sobre o porte da sua propriedade, potencial poluidor e biomas a qual você se encontra.

                                Após uma análise, o aplicativo entregará documentos técnicos, auxiliando você em pontos de melhorias das suas práticas ambientais. Com essas informações, você saberá de técnicas e informações para melhorar o desempenho ambiental da sua propriedade.
                            </Text>
                            <Text style={styles.description}>
                                Obrigado pela utilização e aproveite os benefícios!
                                Quaisquer sugestões, entre em contato através do e-mail: tfeijo@ice.ufjf.br
                            </Text>
                            <Text style={styles.description}>Siga os passos abaixo</Text>
                        </>
                    ) : editFarm ? (
                        <Text style={{ ...styles.title, fontSize: 20 }}>Siga os passos abaixo</Text>
                    ) : (
                        <Text style={{ margin: 15 }}></Text>
                    )}

                    {(editFarm || !control.boolWasteManagement) && (
                        <>
                            {control.boolCaracterization && (
                                <TouchableOpacity onPress={deleteData}>
                                    <View style={styles.trashFarm}>
                                        <Text>
                                            Remover esta propriedade?
                                            <Feather name="trash-2" size={20} color="#AD0900" onPress={deleteData} />
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            <BulletFull number={1} description="Caracterização da propriedade" stepBefore data={land} control={control} currentStep={control.boolCaracterization} page="Caracterization" />
                            <BulletFull number={2} description="Caracterização do sistema de produção" stepBefore={control.boolCaracterization} data={land} control={control} currentStep={control.boolProduction} page="Production" />
                            <BulletFull number={3} description="Legislação Ambiental" stepBefore={control.boolProduction} data={land} control={control} currentStep={control.boolLegislation} page="Legislation" />
                            <BulletFull number={4} description="Recursos Hídricos" stepBefore={control.boolLegislation} data={land} control={control} currentStep={control.boolWaterResource} page="WaterResources" />
                            <BulletFull number={5} description="Solo e vegetação" stepBefore={control.boolWaterResource} data={land} control={control} currentStep={control.boolSoilVegetation} page="SoilVegetation" />
                            <BulletFull number={6} description="Gestão de resíduos" stepBefore={control.boolSoilVegetation} data={land} control={control} currentStep={control.boolWasteManagement} page="WasteManagement" />
                        </>
                    )}

                    {control.boolWasteManagement && (
                        <>
                            <View style={styles.boxList}>
                                <View style={styles.produtionItem}>
                                    <Text style={styles.activityTitle}>Alterar passos anteriores</Text>
                                    <Switch
                                        style={{ marginTop: -25 }}
                                        onValueChange={() => setEdit(!editFarm)}
                                        value={editFarm}
                                    />
                                </View>
                            </View>
                            <BulletFull number={7} description="Documentos técnicos recomendados" currentStep={control.boolWasteManagement} data={land} control={control} page="Documents" />

                            {(editFarm || (land.documents && land.documents.length === 0) || land.edited) && (
                                <TouchableOpacity style={styles.Button} onPress={submitAttributes} disabled={searchingDocs}>
                                    {searchingDocs ? (
                                        <>
                                            <Text style={styles.ButtonText}>Buscando...</Text>
                                            <ActivityIndicator color="#fff" size="large" />
                                        </>
                                    ) : land.edited ? (
                                        <Text style={styles.ButtonText}>Atualizar documentos</Text>
                                    ) : (
                                        <Text style={styles.ButtonText}>Buscar documentos</Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        </>
                    )}
                </ScrollView>
            </View>
        </>
    );
}
