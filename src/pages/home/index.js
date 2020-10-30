import { 
    View, 
    Image, 
    Alert,
    Text, 
    ScrollView, 
    StatusBar,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import BulletFull  from '../../utils/bullets';
import Loading  from '../../utils/loading';
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Home() {
    
    const navigation = useNavigation()
    const [isLoading,setLoading] = useState(true);
    const [control,setControl] = useState();
    const [land,setLand] = useState();
        

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

        setControl(await getControl())
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
    :
        <>
            <StatusBar backgroundColor="#00753E" barStyle='light-content' />

            <View style={styles.container}>

                <View style={styles.header}>    
                    <Image source={logoImg} />
                    <Text style={styles.headerText}>
                        Total de <Text style={styles.headerTextBold}>0 recomendações</Text>.
                    </Text>
                </View>

                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.description}>Siga os passos abaixo</Text>
                
                <ScrollView style={styles.stepList} showsVerticalScrollIndicator={false}>
                    {control.boolCaracterization &&
                        <TouchableOpacity onPress={() => deleteData()}>
                        <View style={styles.trashFarm}>
                            <Text>Remover esta propriedade?
                        <Feather name='trash-2' size={20} color='#AD0900' onPress={() => deleteData() }
                        />
                        </Text>
                        </View>
                        </TouchableOpacity>
                    }
                      <BulletFull
                        number={1}
                        description='Caracterização da propriedade'
                        stepBefore={true}
                        data={land}
                        control={control}
                        currentStep={control.boolCaracterization}
                        page="Caracterization"
                    />
                
                    
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
                                Alert.alert('Você excluiu uma produção, não é!? :)',
                                `Você será redirecionado para preencher o passo de Gestão de resíduos novamente.`,
                                    [
                                        {text: 'ok', onPress: () => navigation.navigate('WasteManagement')},
                                    ], {})
                            } else if (allStepsTrue) {
                                Alert.alert("",
                                    "Também estamos ansiosos, este recurso estará disponível em breve...",
                                ) 
                            } else {
                                Alert.alert("",
                                    "Você precisa preencher todos os passos acima...",
                                ) 
                                
                            }
                        }}
                        disabled={false}
                        >
                        <Text style={styles.ButtonText}>Processar recomendações</Text>
                    
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
} 

