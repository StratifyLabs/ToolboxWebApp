import React from 'react'
import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

import Section from '../components/docs/Section'

const About = props => {


  const overview = `# Stratify Toolbox

Copyright 2021. Stratify Labs, Inc. See LICENSE.md for more information.
`

  const credits = `## Credits

Special Thanks to:

- compiler-rt (clang)
- newlib
- gcc (building and compiling)
- GCC C++ standard library
- ARM DAP Link
- LWIP
- STM32 HAL Library
- mbedtls
- jansson JSON library
- Stratify OS
- Stratify C++ API Framework
- Font Awesome Icons
- Google Fonts
` 

  return (
    <Container className="mb-3">
    <Section markdown={overview} />
    <Section markdown={credits} />
    </Container>
  )
}

export default About
