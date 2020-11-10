import React,{ useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../utils/loading';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import PDFReader from 'rn-pdf-reader-js';



export default function urlShower(props) {
  const navigator = useNavigation();
  const [isLoading,setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isFile, setIsFile] = useState()
  const [url, setUrl] = useState()

  async function fetchData() {
    setLoading(true)
    setUrl(props.route.params.url)
    setIsFile(props.route.params.is_file)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return  isLoading? <Loading /> : <View style={styles.container}>
    <View style={styles.header}>
      <Image source={logoImg} />
      {visible?<ActivityIndicator color="#00753E" size="large" />:
      <TouchableOpacity
        style={styles.fowardButtonEmpty}
        onPress={async () => {
          navigator.goBack()
        }}
      >
      <Feather name='arrow-left' size={35} color='#00753E' />
      </TouchableOpacity>
    }
    </View>
    <Text style={{
      width: "100%",
      textAlign: "center",
      paddingBottom: 10,
      marginBottom: 10,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      borderColor: "#00753E"
    }}>
     {props.route.params.description}
    </Text>
    {isFile?
      <PDFReader
        source={{ uri: url }}
      />
    :
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        useWebKit={true}
        onLoadStart={() => setVisible(true)}
        onLoad={() => setVisible(false)}
      />
    }
    </View>
}