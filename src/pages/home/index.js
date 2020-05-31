import { 
    View, 
    Image, 
    Text, 
    ScrollView, 
    StatusBar,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';

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
        try {
            setControl(await createControl.getData());
            setLand(await createLand.getData());
        } catch(err) {
            console.warn(err);
        }
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
} 

