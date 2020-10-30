import React from 'react';
import { View, StatusBar, Image, Text }from 'react-native';

export default function Loading(){
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