import React from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';



export default function BulletFull (props) {
    
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

    let biomeItems = props.data.city.biomes.map( (biome) => {
        return <Text style={styles.biomes} key={biome.name}>{biome.name}</Text>
    });
    
    let licensing = props.data.licensing? 'SIM': 'NÃO';

    return  <View style={styles.step}>
                <Text style={styles.stepProperty}>Cidade:</Text>
                <Text style={styles.stepValue}> 
                    {props.data.city.name} / {props.data.city.state.uf}
                </Text>
                <Text style={styles.stepProperty}>BIOMA:</Text>
                    {biomeItems}
                <Text></Text>
                <Text style={styles.stepProperty}>
                    Possui licenciamento?
                </Text>
                <Text style={styles.stepValue}>
                    {licensing}
                </Text>
                <Text style={styles.stepProperty}>
                    Tamanho:
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
    let navigation = useNavigation()
    const productions= props.data.productions.map( (production) => {

        return <View style={styles.production} key={production.id}>
            <View style={styles.box}>
                <Text style={styles.productionTitle}>{production.activity}</Text>
                <Feather name='trash-2' size={20} color='#AD0900' onPress={() => {
                    Alert.alert('',
                        `Deseja remover a produção ${production.activity}?`,
                        [
                            {text: 'Remover', onPress: async () => {
                                
                                await api.delete(`productions/${production.id}`)
                                let prods = props.data.productions.filter((prod) => {
                                    return prod.id!=production.id;
                                })
                                
                                let farm = JSON.parse(await AsyncStorage.getItem('land'))
                                await AsyncStorage.setItem('land', JSON.stringify({
                                    ...farm,
                                    productions: prods
                                }))
                                
                                if (prods.length == 0){
                                    await AsyncStorage.setItem('control',JSON.stringify({
                                        boolCaracterization : true,
                                        boolProduction : false,
                                        boolLegislation :  false,
                                        boolWaterResource :  false,
                                        boolSoilVegetation : false,
                                        boolWasteManagement :  false,
                                    }))
                                }
                                navigation.navigate('Production')

                            }},
                            {text: 'Cancelar', onPress: () => {}},
                        ],
                        {}
                    )
                }} />
                </View>
            {production.activity == 'Agricultura' &&
            <Text
            key={`${production.id}_${production.cultivation}`}
            style={styles.stepProperty} >
                Tipo de cultivo: 
                <Text style={styles.stepValue}> {production.cultivation}</Text>
            </Text>
            }
            <Text 
            key={`${production.id}_${production.handling}`}
            style={styles.stepProperty} >
                Tipo de manejo: 
                <Text style={styles.stepValue}> {production.handling}</Text>
            </Text>
            {production.activity != 'Agricultura' &&
            <Text
            key={`${production.id}_${production.num_animals}`}
            style={styles.stepProperty} >
                Número de animais: 
                <Text style={styles.stepValue}> {production.num_animals}</Text>
            </Text>
            }
            <Text
            key={`${production.id}_${production.num_area}`}
            style={styles.stepProperty} >
                Área do sistema: 
                <Text style={styles.stepValue}> {production.num_area}</Text>
            </Text>
            <Text
            key={`${production.id}Size${production.size}`}
            style={styles.stepProperty} >
                Porte da produção: 
                <Text style={styles.stepValue}> {production.size}</Text>
            </Text>
            <Text
            key={`${production.id}Factor${production.factor}`}
            style={styles.stepProperty} >Potencial poluidor:
                <Text style={styles.stepValue}> {production.factor}</Text>
            </Text>
            
        </View>
        
    });
    

    return  <View style={styles.step}>
                {productions}
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
    let navigation = useNavigation(); 

    if(props.stepBefore) 
        
        return <View style={styles.stepListEmpty}>
                    <View style={styles.stepEmpty}>
                        <TouchableOpacity
                            style={styles.fowardButtonEmpty}
                            onPress={() => navigation.navigate(props.page)}
                        >
                            <Text style={{color: '#000', fontSize: 20}}>Clique para preencher.</Text>
                            <Feather name='arrow-right' size={25} color='#00753E' />

                        </TouchableOpacity>
                    </View>
                </View>

    return  <View style={styles.stepListEmpty}>
                <View style={styles.stepEmpty}>
                    <Text style={styles.stepEmptyText}>Preencha os anteriores.</Text>
                </View>
            </View>
}

function FowardButton(props) {
    let texto = 'Corrigir o preenchimento deste passo'
    let navigation = useNavigation(); 
    if (props.page == 'Production'){
        texto = 'Inserir novos sistemas de produção'
    }
    return <TouchableOpacity
    
    style={styles.fowardButton}
    onPress={() => navigation.navigate(props.page)}
    >
        <Text style={styles.fowardButtonText}>{texto}</Text>
        <Feather name='arrow-right' size={16} color='#00753E' />
    </TouchableOpacity>
}
