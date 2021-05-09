import React from 'react'
import { VictoryChart, VictoryLine } from "victory";
import Theme from './Theme'
import AppContainer from '../AppContainer';

const Plot = props => {

  let data = [];
  const directive = props.directive;
  const dataModel = props.model.data;
  const source = directive.sources;

  for (let i in dataModel) {
    if (dataModel[i].name === source) {
      let values = dataModel[i].value.split(",").map(Number);
      data.push(values);
    }
  }
  const series = data[0];

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart padding={{ left: 80, top: 10, right: 15, bottom: 20 }}
        theme={Theme}
        height={250}
      >
        {series.length && series.map((value, index) => {
          return index ? <VictoryLine data={data} x={0} y={index} key={"series" + index} /> : null;
        })}
      </VictoryChart>
    </AppContainer>
  )
}

export default Plot
