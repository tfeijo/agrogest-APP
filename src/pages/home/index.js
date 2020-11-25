import { 
    View, 
    Image, 
    Alert,
    Text, 
    ScrollView, 
    Switch,
    StatusBar,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    BackHandler
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BulletFull  from '../../utils/bullets';
import Loading  from '../../utils/loading';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';


export default function Home() {
    
    const navigation = useNavigation()
    const [searchingDocs,setSearchingDocs] = useState(false);
    const [isLoading,setLoading] = useState(true);
    const [control,setControl] = useState();
    const [land,setLand] = useState();
    const [editFarm,setEdit] = useState(true);
            
    const isFocused = useIsFocused();
    
    async function deleteData(){
        {
            Alert.alert('',
            `Deseja remover esta propriedade?`,
            [
                {text: 'Remover', onPress: async () => {            
                    await AsyncStorage.removeItem('control')
                    await AsyncStorage.removeItem('land')
                    await AsyncStorage.removeItem('UniqueIDLand')
                    await fetchData()
                }},
                {text: 'Cancelar', onPress: () => {}},
            ],
            {}
            )
        }
    }

    async function getInfo(){
        // await deleteData()
        await AsyncStorage.removeItem('city')
        async function getControl(){
            try{ 
              let jsonValue = await AsyncStorage.getItem('control');
              
              return jsonValue != null ? JSON.parse(jsonValue): {
                boolCaracterization : false,
                boolProduction : false,
                boolLegislation :  false,
                boolWaterResource :  false,
                boolSoilVegetation : false,
                boolWasteManagement :  false,
                productions: {
                    suinocultura : false,
                    bovi_leite : false,
                    bovi_corte : false,
                    agricultura : false,
                    avicultura : false,
                }
              } 
            } catch(err) {
              console.warn(err)
            }
        }
        async function getLand(){
            try{ 
              let jsonValue = await AsyncStorage.getItem('land');
              
              jsonValue? setEdit(jsonValue.edited): setEdit(false)
              
              return jsonValue != null ? JSON.parse(jsonValue): {
                "id": null,
                "installation_id": null,
                "hectare": null,
                "licensing": null,
                "city": {
                  "biomes":[],
                  "state": {}
                },
                "size": null,
                "productions": {},
                "attributes" : {
                    hasEnvironmentalLicensing: false,
                    hasCAR : false,
                    hasNativeVegetationLegalReserve: false,
                    hasAppAroundWaterCoursesWaterReservoirs: false,
                    hasAppAroundSpringsWaterEyes: false,
                    hasAppHillside: false,
                    hasAppHillTop: false,
                    hasEnvironmentalRegularizationPlan: false,
                    hasWaterGrant: false,
                }
              }
            } catch(err) {
              console.warn(err)
            }
        }

        setControl(await getControl());
        setLand(await getLand());
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
    :   <>
            <StatusBar backgroundColor="#00753E" barStyle='light-content' />

            <View style={styles.container}>

                <View style={styles.header}>    
                    <Image source={logoImg} />
                    <Text style={styles.headerText}>
                        Total de <Text style={styles.headerTextBold}>{
                        land.documents? Object.keys(land.documents).length: 0} recomendações</Text>.
                    </Text>
                </View>
                
                    {!control.boolCaracterization? 
                    <>
                        <Text style={styles.title}>Bem-vindo!</Text>
                        <Text style={styles.description}>Siga os passos abaixo</Text>
                        </>
                        : editFarm ?
                        <Text style={{
                            ...styles.title,
                            fontSize: 20
                        }}>Siga os passos abaixo</Text>:
                        <Text style={{
                            margin: 15
                        }}></Text>
                        
                    }
                 <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                    {(editFarm || !control.boolWasteManagement) && <>
                        {control.boolCaracterization && <TouchableOpacity onPress={() => deleteData()}>
                            <View style={styles.trashFarm}>
                                <Text>Remover esta propriedade?
                                    <Feather name='trash-2' size={20} color='#AD0900' onPress={() => deleteData() }
                                    />
                                </Text>
                            </View>
                        </TouchableOpacity>}
                    
                        <BulletFull
                            number={1}
                            description='Caracterização da propriedade'
                            stepBefore={true}
                            data={land}
                            control={control}
                            currentStep={control.boolCaracterization}
                            page="Caracterization"/>

                        
                        <BulletFull 
                            number={2}
                            description='Caracterização do sistema de produção'
                            stepBefore={control.boolCaracterization}
                            data={land}
                            control={control}
                            currentStep={control.boolProduction}
                            page="Production"/>
                        
                        <BulletFull
                            number={3}
                            description='Legislação Ambiental'
                            stepBefore={control.boolProduction}
                            data={land}
                            control={control}
                            currentStep={control.boolLegislation}
                            page="Legislation"/>
                        
                        <BulletFull
                            number={4}
                            description='Recursos Hídricos'
                            stepBefore={control.boolLegislation}
                            data={land}
                            control={control}
                            currentStep={control.boolWaterResource}
                            page="WaterResources"/>
                        
                        <BulletFull
                            number={5}
                            description='Solo e vegetação'
                            stepBefore={control.boolWaterResource}
                            data={land}
                            control={control}
                            currentStep={control.boolSoilVegetation}
                            page="SoilVegetation"/>
                        
                        <BulletFull
                            number={6}
                            description='Gestão de resíduos'
                            stepBefore={control.boolSoilVegetation}
                            data={land}
                            control={control}
                            currentStep={control.boolWasteManagement}
                            page="WasteManagement"/>
                    </>}
    
                    {control.boolWasteManagement && <>
                        <View style={styles.boxList}>
                            <View style={styles.produtionItem}>
                                <Text style={styles.activityTitle}>
                                    Alterar passos anteriores
                                </Text>
                                <Switch 
                                    style={{ marginTop: -25} }
                                    onValueChange = {async (text) => {
                                        setEdit(!editFarm)
                                    }}
                                    value = {editFarm}
                                />
                            </View>
                        </View>
                        <BulletFull
                            number={7}
                            description='Documentos técnicos recomendados'
                            currentStep={control.boolWasteManagement}
                            data={land}
                            control={control}
                            page="Documents"/>
                        
                        {(editFarm || land.documents.length == 0 || land.edited) && <>
                        <TouchableOpacity
                        style={styles.Button}
                        onPress={async ()=>{
                            
                            let jsonValue = JSON.parse(await AsyncStorage.getItem('control'));

                            if (jsonValue == null) jsonValue = {boolWasteManagement: false}
                            let allStepsTrue = (
                                jsonValue.boolCaracterization &&
                                jsonValue.boolProduction &&
                                jsonValue.boolLegislation &&
                                jsonValue.boolWaterResource &&
                                jsonValue.boolSoilVegetation &&
                                jsonValue.boolWasteManagement
                            )
                            let ChangedWasteManagemment = (
                                jsonValue.boolWasteManagement !=
                                control.boolWasteManagement
                            )

                            if (ChangedWasteManagemment) {
                                alert('Você excluiu uma produção, não é!? :) Você será redirecionado para preencher o passo de Gestão de resíduos novamente.',
                                    [
                                        {text: 'ok', onPress: () => navigation.navigate('WasteManagement')},
                                    ], {})
                            } else if (allStepsTrue) {
                                const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
                                setSearchingDocs(true)
                                land.attributes["farm_id"] = land.id
                                await api.post('attributes', land.attributes)
                                .then(async response => {
                                    let jsonFarm = JSON.parse(await AsyncStorage.getItem('land'));
                                    jsonFarm.edited = false
                                    jsonFarm["documents"] = response.data
                                    
                                    await AsyncStorage.setItem('land', JSON.stringify(jsonFarm))
                                    setLand(jsonFarm);
                                    await fetchData()
                                    backHandler.remove()
                                    
                                })
                                .catch(err => {
                                    backHandler.remove()
                                    alert('Pedimos desculpas, mas não conseguimos adicionar os atributos:( Pedimos que tente mais uma vez.')
                                });
                                setSearchingDocs(false)

                            } else {
                                alert(
                                    "Você precisa preencher todos os passos acima...",
                                ) 

                            }
                        }}
                        disabled={searchingDocs}
                        >
                            { 
                                searchingDocs ? 
                                <><Text style={styles.ButtonText}>Buscando...</Text>
                                <ActivityIndicator color='#fff' size= 'large' />
                                </>
                                :
                                land.edited?
                                    <Text style={styles.ButtonText}>Atualizar documentos</Text>
                                    :
                                    <Text style={styles.ButtonText}>Buscar documentos</Text>
                            }
                        </TouchableOpacity>
                        </>}
                    </>}
                </ScrollView>
            </View>
        </>
} 

