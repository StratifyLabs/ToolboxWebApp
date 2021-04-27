import React from 'react'
import { VictoryChart, VictoryHistogram } from "victory";

import Theme from './Theme'


const Histogram = props => {

  let data = [];
  const source = props.directive.sources;

  for (let i in props.data) {
    console.log(`check source ${props.data[i].name}`)
    if (props.data[i].name == source) {
      data.push(props.data[i].value);
    }
  }

  return (
    <VictoryChart
      theme={Theme}
      height={250}
    >
      <VictoryHistogram
        data={data}
        x={1}
      />

    </VictoryChart>
  )
}

export default Histogram
