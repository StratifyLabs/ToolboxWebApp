import React from 'react'
import { Container } from 'react-bootstrap'
import {
  faSlidersH,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'

import Section from './Section'
import InternalJump from './InternalJump'
import ExternalJump from './ExternalJump'
import AppContainer from '../AppContainer'

import Histogram from '../instrumentation/Histogram'

import { VictoryChart, VictoryHistogram } from "victory";

import Theme from '../instrumentation/Theme'
import TraceLineParser from '../../parser/TraceLineParser'

const TraceSpecification = props => {



  const intro = `## Trace Specification

The Toolbox web application can transform your \`printf()\` output in to easy-to-read instrumentation reports. To use this feature, 
you need to include these in your output

- directives
- data
- log messages

**Directive Format**

\`\`\`
DIR|DIRECTIVE:<title>:<data name>:<description>
\`\`\`

**Data Format**

\`\`\`
[t<timestamp:]<name>:<value>
\`\`\`

The format of the \`value\` is specific to the directive. For example, histogram and plots allow numerical values separated by commas 
to include multiple series on a single plot.

The timestamp can optiontionally be inserted by the Toolbox.

**Log Message Format**

\`\`\`
[t<timestamp:]DEBUG|DG|I|INFO|WARN|WARNING|ERROR|FATAL:<message>
\`\`\`

The timestamp can optiontionally be inserted by the Toolbox.

### Instrumentation Reports
`

const histoDirective = `DIR:hist:Malloc Performance:malloc:Occurences vs amount of time spent executing malloc()`;

const histoOutput = `D:malloc:120
D:malloc:130
D:malloc:120
D:malloc:110
D:malloc:150
D:malloc:160
D:malloc:110
D:malloc:200
D:malloc:110
D:malloc:130
D:malloc:120
D:malloc:130
D:malloc:120
D:malloc:110
D:malloc:150
D:malloc:160
D:malloc:110
D:malloc:200
D:malloc:110
D:malloc:130
`

  const histogramModel0 = React.useRef({ directiveList: [], data: [], log: []});

  TraceLineParser(histogramModel0.current, histoDirective);
  const histoOutputLines = histoOutput.split('\n');
  for(let i in histoOutputLines){
    TraceLineParser(histogramModel0.current, histoOutputLines[i]);
  }

  console.log(`${JSON.stringify(histogramModel0.current)}`);

  const histogramText = `#### Histograms

You can generate histograms by writing a directive following by data points to be included in the histogram.

> All these can be preceded by a timestamp, but the timestamp is not used in the output.

The histogram directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:hist:<title>:<data name>:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

For example:

\`\`\`
${histoDirective}
${histoOutput}
\`\`\`

This combination will create the following histogram in the instrumentation report.

`
  return (
    <div className="mb-3">
      <Section markdown={intro} ></Section>
      <Section markdown={histogramText} ></Section>
      <Histogram directive={histogramModel0.current.directiveList[0]} data={histogramModel0.current.data} />
    </div>
  )
}

export default TraceSpecification
