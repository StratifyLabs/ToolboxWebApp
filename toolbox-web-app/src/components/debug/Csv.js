import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'



const Csv = props => {
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [5, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [5, 4]]
      }
    ],
    []
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'right' },
      { type: 'linear', position: 'left' },
    ],
    []
  )
  return (
    <Card className="mb-2">
      <Card.Header className="flex">CSV <Button className="float-right btn-sm">Reset</Button></Card.Header>
      <Card.Body>
      <div
          style={{
            width: '100%',
            height: '300px'
          }}
        >
          <Chart data={data} axes={axes} />
        </div>
      </Card.Body>
    </Card>
  )
}

export default Csv
