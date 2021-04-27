import React from 'react'
import { VictoryChart, VictoryStack, VictoryArea, VictoryBar } from "victory";
import Theme from './Theme'

const Heap = props => {

  // DIR:heap:Heap 0:heap0:Heap for Process 0
  // DAT:heap0:sbrk,0x08000000,16384
  // DAT:heap0:alloc,0x08000000,256
  // DAT:heap0:alloc,0x08001000,512
  // DAT:heap0:alloc,0x08002000,32
  // DAT:heap0:free,0x08001000

  // total heap size: sbrk
  // sort allocated heap
  // free -- remove allocated sections


  return (
    <VictoryChart domainPadding={{ y: 5 }}
      theme={Theme}
      height={250}
    >
      <VictoryBar
        style={{
          data: {
            fill: "#333",
            width: 25
          }
        }}
        data={[
          { x: 1, y: 0, y0: 20 },
        ]}
      />

      <VictoryBar
        style={{
          data: {
            fill: Theme.colors[0],
            width: 20
          }
        }}
        data={[
          { x: 1, y: 2.1, y0: 3 }
        ]}
      />

      <VictoryBar
        style={{
          data: {
            fill: Theme.colors[1],
            width: 20
          }
        }}
        data={[
          { x: 1, y: 3, y0: 4 },
        ]}
      />

      <VictoryBar
        style={{
          data: {
            fill: Theme.colors[2],
            width: 20
          }
        }}
        data={[
          { x: 1, y: 6, y0: 10 }
        ]}
      />


      <VictoryBar
        style={{
          data: {
            fill: Theme.colors[3],
            width: 20
          }
        }}
        data={[
          { x: 1, y: 12, y0: 18 }
        ]}
      />

      <VictoryBar
        style={{
          data: {
            fill: "#fff",
            width: 20
          }
        }}
        data={[
          { x: 3, y: 2, y0: 10 },
          { x: 3, y: 12, y0: 15 },
          { x: 3, y: 12, y0: 15 },
          { x: 4, y: 4, y0: 3 },
          { x: 5, y: 6, y0: 3 }
        ]}
      />

    </VictoryChart>
  )
}

export default Heap
