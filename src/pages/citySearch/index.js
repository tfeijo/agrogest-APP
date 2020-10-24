import * as React from 'react';
import {
  Text,
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import styles from "./styles";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  componentDidMount() {
    let responseJson = this.props.route.params.cities;
    this.setState(
      {
        isLoading: false,
        dataSource: responseJson ,
      },
      function() {
        this.arrayholder = responseJson;
      }
    );
  }

  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  
  getCityById(id) {
    return this.state.dataSource.filter(
        (data) => data.id == id 
    );
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (<>
      <StatusBar backgroundColor="#00753E" barStyle='light-content' />
      <View style={styles.viewStyle}>
        
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          inputStyle={styles.inputStyle}
          containerStyle={styles.containerStyle}
          placeholderTextColor={'#fff'}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Pesquise sua cidade..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          // ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={async () => {
                let city = this.getCityById(item.id)[0]
                
                await AsyncStorage.setItem('city', 
                  JSON.stringify(city)
                );
                this.props.navigation.goBack()
              }}

              style={styles.item}>
              <Text style={styles.textItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </>
    );
  }
}

