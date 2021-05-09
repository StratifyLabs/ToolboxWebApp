import React from 'react'
import { VictoryChart, VictoryBar } from "victory";
import Theme from './Theme'
import AppContainer from '../AppContainer';

const EventCounter = props => {

  let data = [];
  const sourceList = props.directive.sources.split(",");
  const dataModel = props.model.data;

  for (let i in dataModel) {
    const name = dataModel[i].name;
    if( sourceList.includes(name) ) {
      //does data already include this
      const value = parseInt(dataModel[i].value);
      let element = data.find(element => element.x === name);
      if( element !== undefined ){
        if( value > element.y ){
          element.y = value;
        }
      } else {
        data.push({x: name, y: value});
      }
    }
  }

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart domainPadding={{ x: 30, y: 5 }}
        theme={Theme}
        height={250}
      >
      <VictoryBar 
      data={data}
      />
      </VictoryChart>
    </AppContainer>
  )
}

export default EventCounter
