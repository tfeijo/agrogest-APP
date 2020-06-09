import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
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
    
    let navigation = useNavigation(); 
    
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
                            navigation.navigate(props.page);
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
