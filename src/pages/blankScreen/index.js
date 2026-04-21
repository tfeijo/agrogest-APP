import React, { useEffect } from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function BlankScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Home');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <>
            <StatusBar backgroundColor="#00753E" barStyle="light-content" />
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000',
            }}>
                <Image
                    style={{ width: 300, height: 200 }}
                    source={{ uri: 'https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif' }}
                />
                <Text style={{ color: '#fff' }}>Buscando dados...</Text>
            </View>
        </>
    );
}
