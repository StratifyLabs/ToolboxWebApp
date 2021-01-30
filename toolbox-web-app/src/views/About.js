import React from 'react'
import ReactMarkdown from 'react-markdown'


const About = props => {


  const content = `# Stratify Toolbox

  Copyright 2021. Stratify Labs, Inc. See LICENSE.md for more information.

  ### Credits

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
    <ReactMarkdown>{content}</ReactMarkdown>
  )
}

export default About
