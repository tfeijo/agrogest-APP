import React from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const navigation = useNavigation();
    
    initialRun()

    const boolCaracterization = AsyncStorage.getItem('boolCaracterization')
    const boolProduction = AsyncStorage.getItem('boolProduction')
    const boolLegislation = AsyncStorage.getItem('boolLegislation')
    const boolWaterResource = AsyncStorage.getItem('boolWaterResource')
    const boolSoilVegetation = AsyncStorage.getItem('boolSoilVegetation')
    const boolWasteManagement = AsyncStorage.getItem('boolWasteManagement')

    function navigateTo(page=''){
        navigation.navigate(page);
    }

    return (
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
                
                <BulletTitle number={1} description='Porte da propriedade'/>
                {bulletCaracterization(boolCaracterization)}
                
                <BulletTitle number={2} description='Produção da propriedadee'/>
                {bulletProduction(boolProduction, boolCaracterization)}
                
                <BulletTitle number={3} description='Legislação ambiental'/>
                {bulletLegislation(boolLegislation, boolProduction)}                
                
                <BulletTitle number={4} description='Recursos hídricos'/>
                {bulletWaterResource(boolWaterResource,boolLegislation)}                
                
                <BulletTitle number={5} description='Solo e vegetação'/>
                {bulletSoilVegetation(boolSoilVegetation,boolWaterResource)}                
                
                <BulletTitle number={6} description='Gestão de resíduos'/>
                {bulletWasteManagment(boolWasteManagement,boolSoilVegetation)}                
            </ScrollView>
        </View>
    )
    
    function BulletTitle(props){
        return (
            <View style={styles.stepTitle}>
                <Text style={styles.stepTitleText}>
                    <Text style={styles.stepTitleTextBold}>PASSO {props.number}: </Text>
                    {props.description}
                </Text>
            </View>
        )
    }
    
    function bulletCaracterization(boolCaracterization, page = 'Caracterization') { 
        if (boolCaracterization) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Tamanho da propriedade:</Text>
                    <Text style={styles.stepValue}>150 ha</Text>
                    <Text style={styles.stepProperty}>Porte da propriedade:</Text>
                    <Text style={styles.stepValue}>GRANDE</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(true, page);
    }
    
    function bulletProduction(boolProduction, boolCaracterization, page = 'Production') { 
        if (boolProduction) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(boolCaracterization, page);
    }
    
    function bulletLegislation(boolLegislation, boolProduction, page = 'Legislation') { 
        if (boolLegislation) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(boolProduction, page);
    }
    
    function bulletWaterResource(boolWaterResource, boolLegislation, page = 'WaterResources') { 
        if (boolWaterResource) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(boolLegislation, page);
    }
    function bulletSoilVegetation(boolSoilVegetation, boolWaterResource, page = 'SoilVegetation') { 
        if (boolSoilVegetation) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(boolWaterResource, page);
    }
    function bulletWasteManagment(boolWasteManagement, boolSoilVegetation, page = 'WasteManagement') { 
        if (boolWasteManagement) {
            return (
                <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    {fowardButton(page)}
                </View>
            );
        }
        return bulletEmpty(boolSoilVegetation, page);
    }

    function bulletEmpty(beforeStep = true, page =''){

        if(beforeStep) 
            return (
                <View style={styles.stepListEmpty}>
                    <View style={styles.stepEmpty}>
                        <TouchableOpacity
                            style={styles.fowardButtonEmpty}
                            onPress={() => navigateTo(page)}
                        >
                            <Text style={{color: '#000', fontSize: 20}}>Clique para preencher.</Text>
                            <Feather name='arrow-right' size={25} color='#00753E' />
        
                        </TouchableOpacity>
                    </View>
                </View>
            );
        
        return (
            <View style={styles.stepListEmpty}>
                <View style={styles.stepEmpty}>
                        <Text style={styles.stepEmptyText}>Preencha os anteriores.</Text>
                </View>
            </View>
        );
    
        
            
    }
    
    function fowardButton(page) {
        return(
            <TouchableOpacity
            style={styles.fowardButton}
            onPress={() => navigateTo(page)}
            >
                <Text style={styles.fowardButtonText}>Preencha com novos dados</Text>
                <Feather name='arrow-right' size={16} color='#00753E' />
            </TouchableOpacity>
        )
    }

    async function initialRun() {
        const firstRun =  async () => {
            try {
              const value = await AsyncStorage.getItem('firstRun')
              if(value !== null) {
                // value previously stored
              }
            } catch(e) {
              // error reading value
            }
        }
    
        if (!firstRun) {
            try {
                await AsyncStorage.setItem('boolCaracterization', false)
                await AsyncStorage.setItem('boolProduction', false)
                await AsyncStorage.setItem('boolLegislation', false)
                await AsyncStorage.setItem('boolWaterResource', false)
                await AsyncStorage.setItem('boolSoilVegetation', false)
                await AsyncStorage.setItem('boolWasteManagement', false)
                await AsyncStorage.setItem('firstRun', true)
            } catch (e) {
                console.log(e);
            }
        }
    }
} 


