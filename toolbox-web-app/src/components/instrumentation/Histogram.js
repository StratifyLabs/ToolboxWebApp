import React from 'react'
import { VictoryChart, VictoryHistogram } from "victory";

import Theme from './Theme'


const Histogram = props => {

  let data = [];
  const source = props.directive.sources;

  for (let i in props.data) {
    if (props.data[i].name == source) {
      console.log(`add data ${props.data[i].value}`)
      data.push({x: parseFloat(props.data[i].value)});
    }
  }

  console.log(data);

  return (
    <VictoryChart
      theme={Theme}
      height={250}
    >
      <VictoryHistogram
        data={data}
      />

    </VictoryChart>
  )
}

export default Histogram
