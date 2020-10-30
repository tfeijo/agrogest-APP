import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import AnswerItem from './answersItem';
import AnswerList from './answersList';
import FowardButton from './fowardButton';

export default function WasteManagement(props) {
    
    const [jsonValue, setJSON] = useState(props.control);
    const [suino ,setSuino] = useState(jsonValue.productions.suinocultura)
    const [bovino ,setBovino] = useState(
      jsonValue.productions.bovi_leite || 
      jsonValue.productions.bovi_corte
    )
    const [avino ,setAvino] = useState(jsonValue.productions.avicultura)
    const [agricultura ,setAgricultura] = useState(jsonValue.productions.agricultura)
    const [pecuaria,setPecuaria] = useState(
      jsonValue.productions.bovi_corte ||
      jsonValue.productions.bovi_leite || 
      jsonValue.productions.avicultura || 
      jsonValue.productions.suinocultura
  )

    return <View style={styles.step}>
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