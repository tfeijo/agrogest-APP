import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    StatusBar, 
    TouchableOpacity,
    Alert
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { AppLoading } from 'expo';

import createLand from './../../utils/createLand';
import createControl from './../../utils/createControl';
import logoImg from '../../assets/logo.png';
import styles from './styles';


export default function Home() {

    const landCreate = createLand;
    const controlCreate = createControl;
    const [isLoading,setLoading] = useState(true);
    const [control,setControl] = useState();
    const [land,setLand] = useState();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    function navigateTo(page=''){
        navigation.navigate(page);
    }

    async function getInfo(){
        setControl(await controlCreate.getData());
        setLand(await landCreate.getData());
        return control;
    }

    useEffect(() => {
        if (isFocused && !isLoading){
            getInfo();
        }
    }, [isFocused])

    return isLoading === true ?
        <AppLoading
         startAsync={getInfo}
         onFinish={() => setLoading(false)}
         onError={console.warn}
       />
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
                        description='Porte da propriedade'
                        stepBefore={true}
                        data={land}
                        currentStep={control.boolCaracterization}
                        page="Caracterization"/>

                    <BulletFull
                        number={2}
                        description='Produção da propriedade'
                        stepBefore={control.boolCaracterization}
                        currentStep={control.boolProduction}
                        page="Production"/>
                    
                    <BulletFull
                        number={3}
                        description='Legislação Ambiental'
                        stepBefore={control.boolProduction}
                        currentStep={control.boolLegislation}
                        page="Legislation"/>
                    
                    <BulletFull
                        number={4}
                        description='Recursos Hídricos'
                        stepBefore={control.boolLegislation}
                        currentStep={control.boolWaterResource}
                        page="WaterResources"/>
                    
                    <BulletFull
                        number={5}
                        description='Solo e vegetação'
                        stepBefore={control.boolWaterResource}
                        currentStep={control.boolSoilVegetation}
                        page="SoilVegetation"/>
                    
                    <BulletFull
                        number={6}
                        description='Gestão de resíduos'
                        stepBefore={control.boolSoilVegetation}
                        currentStep={control.boolWasteManagement}
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
        switch (props.page) {
            case 'Caracterization':
                return <Caracterization page={props.page} data={props.data}/>
            case 'Production':
                return <Production page={props.page} data={props.data}/>
            case 'Legislation':
                return <Legislation page={props.page} data={props.data}/>
            case 'WasteManagement':
                return <WasteManagment page={props.page} data={props.data}/>
            case 'WaterResources':
                return <WaterResource page={props.page} data={props.data}/>
            case 'SoilVegetation':
                return <SoilVegetation page={props.page} data={props.data}/>
        }
    }

    function Caracterization(props) {
        console.log(props.data.city.biomes)
        let biomeItems = props.data.city.biomes.map( (biome) => {
            return `[ ${biome.name} ]`
        });
        
        let licensing = props.data.licensing? 'SIM': 'NÃO';

        return  <View style={styles.step}>
                    <Text style={styles.stepProperty}>Cidade:</Text>
                    <Text style={styles.stepValue}> 
                        {props.data.city.name} / {props.data.city.state.uf}
                    </Text>
                    <Text style={styles.stepProperty}>BIOMA:</Text>
                    <Text style={styles.stepValue}>
                        {biomeItems}
                    </Text>
                    <Text style={styles.stepProperty}>
                        Possui licenciamento?
                    </Text>
                    <Text style={styles.stepValue}>
                        {licensing}
                    </Text>
                    <Text style={styles.stepProperty}>
                        Porte:
                    </Text>
                    <Text style={styles.stepValue}>
                        {props.data.size.name}
                    </Text>
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
                onPress={() => {
                    Alert.alert(
                        'Cuidado',
                        'Todos os dados relativos a sua propriedade serão \
apagados, até este passo. Deseja continuar?',
                        [
                          { text: 'SIM', onPress: () => {
                              console.log('SIM Pressed')
                              navigateTo(props.page)
                          }
                          },
                          { text: 'NÃO', onPress: () => console.log('Não Pressed') },
                        ],
                        { cancelable: false }
                    );
                }}
                >
                    <Text style={styles.fowardButtonText}>Preencha com novos dados</Text>
                    <Feather name='arrow-right' size={16} color='#00753E' />
                </TouchableOpacity>
    }
} 

