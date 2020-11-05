import React, {useState, useEffect} from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Feather } from '@expo/vector-icons';
import Loading  from '../../utils/loading';

export default function BulletTitle(props){
  
  const [isLoading,setLoading] = useState(true);
  const [listDocs, setList] = useState({})
  const [listBody, setBody] = useState()
  const mapCategory = {
    'Waterresources' : 'Recursos hídricos',
    'Wastemanagement' : 'Gestão de resíduos',
    'Environmentalmanagement' : 'Gestão Ambiental',
    'Soilvegetation' : 'Solo e vegetação',
    'Legislation' : 'Legislação',
  }

  async function fetchData() {
    setLoading(true)
    setList(props.data.documents)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return  isLoading? <Loading /> :
  <View style={styles.step}>
    {Object.keys(listDocs).map(function(key, index) {
      return <TouchableOpacity onPress={async () =>{
          try {
            await Linking.openURL(key);
          } catch (error) {
            alert('Não foi possível acessar o link. Verifique sua conexão.')
          }
        }}><View style={styles.documentBox}>
        <View style={styles.documentBoxTitle}>
          <Text style={styles.documentURL} key={index}> <Feather name='file-text' size={20} /> {key}</Text>
          <Feather name='download' size={20} />
          
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