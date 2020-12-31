import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryScatter } from "victory";
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
