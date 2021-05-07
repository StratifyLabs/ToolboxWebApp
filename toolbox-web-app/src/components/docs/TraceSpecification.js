import React from 'react'

import Section from './Section'

import Log from '../instrumentation/Log'
import InstrumentationDetail from '../trace/InstrumentationDetail'
import TraceLineParser from '../../utility/TraceLineParser'

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
  TraceLineParser(histogramModel0.current, histoOutput);
  
  const histogramText = `#### Histograms

You can generate histograms by writing a directive following by data points to be included in the histogram.

> All these can be preceded by a timestamp, but the timestamp is not used in the output.

The histogram directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:hist:<title>:<data name>:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

**Example**

\`\`\`
${histoOutput}
\`\`\`

**Output**
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
`

  const plotModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(plotModel0.current, plotOutput);
  const plotText = `#### Plots

You can generate an x,y plot by writing a directive followed by data points to be included in the plot.

> All these can be preceded by a timestamp, but the timestamp is not used in the output.

The histogram directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:plot:<title>:<data x name>,<data y0 name>[<data y1 name>...]:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

**Example**

\`\`\`
${plotOutput}
\`\`\`

**Output**
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
`

  const timePlotModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(timePlotModel0.current, timePlotOutput);

  const timePlotText = `#### Time Series Plot

You can generate an timeseries plot by writing a directive followed by data points to be included in the plot. The \`x\` data
will be taken from the timestamp. The Stratify Toolbox can insert these timestamps if they are not provided by the application.

The time plot directive and data take the form:

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:timeplot:<title>:<data y0 name>[<data y1 name>...]:<description>
[t<timestamp>:]D|DATA:<data name>:<value>
\`\`\`

**Example**

\`\`\`
${timePlotOutput}
\`\`\`

**Output**
`

const logOutput = `t0.100000:INFO:USER:Hello
t0.150000:INFO:USER:World
t0.200000:WARN:SYS:This is a warning
t0.300000:ERROR:SYS:Yikes!
t0.300000:ERROR:USER:Yikes!
t0.310000:DG:USER:First debug message!
t0.320000:DEBUG:USER:Debug message
t0.330000:DG:USER:Another debug message!
`

  const logModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(logModel0.current, logOutput);

  const logText = `#### Log

You can generate a log using different message levels from different code modules. You don't need a directive,
you just need to print log output in the following form:

\`\`\`
[t<timestamp>:]DEBUG|DG|I|INFO|WARN|WARNING|ERROR|FATAL:<name>:<message>
\`\`\`

**Example**

\`\`\`
${logOutput}
\`\`\`

**Output**
`

  const sequenceOutput = `DIR:sequenceDiagram:Host <-> Device:sd:This is an example message sequence diagram
t0.100000:D:sd:participant H as Host
t0.101000:D:sd:participant D as Device
t0.102000:D:sd:H->>D: solid line with arrowhead
t0.103000:D:sd:D-->>H: dotted line with arrowhead
t0.104000:D:sd:H->D: solid line without arrow
t0.105000:D:sd:H-->D: dotted line without arrow
t0.106000:D:sd:D-xH: solid line with a cross at the end
t0.107000:D:sd:D--xH: dotted line with a cross at the end
`

  const sequenceModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(sequenceModel0.current, sequenceOutput);

  const sequenceText = `### Message Sequence Diagram

To generate a message sequence diagram, you use a directive and then output data. The message
sequence diagram is built on mermaid.js. The data values are entries in a mermaid message sequence diagram.

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:sequenceDiagram:<title>:<data name>:<description>
[t<timestamp>:]D|DATA:<data name>:<message sequence entry>
\`\`\`

**Example**

\`\`\`
${sequenceOutput}
\`\`\`

**Output**
`

  const heapOutput = `DIR:heap:Heap History:h:System heap state changes
t0.100000:D:h:resize,0,1000
t0.101000:D:h:alloc,0,500
t0.102000:D:h:alloc,500,250
t0.103000:D:h:alloc,750,250
t0.103500:D:h:resize,0,2000
t0.104000:D:h:alloc,1000,250
t0.105000:D:h:alloc,1250,500
t0.106000:D:h:free,1000
t0.107000:D:h:free,500
t0.107500:D:h:resize,0,3000
t0.108000:D:h:alloc,2000,750
t0.109000:D:h:alloc,2750,250
`

  const heapModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(heapModel0.current, heapOutput);

  const heapText = `### Heap History

You can visualize the heap (or other memory pool) by tracing your malloc and free (or equivalent) functions.

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:heap:<title>:<data name>:<description>
[t<timestamp>:]D|DATA:<data name>:[alloc|free],<address>[,<size>]
\`\`\`

**Example**

\`\`\`
${heapOutput}
\`\`\`

**Output**
`

const eventCounterOutput = `DIR:eventCounter:Event Counter:i2c,spi,gpio,timer:Interrupt Event Counter
t0.100000:D:i2c:10
t0.101000:D:spi:10
t0.102000:D:gpio:10
t0.103000:D:timer:10
t0.104000:D:i2c:20
t0.105000:D:spi:20
t0.107000:D:timer:20
t0.108000:D:i2c:30
t0.109000:D:spi:30
t0.110000:D:gpio:20
t0.111000:D:timer:40
t0.112000:D:i2c:40
t0.114000:D:timer:50
t0.115000:D:timer:60
`

  const eventCounterModel0 = React.useRef({ directiveList: [], data: [], log: []});
  TraceLineParser(eventCounterModel0.current, eventCounterOutput);

  const eventCounterText = `### Event Counter

An event counter bar graph will plot the highest data point in the list of data sources. This
is handy to compare how often different functions (especially interrupts) are executed. For functions that execute
with a high frequency, it is helpful to only output the trace every X iterations.

\`\`\`
[t<timestamp>:]DIR|DIRECTIVE:eventCounter:<title>:<data0 name>[,<data1 name>...]:<description>
[t<timestamp>:]D|DATA:<data name>:<count>
\`\`\`

**Example**

\`\`\`
${eventCounterOutput}
\`\`\`

**Output**
`

  return (
    <div className="mb-3">
      <Section markdown={intro} />
      <Section markdown={histogramText} />
      <InstrumentationDetail directive={histogramModel0.current.directiveList[0]} data={histogramModel0.current.data} />
      <Section markdown={plotText} />
      <InstrumentationDetail directive={plotModel0.current.directiveList[0]} data={plotModel0.current.data} />
      <Section markdown={timePlotText} />
      <InstrumentationDetail directive={timePlotModel0.current.directiveList[0]} data={timePlotModel0.current.data} />
      <Section markdown={logText} />
      <Log log={logModel0.current.log} />
      <Section markdown={sequenceText} />
      <InstrumentationDetail directive={sequenceModel0.current.directiveList[0]} data={sequenceModel0.current.data} />
      <Section markdown={heapText} />
      <InstrumentationDetail directive={heapModel0.current.directiveList[0]} data={heapModel0.current.data} />
      <Section markdown={eventCounterText} />
      <InstrumentationDetail directive={eventCounterModel0.current.directiveList[0]} data={eventCounterModel0.current.data} />
    </div>
  )
}

export default TraceSpecification
