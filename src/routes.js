import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../src/pages/home';
import Caracterization from '../src/pages/caracterization';
import Production from '../src/pages/production';
import Legislation from '../src/pages/legislation';
import SoilVegetation from '../src/pages/soilVegetation';
import WasteManagement from '../src/pages/wasteManagement';
import WaterResources from '../src/pages/waterResources';
import CitySearch from '../src/pages/citySearch';
import UrlShower from '../src/pages/urlShower';
import BlankScreen from '../src/pages/blankScreen';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}} >
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Caracterization' component={Caracterization} />
                <AppStack.Screen name='Production' component={Production} />
                <AppStack.Screen name='Legislation' component={Legislation} />
                <AppStack.Screen name='SoilVegetation' component={SoilVegetation} />
                <AppStack.Screen name='WasteManagement' component={WasteManagement} />
                <AppStack.Screen name='WaterResources' component={WaterResources} />
                <AppStack.Screen name='CitySearch' component={CitySearch} />
                <AppStack.Screen name='BlankScreen' component={BlankScreen} />
                <AppStack.Screen name='UrlShower' component={UrlShower} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}