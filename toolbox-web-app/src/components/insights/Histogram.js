import React from 'react'
import { VictoryChart, VictoryHistogram } from "victory";

import Theme from './Theme'


const Histogram = props => {
  return (
    <VictoryChart
      theme={Theme}
      height={250}
    >
      { Object.keys(props.configuration.data).map((key, index) => {
        return (
          <VictoryHistogram
            data={props.configuration.data[key]}
            key={key}
            x={1}
          />
        )
      })}
    </VictoryChart>
  )
}

export default Histogram
