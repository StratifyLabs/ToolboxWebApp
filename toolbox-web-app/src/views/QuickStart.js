import React from 'react'
import { Container, Alert, Row, Button } from 'react-bootstrap'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faSlidersH,
  faCopy,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'

import Section from '../components/docs/Section'
import InternalJump from '../components/docs/InternalJump'

const QuickStart = props => {


  const intro = `## Getting Started

Congratulations! If you are reading this, you have successfully connected your Stratify Toolbox to the Wifi and loaded the web app.
Now you can:

- Flash
- Trace
- Debug

Before you get started with any of that, you will want to understand what a delegates are.

`
  const delegateIntro = `## Delegates`

  const delegate = `A delegate is a program that runs on the Toolbox to provide a *function* (flash/trace/debug) over
an *interface* for an MCU *family*. Before you can do anything exciting, you need to setup your delegate
in the settings.
`


  const flashIntro = `## Flash and Trace
The primary use of the Toolbox is to rapidly flash and trace MCU programs.

Once you sort out the settings, you can flash the target by posting the \`elf\` file to the Toolbox.

`

const flashCurlCommand = `
\`\`\`
curl -X POST --data-binary @path/to/firmware.elf http://<local ip address>/flash/program/elf
\`\`\`

You can bake that command right into your build system target. If the web app is open, it will automatically 
start streaming the \`trace\` output. Otherwise, you can view the \`trace\` output using \`curl\`.

\`\`\`
curl http://<local ip address>/trace
\`\`\`

`

  return (
    <Container className="mb-3">
      <Section markdown={intro} />
      <Section markdown={delegateIntro} />
      <Section markdown={delegate} >
        <InternalJump page="Settings" setPage={props.setPage} message="Configure delegate in Settings" icon={faSlidersH} />
      </Section>
      <Section markdown={flashIntro} />
      <Section markdown={flashCurlCommand}>
        <Row>
        <Button className="mb-2 btn-block text-left" variant='success'>Copy curl command with IP address <FA className="float-right" icon={faCopy} /></Button>
        </Row>
      </Section>
    </Container>
  )
}

export default QuickStart
