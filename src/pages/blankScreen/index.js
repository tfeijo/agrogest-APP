import { 
    View, 
    Image, 
    Text, 
    StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

export default function blankScreen() {
    let navigation = useNavigation()
    useEffect(() => {
        async function returning(){
            await sleep(2000)
            navigation.navigate('Home')
        }
        returning()
        
    }, [])

    return <>
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
} 

