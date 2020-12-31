import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictorHistogram, VictoryHistogram } from "victory";

import Theme from '../Theme'


const Histogram = props => {

  const [count, setCount] = React.useState(0)

  const temperatureData =
    [
      { x: 20 },
      { x: 21 },
      { x: 22 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 23 },
      { x: 24 },
      { x: 24 },
      { x: 24 },
      { x: 24 },
      { x: 24 },
      { x: 25 },
      { x: 25 },
      { x: 25 },
      { x: 24 },
      { x: 23 },
      { x: 19 },
      { x: 15 },
      { x: 16 },
      { x: 14 },
      { x: 27 },
      { x: 27 },
      { x: 27 },
      { x: 16 },
      { x: 30 },
      { x: 14 }
    ];


  return (
    <VictoryChart
      theme={Theme}
    >
      <VictoryHistogram
        data={temperatureData}
      />

    </VictoryChart>
  )
}

export default Histogram
