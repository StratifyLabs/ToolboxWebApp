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
import Plot from '../instrumentation/Plot'
import TimePlot from '../instrumentation/TimePlot'

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

const histoOutput = `DIR:hist:Malloc Performance:malloc:Occurences vs amount of time spent executing malloc()
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
D:malloc:120
D:malloc:130
D:malloc:120
D:malloc:110
D:malloc:180
D:malloc:190
D:malloc:150
D:malloc:160
D:malloc:110
D:malloc:200
D:malloc:110
D:malloc:130
`

  const histogramModel0 = React.useRef({ directiveList: [], data: [], log: []});

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
${histoOutput}
\`\`\`

This produces:
`

const plotOutput = `DIR:plot:XY Plot Demo:xy:Plotting y0 and y1 vs x
D:xy:0,120,200
D:xy:1,130,200
D:xy:2,120,210
D:xy:3,110,220
D:xy:4,150,230
D:xy:5,160,200
D:xy:6,110,190
D:xy:7,200,250
D:xy:8,110,290
D:xy:9,130,270
D:xy:10,120,200
D:xy:11,130,200
D:xy:12,120,260
D:xy:13,110,210
D:xy:14,180,270
D:xy:15,190,280
D:xy:16,150,210
D:xy:17,160,230
D:xy:18,110,240
D:xy:19,200,290
D:xy:20,110,210
D:xy:21,130,200
`

  const plotModel0 = React.useRef({ directiveList: [], data: [], log: []});

  const plotOutputLines = plotOutput.split('\n');
  for(let i in plotOutputLines){
    TraceLineParser(plotModel0.current, plotOutputLines[i]);
  }

  const plotText = `#### Plots

You can generate an x,y plot by writing a directive followed by data points to be included in the plot.

> All these can be preceded by a timestamp, but the timestamp is not used in the output.

The histogram directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:plot:<title>:<data x name>,<data y0 name>[<data y1 name>...]:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

For example:

\`\`\`
${plotOutput}
\`\`\`

This produces:
`

const timePlotOutput = `DIR:timeplot:Time Series Plot Demo:y:Plotting y0 and y1 vs timestamp
t0.100000:D:y:20,200
t0.200000:D:y:30,200
t0.300000:D:y:20,210
t0.400000:D:y:10,220
t0.500000:D:y:50,230
t0.600000:D:y:60,200
t0.700000:D:y:10,190
t0.800000:D:y:00,250
t0.900000:D:y:10,290
t1.000000:D:y:30,270
t1.200000:D:y:20,200
t1.300000:D:y:30,200
t1.400000:D:y:20,260
t1.500000:D:y:10,210
t1.600000:D:y:80,270
t1.700000:D:y:90,280
t1.800000:D:y:50,210
t1.900000:D:y:60,230
t2.000000:D:y:10,240
t2.100000:D:y:00,290
t2.200000:D:y:10,210
t2.300000:D:y:30,200
`

  const timePlotModel0 = React.useRef({ directiveList: [], data: [], log: []});

  const timePlotOutputLines = timePlotOutput.split('\n');
  for(let i in timePlotOutputLines){
    TraceLineParser(timePlotModel0.current, timePlotOutputLines[i]);
  }

  const timePlotText = `#### Time Series Plot

You can generate an timeseries plot by writing a directive followed by data points to be included in the plot. The \`x\` data
will be taken from the timestamp. The Stratify Toolbox can insert these timestamps if they are not provided by the application.

The histogram directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:timeplot:<title>:<data y0 name>[<data y1 name>...]:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

For example:

\`\`\`
${timePlotOutput}
\`\`\`

This produces:
`

  return (
    <div className="mb-3">
      <Section markdown={intro} ></Section>
      <Section markdown={histogramText} ></Section>
      <Histogram directive={histogramModel0.current.directiveList[0]} data={histogramModel0.current.data} />
      <Section markdown={plotText} ></Section>
      <Plot directive={plotModel0.current.directiveList[0]} data={plotModel0.current.data} />
      <Section markdown={timePlotText} ></Section>
      <TimePlot directive={timePlotModel0.current.directiveList[0]} data={timePlotModel0.current.data} />

    </div>
  )
}

export default TraceSpecification
