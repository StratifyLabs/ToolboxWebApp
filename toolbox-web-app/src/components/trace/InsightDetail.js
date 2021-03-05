import React from 'react'

import Plot from '../insights/Plot'
import Logic from '../insights/Logic'
import Histogram from '../insights/Histogram'
import Log from '../insights/Log'
import Terminal from './Terminal'

const InsightDetail = props => {

  const configuration = props.configuration;

  function getComponent() {
    switch (configuration.type) {
      case "plot":
        return <Plot configuration={configuration} />
      case "histogram":
        return <Histogram configuration={configuration} />
      case "terminal":
        return <Terminal configuration={configuration} />
      case "logic":
        return <Logic configuration={configuration} />
      case "log":
        return <Log configuration={configuration} />
      default:
        break;
    }

    return null;
  }

  return (<div>
    {getComponent()}
  </div>)
}

export default InsightDetail
