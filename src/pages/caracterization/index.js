import React, { useState } from 'react';
import { 
    View,
    Image,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Switch,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Feather } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import createLand from './../../utils/createLand';
import createControl from './../../utils/createControl';
import createCaracterization from './../../utils/createCaracterization';
import createUID from './../../utils/createUniqueIDLand';



export default function Caracterization() {
    
    
    const [enableCity, setenableCity] = useState(false);
    const [isLoading,setLoading] = useState(true);
    const [landData, setLand] = useState(null);
    const [UniqueID, setUID] = useState(null);
    const [controlData, setControl] = useState(null);
    const [caracData, setCarac] = useState(null);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    

    const navigator = useNavigation();

    async function getInfo(){
        const {data:stateList} = await api.get('/states')|| [];
        try {
            stateList.push({'id':999, 'name': 'Selecione um estado'});
            setStates(stateList);
            setControl(await createControl.getData());
            setLand(await createLand.getData());
            setUID(await createUID.getData());
            setCarac(await createCaracterization.getData());
        } catch(err) {
            console.warn(err);
        }
    }
   
    async function loadCities(state){
        const { data } = await api.get(`cities/state/${state}`);
        setCities(data);
        setenableCity(true);
        return data;
    }

    async function saveData(){
        try{
            createControl.update({
                ...controlData, 
                'boolCaracterization': true
            });
            
            let { data:newLand } = await api.post('lands', {
                ...caracData,
                installation_id: UniqueID,
            }); 

            createLand.update(newLand);
            createUID.update(newLand.installation_id);

        } catch(err) {
            createControl.update({
                ...controlData,
                 'boolCaracterization': false
            })
            console.warn;
        }
    }
   
    let stateItems = states.map( (state) => {
        return <Picker.Item
                    key={state.id} value={state.id} label={state.name} />
    });

    let cityItems = cities.map( (city) => {
        return <Picker.Item
                    key={city.id} value={city.id} label={city.name} />
    });
        
    return isLoading === true ?
        <AppLoading
        startAsync={getInfo}
        onFinish={() => setLoading(false)}
        onError={console.warn}
    />
    :
    <>
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                            style={styles.fowardButtonEmpty}
                            onPress={() => navigator.goBack()}
                >
                    <Feather name='arrow-left' size={35} color='#00753E' />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>PORTE DA PROPRIEDADE</Text>
            <ScrollView style={styles.stepList}
                        showsVerticalScrollIndicator={false}>
                <Text style={styles.description}>
                    Responda as questões para saber o porte de sua propriedade
                </Text>
                
                <Text style={styles.caption}>Selecione o estado: </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={caracData.state_id}
                    onValueChange={async (itemValue, itemIndex) => {
                            loadCities(itemValue);
                            setCarac({...caracData, state_id:itemValue});
                        }
                    }
                >
                    {stateItems}
                </Picker>
                
                <Text style={styles.caption}>Selecione a cidade: </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={caracData.city_id}
                    onValueChange={(itemValue, itemIndex) => 
                        setCarac({...caracData, city_id:itemValue})
                    }
                    enabled={enableCity}
                >
                    {cityItems}
                </Picker>
                
                <Text style={styles.caption}>
                    Tamanho da propriedade (ha):
                </Text>
                <TextInput  
                    name='size'
                    onChangeText={text => {
                            setCarac({...caracData, hectare:text});
                        }
                    }
                    placeholder="Hectares (ha)"
                    style={styles.NumberInputStyle}
                    keyboardType={'numeric'}
                />

                <Text style={styles.caption}>
                    A propriedade rural já é licenciada?
                </Text>
                    <Switch 
                    style={{marginTop:-25}}
                        onValueChange = {value => {
                            setCarac({...caracData, licensing:value});
                            }
                        }
                        value = {caracData.licensing}
                    />
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => {
                            if(caracData.state_id == 999 ||
                               caracData.city_id == null ||
                               caracData.hectare ==null
                            ){
                                Alert.alert(
                                    'Atenção',
                                    'Preencha todos os dados antes de salvar.',
                                    [
                                      { text: 'OK', onPress: () => console.log('OK Pressed') },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                saveData();
                                navigator.goBack();
                            }
                        }
                    }
                >
                    <Text style={styles.ButtonText}>Salvar</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    </>;
}