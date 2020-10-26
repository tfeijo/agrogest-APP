import { 
    View, 
    Image, 
    Alert,
    Text, 
    ScrollView, 
    StatusBar,
    AsyncStorage,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import BulletFull  from '../../utils/bullets';
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Home() {

    const [isLoading,setLoading] = useState(true);
    const [control,setControl] = useState();
    const [land,setLand] = useState();
    

    const isFocused = useIsFocused();

    async function getInfo(){
        // await AsyncStorage.removeItem('control')
        // await AsyncStorage.removeItem('land')
        // await AsyncStorage.removeItem('UniqueIDLand')

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
              } 
            } catch(err) {
              console.warn(err)
            }
        }

        setControl(await getControl())
        setLand(JSON.parse(await AsyncStorage.getItem('land')));
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

    return isLoading === true ?
        <>
            <StatusBar backgroundColor="#00753E" barStyle='light-content' />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
            }}>
                <Image
                style={{width: 300, height: 200}}
                source={{uri: 'https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif'}} />
                <Text style={{color:'#fff'}}>Buscando dados...</Text>
            </View>
        </>
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
                      <BulletFull
                        number={1}
                        description='Caracterização da propriedade'
                        stepBefore={true}
                        data={land}
                        currentStep={control.boolCaracterization}
                        page="Caracterization"/>

                     <BulletFull 
                        number={2}
                        description='Caracterização do sistema de produção'
                        stepBefore={control.boolCaracterization}
                        data={land}
                        currentStep={control.boolProduction}
                        page="Production"/>
                    
                    <BulletFull
                        number={3}
                        description='Legislação Ambiental'
                        stepBefore={control.boolProduction}
                        data={land}
                        currentStep={control.boolLegislation}
                        page="Legislation"/>
                    
                    <BulletFull
                        number={4}
                        description='Recursos Hídricos'
                        stepBefore={control.boolLegislation}
                        data={land}
                        currentStep={control.boolWaterResource}
                        page="WaterResources"/>
                    
                    <BulletFull
                        number={5}
                        description='Solo e vegetação'
                        stepBefore={control.boolWaterResource}
                        data={land}
                        currentStep={control.boolSoilVegetation}
                        page="SoilVegetation"/>
                    
                    <BulletFull
                        number={6}
                        description='Gestão de resíduos'
                        stepBefore={control.boolSoilVegetation}
                        data={land}
                        currentStep={control.boolWasteManagement}
                        productions={control.productions}
                        page="WasteManagement"/>
                    
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={()=>{
                            
                            Alert.alert(
                                "Comunicado",
                                "Também estamos ansiosos, este recurso estará disponível em breve..",
                            )
                            
                        }}
                        disabled={false}
                        >
                        <Text style={styles.ButtonText}>Processar recomendações</Text>
                    
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </>
} 

