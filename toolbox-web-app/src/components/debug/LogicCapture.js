import React from 'react'
import ReactDOM from "react-dom";

import { Card, Button } from 'react-bootstrap'
import { Chart } from 'react-charts'



const LogicCapture = props => {
  const data = React.useMemo(
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

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  );

  const [{ min, max }, setState] = React.useState({
    min: null,
    max: null,
  });


  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        hardMin: min,
        hardMax: max,
      },
      { type: 'linear', show: false, position: 'left', min: -0.1, max: 8.5 }
    ],
    [max, min]  )


  const brush = React.useMemo(
    () => ({
      onSelect: (brushData) => {
        console.log(brushData);
        setState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end),
        });
      },
    }),
    []
  );

  function resetBrush(){
    setState({min:null, max:null});
  }

  const chartHeight = props.height === undefined ? '200px' : props.height;

  return (
    <Card className="mb-2">
      <Card.Header className="flex">Logic Capture <Button onClick={() =>
          setState({
            min: null,
            max: null,
          })
        }
        className="float-right  btn-sm">Reset</Button></Card.Header>
      <Card.Body>
        <div
          style={{
            width: '100%',
            height: chartHeight
          }}
        >
          <Chart
            data={props.data}
            axes={axes}
            series={series}
            brush={brush}
            primaryCursor
             />
        </div>
      </Card.Body>
    </Card>
  )
}

export default LogicCapture
