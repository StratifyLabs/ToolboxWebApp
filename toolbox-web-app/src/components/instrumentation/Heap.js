import React from 'react'
import { VictoryChart, VictoryStack, VictoryArea, VictoryBar, VictoryZoomContainer } from "victory";
import Theme from './Theme'


const Heap = props => {

  let snapshots = [];
  let allocatedBlocks = [];
  let heap = { address: 0, size: 0 };
  const source = props.directive.sources;

  function freeBlock(address) {
    const index = allocatedBlocks.findIndex(element => element.address === address);
    if (index !== -1) {
      allocatedBlocks[index].size = 0;
    }
  }

  function allocateBlock(address, size) {
    const item = { address: address, size: size };
    const index = allocatedBlocks.findIndex(element => element.size === 0);
    if (index !== -1) {
      allocatedBlocks[index] = item;
    } else {
      allocatedBlocks.push(item);
    }
  }

  let stateCount = 0;
  for (let i in props.data) {
    if (props.data[i].name == source) {
      const values = props.data[i].value.split(",");
      if (values.length) {
        
        if (values[0] === "alloc") {
          //alloc,address,size
          allocateBlock(values[1], values[2]);
        } else if (values[0] == "free") {
          //free,address
          freeBlock(values[1]);
        } else if (values[0] == "resize") {
          //resize,base address, size
          heap = { address: values[1], size: values[2] };
        }
        
        snapshots.push({ state: stateCount, heap: { ...heap }, allocatedBlocks: JSON.parse(JSON.stringify(allocatedBlocks)) });
        stateCount++;
        if (stateCount == 50) {
          break;
        }
      }
    }
  }

  return (
    <VictoryChart domainPadding={{ y: 5 }}
      style={{ padding: { right: 50 } }}
      theme={Theme}
      height={250}
      containerComponent={
        <VictoryZoomContainer
          zoomDimension={"x"}
          allowZoom={false}
          allowPan={true}
        />
      }
    >
      { snapshots.map((element, index) => {
        return (<VictoryBar
          style={{
            data: {
              fill: "#111",
              width: 8
            }
          }}
          key={`heap${index}`}
          data={[
            {
              x: element.state + 1,
              y: parseInt(element.heap.address),
              y0: parseInt(element.heap.address) + parseInt(element.heap.size)
            }
          ]}
        />)
      })}


      { snapshots.map((elementOuter, indexOuter) => elementOuter.allocatedBlocks.map((element, index) => {
        if (parseInt(element.size) > 0) {
          return (<VictoryBar
            style={{
              data: {
                fill: Theme.colors[index % Theme.colors.length],
                width: 4
              }
            }}
            key={`heap${index}`}
            data={[
              {
                x: elementOuter.state + 1,
                y: parseInt(element.address),
                y0: parseInt(element.address) + parseInt(element.size)
              }
            ]}
          />)
        } else {
          return null;
        }
      }))}

    </VictoryChart>
  )
}

export default Heap
