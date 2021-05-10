import React from 'react'
import { VictoryChart, VictoryContainer, VictoryHistogram } from "victory";
import AppContainer from '../AppContainer';

import Theme from './Theme'

import SaveSvg from '../../utility/SaveSvg'

const Histogram = props => {

  const directive = props.directive;
  const source = directive.sources;
  const dataModel = props.model.data;
  const id = props.svgId;
  const addExportFunction = props.addExportFunction;

  let data = [];
  for (let i in dataModel) {
    if (dataModel[i].name === source) {
      data.push({ x: parseFloat(dataModel[i].value) });
    }
  }



  React.useEffect(() => {
    function exportFunction(){
      SaveSvg(document.getElementsByClassName(id)[0].firstChild, id)
    }

    addExportFunction(exportFunction);
  }, [id, addExportFunction]);

  return (
    <AppContainer fluid className="mr-0 ml-0 pr-0 pl-0">
      <VictoryChart
        containerComponent={
          <VictoryContainer
            className={id}
          />
        }
        theme={Theme}
        height={250}
      >
        <VictoryHistogram
          data={data}
        />
      </VictoryChart>
    </AppContainer>
  )
}

export default Histogram
