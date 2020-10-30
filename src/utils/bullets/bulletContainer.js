import React from 'react';
import Caracterization from './bulletCaracterization';
import Production from './bulletProduction';
import Legislation from './bulletLegislation';
import WasteManagement from './bulletWasteManagement';
import WaterResource from './bulletWaterResource';
import SoilVegetation from './bulletSoilVegetation';
import BulletEmpty from './bulletEmpty';

export default function BulletContainer(props) { 
  
  if (!props.currentStep){
    return <BulletEmpty page={props.page} stepBefore={props.stepBefore}/>
  }

  switch (props.page) {
      case 'Caracterization':
          return <Caracterization 
            page={props.page}
            data={props.data}
            control={props.control}
            />
      case 'Production':
          return <Production 
            page={props.page}
            data={props.data}
            control={props.control}
            />
      case 'Legislation':
          return <Legislation 
            page={props.page}
            data={props.data}
            control={props.control}
            />
      case 'WasteManagement':
          return <WasteManagement
            page={props.page}
            data={props.data}
            control={props.control}
            />
      case 'WaterResources':
          return <WaterResource
            page={props.page}
            data={props.data}
            control={props.control}
            />
      case 'SoilVegetation':
          return <SoilVegetation 
            page={props.page}
            data={props.data}
            control={props.control}
          />
  }
}