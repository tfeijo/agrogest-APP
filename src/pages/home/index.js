import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    StatusBar,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import createControl from './../../utils/createControl';
import BulletFull  from '../../utils/bullets';
import createLand from './../../utils/createLand';
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
        
        setControl(await createControl.getData());
        setLand(await createLand.getData());
                
    }

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await getInfo();
            setLoading(false)

        }
        if (isFocused && !isLoading){
            fetchData()
        }
    }, [isFocused])
    
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            await getInfo();
            setLoading(false)
        }
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
} 

