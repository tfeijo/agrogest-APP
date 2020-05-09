import React from 'react';
import { View, Image, Text, ScrollView, AsyncStorage, StatusBar, TouchableOpacity } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    constructor(
        
    );

    const navigation = useNavigation();

    function navigateTo(page=''){
        navigation.navigate(page);
    }

    var json = {

        firstRun : true,
        boolCaracterization : false,
        boolProduction : false,
        boolLegislation :  false,
        boolWaterResource :  false,
        boolSoilVegetation : false,
        boolWasteManagement :  false
    };

    
    console.log(json.boolCaracterization)
    return <>
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
                            description='Porte da propriedade'
                            stepBefore={true}
                            currentStep={json.boolCaracterization}
                            page="Caracterization"/>

                        <BulletFull
                            number={2}
                            description='Produção da propriedade'
                            stepBefore={json.boolCaracterization}
                            currentStep={json.boolProduction}
                            page="Production"/>
                        
                        <BulletFull
                            number={3}
                            description='Legislação Ambiental'
                            stepBefore={json.boolProduction}
                            currentStep={json.boolLegislation}
                            page="Legislation"/>
                        
                        <BulletFull
                            number={4}
                            description='Recursos Hídricos'
                            stepBefore={json.boolLegislation}
                            currentStep={json.boolWaterResource}
                            page="WaterResources"/>
                        
                        <BulletFull
                            number={5}
                            description='Solo e vegetação'
                            stepBefore={json.boolWaterResource}
                            currentStep={json.boolSoilVegetation}
                            page="SoilVegetation"/>
                        
                        <BulletFull
                            number={6}
                            description='Gestão de resíduos'
                            stepBefore={json.boolSoilVegetation}
                            currentStep={json.boolWasteManagement}
                            page="WasteManagement"/>
                    </ScrollView>
                </View>
            </>
        
    
    function BulletFull(props) {
        
        return  <>
                    <BulletTitle number={props.number} description={props.description}/>
                    <BulletContainer { ... props} />
                </>
    }
    function BulletTitle(props){
        return  <View style={styles.stepTitle}>
                    <Text style={styles.stepTitleText}>
                        <Text style={styles.stepTitleTextBold}>PASSO {props.number}: </Text>
                        {props.description}
                    </Text>
                </View>
    }
    function BulletContainer(props) { 
        if (!props.currentStep) {
            return <BulletEmpty page={props.page} stepBefore={props.stepBefore}/>;
        }
        console.log(props.page)
        switch (props.page) {
            case 'Caracterization':
                return <Caracterization page={props.page}/>
            case 'Production':
                return <Production page={props.page}/>
            case 'Legislation':
                return <Legislation page={props.page}/>
            case 'WasteManagement':
                return <WasteManagment page={props.page}/>
            case 'WaterResources':
                return <WaterResource page={props.page}/>
            case 'SoilVegetation':
                return <SoilVegetation page={props.page}/>
        }
    }
    function Caracterization(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}>Juiz de Fora</Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>ABCXXXX</Text>
                    <Text style={styles.stepProperty}>Possui licenciamento?</Text>
                    <Text style={styles.stepValue}>SIM</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function Legislation(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Legislation: </Text>
                    <Text style={styles.stepValue}>Legislação</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function Production(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Production: </Text>
                    <Text style={styles.stepValue}>Produção</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function WaterResource(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Water Resources: </Text>
                    <Text style={styles.stepValue}>Recursos hídricos</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function SoilVegetation(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Soil and Vegetation:</Text>
                    <Text style={styles.stepValue}>Solo e vegetação</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function WasteManagment(props) { 
        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Waste Management:</Text>
                    <Text style={styles.stepValue}>Gerenciamento de resíduos</Text>
                    <FowardButton page={props.page}/>
                </View>
    }
    function BulletEmpty(props){
        if(props.stepBefore) 
            return <View style={styles.stepListEmpty}>
                        <View style={styles.stepEmpty}>
                            <TouchableOpacity
                                style={styles.fowardButtonEmpty}
                                onPress={() => navigateTo(props.page)}
                            >
                                <Text style={{color: '#000', fontSize: 20}}>Clique para preencher.</Text>
                                <Feather name='arrow-right' size={25} color='#00753E' />

                            </TouchableOpacity>
                        </View>
                    </View>

        return (
            <View style={styles.stepListEmpty}>
                <View style={styles.stepEmpty}>
                        <Text style={styles.stepEmptyText}>Preencha os anteriores.</Text>
                </View>
            </View>
        );
    }
    function FowardButton(props) {
        return  <TouchableOpacity
                style={styles.fowardButton}
                onPress={() => navigateTo(props.page)}
                >
                    <Text style={styles.fowardButtonText}>Preencha com novos dados</Text>
                    <Feather name='arrow-right' size={16} color='#00753E' />
                </TouchableOpacity>
    }
} 

