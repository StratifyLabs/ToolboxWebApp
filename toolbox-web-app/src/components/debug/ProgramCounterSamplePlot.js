import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'

const ProgramCounterSamplePlot = props => {
  const data = React.useMemo(
    () => [
      {
        label: 'PC Samples',
        data: [
          ['main()', 50], 
          ['set_led()', 2], 
          ['plotx()', 30], 
          ['ploty()', 12], 
          ['calc()', 20], 
          ['get()', 64], 
          ['set()', 22], 
          ['run()', 12], 
          ['run1()', 12], 
          ['run2()', 20], 
          ['run3()', 105], 
          ['run4()', 12], 
          ['run5()', 40], 
          ['run6()', 13], 
          ['run7()', 12], 
          ['run8()', 12], 
          ['run9()', 12], 
          ['run10()', 20], 
          ['run11()', 99], 
          ['run12()', 12], 
          ['run13()', 40], 
          ['run14()', 13], 
          ['run15()', 12], 
        ]
      }
    ],
    []
  )

  const series = React.useMemo(
    () => ({
      type: 'bar'
    }),
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )
  return (
    <Card className="mb-2">
      <Card.Header className="flex">Program Counter Samples <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
      <div
          style={{
            width: '100%',
            height: '300px'
          }}
        >
          <Chart data={data} axes={axes} series={series} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProgramCounterSamplePlot
