import React from 'react'
import { VictoryChart, VictoryContainer, VictoryHistogram } from "victory";
import AppContainer from '../AppContainer';

import Theme from './Theme'

import LoadingSpinner from '../LoadingSpinner'

const Histogram = props => {

  const directive = props.directive;
  const source = directive.sources;
  const id = directive.name.split(" ").join("-");
  const dataModel = props.model.data;

  let data = [];
  for (let i in dataModel) {
    if (dataModel[i].name === source) {
      data.push({ x: parseFloat(dataModel[i].value) });
    }
  }

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart
        containerComponent={
          <VictoryContainer
            className={id}
          />
        }
        theme={Theme}
        height={250}
      >
        <VictoryHistogram
          data={data}
        />
      </VictoryChart>
    </AppContainer>
  )
}

export default Histogram
