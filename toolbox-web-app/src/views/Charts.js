import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'
import { Line, Scatter } from 'react-chartjs-2'
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer
} from "victory";

import Theme from '../components/Theme'
import Plot from '../components/debug/Plot'
import Logic from '../components/debug/Logic'

const Charts = props => {

  const configuration = props.configuration;

  return (
    <div>
      {
        configuration !== undefined && Object.keys(configuration).map((key, index) => {
          if (configuration[key].type === "plot") {
            return <Plot name={key} configuration={configuration[key]} key={"plot" + key} />
          }
          if (configuration[key].type === "logic") {
            return <Logic name={key} configuration={configuration[key]} key={"logic" + key} />
          }
        })
      }
    </div >
  )
}

export default Charts
