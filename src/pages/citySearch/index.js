import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar } from 'react-native-elements';

import styles from './styles';


export default class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '', dataSource: [] };
    this.allCities = [];
  }

  componentDidMount() {
    const cities = this.props.route?.params?.cities ?? [];
    this.allCities = cities;
    this.setState({ isLoading: false, dataSource: cities });
  }

  SearchFilterFunction = (text) => {
    const upper = text.toUpperCase();
    const filtered = this.allCities.filter((item) =>
      (item.name || '').toUpperCase().includes(upper)
    );
    this.setState({ dataSource: filtered, search: text });
  };

  getCityById(id) {
    return this.allCities.find((data) => data.id === id);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <>
        <StatusBar backgroundColor="#00753E" barStyle="light-content" />
        <View style={styles.viewStyle}>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            inputStyle={styles.inputStyle}
            containerStyle={styles.containerStyle}
            placeholderTextColor={'#fff'}
            onChangeText={(text) => this.SearchFilterFunction(text)}
            onClear={() => this.SearchFilterFunction('')}
            placeholder="Pesquise sua cidade..."
            value={this.state.search}
          />
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={async () => {
                  const city = this.getCityById(item.id);
                  if (city) {
                    await AsyncStorage.setItem('city', JSON.stringify(city));
                  }
                  this.props.navigation.goBack();
                }}
                style={styles.item}
              >
                <Text style={styles.textItem}>{item.name}</Text>
              </TouchableOpacity>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item) => String(item.id)}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
          />
        </View>
      </>
    );
  }
}
