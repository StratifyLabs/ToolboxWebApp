import React from 'react'
import { VictoryChart, VictoryLine } from "victory";
import Theme from './Theme'

const Plot = props => {

  return (
    <VictoryChart domainPadding={{ y: 5 }}
    theme={Theme} 
    height={250}
    >
      { Object.keys(props.configuration.data).map((key, index) => {
        return <VictoryLine data={props.configuration.data[key]} x={0} y={1} key={"series" + key} />
      })}
    </VictoryChart>
  )
}

export default Plot
