import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import styles from './styles';
import AnswerItem from './answersItem';
import AnswerList from './answersList';
import FowardButton from './fowardButton';

export default function WasteManagement(props) {
  const [suino ,setSuino] = useState()
  const [bovino ,setBovino] = useState()
  const [avino ,setAvino] = useState()
  const [agricultura ,setAgricultura] = useState()
  const [pecuaria,setPecuaria] = useState()

    async function getControl(){
        try{ 
            let jsonValue = JSON.parse(await AsyncStorage.getItem('control'));
            
            setBovino(
                jsonValue.productions.bovi_leite || 
                jsonValue.productions.bovi_corte
            )
            setAvino(jsonValue.productions.avicultura)
            setSuino(jsonValue.productions.suinocultura)
            setAgricultura(jsonValue.productions.agricultura)
            setPecuaria(
                jsonValue.productions.bovi_corte ||
                jsonValue.productions.bovi_leite || 
                jsonValue.productions.avicultura || 
                jsonValue.productions.suinocultura
            )

            return jsonValue.productions != null && jsonValue.productions 
        } catch(err) {
            console.warn(err)
        }
    }

    async function fetchData() {
        await getControl();
    }

    useEffect(() => {
        fetchData()
    }, [])
    return  <View style={styles.step}>
      {pecuaria? // pecuaria
              <>

              <AnswerItem 
                  item={props.data.attributes.hasResidueComposting}
                  text={"Resíduo dos animais destinados à esterqueira/compostagem/biodigestor"}
              />
              {bovino? //Bovino
                  <AnswerList
                  title={"Tratamento de resíduos da bovinocultura:"}
                  items={[
                      {
                          item:props.data.attributes.hasBovineCattle,
                          text:"Biodigestor"
                      },
                      {
                          item:props.data.attributes.hasBovineDung,
                          text:"Esterqueira"
                      },
                      {
                          item:props.data.attributes.hasBovineFertigation,
                          text:"Fertirrigação"
                      },
                  ]}
              />:<></>
              }
              {suino? //Suino
                  <>
                  <AnswerList
                      title={"Tratamento de resíduos da suinocultura:"}
                      items={[
                          {
                              item:props.data.attributes.hasSwineCattle,
                              text:"Biodigestor"
                          },
                          {
                              item:props.data.attributes.hasSwineDung,
                              text:"Esterqueira"
                          },
                          {
                              item:props.data.attributes.hasSwineFertigation,
                              text:"Fertirrigação"
                          },
                      ]}
                  />
                  <AnswerItem 
                  item={props.data.attributes.hasWaterControlProgram}
                  text={"Programa de controle de água na suinocultura"}
                  />
              </>:<></>
              }
              {avino? //Ave
    
                  <AnswerItem 
                      item={props.data.attributes.hasAviaryWastinAgriculture}
                      text={"Resíduo da cama de aviário aplicado na agricultura"}
                  />
                  :<></>
              }
              {agricultura? //Agricultura
                  <AnswerItem 
                      item={props.data.attributes.hasReuseAgriculturalResidue}
                      text={"Resíduos agrícolas utilizados na propriedade"}
                  />:<></>
              }

              </>
               : <></>
      }
      <AnswerItem 
          item={props.data.attributes.hasDeadCompostAnimals}
          text={"Animais mortos destinados a compostagem"}
      />
      <FowardButton page={props.page}/>
  </View>
}