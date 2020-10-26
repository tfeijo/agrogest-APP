import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';
// import VerifyProduction from "../verifyProduction";



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
            return <WasteManagement page={props.page} data={props.data} productions={props.productions}/>
        case 'WaterResources':
            return <WaterResource page={props.page} data={props.data} />
        case 'SoilVegetation':
            return <SoilVegetation 
                page={props.page}
                data={props.data}
                productions={props.productions}
            />
    }
}

function Caracterization(props) {

    let biomeItems = props.data.city.biomes.map( (biome) => {
        return <Text style={styles.biomes} key={biome.name}>{biome.name}</Text>
    });
    
    
    return  <View style={styles.step}>
                <Text style={styles.stepProperty}>Cidade:</Text>
                <Text style={styles.stepValue}> 
                    {props.data.city.name} / {props.data.city.state.uf}
                </Text>
                <Text style={styles.stepProperty}>BIOMA:</Text>
                    {biomeItems}
                
                <Text style={styles.stepProperty}>
                    Tamanho:
                </Text>
                <Text style={styles.stepValue}>
                    {props.data.size.name}
                </Text>
                <FowardButton page={props.page}/>
            </View>
}

function AnswerItem(props){
    return  <View style={{...styles.box, justifyContent: "flex-start",borderBottomColor:"#eeeeee"}}> 
        {props.item?
            <Feather name='check-square' style={styles.feather} size={20} color='#00753E'/> :
            <Feather name='x-square' style={styles.feather} size={20} color='#AD0900'/>
        } 
        <Text style={styles.stepValue}>
            {props.text}
        </Text>
    </View>
}
function AnswerList(props){
    return  <>
        <Text style={styles.stepTitleTextBold}>
            {props.title}
        </Text>
        {props.items.map(function(object){
            return <>
            <View id ={object.item} style={{
                ...styles.box, 
                justifyContent: "flex-start",
                borderBottomWidth:0,
                paddingLeft: 10,
                }}> 
                {object.item?
                    <Feather name='check-square' style={styles.feather} size={20} color='#00753E'/> :
                    <Feather name='x-square' style={styles.feather} size={20} color='#AD0900'/>
                } 
                <Text style={styles.stepValue}>
                    {object.text}
                </Text>
            </View>
            </>
        })}
        
    </>
}
function Legislation(props) {
    return  <View style={styles.step}>
                <AnswerItem
                    item={props.data.attributes.hasEnvironmentalLicensing}
                    text="Licenciamento ambiental"
                />
                <AnswerItem
                    item={props.data.attributes.hasCAR}
                    text="Cadastro Ambiental Rural (CAR)"
                />
                <AnswerItem
                    item={props.data.attributes.hasNativeVegetationLegalReserve}
                    text="Área com cobertura de vegetação nativa que atende percentual de reserva legal"
                />
                <AnswerItem
                    item={props.data.attributes.hasAppAroundWaterCoursesWaterReservoirs}
                    text="Área de Preservação Permanente (APP) em torno de cursos e reservatórios de água"
                />
                <AnswerItem
                    item={props.data.attributes.hasAppAroundSpringsWaterEyes}
                    text="APP em torno de nascentes e de olhos de água"
                />
                <AnswerItem
                    item={props.data.attributes.hasAppHillside}
                    text="APP em encosta"
                />
                <AnswerItem
                    item={props.data.attributes.hasAppHillTop}
                    text="APP em topo de morro"
                />
                <AnswerItem
                    item={props.data.attributes.hasEnvironmentalRegularizationPlan}
                    text="Plano de regularização Ambiental"
                />
                <AnswerItem
                    item={props.data.attributes.hasWaterGrant}
                    text="Outorga de uso da água"
                />

                <FowardButton page={props.page}/>
            </View>
}

function Production(props) {
    const [ prods, setProds] = useState(props.data.productions)
    const productions = prods.map( (production) => {

        return <View style={styles.production} key={production.id}>
            <View style={styles.box}>
                <Text style={styles.productionTitle}>{production.activity}</Text>
                <Feather name='trash-2' size={20} color='#AD0900' onPress={() => {
                    Alert.alert('',
                        `Deseja remover a produção ${production.activity}?`,
                        [
                            {text: 'Remover', onPress: async () => {
                                
                                await api.delete(`productions/${production.id}`)
                                setProds(props.data.productions.filter((prod) => {
                                    return prod.id!=production.id;
                                }))

                                let productionsControl = {
                                    suinocultura : false,
                                    bovi_leite : false,
                                    bovi_corte : false,
                                    agricultura : false,
                                    avicultura : false,
                                }
                                
                                props.data.productions.map((prod)=>{
                                    if (prod.activity=="Suinocultura"){
                                        productionsControl.suinocultura = true
                                    }
                                    if (prod.activity=="Bovinocultura De Leite"){
                                        productionsControl.bovi_leite = true
                                    }
                                    if (prod.activity=="Bovinocultura De Corte"){
                                        productionsControl.bovi_corte = true
                                    }
                                    if (prod.activity=="Avicultura"){
                                        productionsControl.avicultura = true
                                    }
                                    if (prod.activity=="Agricultura"){
                                        productionsControl.agricultura = true
                                    }
                                })
                                await AsyncStorage.setItem('control',JSON.stringify({
                                    productions : productionsControl
                                }))
                                let farm = JSON.parse(await AsyncStorage.getItem('land'))
                                await AsyncStorage.setItem('land', JSON.stringify({
                                    ...farm,
                                    productions: prods
                                }))
                                
                                if (prods.length == 0){
                                    await AsyncStorage.setItem('control',JSON.stringify({
                                        boolCaracterization : true,
                                        boolProduction : false,
                                        boolLegislation :  true,
                                        boolWaterResource :  true,
                                        boolSoilVegetation : true,
                                        boolWasteManagement :  false
                                    }))

                                }

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
            key={`${production.id+"Animals"}_${production.num_animals}`}
            style={styles.stepProperty} >
                Número de animais: 
                <Text style={styles.stepValue}> {production.num_animals}</Text>
            </Text>
            }
            <Text
            key={`${production.id+"Area"}_${production.num_area}`}
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
                <AnswerItem
                    item={props.data.attributes.hasSourceProtectedWaterMine}
                    text="Nascente ou mina de água protegida"
                />
                <AnswerItem
                    item={props.data.attributes.hasDomesticSewageTreatment}
                    text="Esgoto doméstico tratado"
                />
                <AnswerItem
                    item={props.data.attributes.hasWaterConsuptionTreatment}
                    text="Água de consumo humano/animal e para limpeza tratada"
                />
                
                <FowardButton page={props.page}/>
            </View>
}

function SoilVegetation(props) { 
    return  <View style={styles.step}>
                <AnswerItem
                    item={props.data.attributes.hasEarthwormInsects}
                    text="Presença de animais como minhocas e/ou insetos no solo"
                />
                <AnswerItem
                    item={props.data.attributes.hasDiversifiedProduction}
                    text="Produção diversificada"
                />
                <AnswerItem
                    item={props.data.attributes.hasCompactedArea}
                    text="Presença de área compactada"
                />
                <AnswerItem
                    item={props.data.attributes.hasErosion}
                    text="Presença de erosão"
                />
                <AnswerItem
                    item={props.data.attributes.hasSoilAnalysisCorrection}
                    text="Realiza análise e manutenção de solo e correção com orientação técnica"
                />
                <AnswerItem
                    item={props.data.attributes.hasPresenceMaintenanceVegetation}
                    text="Realiza análise e manutenção da vegetação em encostas e fundos de vale"
                />
                <AnswerItem
                    item={props.data.attributes.hasIntegralVegetation}
                    text="Vegetação integra na margem dos rios"
                />
                <AnswerList
                    title="Práticas de manejo das culturas: "
                    items={[
                        {
                            item: props.data.attributes.hasNoTill,
                            text:"Plantio direto"
                        },
                        {
                            item: props.data.attributes.hasMinimumCultivation,
                            text:"Cultivo mínimo"
                        },
                        {
                            item: props.data.attributes.hasControlledBurning,
                            text:"Queima controlada"
                        },
                    ]}
                />
                <AnswerList
                    title="Área de regeneração: "
                    items={[
                        {
                            item: props.data.attributes.hasNaturalRegeneration,
                            text:"Natural"
                        },
                        {
                            item: props.data.attributes.hasRegenerationWithHandling,
                            text:"Com manejo"
                        },
                        {
                            item: props.data.attributes.hasRegenerationWithPlanting,
                            text:"Com plantio"
                        },
                        {
                            item: props.data.attributes.hasAgroforestrySystems,
                            text:"Com sistemas agroflorestais"
                        },
                    ]}
                />
                <AnswerList
                    title="Manejo da pastagem: "
                    items={[
                        {
                            item: props.data.attributes.hasRotatedHandling,
                            text:"Rotacionado"
                        },
                        {
                            item: props.data.attributes.hasConsortiumHandling,
                            text:"Consorciado"
                        },
                    ]}
                />

                <FowardButton page={props.page}/>
            </View>
}

function WasteManagement(props) {
    let bovino = props.productions.bovi_leite || props.productions.bovi_leite
    let avino = props.productions.avicultura
    let suino = props.productions.suinocultura
    let agricultura = props.productions.agricultura
    let pecuaria = bovino || avino || suino

    
    return  <View style={styles.step}>
        {pecuaria? // pecuaria
                <>

                <AnswerItem 
                    item={props.data.attributes.hasResidueComposting}
                    text={"Resíduo dos animais destinados à esterqueira/compostagem/biodigestor"}
                />
                {bovino? //Bovino
                    <AnswerList
                    title={"Tratamento de resíduos da bovinocultura:"}
                    items={[
                        {
                            item:props.data.attributes.hasBovineCattle,
                            text:"Biodigestor"
                        },
                        {
                            item:props.data.attributes.hasBovineDung,
                            text:"Esterqueira"
                        },
                        {
                            item:props.data.attributes.hasBovineFertigation,
                            text:"Fertirrigação"
                        },
                    ]}
                />:<></>
                }
                {suino? //Suino
                    <>
                    <AnswerList
                        title={"Tratamento de resíduos da suinocultura:"}
                        items={[
                            {
                                item:props.data.attributes.hasSwineCattle,
                                text:"Biodigestor"
                            },
                            {
                                item:props.data.attributes.hasSwineDung,
                                text:"Esterqueira"
                            },
                            {
                                item:props.data.attributes.hasSwineFertigation,
                                text:"Fertirrigação"
                            },
                        ]}
                    />
                    <AnswerItem 
                    item={props.data.attributes.hasWaterControlProgram}
                    text={"Programa de controle de água na suinocultura"}
                    />
                </>:<></>
                }
                {avino? //Ave
      
                    <AnswerItem 
                        item={props.data.attributes.hasAviaryWastinAgriculture}
                        text={"Resíduo da cama de aviário aplicado na agricultura"}
                    />
                    :<></>
                }
                {agricultura? //Agricultura
                    <AnswerItem 
                        item={props.data.attributes.hasReuseAgriculturalResidue}
                        text={"Resíduos agrícolas utilizados na propriedade"}
                    />:<></>
                }

                </>
                 : <></>
        }
        <AnswerItem 
            item={props.data.attributes.hasDeadCompostAnimals}
            text={"Animais mortos destinados a compostagem"}
        />
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
