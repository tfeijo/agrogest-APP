import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading  from '../../utils/loading';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

export default function BulletTitle(props){
  
  const navigator = useNavigation();
  const [isLoading,setLoading] = useState(true);
  const [listDocs, setList] = useState({})

  async function fetchData() {
    setLoading(true)
    setList(props.data.documents)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return  isLoading? <ActivityIndicator color="#00753E" size="large" /> :
    listDocs.length <= 0 ? 
    <View style={styles.step}>
      <Text style={{color: '#000', fontSize: 18, marginBottom: 10}}>Agora é com você!</Text>
      <Text>Clique no botão abaixo e ache os documentos que se encaixam com sua propriedade</Text>
    </View>
    :
    <View style={styles.step}>
      {
      Object.keys(listDocs).map(function(key, index) {
        return <TouchableOpacity key={key}onPress={async () =>{
            try {
              let url = key
              navigator.navigate("UrlShower", {
                 url,
                 is_file: listDocs[key].is_file == 'True',
                 description: listDocs[key].description 
                })
              
            } catch (error) {
              alert('Não foi possível acessar o link. Verifique sua conexão.')
            }
          }}>
          <View style={styles.documentBox}>
            <View style={styles.documentBoxTitle}>
              <Text style={styles.documentDescription} key={index}>
                <Feather name='file-text' size={20} />  {listDocs[key].description}
              </Text>
            </View>
            <View style={styles.documentBoxUrl}>
            <Feather name='download' color="#AD0900" size={20} />          
            <Text style={styles.documentUrl}>{key}   </Text>
            </View>
            <Text style={styles.documentTitle}>Documento relacionado com: </Text>
            {listDocs[key].questions.map((question)=>{
              return <Text key={question+key} style={styles.documentItens} >
                <Feather name='chevron-right' size={10} />
                {question}
              </Text>
            })}
        </View>
        </TouchableOpacity>
      })}
    </View>
    
} 