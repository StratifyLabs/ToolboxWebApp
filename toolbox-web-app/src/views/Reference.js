import React from 'react'
import { Container  } from 'react-bootstrap'
import {
  faSlidersH,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../components/AppContainer'
import Section from '../components/docs/Section'
import InternalJump from '../components/docs/InternalJump'
import ExternalJump from '../components/docs/ExternalJump'

import TraceSpecification from '../components/docs/TraceSpecification'

const Reference = props => {

  const overview = `# Overview

With the the Stratify Toolbox, you can **debug**, **flash** and **trace** supported microcontroller targets using a *delegate*.

There are three ways to access these *functions*:

- Web Application: see the Quick Start guide
- HTTP API: see below
- Local Display: see the Quick Start guide

`
  const httpApi = `## HTTP API

The Stratify Toolbox runs an HTTP server that listens for requests that allow you to access the flash, trace, and debug
interfaces either using this web application or from the command line using a program like \`curl\`.

The HTTP API consists of 3 parts:

`

  const delegate = `## Delegates

A *delegate* is a Toolbox background application designed for a specific *function* operating over an *interface* for an MCU *family*. A *function* can be:

- Debug
- Flash
- Trace

The Toolbox hardware supports the following *interfaces*:

- SWD
- JTAG
- UART
- SPI
- I2C
- Anything that can be bitbanged

A *delegate* can be designed for any MCU *family* using the SDK. There is built-in support for
all *stm32* Cortex M *families*. Additionally, you can quickly add support for almost any ARM Cortex M
chip using the *tbox* delegate.
`

  const delegateExample = `
For example, the Toolbox comes with several built-in delegates:
- \`ioflash_swd_stm32\`: Flash any STM32 chip over SWD
- \`iodebug_swd_stm32\`: Debug any STM32 chip over SWD
- \`iotrace_swo_tbox\`: Trace any MCU over SWO using the \`tbox\` trace library
- \`iotrace_uart_tbox\`: Trace any MCU over UART using the \`tbox\` trace library
`

 const sdk = `

## SDK

The Toolbox's SDK allows you to build, install, and share applications that run on the toolbox. This includes three
basic kinds of applications

- Delegates that implement a *funcion* over an *interface* for an MCU *family*
- System applications can be customized and replaced (don't worry you can always revert)
- User applications that provide brand-new functionality on the Toolbox

`

  const fs = `## Filesystem Overview

The filesystem API allows you to access the filesystems on the Toolbox. The filesystems follow a
convention which dictates how the device operates.

### Filesystem Conventions

The Toolbox's filesystem looks like this:

- root
  - app: internal RAM used for executing applications
  - assets: read-only system assets (icons, fonts, the web app)
  - bin: read-only system applications
  - dev: device access
  - home: SD Card
    - flash: for flashing the target
    - debug: for debugging the target
    - trace: trace reports
    - user: user files
    - settings: user-modifiable system settings
    - tmp: temporary files

Copies of system files are kept in the read-only \`/assets\` and \`/bin\` folders.  Files in \`/assets\` and \`/bin\` 
can be replaced by putting files of the same name in \`/home/assets\` and \`/home/bin\` respectively. 
For example, the start screen is executed at \`/bin/Home\`. By creating an executable application and 
placing it at \`/home/bin/Home\`, the Toolbox will load the user version rather than the system version. If you
get into trouble, you can always remove the SD card and delete the files to restore standard operation.

By convention the delegates are stored on the Toolbox's filesystem at \`/bin\` (read-only) or \`/home/bin\` (read-write). 
The delegate naming convention is:

\`\`\`
io[function]_[interface]_[family]
\`\`\`

So the default STM32 SWD flash delegate is found at:

\`\`\`
/bin/ioflash_swd_stm32
\`\`\`

If you want to replace this delegate with a user version, you can place it at:

\`\`\`
/home/bin/ioflash_swd_stm32
\`\`\`

`

  return (
    <AppContainer className="mb-3">
      <Section markdown={overview} ></Section>
      <Section markdown={delegate} />
      <Section markdown={sdk} />
      <Section markdown={httpApi} />
      <ul>
      <li><a href='/flash/help' target='_blank'>Flash API Help</a></li>
      <li><a href='/trace/help' target='_blank'>Trace API Help</a></li>
      <li><a href='/fs/help' target='_blank'>Filesystem API Help</a></li>
      </ul>
      <Section markdown={delegateExample}>
        
      <InternalJump page="Settings" setPage={props.setPage} message="Configure delegate in Settings" icon={faSlidersH} />
      <ExternalJump link="http://github.com/StratifyLabs/tbox" message="tbox library on Github" icon={faExternalLinkAlt} />
        

      </Section>

      <Section markdown={fs} ></Section>
      <TraceSpecification />

    </AppContainer>
  )
}

export default Reference
