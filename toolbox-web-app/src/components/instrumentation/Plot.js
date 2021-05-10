import React from 'react'
import { VictoryChart, VictoryContainer, VictoryLine } from "victory";
import Theme from './Theme'
import AppContainer from '../AppContainer';

import SaveSvg from '../../utility/SaveSvg'

const Plot = props => {

  let data = [];
  const directive = props.directive;
  const dataModel = props.model.data;
  const source = directive.sources;
  const id = props.svgId;
  const addExportFunction = props.addExportFunction;

  for (let i in dataModel) {
    if (dataModel[i].name === source) {
      let values = dataModel[i].value.split(",").map(Number);
      data.push(values);
    }
  }
  const series = data[0];



  React.useEffect(() => {
    function exportFunction(){
      SaveSvg(document.getElementsByClassName(id)[0].firstChild, id)
    }

    addExportFunction(exportFunction);
  }, [id, addExportFunction]);

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart padding={{ left: 80, top: 10, right: 15, bottom: 20 }}
        theme={Theme}
        height={250}
        containerComponent={
          <VictoryContainer
            className={id}
          />
        }
      >
        {series.length && series.map((value, index) => {
          return index ? <VictoryLine data={data} x={0} y={index} key={"series" + index} /> : null;
        })}
      </VictoryChart>
    </AppContainer>
  )
}

export default Plot
