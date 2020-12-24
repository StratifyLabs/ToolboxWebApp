import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'



const Histogram = props => {
  const data = React.useMemo(
    () => [
      {
        label: 'Variable',
        data: [
          ['< 0', 50], 
          ['[0-5)', 75], 
          ['[5-10)', 30], 
          ['[10-15)', 20], 
          ['[15-20)', 10], 
          ['[20-25)', 5], 
          ['[25-30)', 2], 
          ['> 30', 1], 

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
      <Card.Header className="flex">Histogram: {props.name} <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
      <div
          style={{
            width: '100%',
            height: '300px'
          }}
        >
          <Chart data={data} axes={axes} series={series}/>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Histogram
