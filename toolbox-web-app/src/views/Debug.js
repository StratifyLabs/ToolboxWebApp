import React from 'react'
import { Container, Card } from 'react-bootstrap'

import Raw from '../components/debug/Raw'
import Csv from '../components/debug/Csv'
import LogicCapture from '../components/debug/LogicCapture'
import Histogram from '../components/debug/Histogram'
import ProgramCounterSamplePlot from '../components/debug/ProgramCounterSamplePlot'
import Log from '../components/debug/Log'

const Debug = props => {

  //holds the state of all the children
  //pass the data to the children through props
  //get the data from the toolbox

  const logicData = React.useMemo(
    () => [
      {
        label: 'SCK',
        data: [
          [0.0, 0], [0.1, 1],
          [1.0, 1], [1.1, 0],
          [2.0, 0], [2.1, 1],
          [3.0, 1], [3.1, 0],
          [4.0, 0], [4.1, 1],
          [5.0, 1], [5.1, 0],
          [6.0, 0], [6.1, 1],
          [7.0, 1], [7.1, 0],
          [8.0, 0], [8.1, 1],
          [9.0, 1], [9.1, 0],
          [10.0, 0], [10.1, 1],
          [11.0, 1], [11.1, 0],
          [12.0, 0], [12.1, 1],
          [13.0, 1], [13.1, 0],
          [14.0, 0], [14.1, 1],
          [15.0, 1], [15.1, 0],
          [16.0, 0], [16.1, 1]
        ]
      },
      {
        label: 'MISO',
        data: [
          [0.0, 2], [0.1, 3],
          [5.0, 3], [5.1, 2],
          [6.0, 2], [6.1, 3],
          [7.0, 3], [7.1, 2],
          [8.0, 2], [8.1, 3],
          [15.0, 3], [15.1, 2],
          [16.0, 2], [16.1, 3]
        ]
      },
      {
        label: 'MOSI',
        data: [
          [0.0, 4], [0.1, 5],
          [5.0, 5], [5.1, 4],
          [6.0, 4], [6.1, 5],
          [11.0, 5], [11.1, 4],
          [13.0, 4], [13.1, 5],
          [15.0, 5], [15.1, 4],
          [16.0, 4], [16.1, 5]
        ]
      },
      {
        label: 'CS',
        data: [
          [0.0, 7], [0.1, 6],
          [16.0, 6], [16.1, 7]
        ]
      },
    ],
    []
  )


  return (
    <div>
      <h2>Trace Output</h2>
      <small>demo.elf 20201223</small>
      <Raw />
      <Log type="message" />
      <Csv />
      <LogicCapture data={logicData} height='300px'/>
      <Histogram name="Temperature"/>
      <ProgramCounterSamplePlot />
    </div >
  )
}

export default Debug
